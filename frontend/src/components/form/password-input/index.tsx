import { useState, type InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { cn } from '@/utils/tailwind';
import { get, useFormContext } from 'react-hook-form';
import { formElementClasses } from '@/utils/form-element-classes';

type PasswordInputProps = {
  label: string;
  name: string;
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ label, name, placeholder, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState } = useFormContext();
  const error = get(formState.errors, name);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...props}
          placeholder={placeholder}
          {...register(name)}
          className={cn(formElementClasses, {
            'outline-red-500 bg-red-50 ring-red-300 dark:ring-red-600': error,
            'outline-gray-300 bg-gray-100 dark:outline-gray-600 focus:outline-blue-500': !error,
          })}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute size-5 right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer text-gray-500 dark:text-gray-400 transition-all duration-200"
        >
          {showPassword ? <FiEye className="size-5" /> : <FiEyeOff className="size-5" />}
        </button>
      </div>

      {error && <p className={cn('mt-1 text-sm', { 'text-red-700 dark:text-red-400': error })}>{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
