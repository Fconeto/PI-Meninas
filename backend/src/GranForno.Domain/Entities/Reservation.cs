using GranForno.Domain.Enums;

namespace GranForno.Domain.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public ReservationType Tipo { get; set; }
        public DateTime Data { get; set; }
        public string Horario { get; set; } = string.Empty;
        public int QuantidadePessoas { get; set; }
        public string? TipoEvento { get; set; }
        public string? Decoracao { get; set; }
        public string? Observacoes { get; set; }
        public ReservationStatus Status { get; set; } = ReservationStatus.Pendente;
        public string? ClienteNome { get; set; }
        public string? ClienteEmail { get; set; }
        public string? ClienteTelefone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public ICollection<ReservationStatusHistory> StatusHistory { get; set; } = new List<ReservationStatusHistory>();
    }
}
