using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;
using GranForno.Domain.Enums;

namespace GranForno.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.FullName).HasColumnName("full_name").IsRequired().HasMaxLength(200);
            builder.Property(u => u.Email).HasColumnName("email").IsRequired().HasMaxLength(200);
            builder.Property(u => u.Phone).HasColumnName("phone").HasMaxLength(20);
            builder.Property(u => u.PasswordHash).HasColumnName("password_hash").HasMaxLength(500);
            builder.Property(u => u.Provider).HasColumnName("provider").IsRequired().HasMaxLength(50).HasDefaultValue("email");
            builder.Property(u => u.Role).HasColumnName("role").IsRequired().HasConversion<string>().HasMaxLength(20).HasDefaultValue(UserRole.Customer);
            builder.Property(u => u.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(u => u.UpdatedAt).HasColumnName("updated_at").IsRequired();

            builder.HasIndex(u => u.Email).IsUnique().HasDatabaseName("ix_users_email");
        }
    }
}
