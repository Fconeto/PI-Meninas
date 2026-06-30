namespace GranForno.Domain.Entities
{
    public class RestaurantSetting
    {
        public int Id { get; set; }
        public string? Telefone { get; set; }
        public string? WhatsApp { get; set; }
        public string? DeliveryUrl { get; set; }
        public string? Endereco { get; set; }
        public string? HorarioFuncionamento { get; set; }
        public int TotalMesas { get; set; } = 20;
        public int CapacidadePorMesa { get; set; } = 4;
        public int MaxReservasPorHorario { get; set; } = 10;
        public int TempoEntreReservas { get; set; } = 0;
        public string? HorariosDisponiveis { get; set; }
        public string? TextoHome { get; set; }
        public string? ImagemHero { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
