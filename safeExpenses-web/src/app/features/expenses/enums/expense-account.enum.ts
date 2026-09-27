import { SelectFieldOption } from '@safeexpenses/angular-ui/form-fields';

export enum ExpenseAccount {
  CreditCard = 'Cartão de Crédito',
  CheckingAccount = 'Conta Corrente',
}

export const EXPENSE_ACCOUNT_OPTIONS: readonly SelectFieldOption[] = Object.values(
  ExpenseAccount,
).map((value) => ({ label: value, value }));