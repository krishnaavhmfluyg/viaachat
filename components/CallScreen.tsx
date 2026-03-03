
import React, { useState, useEffect } from 'react';
import type { Contact } from '../types';

interface CallScreenProps {
    call: {
        contact: Contact;
        isVideo: boolean;
    };
    onEndCall: () => void;
}

export const CallScreen: React.FC<CallScreenProps> = ({ call, onEndCall }) => {
    const [callStatus, setCallStatus] = useState('Calling...');
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);

    useEffect(() => {
        const statusTimer1 = setTimeout(() => setCallStatus('Ringing...'), 2000);
        const statusTimer2 = setTimeout(() => {
            setCallStatus('Connected');
        }, 4000);

        return () => {
            clearTimeout(statusTimer1);
            clearTimeout(statusTimer2);
        };
    }, []);

    useEffect(() => {
        let interval: number | undefined;
        if (callStatus === 'Connected') {
            interval = window.setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };
    
    const handleToggleMute = () => setIsMuted(prev => !prev);
    const handleToggleSpeaker = () => setIsSpeakerOn(prev => !prev);

    return (
        <div className="fixed inset-0 bg-slate-800 z-50 flex flex-col items-center text-white p-8 animate-fade-in">
            {/* Spacer to push content down */}
            <div className="flex-1"></div>

            {/* Contact Info */}
            <div className="text-center">
                <img src={call.contact.avatarUrl} alt={call.contact.name} className="w-32 h-32 rounded-full mb-4 border-4 border-slate-600 mx-auto" />
                <h2 className="text-4xl font-bold">{call.contact.name}</h2>
                <p className="text-lg text-slate-300 mt-2">
                    {callStatus === 'Connected' ? formatDuration(duration) : callStatus}
                </p>
            </div>

            {/* Spacer to push controls up */}
            <div className="flex-1"></div>

            {/* Controls Wrapper */}
            <div className="w-full">
                {/* Main Controls */}
                <div className="flex items-center justify-center space-x-6 mb-10">
                    <button onClick={handleToggleMute} className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-colors ${isMuted ? 'bg-white text-slate-800' : 'bg-slate-700/80 hover:bg-slate-600/80'}`}>
                        <i className={`fa-solid ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                    </button>
                    <button onClick={handleToggleSpeaker} className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-colors ${isSpeakerOn ? 'bg-white text-slate-800' : 'bg-slate-700/80 hover:bg-slate-600/80'}`}>
                        <i className={`fa-solid ${isSpeakerOn ? 'fa-volume-high' : 'fa-volume-off'}`}></i>
                    </button>
                    <button onClick={onEndCall} className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-2xl transform transition-transform hover:scale-105">
                        <i className="fa-solid fa-phone-slash"></i>
                    </button>
                </div>
                
                {/* Secondary Controls (mimicking screenshot) */}
                <div className="w-full max-w-sm mx-auto bg-black/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center justify-between text-slate-200 font-medium text-sm">
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10">
                        <i className="fa-solid fa-share-nodes"></i>
                    </button>
                    <button className="px-4 py-2 rounded-full hover:bg-white/10">
                        <span>Chat</span>
                    </button>
                    <button className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30">
                        <span>Preview</span>
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};
