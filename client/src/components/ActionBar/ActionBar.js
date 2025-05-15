import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  ITEMS_LEFT,
  BUTTON_LABELS,
  FILTER_TERMS,
} from '../../data/constants.js';
import { selectFilter } from '../../store/features/ui/ui-slice.js';
import {
  selectActiveCount,
  selectCompletedCount,
} from '../../store/features/todos/todos-slice.js';
import { useDeleteCompletedToDosMutation } from '../../store/api/todosApiSlice.js';

import './ActionBar.scss';
import Button from '../Button/Button.js';

const ActionBar = () => {
  const activeToDosCount = useSelector(selectActiveCount);
  const completedToDosCount = useSelector(selectCompletedCount);
  const currentFilter = useSelector(selectFilter);
  const [deleteCompletedToDos] = useDeleteCompletedToDosMutation();

  // eslint-disable-next-line no-unused-vars
  const [errMessage, setErrMessage] = useState(null);

  const handleDeleteCompleted = async () => {
    setErrMessage(null);

    try {
      await deleteCompletedToDos().unwrap();
    } catch (err) {
      setErrMessage(err?.message);
    }
  };

  return (
    <div className='action-bar'>
      {currentFilter !== FILTER_TERMS.COMPLETED && (
        <p className='action-bar__count'>
          {`${activeToDosCount} ${ITEMS_LEFT.TEXT}`}
        </p>
      )}
      {currentFilter !== FILTER_TERMS.ACTIVE && completedToDosCount > 0 && (
        <Button variant='filter' onClick={handleDeleteCompleted}>
          {BUTTON_LABELS.CLEAR}
        </Button>
      )}
    </div>
  );
};

export default ActionBar;
