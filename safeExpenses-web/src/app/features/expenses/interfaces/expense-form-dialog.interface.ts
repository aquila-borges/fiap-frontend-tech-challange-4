import { Expense } from '../models/expense.model';

export interface ExpenseFormDialogData {
  expense?: Expense;
}

export interface ExpenseFormDialogResult {
  changed: boolean;
}