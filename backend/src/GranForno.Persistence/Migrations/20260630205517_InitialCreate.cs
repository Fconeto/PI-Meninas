using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GranForno.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "gallery_images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    titulo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    descricao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    categoria = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    imagem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ordem = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gallery_images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    descricao = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ingredientes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    preco = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    observacoes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    categoria = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    imagem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ativo = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    ordenacao = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reservation_blocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    horario = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    motivo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ativo = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation_blocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reservation_schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dia_semana = table.Column<int>(type: "int", nullable: false),
                    hora_inicio = table.Column<TimeSpan>(type: "time", nullable: false),
                    hora_fim = table.Column<TimeSpan>(type: "time", nullable: false),
                    ativo = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation_schedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "restaurant_settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    telefone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    whatsapp = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    delivery_url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    endereco = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    horario_funcionamento = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    total_mesas = table.Column<int>(type: "int", nullable: false, defaultValue: 20),
                    capacidade_por_mesa = table.Column<int>(type: "int", nullable: false, defaultValue: 4),
                    max_reservas_por_horario = table.Column<int>(type: "int", nullable: false, defaultValue: 10),
                    tempo_entre_reservas = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    horarios_disponiveis = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    texto_home = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    imagem_hero = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurant_settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    full_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    password_hash = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    provider = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "email"),
                    role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Customer"),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "refresh_tokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    token = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    expires_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    revoked_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    replaced_by_token = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_refresh_tokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_refresh_tokens_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    tipo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    horario = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    quantidade_pessoas = table.Column<int>(type: "int", nullable: false),
                    tipo_evento = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    decoracao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    observacoes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Pendente"),
                    cliente_nome = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    cliente_email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    cliente_telefone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reservations_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "reservation_status_history",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationId = table.Column<int>(type: "int", nullable: false),
                    status_anterior = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    status_novo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    AlteradoPor = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation_status_history", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reservation_status_history_reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reservation_status_history_users_AlteradoPor",
                        column: x => x.AlteradoPor,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "ix_gallery_images_categoria",
                table: "gallery_images",
                column: "categoria");

            migrationBuilder.CreateIndex(
                name: "ix_products_categoria",
                table: "products",
                column: "categoria");

            migrationBuilder.CreateIndex(
                name: "ix_refresh_tokens_token",
                table: "refresh_tokens",
                column: "token");

            migrationBuilder.CreateIndex(
                name: "ix_refresh_tokens_user_id",
                table: "refresh_tokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "ix_reservation_blocks_data_horario",
                table: "reservation_blocks",
                columns: new[] { "data", "horario" });

            migrationBuilder.CreateIndex(
                name: "IX_reservation_status_history_AlteradoPor",
                table: "reservation_status_history",
                column: "AlteradoPor");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_status_history_ReservationId",
                table: "reservation_status_history",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "ix_reservations_data",
                table: "reservations",
                column: "data");

            migrationBuilder.CreateIndex(
                name: "ix_reservations_status",
                table: "reservations",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_reservations_user_id",
                table: "reservations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                table: "users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "gallery_images");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "refresh_tokens");

            migrationBuilder.DropTable(
                name: "reservation_blocks");

            migrationBuilder.DropTable(
                name: "reservation_schedules");

            migrationBuilder.DropTable(
                name: "reservation_status_history");

            migrationBuilder.DropTable(
                name: "restaurant_settings");

            migrationBuilder.DropTable(
                name: "reservations");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
