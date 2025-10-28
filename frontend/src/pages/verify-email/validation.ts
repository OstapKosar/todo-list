import { z } from 'zod';

export const verifyEmailSchema = z.object({
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
});
