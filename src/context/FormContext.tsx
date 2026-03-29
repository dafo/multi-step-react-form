import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from "react";
import type { FullFormData } from "../schemas/ethicsForm";

// State shape
export interface FormState {
    currentStep: number;
    completedSteps: Set<number>;
    formData: Partial<FullFormData>;
    isSubmitted: boolean;
}

const initialState: FormState = {
    currentStep: 0,
    completedSteps: new Set(),
    formData: {},
    isSubmitted: false
};

// Actions
type FormActions =
| { type: 'NEXT_STEP'; payload: Partial<FullFormData> }
| { type: 'PREV_STEP' }
| { type: 'GO_TO_STEP'; payload: number }
| { type: 'SUBMIT' }
| { type: 'RESTORE'; payload: { formData: Partial<FullFormData>; currentStep: number; completedSteps: number[] } }
| { type: 'RESET' };

// Reducer (simple state machine)
function formReducer(state: FormState, action: FormActions): FormState {
  switch (action.type) {
    case 'NEXT_STEP': {
      const newCompleted = new Set(state.completedSteps);
      newCompleted.add(state.currentStep);
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        completedSteps: newCompleted,
        currentStep: Math.min(state.currentStep + 1, 3),
      };
    }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'GO_TO_STEP':
      // Only allow going to completed steps or the next available step
      if (state.completedSteps.has(action.payload) || action.payload <= state.currentStep) {
        return { ...state, currentStep: action.payload };
      }
      return state;
    case 'SUBMIT':
      return { ...state, isSubmitted: true };
    case 'RESTORE':
      return {
        ...state,
        formData: action.payload.formData,
        currentStep: action.payload.currentStep,
        completedSteps: new Set(action.payload.completedSteps),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Context
const FormContext = createContext<FormState | null>(null);
const FormDispatchContext = createContext<Dispatch<FormActions> | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

export function useFormState() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormState must be used within a FormProvider");
  return ctx;
}

export function useFormDispatch() {
  const ctx = useContext(FormDispatchContext);
  if (!ctx) throw new Error('useFormDispatch must be used within FormProvider');
  return ctx;
}