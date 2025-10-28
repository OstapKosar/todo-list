import React from 'react';

type DropdownItemProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
    >
      {children}
    </button>
  );
};

export default DropdownItem;
