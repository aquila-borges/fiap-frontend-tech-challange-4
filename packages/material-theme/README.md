# @safeexpenses/material-theme

Angular Material adapter for the SafeExpenses (EA App dark mode) design tokens.

This package owns the public Material theming API integration. Applications that do not use Angular Material should depend only on `@safeexpenses/design-system`.

Dialog color, shape, elevation, spacing, and typography are configured through `mat.dialog-overrides`. Applications can use the shared layout hooks through their dialog defaults:

```ts
{
	provide: MAT_DIALOG_DEFAULT_OPTIONS,
	useValue: {
		panelClass: 'se-dialog-panel',
		backdropClass: 'se-dialog-backdrop',
	},
}
```

For a consistent title and supporting description inside slide toggles, use the framework-level composition classes independently of dialogs:

```html
<mat-slide-toggle>
	<span class="se-slide-toggle-title">Setting title</span>
	<span class="se-slide-toggle-description">Supporting description.</span>
</mat-slide-toggle>
```
