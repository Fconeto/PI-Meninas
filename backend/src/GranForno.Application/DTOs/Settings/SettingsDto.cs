namespace GranForno.Application.DTOs.Settings
{
    public class SettingsDto
    {
        public int Id { get; set; }
        public string? Telefone { get; set; }
        public string? WhatsApp { get; set; }
        public string? DeliveryUrl { get; set; }
        public string? Endereco { get; set; }
        public string? HorarioFuncionamento { get; set; }
        public int TotalMesas { get; set; }
        public int CapacidadePorMesa { get; set; }
        public int MaxReservasPorHorario { get; set; }
        public int TempoEntreReservas { get; set; }
        public List<string> HorariosDisponiveis { get; set; } = new();
        public string? TextoHome { get; set; }
        public string? ImagemHero { get; set; }
    }
}
