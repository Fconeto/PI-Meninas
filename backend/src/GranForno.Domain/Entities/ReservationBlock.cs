namespace GranForno.Domain.Entities
{
    public class ReservationBlock
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public string? Horario { get; set; }
        public string? Motivo { get; set; }
        public bool Ativo { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
