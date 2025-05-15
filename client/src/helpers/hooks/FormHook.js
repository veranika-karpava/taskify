import { useState, useCallback } from 'react';

export const useForm = (initialInputs = {}, initialFormValidity = false) => {
  const [formState, setFormState] = useState({
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const onInput = useCallback((id, value, isValid) => {
    setFormState((prev) => {
      const updatedInputs = {
        ...prev.inputs,
        [id]: { value, isValid },
      };

      const isFormValid = Object.values(updatedInputs).every(
        (input) => input && input.isValid,
      );

      return {
        ...prev,
        inputs: updatedInputs,
        isFormValid,
      };
    });
  }, []);

  const setForm = useCallback((inputs, isFormValid) => {
    setFormState({ inputs, isFormValid });
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      inputs: initialInputs,
      isFormValid: initialFormValidity,
    });
  }, [initialInputs, initialFormValidity]);

  return [formState, onInput, setForm, resetForm];
};
