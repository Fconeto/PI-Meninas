namespace GranForno.Application.DTOs.Dashboard
{
    public class DashboardResponse
    {
        public int TotalReservations { get; set; }
        public int TodayReservationsCount { get; set; }
        public int TotalProducts { get; set; }
        public int TotalGallery { get; set; }
        public List<UpcomingReservation> UpcomingReservations { get; set; } = new();
        public Dictionary<string, int> StatusCounts { get; set; } = new();
        public List<DailyReservation> Last7Days { get; set; } = new();
    }

    public class UpcomingReservation
    {
        public int Id { get; set; }
        public string? ClienteNome { get; set; }
        public DateTime Data { get; set; }
        public string Horario { get; set; } = string.Empty;
        public int QuantidadePessoas { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class DailyReservation
    {
        public string Dia { get; set; } = string.Empty;
        public int Reservas { get; set; }
    }
}
