import React from 'react';
import { Cursor } from '../motion-ui/Cursor';
import { MouseIcon } from '../MouseIcon';

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
        Take a call with our AI assistant for appointments and inquiries
      </p>
      <button
        onClick={onStartChat}
        disabled={isConnecting}
        className={`relative w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 cursor-none ${
          isConnecting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute z-50"
        >
          <div className="flex items-center">
            <MouseIcon className="h-6 w-6" color="#3b82f6" />
            <div className="ml-2 rounded-[4px] bg-blue-500 px-2 py-0.5 text-neutral-50 whitespace-nowrap">
              Take a call
            </div>
          </div>
        </Cursor>
         <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
      </button>
    </div>
  );
}