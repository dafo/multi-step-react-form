import type { FullFormData } from '../schemas/ethicsForm';

const API_URL = 'http://localhost:5240/api/ethicsapplications';

export async function submitApplication(data: FullFormData): Promise<{ id: number }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Submission failed: ${response.statusText}`);
  }

  return response.json();
}