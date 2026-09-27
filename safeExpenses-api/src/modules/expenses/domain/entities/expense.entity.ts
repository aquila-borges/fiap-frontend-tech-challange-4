export interface Expense {
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
