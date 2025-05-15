import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuth: false,
  checkAuthSkipped: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
      state.checkAuthSkipped = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.checkAuthSkipped = true;
    },
  },
});

// Actions
export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectCheckAuthSkipped = (state) => state.auth.checkAuthSkipped;

//Reducer
export default authSlice.reducer;
