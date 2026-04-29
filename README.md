# 📊 Project Management Platform

Plataforma full-stack de gerenciamento de projetos e tarefas com metodologia **Kanban**, desenvolvida com React, TypeScript, Node.js e PostgreSQL.

<div align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" />
</div>

---

## ✨ Funcionalidades Principais

### 👤 Autenticação e Segurança
- Sistema completo de autenticação com **JWT**
- Refresh tokens para sessões longas
- Senhas criptografadas com **bcrypt**
- Proteção de rotas no backend e frontend
- Upload de avatar na criação da conta

### 📋 Gerenciamento de Projetos
- Criação e gerenciamento de múltiplos projetos
- Descrições e metadados detalhados
- Adição de múltiplos membros por projeto
- Dashboard com projetos recentes
- Sistema de roles (Admin, Manager, Developer, Viewer)

### 📌 Tarefas e Kanban
- **Quadro Kanban** com 4 colunas (A Fazer, Em Progresso, Em Revisão, Concluído)
- **Drag and Drop** para mover tarefas entre status
- Sistema de **prioridades** colorido (Baixa, Média, Alta, Urgente)
- Atribuição de tarefas para membros da equipe
- Sistema de comentários em tarefas
- Contadores e métricas de progresso

### 📈 Dashboard
- Estatísticas de projetos e tarefas
- Cards visuais com informações
- Projetos recentes
- Perfil do usuário com estatísticas

---

## 📸 Screenshots

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Quadro Kanban
![Kanban Board](./docs/screenshots/kanban.png)

### Gerenciamento de Projetos
![Projects](./docs/screenshots/projects.png)

### Login
![Login](./docs/screenshots/login.png)

---

## 🛠 Tecnologias Utilizadas

### Backend
| Tecnologia | Descrição |
|------------|-----------|
| **Node.js** | Runtime JavaScript |
| **TypeScript** | Superset tipado do JavaScript |
| **Express** | Framework web minimalista e rápido |
| **Prisma ORM** | Object-Relational Mapping moderno |
| **PostgreSQL** | Banco de dados relacional robusto |
| **JWT** | Autenticação stateless com tokens |
| **Multer** | Middleware para upload de arquivos |
| **Bcrypt** | Hash seguro de senhas |

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| **React 18** | Biblioteca para construção de interfaces |
| **TypeScript** | Tipagem estática para JavaScript |
| **Redux Toolkit** | Gerenciamento de estado global |
| **React Router v6** | Navegação SPA (Single Page Application) |
| **Axios** | Cliente HTTP para requisições |
| **CSS3** | Estilização moderna com Flexbox/Grid |

### Ferramentas de Desenvolvimento
- **ts-node-dev** - Desenvolvimento com hot reload
- **Prisma Studio** - Interface visual do banco de dados
- **ESLint** - Linter para padronização de código
- **Git** - Controle de versão

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/RFernandes10/project-management-platform.git
cd project-management-platform
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/project_management?schema=public"
JWT_SECRET="seu_jwt_secret_super_seguro_de_pelo_menos_32_caracteres"
JWT_REFRESH_SECRET="seu_jwt_refresh_secret_super_seguro_de_pelo_menos_32_caracteres"
PORT=3001
```

Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
npx prisma generate
```

Inicie o servidor:
```bash
npm run dev
```

✅ O backend estará rodando em `http://localhost:3001`

### 3. Configurar o Frontend

Abra um **novo terminal**:
```bash
cd frontend
npm install
npm start
```

✅ O frontend estará rodando em `http://localhost:3000`

### 4. Acessar a aplicação
Abra seu navegador e acesse: `http://localhost:3000`

---

## 📡 Endpoints da API

### Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|------------|--------------|
| `POST` | `/register` | Registrar novo usuário (com avatar) | ❌ |
| `POST` | `/login` | Fazer login | ❌ |
| `GET` | `/me` | Obter dados do usuário logado | ✅ |
| `PUT` | `/profile` | Atualizar perfil (com avatar) | ✅ |
| `POST` | `/refresh` | Renovar access token | ❌ |

### Projetos (`/api/projects`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|------------|--------------|
| `GET` | `/` | Listar todos os projetos do usuário | ✅ |
| `POST` | `/` | Criar novo projeto | ✅ |
| `GET` | `/:id` | Obter projeto específico | ✅ |
| `PUT` | `/:id` | Atualizar projeto | ✅ |
| `DELETE` | `/:id` | Deletar projeto | ✅ |

### Tarefas (`/api/tasks`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|------------|--------------|
| `GET` | `/project/:projectId` | Listar tarefas de um projeto | ✅ |
| `POST` | `/` | Criar nova tarefa | ✅ |
| `PUT` | `/:id` | Atualizar tarefa (status, prioridade, etc) | ✅ |
| `DELETE` | `/:id` | Deletar tarefa | ✅ |
| `POST` | `/:taskId/comments` | Adicionar comentário | ✅ |
| `DELETE` | `/:taskId/comments/:commentId` | Deletar comentário | ✅ |

---

## 🔐 Segurança

Este projeto implementa diversas boas práticas de segurança:

- ✅ Senhas criptografadas com **bcrypt** (salt rounds: 10)
- ✅ Autenticação stateless com **JWT**
- ✅ Access tokens de curta duração (15 minutos)
- ✅ Refresh tokens de longa duração (7 dias)
- ✅ Validação de tipos com **TypeScript**
- ✅ Proteção de rotas no backend e frontend
- ✅ Upload de arquivos com validação de tipo e tamanho (máx. 5MB)
- ✅ Sanitização de inputs
- ✅ Variáveis sensíveis em arquivos `.env`

---

## 🎯 Arquitetura e Diferenciais

- **Full-Stack TypeScript** - Tipagem em todo o stack
- **Redux Toolkit** - Gerenciamento de estado previsível
- **Drag and Drop** - Interface Kanban interativa
- **Prisma ORM** - Tipagem segura no acesso ao banco
- **JWT + Refresh Tokens** - Autenticação robusta
- **Upload de Arquivos** - Avatares com Multer
- **Design Responsivo** - Mobile-first approach
- **Código Limpo** - Separação de responsabilidades

---

## 📌 Melhorias Futuras

- [ ] Notificações em tempo real com **WebSocket**
- [ ] Sistema de permissões granular por projeto
- [ ] Anexos em tarefas (documentos, imagens)
- [ ] Filtros avançados e busca
- [ ] Gráficos de produtividade e métricas
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Integração com Google Calendar
- [ ] App mobile com **React Native**
- [ ] Testes unitários com **Jest**
- [ ] Testes E2E com **Cypress**
- [ ] CI/CD com **GitHub Actions**
- [ ] Deploy automatizado
- [ ] Modo escuro (Dark Mode)
- [ ] Internacionalização (i18n)

---

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/RFernandes10">
        <img src="https://github.com/RFernandes10.png" width="100px;" alt="Roberto Fernandes"/><br>
        <sub><b>Roberto Fernandes</b></sub>
      </a>
    </td>
  </tr>
</table>

### Entre em contato:
- [LinkedIn](https://www.linkedin.com/in/roberto-wolowitz/)
- [GitHub](https://github.com/RFernandes10)
- Email: robertofernandes144@gmail.com

---

<div align="center">
  <h3>⭐ Se este projeto foi útil para você, considere dar uma estrela!</h3>
  <p>Feito com ❤️ e ☕ por <strong>Roberto Fernandes</strong></p>
</div>
