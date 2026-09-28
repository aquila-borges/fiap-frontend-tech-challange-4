# @safeexpenses/angular-ui

Biblioteca de componentes Angular standalone baseada nos tokens visuais do SafeExpenses e no Angular Material.

O pacote não depende da aplicação principal e pode ser reutilizado por outras aplicações Angular compatíveis.

## Como funciona

Os componentes utilizam os design tokens de `@safeexpenses/design-system` e recebem a integração visual com Angular Material por meio de `@safeexpenses/material-theme`.

A biblioteca possui dois pontos de entrada:

- `@safeexpenses/angular-ui`: botões, alertas, dialogs, notificações e utilitários leves.
- `@safeexpenses/angular-ui/form-fields`: campos de formulário que dependem de Angular Forms, Material e Maskito.

Essa separação permite carregar os campos mais pesados somente nas funcionalidades que realmente os utilizam.

## Recursos disponíveis

O ponto de entrada principal exporta:

- `PrimaryButtonComponent` e `SecondaryButtonComponent`;
- `IconButtonComponent`;
- `AlertComponent` e o tipo `AlertType`;
- `ConfirmDialogComponent`, `ConfirmDialogService` e `ConfirmDialogData`;
- `ToastService` e `provideToastNotifications`;
- o formatador `ptBrNumberFormatter`.

O ponto de entrada de formulários exporta:

- `InputFieldComponent`;
- `SelectFieldComponent`;
- `DateFieldComponent`;
- os tipos `FormFieldErrorMessages` e `SelectFieldOption`.

## Compilação

Compile a biblioteca antes de instalá-la na aplicação:

```bash
npm install
npm run build
```

O build é gerado em `packages/angular-ui/dist` e inclui o ponto de entrada secundário `form-fields`.

## Instalação no monorepo

Depois de compilar a biblioteca, registre os pacotes no `package.json` da aplicação:

```json
{
	"dependencies": {
		"@safeexpenses/angular-ui": "file:../packages/angular-ui/dist",
		"@safeexpenses/design-system": "file:../packages/design-system",
		"@safeexpenses/material-theme": "file:../packages/material-theme"
	}
}
```

Instale também as peer dependencies utilizadas pelos componentes:

```bash
npm install @angular/material @angular/forms @maskito/angular @maskito/core @maskito/kit ngx-toastr
```

### Por que utilizar peer dependencies?

Uma `peerDependency` indica que a biblioteca precisa de um pacote, mas espera que ele já esteja instalado na aplicação.

Por exemplo, a aplicação e o `angular-ui` utilizam Angular Material. Em vez de a biblioteca instalar outra cópia, ambos compartilham a mesma instalação fornecida pela aplicação. Isso evita dependências duplicadas, conflitos de versão e aumento desnecessário do bundle.

Neste pacote, a aplicação deve fornecer Angular, Angular Material, Maskito, `ngx-toastr` e o design system. O `angular-ui` apenas informa quais versões são compatíveis.

Esses pacotes também aparecem em `devDependencies` para que o `angular-ui` possa ser compilado e desenvolvido isoladamente. Quando a biblioteca é utilizada, prevalecem as dependências instaladas pela aplicação.

Por fim, execute `npm install` na aplicação sempre que o caminho local ou o build da biblioteca for atualizado.

## Configuração visual

Importe a fundação visual uma única vez no stylesheet global:

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import '@safeexpenses/design-system/globals.css';
```

O primeiro import disponibiliza os ícones utilizados por componentes como `se-icon-button` e `se-alert`.

Adicione o tema e o CSS estrutural das notificações à lista `styles` do `angular.json`:

```json
{
	"styles": [
		"node_modules/ngx-toastr/toastr.css",
		"node_modules/@safeexpenses/material-theme/theme.scss",
		"src/styles.css"
	]
}
```

## Utilização de componentes

Como os componentes são standalone, importe somente os componentes usados:

```ts
import {
	AlertComponent,
	IconButtonComponent,
	PrimaryButtonComponent,
	SecondaryButtonComponent,
} from '@safeexpenses/angular-ui';

@Component({
	standalone: true,
	imports: [
		AlertComponent,
		IconButtonComponent,
		PrimaryButtonComponent,
		SecondaryButtonComponent,
	],
	templateUrl: './expense-actions.html',
})
export class ExpenseActionsComponent {
	showWarning = true;

	save(): void {}
	cancel(): void {}
	remove(): void {}
}
```

```html
<se-primary-button (buttonClick)="save()">Salvar</se-primary-button>
<se-secondary-button (buttonClick)="cancel()">Cancelar</se-secondary-button>
```

Para um botão com ícone do Material Icons:

```html
<se-icon-button
	label="Excluir"
	icon="delete"
	ariaLabel="Excluir lançamento"
	(buttonClick)="remove()"
/>
```

Para exibir uma mensagem contextual que pode ser descartada:

```html
@if (showWarning) {
	<se-alert
		type="warning"
		title="Atenção"
		message="Revise os dados antes de continuar."
		[dismissible]="true"
		(dismiss)="showWarning = false"
	/>
}
```

## Campos de formulário

Importe os campos pelo ponto de entrada secundário e associe um `FormControl`:

```ts
import { FormControl, Validators } from '@angular/forms';
import {
	DateFieldComponent,
	InputFieldComponent,
	SelectFieldComponent,
} from '@safeexpenses/angular-ui/form-fields';

@Component({
	standalone: true,
	imports: [DateFieldComponent, InputFieldComponent, SelectFieldComponent],
	templateUrl: './expense-form.html',
})
export class ExpenseFormComponent {
	readonly description = new FormControl('', {
		nonNullable: true,
		validators: Validators.required,
	});

	readonly category = new FormControl('', {
		nonNullable: true,
		validators: Validators.required,
	});

	readonly transactionDate = new FormControl<Date | null>(new Date(), Validators.required);

	readonly categoryOptions = [
		{ label: 'Alimentação', value: 'Alimentação' },
		{ label: 'Transporte', value: 'Transporte' },
	];
}
```

```html
<se-input
	label="Descrição"
	[control]="description"
	[errorMessages]="{ required: 'Informe a descrição.' }"
/>

<se-select
	label="Categoria"
	[control]="category"
	[options]="categoryOptions"
	[errorMessages]="{ required: 'Selecione uma categoria.' }"
/>

<se-date-field
	label="Data"
	[control]="transactionDate"
	[errorMessages]="{ required: 'Informe a data.' }"
/>
```

## Formatação de números

Utilize o formatador compartilhado para apresentar números no padrão brasileiro com duas casas decimais:

```ts
import { ptBrNumberFormatter } from '@safeexpenses/angular-ui';

const formattedValue = ptBrNumberFormatter.format(1234.5);
// Resultado: "1.234,50"
```

## Notificações

Registre o provider uma vez na configuração da aplicação. As animações também devem estar habilitadas:

```ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastNotifications } from '@safeexpenses/angular-ui';

export const appConfig: ApplicationConfig = {
	providers: [provideAnimationsAsync(), provideToastNotifications()],
};
```

Injete o serviço onde a notificação for necessária:

```ts
private readonly toast = inject(ToastService);

save(): void {
	this.toast.success('Lançamento salvo com sucesso.');
}
```

O serviço também oferece os métodos `error`, `info` e `warning`.

## Dialog de confirmação

O serviço abre um dialog já configurado com o tema compartilhado e retorna um `Observable<boolean>`:

```ts
private readonly confirmDialog = inject(ConfirmDialogService);

remove(): void {
	this.confirmDialog
		.confirm({
			title: 'Excluir lançamento',
			message: 'Esta ação não poderá ser desfeita.',
			confirmLabel: 'Excluir',
			cancelLabel: 'Cancelar',
		})
		.subscribe((confirmed) => {
			if (confirmed) {
				// Execute a exclusão.
			}
		});
}
```

## Scripts disponíveis

- `npm run build`: compila a biblioteca com `ng-packagr` e gera o pacote instalável no diretório `dist`.
