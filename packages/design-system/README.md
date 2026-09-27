# @safeexpenses/design-system

Shared visual contract for SafeExpenses applications, based on the EA App dark-mode identity.

## Usage

For tokens only, import:

```css
@import '@safeexpenses/design-system/tokens.css';
```

For the standard font, page defaults, background, text color, and scrollbars, import the opt-in global foundation instead. It already imports the tokens:

```css
@import '@safeexpenses/design-system/globals.css';
```

Consume only prefixed custom properties in application and component styles:

```css
.title {
  color: var(--se-color-text-primary);
}
```

The token stylesheet intentionally contains no reset, element selectors, Angular Material internals, or component classes. Global behavior remains owned by each application.
