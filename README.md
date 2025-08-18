# Desafio Node.js – Primeira API (aulas)

API simples em Node.js + TypeScript usando Fastify, Drizzle ORM (PostgreSQL) e Zod. Inclui documentação Swagger/Scalar em ambiente de desenvolvimento.

Cobertura de testes: 100% (statements, branches, functions, lines)

## Requisitos

- Node.js 22+
- Docker e Docker Compose
- pnpm (ou npm/yarn, mas o projeto usa `pnpm-lock.yaml`)

## Tecnologias

- Fastify 5
- TypeScript
- Drizzle ORM + PostgreSQL
- Zod (validação)
- Swagger/OpenAPI + Scalar API Reference (em `/docs` quando `NODE_ENV=development`)

## Configuração

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:

```bash
pnpm install
```

3. Suba o banco Postgres com Docker:

```bash
docker compose up -d
```

4. Crie um arquivo `.env` na raiz com:

```bash
# URL do banco (Docker local padrão)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio

# Ativa docs em /docs
NODE_ENV=development
```

5. Rode as migrações (Drizzle):

```bash
pnpm db:migrate
```

(opcional) Para inspecionar o schema/estado com o Drizzle Studio:

```bash
pnpm db:studio
```

## Executando o servidor

```bash
pnpm dev
```

- Porta padrão: `http://localhost:3333`
- Logs legíveis habilitados
- Documentação da API (em dev): `http://localhost:3333/docs`

## Endpoints

Base URL: `http://localhost:3333`

- POST `/sessions`

  - Login de usuário
  - Body (JSON):
    ```json
    { "email": "user@email.com", "password": "suasenha" }
    ```
  - Respostas:
    - 200: `{ "token": "<jwt>" }`
    - 400: `{ "message": "..." }`

- POST `/courses`

  - Cria um curso (requer autenticação e role `manager`)
  - Body (JSON):
    ```json
    { "title": "Curso de Docker" }
    ```
  - Respostas:
    - 201: `{ "courseId": "<uuid>" }`

- GET `/courses`

  - Lista todos os cursos (requer autenticação e role `manager`)
  - Query params opcionais: `search`, `orderBy`, `page`
  - 200: `{ "courses": [{ "id": "<uuid>", "title": "...", "enrollmentsCount": 0 }] }`

- GET `/courses/:id`
  - Busca um curso pelo ID (requer autenticação e role `student`)
  - Parâmetros: `id` (UUID)
  - Respostas:
    - 200: `{ "course": { "id": "<uuid>", "title": "...", "description": "... | null" } }`
    - 404: `null`

Há um arquivo `requisicoes.http` com exemplos prontos (compatível com extensões de REST Client).

## Modelos (schema)

Tabelas principais definidas em `src/db/schema/`:

- `courses`
  - `id` (uuid, pk, default random)
  - `title` (text, único, obrigatório)
  - `description` (text, opcional)
- `users`
  - `id` (uuid, pk, default random)
  - `name` (text, obrigatório)
  - `email` (text, único, obrigatório)
  - `password` (text, obrigatório)
  - `role` (enum: 'student' | 'manager', padrão: 'student')
- `enrollments`
  - `id` (uuid, pk, default random)
  - `userId` (uuid, fk para users)
  - `courseId` (uuid, fk para courses)
  - `createdAt` (timestamp, default now)

## Fluxo principal (Mermaid)

```mermaid
sequenceDiagram
  participant C as Client
  participant S as Fastify Server
  participant V as Zod Validator
  participant DB as Drizzle + PostgreSQL

  C->>S: POST /sessions {email, password}
  S->>DB: SELECT * FROM users WHERE email=...
  alt usuário encontrado
    S->>S: Verifica senha
    alt senha ok
      S-->>C: 200 {token}
    else senha inválida
      S-->>C: 400 {message}
    end
  else não encontrado
    S-->>C: 400 {message}
  end

  C->>S: POST /courses {title} (auth manager)
  S->>V: Validar body
  V-->>S: OK ou Erro 400
  alt válido
    S->>DB: INSERT INTO courses (title)
    DB-->>S: {id}
    S-->>C: 201 {courseId}
  else inválido
    S-->>C: 400
  end

  C->>S: GET /courses (auth manager)
  S->>DB: SELECT id,title FROM courses
  DB-->>S: lista
  S-->>C: 200 {courses: [...]}

  C->>S: GET /courses/:id (auth student)
  S->>V: Validar param id (uuid)
  V-->>S: OK ou Erro 400
  alt encontrado
    S->>DB: SELECT * FROM courses WHERE id=...
    DB-->>S: course
    S-->>C: 200 {course}
  else não encontrado
    S-->>C: 404
  end
```

## Scripts

- `pnpm dev`: inicia o servidor com reload e carrega variáveis de `.env`
- `pnpm db:generate`: gera artefatos do Drizzle a partir do schema
- `pnpm db:migrate`: aplica migrações no banco
- `pnpm db:studio`: abre o Drizzle Studio
- `pnpm db:seed`: popula o banco com dados de exemplo
- `pnpm test`: executa os testes com cobertura

## Dicas e solução de problemas

- Conexão recusada ao Postgres: confirme `docker compose up -d` e que a porta `5432` não está em uso.
- Variável `DATABASE_URL` ausente: verifique seu `.env`. O Drizzle exige essa variável para `db:generate`, `db:migrate` e `db:studio`.
- Docs não aparecem em `/docs`: garanta `NODE_ENV=development` no `.env` e reinicie o servidor.

## Cobertura de Testes

| Arquivo              | Statements         | Branches         | Functions      | Lines              |
| -------------------- | ------------------ | ---------------- | -------------- | ------------------ |
| create-courses.ts    | 100% (36/36)       | 100% (2/2)       | 100% (1/1)     | 100% (36/36)       |
| get-courses-by-id.ts | 100% (43/43)       | 100% (3/3)       | 100% (1/1)     | 100% (43/43)       |
| get-courses.ts       | 100% (76/76)       | 100% (2/2)       | 100% (1/1)     | 100% (76/76)       |
| login.ts             | 100% (51/51)       | 100% (5/5)       | 100% (1/1)     | 100% (51/51)       |
| **Total**            | **100% (206/206)** | **100% (12/12)** | **100% (4/4)** | **100% (206/206)** |

## Licença

ISC (ver `package.json`).
