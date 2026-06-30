using Microsoft.AspNetCore.Http;

namespace GranForno.Application.Interfaces
{
    public interface IStorageService
    {
        Task<string> UploadAsync(IFormFile file, string? folder = null);
        Task DeleteAsync(string fileUrl);
    }
}
