using GranForno.Application.DTOs.Product;

namespace GranForno.Application.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllAsync(string? categoria = null, bool? ativo = null);
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(CreateProductRequest request);
        Task<ProductDto> UpdateAsync(int id, UpdateProductRequest request);
        Task DeleteAsync(int id);
    }
}
