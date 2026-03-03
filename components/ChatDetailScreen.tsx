

import React, { useState, useRef, useEffect } from 'react';
import type { Chat, Message, Contact } from '../types';

interface ChatDetailScreenProps {
  chat: Chat;
  onClose: () => void;
  onSendMessage: (chatId: number, messageText: string) => void;
  onInitiateCall: (contact: Contact, isVideo: boolean) => void;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isYou = message.sender === 'You';
    return (
        <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`rounded-lg px-3 py-2 max-w-xs lg:max-w-md ${isYou ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                {!isYou && <p className="text-xs text-purple-500 font-bold">{message.sender}</p>}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs text-right mt-1 ${isYou ? 'text-green-100' : 'text-gray-400'}`}>{message.timestamp}</p>
            </div>
        </div>
    );
};

const AttachmentMenuItem: React.FC<{ icon: string; label: string; colorClass: string; isHighlighted?: boolean }> = ({ icon, label, colorClass, isHighlighted }) => (
    <button className={`w-full flex items-center p-3 text-left text-gray-800 rounded-lg transition-colors ${isHighlighted ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
        <i className={`fa-solid ${icon} w-8 text-center text-xl mr-3 ${colorClass}`}></i>
        <span className="font-medium text-md">{label}</span>
    </button>
);

// Define the categorized emojis
const categorizedEmojis = {
    '😀 Smileys & Emotions': [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖',
        '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔',
        '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴',
        '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '🤖', '💩'
    ],
    '👋 People & Body': [
        '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎',
        '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻',
        '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👨', '👩', '👱', '👴', '👵',
        '🧔', '🧕', '👳', '👲', '🧢', '👮', '👷', '💂', '🕵️', '👩‍⚕️', '👨‍⚕️', '👩‍🎓', '👨‍🎓', '👩‍💼', '👨‍💼', '👩‍💻', '👨‍💻', '👩‍🎤', '👨‍🎤',
        '👩‍🏫', '👨‍🏫', '👩‍🚀', '👨‍🚀', '🧙', '🧚', '🧛', '🧟', '🧞', '🧜', '🧝', '🧌'
    ],
    '🐶 🐱 Animals & Nature': [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊',
        '🐒', '🦍', '🦧', '🐔', '🐧', '🐦', '🐤', '🐣', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌',
        '🐞', '🐜', '🦟', '🦗', '🕷️', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅',
        '🐆', '🦓', '🦍', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌',
        '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🌸', '🌼', '🌻', '🌹', '🌷', '🌺', '🌴',
        '🌲', '🌳', '🍀', '🍁', '🍂', '🍃'
    ],
    '🍔 🍕 Food & Drink': [
        '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑',
        '🫒', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫛', '🧄', '🧅', '🍠', '🥔', '🍞', '🥐', '🥖', '🫓', '🧀', '🍳', '🥞',
        '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🍝', '🍜', '🍲', '🍛', '🍣',
        '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🧁', '🍰', '🎂', '🍮', '🍭',
        '🍬', '🍫', '🍿', '🍩', '🍪', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🍷', '🥂', '🥃', '🍸', '🍹',
        '🧉', '🍾'
    ],
    '⚽ 🎮 Activities & Sports': [
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '🏀', '🏋️', '🤸',
        '⛹️', '🤺', '🤾', '🏊', '🚴', '🧗', '🏇', '🏌️', '🎿', '🛷', '🥌', '⛸️', '🎯', '🎳', '🎮', '🕹️', '🎲', '🎰', '🎭', '🎨',
        '🎼', '🎵', '🎶', '🎤', '🎧', '🎷', '🎸', '🎹', '🥁'
    ],
    '🚗 ✈️ Travel & Places': [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🚨', '🚔',
        '🚍', '✈️', '🛫', '🛬', '🛩️', '🚀', '🛸', '🚁', '🚢', '⛴️', '🛥️', '🚤', '🚉', '🚆', '🚄', '🚅', '🚇', '🚝', '🚊', '🚞',
        '🚋', '🗽', '🗼', '🗿', '🏰', '🏯', '🏟️', '🏖️', '🏝️', '🏜️', '🏕️', '🌋', '🗻', '🏔️', '⛰️', '🏞️', '🌅', '🌄', '🌠', '🎇',
        '🎆', '🌌'
    ],
    '💡 📱 Objects': [
        '📱', '💻', '🖥️', '⌨️', '🖱️', '🖨️', '📷', '📸', '📹', '🎥', '📽️', '📞', '☎️', '📟', '📠', '📺', '📻', '🧭', '⏰', '⏱️',
        '⏲️', '⌚', '💡', '🔦', '🕯️', '🧯', '🪔', '🔌', '🔋', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🪞', '🚿', '🛁', '🧴', '🪒',
        '🧹', '🧺', '🧻', '🪣', '🧼', '🪥', '🧽', '🧯'
    ],
    '❤️ 🔣 Symbols': [
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '☮️', '✝️',
        '☪️', '🕉️', '☸️', '✡️', '🔯', '☯️', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '✔️', '❌', '❓',
        '❗', '⚠️', '🚫', '💯', '🔥', '✨', '🎉', '🎊', '🆗', '🆒', '🆕', '🆓', '🆙', '🆘', '⬆️', '⬇️', '⬅️', '➡️', '🔴', '🟠',
        '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤'
    ]
};


export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ chat, onClose, onSendMessage, onInitiateCall }) => {
  const [message, setMessage] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); // New state for emoji picker
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // New ref for emoji picker

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close attachment menu if clicked outside
      if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
        setIsAttachmentMenuOpen(false);
      }
      // Close emoji picker if clicked outside
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = () => {
      if (message.trim()) {
          onSendMessage(chat.id, message.trim());
          setMessage('');
          setIsEmojiPickerOpen(false); // Close emoji picker after sending
      }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prevMessage => prevMessage + emoji);
  };
  
  const contactForCall: Contact = {
    id: chat.id,
    name: chat.name,
    avatarUrl: chat.avatarUrl,
  };

  return (
    <div className="relative flex flex-col h-full bg-gray-100 animate-fade-in">
        <header className="p-3 flex items-center sticky top-0 bg-white z-10 border-b shadow-sm">
            <button onClick={onClose} className="text-xl text-gray-600 hover:text-green-600 mr-3">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <img src={chat.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800">{chat.name}</h2>
                <p className="text-xs text-gray-500">online</p>
            </div>
             <div className="flex items-center space-x-4 text-xl text-gray-600">
                <button onClick={() => onInitiateCall(contactForCall, true)} className="hover:text-green-600"><i className="fa-solid fa-video"></i></button>
                <button onClick={() => onInitiateCall(contactForCall, false)} className="hover:text-green-600"><i className="fa-solid fa-phone"></i></button>
             </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
            {chat.messages?.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            <div ref={messagesEndRef} />
        </div>

        {/* Emoji Picker */}
        {isEmojiPickerOpen && (
            <div ref={emojiPickerRef} className="absolute bottom-16 left-0 right-0 mx-auto w-full max-w-sm bg-white rounded-xl shadow-xl p-2 z-20 overflow-y-auto max-h-64 animate-fade-in-up">
                {Object.entries(categorizedEmojis).map(([category, emojis]) => (
                    <div key={category} className="mb-2">
                        <h3 className="text-sm font-semibold text-gray-500 px-2 py-1 sticky top-0 bg-white z-10">{category}</h3>
                        <div className="grid grid-cols-7 gap-1">
                            {emojis.map((emoji, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleEmojiSelect(emoji)}
                                    className="p-1 text-3xl emoji-3d hover:bg-gray-100 rounded-lg flex items-center justify-center"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {isAttachmentMenuOpen && (
            <div ref={attachmentMenuRef} className="absolute bottom-16 left-4 w-[280px] bg-white rounded-xl shadow-xl p-2 z-20 animate-fade-in-up">
                <AttachmentMenuItem icon="fa-file-invoice" label="Document" colorClass="text-purple-500" isHighlighted={true} />
                <AttachmentMenuItem icon="fa-camera" label="Camera" colorClass="text-red-500" />
                <AttachmentMenuItem icon="fa-image" label="Gallery" colorClass="text-blue-500" />
                <AttachmentMenuItem icon="fa-headphones-simple" label="Audio" colorClass="text-orange-500" />
                <AttachmentMenuItem icon="fa-location-dot" label="Location" colorClass="text-green-500" />
                <AttachmentMenuItem icon="fa-address-book" label="Contact" colorClass="text-cyan-500" />
            </div>
        )}

        <div className="p-2 bg-white border-t flex items-center z-10">
            <button 
                onClick={() => { setIsEmojiPickerOpen(prev => !prev); setIsAttachmentMenuOpen(false); }} 
                className="text-green-600 hover:text-green-700 text-xl p-2"
                aria-label="Open emoji picker"
            >
                <i className="fa-solid fa-smile"></i>
            </button>
            <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 rounded-lg py-2 px-4 focus:outline-none text-gray-900"
                value={message}
                onChange={e => { setMessage(e.target.value); setIsEmojiPickerOpen(false); }} // Close emoji picker on typing
                onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={() => { setIsAttachmentMenuOpen(prev => !prev); setIsEmojiPickerOpen(false); }} 
                className="text-green-600 hover:text-green-700 text-xl p-2"
                aria-label="Open attachment menu"
            >
                <i className="fa-solid fa-paperclip"></i>
            </button>
            <button onClick={handleSend} className="ml-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
            .emoji-3d {
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            }
        `}</style>
    </div>
  );
};
