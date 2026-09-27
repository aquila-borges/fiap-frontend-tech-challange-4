import { Component, computed, input, output } from '@angular/core';

import { ExpenseFilters } from '../../interfaces/expense-filters.interface';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-filters',
  templateUrl: './expense-filters.component.html',
  styleUrl: './expense-filters.component.css',
})
export class ExpenseFiltersComponent {
  readonly expenses = input<Expense[]>([]);
  readonly filtersChange = output<ExpenseFilters>();

  readonly categories = computed(() =>
    Array.from(new Set(this.expenses().map((expense) => expense.category))).sort(),
  );

  readonly accounts = computed(() =>
    Array.from(new Set(this.expenses().map((expense) => expense.account))).sort(),
  );

  private filters: ExpenseFilters = {};

  onCategoryChange(category: string): void {
    this.emitFilters({ ...this.filters, category: category || undefined });
  }

  onAccountChange(account: string): void {
    this.emitFilters({ ...this.filters, account: account || undefined });
  }

  onConsolidatedChange(value: string): void {
    const consolidated = value === '' ? undefined : value === 'true';
    this.emitFilters({ ...this.filters, consolidated });
  }

  private emitFilters(filters: ExpenseFilters): void {
    this.filters = filters;
    this.filtersChange.emit(filters);
  }
}
