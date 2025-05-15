import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.tasks = Array.isArray(action.payload) ? action.payload : [];
    },
    addToDo: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateToDo: (state, action) => {
      const { id, completed } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: completed };
        }
        return task;
      });
    },
    deleteToDo: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    deleteCompletedToDos: (state, action) => {
      const deletedTasks = action.payload;
      state.tasks = state.tasks.filter(
        (task) => !deletedTasks.some((del) => del.id === task.id),
      );
    },
  },
});

// Actions
export const {
  setTodoList,
  addToDo,
  updateToDo,
  deleteToDo,
  deleteCompletedToDos,
} = todosSlice.actions;

// Selectors
export const selectActiveCount = (state) =>
  state.todos.tasks.filter((task) => !task.completed).length;
export const selectCompletedCount = (state) =>
  state.todos.tasks.filter((task) => task.completed).length;
export const selectTodos = (state) => state.todos.tasks;

// Reducer
export default todosSlice.reducer;
