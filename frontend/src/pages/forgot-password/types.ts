import { z } from 'zod';
import { forgotPasswordSchema, verifyOtpSchema, newPasswordSchema } from './validation';

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;
export type NewPasswordForm = z.infer<typeof newPasswordSchema>;
