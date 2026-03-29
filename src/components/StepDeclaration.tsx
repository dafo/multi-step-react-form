import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { declarationSchema, type DeclarationData } from '../schemas/ethicsForm';
import { useFormState, useFormDispatch } from '../context/FormContext';
import { clearSavedData } from '../hooks/useAutoSave';
import { submitApplication } from '../api/submitApplication';
import type { FullFormData } from '../schemas/ethicsForm';

export function StepDeclaration() {
  const { formData } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeclarationData>({
    resolver: zodResolver(declarationSchema),
    defaultValues: {
      agreedToTerms: formData.agreedToTerms ?? undefined,
      agreedToDataPolicy: formData.agreedToDataPolicy ?? undefined,
      signature: formData.signature ?? '',
    },
  });

  const onSubmit = async (data: DeclarationData) => {
  dispatch({ type: 'NEXT_STEP', payload: data });

  const fullData = { ...formData, ...data } as FullFormData;

  try {
    await submitApplication(fullData);
    dispatch({ type: 'SUBMIT' });
    clearSavedData();
  } catch (err) {
    console.error('Submission error:', err);
    alert('Failed to submit application. Please try again.');
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-form">
      <h2>Step 4: Declaration</h2>

      <label className="checkbox-label">
        <input type="checkbox" {...register('agreedToTerms')} />
        I agree to the ethics review terms and conditions
        {errors.agreedToTerms && <span className="error">{errors.agreedToTerms.message}</span>}
      </label>

      <label className="checkbox-label">
        <input type="checkbox" {...register('agreedToDataPolicy')} />
        I agree to the data handling and privacy policy
        {errors.agreedToDataPolicy && (
          <span className="error">{errors.agreedToDataPolicy.message}</span>
        )}
      </label>

      <label>
        Digital Signature (type your full name)
        <input {...register('signature')} />
        {errors.signature && <span className="error">{errors.signature.message}</span>}
      </label>

      <div className="form-nav">
        <button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
          &larr; Back
        </button>
        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </div>
    </form>
  );
}
