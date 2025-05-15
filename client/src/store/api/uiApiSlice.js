import apiSlice from './apiSlice.js';

import { QUOTE_URL } from '../../data/constants.js';

export const uiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuote: builder.query({
      query: () => QUOTE_URL,
    }),
  }),
});

export const { useFetchQuoteQuery } = uiApiSlice;
