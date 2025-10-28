import { z } from 'zod';
import { changePasswordSchema } from './validation';

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
