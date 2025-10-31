import { z } from 'zod';
import { createProjectTaskSchema } from './validation';

export type CreateProjectTaskForm = z.infer<typeof createProjectTaskSchema>;
