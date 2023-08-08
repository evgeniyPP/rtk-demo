import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models';

type State = {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
};

const initialState: State = {
  users: [],
  selectedUser: null,
  isLoading: false,
};

export const getUsers = createAsyncThunk('users/getUsers', async (_payload, thunkAPI) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data as User[];
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, { payload }: PayloadAction<number>) {
      const user = state.users.find(u => u.id === payload);

      if (!user) {
        throw new Error('Selecting a user, but user id does not exist');
      }

      state.selectedUser = user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload ?? [];
      })
      .addCase(getUsers.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { selectUser } = slice.actions;

export default slice.reducer;
