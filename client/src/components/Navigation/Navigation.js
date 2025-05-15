import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FILTER_BUTTONS } from '../../data/constants.js';
import { setFilter, selectFilter } from '../../store/features/ui/ui-slice.js';
import {
  selectActiveCount,
  selectCompletedCount,
  selectTodos,
} from '../../store/features/todos/todos-slice.js';

import './Navigation.scss';
import Card from '../Card/Card.js';
import Button from '../Button/Button.js';

const Navigation = () => {
  const todos = useSelector(selectTodos);
  const activeCount = useSelector(selectActiveCount);
  const completedCount = useSelector(selectCompletedCount);
  const currentFilter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleFilterChange = (term) => {
    dispatch(setFilter(term));
  };

  return (
    <div className='tasks__navigation'>
      <Card>
        <div className='tasks__nav-buttons'>
          {FILTER_BUTTONS.map(({ LABEL, TERM, getCount }) => (
            <Button
              key={TERM}
              id={TERM}
              variant='filter'
              onClick={() => handleFilterChange(TERM)}
              isActive={currentFilter === TERM}
              count={getCount(todos, activeCount, completedCount)}>
              {LABEL}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Navigation;
