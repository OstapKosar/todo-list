import type { DropdownContentProps } from './types';

const DropdownContent = ({ children, open }: DropdownContentProps) => {
  if (!open) return null;

  return (
    <div className="relative">
      <div className="absolute -left-26 min-w-full min-h-fit max-h-1/5 flex flex-col items-center p-3 mt-2 overflow-y-scroll bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-40">
        {children}
      </div>
    </div>
  );
};

export default DropdownContent;
