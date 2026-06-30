using GranForno.Application.DTOs.Dashboard;

namespace GranForno.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardResponse> GetDashboardAsync();
    }
}
