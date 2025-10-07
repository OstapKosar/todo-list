import Matrix from '@/components/matrix';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center pt-20">
      <div className="flex w-full items-center">
        <div className="text-left w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white p-10">
            AI-powered task manager based on Eisenhower Matrix. Organize tasks, prioritize smartly, never miss
            deadlines.
          </h2>
        </div>
        <Matrix />
      </div>
    </div>
  );
};

export default MainPage;
