using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GranForno.Application.DTOs.Reservation;
using GranForno.Application.DTOs.Shared;
using GranForno.Application.Interfaces;

namespace GranForno.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if (role == "Admin")
            {
                var all = await _reservationService.GetAllAsync();
                return Ok(ApiResponse<List<ReservationDto>>.Ok(all));
            }

            var userReservations = await _reservationService.GetByUserAsync(userId);
            return Ok(ApiResponse<List<ReservationDto>>.Ok(userReservations));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);
            if (reservation == null)
                return NotFound(ApiResponse<object>.Fail("Reserva não encontrada."));
            return Ok(ApiResponse<ReservationDto>.Ok(reservation));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateReservationRequest request)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var reservation = await _reservationService.CreateAsync(request, userId);
            return CreatedAtAction(nameof(GetById), new { id = reservation.Id }, ApiResponse<ReservationDto>.Ok(reservation, "Reserva criada com sucesso."));
        }

        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateReservationStatusRequest request)
        {
            var adminUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var reservation = await _reservationService.UpdateStatusAsync(id, request, adminUserId);
            return Ok(ApiResponse<ReservationDto>.Ok(reservation, "Status atualizado com sucesso."));
        }

        [HttpGet("availability")]
        public async Task<IActionResult> GetAvailability([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var availability = await _reservationService.GetAvailabilityAsync(startDate, endDate);
            return Ok(ApiResponse<List<AvailabilityResponse>>.Ok(availability));
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyReservations()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var reservations = await _reservationService.GetByUserAsync(userId);
            return Ok(ApiResponse<List<ReservationDto>>.Ok(reservations));
        }
    }
}
