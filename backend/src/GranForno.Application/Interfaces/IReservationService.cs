using GranForno.Application.DTOs.Reservation;

namespace GranForno.Application.Interfaces
{
    public interface IReservationService
    {
        Task<List<ReservationDto>> GetAllAsync(int? userId = null);
        Task<List<ReservationDto>> GetByUserAsync(int userId);
        Task<ReservationDto?> GetByIdAsync(int id);
        Task<ReservationDto> CreateAsync(CreateReservationRequest request, int? userId = null);
        Task<ReservationDto> UpdateStatusAsync(int id, UpdateReservationStatusRequest request, int adminUserId);
        Task<List<AvailabilityResponse>> GetAvailabilityAsync(DateTime? startDate = null, DateTime? endDate = null);
    }
}
