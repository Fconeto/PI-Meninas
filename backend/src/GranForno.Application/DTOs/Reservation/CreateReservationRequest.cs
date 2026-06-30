namespace GranForno.Application.DTOs.Reservation
{
    public class CreateReservationRequest
    {
        public string Tipo { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Horario { get; set; } = string.Empty;
        public int QuantidadePessoas { get; set; }
        public string? TipoEvento { get; set; }
        public string? Decoracao { get; set; }
        public string? Observacoes { get; set; }
        public string? Status { get; set; }
        public string? ClienteNome { get; set; }
        public string? ClienteEmail { get; set; }
        public string? ClienteTelefone { get; set; }
    }
}
