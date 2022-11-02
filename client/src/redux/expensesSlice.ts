import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExpenses } from '../api/Expenses';
import { Expense } from '../types/Expense';

export type ExpensesState = {
  items: Expense[];
  loading: boolean;
  error: string;
};

export const init = createAsyncThunk('Expenses/fetchExpenses', () => {
  return getExpenses().then((res) => res);
});

const initialState: ExpensesState = {
  items: [],
  loading: false,
  error: '',
};

export const ExpensesSlice = createSlice({
  name: 'Expenses',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Expense>) {
      state.items.unshift(action.payload);
    },
    edit(state, action: PayloadAction<Expense>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      state.items.push(action.payload);
    },
    deleteExpense(state, action: PayloadAction<Expense>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Expense[]>) => {
        state.items = [...action.payload];
        state.loading = false;
      }
    );
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.error = 'Unable to load data';
      state.loading = false;
    });
  },
});

export const { add, edit, deleteExpense } = ExpensesSlice.actions;

export default ExpensesSlice.reducer;
