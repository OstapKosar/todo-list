import { z } from 'zod';
import { editUserSchema } from './validation';

export type EditUserForm = z.infer<typeof editUserSchema>;
