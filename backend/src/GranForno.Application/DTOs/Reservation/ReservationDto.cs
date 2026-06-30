namespace GranForno.Application.DTOs.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Horario { get; set; } = string.Empty;
        public int QuantidadePessoas { get; set; }
        public string? TipoEvento { get; set; }
        public string? Decoracao { get; set; }
        public string? Observacoes { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? ClienteNome { get; set; }
        public string? ClienteEmail { get; set; }
        public string? ClienteTelefone { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
