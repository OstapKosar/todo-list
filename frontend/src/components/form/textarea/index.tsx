import type { TextareaHTMLAttributes } from 'react';
import { get, useFormContext } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  placeholder: string;
  maxLength?: number;
}

const Textarea = ({ label, name, placeholder, maxLength = 200, ...props }: TextareaProps) => {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  const textareaClassName = `
		w-full px-4 py-3 rounded-lg transition-colors
		text-gray-900 dark:text-white dark:bg-gray-700
		placeholder-gray-500 dark:placeholder-gray-400
		outline-2 max-h-60 min-h-20
		outline ${error ? 'outline-red-500 bg-red-50' : 'outline-gray-300 bg-gray-100 dark:outline-gray-600'}
		${error ? 'ring-red-300 dark:ring-red-600' : 'focus:outline-blue-500'}
	`;

  const errorTextClass = `
		mt-1 text-sm
		${error ? 'text-red-700 dark:text-red-400' : ''}
	`;

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        {...register(name)}
        placeholder={placeholder}
        className={textareaClassName}
        maxLength={maxLength}
      />
      {error && <p className={errorTextClass}>{error.message}</p>}
    </div>
  );
};

export default Textarea;
