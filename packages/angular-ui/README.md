# @safeexpenses/angular-ui

Standalone Angular components backed by the shared SafeExpenses design tokens.

Build the library before installing it in an application:

```bash
npm install
npm run build
```

Install `@safeexpenses/angular-ui` and `@safeexpenses/design-system`, import the design tokens once in the application's global stylesheet, and import components from the package root:

```ts
import { PrimaryButtonComponent, SecondaryButtonComponent } from '@safeexpenses/angular-ui';
```

```html
<se-primary-button (buttonClick)="save()">Save</se-primary-button>
<se-secondary-button (buttonClick)="cancel()">Cancel</se-secondary-button>
```

The package does not depend on the shell or any remote application.
