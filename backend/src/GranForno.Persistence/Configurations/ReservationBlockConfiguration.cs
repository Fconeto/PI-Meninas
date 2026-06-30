using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class ReservationBlockConfiguration : IEntityTypeConfiguration<ReservationBlock>
    {
        public void Configure(EntityTypeBuilder<ReservationBlock> builder)
        {
            builder.ToTable("reservation_blocks");
            builder.HasKey(rb => rb.Id);
            builder.Property(rb => rb.Data).HasColumnName("data").IsRequired();
            builder.Property(rb => rb.Horario).HasColumnName("horario").HasMaxLength(10);
            builder.Property(rb => rb.Motivo).HasColumnName("motivo").HasMaxLength(500);
            builder.Property(rb => rb.Ativo).HasColumnName("ativo").IsRequired().HasDefaultValue(true);
            builder.Property(rb => rb.CreatedAt).HasColumnName("created_at").IsRequired();

            builder.HasIndex(rb => new { rb.Data, rb.Horario }).HasDatabaseName("ix_reservation_blocks_data_horario");
        }
    }
}
