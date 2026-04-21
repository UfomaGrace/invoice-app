import { Sun, Moon } from 'lucide-react';
import { useTheme } from './context/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Invoice App
          </h1>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            This box changes color in dark mode.
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-500">
            Current mode: <span className="font-semibold">{isDark ? '🌙 Dark' : '☀️ Light'}</span>
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Click the icon to toggle • Refresh to test persistence
        </p>
      </div>
    </div>
  );
}

export default App;