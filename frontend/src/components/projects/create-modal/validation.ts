import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(3, 'Project name is required').max(30, 'Name is too long'),
  description: z.string().max(400, 'Description is too long').optional(),
});
