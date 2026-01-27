import React from 'react';
import { useChat } from '../../context/ChatContext';

export const FloatingCTA: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="fixed bottom-5 right-5 z-[999]">
      <button
        onClick={openChat}
        className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#D31018] animate-pulse transition hover:scale-105"
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};
