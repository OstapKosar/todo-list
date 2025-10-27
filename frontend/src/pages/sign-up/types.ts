import { z } from 'zod';
import { signupSchema } from './validation';

export type SignupForm = z.infer<typeof signupSchema>;
