# @safeexpenses/material-theme

Tema que integra os design tokens do SafeExpenses aos componentes do Angular Material.

Aplicações que não utilizam Angular Material devem instalar somente `@safeexpenses/design-system`.

## Como funciona

O arquivo `theme.scss` utiliza a API pública de temas do Angular Material para aplicar a identidade visual do SafeExpenses aos componentes e recursos visuais utilizados pela aplicação. Ele também concentra ajustes globais e classes auxiliares necessários para manter consistência entre diferentes interfaces.

Os valores visuais são lidos das variáveis CSS do `@safeexpenses/design-system`. Assim, os componentes Material e os componentes próprios utilizam a mesma fonte de cores, formas e sombras.

## Instalação no monorepo

Instale o Angular Material e registre os dois pacotes locais no `package.json` da aplicação:

```json
{
	"dependencies": {
		"@angular/material": "^21.2.0",
		"@safeexpenses/design-system": "file:../packages/design-system",
		"@safeexpenses/material-theme": "file:../packages/material-theme"
	}
}
```

Em seguida, execute:

```bash
npm install
```

O pacote exporta SCSS pronto para consumo e não possui etapa própria de compilação.

## Configuração na aplicação Angular

Adicione o tema global à lista `styles` do `angular.json`, antes dos estilos da aplicação:

```json
{
	"styles": [
		"node_modules/@safeexpenses/material-theme/theme.scss",
		"src/styles.css"
	]
}
```

No stylesheet global, carregue a base do design system:

```css
@import '@safeexpenses/design-system/globals.css';
```

Depois disso, os componentes Angular Material importados pela aplicação recebem o tema automaticamente.

## Dialogs

Cores, forma, elevação, espaçamento e tipografia dos dialogs são configurados pela API `mat.dialog-overrides`. Para aplicar também o painel e o backdrop compartilhados em dialogs próprios, informe as classes ao abri-los:

```ts
this.dialog.open(ExpenseDialogComponent, {
	panelClass: 'se-dialog-panel',
	backdropClass: 'se-dialog-backdrop',
});
```

Como alternativa, configure valores padrão para todos os dialogs:

```ts
{
	provide: MAT_DIALOG_DEFAULT_OPTIONS,
	useValue: {
		panelClass: 'se-dialog-panel',
		backdropClass: 'se-dialog-backdrop',
	},
}
```

## Slide toggles

Para manter título e descrição consistentes dentro de um `mat-slide-toggle`, utilize as classes de composição do tema:

```html
<mat-slide-toggle>
	<span class="se-slide-toggle-title">Lançamento consolidado</span>
	<span class="se-slide-toggle-description">Indica que o pagamento já foi efetivado.</span>
</mat-slide-toggle>
```

## Notificações

Se a aplicação utilizar os toasts de `@safeexpenses/angular-ui`, inclua também o CSS estrutural do `ngx-toastr` antes do tema:

```json
{
	"styles": [
		"node_modules/ngx-toastr/toastr.css",
		"node_modules/@safeexpenses/material-theme/theme.scss",
		"src/styles.css"
	]
}
```

O `ngx-toastr` fornece a estrutura da notificação e este pacote aplica as cores, bordas, fonte e sombras do SafeExpenses.
