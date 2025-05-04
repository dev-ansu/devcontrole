# 📊 DevControle

**DevControle** é um sistema de chamados (Helpdesk) moderno, desenvolvido para equipes de suporte técnico e gestão de atendimento interno. Com uma interface intuitiva e um backend robusto, o DevControle permite registrar, acompanhar e resolver chamados com eficiência.

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (App Router) — Framework React para aplicações fullstack
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para JavaScript
- **[MongoDB](https://www.mongodb.com/)** — Banco de dados NoSQL flexível e escalável
- **[Prisma](https://www.prisma.io/)** — ORM moderno e type-safe
- **[React Hook Form](https://react-hook-form.com/)** — Gerenciamento de formulários com performance
- **[Zod](https://zod.dev/)** — Validação de schemas com TypeScript-first
- **[NextAuth.js](https://next-auth.js.org/)** — Autenticação para aplicações Next.js

## ⚙️ Funcionalidades

- Cadastro e login de usuários com autenticação via NextAuth
- Registro de chamados com categorias, prioridades e descrição
- Acompanhamento do status dos chamados (aberto, em andamento, resolvido)
- Painel de administração com visão geral dos chamados
- Validação completa de formulários com React Hook Form + Zod
- Backend escalável com Prisma + MongoDB


## clonar repositório
```
git clone https://github.com/seu-usuario/devcontrole.git
cd devcontrole
```

## instalar dependências
```
npm install
```

## env
```
DATABASE_URL="mongodb+srv://user:password@host/dbname?retryWrites=true&w=majority&appName=appName"
NODE_ENV=
NEXTAUTH_URL=
HOST_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## migrar banco de dados
```
npx prisma db push
```

## rodar projeto
```
npm run dev
```

Acesse:
http://localhost:3000

Teste ao vivo: https://devcontrole-omega.vercel.app