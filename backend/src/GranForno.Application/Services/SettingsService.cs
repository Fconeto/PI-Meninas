using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using GranForno.Application.DTOs.Settings;
using GranForno.Application.Interfaces;
using GranForno.Domain.Entities;
using GranForno.Persistence.Context;

namespace GranForno.Application.Services
{
    public class SettingsService : ISettingsService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public SettingsService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SettingsDto?> GetAsync()
        {
            var settings = await _context.RestaurantSettings.FirstOrDefaultAsync();
            return settings == null ? null : _mapper.Map<SettingsDto>(settings);
        }

        public async Task<SettingsDto> UpdateAsync(UpdateSettingsRequest request)
        {
            var settings = await _context.RestaurantSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new RestaurantSetting
                {
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.RestaurantSettings.Add(settings);
            }

            if (request.Telefone != null) settings.Telefone = request.Telefone;
            if (request.WhatsApp != null) settings.WhatsApp = request.WhatsApp;
            if (request.DeliveryUrl != null) settings.DeliveryUrl = request.DeliveryUrl;
            if (request.Endereco != null) settings.Endereco = request.Endereco;
            if (request.HorarioFuncionamento != null) settings.HorarioFuncionamento = request.HorarioFuncionamento;
            if (request.TotalMesas.HasValue) settings.TotalMesas = request.TotalMesas.Value;
            if (request.CapacidadePorMesa.HasValue) settings.CapacidadePorMesa = request.CapacidadePorMesa.Value;
            if (request.MaxReservasPorHorario.HasValue) settings.MaxReservasPorHorario = request.MaxReservasPorHorario.Value;
            if (request.TempoEntreReservas.HasValue) settings.TempoEntreReservas = request.TempoEntreReservas.Value;
            if (request.HorariosDisponiveis != null) settings.HorariosDisponiveis = JsonSerializer.Serialize(request.HorariosDisponiveis);
            if (request.TextoHome != null) settings.TextoHome = request.TextoHome;
            if (request.ImagemHero != null) settings.ImagemHero = request.ImagemHero;

            settings.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<SettingsDto>(settings);
        }
    }
}
