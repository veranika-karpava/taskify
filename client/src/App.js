import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { handleAuthError } from './helpers/util/errorHandling.js';
import { useCheckAuthQuery } from './store/api/authApiSlice.js';
import {
  setCredentials,
  selectCheckAuthSkipped,
} from './store/features/auth/auth-slice.js';
import { selectTheme } from './store/features/ui/ui-slice.js';

import { THEME_MODE } from './data/constants.js';

import Layout from './components/Layout/Layout.js';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.js';
import ProtectLayout from './components/ProtectLayout/ProtectLayout.js';
import HomePage from './pages/HomePage/HomePage.js';
import TaskPage from './pages/TasksPage/TasksPage.js';

import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectLayout />,
        children: [{ path: '/tasks', element: <TaskPage /> }],
      },
    ],
  },
]);
const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const checkAuthSkipped = useSelector(selectCheckAuthSkipped);

  const { data, isLoading, isError, isSuccess } = useCheckAuthQuery(undefined, {
    skip: checkAuthSkipped,
  });

  useEffect(() => {
    document.body.classList.remove(THEME_MODE.LIGHT, THEME_MODE.DARK);
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCredentials(data.user));
    } else if (isError) {
      handleAuthError(dispatch);
    }
  }, [data, isSuccess, isError]);

  if (isLoading)
    return (
      <div className='app__loading'>
        <LoadingSpinner />
      </div>
    );

  return <RouterProvider router={router} />;
};

export default App;
