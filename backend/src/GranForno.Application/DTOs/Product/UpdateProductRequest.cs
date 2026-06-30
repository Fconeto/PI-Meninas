namespace GranForno.Application.DTOs.Product
{
    public class UpdateProductRequest
    {
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Ingredientes { get; set; }
        public decimal? Preco { get; set; }
        public string? Observacoes { get; set; }
        public string? Categoria { get; set; }
        public string? Imagem { get; set; }
        public bool? Ativo { get; set; }
        public int? Ordenacao { get; set; }
    }
}
