using GranForno.Application.DTOs.Gallery;

namespace GranForno.Application.Interfaces
{
    public interface IGalleryService
    {
        Task<List<GalleryImageDto>> GetAllAsync(string? categoria = null);
        Task<GalleryImageDto?> GetByIdAsync(int id);
        Task<GalleryImageDto> CreateAsync(CreateGalleryImageRequest request);
        Task<GalleryImageDto> UpdateAsync(int id, UpdateGalleryImageRequest request);
        Task DeleteAsync(int id);
    }
}
