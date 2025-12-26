import { z } from 'zod';
import { taskDetailsSchema } from './validation';

export type TaskDetailsForm = z.infer<typeof taskDetailsSchema>;
