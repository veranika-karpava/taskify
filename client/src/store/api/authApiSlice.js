import apiSlice from './apiSlice.js';
import { setCredentials } from '../features/auth/auth-slice.js';

import { AUTH_URL } from '../../data/constants.js';
import { handleAuthError } from '../../helpers/util/errorHandling.js';
import {
  wrapAuthResponse,
  wrapErrorResponse,
} from '../../helpers/util/transformers.js';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => `${AUTH_URL}/check`,
      transformResponse: wrapAuthResponse,
      transformErrorResponse: wrapErrorResponse,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: wrapAuthResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          handleAuthError(dispatch);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: wrapAuthResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          handleAuthError(dispatch);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          handleAuthError(dispatch);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApiSlice;
