import type { InputHTMLAttributes } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { formElementClasses } from '@/utils/form-element-classes';
import { cn } from '@/utils/tailwind';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

const Input = ({ label, name, type, placeholder, ...props }: InputProps) => {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(formElementClasses, {
          'outline-red-500 bg-red-50 ring-red-300 dark:ring-red-600': error,
          'outline-gray-300 bg-gray-100 dark:outline-gray-600 focus:outline-blue-500': !error,
        })}
      />
      {error && <p className={cn('mt-1 text-sm', { 'text-red-700 dark:text-red-400': error })}>{error.message}</p>}
    </div>
  );
};

export default Input;
