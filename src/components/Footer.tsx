import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">TurboCash</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 TurboCash. All rights reserved. Built with ❤️ by <a href="https://shahriar.rf.gd/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Shahriar</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;