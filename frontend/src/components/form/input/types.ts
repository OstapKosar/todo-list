import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};
