const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND:
      'No user found with the provided email. Please verify and try again.',
    INVALID_PASSWORD: 'Invalid password. Please try again.',
    DUPLICATE_USERNAME:
      'This username is already in use. Please choose another.',
    DUPLICATE_EMAIL:
      'This email is already registered. Please log in or use a different email.',
    SIGNUP_FAILED: 'An error occurred during signup. Please try again later.',
    LOGIN_FAILED:
      'Login failed. Please check your email or password and try again.',
    LOGOUT_SUCCESS: 'You have been logged out successfully.',
    LOGOUT_FAILED: 'Logout failed. Please try again.',
    NOT_FOUND_ID: 'No user found with the provided ID.',
  },
  TOKEN: {
    NO_TOKEN: 'Authorization failed: No token provided.',
    TOKEN_FAILED:
      'Authorization failed: Token is invalid or expired. Please log in again.',
    NO_CONTENT: 'Authorization failed: Token is missing.',
    VALIDATION: 'User ID and email are required to generate a valid token.',
    GEN_TOKEN: 'Failed to generate JWT.',
  },
  VALIDATION: {
    REQUIRED_FIELDS: 'All required fields must be completed.',
  },
  TASK: {
    EMPTY: 'Your task list is empty.',
    FETCH_TASK: 'Unable to fetch tasks at the moment. Please try again later.',
    REQUIRED_TASK: 'A title is required to create a new task.',
    ADD_TASK_FAIL: 'Failed to add the task. Please try again.',
    ADD_TASK_SUCCESS: 'Task added successfully.',
    NO_TASK: 'No task found with the provided ID. Please verify and try again.',
    UPDATE_TASK_FAIL: 'Failed to update the task. Please try again.',
    UPDATE_TASK_SUCCESS: 'Task updated successfully.',
    DELETE_TASK_FAIL: 'Failed to delete the task. Please try again.',
    DELETE_TASK_SUCCESS: 'Task deleted successfully.',
    COMPLETED_TASKS: 'No completed tasks found.',
    COUNT_TEXT: ' task(s) deleted successfully.',
    DELETE_COMPLETED: 'Failed to delete completed tasks. Please try again.',
  },
  SERVER: {
    ROUTE_NOT_FOUND:
      'The requested page does not exist. Please check the URL and try again.',
  },
};

module.exports = ERROR_MESSAGES;
