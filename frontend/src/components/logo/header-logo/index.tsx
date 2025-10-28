import { LuListTodo } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 cursor-pointer transition-colors group">
      <LuListTodo className="text-4xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Smart Tasks Matrix
      </span>
    </Link>
  );
};

export default HeaderLogo;
