import { z } from 'zod';

export const taskDetailsSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required').min(3, 'Title is too short').max(30, 'Title is too long'),
  description: z.string().max(400, 'Description is too long').optional(),
  urgent: z.boolean(),
  important: z.boolean(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']).default('TODO'),
});
