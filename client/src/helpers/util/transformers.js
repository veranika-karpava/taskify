const wrapAuthResponse = (response) => ({
  user: response,
});

const wrapErrorResponse = (error) => ({
  status: error?.status,
  message: error?.data?.message || 'An unexpected error occurred.',
});

const wrapToDoResponse = (response) => response?.task;
const wrapToDosResponse = (response) => response?.tasks;

export {
  wrapAuthResponse,
  wrapErrorResponse,
  wrapToDoResponse,
  wrapToDosResponse,
};
