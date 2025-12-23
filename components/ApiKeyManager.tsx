
import React, { useState } from 'react';
import { KeyIcon } from './icons/KeyIcon';

interface ApiKeyManagerProps {
  onKeySubmit: (key: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().length < 10) { // Basic validation
      setError('Please enter a valid API key.');
      return;
    }
    setError('');
    onKeySubmit(apiKey);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gemini API Key Required</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                To use this application, please provide your Google Gemini API key.
                Your key is not stored and is only used for this session.
            </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key" className="sr-only">API Key</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <KeyIcon />
                </div>
                <input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500/50 transition-all text-gray-800 dark:text-gray-100"
                  placeholder="Enter your API key"
                  required
                />
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors"
          >
            Start Application
          </button>
        </form>
         <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
                Don't have a key? Get one from{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Google AI Studio
                </a>.
            </p>
        </div>
      </div>
    </div>
  );
};
