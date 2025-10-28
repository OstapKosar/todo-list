import { z } from 'zod';
import { loginSchema } from './validation';

export type LoginForm = z.infer<typeof loginSchema>;
