const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Todo App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
