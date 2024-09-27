# In Orbit NLW Backend

Este é o projeto backend **In Orbit** desenvolvido durante o evento NLW (Next Level Week) da Rocketseat. O evento foi destinado a desenvolvedores com experiência prévia nas tecnologias utilizadas e teve duração de uma semana, abordando a construção de APIs rápidas e escaláveis utilizando tecnologias modernas para backend.

## Tecnologias Utilizadas

O projeto backend foi construído utilizando as seguintes tecnologias:

- **Fastify** - Um framework web rápido e eficiente para Node.js, focado em performance e baixo overhead.
- **TypeScript** - Adiciona tipagem estática ao JavaScript, tornando o desenvolvimento mais seguro e escalável.
- **Drizzle ORM** - ORM simples e eficiente para interação com banco de dados.
- **Postgres** - Banco de dados relacional robusto e escalável.
- **Zod** - Biblioteca de validação de esquemas de dados, usada para garantir a integridade das entradas e saídas.

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento com Fastify e carrega as variáveis de ambiente do arquivo `.env`.
- `seed`: Popula o banco de dados com dados iniciais a partir do script localizado em `src/db/seed.ts`.

## Dependências Principais

- `fastify`: Framework backend rápido e eficiente.
- `drizzle-orm`: ORM utilizado para interação com o banco de dados Postgres.
- `postgres`: Driver de banco de dados para conectar-se ao Postgres.
- `zod`: Validação de dados utilizando esquemas.

## Dependências de Desenvolvimento

- `typescript`: Superset de JavaScript que adiciona tipagem estática ao projeto.
- `tsx`: Ferramenta para execução e compilação rápida de arquivos TypeScript.
- `drizzle-kit`: Ferramenta auxiliar para migrações e geração de esquemas do Drizzle ORM.
- `@biomejs/biome`: Ferramenta de desenvolvimento para linting e análise de código.

## Como Executar o Projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/in-orbit-nlw-backend.git
```
### 2. Instale as dependências:

```bash
cd in-orbit-nlw-backend
npm install

```

### 3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

## Variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as configurações necessárias (exemplo: variáveis de conexão ao banco de dados).