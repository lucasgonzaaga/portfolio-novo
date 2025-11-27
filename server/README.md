# Portfolio Feedback API

Backend API para sistema de feedbacks do portfólio.

## 🚀 Configuração

### 1. Instalar dependências

```bash
cd server
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure suas credenciais do PostgreSQL:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_POSTGRES
JWT_SECRET=seu_secret_jwt_super_secreto
PORT=3001
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Criar banco de dados

No PostgreSQL, crie o banco de dados:

```bash
createdb portfolio_db
```

Ou via psql:

```sql
CREATE DATABASE portfolio_db;
```

### 4. Executar setup do banco

Este comando criará as tabelas e o usuário admin:

```bash
npm run setup
```

### 5. Iniciar servidor

```bash
npm start
```

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

## 📡 Endpoints da API

### Público

- `POST /api/feedbacks` - Criar novo feedback
- `GET /api/feedbacks` - Listar feedbacks aprovados
- `GET /api/health` - Health check

### Admin (requer autenticação)

- `POST /api/admin/login` - Login admin
- `GET /api/admin/feedbacks` - Listar todos feedbacks
- `PATCH /api/admin/feedbacks/:id/approve` - Aprovar feedback
- `DELETE /api/admin/feedbacks/:id` - Deletar feedback

## 🔐 Autenticação

Para acessar endpoints admin, você precisa:

1. Fazer login em `/api/admin/login`
2. Usar o token JWT retornado no header `Authorization: Bearer <token>`

## 📝 Exemplo de uso

### Criar feedback

```bash
curl -X POST http://localhost:3001/api/feedbacks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "rating": 5,
    "message": "Excelente portfólio!"
  }'
```

### Login admin

```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

## 🛠️ Tecnologias

- Node.js
- Express
- PostgreSQL 17
- JWT para autenticação
- bcrypt para hash de senhas
