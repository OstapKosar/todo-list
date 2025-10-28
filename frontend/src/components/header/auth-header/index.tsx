import HeaderLogo from '@/components/logo/header-logo';

const AuthHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-8 flex justify-between items-center">
      <div className="max-w-7xl mx-auto w-full">
        <HeaderLogo />
      </div>
    </header>
  );
};

export default AuthHeader;
