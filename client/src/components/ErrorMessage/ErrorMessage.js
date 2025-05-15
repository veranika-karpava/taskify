import React from 'react';
import cn from 'classnames';

import './ErrorMessage.scss';

//variant - new, update, login, form
const ErrorMessage = ({ errorText, variant }) => {
  return <p className={cn('error-message', variant)}>{errorText}</p>;
};

export default ErrorMessage;
