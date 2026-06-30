namespace GranForno.Application.DTOs.Product
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Ingredientes { get; set; }
        public decimal Preco { get; set; }
        public string? Observacoes { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public string? Imagem { get; set; }
        public bool Ativo { get; set; } = true;
        public int Ordenacao { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
