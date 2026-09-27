import { Module } from '@nestjs/common';
import { CreateExpenseUseCase } from './application/use-cases/create-expense.use-case';
import { DeleteExpenseUseCase } from './application/use-cases/delete-expense.use-case';
import { GetExpenseByIdUseCase } from './application/use-cases/get-expense-by-id.use-case';
import { ListExpensesUseCase } from './application/use-cases/list-expenses.use-case';
import { UpdateExpenseUseCase } from './application/use-cases/update-expense.use-case';
import { EXPENSES_REPOSITORY } from './domain/tokens/expenses.tokens';
import { ExpensesController } from './infrastructure/http/expenses.controller';
import { JsonServerExpensesRepository } from './infrastructure/persistence/json-server/json-server-expenses.repository';

@Module({
  controllers: [ExpensesController],
  providers: [
    CreateExpenseUseCase,
    ListExpensesUseCase,
    GetExpenseByIdUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
    {
      provide: EXPENSES_REPOSITORY,
      useClass: JsonServerExpensesRepository,
    },
  ],
})
export class ExpensesModule {}
