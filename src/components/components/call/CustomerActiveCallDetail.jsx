import React from 'react';
import AssistantSpeechIndicator from "./AssistantSpeechIndicator";

const CustomerActiveCallDetail = ({ assistantIsSpeaking, onEndCallClick }) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-800 dark:bg-gray-100 p-6 rounded-lg h-full">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
        <img 
          src="/headset-svgrepo-com.svg" 
          alt="Headset" 
          className="h-12 w-12 text-blue-500"
        />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white dark:text-gray-800">Sarah</h2>
        <p className="text-sm text-gray-300 dark:text-gray-600">Dental Support Assistant</p>
        <div className="mt-4">
          <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        </div>
      </div>
      
      <button
        onClick={onEndCallClick}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
      >
        End Call
      </button>
    </div>
  );
};

export default CustomerActiveCallDetail;
