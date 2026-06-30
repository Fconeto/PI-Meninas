using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class GalleryImageConfiguration : IEntityTypeConfiguration<GalleryImage>
    {
        public void Configure(EntityTypeBuilder<GalleryImage> builder)
        {
            builder.ToTable("gallery_images");
            builder.HasKey(gi => gi.Id);
            builder.Property(gi => gi.Titulo).HasColumnName("titulo").IsRequired().HasMaxLength(200);
            builder.Property(gi => gi.Descricao).HasColumnName("descricao").HasMaxLength(500);
            builder.Property(gi => gi.Categoria).HasColumnName("categoria").HasMaxLength(100);
            builder.Property(gi => gi.Imagem).HasColumnName("imagem").IsRequired().HasMaxLength(500);
            builder.Property(gi => gi.Ordem).HasColumnName("ordem").HasDefaultValue(0);
            builder.Property(gi => gi.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(gi => gi.UpdatedAt).HasColumnName("updated_at").IsRequired();

            builder.HasIndex(gi => gi.Categoria).HasDatabaseName("ix_gallery_images_categoria");
        }
    }
}
