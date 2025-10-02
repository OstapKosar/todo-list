const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Todo App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
