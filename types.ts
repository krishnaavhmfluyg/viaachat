
export interface Chat {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
  messageType: 'text' | 'video' | 'sticker' | 'gif';
  status?: 'sent' | 'delivered' | 'read';
  isGroup?: boolean;
  messages?: Message[];
}

export interface Contact {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
}

export interface Group {
    id: number;
    name: string;
    avatarUrl: string;
    memberCount: number;
    members: Contact[];
    messages?: Message[];
}

export interface Call {
  id: number;
  contact: Contact;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
  isVideo: boolean;
}

export type Tab = 'Chats' | 'Updates' | 'Groups' | 'Calls';
