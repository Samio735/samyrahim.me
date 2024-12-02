import React from "react";

const AssistantSpeechIndicator = ({ isSpeaking }) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div
        className={`w-3 h-3 rounded-full ${
          isSpeaking ? 'bg-green-400 dark:bg-green-500' : 'bg-red-400 dark:bg-red-500'
        }`}
      />
      <p className="text-gray-300 dark:text-gray-600 text-sm">
        {isSpeaking ? "Assistant speaking" : "Assistant not speaking"}
      </p>
    </div>
  );
};

export default AssistantSpeechIndicator;
