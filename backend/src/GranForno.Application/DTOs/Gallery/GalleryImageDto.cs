namespace GranForno.Application.DTOs.Gallery
{
    public class GalleryImageDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string Imagem { get; set; } = string.Empty;
        public int Ordem { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
