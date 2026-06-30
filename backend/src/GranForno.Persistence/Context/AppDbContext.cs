using Microsoft.EntityFrameworkCore;
using GranForno.Domain.Entities;

namespace GranForno.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<GalleryImage> GalleryImages => Set<GalleryImage>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<ReservationStatusHistory> ReservationStatusHistories => Set<ReservationStatusHistory>();
        public DbSet<RestaurantSetting> RestaurantSettings => Set<RestaurantSetting>();
        public DbSet<ReservationSchedule> ReservationSchedules => Set<ReservationSchedule>();
        public DbSet<ReservationBlock> ReservationBlocks => Set<ReservationBlock>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
