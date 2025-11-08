<div align="center">

# Project Management Platform

### Plataforma completa de gerenciamento de projetos e tarefas com Kanban

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[Sobre](#-sobre-o-projeto) • [Features](#-principais-funcionalidades) • [Tecnologias](-tecnologias-utilizadas) • [Como Executar](#-como-executar-o-projeto) • [API](#-endpoints-da-api) • [Roberto Fernandes](#-autor)

</div>

---

## 🎯 Sobre o Projeto

Sistema **full-stack** para gerenciamento de projetos e tarefas com interface moderna e intuitiva. Permite que equipes organizem seu trabalho através de um **quadro Kanban visual**, com autenticação segura, upload de avatares e controle de prioridades.

Desenvolvido com as melhores práticas de desenvolvimento, arquitetura limpa e código escalável.

### 💡 Motivação

Este projeto foi criado para demonstrar habilidades em:
- Desenvolvimento full-stack com TypeScript
- Arquitetura de APIs RESTful
- Gerenciamento de estado com Redux
- Autenticação e autorização
- Upload e gerenciamento de arquivos
- Design de interfaces modernas
- Manipulação de banco de dados relacional

---

## ✨ Principais Funcionalidades

### 🔐 Autenticação e Segurança
- Sistema completo de autenticação com **JWT**
- Refresh tokens para sessões longas
- Senhas criptografadas com **bcrypt**
- Proteção de rotas no backend e frontend

### 👤 Gerenciamento de Usuários
- Registro com upload de avatar
- Edição de perfil
- Visualização de perfil com estatísticas
- Sistema de roles (Admin, Manager, Developer, Viewer)

### 📁 Projetos
- Criação e gerenciamento de projetos
- Descrições e metadados
- Múltiplos membros por projeto
- Dashboard com projetos recentes

### 📋 Tarefas e Kanban
- **Quadro Kanban** com 4 colunas (A Fazer, Em Progresso, Em Revisão, Concluído)
- **Drag and Drop** para mover tarefas entre status
- Sistema de **prioridades** colorido (Baixa, Média, Alta, Urgente)
- Atribuição de tarefas para membros
- Sistema de comentários
- Contadores e métricas

### 📊 Dashboard
- Estatísticas de projetos e tarefas
- Cards visuais com informações
- Projetos recentes
- Perfil do usuário

### 📱 Interface
- Design **responsivo** para mobile e desktop
- Animações suaves
- Tema moderno com gradientes
- Feedback visual em todas as ações

---

## 🛠️ Tecnologias Utilizadas

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

## 📂 Estrutura do Projeto

project-management-platform/
│
├── backend/ # Backend Node.js + Express
│ ├── src/
│ │ ├── controllers/ # Lógica de negócio
│ │ │ ├── auth.controller.ts
│ │ │ ├── project.controller.ts
│ │ │ └── task.controller.ts
│ │ ├── middlewares/ # Middlewares personalizados
│ │ │ ├── auth.middleware.ts
│ │ │ ├── upload.middleware.ts
│ │ │ └── error.middleware.ts
│ │ ├── routes/ # Definição de rotas
│ │ │ ├── auth.routes.ts
│ │ │ ├── project.routes.ts
│ │ │ └── task.routes.ts
│ │ ├── types/ # Tipos TypeScript
│ │ └── server.ts # Entrada da aplicação
│ │
│ ├── prisma/
│ │ ├── schema.prisma # Schema do banco de dados
│ │ └── migrations/ # Histórico de migrations
│ │
│ ├── uploads/ # Arquivos enviados (avatares)
│ ├── .env # Variáveis de ambiente
│ ├── .env.example # Exemplo de variáveis
│ ├── package.json
│ └── tsconfig.json
│
└── frontend/ # Frontend React
├── src/
│ ├── components/ # Componentes reutilizáveis
│ │ └── layout/
│ │ ├── Header.tsx
│ │ └── PrivateRoute.tsx
│ │
│ ├── features/ # Features por módulo
│ │ ├── auth/ # Autenticação (Login/Registro)
│ │ ├── dashboard/ # Dashboard principal
│ │ ├── projects/ # Gerenciamento de projetos
│ │ ├── tasks/ # Quadro Kanban de tarefas
│ │ └── profile/ # Perfil do usuário
│ │
│ ├── store/ # Configuração Redux
│ │ ├── store.ts
│ │ └── hooks.ts
│ │
│ ├── services/ # Serviços (API)
│ │ └── api.ts
│ │
│ ├── types/ # Tipos TypeScript
│ ├── App.tsx # Componente raiz
│ └── index.tsx # Entrada da aplicação
│
├── public/
├── package.json
└── tsconfig.json


---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)
- npm ou yarn

### 1️⃣ Clone o repositório

git clone https://github.com/seu-usuario/project-management-platform.git
cd project-management-platform


### 2️⃣ Configurar o Backend

#### Instalar dependências

cd backend
npm install


#### Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend`:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/project_management?schema=public"
JWT_SECRET="seu_jwt_secret_super_seguro_de_pelo_menos_32_caracteres"
JWT_REFRESH_SECRET="seu_jwt_refresh_secret_super_seguro_de_pelo_menos_32_caracteres"
PORT=3001


> ⚠️ **Importante:** Substitua `usuario` e `senha` pelas credenciais do seu PostgreSQL

#### Executar migrations do banco de dados

npx prisma migrate dev
npx prisma generate


#### Iniciar o servidor

npm run dev


✅ O backend estará rodando em `http://localhost:3001`

### 3️⃣ Configurar o Frontend

Abra um **novo terminal**:

cd frontend
npm install
npm start


✅ O frontend estará rodando em `http://localhost:3000`

### 4️⃣ Acessar a aplicação

Abra seu navegador e acesse: `http://localhost:3000`

---

## 📖 Endpoints da API

### 🔐 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/register` | Registrar novo usuário (com avatar) | ❌ |
| `POST` | `/login` | Fazer login | ❌ |
| `GET` | `/me` | Obter dados do usuário logado | ✅ |
| `PUT` | `/profile` | Atualizar perfil (com avatar) | ✅ |
| `POST` | `/refresh` | Renovar access token | ❌ |

### 📁 Projetos (`/api/projects`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/` | Listar todos os projetos do usuário | ✅ |
| `POST` | `/` | Criar novo projeto | ✅ |
| `GET` | `/:id` | Obter projeto específico | ✅ |
| `PUT` | `/:id` | Atualizar projeto | ✅ |
| `DELETE` | `/:id` | Deletar projeto | ✅ |

### 📋 Tarefas (`/api/tasks`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/project/:projectId` | Listar tarefas de um projeto | ✅ |
| `POST` | `/` | Criar nova tarefa | ✅ |
| `PUT` | `/:id` | Atualizar tarefa (status, prioridade, etc) | ✅ |
| `DELETE` | `/:id` | Deletar tarefa | ✅ |
| `POST` | `/:taskId/comments` | Adicionar comentário | ✅ |
| `DELETE` | `/:taskId/comments/:commentId` | Deletar comentário | ✅ |

### 📝 Exemplo de Requisição

**Criar Projeto:**

POST http://localhost:3001/api/projects
Authorization: Bearer {seu_token}
Content-Type: application/json

{
"name": "Meu Projeto",
"description": "Descrição do projeto"
}


---

## 🎨 Screenshots

> 📸 Adicione aqui prints das principais telas do seu projeto

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*Painel principal com estatísticas e visão geral dos projetos*

### Quadro Kanban
![Kanban Board](docs/screenshots/kanban.png)
*Quadro visual com drag-and-drop para organização de tarefas*

### Gerenciamento de Projetos
![Projects](docs/screenshots/projects.png)
*Lista de projetos com avatares dos membros da equipe*

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

## 📈 Melhorias Futuras

Funcionalidades planejadas para próximas versões:

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

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Este é um projeto open-source.

### Como contribuir:

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. Faça **commit** das suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Faça **push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Diretrizes:

- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Isso significa que você pode:

- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/seu-usuario">
        <img src="https://github.com/seu-usuario.png" width="100px;" alt="Foto do Autor"/><br>
        <sub>
          <b>Roberto Fonseca</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

### 📫 Entre em contato:

- 💼 [LinkedIn](https://linkedin.com/in/seu-perfil)
- 🐱 [GitHub](https://github.com/seu-usuario)
- 📧 Email: roberto.fonseca@email.com

---

<div align="center">

### ⭐ Se este projeto foi útil para você, considere dar uma estrela!

Feito com ❤️ e ☕ por **Roberto Fonseca**

</div>
