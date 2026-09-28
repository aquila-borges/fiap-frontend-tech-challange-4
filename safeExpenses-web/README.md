# SafeExpenses Web

Aplicação Angular da plataforma SafeExpenses, responsável pelo cadastro e gerenciamento de lançamentos financeiros.

O projeto utiliza componentes standalone, carregamento lazy de páginas, Signals para estado local, Reactive Forms, Angular Material e os pacotes visuais compartilhados do SafeExpenses.

## Funcionalidades

- listagem de lançamentos financeiros;
- cadastro e edição de despesas e receitas;
- seleção e consolidação individual ou em lote;
- exclusão com confirmação;
- feedback por alertas e notificações;
- navegação entre página inicial, despesas e página não encontrada.

## Estrutura do projeto

```text
src/
  app/
    app.config.ts
    app.routes.ts
    app.ts
    app.html
    app.css
    features/
      home/
      not-found/
      expenses/
        components/
          expense-actions/
          expense-form-dialog/
          expense-list/
        enums/
        interfaces/
        models/
        pages/
        services/
        types/
        use-cases/
  environments/
```

## Arquitetura utilizada

A aplicação combina uma organização **feature-based** com princípios de **Clean Architecture**.

Na organização feature-based, todos os arquivos relacionados ao domínio de despesas ficam dentro de `features/expenses`. Componentes, tipos, serviços e casos de uso permanecem próximos porque evoluem juntos.

Dentro da feature, as responsabilidades são separadas em camadas inspiradas em Clean Architecture:

```text
Rota lazy
  -> Página/container
  -> Caso de uso
  -> Serviço HTTP
  -> SafeExpenses API
```

### Por que feature-based?

A organização por funcionalidade foi escolhida porque mantém cada contexto coeso e evita espalhar arquivos relacionados por pastas globais. Isso facilita localizar código, remover ou evoluir uma funcionalidade e aplicar lazy loading por rota.

### Por que utilizar casos de uso?

Os casos de uso fornecem nomes explícitos para as operações da aplicação, como criar, listar, atualizar e excluir lançamentos. A página não precisa conhecer os detalhes do `HttpClient`, e a comunicação com a API permanece centralizada no serviço.

Para operações simples, alguns casos de uso apenas encaminham a chamada ao serviço. A camada foi mantida para estabelecer uma fronteira onde regras de aplicação podem ser adicionadas sem sobrecarregar os componentes.

## Isolamento de responsabilidades

- `pages`: atuam como containers, coordenam estado, casos de uso, dialogs e feedback ao usuário.
- `components`: apresentam dados e emitem eventos de interação, sem realizar chamadas HTTP diretamente.
- `use-cases`: representam as operações disponíveis para a funcionalidade.
- `services`: concentram a integração HTTP e os endereços dos endpoints.
- `models`: definem entidades e payloads trocados com a API.
- `interfaces`: descrevem contratos específicos entre componentes e dialogs.
- `enums`: limitam conjuntos conhecidos de opções do domínio.
- `types`: representam variações simples e estados permitidos.
- `app.routes.ts`: define a navegação e carrega as páginas sob demanda.
- `app.config.ts`: registra providers globais, como router, HTTP, animações e notificações.

Essa divisão evita que componentes visuais acumulem regras, comunicação HTTP e detalhes de infraestrutura.

## Pacotes compartilhados

A identidade visual e os componentes reutilizáveis ficam fora da aplicação:

- `@safeexpenses/design-system`: design tokens e fundação CSS global;
- `@safeexpenses/material-theme`: integração dos tokens com Angular Material;
- `@safeexpenses/angular-ui`: componentes, campos de formulário, dialogs e notificações.

Essa separação permite reutilizar a mesma linguagem visual em outras aplicações sem acoplar os pacotes ao domínio de despesas.

## Segurança

### Prevenção de XSS

Dados dinâmicos são exibidos por interpolação e property binding do Angular. O framework realiza escape de texto e sanitização contextual antes de atualizar o DOM.

O código da aplicação não utiliza `[innerHTML]`, `DomSanitizer.bypassSecurityTrust...`, `eval` ou manipulação direta de HTML. Como o sistema não aceita conteúdo HTML rico, não existe necessidade de ignorar ou substituir a sanitização padrão do Angular.

### Validação de dados vindos da UI

Os formulários utilizam Reactive Forms e validadores para campos obrigatórios, tamanho mínimo, conteúdo composto somente por espaços, valores mínimos e datas obrigatórias. O formulário é marcado como tocado e a requisição não é enviada enquanto estiver inválido.

Essa validação melhora a experiência do usuário, mas não é considerada uma barreira de segurança. A API valida novamente todos os payloads recebidos, pois requisições podem ser enviadas sem utilizar a interface.

### Armazenamento seguro

O estado da tela é mantido em memória com Signals e não é persistido pelo frontend. A aplicação não coleta nem armazena senhas, tokens, CPF, números de cartão ou credenciais bancárias. Os nomes de conta são apenas categorias de lançamento.

Os arquivos em `src/environments` contêm somente configurações públicas, como a URL da API.

Caso seja necessário armazenar algum secret no futuro, o valor pode ser gerenciado por um secret manager ou por variáveis de ambiente protegidas em ferramentas externas, como plataformas de CI/CD e serviços de nuvem, e injetado somente no serviço que precisa utilizá-lo. Secrets não devem ser incluídos nos arquivos de ambiente do Angular, pois qualquer valor incorporado ao bundle do frontend pode ser inspecionado no navegador.

### Uso de localStorage

A aplicação não utiliza `localStorage`, `sessionStorage` ou cookies porque não existe necessidade funcional de persistência no navegador. Essa é uma decisão intencional para evitar armazenar dados desnecessários no cliente.

Caso autenticação seja adicionada futuramente, a estratégia de sessão deverá ser definida no backend e não baseada em um token fixo incluído no frontend.

### Isolamento de responsabilidades

O isolamento entre componentes, casos de uso e serviço HTTP reduz o número de pontos que enviam dados para a API. A validação fica concentrada nos formulários, e a integração externa fica concentrada no serviço. Isso facilita revisar o fluxo de dados e aplicar controles adicionais sem alterar toda a interface.

## Pré-requisitos

- Node.js 20 ou superior;
- npm;
- SafeExpenses API disponível em `http://localhost:3000` para utilizar as funcionalidades de despesas.

## Instalação local

O frontend consome o build local de `@safeexpenses/angular-ui`. A partir da raiz do repositório, compile a biblioteca antes de instalar a aplicação:

```bash
cd packages/angular-ui
npm install
npm run build

cd ../../safeExpenses-web
npm install
npm run start
```

- Aplicação: `http://localhost:4200`
- API esperada: `http://localhost:3000`

A URL da API é definida em `src/environments/environment.ts` e substituída pela configuração de produção durante o build correspondente.

## Executar com Docker

Construa a imagem a partir do diretório `safeExpenses-web`:

```bash
npm run docker:build
```

Crie a rede compartilhada, caso ainda não exista:

```bash
npm run docker:network:create
```

Execute o container:

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

- Aplicação: `http://localhost:4200`

Para iniciar web, API e persistência juntos, utilize o Docker Compose documentado no README da raiz do projeto.

## Scripts disponíveis

- `npm run ng`: executa comandos do Angular CLI.
- `npm run start`: inicia o servidor de desenvolvimento na porta `4200`.
- `npm run build`: gera o build de produção no diretório `dist`.
- `npm run watch`: recompila a aplicação em modo de desenvolvimento quando arquivos são alterados.
- `npm run test`: executa os testes unitários.
- `npm run lint`: analisa o projeto com ESLint.
- `npm run lint:fix`: corrige automaticamente problemas compatíveis com o ESLint.
- `npm run format`: formata os arquivos com Prettier.
- `npm run format:check`: verifica a formatação sem alterar arquivos.
- `npm run docker:build`: constrói a imagem Docker `safeexpenses-web`.
- `npm run docker:network:create`: cria a rede Docker compartilhada `safeexpenses-net`.
- `npm run docker:run`: executa o container `safeexpenses-web-local` na porta `4200`.
- `npm run docker:stop`: interrompe o container local da aplicação.
- `npm run docker:network:remove`: remove a rede Docker compartilhada.
