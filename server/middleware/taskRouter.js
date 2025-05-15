const express = require('express');

const {
  getListTasks,
  addNewTask,
  updateStatusTask,
  deleteTaskById,
  deleteAllCompletedTasks,
} = require('../services/tasksService');

const protect = require('../middleware/AuthMiddleware');

const taskRouter = express.Router();

// Apply authentication middleware to all routes in task router
taskRouter.use(protect);

// Get a list of tasks for the authenticated user
// @access Protected
taskRouter.get('/', getListTasks);

// Add a new task to the authenticated user's task list
// @access Protected
taskRouter.post('/new', addNewTask);

// Update the status of a task by specified ID
// @access Protected
taskRouter.put('/:tid([a-fA-F0-9]{24})?', updateStatusTask);

// Delete all completed tasks for the authenticated user
// @access Protected
taskRouter.delete('/completed', deleteAllCompletedTasks);

// Delete a task by specified ID
// @access Protected
taskRouter.delete('/:tid([a-fA-F0-9]{24})', deleteTaskById);

module.exports = taskRouter;
