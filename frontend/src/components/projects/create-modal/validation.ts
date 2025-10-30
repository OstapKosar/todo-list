import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required').min(3, 'Name is too short').max(30, 'Name is too long'),
  description: z.string().max(400, 'Description is too long').optional(),
});
