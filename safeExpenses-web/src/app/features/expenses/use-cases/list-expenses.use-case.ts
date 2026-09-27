import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

@Injectable({ providedIn: 'root' })
export class ListExpensesUseCase {
  private readonly expensesService = inject(ExpensesService);

  execute(): Observable<Expense[]> {
    return this.expensesService.findAll();
  }
}
