
import React, { useState, useRef } from 'react';

interface CreateContactModalProps {
  onClose: () => void;
  onContactCreate: (contactData: { name: string; avatarUrl: string; }) => void;
}

export const CreateContactModal: React.FC<CreateContactModalProps> = ({ onClose, onContactCreate }) => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAvatar, setContactAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContactAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (canCreate) {
        onContactCreate({
            name: contactName,
            avatarUrl: contactAvatar || `https://picsum.photos/seed/${contactName}/200`, // Default avatar
        });
    }
  };

  const canCreate = contactName.trim() !== '' && contactPhone.trim() !== '';

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" onClick={onClose}></div>
      <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-2xl p-4 flex flex-col h-[90%] max-w-md mx-auto animate-slide-up">
        <header className="flex items-center justify-between pb-3">
          <button onClick={onClose} className="text-lg text-gray-600 hover:text-gray-800">Cancel</button>
          <h2 className="text-xl font-bold text-gray-800">New Contact</h2>
          <button 
            onClick={handleCreate} 
            disabled={!canCreate}
            className={`text-lg font-bold ${canCreate ? 'text-green-600 hover:text-green-700' : 'text-gray-400'}`}
          >
            Create
          </button>
        </header>

        <div className="flex flex-col items-center py-6">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button onClick={handleImageUploadClick} className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl mb-6 hover:bg-gray-300 overflow-hidden">
                {contactAvatar ? (
                    <img src={contactAvatar} alt="Contact Avatar" className="w-full h-full object-cover" />
                ) : (
                    <i className="fa-solid fa-camera"></i>
                )}
            </button>
            <div className="w-full px-4">
                <div className="relative mb-4">
                    <label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                    />
                </div>
                <div className="relative">
                    <label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-600">Phone</label>
                    <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                    />
                </div>
            </div>
        </div>
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
