# Gran Forno e Cozinha

Sistema web completo para gestão de restaurante — cardápio digital, galeria, reservas e painel administrativo.

---

## Pré-requisitos

- **Node.js** 18+ (com npm)
- **.NET 9 SDK**
- **SQL Server** (local ou remoto)

---

## Estrutura do Projeto

```
/
├── backend/                  # API REST (.NET 9)
│   └── src/
│       ├── GranForno.API          # Controllers, Middlewares, Program.cs
│       ├── GranForno.Application  # Casos de uso, DTOs, interfaces, AutoMapper
│       ├── GranForno.Domain       # Entidades, regras de negócio
│       ├── GranForno.Infrastructure# Auth (JWT), Storage (local)
│       ├── GranForno.Persistence  # EF Core DbContext, migrations, seeds
│       └── GranForno.Shared       # Objetos compartilhados (exceptions, helpers)
│
├── gran/                     # Frontend SPA (React + Vite)
│   └── src/
│       ├── api/                   # ApiClient, services (auth, products, gallery, etc.)
│       ├── components/            # Componentes reutilizáveis (layout, ui, home)
│       ├── hooks/                 # Hooks customizados (use-toast, etc.)
│       ├── lib/                   # AuthContext, PageNotFound, query-client
│       └── pages/                 # Páginas públicas e admin
```

---

## Configuração do Backend

```bash
cd backend/src/GranForno.API
```

Ajuste no **appsettings.json**:
- `ConnectionStrings.DefaultConnection`: sua connection string do SQL Server
- `Jwt.Secret`: chave secreta com no mínimo 32 caracteres
- `Upload.LocalPath`: diretório de uploads (padrão: `wwwroot/uploads`)

### Executar

```bash
dotnet restore
dotnet build
dotnet run
```

A API sobe em `http://localhost:5000` com Swagger em `/swagger`.

### Banco de Dados

A migration `InitialCreate` já existe. Para criar as tabelas:

```bash
dotnet ef database update -p src/GranForno.Persistence -s src/GranForno.API
```

**Opcional:** O seed roda automaticamente na inicialização e cria:
- **Admin padrão:** admin@granforno.com / Admin@123
- **10 produtos** de exemplo (massas, carnes, bebidas, etc.)
- **Configurações** do restaurante (horários, capacidade, contato)

---

## Configuração do Frontend

```bash
cd gran
npm install
```

No arquivo `.env` (ou `.env.local`):
```
VITE_API_URL=http://localhost:5000/api
```

### Executar

```bash
npm run dev
```

O frontend sobe em `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos estáticos serão gerados em `gran/dist/`.

---

## Endpoints da API

| Método | Rota                    | Descrição               |
|--------|-------------------------|-------------------------|
| POST   | `/api/auth/login`       | Login                   |
| POST   | `/api/auth/register`    | Cadastro                |
| GET    | `/api/auth/me`          | Dados do usuário atual  |
| PUT    | `/api/auth/profile`     | Atualizar perfil        |
| GET    | `/api/products`         | Listar produtos         |
| POST   | `/api/products`         | Criar produto (Admin)   |
| PUT    | `/api/products/{id}`    | Atualizar produto (Admin)|
| DELETE | `/api/products/{id}`    | Excluir produto (Admin) |
| GET    | `/api/gallery`          | Listar galeria          |
| POST   | `/api/gallery`          | Adicionar imagem (Admin)|
| PUT    | `/api/gallery/{id}`     | Atualizar imagem (Admin)|
| DELETE | `/api/gallery/{id}`     | Excluir imagem (Admin)  |
| GET    | `/api/reservations`     | Listar reservas (Admin) |
| GET    | `/api/reservations/my`  | Minhas reservas         |
| POST   | `/api/reservations`     | Criar reserva           |
| PATCH  | `/api/reservations/{id}/status`| Alterar status (Admin)|
| GET    | `/api/settings`         | Obter configurações     |
| PUT    | `/api/settings`         | Atualizar configurações (Admin) |
| POST   | `/api/upload`           | Upload de imagem (Admin)|
| GET    | `/api/admin/dashboard`  | Estatísticas (Admin)    |
| GET    | `/health`               | Health check            |

---

## Tecnologias

### Backend
- .NET 9 + ASP.NET Core Web API
- Entity Framework Core + SQL Server
- JWT Bearer Authentication
- AutoMapper, FluentValidation, Swagger
- Serilog, Health Checks
- BCrypt para hash de senhas

### Frontend
- React 19 + Vite
- React Router v6
- TanStack Query
- Tailwind CSS v4
- Framer Motion
- Recharts (gráficos do dashboard)

---

## Credenciais Padrão

- **Admin:** admin@granforno.com / Admin@123
- **Usuário comum:** criar conta via `/register`

---

## Observações

- Imagens enviadas por upload ficam em `backend/src/GranForno.API/wwwroot/uploads/`
- O frontend em dev usa proxy do Vite para `/uploads` → `http://localhost:5000`
- A role `Admin` é necessária para acessar qualquer rota `/dashboard`
- Reservas não podem ser feitas para datas passadas, nem duplicadas no mesmo horário
- Cancelamento de reserva permite 24h de antecedência
