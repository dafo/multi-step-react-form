import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { researchDetailsSchema, type ResearchDetailsData } from '../schemas/ethicsForm';
import { useFormState, useFormDispatch } from '../context/FormContext';

export function StepResearchDetails() {
  const { formData } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResearchDetailsData>({
    resolver: zodResolver(researchDetailsSchema),
    defaultValues: {
      projectTitle: formData.projectTitle ?? '',
      projectDescription: formData.projectDescription ?? '',
      startDate: formData.startDate ?? '',
      endDate: formData.endDate ?? '',
      participantCount: formData.participantCount ?? undefined,
    },
  });

  const onSubmit = (data: ResearchDetailsData) => {
    dispatch({ type: 'NEXT_STEP', payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-form">
      <h2>Step 3: Research Details</h2>

      <label>
        Project Title
        <input {...register('projectTitle')} />
        {errors.projectTitle && <span className="error">{errors.projectTitle.message}</span>}
      </label>

      <label>
        Project Description
        <textarea rows={4} {...register('projectDescription')} />
        {errors.projectDescription && (
          <span className="error">{errors.projectDescription.message}</span>
        )}
      </label>

      <div className="date-row">
        <label>
          Start Date
          <input type="date" {...register('startDate')} />
          {errors.startDate && <span className="error">{errors.startDate.message}</span>}
        </label>
        <label>
          End Date
          <input type="date" {...register('endDate')} />
          {errors.endDate && <span className="error">{errors.endDate.message}</span>}
        </label>
      </div>

      <label>
        Number of Participants
        <input
          type="number"
          min={1}
          {...register('participantCount', { valueAsNumber: true })}
        />
        {errors.participantCount && (
          <span className="error">{errors.participantCount.message}</span>
        )}
      </label>

      <div className="form-nav">
        <button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
          &larr; Back
        </button>
        <button type="submit">Next &rarr;</button>
      </div>
    </form>
  );
}
