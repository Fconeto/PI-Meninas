using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GranForno.Application.DTOs.Settings;
using GranForno.Application.DTOs.Shared;
using GranForno.Application.Interfaces;

namespace GranForno.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _settingsService.GetAsync();
            return Ok(ApiResponse<SettingsDto?>.Ok(settings));
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromBody] UpdateSettingsRequest request)
        {
            var settings = await _settingsService.UpdateAsync(request);
            return Ok(ApiResponse<SettingsDto>.Ok(settings, "Configurações atualizadas com sucesso."));
        }
    }
}
