import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import expensesSlice from '../redux/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
