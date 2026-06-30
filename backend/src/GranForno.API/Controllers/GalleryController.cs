using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GranForno.Application.DTOs.Gallery;
using GranForno.Application.DTOs.Shared;
using GranForno.Application.Interfaces;

namespace GranForno.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly IGalleryService _galleryService;

        public GalleryController(IGalleryService galleryService)
        {
            _galleryService = galleryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? categoria)
        {
            var images = await _galleryService.GetAllAsync(categoria);
            return Ok(ApiResponse<List<GalleryImageDto>>.Ok(images));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var image = await _galleryService.GetByIdAsync(id);
            if (image == null)
                return NotFound(ApiResponse<object>.Fail("Imagem não encontrada."));
            return Ok(ApiResponse<GalleryImageDto>.Ok(image));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateGalleryImageRequest request)
        {
            var image = await _galleryService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = image.Id }, ApiResponse<GalleryImageDto>.Ok(image, "Imagem adicionada com sucesso."));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateGalleryImageRequest request)
        {
            var image = await _galleryService.UpdateAsync(id, request);
            return Ok(ApiResponse<GalleryImageDto>.Ok(image, "Imagem atualizada com sucesso."));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _galleryService.DeleteAsync(id);
            return Ok(ApiResponse<object>.Ok(new { }, "Imagem excluída com sucesso."));
        }
    }
}
