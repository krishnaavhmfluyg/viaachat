
import React from 'react';

interface DeleteConfirmationModalProps {
  chatName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ chatName, onConfirm, onCancel }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in" onClick={onCancel}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 rounded-lg shadow-2xl p-6 w-80 max-w-md mx-auto animate-zoom-in">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Chat?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete the chat with <span className="font-semibold">{chatName}</span>?</p>
        <div className="flex justify-end space-x-3">
            <button onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold transition-colors">
                Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 font-semibold transition-colors">
                Delete
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        @keyframes zoom-in {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-zoom-in { animation: zoom-in 0.2s ease-out forwards; }
      `}</style>
    </>
  );
};
