using Microsoft.EntityFrameworkCore;
using GranForno.Application.DTOs.Dashboard;
using GranForno.Application.Interfaces;
using GranForno.Domain.Enums;
using GranForno.Persistence.Context;

namespace GranForno.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardResponse> GetDashboardAsync()
        {
            var reservations = await _context.Reservations.ToListAsync();
            var productsCount = await _context.Products.CountAsync();
            var galleryCount = await _context.GalleryImages.CountAsync();

            var today = DateTime.UtcNow.Date;
            var todayReservations = reservations.Count(r => r.Data == today && r.Status != ReservationStatus.Cancelada);

            var upcoming = reservations
                .Where(r => r.Data >= today && r.Status != ReservationStatus.Cancelada && r.Status != ReservationStatus.Concluida)
                .OrderBy(r => r.Data).ThenBy(r => r.Horario)
                .Take(5)
                .Select(r => new UpcomingReservation
                {
                    Id = r.Id,
                    ClienteNome = r.ClienteNome,
                    Data = r.Data,
                    Horario = r.Horario,
                    QuantidadePessoas = r.QuantidadePessoas,
                    Status = r.Status.ToString()
                })
                .ToList();

            var statusCounts = new Dictionary<string, int>
            {
                { "pendente", reservations.Count(r => r.Status == ReservationStatus.Pendente) },
                { "confirmada", reservations.Count(r => r.Status == ReservationStatus.Confirmada) },
                { "cancelada", reservations.Count(r => r.Status == ReservationStatus.Cancelada) },
                { "concluida", reservations.Count(r => r.Status == ReservationStatus.Concluida) }
            };

            var last7Days = new List<DailyReservation>();
            for (int i = 6; i >= 0; i--)
            {
                var date = today.AddDays(-i);
                var dayLabel = date.ToString("ddd").ToLower();
                var count = reservations.Count(r => r.Data == date && r.Status != ReservationStatus.Cancelada);
                last7Days.Add(new DailyReservation { Dia = dayLabel, Reservas = count });
            }

            return new DashboardResponse
            {
                TotalReservations = reservations.Count,
                TodayReservationsCount = todayReservations,
                TotalProducts = productsCount,
                TotalGallery = galleryCount,
                UpcomingReservations = upcoming,
                StatusCounts = statusCounts,
                Last7Days = last7Days
            };
        }
    }
}
