# SafeExpenses API

API REST desenvolvida com NestJS e princípios de Clean Architecture para gerenciar os lançamentos financeiros da plataforma SafeExpenses.

## Objetivos

- Manter o domínio e os casos de uso independentes da tecnologia de persistência.
- Permitir a substituição do `json-server` por outra solução, como MongoDB ou Firebase, com impacto mínimo.
- Disponibilizar um CRUD completo de lançamentos financeiros.
- Validar no backend todos os dados recebidos pela interface.

## Estrutura do projeto

```text
src/
  app.module.ts
  main.ts
  modules/
    expenses/
      application/
        dto/
        use-cases/
      domain/
        entities/
        repositories/
        tokens/
      infrastructure/
        http/
        persistence/json-server/
```

Cada camada possui uma responsabilidade específica:

- `domain`: contém as entidades, contratos de repositório e tokens de injeção. Não depende de HTTP ou da tecnologia de persistência.
- `application`: contém os DTOs e casos de uso que coordenam as operações da aplicação.
- `infrastructure/http`: expõe os endpoints por meio dos controllers NestJS.
- `infrastructure/persistence`: implementa os contratos de persistência definidos pelo domínio.

## Estrutura de um lançamento

```json
{
  "id": "uuid",
  "description": "Groceries",
  "category": "Food",
  "account": "Credit Card",
  "value": -55.9,
  "consolidated": false,
  "transactionDate": "2026-08-08T14:30:00.000Z",
  "createdAt": "2026-08-08T14:30:00.000Z",
  "updatedAt": "2026-08-08T14:30:00.000Z"
}
```

## Endpoints

- `GET /health` - retorna `{ "status": "ok" }` e é utilizado pelo health check do Docker
- `POST /expenses`
- `GET /expenses`
- `GET /expenses/:id`
- `PATCH /expenses/:id`
- `DELETE /expenses/:id`

## Executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie a API:

```bash
npm run start:dev
```

- API: `http://localhost:3000`
- Simulador JSON esperado pela API: `http://localhost:3001`

As configurações disponíveis estão documentadas em `.env.example`. O arquivo `.env` local não deve conter valores reais no controle de versão.

## Executar com Docker

Construa a imagem:

```bash
npm run docker:build
```

Crie a rede compartilhada, caso ainda não exista:

```bash
npm run docker:network:create
```

Execute o container. O container `safeexpenses-jsonserver-local` deve estar em execução na rede `safeexpenses-net`:

```bash
npm run docker:run
```

Interrompa o container:

```bash
npm run docker:stop
```

Remova a rede quando ela não for mais necessária:

```bash
npm run docker:network:remove
```

- API: `http://localhost:3000`
- Health check: `http://localhost:3000/health`

## Scripts disponíveis

- `npm run build`: compila a aplicação NestJS e gera os arquivos de produção no diretório `dist`.
- `npm run start`: inicia a versão compilada da API a partir do diretório `dist`.
- `npm run start:dev`: inicia a API em modo de desenvolvimento e observa alterações no código-fonte.
- `npm run docker:build`: constrói a imagem Docker `safeexpenses-api`.
- `npm run docker:network:create`: cria a rede Docker compartilhada `safeexpenses-net`.
- `npm run docker:run`: executa o container `safeexpenses-api-local` na rede compartilhada, configura a URL do JSON Server e publica a porta `3000`.
- `npm run docker:stop`: interrompe o container local da API.
- `npm run docker:network:remove`: remove a rede Docker compartilhada.
- `npm run lint`: analisa os arquivos TypeScript da API com ESLint.
- `npm run format`: formata os arquivos TypeScript da API com Prettier.

## Substituição da persistência

Para substituir o `json-server`, implemente o contrato de repositório existente e altere a classe associada ao token `EXPENSES_REPOSITORY` no `ExpensesModule`.

Os contratos do domínio, casos de uso e controllers permanecem inalterados. Dessa forma, a regra da aplicação não fica acoplada ao banco de dados escolhido.

## Arquitetura utilizada

O projeto aplica uma divisão inspirada em Clean Architecture. As dependências apontam para os contratos internos: os casos de uso conhecem a abstração do repositório, mas não conhecem Axios, `json-server` ou detalhes de rede.

O fluxo de uma requisição é:

```text
Requisição HTTP
  -> Controller
  -> DTO e ValidationPipe
  -> Caso de uso
  -> Contrato de repositório
  -> Implementação de persistência
```

Essa organização permite testar e evoluir cada parte separadamente e trocar detalhes externos sem reescrever as regras da aplicação.

## Isolamento de responsabilidades

- O controller recebe a requisição, extrai parâmetros e traduz resultados para respostas HTTP.
- O DTO define e valida o formato aceito pela API.
- O caso de uso coordena uma ação específica, como criar, listar, atualizar ou excluir um lançamento.
- A entidade representa os dados do domínio.
- O contrato de repositório define as operações necessárias sem escolher uma tecnologia.
- O adaptador de persistência realiza a comunicação com a fonte de dados.
- O frontend é responsável pela apresentação e pela validação voltada à experiência do usuário; a API sempre repete a validação por não confiar no cliente.

## Segurança

### Validação de dados

A API utiliza DTOs com `class-validator` e um `ValidationPipe` global configurado com:

- `whitelist: true`: remove do fluxo propriedades que não pertencem ao DTO;
- `forbidNonWhitelisted: true`: rejeita requisições com propriedades não permitidas;
- `transform: true`: transforma os dados recebidos para os tipos declarados antes do processamento.

Essa validação é executada no backend mesmo quando o formulário já foi validado no frontend. Requisições podem ser criadas fora da interface, portanto a validação do navegador não é considerada uma barreira de segurança.