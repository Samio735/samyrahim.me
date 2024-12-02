import React from 'react';

export default function CustomerSupportUI({ onStartChat, isConnecting }) {
  return (
    <div className="flex h-full flex-col items-center gap-4 bg-gray-800 dark:bg-gray-100 p-6 rounded-lg">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
        <img 
          src="/headset-svgrepo-com.svg" 
          alt="Headset" 
          className="h-12 w-12 text-blue-500"
        />
      </div>
      <h2 className="text-xl font-semibold text-white dark:text-gray-800">Dental Support Assistant</h2>
      <p className="text-gray-300 dark:text-gray-600 text-center text-sm">
        Chat with our AI assistant for appointments and inquiries
      </p>
      <button
        onClick={onStartChat}
        disabled={isConnecting}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
      >
        {isConnecting ? "Connecting..." : "Start Chat"}
      </button>
    </div>
  );
}