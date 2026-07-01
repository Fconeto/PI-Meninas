using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GranForno.Application.DTOs.Shared;
using GranForno.Application.DTOs.Upload;
using GranForno.Application.Interfaces;

namespace GranForno.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UploadController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public UploadController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(ApiResponse<object>.Fail("Nenhum arquivo enviado."));

            var fileUrl = await _storageService.UploadAsync(file);
            var fullUrl = $"{Request.Scheme}://{Request.Host}{fileUrl}";
            return Ok(ApiResponse<UploadResponse>.Ok(new UploadResponse { FileUrl = fullUrl, FileName = file.FileName }, "Upload realizado com sucesso."));
        }
    }
}
