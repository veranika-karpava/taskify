import { createSlice } from '@reduxjs/toolkit';

import { THEME_MODE, FILTER_TERMS } from '../../../data/constants.js';

const initialState = { theme: THEME_MODE.LIGHT, filter: FILTER_TERMS.ALL };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Actions
export const { setTheme, setFilter } = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectFilter = (state) => state.ui.filter;

// Reducer
export default uiSlice.reducer;
