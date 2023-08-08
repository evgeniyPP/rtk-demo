import { createSlice } from '@reduxjs/toolkit';

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
});

export const { increment, decrement } = slice.actions;

export default slice.reducer;
