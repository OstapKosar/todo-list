import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { CheckboxProps } from './types';
import { cn } from '@/utils/tailwind';

const Checkbox = ({ name }: CheckboxProps) => {
  const { setValue, getValues } = useFormContext();
  const [checked, setChecked] = useState(Boolean(getValues(name)));

  const handleToggle = () => {
    setChecked((prev) => !prev);

    setValue(name, !checked, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'group w-full h-10 bg-green-200 dark:bg-teal-200/80 border-2 border-green-800 text-green-800 dark:text-green-900/50 dark:border-green-900/50 rounded-full relative cursor-pointer transition-colors duration-200 shadow',
          {
            'bg-red-200 dark:bg-pink-200/80 border-red-800 text-red-800 dark:text-red-900/50 dark:border-red-900/50':
              checked,
          },
        )}
      >
        <div
          className={cn(
            'h-8 w-1/2 absolute top-1/2 -translate-y-1/2 left-1 bg-white/70 rounded-full transition-all duration-200 ease flex items-center justify-center text-center group-hover:bg-gray-500/30 dark:group-hover:bg-gray-700/30',
            {
              'translate-x-[calc(100%-8px)]': checked,
            },
          )}
        >
          <span className="flex items-center justify-center select-none transition-transform duration-200 ease-in-out">
            {!checked ? (
              <>
                <span className="font-bold text-green-800 dark:text-green-900/50 mr-1">NOT</span>
                <span className="text-green-800 dark:text-green-900/50">{name.toUpperCase()}</span>
              </>
            ) : (
              <span className="font-bold text-red-800 dark:text-red-900/50">{name.toUpperCase()}</span>
            )}
          </span>
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-transform duration-200 ease-in-out opacity-30',
              checked
                ? '-translate-x-[calc(100%-8px)] font-bold text-green-800 dark:text-green-900/50'
                : 'translate-x-[calc(100%-8px)] font-bold text-red-800 dark:text-red-900/50',
            )}
          >
            {checked ? (
              <>
                <span className="mr-1">NOT</span>
                {name.toUpperCase()}
              </>
            ) : (
              <>{name.toUpperCase()}</>
            )}
          </span>
        </div>
      </button>
    </div>
  );
};

export default Checkbox;
