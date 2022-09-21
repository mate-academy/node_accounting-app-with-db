import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
