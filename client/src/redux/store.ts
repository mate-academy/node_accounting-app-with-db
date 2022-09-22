import { configureStore } from '@reduxjs/toolkit';

import expenseReducer from './slices/expenseSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    modal: modalReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
