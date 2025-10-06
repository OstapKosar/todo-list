import type { TextareaHTMLAttributes } from 'react';
import { get, useFormContext } from 'react-hook-form';

import { formElementClasses } from '../../../utils/form-element-classes';
import { cn } from '../../../utils/tailwind';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  placeholder: string;
  maxLength?: number;
}

const Textarea = ({ label, name, placeholder, maxLength = 200, ...props }: TextareaProps) => {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(formElementClasses, 'max-h-60 min-h-20', {
          'outline-red-500 bg-red-50': error,
          'outline-gray-300 bg-gray-100 dark:outline-gray-600 focus:outline-blue-500': !error,
        })}
      />
      {error && <p className={cn('mt-1 text-sm', { 'text-red-700 dark:text-red-400': error })}>{error.message}</p>}
    </div>
  );
};

export default Textarea;
