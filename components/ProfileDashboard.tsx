
import React from 'react';

interface ProfileDashboardProps {
  onClose: () => void;
  onSimulateCall: () => void;
}

const MenuItem: React.FC<{ icon: string; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <li>
    <button onClick={onClick} className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      <i className={`fa-solid ${icon} w-6 text-center text-gray-500 mr-3`}></i>
      <span className="font-medium">{label}</span>
    </button>
  </li>
);

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ onClose, onSimulateCall }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 z-30" onClick={onClose}></div>
      <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-xl z-40 p-4 animate-fade-in-down">
        <div className="flex items-center pb-4 border-b border-gray-200">
          <img src="https://picsum.photos/seed/user/200" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-bold text-lg text-gray-800">Your Name</p>
            <p className="text-sm text-gray-500">Available</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1">
          <MenuItem icon="fa-pencil" label="Edit Profile" />
          <MenuItem icon="fa-cog" label="Settings" />
          <MenuItem icon="fa-star" label="Starred Messages" />
          <MenuItem icon="fa-phone-arrow-down-left" label="Simulate Incoming Call" onClick={onSimulateCall} />
          <MenuItem icon="fa-sign-out-alt" label="Log Out" />
        </ul>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};
