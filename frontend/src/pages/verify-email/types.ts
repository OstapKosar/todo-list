import { z } from 'zod';
import { verifyEmailSchema } from './validation';

export type VerifyEmailForm = z.infer<typeof verifyEmailSchema>;
