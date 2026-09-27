import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ConfirmDialogService, ToastService } from '@safeexpenses/angular-ui';

import { ExpenseActionsComponent } from '../components/expense-actions/expense-actions.component';
import { ExpenseFormDialogComponent } from '../components/expense-form-dialog/expense-form-dialog.component';
import { ExpenseListComponent } from '../components/expense-list/expense-list.component';
import {
  ExpenseFormDialogData,
  ExpenseFormDialogResult,
} from '../interfaces/expense-form-dialog.interface';
import { Expense, UpdateExpensePayload } from '../models/expense.model';
import { DeleteExpenseUseCase } from '../use-cases/delete-expense.use-case';
import { ListExpensesUseCase } from '../use-cases/list-expenses.use-case';
import { UpdateExpenseUseCase } from '../use-cases/update-expense.use-case';

@Component({
  selector: 'app-expenses-feature',
  imports: [ExpenseActionsComponent, ExpenseListComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent implements OnInit {
  private readonly listExpensesUseCase = inject(ListExpensesUseCase);
  private readonly updateExpenseUseCase = inject(UpdateExpenseUseCase);
  private readonly deleteExpenseUseCase = inject(DeleteExpenseUseCase);
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  readonly expenses = signal<Expense[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedIds = signal<ReadonlySet<string>>(new Set());

  readonly selectedCount = computed(() => this.selectedIds().size);

  readonly allVisibleSelected = computed(() => {
    const visibleIds = this.expenses().map((expense) => expense.id);
    if (!visibleIds.length) {
      return false;
    }
    const selected = this.selectedIds();
    return visibleIds.every((id) => selected.has(id));
  });

  readonly partiallyVisibleSelected = computed(() => {
    const visibleIds = this.expenses().map((expense) => expense.id);
    if (!visibleIds.length) {
      return false;
    }
    const selected = this.selectedIds();
    const selectedVisibleCount = visibleIds.filter((id) => selected.has(id)).length;
    return selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
  });

  ngOnInit(): void {
    this.loadExpenses();
  }

  onAddExpense(): void {
    this.openExpenseDialog();
  }

  onEditExpense(expense: Expense): void {
    this.openExpenseDialog({ expense });
  }

  onSelectionToggle(id: string): void {
    const next = new Set(this.selectedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.selectedIds.set(next);
  }

  onSelectAllToggle(checked: boolean): void {
    const visibleIds = this.expenses().map((expense) => expense.id);
    const next = new Set(this.selectedIds());

    if (checked) {
      visibleIds.forEach((id) => next.add(id));
    } else {
      visibleIds.forEach((id) => next.delete(id));
    }

    this.selectedIds.set(next);
  }

  onConsolidatedToggle(expense: Expense): void {
    this.updateExpenseUseCase
      .execute(expense.id, this.buildUpdatePayload(expense, !expense.consolidated))
      .subscribe({
        next: () => this.loadExpenses(),
        error: () => this.error.set('Could not update the expense.'),
      });
  }

  onConsolidateSelected(): void {
    const targets = this.expenses().filter(
      (expense) => this.selectedIds().has(expense.id) && !expense.consolidated,
    );
    if (!targets.length) {
      return;
    }

    forkJoin(
      targets.map((expense) =>
        this.updateExpenseUseCase.execute(expense.id, this.buildUpdatePayload(expense, true)),
      ),
    ).subscribe({
      next: () => {
        this.selectedIds.set(new Set());
        this.loadExpenses();
      },
      error: () => this.error.set('Could not consolidate selected expenses.'),
    });
  }

  onUnconsolidateSelected(): void {
    const targets = this.expenses().filter(
      (expense) => this.selectedIds().has(expense.id) && expense.consolidated,
    );
    if (!targets.length) {
      return;
    }

    forkJoin(
      targets.map((expense) =>
        this.updateExpenseUseCase.execute(expense.id, this.buildUpdatePayload(expense, false)),
      ),
    ).subscribe({
      next: () => {
        this.selectedIds.set(new Set());
        this.loadExpenses();
      },
      error: () => this.error.set('Could not unconsolidate selected expenses.'),
    });
  }

  onDeleteSelected(): void {
    const ids = Array.from(this.selectedIds());
    if (!ids.length) {
      return;
    }

    const isSingle = ids.length === 1;
    this.confirmDialogService
      .confirm({
        title: isSingle ? 'Excluir despesa' : 'Excluir despesas',
        message: isSingle
          ? 'Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.'
          : `Tem certeza que deseja excluir estas ${ids.length} despesas? Esta ação não pode ser desfeita.`,
        confirmLabel: 'Excluir',
        cancelLabel: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        forkJoin(ids.map((id) => this.deleteExpenseUseCase.execute(id))).subscribe({
          next: () => {
            this.selectedIds.set(new Set());
            this.loadExpenses();
            this.toastService.success('Despesa excluída com sucesso.');
          },
          error: () => {
            this.error.set('Could not delete selected expenses.');
            this.toastService.error('Não foi possível excluir a despesa.');
          },
        });
      });
  }

  private loadExpenses(): void {
    this.loading.set(true);
    this.listExpensesUseCase.execute().subscribe({
      next: (expenses) => {
        this.expenses.set(expenses);
        this.error.set(null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load expenses.');
        this.loading.set(false);
      },
    });
  }

  private openExpenseDialog(data?: ExpenseFormDialogData): void {
    this.dialog
      .open<ExpenseFormDialogComponent, ExpenseFormDialogData | undefined, ExpenseFormDialogResult>(
        ExpenseFormDialogComponent,
        {
          width: '640px',
          maxWidth: '92vw',
          autoFocus: false,
          disableClose: true,
          panelClass: 'se-dialog-panel',
          backdropClass: 'se-dialog-backdrop',
          data,
        },
      )
      .afterClosed()
      .subscribe((result) => {
        if (result?.changed) {
          this.loadExpenses();
        }
      });
  }

  private buildUpdatePayload(expense: Expense, consolidated: boolean): UpdateExpensePayload {
    const payload = {
      description: expense.description,
      category: expense.category,
      account: expense.account,
      value: expense.value,
      consolidated,
      transactionDate: expense.transactionDate,
    } satisfies UpdateExpensePayload;

    return payload;
  }
}
