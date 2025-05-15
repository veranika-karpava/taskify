import apiSlice from '../../store/api/apiSlice.js';
import { logout } from '../../store/features/auth/auth-slice.js';
export const handleAuthError = (dispatch) => {
  dispatch(logout());
  dispatch(apiSlice.util.resetApiState());
};
