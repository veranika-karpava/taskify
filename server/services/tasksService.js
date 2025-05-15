const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Task = require('../models/task');

const fetchUser = require('../utils/fetchUser');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc Get tasks list for the authenticated user
// @route GET/tasks
// @access Protected
const getListTasks = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await fetchUser(userId, next);
    if (!user)
      return next(new HttpError(ERROR_MESSAGES.TASK.ADD_TASK_FAIL, 500));

    const tasksList = await Task.find({ owner: user.id })
      .select('_id title completed')
      .sort({ createdAt: -1 });

    if (tasksList && tasksList.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    res.status(200).json({
      tasks: tasksList.map((task) => ({
        id: task._id,
        title: task.title,
        completed: task.completed,
      })),
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return next(new HttpError(ERROR_MESSAGES.TASK.FETCH_TASK, 500));
  }
};

// @desc Get tasks list for the authenticated user
// @route POST/tasks/new
// @access Protected
const addNewTask = async (req, res, next) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title || title.trim() === '') {
    return next(new HttpError(ERROR_MESSAGES.TASK.REQUIRED_TASK, 422));
  }

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const user = await fetchUser(userId, next);

    if (!user) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 403));
    }

    const [newTask] = await Task.create(
      [
        {
          title,
          completed: false,
          owner: user.id,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    res.status(201).json({
      message: ERROR_MESSAGES.TASK.ADD_TASK_SUCCESS,
      task: {
        id: newTask._id,
        title: newTask.title,
        completed: newTask.completed,
      },
    });
  } catch (err) {
    console.error('Error adding new task:', err);
    if (session) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.TASK.ADD_TASK_FAIL, 500));
    }
  } finally {
    if (session) session.endSession();
  }
};

// @desc Update the status of a task by ID
// @route PUT/tasks/:tid?
// @access Protected
const updateStatusTask = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.tid;
  const isCompleted = req.query.completed;

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const task = await Task.findById(taskId)
      .select('_id title completed owner')
      .session(session);

    if (!task) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.TASK.NO_TASK, 404));
    }

    if (task.owner.toString() !== userId) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 403));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      { completed: isCompleted },
      { new: true, session },
    );

    await session.commitTransaction();

    res.status(200).json({
      message: ERROR_MESSAGES.TASK.UPDATE_TASK_SUCCESS,
      task: {
        id: updatedTask._id,
        title: updatedTask.title,
        completed: updatedTask.completed,
      },
    });
  } catch (err) {
    console.error('Error updating task status:', err);
    if (session) await session.abortTransaction();
    return next(new HttpError(ERROR_MESSAGES.TASK.UPDATE_TASK_FAIL, 500));
  } finally {
    if (session) session.endSession();
  }
};

// @desc Delete a task by ID
// @route DELETE/tasks/:tid
// @access Protected
const deleteTaskById = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.tid;

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const user = await fetchUser(userId, next);

    if (!user) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 403));
    }

    const deletedTask = await Task.findByIdAndDelete(
      { _id: taskId, owner: user.id },
      { session },
    );

    if (!deletedTask) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.TASK.NO_TASK, 404));
    }

    await session.commitTransaction();

    res.status(200).json({
      message: ERROR_MESSAGES.TASK.DELETE_TASK_SUCCESS,
      task: {
        id: deletedTask._id,
        title: deletedTask.title,
        completed: deletedTask.completed,
      },
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    if (session) await session.abortTransaction();
    return next(new HttpError(ERROR_MESSAGES.TASK.DELETE_TASK_FAIL, 500));
  } finally {
    if (session) session.endSession();
  }
};

// @desc Delete all completed tasks for the authenticated user
// @route DELETE/tasks/completed
// @access Protected
const deleteAllCompletedTasks = async (req, res, next) => {
  const userId = req.user.id;

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const user = await fetchUser(userId, next);

    if (!user) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND_ID, 403));
    }

    const tasksToDelete = await Task.find({
      completed: true,
      owner: user.id,
    })
      .select('_id title completed')
      .session(session);

    if (tasksToDelete && tasksToDelete.length === 0) {
      await session.abortTransaction();
      return next(new HttpError(ERROR_MESSAGES.TASK.COMPLETED_TASKS, 404));
    }

    // Delete all completed tasks
    const deletedCount = await Task.deleteMany(
      { completed: true, owner: user.id },
      { session },
    );

    await session.commitTransaction();

    res.status(200).json({
      message: `${deletedCount.deletedCount} ${ERROR_MESSAGES.TASK.COUNT_TEXT}`,
      tasks: tasksToDelete.map((task) => ({
        id: task._id,
        title: task.title,
        completed: task.completed,
      })),
    });
  } catch (err) {
    console.error('Error deleting completed tasks:', err);
    if (session) await session.abortTransaction();
    return next(new HttpError(ERROR_MESSAGES.TASK.DELETE_COMPLETED, 500));
  } finally {
    if (session) session.endSession();
  }
};
module.exports = {
  getListTasks,
  addNewTask,
  updateStatusTask,
  deleteTaskById,
  deleteAllCompletedTasks,
};
