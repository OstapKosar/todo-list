import type { DropdownItemProps } from './types';

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  return (
    <div>
      <button
        className="w-full text-left p-2 m-0.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default DropdownItem;
