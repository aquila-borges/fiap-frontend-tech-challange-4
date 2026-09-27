import { Inject, Injectable } from '@nestjs/common';
import { Expense } from '../../domain/entities/expense.entity';
import { ExpensesRepository } from '../../domain/repositories/expenses.repository';
import { EXPENSES_REPOSITORY } from '../../domain/tokens/expenses.tokens';

@Injectable()
export class ListExpensesUseCase {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly repository: ExpensesRepository,
  ) {}

  execute(): Promise<Expense[]> {
    return this.repository.findAll();
  }
}
