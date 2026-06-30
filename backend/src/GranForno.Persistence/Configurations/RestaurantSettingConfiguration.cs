using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class RestaurantSettingConfiguration : IEntityTypeConfiguration<RestaurantSetting>
    {
        public void Configure(EntityTypeBuilder<RestaurantSetting> builder)
        {
            builder.ToTable("restaurant_settings");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Telefone).HasColumnName("telefone").HasMaxLength(20);
            builder.Property(s => s.WhatsApp).HasColumnName("whatsapp").HasMaxLength(20);
            builder.Property(s => s.DeliveryUrl).HasColumnName("delivery_url").HasMaxLength(500);
            builder.Property(s => s.Endereco).HasColumnName("endereco").HasMaxLength(500);
            builder.Property(s => s.HorarioFuncionamento).HasColumnName("horario_funcionamento").HasMaxLength(500);
            builder.Property(s => s.TotalMesas).HasColumnName("total_mesas").HasDefaultValue(20);
            builder.Property(s => s.CapacidadePorMesa).HasColumnName("capacidade_por_mesa").HasDefaultValue(4);
            builder.Property(s => s.MaxReservasPorHorario).HasColumnName("max_reservas_por_horario").HasDefaultValue(10);
            builder.Property(s => s.TempoEntreReservas).HasColumnName("tempo_entre_reservas").HasDefaultValue(0);
            builder.Property(s => s.HorariosDisponiveis).HasColumnName("horarios_disponiveis").HasMaxLength(2000);
            builder.Property(s => s.TextoHome).HasColumnName("texto_home").HasMaxLength(2000);
            builder.Property(s => s.ImagemHero).HasColumnName("imagem_hero").HasMaxLength(500);
            builder.Property(s => s.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(s => s.UpdatedAt).HasColumnName("updated_at").IsRequired();
        }
    }
}
