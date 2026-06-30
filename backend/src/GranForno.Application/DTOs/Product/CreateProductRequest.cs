namespace GranForno.Application.DTOs.Product
{
    public class CreateProductRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Ingredientes { get; set; }
        public decimal Preco { get; set; }
        public string? Observacoes { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public string? Imagem { get; set; }
        public bool Ativo { get; set; } = true;
        public int Ordenacao { get; set; }
    }
}
