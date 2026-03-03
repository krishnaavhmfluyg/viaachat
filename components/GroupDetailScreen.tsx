
import React, { useState, useRef, useEffect } from 'react';
import type { Group, Contact, Message } from '../types';
import { UserProfileModal } from './UserProfileModal';

interface GroupDetailScreenProps {
  group: Group;
  onClose: () => void;
  onSendMessage: (groupId: number, messageText: string) => void;
  onInitiateCall: (contact: Contact, isVideo: boolean) => void;
  onInitiateChat: (contact: Contact) => void;
}

const MemberItem: React.FC<{ member: Contact, onClick: () => void }> = ({ member, onClick }) => (
    <div onClick={onClick} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
        <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-900 truncate">{member.name}</p>
        </div>
    </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isYou = message.sender === 'You';
    return (
        <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`rounded-lg px-3 py-2 max-w-xs lg:max-w-md ${isYou ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}`}>
                {!isYou && <p className="text-xs text-purple-500 font-bold">{message.sender}</p>}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs text-right mt-1 ${isYou ? 'text-green-100' : 'text-gray-400'}`}>{message.timestamp}</p>
            </div>
        </div>
    );
};

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


export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = ({ group, onClose, onSendMessage, onInitiateCall, onInitiateChat }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); // New state for emoji picker
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // New ref for emoji picker


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [group.messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
          onSendMessage(group.id, message.trim());
          setMessage('');
          setIsEmojiPickerOpen(false); // Close emoji picker after sending
      }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prevMessage => prevMessage + emoji);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 animate-fade-in">
        <header className="p-3 flex items-center sticky top-0 bg-white z-10 border-b shadow-sm">
            <button onClick={onClose} className="text-xl text-gray-600 hover:text-green-600 mr-3">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <img src={group.avatarUrl} alt={group.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1" onClick={() => setIsInfoVisible(prev => !prev)}>
                <h2 className="text-lg font-bold text-gray-800">{group.name}</h2>
                <p className="text-xs text-gray-500">{group.memberCount} members</p>
            </div>
             <button onClick={() => setIsInfoVisible(prev => !prev)} className="text-xl text-gray-600 hover:text-green-600 ml-3">
                <i className="fa-solid fa-info-circle"></i>
            </button>
        </header>

        {isInfoVisible && (
            <div className="p-4 bg-white border-b animate-fade-in-down">
                <h3 className="text-lg font-bold text-gray-800 mb-2 px-3">Members</h3>
                <div className="divide-y divide-gray-200 bg-white rounded-lg shadow-inner max-h-48 overflow-y-auto">
                    {group.members && group.members.length > 0 ? (
                        group.members.map(member => (
                            <MemberItem key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                        ))
                    ) : (
                        <p className="p-4 text-center text-gray-500">No members.</p>
                    )}
                </div>
            </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
            {group.messages?.map(msg => <MessageBubble key={msg.id} message={msg} />)}
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

        <div className="p-2 bg-white border-t flex items-center z-10">
            <button
                onClick={() => setIsEmojiPickerOpen(prev => !prev)}
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
            <button onClick={handleSend} className="ml-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </div>

        {selectedMember && <UserProfileModal user={selectedMember} onClose={() => setSelectedMember(null)} onInitiateCall={onInitiateCall} onInitiateChat={onInitiateChat} />}

        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
             @keyframes fade-in-down {
              0% { opacity: 0; transform: translateY(-10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
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
