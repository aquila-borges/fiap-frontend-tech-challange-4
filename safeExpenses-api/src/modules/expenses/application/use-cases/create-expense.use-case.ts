import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Expense } from '../../domain/entities/expense.entity';
import { ExpensesRepository } from '../../domain/repositories/expenses.repository';
import { EXPENSES_REPOSITORY } from '../../domain/tokens/expenses.tokens';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    @Inject(EXPENSES_REPOSITORY)
    private readonly repository: ExpensesRepository,
  ) {}

  async execute(input: CreateExpenseDto): Promise<Expense> {
    const now = new Date().toISOString();

    return this.repository.create({
      ...input,
      createdAt: now,
      updatedAt: now,
      id: randomUUID(),
    });
  }
}
