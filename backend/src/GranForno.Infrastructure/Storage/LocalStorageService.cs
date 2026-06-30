using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using GranForno.Application.Interfaces;

namespace GranForno.Infrastructure.Storage
{
    public class LocalStorageOptions
    {
        public string BasePath { get; set; } = "wwwroot/uploads";
        public string BaseUrl { get; set; } = "/uploads";
    }

    public class LocalStorageService : IStorageService
    {
        private readonly LocalStorageOptions _options;

        public LocalStorageService(IOptions<LocalStorageOptions> options)
        {
            _options = options.Value;
        }

        public async Task<string> UploadAsync(IFormFile file, string? folder = null)
        {
            var uploadPath = Path.Combine(_options.BasePath, folder ?? "images");
            Directory.CreateDirectory(uploadPath);

            var fileName = $"{Guid.NewGuid():N}_{file.FileName}";
            var filePath = Path.Combine(uploadPath, fileName);

            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"{_options.BaseUrl}/{folder ?? "images"}/{fileName}";
        }

        public Task DeleteAsync(string fileUrl)
        {
            var path = fileUrl.Replace(_options.BaseUrl, _options.BasePath).Replace("/", Path.DirectorySeparatorChar.ToString());
            if (File.Exists(path))
                File.Delete(path);

            return Task.CompletedTask;
        }
    }
}
