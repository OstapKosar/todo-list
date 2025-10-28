import { z } from 'zod';
import { createProjectSchema } from './validation';

export type CreateProjectForm = z.infer<typeof createProjectSchema>;
