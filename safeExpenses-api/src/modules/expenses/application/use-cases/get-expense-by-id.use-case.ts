import { Inject, Injectable } from '@nestjs/common';
import { Expense } from '../../domain/entities/expense.entity';
import { ExpensesRepository } from '../../domain/repositories/expenses.repository';
import { EXPENSES_REPOSITORY } from '../../domain/tokens/expenses.tokens';

@Injectable()
export class GetExpenseByIdUseCase {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly repository: ExpensesRepository,
  ) {}

  execute(id: string): Promise<Expense | null> {
    return this.repository.findById(id);
  }
}
