import React from 'react';

import './TasksList.scss';
import ActionBar from '../ActionBar/ActionBar.js';
import TaskItem from '../TaskItem/TaskItem.js';

const TasksList = ({ todos }) => {
  return (
    <>
      <ul className='tasks__list'>
        {todos.map((todo) => {
          return <TaskItem key={todo.id} task={todo} />;
        })}
      </ul>
      <ActionBar />
    </>
  );
};

export default TasksList;
