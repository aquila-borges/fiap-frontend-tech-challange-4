import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExpenseDto } from '../../application/dto/create-expense.dto';
import { UpdateExpenseDto } from '../../application/dto/update-expense.dto';
import { CreateExpenseUseCase } from '../../application/use-cases/create-expense.use-case';
import { DeleteExpenseUseCase } from '../../application/use-cases/delete-expense.use-case';
import { GetExpenseByIdUseCase } from '../../application/use-cases/get-expense-by-id.use-case';
import { ListExpensesUseCase } from '../../application/use-cases/list-expenses.use-case';
import { UpdateExpenseUseCase } from '../../application/use-cases/update-expense.use-case';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly listExpensesUseCase: ListExpensesUseCase,
    private readonly getExpenseByIdUseCase: GetExpenseByIdUseCase,
    private readonly updateExpenseUseCase: UpdateExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateExpenseDto) {
    return this.createExpenseUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listExpensesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const expense = await this.getExpenseByIdUseCase.execute(id);

    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} was not found`);
    }

    return expense;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    const updated = await this.updateExpenseUseCase.execute(id, dto);

    if (!updated) {
      throw new NotFoundException(`Expense with id ${id} was not found`);
    }

    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const removed = await this.deleteExpenseUseCase.execute(id);

    if (!removed) {
      throw new NotFoundException(`Expense with id ${id} was not found`);
    }
  }
}
