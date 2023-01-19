import axios from 'axios';
import { BASE_URL } from '../constants';

const ExpensesBaseUrl = BASE_URL + '/expenses'

type GetExpensesOptions = {
  userId: string,
  category: string,
  from: string,
  to: string,
};

export const getExpenses = async(
    { userId, category, from, to }: GetExpensesOptions
): Promise<Expense[]> => {
  const response = await axios
    .get(ExpensesBaseUrl, { params: { userId, category, from, to } });

  return response.data;
};

export const getExpenseById = async(expenseId: string): Promise<Expense> => {
  const response = await axios.get(`${ExpensesBaseUrl}/${expenseId}`);

  return response.data;
};

export const removeExpense = async(expenseId: string): Promise<void> => {
  await axios.delete(`${ExpensesBaseUrl}/${expenseId}`);
};

export const addExpense = async(
  expense: Omit<Expense, 'id'>
): Promise<void> => {
  await axios.post(ExpensesBaseUrl, expense)
};

export const patchExpense = async(
  id: string,
  expense: Omit<Expense, 'userId' | 'id'>
): Promise<void> => {
  await axios.patch(`${ExpensesBaseUrl}/${id}`, expense);
};
