import { z } from 'zod';

export const maxDescriptionLength = 400;

export const createProjectSchema = z.object({
  name: z.string().min(3, 'Project name is required').max(30, 'Name is too long'),
  description: z.string().max(maxDescriptionLength, 'Description is too long').optional(),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;
