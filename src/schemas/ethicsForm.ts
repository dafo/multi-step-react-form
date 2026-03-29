import { z } from "zod";

// Step 1: Applicant Information
export const applicantSchema = z.object({
    applicantName: z.string().min(1, "Name is required"),
    email: z.email("Valid email is required"),
    department: z.string().min(1, "Department is required"),
    supervisorName: z.string().min(1, "Supervisor name is required")
});

// Step 2: Ethics Category & Risk Assessment
export const ethicsCategorySchema = z.object({
    ethicsCategory: z.enum(['human', 'animal', 'environmental'], {
    error: 'Select an ethics category'
  }),
riskLevel: z.number({ error: 'Risk level is required' })
    .min(1, "Minimal risk level is 1")
    .max(5, "Maximum risk level is 5"),
involvesFunding: z.boolean(),
fundingSource: z.string().optional()
}).refine(
    (data) => !data.involvesFunding || (data.fundingSource && data.fundingSource.length > 0),
    { message: "Funding source is required if the project involves funding", path: ["fundingSource"] }
);

// Step 3: Research Details
export const researchDetailsSchema = z.object({
  projectTitle: z.string().min(5, 'Project title must be at least 5 characters'),
  projectDescription: z.string().min(20, 'Description must be at least 20 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  participantCount: z
    .number({ error: 'Participant count is required' })
    .min(1, 'At least 1 participant is required'),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: 'End date must be after start date', path: ['endDate'] }
);

// Step 4: Declaration
export const declarationSchema = z.object({
  agreedToTerms: z.literal(true, {
    error: 'You must agree to the terms',
  }),
  agreedToDataPolicy: z.literal(true, {
    error: 'You must agree to the data policy',
  }),
  signature: z.string().min(1, 'Digital signature is required'),
});

// Combined schema for the entire form
export const fullFormSchema = z.object({
    ...applicantSchema.shape,
    ...ethicsCategorySchema.shape,
    ...researchDetailsSchema.shape,
    ...declarationSchema.shape,
});

// Infer TypeScript types from schemas
export type ApplicantData = z.infer<typeof applicantSchema>;
export type EthicsCategoryData = z.infer<typeof ethicsCategorySchema>;
export type ResearchDetailsData = z.infer<typeof researchDetailsSchema>;
export type DeclarationData = z.infer<typeof declarationSchema>;
export type FullFormData = z.infer<typeof fullFormSchema>;

// Step metadata
export const STEPS = [
  { id: 0, label: 'Applicant Info', schema: applicantSchema },
  { id: 1, label: 'Ethics & Risk', schema: ethicsCategorySchema },
  { id: 2, label: 'Research Details', schema: researchDetailsSchema },
  { id: 3, label: 'Declaration', schema: declarationSchema },
] as const;