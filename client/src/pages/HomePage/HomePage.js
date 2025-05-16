import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  VALIDATION_TYPE,
  AUTH_MODE,
  AUTH_TITLE,
  AUTH_TEXT,
  AUTH_INPUT,
  AUTH_ERROR_TEXT,
} from '../../data/constants.js';
import { useForm } from '../../helpers/hooks/FormHook.js';
import {
  useLoginMutation,
  useSignupMutation,
} from '../../store/api/authApiSlice.js';
import { selectIsAuth } from '../../store/features/auth/auth-slice.js';

import './HomePage.scss';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Card from '../../components/Card/Card.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.js';

const HomePage = () => {
  const isAuth = useSelector(selectIsAuth);
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [formState, onInput, setForm, resetForm] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const navigate = useNavigate();

  const { inputs } = formState;
  const { email, password, username } = inputs;

  useEffect(() => {
    if (isAuth) {
      navigate('/mytasks');
    }
  }, [isAuth]);

  const toggleAuthMode = useCallback(() => {
    if (isLoginMode) {
      // Switching from Login → Signup
      setForm(
        { ...inputs, username: { value: '', isValid: false } },
        email.isValid && password.isValid && false,
      );
    } else {
      // Switching from Signup → Login
      // eslint-disable-next-line no-unused-vars
      const { username, ...loginInputs } = inputs;

      setForm(
        loginInputs,
        loginInputs.email.isValid && loginInputs.password.isValid,
      );
    }

    setIsLoginMode((prev) => !prev);
    setErrMessage(null);
  }, [isLoginMode, inputs, setForm]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        await login({ email: email.value, password: password.value }).unwrap();
      } else {
        await signup({
          email: email.value,
          password: password.value,
          username: username.value,
        }).unwrap();
      }
      resetForm();
      navigate('/mytasks');
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  const authTitle = isLoginMode ? AUTH_TITLE.LOGIN : AUTH_TITLE.SIGNUP;
  const authModeLabel = isLoginMode ? AUTH_MODE.LOGIN : AUTH_MODE.SIGNUP;
  const authSwitchText = isLoginMode ? AUTH_TEXT.SIGNUP : AUTH_TEXT.LOGIN;
  const authSwitchButtonLabel = isLoginMode
    ? AUTH_MODE.SIGNUP
    : AUTH_MODE.LOGIN;

  return (
    <section className='auth'>
      <Card>
        <div className='auth__header'>
          <h2 className='auth__title'>{authTitle}</h2>
          {errMessage && (
            <ErrorMessage errorText={errMessage} variant='login' />
          )}
        </div>
        <form className='auth__form' onSubmit={handleFormSubmit} noValidate>
          {!isLoginMode && (
            <Input
              id={AUTH_INPUT.USERNAME.toLowerCase()}
              placeholder={AUTH_INPUT.USERNAME}
              errorText={AUTH_ERROR_TEXT.USERNAME}
              validators={[VALIDATION_TYPE.REQUIRE]}
              onInput={onInput}
            />
          )}
          <Input
            id={AUTH_INPUT.EMAIL.toLowerCase()}
            type='email'
            placeholder={AUTH_INPUT.EMAIL}
            errorText={AUTH_ERROR_TEXT.EMAIL}
            validators={[VALIDATION_TYPE.EMAIL]}
            onInput={onInput}
          />
          <Input
            id={AUTH_INPUT.PASSWORD.toLowerCase()}
            type='password'
            placeholder={AUTH_INPUT.PASSWORD}
            errorText={AUTH_ERROR_TEXT.PASSWORD}
            validators={[VALIDATION_TYPE.PASSWORD]}
            onInput={onInput}
          />
          <div className='auth__btn-container'>
            <Button
              variant='filled'
              type='submit'
              disabled={!formState.isFormValid}>
              {authModeLabel}
            </Button>
          </div>
        </form>
        <div className='auth__footer'>
          <span>{authSwitchText}</span>
          <Button onClick={toggleAuthMode} variant='text'>
            {authSwitchButtonLabel}
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
