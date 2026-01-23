import React from 'react';
import { contactInfo } from '../../constants/data';
import { useChat } from '../../context/ChatContext';

export const FloatingCTA: React.FC = () =>
{
    const { openChat } = useChat();

    return (
        <div className="fixed bottom-5 right-5 flex flex-col gap-2.5 z-[999]">
            <a
                href={`tel:${ contactInfo.officeNumber }`}
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#004A99] transition hover:scale-105"
            >
                📞
            </a>
            <a
                href={`https://wa.me/${ contactInfo.whatsappNumber.replace( '+', '' ) }`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#25D366] transition hover:scale-105"
            >
                🟢
            </a>
            <button
                onClick={openChat}
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#D31018] animate-pulse transition hover:scale-105"
            >
                💬
            </button>
        </div>
    );
};
