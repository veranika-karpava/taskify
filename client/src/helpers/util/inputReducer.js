import { validateInput } from '../util/validators.js';

export const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validateInput(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    case 'CLEAR':
      return {
        value: '',
        isValid: false,
        isTouched: false,
      };
    default:
      return state;
  }
};
