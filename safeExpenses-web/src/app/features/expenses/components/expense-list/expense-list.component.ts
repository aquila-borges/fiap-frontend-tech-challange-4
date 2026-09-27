import { Component, computed, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ptBrNumberFormatter } from '@safeexpenses/angular-ui';

import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  imports: [MatCheckboxModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
})
export class ExpenseListComponent {
  readonly expenses = input<Expense[]>([]);
  readonly selectedIds = input<ReadonlySet<string>>(new Set());
  readonly consolidatedToggle = output<Expense>();
  readonly selectionToggle = output<string>();
  readonly balance = computed(() =>
    this.expenses().reduce((total, expense) => total + expense.value, 0),
  );

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  toggleSelection(id: string): void {
    this.selectionToggle.emit(id);
  }

  onToggleConsolidated(expense: Expense): void {
    this.consolidatedToggle.emit(expense);
  }

  formatValue(value: number): string {
    const sign = value >= 0 ? '+' : '-';
    return `${sign} ${ptBrNumberFormatter.format(Math.abs(value))}`;
  }
}
