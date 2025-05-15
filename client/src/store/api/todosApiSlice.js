import apiSlice from './apiSlice.js';
import { handleAuthError } from '../../helpers/util/errorHandling.js';
import {
  wrapToDoResponse,
  wrapToDosResponse,
  wrapErrorResponse,
} from '../../helpers/util/transformers.js';

import {
  setTodoList,
  addToDo,
  updateToDo,
  deleteToDo,
  deleteCompletedToDos,
} from '../features/todos/todos-slice.js';

import { TASKS_URL } from '../../data/constants.js';

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchToDos: builder.query({
      query: () => TASKS_URL,
      transformResponse: wrapToDosResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: todos } = await queryFulfilled;
          dispatch(setTodoList(todos));
        } catch (err) {
          if (err.error?.status === 401) handleAuthError(dispatch);
        }
      },
    }),
    createToDo: builder.mutation({
      query: (todo) => ({
        url: `${TASKS_URL}/new`,
        method: 'POST',
        body: todo,
      }),
      transformResponse: wrapToDoResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: todo } = await queryFulfilled;
          dispatch(addToDo(todo));
        } catch (err) {
          const { error } = err.error;
          if (error?.status === 401) handleAuthError(dispatch);
        }
      },
    }),
    updateToDo: builder.mutation({
      query: ({ id, status }) => ({
        url: `${TASKS_URL}/${id}?completed=${status}`,
        method: 'PUT',
      }),
      transformResponse: wrapToDoResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedToDo } = await queryFulfilled;
          dispatch(
            updateToDo({
              id: updatedToDo.id,
              completed: updatedToDo.completed,
            }),
          );
        } catch (err) {
          if (err.error?.status === 401) handleAuthError(dispatch);
        }
      },
    }),
    deleteToDo: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'DELETE',
      }),
      transformResponse: wrapToDoResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const { data: deletedToDo } = await queryFulfilled;
          dispatch(deleteToDo(deletedToDo));
        } catch (err) {
          if (err.error?.status === 401) handleAuthError(dispatch);
        }
      },
    }),
    deleteCompletedToDos: builder.mutation({
      query: () => ({
        url: `${TASKS_URL}/completed`,
        method: 'DELETE',
      }),
      transformResponse: wrapToDosResponse,
      transformErrorResponse: wrapErrorResponse,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: deletedToDos } = await queryFulfilled;
          dispatch(deleteCompletedToDos(deletedToDos));
        } catch (err) {
          if (err.error?.status === 401) handleAuthError(dispatch);
        }
      },
    }),
  }),
});

export const {
  useFetchToDosQuery,
  useCreateToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
  useDeleteCompletedToDosMutation,
} = todosApiSlice;
