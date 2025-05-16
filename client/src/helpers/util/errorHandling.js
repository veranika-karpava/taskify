import apiSlice from '../../store/api/apiSlice.js';
import { logout } from '../../store/features/auth/auth-slice.js';
import { setFilter } from '../../store/features/ui/ui-slice.js';

import { FILTER_TERMS } from '../../data/constants.js';
export const handleAuthError = (dispatch) => {
  dispatch(logout());
  dispatch(setFilter(FILTER_TERMS.ALL));
  dispatch(apiSlice.util.resetApiState());
};
