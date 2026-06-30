using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class ReservationStatusHistoryConfiguration : IEntityTypeConfiguration<ReservationStatusHistory>
    {
        public void Configure(EntityTypeBuilder<ReservationStatusHistory> builder)
        {
            builder.ToTable("reservation_status_history");
            builder.HasKey(h => h.Id);
            builder.Property(h => h.StatusAnterior).HasColumnName("status_anterior").HasConversion<string>().HasMaxLength(20);
            builder.Property(h => h.StatusNovo).HasColumnName("status_novo").IsRequired().HasConversion<string>().HasMaxLength(20);
            builder.Property(h => h.CreatedAt).HasColumnName("created_at").IsRequired();

            builder.HasOne(h => h.Reservation)
                .WithMany(r => r.StatusHistory)
                .HasForeignKey(h => h.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(h => h.AlteradoPorUser)
                .WithMany()
                .HasForeignKey(h => h.AlteradoPor)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
