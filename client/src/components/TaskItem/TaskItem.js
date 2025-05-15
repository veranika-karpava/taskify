import React, { useState } from 'react';
import cn from 'classnames';

import {
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} from '../../store/api/todosApiSlice.js';

import './TaskItem.scss';
import Button from '../Button/Button.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

const TaskItem = ({ task }) => {
  const { id, title, completed } = task;
  const [errMessage, setErrMessage] = useState(null);

  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  const handleToggleStatus = async () => {
    setErrMessage(null);
    try {
      await updateToDo({ id, status: !completed }).unwrap();
    } catch (err) {
      setErrMessage(err?.message);
    }
  };

  const handleOnDelete = async () => {
    setErrMessage(null);
    try {
      await deleteToDo(id).unwrap();
    } catch (err) {
      setErrMessage(err?.message);
    }
  };

  return (
    <li className='tasks__item'>
      <div className='tasks__item-container'>
        <Button
          variant='update'
          onClick={handleToggleStatus}
          icon={completed && 'AiOutlineCheck'}
          classNameIcon={cn('update', { 'icon-update': completed })}
        />
        <p className={cn('tasks__item-content', { completed: completed })}>
          {title}
        </p>
        {!completed && (
          <Button
            variant='delete'
            onClick={handleOnDelete}
            icon='RxCross2'
            classNameIcon={cn('delete', 'icon-cross')}
          />
        )}
      </div>
      {errMessage && <ErrorMessage errorText={errMessage} variant='update' />}
    </li>
  );
};

export default TaskItem;
