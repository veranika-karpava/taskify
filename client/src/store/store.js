import { configureStore } from '@reduxjs/toolkit';

import apiSlice from './api/apiSlice.js';
import uiReducer from './features/ui/ui-slice.js';
import authReducer from './features/auth/auth-slice.js';
import todosReducer from './features/todos/todos-slice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    auth: authReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
