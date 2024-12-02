import React from 'react';

const PhoneCallUI = ({ onAnswer, onReject, isConnecting }) => {
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
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {isConnecting ? "Connecting..." : "Incoming call..."}
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-8">
        <button
          onClick={onReject}
          disabled={isConnecting}
          className={`w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 ${
            isConnecting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <button
          onClick={onAnswer}
          disabled={isConnecting}
          className={`w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 ${
            isConnecting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhoneCallUI;