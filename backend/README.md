# Gran Forno e Cozinha - Backend

API RESTful do restaurante Gran Forno e Cozinha, desenvolvida com .NET 9, ASP.NET Core Web API, Entity Framework Core e SQL Server.

## Tecnologias

- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- FluentValidation
- AutoMapper
- Serilog
- Swagger
- Health Checks
- BCrypt

## Estrutura do Projeto

```
backend/
├── GranForno.slnx
└── src/
    ├── GranForno.API/           # Controllers, Middlewares, Program.cs
    ├── GranForno.Application/   # Services, DTOs, Validators, Mappings
    ├── GranForno.Domain/        # Entities, Enums
    ├── GranForno.Infrastructure/ # Auth (JWT), Storage
    ├── GranForno.Persistence/   # DbContext, Migrations, Seeds
    └── GranForno.Shared/        # Extensions, Helpers
```

## Requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [SQL Server](https://www.microsoft.com/sql-server) (LocalDB, Express ou superior)

## Configuração do SQL Server

### 1. Instalar SQL Server

Caso não tenha o SQL Server instalado:

- **SQL Server Express LocalDB** (recomendado para desenvolvimento):
  - Já incluso no Visual Studio com a carga de trabalho "Armazenamento e processamento de dados"
  - Ou baixe em: https://go.microsoft.com/fwlink/?linkid=2304172

- **SQL Server Express**:
  - Baixe em: https://go.microsoft.com/fwlink/?linkid=2304171

### 2. Connection String

A connection string padrão está em `src/GranForno.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GranFornoDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Para SQL Server Express LocalDB**, altere para:
```json
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=GranFornoDb;Trusted_Connection=True;TrustServerCertificate=True;"
```

**Para SQL Server com autenticação SQL Server**, altere para:
```json
"DefaultConnection": "Server=localhost;Database=GranFornoDb;User Id=seu_usuario;Password=sua_senha;TrustServerCertificate=True;"
```

## Executando as Migrations

As migrations criam automaticamente todo o banco de dados.

### Usando dotnet-ef

1. Instale a ferramenta global (se não tiver):
```bash
dotnet tool install --global dotnet-ef
```

2. Execute a migration:
```bash
cd backend
dotnet ef database update -p src/GranForno.Persistence -s src/GranForno.API
```

### Usando Package Manager Console (Visual Studio)

1. No Package Manager Console, selecione o projeto `src/GranForno.Persistence`
2. Execute:
```bash
Update-Database
```

## Criando o Banco de Dados

O banco é criado automaticamente ao executar as migrations. 
Não é necessário criar manualmente.

## Iniciando a API

```bash
cd backend
dotnet run --project src/GranForno.API
```

A API estará disponível em:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001
- Swagger: http://localhost:5000/swagger
- Health Check: http://localhost:5000/health

## Publicando o Projeto

### Publicação para produção:

```bash
cd backend
dotnet publish src/GranForno.API -c Release -o ./publish
```

### Publicação como Framework-Dependent:

```bash
dotnet publish src/GranForno.API -c Release -o ./publish --self-contained false
```

### Publicação como Self-Contained (inclui runtime):

```bash
dotnet publish src/GranForno.API -c Release -o ./publish --self-contained true -r win-x64
```

Para Linux:
```bash
dotnet publish src/GranForno.API -c Release -o ./publish --self-contained true -r linux-x64
```

## Seed Inicial

Ao iniciar a API pela primeira vez, os seguintes dados são criados automaticamente:

### Administrador
- Email: `admin@granforno.com`
- Senha: `Admin@123`
- Role: Admin

### Produtos (Cardápio)
São criados 10 produtos de exemplo distribuídos nas categorias:
- Entradas (Bruschetta, Carpaccio)
- Massas (Fettuccine Alfredo, Ravioli)
- Carnes (Tagliata, Ossobuco)
- Sobremesas (Tiramisù, Panna Cotta)
- Bebidas (Suco Natural, Água Mineral)

### Configurações
Configurações padrão do restaurante com horários disponíveis.

## Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Cadastro |
| GET | `/api/auth/me` | Dados do usuário logado |
| PUT | `/api/auth/profile` | Atualizar perfil |
| POST | `/api/auth/change-password` | Alterar senha |
| POST | `/api/auth/refresh-token` | Renovar token |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/forgot-password` | Esqueci senha |
| POST | `/api/auth/reset-password` | Redefinir senha |
| POST | `/api/auth/google` | Login Google (preparado) |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/products` | Listar produtos |
| GET | `/api/products/{id}` | Obter produto |
| POST | `/api/products` | Criar (Admin) |
| PUT | `/api/products/{id}` | Atualizar (Admin) |
| DELETE | `/api/products/{id}` | Excluir (Admin) |

### Galeria
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/gallery` | Listar imagens |
| GET | `/api/gallery/{id}` | Obter imagem |
| POST | `/api/gallery` | Adicionar (Admin) |
| PUT | `/api/gallery/{id}` | Atualizar (Admin) |
| DELETE | `/api/gallery/{id}` | Excluir (Admin) |

### Reservas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/reservations` | Listar reservas |
| GET | `/api/reservations/my` | Minhas reservas |
| GET | `/api/reservations/{id}` | Obter reserva |
| POST | `/api/reservations` | Criar reserva |
| PATCH | `/api/reservations/{id}/status` | Atualizar status (Admin) |
| GET | `/api/reservations/availability` | Disponibilidade |

### Configurações
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/settings` | Obter configurações |
| PUT | `/api/settings` | Atualizar (Admin) |

### Upload
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/upload` | Upload de arquivo (Admin) |

### Admin
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/admin/dashboard` | Dashboard (Admin) |

## Frontend

O frontend está na pasta `gran` e foi configurado para consumir esta API.

### Variáveis de Ambiente

No arquivo `gran/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Formato das Respostas

### Sucesso:
```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

### Erro:
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": []
}
```
