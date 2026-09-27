import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateExpensePayload, Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

@Injectable({ providedIn: 'root' })
export class CreateExpenseUseCase {
  private readonly expensesService = inject(ExpensesService);

  execute(payload: CreateExpensePayload): Observable<Expense> {
    return this.expensesService.create(payload);
  }
}
