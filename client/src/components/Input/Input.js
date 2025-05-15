import React, { useReducer, useEffect, useState } from 'react';
import cn from 'classnames';

import { inputReducer } from '../../helpers/util/inputReducer.js';

import './Input.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import Button from '../Button/Button.js';

const Input = ({
  id,
  type = 'text',
  border = 'border', // border, noborder
  placeholder,
  validators,
  errorText,
  onInput,
  clearInput,
}) => {
  const [inputType, setInputType] = useState(type);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const handleInputChange = (e) =>
    dispatch({ type: 'CHANGE', value: e.target.value, validators: validators });

  const handleBlur = () => dispatch({ type: 'TOUCH' });

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  useEffect(() => {
    if (clearInput) {
      dispatch({ type: 'CLEAR' });
    }
  }, [clearInput]);

  const isPassword = inputType === 'password';

  const passwordIcon = isPassword
    ? 'MdOutlineVisibilityOff'
    : 'MdOutlineVisibility';

  const baseProps = {
    id,
    placeholder,
    value: inputState.value,
    autoComplete: 'off',
    className: 'form__field-input',
    onChange: handleInputChange,
    onBlur: handleBlur,
    'aria-invalid': !inputState.isValid,
  };

  return (
    <div className={cn('form__field', { [border]: border })}>
      <label className='form__field-label' htmlFor={id}>
        <input {...baseProps} type={inputType} />
        {type === 'password' && (
          <Button
            variant='visible'
            onClick={togglePasswordVisibility}
            icon={passwordIcon}
            classNameIcon={cn('visible', 'icon-visible')}
          />
        )}
      </label>
      {!inputState.isValid && inputState.isTouched && (
        <ErrorMessage errorText={errorText} variant='form' />
      )}
    </div>
  );
};

export default Input;
