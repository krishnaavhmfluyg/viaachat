
import React from 'react';

export const SearchBar: React.FC = () => {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fa-solid fa-search text-gray-500"></i>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-200 text-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};
