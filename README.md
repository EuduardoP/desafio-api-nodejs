# Desafio API Node.js

API RESTful para gerenciamento de cursos, desenvolvida com Node.js, Fastify, TypeScript e Drizzle ORM.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Rotas](#principais-rotas)
- [Principais Rotas](#principais-rotas)
- [Diagrama de Fluxo](#diagrama-de-fluxo)
- [Diagrama de Fluxo](#diagrama-de-fluxo)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Licença](#licença)

---

## Sobre o Projeto

Esta API permite criar, listar e buscar cursos por ID. O projeto utiliza Fastify para alta performance, Drizzle ORM para acesso ao banco de dados PostgreSQL e segue padrões de tipagem estrita com TypeScript. O código é formatado e validado automaticamente com Biome e Ultracite.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (validação de esquemas)
- [Zod](https://zod.dev/) (validação de esquemas)
- [Biome](https://biomejs.dev/) & [Ultracite](https://ultracite.dev/) (formatação e lint)
- [Docker Compose](https://docs.docker.com/compose/) (opcional)

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd desafio-api-nodejs
   ```
2. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` com a variável `DATABASE_URL` apontando para seu banco PostgreSQL.

3. **Instale as dependências:**

   ```sh
   pnpm install
   ```

4. **(Opcional) Suba o banco com Docker Compose:**

   ```sh
   docker-compose up -d
   ```

5. **Rode as migrations:**

   ```sh
   pnpm drizzle-kit push:pg
   ```

6. **Inicie o servidor:**

   ```sh
   pnpm dev
   ```

7. **Acesse a documentação:**
   - Swagger: `http://localhost:1337/documentation`
   - Scalar: `http://localhost:1337/docs`

## Estrutura do Projeto

```
├── src/
│   ├── server.ts              # Inicialização do servidor Fastify
│   ├── db/
│   │   ├── client.ts          # Conexão com o banco via Drizzle
│   │   └── schema/
│   │       ├── courses.ts     # Schema da tabela de cursos
│   │       ├── users.ts       # Schema da tabela de usuários
│   │       └── index.ts       # Exporta schemas
│   └── routes/
│       ├── create-courses.ts  # Rota para criar curso
│       ├── get-courses.ts     # Rota para listar cursos
│       └── get-courses-by-id.ts # Rota para buscar curso por ID
├── drizzle.config.ts          # Configuração do Drizzle ORM
├── docker-compose.yml         # (Opcional) Banco de dados via Docker
└── ...
```

## Principais Rotas

| Método | Rota         | Descrição             |
| ------ | ------------ | --------------------- |
| POST   | /courses     | Cria um novo curso    |
| GET    | /courses     | Lista todos os cursos |
| GET    | /courses/:id | Busca curso por ID    |

## Diagrama de Fluxo

```mermaid
flowchart TD
    A[Usuário faz requisição] --> B{Endpoint}
    B -- POST /courses --> C[Valida dados com Zod]
    C --> D[Insere curso no banco (Drizzle ORM)]
    D --> E[Retorna ID do curso criado]
    B -- GET /courses --> F[Consulta todos cursos no banco]
    F --> G[Retorna lista de cursos]
    B -- GET /courses/:id --> H[Consulta curso por ID]
    H -- Encontrado --> I[Retorna dados do curso]
    H -- Não encontrado --> J[Retorna 404]
```

## Licença

Este projeto está sob a licença MIT.

# Desafio API Node.js

API RESTful para gerenciamento de cursos, desenvolvida com Node.js, Fastify, TypeScript e Drizzle ORM.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Rotas](#principais-rotas)
- [Principais Rotas](#principais-rotas)
- [Diagrama de Fluxo](#diagrama-de-fluxo)
- [Diagrama de Fluxo](#diagrama-de-fluxo)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Licença](#licença)

---

## Sobre o Projeto

Esta API permite criar, listar e buscar cursos por ID. O projeto utiliza Fastify para alta performance, Drizzle ORM para acesso ao banco de dados PostgreSQL e segue padrões de tipagem estrita com TypeScript. O código é formatado e validado automaticamente com Biome e Ultracite.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (validação de esquemas)
- [Zod](https://zod.dev/) (validação de esquemas)
- [Biome](https://biomejs.dev/) & [Ultracite](https://ultracite.dev/) (formatação e lint)
- [Docker Compose](https://docs.docker.com/compose/) (opcional)

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd desafio-api-nodejs
   ```
2. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` com a variável `DATABASE_URL` apontando para seu banco PostgreSQL.

3. **Instale as dependências:**

   ```sh
   pnpm install
   ```

4. **(Opcional) Suba o banco com Docker Compose:**

   ```sh
   docker-compose up -d
   ```

5. **Rode as migrations:**

   ```sh
   pnpm drizzle-kit push:pg
   ```

6. **Inicie o servidor:**

   ```sh
   pnpm dev
   ```

7. **Acesse a documentação:**
   - Swagger: `http://localhost:1337/documentation`
   - Scalar: `http://localhost:1337/docs`

## Estrutura do Projeto

```
├── src/
│   ├── server.ts              # Inicialização do servidor Fastify
│   ├── db/
│   │   ├── client.ts          # Conexão com o banco via Drizzle
│   │   └── schema/
│   │       ├── courses.ts     # Schema da tabela de cursos
│   │       ├── users.ts       # Schema da tabela de usuários
│   │       └── index.ts       # Exporta schemas
│   └── routes/
│       ├── create-courses.ts  # Rota para criar curso
│       ├── get-courses.ts     # Rota para listar cursos
│       └── get-courses-by-id.ts # Rota para buscar curso por ID
├── drizzle.config.ts          # Configuração do Drizzle ORM
├── docker-compose.yml         # (Opcional) Banco de dados via Docker
└── ...
```

## Principais Rotas

| Método | Rota         | Descrição             |
| ------ | ------------ | --------------------- |
| POST   | /courses     | Cria um novo curso    |
| GET    | /courses     | Lista todos os cursos |
| GET    | /courses/:id | Busca curso por ID    |

## Diagrama de Fluxo

```mermaid
flowchart TD
    A[Usuário faz requisição] --> B{Endpoint}
    B -- "POST /courses" --> C[Valida dados com Zod]
    C --> D[Insere curso no banco \(Drizzle ORM\)]
    D --> E[Retorna ID do curso criado]
    B -- "GET /courses" --> F[Consulta todos cursos no banco]
    F --> G[Retorna lista de cursos]
    B -- "GET /courses/:id" --> H[Consulta curso por ID]
    H -- "Encontrado" --> I[Retorna dados do curso]
    H -- "Não encontrado" --> J[Retorna 404]
```

## Licença

Este projeto está sob a licença MIT.
