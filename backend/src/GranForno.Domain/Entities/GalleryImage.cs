namespace GranForno.Domain.Entities
{
    public class GalleryImage
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string Imagem { get; set; } = string.Empty;
        public int Ordem { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
