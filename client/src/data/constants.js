// === VALIDATION CONSTANTS ===
const VALIDATION_TYPE = {
  REQUIRE: 'REQUIRE',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
};

// === UI CONSTANTS ===
const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
};

const BUTTON_LABELS = {
  LOGIN: 'Log In',
  SIGNUP: 'Sign Up',
  CLEAR: 'Clear Completed',
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const HEADER_TITLE = {
  LOGIN: 'Welcome, ',
  SIGNUP: 'Taskify',
};

const FILTER_TERMS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const FILTER_BUTTONS = [
  {
    LABEL: BUTTON_LABELS.ALL,
    TERM: FILTER_TERMS.ALL,
    // eslint-disable-next-line no-unused-vars
    getCount: (todos, active, completed) => todos.length,
  },
  {
    LABEL: BUTTON_LABELS.ACTIVE,
    TERM: FILTER_TERMS.ACTIVE,
    // eslint-disable-next-line no-unused-vars
    getCount: (todos, active, completed) => active,
  },
  {
    LABEL: BUTTON_LABELS.COMPLETED,
    TERM: FILTER_TERMS.COMPLETED,
    getCount: (todos, active, completed) => completed,
  },
];

const FOOTER_TITLE = {
  RIGHT: 'Created with',
  LEFT: 'by Veranika Karpava © 2025',
};

// === AUTH CONSTANTS ===
const AUTH_MODE = {
  LOGIN: 'Log In',
  SIGNUP: 'Sign Up',
};

const AUTH_TITLE = {
  LOGIN: 'Welcome Back',
  SIGNUP: 'Welcome to Taskify',
};

const AUTH_TEXT = {
  LOGIN: 'Already have an account?',
  SIGNUP: 'Not registered yet?',
};

const AUTH_INPUT = {
  USERNAME: 'Username',
  EMAIL: 'Email',
  PASSWORD: 'Password',
};

const AUTH_ERROR_TEXT = {
  USERNAME: 'Username is required.',
  EMAIL: 'Enter a valid email address (e.g., user@example.com).',
  PASSWORD:
    'Password must be at least 8 characters long and include a letter and a number.',
};

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = '/user';
const TASKS_URL = '/tasks';
const QUOTE_URL = '/quote';

// === TASKS ===
const TASK_INPUT = {
  TITLE: 'task',
  PLACEHOLDER: 'Add a new task...',
};

const EMPTY_LIST = {
  TEXT: 'No tasks yet.',
};

const ITEMS_LEFT = {
  TEXT: 'items left',
};

export {
  VALIDATION_TYPE,
  THEME_MODE,
  BUTTON_LABELS,
  HEADER_TITLE,
  FOOTER_TITLE,
  AUTH_MODE,
  AUTH_TITLE,
  AUTH_TEXT,
  AUTH_INPUT,
  AUTH_ERROR_TEXT,
  TASK_INPUT,
  EMPTY_LIST,
  ITEMS_LEFT,
  FILTER_TERMS,
  FILTER_BUTTONS,
  BASE_URL,
  AUTH_URL,
  TASKS_URL,
  QUOTE_URL,
};
