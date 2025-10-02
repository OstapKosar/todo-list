const Matrix = () => {
  return (
    <div className="flex justify-center m-10 bg-gray-800 p-10 rounded-lg">
      <div className="rotate-270 h-fit self-center mr-[-50px]">
        <p className="text-2xl font-bold text-gray-500">Importance</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex">
          <svg width="24" height="100%" viewBox="0 0 24 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 400V0M12 0L6 12M12 0L18 12"
              stroke="#6B7280"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 min-w-[400px] min-h-[300px] p-1">
            <div className="bg-yellow-200 dark:bg-yellow-300/50 rounded-lg p-4 flex flex-col items-center justify-center">
              <h2 className="text-yellow-900 dark:text-yellow-100 font-bold text-lg text-center">
                Important but not Urgent
              </h2>
            </div>
            <div className="bg-red-200 dark:bg-pink-300/50 rounded-lg p-4 flex flex-col items-center justify-center">
              <h2 className="text-red-900 dark:text-pink-100 font-bold text-lg text-center">Urgent and Important</h2>
            </div>
            <div className="bg-green-200 dark:bg-teal-300/50 rounded-lg p-4 flex flex-col items-center justify-center">
              <h2 className="text-green-900 dark:text-teal-100 font-bold text-lg text-center">
                Not Important and Not Urgent
              </h2>
            </div>
            <div className="bg-orange-200 dark:bg-orange-300/50 rounded-lg p-4 flex flex-col items-center justify-center">
              <h2 className="text-orange-900 dark:text-orange-100 font-bold text-lg text-center">
                Not Important but Urgent
              </h2>
            </div>
          </div>
        </div>
        <div className="pl-4">
          <svg width="100%" height="24" viewBox="0 0 600 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 12H600M600 12L588 6M600 12L588 18"
              stroke="#6B7280"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-2xl font-bold text-gray-500 self-center">Urgency</p>
      </div>
    </div>
  );
};

export default Matrix;
