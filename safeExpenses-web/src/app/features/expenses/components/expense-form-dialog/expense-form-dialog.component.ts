import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  AlertComponent,
  AlertType,
  PrimaryButtonComponent,
  SecondaryButtonComponent,
  ToastService,
} from '@safeexpenses/angular-ui';
import {
  DateFieldComponent,
  InputFieldComponent,
  SelectFieldComponent,
  SelectFieldOption,
} from '@safeexpenses/angular-ui/form-fields';
import { finalize, Observable } from 'rxjs';

import { EXPENSE_ACCOUNT_OPTIONS, EXPENSE_CATEGORY_OPTIONS } from '../../enums';
import {
  ExpenseFormDialogData,
  ExpenseFormDialogResult,
} from '../../interfaces/expense-form-dialog.interface';
import { CreateExpensePayload, Expense } from '../../models/expense.model';
import { ExpenseEntryType } from '../../types';
import { CreateExpenseUseCase, UpdateExpenseUseCase } from '../../use-cases';

interface ExpenseFormAlert {
  type: AlertType;
  message: string;
}

function noWhitespace(control: FormControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { whitespace: true };
}

function parseCurrencyAmount(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const normalized = value.includes(',')
    ? value.replace(/\./g, '').replace(',', '.')
    : value;
  return Number(normalized.replace(/[^\d.-]/g, ''));
}

function minimumAmount(control: AbstractControl): ValidationErrors | null {
  if (control.value === null || control.value === '') {
    return null;
  }

  const amount = parseCurrencyAmount(control.value);
  return Number.isFinite(amount) && amount >= 0.01
    ? null
    : { min: { min: 0.01, actual: amount } };
}

@Component({
  selector: 'app-expense-form-dialog',
  standalone: true,
  imports: [
    AlertComponent,
    DateFieldComponent,
    InputFieldComponent,
    MatButtonToggleModule,
    MatDialogModule,
    MatSlideToggleModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    SecondaryButtonComponent,
    SelectFieldComponent,
  ],
  templateUrl: './expense-form-dialog.component.html',
  styleUrl: './expense-form-dialog.component.css',
})
export class ExpenseFormDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<ExpenseFormDialogComponent, ExpenseFormDialogResult>,
  );
  private readonly data = inject<ExpenseFormDialogData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly createExpenseUseCase = inject(CreateExpenseUseCase);
  private readonly updateExpenseUseCase = inject(UpdateExpenseUseCase);
  private readonly toastService = inject(ToastService);
  private hasChanges = false;

  readonly isEditMode = !!this.data?.expense;
  readonly submitting = signal(false);
  readonly alert = signal<ExpenseFormAlert | null>(null);
  readonly accountOptions = EXPENSE_ACCOUNT_OPTIONS;
  readonly categoryOptions = EXPENSE_CATEGORY_OPTIONS;
  readonly typeOptions: readonly SelectFieldOption<ExpenseEntryType>[] = [
    { label: 'Despesa', value: 'expense' },
    { label: 'Receita', value: 'income' },
  ];

  readonly form = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), noWhitespace],
    }),
    category: new FormControl('', { nonNullable: true, validators: Validators.required }),
    account: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl<ExpenseEntryType>('expense', {
      nonNullable: true,
      validators: Validators.required,
    }),
    amount: new FormControl<number | string | null>(null, [
      Validators.required,
      minimumAmount,
    ]),
    transactionDate: new FormControl<Date | null>(new Date(), Validators.required),
    consolidated: new FormControl(false, { nonNullable: true }),
  });

  constructor() {
    const expense = this.data?.expense;
    if (expense) {
      this.form.setValue({
        description: expense.description,
        category: expense.category,
        account: expense.account,
        type: expense.value >= 0 ? 'income' : 'expense',
        amount: Math.abs(expense.value),
        transactionDate: this.parseCalendarDate(expense.transactionDate),
        consolidated: expense.consolidated,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close({ changed: this.hasChanges });
  }

  save(): void {
    if (!this.prepareSubmission()) {
      return;
    }

    this.submitRequest()
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.hasChanges = true;
          this.toastService.success(
            this.isEditMode
              ? 'Despesa atualizada com sucesso.'
              : 'Despesa cadastrada com sucesso.',
          );
          this.dialogRef.close({ changed: true });
        },
        error: () => {
          this.toastService.error(
            this.isEditMode
              ? 'Não foi possível atualizar a despesa.'
              : 'Não foi possível cadastrar a despesa.',
          );
          this.dialogRef.close({ changed: this.hasChanges });
        },
      });
  }

  saveAndCreateAnother(): void {
    if (this.isEditMode || !this.prepareSubmission()) {
      return;
    }

    this.createExpenseUseCase
      .execute(this.buildPayload())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.hasChanges = true;
          this.alert.set({ type: 'success', message: 'Despesa cadastrada com sucesso.' });
          this.resetForm();
        },
        error: () => {
          this.alert.set({ type: 'error', message: 'Não foi possível cadastrar a despesa.' });
        },
      });
  }

  clearAlert(): void {
    this.alert.set(null);
  }

  private prepareSubmission(): boolean {
    this.alert.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    this.submitting.set(true);
    return true;
  }

  private submitRequest(): Observable<Expense> {
    const payload = this.buildPayload();
    const expense = this.data?.expense;
    return expense
      ? this.updateExpenseUseCase.execute(expense.id, payload)
      : this.createExpenseUseCase.execute(payload);
  }

  private buildPayload(): CreateExpensePayload {
    const rawValue = this.form.getRawValue();
    const amount = parseCurrencyAmount(rawValue.amount);

    return {
      description: rawValue.description.trim(),
      category: rawValue.category,
      account: rawValue.account,
      value: rawValue.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      consolidated: rawValue.consolidated,
      transactionDate: this.serializeCalendarDate(rawValue.transactionDate as Date),
    };
  }

  private resetForm(): void {
    this.form.reset({
      description: '',
      category: '',
      account: '',
      type: 'expense',
      amount: null,
      transactionDate: new Date(),
      consolidated: false,
    });
  }

  private parseCalendarDate(value: string): Date {
    const [datePart] = value.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private serializeCalendarDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
}