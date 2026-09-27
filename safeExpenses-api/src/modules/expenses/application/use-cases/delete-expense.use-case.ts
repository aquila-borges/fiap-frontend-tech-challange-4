import { Inject, Injectable } from '@nestjs/common';
import { ExpensesRepository } from '../../domain/repositories/expenses.repository';
import { EXPENSES_REPOSITORY } from '../../domain/tokens/expenses.tokens';

@Injectable()
export class DeleteExpenseUseCase {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly repository: ExpensesRepository,
  ) {}

  execute(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
