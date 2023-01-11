import axios from 'axios';
import { BASE_URL } from '../constants';

const ExpensesBaseUrl = BASE_URL + '/expenses'

type GetAllProps = {
  userId: number | null,
  category: string,
  from: string,
  to: string,
};

export const getExpenses = async({ userId, category, from, to }: GetAllProps) => {
  try {
    const response = await axios.get(ExpensesBaseUrl, { params: { userId, category, from, to } })

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getExpenseById = async(expenseId: number) => {
  try {
    const response = await axios.get(`${ExpensesBaseUrl}/${expenseId}`)

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const removeExpense = async(expenseId: number) => {
  try {
    await axios.delete(`${ExpensesBaseUrl}/${expenseId}`);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const addExpense = async(expense: Omit<Expense, 'id'>) => {
  try {
    await axios.post(ExpensesBaseUrl, expense)
  } catch (err: any) {
    throw new Error(err);
  }
};

export const patchExpense = async(
  id: number,
  expense: Omit<Expense, 'userId' | 'id'>
) => {
  try {
    await axios.patch(`${ExpensesBaseUrl}/${id}`, expense);
  } catch (err: any) {
    throw new Error(err);
  }
};
