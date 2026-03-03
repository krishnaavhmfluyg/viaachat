
import React from 'react';
import type { Chat } from '../types';

interface ChatItemProps {
  chat: Chat;
  onSelect: () => void;
  onLongPress: (event: React.MouseEvent) => void;
}

const ReadReceipt: React.FC<{ status?: 'sent' | 'delivered' | 'read' }> = ({ status }) => {
  if (!status) return null;
  const icon = status === 'read' ? 'fa-check-double text-blue-500' : 'fa-check-double text-gray-400';
  return <i className={`fa-solid ${icon} mr-1 text-sm`}></i>;
};

const MessageTypeIcon: React.FC<{ type: 'video' | 'sticker' | 'gif' | 'text' }> = ({ type }) => {
    switch (type) {
        case 'video':
            return <i className="fa-solid fa-video text-gray-500 mr-1.5"></i>;
        case 'sticker':
            return <i className="fa-solid fa-note-sticky text-gray-500 mr-1.5"></i>;
        case 'gif':
            return <i className="fa-solid fa-film text-gray-500 mr-1.5"></i>;
        default:
            return null;
    }
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onSelect, onLongPress }) => {
  return (
    <div 
      onClick={onSelect}
      onContextMenu={onLongPress}
      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
    >
      <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900 truncate">{chat.name}</p>
          <p className={`text-xs ${chat.unreadCount > 0 ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
            {chat.lastMessageTime}
          </p>
        </div>
        <div className="flex justify-between items-start mt-0.5">
          <div className="flex items-center text-gray-500 text-sm truncate">
            <ReadReceipt status={chat.status} />
            <MessageTypeIcon type={chat.messageType} />
            <p className="truncate">{chat.lastMessage}</p>
          </div>
          <div className="flex items-center space-x-2 ml-2">
            {chat.unreadCount > 0 && (
              <span className="bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {chat.unreadCount}
              </span>
            )}
            {chat.isPinned && <i className="fa-solid fa-thumbtack text-gray-400 text-xs"></i>}
          </div>
        </div>
      </div>
    </div>
  );
};
