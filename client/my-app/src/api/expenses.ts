import axios from 'axios';

import { Expense } from '../types/Expense';

const BaseURL = 'http://localhost:5000/expenses';

type GetAllProps = {
  userId: number | null,
  category: string,
  from: string,
  to: string,
};

export const getExpenses = async({ userId, category, from, to }: GetAllProps) => {
  const data: Expense[] = await axios.get(BaseURL, { params: { userId, category, from, to } })
    .then(response => response.data);

  return data;
};

export const getExpenseById = async(expenseId: number) => {
  const data: Expense = await axios.get(`${BaseURL}/${expenseId}`)
    .then(response => response.data);

  return data;
};

export const removeExpense = async(expenseId: number) => {
  await axios.delete(`${BaseURL}/${expenseId}`);
};

export const addExpense = async(expense: Omit<Expense, 'id'>) => {
  await axios.post(BaseURL, expense)
    .catch(err => {
      throw new Error(err);
    });
};

export const patchExpense = async (id: number, expense: Omit<Expense, 'userId' | 'id'>) => {
  await axios.patch(`${BaseURL}/${id}`, expense);
};
