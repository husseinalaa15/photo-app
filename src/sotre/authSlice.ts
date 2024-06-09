// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      sessionStorage.removeItem('user');
    },
    loadUser(state) {
      const user = sessionStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
      return state;
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
