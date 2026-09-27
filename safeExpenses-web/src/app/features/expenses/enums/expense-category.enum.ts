import { SelectFieldOption } from '@safeexpenses/angular-ui/form-fields';

export enum ExpenseCategory {
  Education = 'Educação',
  Leisure = 'Lazer',
  Home = 'Casa',
  Health = 'Saúde',
  Transportation = 'Transporte',
  FinancialServices = 'Serviços Financeiros',
  Food = 'Alimentação',
  Taxes = 'Impostos',
  OccasionalExpenses = 'Gastos Esporádicos',
}

export const EXPENSE_CATEGORY_OPTIONS: readonly SelectFieldOption[] = Object.values(
  ExpenseCategory,
).map((value) => ({ label: value, value }));