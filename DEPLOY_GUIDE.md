# 🚀 Guia de Deploy - Vercel + Supabase (Gratuito)

## Parte 1: Configurar Supabase (Backend + Banco de Dados)

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login com GitHub
2. Clique em "New Project"
3. Preencha:
   - **Name**: portfolio-db
   - **Database Password**: Crie uma senha forte e **GUARDE**
   - **Region**: South America (São Paulo)
4. Clique em "Create new project" e aguarde 2-3 minutos

### 1.2 Criar Tabelas no Banco

1. No painel do Supabase, vá em **SQL Editor** (ícone de código)
2. Clique em "+ New query"
3. Cole o conteúdo do arquivo `server/database/schema.sql`
4. Clique em "Run" (ou pressione Ctrl+Enter)
5. Você verá "Success. No rows returned"

### 1.3 Criar Usuário Admin

1. Ainda no SQL Editor, crie uma nova query
2. Cole e execute:

```sql
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rKvFJZKZ5Y.xN5vQJ5Z5Z.xN5vQJ5Z5Z.xN5vQJ5Z5Z.xN5vQJ5Z5');
```

> **Nota**: Essa é uma senha temporária. Você pode criar um hash bcrypt da sua senha em [bcrypt-generator.com](https://bcrypt-generator.com)

### 1.4 Obter Credenciais

1. Vá em **Settings** → **API**
2. Copie e guarde:
   - **Project URL**: `https://kthwhhqphtdvrlnkhqvh.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0aHdoaHFwaHRkdnJsbmtocXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTk0MzAsImV4cCI6MjA3OTc3NTQzMH0.AbfHIfkrsNnY5KEl0-GKr-M_P7_yVZmyq4wVznBO_5A`

---

## Parte 2: Criar Edge Functions no Supabase

### 2.1 Instalar Supabase CLI

```powershell
npm install -g supabase
```

### 2.2 Login no Supabase

```powershell
supabase login
```

### 2.3 Inicializar Projeto

Na pasta do seu projeto:

```powershell
cd c:\Users\lucas.gonzaga\portfolio-novo
supabase init
```

### 2.4 Criar Edge Functions

Vou criar os arquivos das Edge Functions para você. Elas substituirão o backend Node.js.

---

## Parte 3: Deploy do Frontend no Vercel

### 3.1 Preparar Repositório Git

Se ainda não tem um repositório:

```powershell
git init
git add .
git commit -m "Initial commit - Portfolio com sistema de feedbacks"
```

Crie um repositório no GitHub e faça push:

```powershell
git remote add origin https://github.com/SEU_USUARIO/portfolio-novo.git
git branch -M main
git push -u origin main
```

### 3.2 Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em "Add New..." → "Project"
3. Importe seu repositório `portfolio-novo`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** - Adicione:
   ```
   VITE_API_URL=https://SEU_PROJETO.supabase.co/functions/v1
   ```
   (Use a URL do Supabase da Parte 1.4)

6. Clique em "Deploy"
7. Aguarde 2-3 minutos

### 3.3 Testar

Seu site estará em: `https://portfolio-novo.vercel.app`

---

## Parte 4: Configurar CORS no Supabase

1. No Supabase, vá em **Authentication** → **URL Configuration**
2. Em **Site URL**, adicione: `https://portfolio-novo.vercel.app`
3. Em **Redirect URLs**, adicione: `https://portfolio-novo.vercel.app/*`

---

## Parte 5: Testar Sistema de Feedbacks

1. Acesse seu site em produção
2. Vá até a seção "Feedbacks"
3. Envie um feedback de teste
4. Acesse `https://portfolio-novo.vercel.app/admin.html`
5. Faça login com `admin` / senha que você configurou
6. Aprove o feedback
7. Volte para a página principal e veja o feedback aprovado

---

## 🎉 Pronto!

Seu portfólio está no ar com:
- ✅ Frontend no Vercel (gratuito)
- ✅ Backend no Supabase (gratuito)
- ✅ Banco PostgreSQL (gratuito)
- ✅ Sistema de feedbacks funcionando
- ✅ Painel admin funcionando

## 📝 Próximos Passos

- [ ] Configurar domínio personalizado no Vercel
- [ ] Alterar senha do admin
- [ ] Adicionar Google Analytics
- [ ] Configurar SSL (automático no Vercel)

## ⚠️ Importante

- Guarde suas credenciais do Supabase em local seguro
- Não commite arquivos `.env` no Git (já está no `.gitignore`)
- Altere a senha do admin em produção

---

**Dúvidas?** Consulte a documentação:
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
