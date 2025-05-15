import { VALIDATION_TYPE } from '../../data/constants.js';

export const validateInput = (value, validators) => {
  // If validators is not an array, return false by default
  if (!Array.isArray(validators)) {
    return false;
  }

  const stringValue = (value ?? '').toString();

  let isValid = true;

  for (const validator of validators) {
    switch (validator) {
      case VALIDATION_TYPE.REQUIRE:
        isValid = isValid && stringValue.trim().length > 0;
        break;
      case VALIDATION_TYPE.EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(stringValue);
        break;
      case VALIDATION_TYPE.PASSWORD:
        isValid =
          isValid &&
          stringValue.length >= 8 && // has a minimum length of 8 characters
          /[a-zA-Z]/.test(stringValue) && // contains at least one letter
          /[0-9]{1,2}/.test(stringValue); // contains a number from 0 to 99
        break;
      default:
        break;
    }
  }

  return isValid;
};
