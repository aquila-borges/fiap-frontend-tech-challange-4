import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ExpensesService } from '../services/expenses.service';

@Injectable({ providedIn: 'root' })
export class DeleteExpenseUseCase {
  private readonly expensesService = inject(ExpensesService);

  execute(id: string): Observable<void> {
    return this.expensesService.delete(id);
  }
}
