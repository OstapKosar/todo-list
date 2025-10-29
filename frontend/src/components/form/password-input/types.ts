import type { InputHTMLAttributes } from 'react';

export type PasswordInputProps = {
  label: string;
  name: string;
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;
