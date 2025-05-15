import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectTheme } from '../../store/features/ui/ui-slice.js';
import './Button.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon.js';

const Button = ({
  children,
  classNameIcon,
  disabled = false,
  icon,
  isActive = false,
  variant = 'filled', // filled, text, visible, round, filter, delete, update
  type = 'button',
  count,
  ...props
}) => {
  const theme = useSelector(selectTheme);

  const iconElement = icon && (
    <DynamicIcon name={icon} className={cn('button', classNameIcon)} />
  );

  const renderCount = count >= 0 && (
    <span className='button__count'>{count}</span>
  );

  const buttonClasses = cn(
    'button',
    { [theme]: theme },
    { active: isActive },
    variant,
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}>
      {children}
      {iconElement}
      {renderCount}
    </button>
  );
};

export default Button;
