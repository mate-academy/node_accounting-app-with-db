import axios from 'axios';

import { IExpense } from '../types/Expense.interface';

const BaseURL = 'https://node-accounting-app-with-db.onrender.com/expenses';

export const getExpenses = async () => {
  const data: IExpense[] = await axios.get(BaseURL)
    .then(response => response.data);

  return data;
};

export const getExpenseById = async (expenseId: number) => {
  const data: IExpense = await axios.get(`${BaseURL}/${expenseId}`)
    .then(response => response.data);

  return data;
};

export const removeExpense = async (expenseId: number) => {
  await axios.delete(`${BaseURL}/${expenseId}`);
};

export const addExpense = async (expense: Omit<IExpense, 'id'>) => {
  await axios.post(BaseURL, expense);
};

export const patchExpense = async (expense: IExpense) => {
  await axios.patch(`${BaseURL}/${expense.id}`, expense);
};

