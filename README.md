# SafeExpenses

Plataforma para cadastro e gerenciamento de lançamentos financeiros desenvolvida para o Tech Challenge da FIAP.

## Aplicações

- `safeExpenses-web`: aplicação Angular responsável pela interface, executada na porta `4200`.
- `safeExpenses-api`: API REST NestJS responsável pelas regras da aplicação e validação dos dados, executada na porta `3000`.
- `safeExpenses-jsonServer`: servidor standalone usado como simulador NoSQL, executado na porta `3001`.
- `packages`: bibliotecas compartilhadas de componentes Angular, design tokens e tema do Angular Material.

Cada aplicação possui seu próprio README com instruções específicas de arquitetura e execução.

## Pré-requisitos

- Node.js 20 ou superior para executar os projetos localmente.
- Docker e Docker Compose para iniciar todo o ambiente de forma integrada.

## Executar com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Também é possível utilizar o script equivalente:

```bash
npm run compose:up
```

O comando constrói as imagens e inicia os três serviços. Para executar em segundo plano, utilize:

```bash
npm run compose:up:detached
```

## Endereços dos serviços

- Aplicação web: `http://localhost:4200`
- API: `http://localhost:3000`
- Health check da API: `http://localhost:3000/health`
- JSON Server: `http://localhost:3001/expenses`

## Ordem de inicialização

O Docker Compose utiliza health checks e dependências para respeitar a seguinte ordem:

```text
safeexpenses-jsonserver (healthy)
  └─ safeexpenses-api (healthy)
       └─ safeexpenses-web
```

A API só é iniciada depois que o JSON Server está saudável, e a aplicação web aguarda a API.

## Scripts disponíveis

- `npm run compose:up`: constrói as imagens e inicia todos os serviços, exibindo os logs no terminal.
- `npm run compose:up:detached`: constrói as imagens e inicia todos os serviços em segundo plano.
- `npm run compose:down`: interrompe e remove os containers e a rede criados pelo Docker Compose.
- `npm run compose:logs`: acompanha continuamente os logs dos serviços em execução.
- `npm run compose:config`: valida e exibe a configuração final processada pelo Docker Compose.

## Executar aplicações separadamente

Para desenvolvimento local ou execução individual com Docker, consulte as instruções de cada módulo:

- `safeExpenses-web/README.md`
- `safeExpenses-api/README.md`
- `safeExpenses-jsonServer/README.md`