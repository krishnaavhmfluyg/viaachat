
import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPills } from './components/FilterPills';
import { ChatList } from './components/ChatList';
import { BottomNav } from './components/BottomNav';
import { Fab } from './components/Fab';
import { UpdatesScreen } from './components/UpdatesScreen';
import { GroupsScreen } from './components/GroupsScreen';
import { CallsScreen } from './components/CallsScreen';
import { ProfileDashboard } from './components/ProfileDashboard';
import { CreateGroupModal } from './components/CreateGroupModal';
import { GroupDetailScreen } from './components/GroupDetailScreen';
import { CreateContactModal } from './components/CreateContactModal';
import { ChatDetailScreen } from './components/ChatDetailScreen';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { CallScreen } from './components/CallScreen';
import { IncomingCallModal } from './components/IncomingCallModal';
import type { Tab, Group, Contact, Message, Chat, Call } from './types';
import { MOCK_GROUPS, MOCK_CONTACTS, MOCK_CHATS, MOCK_CALLS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Chats');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isCreateContactOpen, setIsCreateContactOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const [calls, setCalls] = useState<Call[]>(MOCK_CALLS);
  const [activeCall, setActiveCall] = useState<{ contact: Contact; isVideo: boolean } | null>(null);
  const [incomingCall, setIncomingCall] = useState<{ contact: Contact; isVideo: boolean } | null>(null);

  const handleCreateGroup = (groupData: { name: string; avatarUrl: string; members: Contact[] }) => {
    const newGroup: Group = {
      id: Date.now(),
      name: groupData.name,
      avatarUrl: groupData.avatarUrl,
      memberCount: groupData.members.length,
      members: groupData.members,
      messages: [],
    };
    setGroups(prevGroups => [newGroup, ...prevGroups]);
    setIsCreateGroupOpen(false);
  };

  const handleCreateContact = (contactData: { name: string; avatarUrl: string }) => {
    const newContactId = Date.now();
    const newContact: Contact = {
        id: newContactId,
        name: contactData.name,
        avatarUrl: contactData.avatarUrl,
    };
    setContacts(prevContacts => [newContact, ...prevContacts]);

    const newChat: Chat = {
        id: newContactId,
        name: newContact.name,
        avatarUrl: newContact.avatarUrl,
        lastMessage: 'Tap to start chatting!',
        lastMessageTime: '',
        unreadCount: 0,
        isPinned: false,
        messageType: 'text',
        isGroup: false,
        messages: [],
    };
    setChats(prevChats => [newChat, ...prevChats]);

    setIsCreateContactOpen(false);
  };

  const handleSendGroupMessage = (groupId: number, messageText: string) => {
    const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedGroups = groups.map(group => {
        if (group.id === groupId) {
            const newMessages = [...(group.messages || []), newMessage];
            return { ...group, messages: newMessages };
        }
        return group;
    });

    setGroups(updatedGroups);
    if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup(prevGroup => prevGroup ? { ...prevGroup, messages: [...(prevGroup.messages || []), newMessage] } : null);
    }
  };
  
  const handleSendDirectMessage = (chatId: number, messageText: string) => {
    const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChats = chats.map(chat => {
        if (chat.id === chatId) {
            const newMessages = [...(chat.messages || []), newMessage];
            return { 
                ...chat, 
                messages: newMessages,
                lastMessage: messageText,
                lastMessageTime: newMessage.timestamp,
                status: 'sent'
            };
        }
        return chat;
    });

    setChats(updatedChats);
    if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat(prevChat => prevChat ? { 
            ...prevChat, 
            messages: [...(prevChat.messages || []), newMessage]
        } : null);
    }
  };

  const handleDeleteChat = (chatId: number) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    setChatToDelete(null);
  };
  
  const handleInitiateCall = (contact: Contact, isVideo: boolean) => {
    setIsProfileOpen(false);
    setSelectedChat(null); 
    setSelectedGroup(null);
    setActiveTab('Calls');
    setActiveCall({ contact, isVideo });
    const newCall: Call = {
        id: Date.now(),
        contact,
        type: 'outgoing',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVideo,
    };
    setCalls(prev => [newCall, ...prev]);
  };

  const handleInitiateChat = (contact: Contact) => {
    const existingChat = chats.find(chat => chat.id === contact.id && !chat.isGroup);

    if (existingChat) {
        setSelectedChat(existingChat);
    } else {
        const newChat: Chat = {
            id: contact.id,
            name: contact.name,
            avatarUrl: contact.avatarUrl,
            lastMessage: 'Say hi! 👋',
            lastMessageTime: '',
            unreadCount: 0,
            isPinned: false,
            messageType: 'text',
            isGroup: false,
            messages: [],
        };
        setChats(prevChats => [newChat, ...prevChats]);
        setSelectedChat(newChat);
    }
    setSelectedGroup(null);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleAcceptCall = () => {
    if (incomingCall) {
        setActiveCall({ contact: incomingCall.contact, isVideo: incomingCall.isVideo });
        setIncomingCall(null);
    }
  };

  const handleRejectCall = () => {
    if(incomingCall){
         const newCall: Call = {
            id: Date.now(),
            contact: incomingCall.contact,
            type: 'missed',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isVideo: incomingCall.isVideo,
        };
        setCalls(prev => [newCall, ...prev]);
    }
    setIncomingCall(null);
  };

  const triggerIncomingCall = () => {
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    setIncomingCall({ contact: randomContact, isVideo: Math.random() > 0.5 });
    setIsProfileOpen(false);
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'Chats':
        return (
          <>
            <SearchBar />
            <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <ChatList 
              chats={chats} 
              activeFilter={activeFilter} 
              onChatSelect={setSelectedChat}
              onChatLongPress={setChatToDelete}
            />
          </>
        );
      case 'Updates':
        return <UpdatesScreen />;
      case 'Groups':
        return (
          <GroupsScreen 
            groups={groups} 
            onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
            onGroupSelect={setSelectedGroup}
          />
        );
      case 'Calls':
        return <CallsScreen calls={calls} contacts={contacts} onInitiateCall={handleInitiateCall} />;
      default:
        return <ChatList chats={chats} activeFilter="All" onChatSelect={setSelectedChat} onChatLongPress={setChatToDelete} />;
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gray-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl overflow-hidden">
      {activeCall && <CallScreen call={activeCall} onEndCall={handleEndCall} />}
      {incomingCall && <IncomingCallModal call={incomingCall} onAccept={handleAcceptCall} onReject={handleRejectCall} />}
      
      {selectedChat ? (
        <ChatDetailScreen 
            chat={selectedChat} 
            onClose={() => setSelectedChat(null)} 
            onSendMessage={handleSendDirectMessage} 
            onInitiateCall={handleInitiateCall}
        />
      ) : selectedGroup ? (
        <GroupDetailScreen 
            group={selectedGroup} 
            onClose={() => setSelectedGroup(null)} 
            onSendMessage={handleSendGroupMessage}
            onInitiateCall={handleInitiateCall}
            onInitiateChat={handleInitiateChat}
        />
      ) : (
        <div className={`h-full flex flex-col ${activeCall || incomingCall ? 'blur-sm' : ''}`}>
          <Header onProfileClick={() => setIsProfileOpen(prev => !prev)} />
          {isProfileOpen && <ProfileDashboard onClose={() => setIsProfileOpen(false)} onSimulateCall={triggerIncomingCall} />}
          <main className="flex-1 overflow-y-auto pb-20">
            {renderContent()}
          </main>
          {activeTab === 'Chats' && <Fab onClick={() => setIsCreateContactOpen(true)} />}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      {isCreateGroupOpen && <CreateGroupModal contacts={contacts} onClose={() => setIsCreateGroupOpen(false)} onGroupCreate={handleCreateGroup} />}
      {isCreateContactOpen && <CreateContactModal onClose={() => setIsCreateContactOpen(false)} onContactCreate={handleCreateContact} />}
      {chatToDelete && (
        <DeleteConfirmationModal 
          chatName={chatToDelete.name}
          onConfirm={() => handleDeleteChat(chatToDelete.id)}
          onCancel={() => setChatToDelete(null)}
        />
      )}
    </div>
  );
};

export default App;
