import axios from 'axios';

import { IExpense } from '../types/IExpense';

export const getExpenses = async () => {
  const data: IExpense[] = await axios.get(
    'http://localhost:5000/expenses'
  ).then(response => response.data);

  return data;
};
