import { createSlice } from '@reduxjs/toolkit';

type TModalVariant = 'new' | 'edit' | null;

type TModalState = {
  variant: TModalVariant,
};

const initialState: TModalState = {
  variant: null,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (
      state,
      action: { type: string, payload: TModalState },
    ) => {
      state.variant = action.payload.variant;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
