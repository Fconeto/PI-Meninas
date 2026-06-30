using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.ToTable("refresh_tokens");
            builder.HasKey(rt => rt.Id);
            builder.Property(rt => rt.Token).HasColumnName("token").IsRequired().HasMaxLength(500);
            builder.Property(rt => rt.ExpiresAt).HasColumnName("expires_at").IsRequired();
            builder.Property(rt => rt.CreatedAt).HasColumnName("created_at").IsRequired();
            builder.Property(rt => rt.RevokedAt).HasColumnName("revoked_at");
            builder.Property(rt => rt.ReplacedByToken).HasColumnName("replaced_by_token").HasMaxLength(500);

            builder.HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(rt => rt.Token).HasDatabaseName("ix_refresh_tokens_token");
            builder.HasIndex(rt => rt.UserId).HasDatabaseName("ix_refresh_tokens_user_id");
        }
    }
}
