import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

@Injectable({ providedIn: 'root' })
export class GetExpenseByIdUseCase {
  private readonly expensesService = inject(ExpensesService);

  execute(id: string): Observable<Expense> {
    return this.expensesService.findById(id);
  }
}
