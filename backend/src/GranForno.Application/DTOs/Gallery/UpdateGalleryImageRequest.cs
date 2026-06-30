namespace GranForno.Application.DTOs.Gallery
{
    public class UpdateGalleryImageRequest
    {
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string? Imagem { get; set; }
        public int? Ordem { get; set; }
    }
}
