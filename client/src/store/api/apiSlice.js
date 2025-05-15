import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../data/constants.js';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Task', 'UI'],
  endpoints: () => ({}),
});

export default apiSlice;
