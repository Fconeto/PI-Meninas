namespace GranForno.Application.DTOs.Reservation
{
    public class AvailabilityResponse
    {
        public string Data { get; set; } = string.Empty;
        public List<TimeSlot> Horarios { get; set; } = new();
    }

    public class TimeSlot
    {
        public string Horario { get; set; } = string.Empty;
        public int VagasRestantes { get; set; }
        public bool Disponivel { get; set; }
        public string? MotivoBloqueio { get; set; }
    }
}
