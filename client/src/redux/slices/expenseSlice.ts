import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getExpenses } from '../../api/expenses';

import { IExpense } from '../../types/Expense.interface';
import { EStatus } from '../../types/Status.enum';

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async () => {
    const response = await getExpenses();

    return response;
  },
);

type TExpenseState = {
  expenses: IExpense[],
  currentExpenseId: number | null;
  status: EStatus,
};

const initialState: TExpenseState = {
  expenses: [],
  currentExpenseId: null,
  status: EStatus.IDLE,
}

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setCurrentExpenseId: (
      state,
      action: { type: string, payload: number | null },
    ) => {
      state.currentExpenseId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.status = EStatus.SUCCESS;
      })
      .addCase(fetchExpenses.pending, state => {
        state.status = EStatus.PENDING;
      })
      .addCase(fetchExpenses.rejected, state => {
        state.status = EStatus.ERROR;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { setCurrentExpenseId } = expenseSlice.actions;
export default expenseSlice.reducer;
