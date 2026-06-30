using GranForno.Domain.Enums;

namespace GranForno.Domain.Entities
{
    public class ReservationStatusHistory
    {
        public int Id { get; set; }
        public int ReservationId { get; set; }
        public ReservationStatus? StatusAnterior { get; set; }
        public ReservationStatus StatusNovo { get; set; }
        public int? AlteradoPor { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Reservation Reservation { get; set; } = null!;
        public User? AlteradoPorUser { get; set; }
    }
}
