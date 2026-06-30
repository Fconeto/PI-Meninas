using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("products");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Nome).HasColumnName("nome").IsRequired().HasMaxLength(200);
            builder.Property(p => p.Descricao).HasColumnName("descricao").HasMaxLength(1000);
            builder.Property(p => p.Ingredientes).HasColumnName("ingredientes").HasMaxLength(1000);
            builder.Property(p => p.Preco).HasColumnName("preco").IsRequired().HasPrecision(10, 2);
            builder.Property(p => p.Observacoes).HasColumnName("observacoes").HasMaxLength(500);
            builder.Property(p => p.Categoria).HasColumnName("categoria").IsRequired().HasMaxLength(100);
            builder.Property(p => p.Imagem).HasColumnName("imagem").HasMaxLength(500);
            builder.Property(p => p.Ativo).HasColumnName("ativo").IsRequired().HasDefaultValue(true);
            builder.Property(p => p.Ordenacao).HasColumnName("ordenacao").HasDefaultValue(0);
            builder.Property(p => p.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(p => p.UpdatedAt).HasColumnName("updated_at").IsRequired();

            builder.HasIndex(p => p.Categoria).HasDatabaseName("ix_products_categoria");
        }
    }
}
