import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Expense, UpdateExpensePayload } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

@Injectable({ providedIn: 'root' })
export class UpdateExpenseUseCase {
  private readonly expensesService = inject(ExpensesService);

  execute(id: string, payload: UpdateExpensePayload): Observable<Expense> {
    return this.expensesService.update(id, payload);
  }
}
