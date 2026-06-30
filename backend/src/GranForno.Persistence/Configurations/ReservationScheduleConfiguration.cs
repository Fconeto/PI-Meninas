using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class ReservationScheduleConfiguration : IEntityTypeConfiguration<ReservationSchedule>
    {
        public void Configure(EntityTypeBuilder<ReservationSchedule> builder)
        {
            builder.ToTable("reservation_schedules");
            builder.HasKey(rs => rs.Id);
            builder.Property(rs => rs.DiaSemana).HasColumnName("dia_semana").IsRequired().HasConversion<int>();
            builder.Property(rs => rs.HoraInicio).HasColumnName("hora_inicio").IsRequired();
            builder.Property(rs => rs.HoraFim).HasColumnName("hora_fim").IsRequired();
            builder.Property(rs => rs.Ativo).HasColumnName("ativo").IsRequired().HasDefaultValue(true);
        }
    }
}
