# Documentação do Sistema - Gran Forno e Cozinha

## Visão Geral

Sistema web completo para gestão do restaurante Gran Forno e Cozinha, desenvolvido como projeto de Pesquisa e Inovação. O sistema possui um site público para clientes e um painel administrativo para gerenciamento interno.

---

## Funcionalidades

### Site Público (Clientes)

#### Página Inicial (`/`)
- Seção hero com chamada principal
- Sobre o restaurante
- Galeria de destaques com as 8 fotos mais recentes
- Informações de contato e delivery

#### Cardápio (`/cardapio`)
- Listagem de produtos cadastrados
- Filtro por categorias: Todos, Entradas, Massas, Carnes, Sobremesas, Bebidas
- Busca por nome, descrição ou ingredientes
- Exibe nome, descrição, ingredientes, preço e observações do produto
- Produtos com imagem aparecem com foto

#### Galeria (`/galeria`)
- Grid de imagens no estilo masonry (colunas de tamanho variável)
- Filtro por categorias: Ambiente, Pratos, Eventos, Equipe, Detalhes
- Lightbox para visualização ampliada com título e descrição
- Imagens enviadas pelo painel administrativo

#### Reserva (`/reserva`)
- Escolha entre reserva de **Mesa** ou de **Ambiente** (evento)
- Passo a passo: selecionar tipo → preencher data, horário, quantidade de pessoas
- Para ambiente: campos extras de tipo de evento e decoração
- Validações: data futura, horário disponível, obrigatoriedade de login
- Confirmação exibida após envio bem-sucedido

#### Contato (`/contato`)
- Informações dinâmicas: telefone, WhatsApp (link direto), endereço, horário de funcionamento, link do delivery
- Mapa interativo com a localização exata do restaurante

#### Perfil do Cliente (`/perfil`)
- Exibe dados pessoais (nome, email, telefone)
- Editar perfil (`/perfil/editar`)
- Listagem de reservas do usuário com status (Pendente, Confirmada, Cancelada, Concluída)
- Cancelamento de reserva com até 24h de antecedência
- Botão de sair da conta

#### Autenticação
- Login (`/login`) com email e senha
- Cadastro (`/register`) com nome, email, telefone e senha
- Redirecionamento após login bem-sucedido
- Navbar dinâmica: exibe nome do usuário logado e link extra para Dashboard (se admin)

---

### Painel Administrativo (`/dashboard`)

Acesso exclusivo para usuários com role **Admin**.

#### Dashboard (`/dashboard`)
- 4 indicadores (KPIs): Total de Reservas, Reservas Hoje, Produtos, Fotos
- Gráfico de barras: reservas nos últimos 7 dias
- Gráfico de pizza (rosca): distribuição por status (Pendente, Confirmada, Cancelada, Concluída)
- Lista de próximas reservas

#### Produtos (`/dashboard/produtos`)
- CRUD completo de produtos do cardápio
- Campos: nome, preço, categoria, descrição, ingredientes, observações
- Upload de imagem com preview (drag or select)
- Ativar/desativar produto para controle de exibição
- Busca por nome

#### Galeria (`/dashboard/galeria`)
- CRUD completo de imagens da galeria
- Upload múltiplo: selecione várias imagens de uma vez
- Campos: título, categoria, descrição
- Preview da imagem no formulário

#### Reservas (`/dashboard/reservas`)
- Listagem de todas as reservas em tabela
- Filtros: busca por nome/email do cliente, data, status, tipo (mesa/ambiente)
- Alteração de status inline: Pendente → Confirmada → Cancelada → Concluída
- Botão de recarregar lista

#### Configurações (`/dashboard/configuracoes`)
- **Capacidade:** total de mesas, capacidade por mesa, máximo de reservas por horário, tempo entre reservas
- **Horários disponíveis:** adicionar/remover horários (ex: 11:30, 12:00, ...)
- **Informações do restaurante:** telefone, WhatsApp, endereço, URL do delivery, horário de funcionamento
- Salvar todas as configurações de uma vez

---

## Regras de Negócio

1. **Reservas:** não permitidas para datas passadas
2. **Horário duplicado:** não permitir duas reservas no mesmo horário para mesma mesa
3. **Capacidade:** respeitar limite de mesas e capacidade por mesa
4. **Ambiente exclusivo:** apenas uma reserva de ambiente por horário
5. **Cancelamento:** permitido apenas com 24h ou mais de antecedência
6. **Admin:** necessário estar logado com role Admin para acessar o dashboard
7. **Produtos:** só aparecem no cardápio público se marcados como "ativo"
8. **Imagens:** armazenadas no servidor, servidas via URL absoluta

---

## Tecnologias Utilizadas

### Backend
- **.NET 9** — framework principal da API
- **ASP.NET Core Web API** — construção dos endpoints REST
- **Entity Framework Core** — ORM para banco de dados
- **SQL Server** — banco de dados relacional
- **JWT Bearer** — autenticação por token
- **BCrypt** — hash e verificação de senhas
- **AutoMapper** — mapeamento entre entidades e DTOs
- **Serilog** — logging estruturado
- **Swagger** — documentação interativa da API
- **Health Checks** — monitoramento de saúde do banco

### Frontend
- **React 19** — biblioteca de interface
- **Vite** — bundler e dev server
- **React Router v6** — navegação entre páginas
- **Tailwind CSS v4** — estilização
- **Framer Motion** — animações
- **Recharts** — gráficos do dashboard
- **TanStack Query** — cache e gerenciamento de requisições

---

## Usuários do Sistema

### Administrador
- Acessa o painel administrativo completo
- Gerencia produtos, galeria, reservas e configurações
- Visualiza dados e gráficos do dashboard
- Credencial padrão: `admin@granforno.com` / `Admin@123`

### Cliente
- Visualiza cardápio, galeria e informações do restaurante
- Faz reservas (mesa ou ambiente)
- Gerencia perfil e visualiza histórico de reservas
- Pode cancelar reservas com até 24h de antecedência

---

## Fluxo de Navegação

```
┌─────────────────────────────────────────────────┐
│                  SITE PÚBLICO                    │
│                                                 │
│  Home → Cardápio → Galeria → Reserva → Contato  │
│                    ↑                             │
│               Login/Register                     │
│                    ↓                             │
│               Perfil (minhas reservas)           │
│                    ↓                             │
│            Editar Perfil                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               PAINEL ADMIN                       │
│                                                 │
│  Dashboard                                       │
│  ├── Produtos (CRUD)                             │
│  ├── Galeria (CRUD + upload múltiplo)            │
│  ├── Reservas (listagem + alterar status)        │
│  └── Configurações (capacidade, horários, info)  │
└─────────────────────────────────────────────────┘
```
