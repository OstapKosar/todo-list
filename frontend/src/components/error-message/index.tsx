import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="border-2 border-red-300 bg-red-200 dark:bg-red-600/70 dark:border-red-500/70 p-3 rounded-lg flex items-center shadow-sm">
      <span className="inline-block align-middle mr-2">
        <HiOutlineExclamationCircle size={20} />
      </span>
      <p className="text-gray-700 dark:text-gray-200">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
