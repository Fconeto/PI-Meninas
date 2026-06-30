using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using GranForno.Application.DTOs.Reservation;
using GranForno.Application.Interfaces;
using GranForno.Domain.Entities;
using GranForno.Domain.Enums;
using GranForno.Persistence.Context;

namespace GranForno.Application.Services
{
    public class ReservationService : IReservationService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReservationService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ReservationDto>> GetAllAsync(int? userId = null)
        {
            var query = _context.Reservations.AsQueryable();

            if (userId.HasValue)
                query = query.Where(r => r.UserId == userId);

            var reservations = await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
            return _mapper.Map<List<ReservationDto>>(reservations);
        }

        public async Task<List<ReservationDto>> GetByUserAsync(int userId)
        {
            var reservations = await _context.Reservations
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            return _mapper.Map<List<ReservationDto>>(reservations);
        }

        public async Task<ReservationDto?> GetByIdAsync(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            return reservation == null ? null : _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<ReservationDto> CreateAsync(CreateReservationRequest request, int? userId = null)
        {
            var tipo = request.Tipo.ToLower() switch
            {
                "mesa" => ReservationType.Mesa,
                "ambiente" => ReservationType.Ambiente,
                _ => throw new InvalidOperationException("Tipo de reserva inválido.")
            };

            var data = request.Data.Date;
            if (data < DateTime.UtcNow.Date)
                throw new InvalidOperationException("Não é possível reservar em datas passadas.");

            var existingReservations = await _context.Reservations
                .Where(r => r.Data == data && r.Horario == request.Horario && r.Status != ReservationStatus.Cancelada)
                .ToListAsync();

            var settings = await _context.RestaurantSettings.FirstOrDefaultAsync();

            if (tipo == ReservationType.Ambiente)
            {
                if (existingReservations.Any(r => r.Tipo == ReservationType.Ambiente))
                    throw new InvalidOperationException("Já existe uma reserva de ambiente para este horário.");

                if (existingReservations.Any(r => r.Tipo == ReservationType.Mesa))
                    throw new InvalidOperationException("Existem reservas de mesa para este horário. Não é possível reservar o ambiente.");
            }
            else
            {
                if (existingReservations.Any(r => r.Tipo == ReservationType.Ambiente))
                    throw new InvalidOperationException("O ambiente está reservado neste horário. Não é possível reservar mesas.");

                var maxReservas = settings?.MaxReservasPorHorario ?? 10;
                var mesaCount = existingReservations.Count(r => r.Tipo == ReservationType.Mesa);
                if (mesaCount >= maxReservas)
                    throw new InvalidOperationException("Número máximo de reservas atingido para este horário.");
            }

            var status = request.Status?.ToLower() switch
            {
                "pendente" => ReservationStatus.Pendente,
                "confirmada" => ReservationStatus.Confirmada,
                _ => ReservationStatus.Pendente
            };

            var reservation = new Reservation
            {
                UserId = userId,
                Tipo = tipo,
                Data = data,
                Horario = request.Horario,
                QuantidadePessoas = request.QuantidadePessoas,
                TipoEvento = request.TipoEvento,
                Decoracao = request.Decoracao,
                Observacoes = request.Observacoes,
                Status = status,
                ClienteNome = request.ClienteNome,
                ClienteEmail = request.ClienteEmail,
                ClienteTelefone = request.ClienteTelefone,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Reservations.Add(reservation);

            _context.ReservationStatusHistories.Add(new ReservationStatusHistory
            {
                Reservation = reservation,
                StatusNovo = status,
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<ReservationDto> UpdateStatusAsync(int id, UpdateReservationStatusRequest request, int adminUserId)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
                throw new KeyNotFoundException("Reserva não encontrada.");

            var novoStatus = request.Status.ToLower() switch
            {
                "pendente" => ReservationStatus.Pendente,
                "confirmada" => ReservationStatus.Confirmada,
                "cancelada" => ReservationStatus.Cancelada,
                "concluida" => ReservationStatus.Concluida,
                _ => throw new InvalidOperationException("Status inválido.")
            };

            if (novoStatus == ReservationStatus.Cancelada && reservation.Status != ReservationStatus.Cancelada)
            {
                var reservationDateTime = reservation.Data.Add(TimeSpan.Parse(reservation.Horario));
                if ((reservationDateTime - DateTime.UtcNow).TotalHours < 24 && reservation.Status != ReservationStatus.Pendente)
                    throw new InvalidOperationException("Cancelamento permitido apenas com 24 horas de antecedência.");
            }

            var statusAnterior = reservation.Status;
            reservation.Status = novoStatus;
            reservation.UpdatedAt = DateTime.UtcNow;

            _context.ReservationStatusHistories.Add(new ReservationStatusHistory
            {
                ReservationId = reservation.Id,
                StatusAnterior = statusAnterior,
                StatusNovo = novoStatus,
                AlteradoPor = adminUserId,
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<List<AvailabilityResponse>> GetAvailabilityAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var settings = await _context.RestaurantSettings.FirstOrDefaultAsync();
            var horariosDisponiveis = string.IsNullOrEmpty(settings?.HorariosDisponiveis)
                ? new List<string>()
                : JsonSerializer.Deserialize<List<string>>(settings.HorariosDisponiveis) ?? new List<string>();

            var start = startDate ?? DateTime.UtcNow.Date;
            var end = endDate ?? start.AddDays(30);

            var reservations = await _context.Reservations
                .Where(r => r.Data >= start && r.Data <= end && r.Status != ReservationStatus.Cancelada)
                .ToListAsync();

            var blockedSlots = await _context.ReservationBlocks
                .Where(rb => rb.Data >= start && rb.Data <= end && rb.Ativo)
                .ToListAsync();

            var response = new List<AvailabilityResponse>();

            for (var date = start; date <= end; date = date.AddDays(1))
            {
                var slots = new List<TimeSlot>();

                foreach (var horario in horariosDisponiveis)
                {
                    if (date == DateTime.UtcNow.Date)
                    {
                        var timeParts = horario.Split(':');
                        if (int.TryParse(timeParts[0], out var hour) && int.TryParse(timeParts[1], out var minute))
                        {
                            var slotTime = new DateTime(date.Year, date.Month, date.Day, hour, minute, 0, DateTimeKind.Utc);
                            if (slotTime <= DateTime.UtcNow)
                            {
                                slots.Add(new TimeSlot
                                {
                                    Horario = horario,
                                    Disponivel = false,
                                    VagasRestantes = 0,
                                    MotivoBloqueio = "Horário já passou"
                                });
                                continue;
                            }
                        }
                    }

                    var block = blockedSlots.FirstOrDefault(b =>
                        b.Data == date && (string.IsNullOrEmpty(b.Horario) || b.Horario == horario));

                    if (block != null)
                    {
                        slots.Add(new TimeSlot
                        {
                            Horario = horario,
                            Disponivel = false,
                            VagasRestantes = 0,
                            MotivoBloqueio = block.Motivo ?? "Horário bloqueado"
                        });
                        continue;
                    }

                    var dayReservations = reservations.Where(r => r.Data == date && r.Horario == horario).ToList();

                    if (dayReservations.Any(r => r.Tipo == ReservationType.Ambiente))
                    {
                        slots.Add(new TimeSlot
                        {
                            Horario = horario,
                            Disponivel = false,
                            VagasRestantes = 0,
                            MotivoBloqueio = "Ambiente reservado"
                        });
                        continue;
                    }

                    var maxReservas = settings?.MaxReservasPorHorario ?? 10;
                    var mesaCount = dayReservations.Count(r => r.Tipo == ReservationType.Mesa);
                    var vagas = maxReservas - mesaCount;

                    slots.Add(new TimeSlot
                    {
                        Horario = horario,
                        Disponivel = vagas > 0,
                        VagasRestantes = vagas
                    });
                }

                response.Add(new AvailabilityResponse
                {
                    Data = date.ToString("yyyy-MM-dd"),
                    Horarios = slots
                });
            }

            return response;
        }
    }
}
