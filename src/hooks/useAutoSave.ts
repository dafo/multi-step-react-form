import { useEffect } from 'react';
import { useFormState } from '../context/FormContext';

const STORAGE_KEY = 'ethics-form-autosave';

export function useAutoSave() {
  const { formData, currentStep, completedSteps } = useFormState();

  useEffect(() => {
    const dataToSave = {
      formData,
      currentStep,
      completedSteps: Array.from(completedSteps),
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData, currentStep, completedSteps]);
}

export function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      formData: Record<string, unknown>;
      currentStep: number;
      completedSteps: number[];
      savedAt: string;
    };
  } catch {
    return null;
  }
}

export function clearSavedData() {
  localStorage.removeItem(STORAGE_KEY);
}
