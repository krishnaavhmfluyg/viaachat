
import React, { useState, useMemo, useRef } from 'react';
import type { Contact } from '../types';

interface CreateGroupModalProps {
  contacts: Contact[];
  onClose: () => void;
  onGroupCreate: (groupData: { name: string; avatarUrl: string; members: Contact[] }) => void;
}

const ContactItem: React.FC<{ contact: Contact; isSelected: boolean; onToggle: () => void; }> = ({ contact, isSelected, onToggle }) => {
  return (
    <li className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={onToggle}>
      <img src={contact.avatarUrl} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
      <span className="flex-1 text-gray-800 font-medium">{contact.name}</span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
        {isSelected && <i className="fa-solid fa-check text-white text-xs"></i>}
      </div>
    </li>
  )
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ contacts, onClose, onGroupCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleContact = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]
    );
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGroupAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    const members = contacts.filter(c => selectedContacts.includes(c.id));
    onGroupCreate({
        name: groupName,
        avatarUrl: groupAvatar || 'https://picsum.photos/seed/newgroup/200', // Default avatar
        members: members,
    });
  };

  const filteredContacts = useMemo(() =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, contacts]);

  const canCreate = groupName.trim() !== '' && selectedContacts.length > 0;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" onClick={onClose}></div>
      <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-2xl p-4 flex flex-col h-[90%] max-w-md mx-auto animate-slide-up">
        <header className="flex items-center justify-between pb-3">
          <button onClick={onClose} className="text-lg text-gray-600 hover:text-gray-800">Cancel</button>
          <h2 className="text-xl font-bold text-gray-800">New Group</h2>
          <button 
            onClick={handleCreate} 
            disabled={!canCreate}
            className={`text-lg font-bold ${canCreate ? 'text-green-600 hover:text-green-700' : 'text-gray-400'}`}
          >
            Create
          </button>
        </header>

        <div className="flex items-center py-4 border-y border-gray-200">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button onClick={handleImageUploadClick} className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mr-4 hover:bg-gray-300 overflow-hidden">
            {groupAvatar ? (
                <img src={groupAvatar} alt="Group Avatar" className="w-full h-full object-cover" />
            ) : (
                <i className="fa-solid fa-camera"></i>
            )}
          </button>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
            className="flex-1 text-lg bg-transparent text-gray-900 outline-none border-b-2 border-gray-300 focus:border-green-500"
          />
        </div>

        <div className="py-3">
           <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 text-gray-800 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto space-y-1">
          {filteredContacts.map(contact => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContacts.includes(contact.id)}
              onToggle={() => handleToggleContact(contact.id)}
            />
          ))}
        </ul>

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
