import type { InputHTMLAttributes } from 'react';
import { get, useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const Input = ({ label, name, type, placeholder, ...props }: InputProps) => {
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  console.log(error);

  const inputClassName = `
    w-full px-4 py-3 rounded-lg transition-colors
    text-gray-900 dark:text-white dark:bg-gray-700
    placeholder-gray-500 dark:placeholder-gray-400
    outline-2  
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
      <input {...props} type={type} placeholder={placeholder} {...register(name)} className={inputClassName} />
      {error && <p className={errorTextClass}>{error.message}</p>}
    </div>
  );
};

export default Input;
