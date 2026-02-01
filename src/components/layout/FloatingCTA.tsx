import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useLanguage } from "../../context/LanguageContext";

const AVATAR_SRC = "https://storage.googleapis.com/sasidharstorage/Ani/hpgas_chat_icon.gif";

export const FloatingCTA: React.FC = () => {
  const { openChat, isChatOpen } = useChat();
  const { language } = useLanguage();
  const [showBubble, setShowBubble] = useState(true);

  const bubbleText =
    language === "te"
      ? "నేను మీతో మాట్లాడడానికి ఇక్కడ ఉన్నాను."
      : "I'm here to chat with you.";

  const shouldShowBubble = showBubble && !isChatOpen;

  return (
    <div className="fixed flex items-end gap-1 md:gap-1 right-4 bottom-4 md:right-10 md:bottom-10 z-[9999]">
      {shouldShowBubble && (
        <div className="relative bg-gradient-to-br from-[#f8faff] to-[#eef3ff] border border-[#dde6ff] shadow-[0_6px_18px_rgba(0,0,0,0.12)] rounded-[16px] px-3 py-2 md:px-6 md:py-4 max-w-[210px] md:max-w-[340px] text-[#1f2937] text-sm md:text-[15.5px] leading-tight mb-14 md:mb-24 translate-x-1 md:translate-x-2 translate-y-1 md:translate-y-2">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#e5e7eb] text-[#4b5563] text-xs flex items-center justify-center shadow hover:bg-[#d1d5db]"
            aria-label="Close message"
          >
            ×
          </button>
          {bubbleText}
        </div>
      )}

      <button
        onClick={() => {
          setShowBubble(false);
          openChat();
        }}
        className="relative focus:outline-none"
        aria-label="Open chat"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <img
          src={AVATAR_SRC}
          alt="Chat"
          className="block object-contain w-20 h-20 md:w-32 md:h-32"
          style={{ background: 'transparent', boxShadow: 'none' }}
        />
      </button>
    </div>
  );
};
