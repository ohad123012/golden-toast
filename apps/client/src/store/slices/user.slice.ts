import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserType } from '../types';

interface userState {
  value: UserType | null;
}

const initialState: userState = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
