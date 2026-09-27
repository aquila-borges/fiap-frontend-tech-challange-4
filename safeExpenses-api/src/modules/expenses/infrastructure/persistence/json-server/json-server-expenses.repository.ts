import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  CreateExpenseInput,
  ExpensesRepository,
  UpdateExpenseInput,
} from '../../../domain/repositories/expenses.repository';
import { Expense } from '../../../domain/entities/expense.entity';

@Injectable()
export class JsonServerExpensesRepository implements ExpensesRepository {
  private readonly httpClient: AxiosInstance;

  constructor() {
    const baseURL = process.env.JSON_SERVER_URL ?? 'http://localhost:3001';
    this.httpClient = axios.create({ baseURL, timeout: 5000 });
  }

  async create(input: CreateExpenseInput): Promise<Expense> {
    const { data } = await this.httpClient.post<Expense>('/expenses', input);
    return data;
  }

  async findAll(): Promise<Expense[]> {
    const { data } = await this.httpClient.get<Expense[]>('/expenses');
    return data;
  }

  async findById(id: string): Promise<Expense | null> {
    try {
      const { data } = await this.httpClient.get<Expense>(`/expenses/${id}`);
      return data;
    } catch (error) {
      if (this.isNotFound(error)) {
        return null;
      }
      throw error;
    }
  }

  async update(id: string, input: UpdateExpenseInput): Promise<Expense | null> {
    const current = await this.findById(id);

    if (!current) {
      return null;
    }

    const payload: Expense = {
      ...current,
      ...input,
      updatedAt: input.updatedAt,
    };

    const { data } = await this.httpClient.put<Expense>(`/expenses/${id}`, payload);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.httpClient.delete(`/expenses/${id}`);
      return true;
    } catch (error) {
      if (this.isNotFound(error)) {
        return false;
      }
      throw error;
    }
  }

  private isNotFound(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 404;
  }
}
