import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicantSchema, type ApplicantData } from '../schemas/ethicsForm';
import { useFormState, useFormDispatch } from '../context/FormContext';

export function StepApplicant() {
  const { formData } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicantData>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      applicantName: formData.applicantName ?? '',
      email: formData.email ?? '',
      department: formData.department ?? '',
      supervisorName: formData.supervisorName ?? '',
    },
  });

  const onSubmit = (data: ApplicantData) => {
    dispatch({ type: 'NEXT_STEP', payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-form">
      <h2>Step 1: Applicant Information</h2>

      <label>
        Full Name
        <input {...register('applicantName')} />
        {errors.applicantName && <span className="error">{errors.applicantName.message}</span>}
      </label>

      <label>
        Email
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </label>

      <label>
        Department
        <input {...register('department')} />
        {errors.department && <span className="error">{errors.department.message}</span>}
      </label>

      <label>
        Supervisor Name
        <input {...register('supervisorName')} />
        {errors.supervisorName && <span className="error">{errors.supervisorName.message}</span>}
      </label>

      <div className="form-nav">
        <button type="submit">Next &rarr;</button>
      </div>
    </form>
  );
}
