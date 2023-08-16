import { Expense, User } from '@prisma/client'
import { Response } from 'express'

export type Error = { error: string };

export type UserResponse = Response<User | Error>;

type ExpenseOutput = Omit<Expense, 'createdAt' | 'updatedAt'>;
export type ExpenseResponse = Response<ExpenseOutput | ExpenseOutput[] | Error>;

export interface ExpensesFilter {
  userId: number;
  categories?: string[];
  from?: string;
  to?: string;
}

export interface RawExpensesFilter {
  userId: any;
  categories?: any;
  from?: any;
  to?: any;
}

export interface ExpensesInput {
  userId: number;
  title: string;
  category: string;
  amount: string;
  spentAt: string;
  note: string | null;
}
