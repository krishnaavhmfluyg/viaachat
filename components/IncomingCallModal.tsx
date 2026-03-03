
import React from 'react';
import type { Contact } from '../types';

interface IncomingCallModalProps {
    call: {
        contact: Contact;
        isVideo: boolean;
    };
    onAccept: () => void;
    onReject: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({ call, onAccept, onReject }) => {
    return (
        <div className="fixed inset-x-0 top-0 z-50 p-4 max-w-md mx-auto">
            <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between animate-slide-down">
                <div className="flex items-center">
                    <img src={call.contact.avatarUrl} alt={call.contact.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <p className="font-bold">{call.contact.name}</p>
                        <p className="text-sm text-gray-300">{call.isVideo ? 'Incoming Video Call...' : 'Incoming Call...'}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button onClick={onReject} className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl">
                        <i className="fa-solid fa-phone-slash"></i>
                    </button>
                    <button onClick={onAccept} className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl">
                        <i className="fa-solid fa-phone"></i>
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes slide-down {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-down { animation: slide-down 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};
