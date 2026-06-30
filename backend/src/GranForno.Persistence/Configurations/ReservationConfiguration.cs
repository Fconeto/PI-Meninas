using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;
using GranForno.Domain.Enums;

namespace GranForno.Persistence.Configurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.ToTable("reservations");
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Tipo).HasColumnName("tipo").IsRequired().HasConversion<string>().HasMaxLength(20);
            builder.Property(r => r.Data).HasColumnName("data").IsRequired();
            builder.Property(r => r.Horario).HasColumnName("horario").IsRequired().HasMaxLength(10);
            builder.Property(r => r.QuantidadePessoas).HasColumnName("quantidade_pessoas").IsRequired();
            builder.Property(r => r.TipoEvento).HasColumnName("tipo_evento").HasMaxLength(100);
            builder.Property(r => r.Decoracao).HasColumnName("decoracao").HasMaxLength(500);
            builder.Property(r => r.Observacoes).HasColumnName("observacoes").HasMaxLength(1000);
            builder.Property(r => r.Status).HasColumnName("status").IsRequired().HasConversion<string>().HasMaxLength(20).HasDefaultValue(ReservationStatus.Pendente);
            builder.Property(r => r.ClienteNome).HasColumnName("cliente_nome").HasMaxLength(200);
            builder.Property(r => r.ClienteEmail).HasColumnName("cliente_email").HasMaxLength(200);
            builder.Property(r => r.ClienteTelefone).HasColumnName("cliente_telefone").HasMaxLength(20);
            builder.Property(r => r.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(r => r.UpdatedAt).HasColumnName("updated_at").IsRequired();

            builder.HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(r => r.Data).HasDatabaseName("ix_reservations_data");
            builder.HasIndex(r => r.Status).HasDatabaseName("ix_reservations_status");
            builder.HasIndex(r => r.UserId).HasDatabaseName("ix_reservations_user_id");
        }
    }
}
