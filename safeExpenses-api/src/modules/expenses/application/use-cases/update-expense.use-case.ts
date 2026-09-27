import { Inject, Injectable } from '@nestjs/common';
import { Expense } from '../../domain/entities/expense.entity';
import { ExpensesRepository } from '../../domain/repositories/expenses.repository';
import { EXPENSES_REPOSITORY } from '../../domain/tokens/expenses.tokens';
import { UpdateExpenseDto } from '../dto/update-expense.dto';

@Injectable()
export class UpdateExpenseUseCase {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly repository: ExpensesRepository,
  ) {}

  async execute(id: string, input: UpdateExpenseDto): Promise<Expense | null> {
    return this.repository.update(id, {
      ...input,
      updatedAt: new Date().toISOString(),
    });
  }
}
