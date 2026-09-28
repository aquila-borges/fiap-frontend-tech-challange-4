# @safeexpenses/design-system

Contrato visual compartilhado das aplicações SafeExpenses. O pacote centraliza cores, tipografia, espaçamentos, formas e sombras por meio de variáveis CSS com o prefixo `--se-`.

O design system não contém componentes Angular e pode ser utilizado por qualquer aplicação web que suporte CSS Custom Properties.

## Como funciona

O pacote exporta dois arquivos:

- `tokens.css`: disponibiliza somente os design tokens, sem alterar elementos da página.
- `globals.css`: importa os tokens e também aplica a fonte Montserrat, cores da página, margens e barras de rolagem padrão.

Use `tokens.css` quando a aplicação precisar controlar seus estilos globais. Use `globals.css` quando ela puder adotar toda a base visual do SafeExpenses.

## Instalação no monorepo

Adicione a dependência local ao `package.json` da aplicação:

```json
{
  "dependencies": {
    "@safeexpenses/design-system": "file:../packages/design-system"
  }
}
```

Depois, instale as dependências:

```bash
npm install
```

O pacote é privado e consumido localmente neste repositório; não é necessário compilá-lo.

## Utilização

Para carregar somente os tokens, importe o arquivo no stylesheet global da aplicação:

```css
@import '@safeexpenses/design-system/tokens.css';
```

Para carregar a fundação visual completa, importe apenas `globals.css`, pois ele já inclui os tokens:

```css
@import '@safeexpenses/design-system/globals.css';
```

Consuma as variáveis nos estilos globais ou de componentes:

```css
.expense-summary {
  color: var(--se-color-text-heading);
  background: var(--se-color-surface-primary-strong);
  border: 1px solid var(--se-color-border);
  border-radius: var(--se-dialog-container-shape);
  box-shadow: var(--se-shadow-small);
}
```

## Personalização

Sobrescreva tokens depois do import global para criar um tema específico sem alterar os componentes:

```css
@import '@safeexpenses/design-system/globals.css';

:root {
  --se-color-brand-primary: #ff5500;
  --se-button-shape: 6px;
}
```

Evite utilizar diretamente valores de cor ou espaçamento que já possuam um token. Isso mantém a identidade visual consistente e permite mudanças centralizadas.

## Limites de responsabilidade

O arquivo `tokens.css` não inclui reset CSS, seletores de elementos, estilos internos do Angular Material ou classes de componentes. O comportamento global continua sob responsabilidade da aplicação, enquanto a adaptação para Angular Material pertence ao pacote `@safeexpenses/material-theme`.
