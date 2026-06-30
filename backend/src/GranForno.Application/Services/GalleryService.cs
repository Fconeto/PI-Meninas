using AutoMapper;
using Microsoft.EntityFrameworkCore;
using GranForno.Application.DTOs.Gallery;
using GranForno.Application.Interfaces;
using GranForno.Domain.Entities;
using GranForno.Persistence.Context;

namespace GranForno.Application.Services
{
    public class GalleryService : IGalleryService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GalleryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GalleryImageDto>> GetAllAsync(string? categoria = null)
        {
            var query = _context.GalleryImages.AsQueryable();

            if (!string.IsNullOrEmpty(categoria) && categoria != "Todos")
                query = query.Where(gi => gi.Categoria == categoria);

            var images = await query.OrderBy(gi => gi.Ordem).ThenByDescending(gi => gi.CreatedAt).ToListAsync();
            return _mapper.Map<List<GalleryImageDto>>(images);
        }

        public async Task<GalleryImageDto?> GetByIdAsync(int id)
        {
            var image = await _context.GalleryImages.FindAsync(id);
            return image == null ? null : _mapper.Map<GalleryImageDto>(image);
        }

        public async Task<GalleryImageDto> CreateAsync(CreateGalleryImageRequest request)
        {
            var image = new GalleryImage
            {
                Titulo = request.Titulo,
                Descricao = request.Descricao,
                Categoria = request.Categoria,
                Imagem = request.Imagem,
                Ordem = request.Ordem,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.GalleryImages.Add(image);
            await _context.SaveChangesAsync();

            return _mapper.Map<GalleryImageDto>(image);
        }

        public async Task<GalleryImageDto> UpdateAsync(int id, UpdateGalleryImageRequest request)
        {
            var image = await _context.GalleryImages.FindAsync(id);
            if (image == null)
                throw new KeyNotFoundException("Imagem não encontrada.");

            if (request.Titulo != null) image.Titulo = request.Titulo;
            if (request.Descricao != null) image.Descricao = request.Descricao;
            if (request.Categoria != null) image.Categoria = request.Categoria;
            if (request.Imagem != null) image.Imagem = request.Imagem;
            if (request.Ordem.HasValue) image.Ordem = request.Ordem.Value;

            image.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<GalleryImageDto>(image);
        }

        public async Task DeleteAsync(int id)
        {
            var image = await _context.GalleryImages.FindAsync(id);
            if (image == null)
                throw new KeyNotFoundException("Imagem não encontrada.");

            _context.GalleryImages.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
