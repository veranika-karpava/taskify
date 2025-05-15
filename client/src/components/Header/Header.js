import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { THEME_MODE, HEADER_TITLE } from '../../data/constants.js';

import { setTheme, selectTheme } from '../../store/features/ui/ui-slice.js';
import {
  selectIsAuth,
  selectCurrentUser,
} from '../../store/features/auth/auth-slice.js';
import { useLogoutMutation } from '../../store/api/authApiSlice.js';
import { useFetchQuoteQuery } from '../../store/api/uiApiSlice.js';

import './Header.scss';
import Button from '../Button/Button.js';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector(selectTheme);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectCurrentUser);

  const [logout] = useLogoutMutation();
  const { data: quote, isSuccess: isSuccessQuote } = useFetchQuoteQuery(
    undefined,
    { skip: !isAuth },
  );

  const handleToggleTheme = () => {
    dispatch(
      setTheme(theme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT),
    );
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const userGreeting = useMemo(
    () =>
      isAuth && user
        ? `${HEADER_TITLE.LOGIN}${user.userName}`
        : HEADER_TITLE.SIGNUP,
    [isAuth, user?.userName],
  );

  const iconButton = useMemo(
    () => (theme === THEME_MODE.LIGHT ? 'BsSunFill' : 'FaMoon'),
    [theme],
  );

  return (
    <header className='header'>
      <div className='header__nav'>
        <Button
          variant='round'
          classNameIcon='icon-inside'
          icon={iconButton}
          onClick={handleToggleTheme}
        />
        {isAuth && (
          <Button
            onClick={handleLogout}
            variant='round'
            icon='BiExit'
            classNameIcon='icon-inside'
          />
        )}
      </div>
      <div className='header__body'>
        <h1 className='header__heading'>{userGreeting}</h1>
        {isAuth && isSuccessQuote && quote ? (
          <blockquote className='header__quote'>
            <p className='header__quote-text'>{quote.text}</p>
            <footer className='header__quote-author'>{`— ${quote.author}`}</footer>
          </blockquote>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
