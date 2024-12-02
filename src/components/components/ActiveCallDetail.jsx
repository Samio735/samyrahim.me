import AssistantSpeechIndicator from "./call/AssistantSpeechIndicator";

const ActiveCallDetail = ({ assistantIsSpeaking, onEndCallClick }) => {
  return (
    <div className="h-full flex flex-col items-center justify-between py-8 bg-gray-800 dark:bg-gray-100 p-6 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-700 dark:bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white dark:text-gray-800">Sara</h2>
          <p className="text-sm text-gray-300 dark:text-gray-600">Bright Future Real Estate</p>
          <div className="mt-4">
            <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
          </div>
        </div>
      </div>

      <button
        onClick={onEndCallClick}
        className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ActiveCallDetail;
