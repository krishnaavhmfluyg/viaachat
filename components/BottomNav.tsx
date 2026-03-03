
import React from 'react';
import type { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: Tab;
  icon: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ label, icon, active, onClick, badge }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center w-1/4 text-gray-500 hover:text-green-600 transition-colors relative">
    <div className={`p-2 px-6 rounded-full transition-colors ${active ? 'bg-green-100' : 'bg-transparent'}`}>
        <i className={`fa-solid ${icon} text-xl ${active ? 'text-green-700' : ''}`}></i>
    </div>
    <span className={`text-xs mt-1 ${active ? 'font-bold text-green-700' : 'font-medium'}`}>{label}</span>
    {badge && badge > 0 && (
        <span className="absolute top-0 right-5 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{badge > 9 ? '9+' : badge}</span>
    )}
  </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-50 border-t border-gray-200 h-16 flex justify-around items-center shadow-top">
      <NavItem label="Chats" icon="fa-comment-dots" active={activeTab === 'Chats'} onClick={() => setActiveTab('Chats')} badge={6} />
      <NavItem label="Updates" icon="fa-circle-notch" active={activeTab === 'Updates'} onClick={() => setActiveTab('Updates')} />
      <NavItem label="Groups" icon="fa-users" active={activeTab === 'Groups'} onClick={() => setActiveTab('Groups')} />
      <NavItem label="Calls" icon="fa-phone" active={activeTab === 'Calls'} onClick={() => setActiveTab('Calls')} />
    </nav>
  );
};
