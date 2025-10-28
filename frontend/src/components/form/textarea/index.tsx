import type { TextareaHTMLAttributes } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { useState } from 'react';

import { formElementClasses } from '@/utils/form-element-classes';
import { cn } from '@/utils/tailwind';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  placeholder: string;
  maxLength?: number;
};

const Textarea = ({ label, name, placeholder, maxLength = 200, ...props }: TextareaProps) => {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="relative">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        style={{
          paddingBottom: '2.5rem',
        }}
        className={cn(formElementClasses, 'max-h-60 min-h-20', {
          'outline-red-500 bg-red-50': error,
          'outline-gray-300 bg-gray-100 dark:outline-gray-600 focus:outline-blue-500': !error,
        })}
      />
      {error && <p className={cn('mt-1 text-sm', { 'text-red-700 dark:text-red-400': error })}>{error.message}</p>}
      <p
        className={cn(
          'text-sm bg-white/95 dark:bg-gray-800/95 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md absolute bottom-2 right-2 transition-colors duration-200',
          {
            'text-yellow-700 dark:text-yellow-400': charCount >= maxLength * 0.5 && charCount < maxLength * 0.75,
            'text-orange-700 dark:text-orange-400': charCount >= maxLength * 0.75 && charCount < maxLength,
            'text-red-700 dark:text-red-400': charCount >= maxLength,
          },
        )}
      >
        {charCount}/{maxLength}
      </p>
    </div>
  );
};

export default Textarea;
