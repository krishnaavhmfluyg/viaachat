
import React from 'react';

interface FabProps {
  onClick: () => void;
}

export const Fab: React.FC<FabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="New Chat"
      className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
    >
      <i className="fa-solid fa-plus text-2xl"></i>
    </button>
  );
};
