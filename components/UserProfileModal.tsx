
import React from 'react';
import type { Contact } from '../types';

interface UserProfileModalProps {
  user: Contact;
  onClose: () => void;
  onInitiateCall: (contact: Contact, isVideo: boolean) => void;
  onInitiateChat: (contact: Contact) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose, onInitiateCall, onInitiateChat }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in" onClick={onClose}></div>
      <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-2xl p-6 flex flex-col items-center max-w-md mx-auto animate-slide-up">
        <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200" />
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 mb-6">Online</p>

        <div className="w-full flex justify-around mb-4">
             <button onClick={() => onInitiateChat(user)} className="flex flex-col items-center text-green-600 hover:text-green-700">
                <i className="fa-solid fa-comment-dots text-2xl"></i>
                <span className="text-sm mt-1">Message</span>
             </button>
             <button onClick={() => onInitiateCall(user, false)} className="flex flex-col items-center text-green-600 hover:text-green-700">
                <i className="fa-solid fa-phone text-2xl"></i>
                <span className="text-sm mt-1">Call</span>
             </button>
              <button onClick={() => onInitiateCall(user, true)} className="flex flex-col items-center text-green-600 hover:text-green-700">
                <i className="fa-solid fa-video text-2xl"></i>
                <span className="text-sm mt-1">Video</span>
             </button>
        </div>

        <button onClick={onClose} className="w-full mt-4 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300">
            Close
        </button>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};
