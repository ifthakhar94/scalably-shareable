import { User } from '@/interfaces/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeLoginData: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setLoginData, removeLoginData } = authSlice.actions;

export default authSlice.reducer;