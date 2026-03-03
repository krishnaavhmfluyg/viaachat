
import React from 'react';

interface HeaderProps {
    onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="bg-gray-50 text-gray-800 p-4 flex justify-between items-center shadow-sm z-20">
      <h1 className="text-2xl font-bold text-green-600">ViaaChat</h1>
      <div className="flex items-center space-x-5 text-2xl text-gray-600">
        <button aria-label="Camera">
          <i className="fa-solid fa-camera"></i>
        </button>
        <button onClick={onProfileClick} aria-label="Profile">
          <img src="https://picsum.photos/seed/user/200" className="w-8 h-8 rounded-full" />
        </button>
        <button aria-label="More options">
          <i className="fa-solid fa-ellipsis-v"></i>
        </button>
      </div>
    </header>
  );
};
