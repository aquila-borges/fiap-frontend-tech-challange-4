import { Expense } from '../entities/expense.entity';

export interface CreateExpenseInput {
  id: string;
  description: string;
  category: string;
  account: string;
  value: number;
  consolidated: boolean;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateExpenseInput {
  description?: string;
  category?: string;
  account?: string;
  value?: number;
  consolidated?: boolean;
  transactionDate?: string;
  updatedAt: string;
}

export interface ExpensesRepository {
  create(input: CreateExpenseInput): Promise<Expense>;
  findAll(): Promise<Expense[]>;
  findById(id: string): Promise<Expense | null>;
  update(id: string, input: UpdateExpenseInput): Promise<Expense | null>;
  delete(id: string): Promise<boolean>;
}
