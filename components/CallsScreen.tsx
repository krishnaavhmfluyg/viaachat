
import React from 'react';
import type { Call, Contact } from '../types';

const CallTypeIcon: React.FC<{ type: 'incoming' | 'outgoing' | 'missed' }> = ({ type }) => {
    switch (type) {
        case 'incoming':
            return <i className="fa-solid fa-arrow-down-left text-green-500"></i>;
        case 'outgoing':
            return <i className="fa-solid fa-arrow-up-right text-green-500"></i>;
        case 'missed':
            return <i className="fa-solid fa-arrow-down-left text-red-500"></i>;
        default:
            return null;
    }
}

const CallLogItem: React.FC<{ call: Call; onCall: (contact: Contact, isVideo: boolean) => void }> = ({ call, onCall }) => (
  <div onClick={() => onCall(call.contact, call.isVideo)} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
    <img src={call.contact.avatarUrl} alt={call.contact.name} className="w-12 h-12 rounded-full mr-4" />
    <div className="flex-1 min-w-0">
      <p className={`text-lg font-medium truncate ${call.type === 'missed' ? 'text-red-500' : 'text-gray-900'}`}>{call.contact.name}</p>
      <div className="flex items-center text-sm text-gray-500 mt-0.5">
          <CallTypeIcon type={call.type} />
          <span className="ml-2">{call.timestamp}</span>
      </div>
    </div>
    <button onClick={(e) => { e.stopPropagation(); onCall(call.contact, call.isVideo); }} className="text-2xl text-green-600 hover:text-green-700">
        <i className={`fa-solid ${call.isVideo ? 'fa-video' : 'fa-phone'}`}></i>
    </button>
  </div>
);


interface CallsScreenProps {
  calls: Call[];
  contacts: Contact[];
  onInitiateCall: (contact: Contact, isVideo: boolean) => void;
}

export const CallsScreen: React.FC<CallsScreenProps> = ({ calls, contacts, onInitiateCall }) => {
  return (
    <div className="h-full relative">
        <div className="p-4 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">Calls</h2>
            <p className="text-sm text-gray-500">Your recent call history</p>
        </div>
        <div className="divide-y divide-gray-200">
            {calls.map(call => (
                <CallLogItem key={call.id} call={call} onCall={onInitiateCall} />
            ))}
        </div>
         <button
            onClick={() => {
                const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
                onInitiateCall(randomContact, false);
            }}
            aria-label="New Call"
            className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
            >
            <i className="fa-solid fa-phone-plus text-2xl"></i>
        </button>
    </div>
  );
};
