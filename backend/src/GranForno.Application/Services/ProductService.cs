using AutoMapper;
using Microsoft.EntityFrameworkCore;
using GranForno.Application.DTOs.Product;
using GranForno.Application.Interfaces;
using GranForno.Domain.Entities;
using GranForno.Persistence.Context;

namespace GranForno.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProductDto>> GetAllAsync(string? categoria = null, bool? ativo = null)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(categoria) && categoria != "Todos")
                query = query.Where(p => p.Categoria == categoria);

            if (ativo.HasValue)
                query = query.Where(p => p.Ativo == ativo.Value);

            var products = await query.OrderBy(p => p.Ordenacao).ThenByDescending(p => p.CreatedAt).ToListAsync();
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product == null ? null : _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> CreateAsync(CreateProductRequest request)
        {
            var product = new Product
            {
                Nome = request.Nome,
                Descricao = request.Descricao,
                Ingredientes = request.Ingredientes,
                Preco = request.Preco,
                Observacoes = request.Observacoes,
                Categoria = request.Categoria,
                Imagem = request.Imagem,
                Ativo = request.Ativo,
                Ordenacao = request.Ordenacao,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> UpdateAsync(int id, UpdateProductRequest request)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                throw new KeyNotFoundException("Produto não encontrado.");

            if (request.Nome != null) product.Nome = request.Nome;
            if (request.Descricao != null) product.Descricao = request.Descricao;
            if (request.Ingredientes != null) product.Ingredientes = request.Ingredientes;
            if (request.Preco.HasValue) product.Preco = request.Preco.Value;
            if (request.Observacoes != null) product.Observacoes = request.Observacoes;
            if (request.Categoria != null) product.Categoria = request.Categoria;
            if (request.Imagem != null) product.Imagem = request.Imagem;
            if (request.Ativo.HasValue) product.Ativo = request.Ativo.Value;
            if (request.Ordenacao.HasValue) product.Ordenacao = request.Ordenacao.Value;

            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<ProductDto>(product);
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                throw new KeyNotFoundException("Produto não encontrado.");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
