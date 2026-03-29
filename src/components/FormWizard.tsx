import { useEffect } from 'react';
import { useFormState, useFormDispatch } from '../context/FormContext';
import { useAutoSave, loadSavedData, clearSavedData } from '../hooks/useAutoSave';
import { STEPS } from '../schemas/ethicsForm';
import { StepApplicant } from './StepApplicant';
import { StepEthicsCategory } from './StepEthicsCategory';
import { StepResearchDetails } from './StepResearchDetails';
import { StepDeclaration } from './StepDeclaration';

const stepComponents = [
  StepApplicant,
  StepEthicsCategory,
  StepResearchDetails,
  StepDeclaration,
];

export function FormWizard() {
  const { currentStep, completedSteps, isSubmitted, formData } = useFormState();
  const dispatch = useFormDispatch();

  useAutoSave();

  useEffect(() => {
    const saved = loadSavedData();
    if (saved) {
      const confirmRestore = window.confirm(
        `Found auto-saved progress from ${new Date(saved.savedAt).toLocaleString()}. Resume where you left off?`
      );
      if (confirmRestore) {
        dispatch({
          type: 'RESTORE',
          payload: {
            formData: saved.formData,
            currentStep: saved.currentStep,
            completedSteps: saved.completedSteps,
          },
        });
      } else {
        clearSavedData();
      }
    }
  }, [dispatch]);

  if (isSubmitted) {
    return (
      <div className="submission-success">
        <h2>Application Submitted!</h2>
        <p>
          Thank you, <strong>{formData.applicantName}</strong>. Your ethics
          application has been submitted for review.
        </p>
        <h3>Summary:</h3>
        <ul>
          <li><strong>Project:</strong> {formData.projectTitle}</li>
          <li><strong>Category:</strong> {formData.ethicsCategory}</li>
          <li><strong>Risk Level:</strong> {formData.riskLevel}/5</li>
          <li><strong>Participants:</strong> {formData.participantCount}</li>
        </ul>
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Start New Application
        </button>
      </div>
    );
  }

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="form-wizard">
      <div className="progress-bar">
        {STEPS.map((step) => (
          <button
            key={step.id}
            className={[
              'progress-step',
              currentStep === step.id ? 'active' : '',
              completedSteps.has(step.id) ? 'completed' : '',
            ].join(' ')}
            onClick={() => dispatch({ type: 'GO_TO_STEP', payload: step.id })}
          >
            <span className="step-number">{step.id + 1}</span>
            <span className="step-label">{step.label}</span>
          </button>
        ))}
      </div>

      <CurrentStepComponent />
    </div>
  );
}
