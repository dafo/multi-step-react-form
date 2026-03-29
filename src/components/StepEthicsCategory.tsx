import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethicsCategorySchema, type EthicsCategoryData } from '../schemas/ethicsForm';
import { useFormState, useFormDispatch } from '../context/FormContext';

export function StepEthicsCategory() {
  const { formData } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EthicsCategoryData>({
    resolver: zodResolver(ethicsCategorySchema),
    defaultValues: {
      ethicsCategory: formData.ethicsCategory ?? undefined,
      riskLevel: formData.riskLevel ?? undefined,
      involvesFunding: formData.involvesFunding ?? false,
      fundingSource: formData.fundingSource ?? '',
    },
  });

  const involvesFunding = watch('involvesFunding');

  const onSubmit = (data: EthicsCategoryData) => {
    dispatch({ type: 'NEXT_STEP', payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-form">
      <h2>Step 2: Ethics Category &amp; Risk Assessment</h2>

      <label>
        Ethics Category
        <select {...register('ethicsCategory')}>
          <option value="">Select...</option>
          <option value="human">Human Subjects</option>
          <option value="animal">Animal Research</option>
          <option value="environmental">Environmental</option>
        </select>
        {errors.ethicsCategory && <span className="error">{errors.ethicsCategory.message}</span>}
      </label>

      <label>
        Risk Level (1-5)
        <input type="number" min={1} max={5} {...register('riskLevel', { valueAsNumber: true })} />
        {errors.riskLevel && <span className="error">{errors.riskLevel.message}</span>}
      </label>

      <label className="checkbox-label">
        <input type="checkbox" {...register('involvesFunding')} />
        Involves external funding?
      </label>

      {involvesFunding && (
        <label>
          Funding Source
          <input {...register('fundingSource')} />
          {errors.fundingSource && <span className="error">{errors.fundingSource.message}</span>}
        </label>
      )}

      <div className="form-nav">
        <button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
          &larr; Back
        </button>
        <button type="submit">Next &rarr;</button>
      </div>
    </form>
  );
}
