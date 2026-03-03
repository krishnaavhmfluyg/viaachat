
import type { Chat, Contact, Group, Message, Call } from './types';

const mockMessagesChat2: Message[] = [
    { id: 1, text: "Hey, how's it going?", sender: 'Jack Whitman', timestamp: '9:25 AM'},
    { id: 2, text: "Pretty good! Just working on that project.", sender: 'You', timestamp: '9:26 AM'},
    { id: 3, text: "Nice! Let me know if you need any help.", sender: 'Jack Whitman', timestamp: '9:27 AM'},
    { id: 4, text: "Will do, thanks!", sender: 'You', timestamp: '9:27 AM'},
];

const mockMessagesChat3: Message[] = [
    { id: 1, text: "Dinner soon? 🍷", sender: 'Jane Pearson', timestamp: '8:15 AM'},
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Whitman Chat',
    avatarUrl: 'https://picsum.photos/seed/1/200',
    lastMessage: 'Sarah: For tn: or 🍷?',
    lastMessageTime: '11:26 AM',
    unreadCount: 0,
    isPinned: true,
    messageType: 'text',
    status: 'read',
    isGroup: true,
  },
  {
    id: 2,
    name: 'Jack Whitman',
    avatarUrl: 'https://picsum.photos/seed/2/200',
    lastMessage: 'Video',
    lastMessageTime: '9:28 AM',
    unreadCount: 4,
    isPinned: false,
    messageType: 'video',
    messages: mockMessagesChat2,
  },
  {
    id: 3,
    name: 'Jane Pearson',
    avatarUrl: 'https://picsum.photos/seed/3/200',
    lastMessage: 'Dinner soon? 🍷',
    lastMessageTime: '8:15 AM',
    unreadCount: 0,
    isPinned: false,
    messageType: 'text',
    status: 'delivered',
    messages: mockMessagesChat3,
  },
  {
    id: 4,
    name: 'Thomas Stewart',
    avatarUrl: 'https://picsum.photos/seed/4/200',
    lastMessage: 'GIF',
    lastMessageTime: '8:03 AM',
    unreadCount: 2,
    isPinned: false,
    messageType: 'gif',
    messages: [],
  },
  {
    id: 5,
    name: 'Francis Whitman',
    avatarUrl: 'https://picsum.photos/seed/5/200',
    lastMessage: 'pls tell me you follow SingleCatClu...',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isPinned: false,
    messageType: 'text',
    status: 'read',
    messages: [],
  },
  {
    id: 6,
    name: 'Alice Whitman',
    avatarUrl: 'https://picsum.photos/seed/6/200',
    lastMessage: 'Mom: How was this 10 yrs ago??',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isPinned: false,
    messageType: 'text',
    status: 'read',
    messages: [],
  },
  {
    id: 7,
    name: 'Jane Whitman',
    avatarUrl: 'https://picsum.photos/seed/7/200',
    lastMessage: 'Did you watch the game?',
    lastMessageTime: '8:15 AM',
    unreadCount: 0,
    isPinned: false,
    messageType: 'text',
    isGroup: true,
  },
   {
    id: 8,
    name: 'Victor Whitman',
    avatarUrl: 'https://picsum.photos/seed/8/200',
    lastMessage: 'Let\'s chat about it another tim...',
    lastMessageTime: '8:15 AM',
    unreadCount: 1,
    isPinned: false,
    messageType: 'text',
    status: 'delivered',
    messages: [],
  },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 2, name: 'Jack Whitman', avatarUrl: 'https://picsum.photos/seed/2/200' },
  { id: 3, name: 'Jane Pearson', avatarUrl: 'https://picsum.photos/seed/3/200' },
  { id: 4, name: 'Thomas Stewart', avatarUrl: 'https://picsum.photos/seed/4/200' },
  { id: 5, name: 'Francis Whitman', avatarUrl: 'https://picsum.photos/seed/5/200' },
  { id: 6, name: 'Alice Whitman', avatarUrl: 'https://picsum.photos/seed/6/200' },
  { id: 7, name: 'Jane Whitman', avatarUrl: 'https://picsum.photos/seed/7/200' },
  { id: 8, name: 'Victor Whitman', avatarUrl: 'https://picsum.photos/seed/8/200' },
  { id: 9, name: 'Olivia Chen', avatarUrl: 'https://picsum.photos/seed/9/200' },
  { id: 10, name: 'Ben Carter', avatarUrl: 'https://picsum.photos/seed/10/200' },
  { id: 11, name: 'Sophia Rodriguez', avatarUrl: 'https://picsum.photos/seed/11/200' },
];

export const MOCK_GROUPS: Group[] = [
    { id: 1, name: 'Family Group', avatarUrl: 'https://picsum.photos/seed/g1/200', memberCount: 5, members: [MOCK_CONTACTS[0], MOCK_CONTACTS[1], MOCK_CONTACTS[2], MOCK_CONTACTS[3], MOCK_CONTACTS[4]], messages: [{id: 1, text: "Hey everyone! What's up?", sender: "Jack Whitman", timestamp: "10:30 AM"}, {id: 2, text: "Not much, just chilling.", sender: "You", timestamp: "10:31 AM"}] },
    { id: 2, name: 'Work Project', avatarUrl: 'https://picsum.photos/seed/g2/200', memberCount: 3, members: [MOCK_CONTACTS[5], MOCK_CONTACTS[6], MOCK_CONTACTS[7]], messages: [{id: 1, text: "Hey team, let's sync up at 3 PM.", sender: "Jane Whitman", timestamp: "1:00 PM"}] },
    { id: 3, name: 'Weekend Hangouts', avatarUrl: 'https://picsum.photos/seed/g3/200', memberCount: 4, members: [MOCK_CONTACTS[8], MOCK_CONTACTS[9], MOCK_CONTACTS[10], MOCK_CONTACTS[0]], messages: [] },
];

export const MOCK_CALLS: Call[] = [
  {
    id: 1,
    contact: MOCK_CONTACTS[0], // Jack Whitman
    type: 'missed',
    timestamp: 'Today, 10:45 AM',
    isVideo: true,
  },
  {
    id: 2,
    contact: MOCK_CONTACTS[1], // Jane Pearson
    type: 'outgoing',
    timestamp: 'Today, 9:12 AM',
    isVideo: false,
  },
  {
    id: 3,
    contact: MOCK_CONTACTS[2], // Thomas Stewart
    type: 'incoming',
    timestamp: 'Yesterday, 8:30 PM',
    isVideo: false,
  },
   {
    id: 4,
    contact: MOCK_CONTACTS[0], // Jack Whitman
    type: 'incoming',
    timestamp: 'Yesterday, 6:00 PM',
    isVideo: true,
  },
];
