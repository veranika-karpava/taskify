import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../store/features/auth/auth-slice.js';

const ProtectLayout = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectLayout;
