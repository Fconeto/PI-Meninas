using Microsoft.EntityFrameworkCore;
using GranForno.Domain.Entities;
using GranForno.Domain.Enums;
using GranForno.Persistence.Context;

namespace GranForno.Persistence.Seeds
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(AppDbContext context)
        {
            await SeedAdminUser(context);
            await SeedSettings(context);
            await SeedProductCategories(context);
        }

        private static async Task SeedAdminUser(AppDbContext context)
        {
            if (await context.Users.AnyAsync(u => u.Email == "admin@granforno.com"))
                return;

            var admin = new User
            {
                FullName = "Administrador",
                Email = "admin@granforno.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Provider = "email",
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);
            await context.SaveChangesAsync();
        }

        private static async Task SeedSettings(AppDbContext context)
        {
            if (await context.RestaurantSettings.AnyAsync())
                return;

            var horarios = new List<string>
            {
                "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
            };

            var settings = new RestaurantSetting
            {
                Telefone = "(11) 3456-7890",
                WhatsApp = "5511934567890",
                DeliveryUrl = "https://delivery.granforno.com.br",
                Endereco = "Rua das Oliveiras, 250 - Vila Madalena, São Paulo - SP",
                HorarioFuncionamento = "Terça a Domingo: 11h30 - 15h00 | 18h00 - 23h00",
                TotalMesas = 20,
                CapacidadePorMesa = 4,
                MaxReservasPorHorario = 10,
                TempoEntreReservas = 0,
                HorariosDisponiveis = System.Text.Json.JsonSerializer.Serialize(horarios),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.RestaurantSettings.Add(settings);
            await context.SaveChangesAsync();
        }

        private static async Task SeedProductCategories(AppDbContext context)
        {
            if (await context.Products.AnyAsync())
                return;

            var categories = new[] { "Entradas", "Massas", "Carnes", "Sobremesas", "Bebidas" };
            var sampleProducts = new List<Product>
            {
                new() { Nome = "Bruschetta Clássica", Descricao = "Pão italiano tostado com tomates frescos, manjericão e azeite de oliva extra virgem", Preco = 38.00m, Categoria = "Entradas", Ativo = true, Ordenacao = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Carpaccio de Filet Mignon", Descricao = "Finas fatias de filet mignon com rúcula, lascas de parmesão e molho mostarda", Preco = 52.00m, Categoria = "Entradas", Ativo = true, Ordenacao = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Fettuccine Alfredo", Descricao = "Massa fresca artesanal com molho cremoso de parmesão e manteiga", Ingredientes = "Fettuccine fresco, creme de leite, parmesão, manteiga", Preco = 68.00m, Categoria = "Massas", Ativo = true, Ordenacao = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Ravioli de Ricotta com Espinafre", Descricao = "Massa recheada com ricota cremosa e espinafre ao molho de manteiga e sálvia", Preco = 72.00m, Categoria = "Massas", Ativo = true, Ordenacao = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Tagliata de Filet Mignon", Descricao = "Filet mignon grelhado com rúcula, tomate seco e lascas de parmesão", Preco = 89.00m, Categoria = "Carnes", Ativo = true, Ordenacao = 5, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Ossobuco Milanese", Descricao = "Miolo de ossobuco cozido lentamente com risoto de açafrão", Preco = 98.00m, Categoria = "Carnes", Ativo = true, Ordenacao = 6, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Tiramisù Tradicional", Descricao = "Sobremesa italiana com camadas de mascarpone, café e cacau", Preco = 32.00m, Categoria = "Sobremesas", Ativo = true, Ordenacao = 7, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Panna Cotta com Frutas Vermelhas", Descricao = "Creme italiano servido com calda de frutas vermelhas", Preco = 28.00m, Categoria = "Sobremesas", Ativo = true, Ordenacao = 8, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Suco Natural", Descricao = "Suco fresco de laranja, limão ou abacaxi", Preco = 14.00m, Categoria = "Bebidas", Ativo = true, Ordenacao = 9, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Nome = "Água Mineral", Descricao = "Água mineral sem gás ou com gás 500ml", Preco = 6.00m, Categoria = "Bebidas", Ativo = true, Ordenacao = 10, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            };

            context.Products.AddRange(sampleProducts);
            await context.SaveChangesAsync();
        }
    }
}
