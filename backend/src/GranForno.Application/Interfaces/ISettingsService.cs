using GranForno.Application.DTOs.Settings;

namespace GranForno.Application.Interfaces
{
    public interface ISettingsService
    {
        Task<SettingsDto?> GetAsync();
        Task<SettingsDto> UpdateAsync(UpdateSettingsRequest request);
    }
}
