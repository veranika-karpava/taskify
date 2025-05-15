import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectFilter } from '../../store/features/ui/ui-slice.js';
import { selectTodos } from '../../store/features/todos/todos-slice.js';
import {
  useFetchToDosQuery,
  useCreateToDoMutation,
} from '../../store/api/todosApiSlice.js';

import { useForm } from '../../helpers/hooks/FormHook.js';
import {
  VALIDATION_TYPE,
  TASK_INPUT,
  FILTER_TERMS,
  EMPTY_LIST,
} from '../../data/constants.js';

import './TasksPage.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.js';
import Card from '../../components/Card/Card.js';
import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input.js';
import TasksList from '../../components/TasksList/TasksList.js';
import Navigation from '../../components/Navigation/Navigation.js';

const TasksPage = () => {
  const filter = useSelector(selectFilter);
  const todos = useSelector(selectTodos);
  const [createTask] = useCreateToDoMutation();
  const { isLoading, isError, error, isSuccess } = useFetchToDosQuery();

  const [triggerClear, setTriggerClear] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [formState, onInput, resetForm] = useForm(
    { task: { value: '', isValid: false } },
    false,
  );
  const { task = { value: '', isValid: false } } = formState.inputs || {};

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTER_TERMS.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case FILTER_TERMS.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrMessage(null);
    setTriggerClear(false);
    try {
      await createTask({ title: task.value }).unwrap();
      resetForm();
      setTriggerClear(true);
    } catch (err) {
      setErrMessage(err?.message);
    }
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className='tasks__message'>
          <LoadingSpinner />
        </div>
      );
    }

    if (isError) {
      return (
        <div className='tasks__message'>
          <ErrorMessage errorText={error?.message} />
        </div>
      );
    }

    if (isSuccess && filteredTodos?.length === 0) {
      return <div className='tasks__message'>{EMPTY_LIST.TEXT}</div>;
    }

    return <TasksList todos={filteredTodos} />;
  };

  return (
    <section className='tasks'>
      <Card>
        <form className='tasks__form' onSubmit={handleOnSubmit} noValidate>
          <Button
            type='submit'
            variant='update'
            icon='RiAddFill'
            classNameIcon={cn('update', 'icon-add')}
            disabled={!formState.isFormValid}
          />
          <Input
            id={TASK_INPUT.TITLE}
            placeholder={TASK_INPUT.PLACEHOLDER}
            validators={[VALIDATION_TYPE.REQUIRE]}
            onInput={onInput}
            border='noborder'
            clearInput={triggerClear}
            autoFocus
          />
        </form>
        {errMessage && <ErrorMessage errorText={errMessage} variant='new' />}
      </Card>
      <div className='tasks__container'>
        <Card>{renderMainContent()}</Card>
        <Navigation />
      </div>
    </section>
  );
};

export default TasksPage;
