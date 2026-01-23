import React from 'react';
import { contactInfo } from '../../constants/data';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';

export const ChatWidget: React.FC = () =>
{
    const { t } = useLanguage();
    const { isChatOpen, closeChat } = useChat();

    if ( !isChatOpen ) return null;

    const whatsappNumber = contactInfo.whatsappNumber.replace( '+', '' );

    return (
        <div className="fixed bottom-20 right-5 w-[300px] h-[400px] bg-white border border-[#ccc] shadow-[0_5px_20px_rgba(0,0,0,0.2)] z-[1001] rounded-[10px] flex flex-col">
            <div className="bg-[#004A99] text-white py-2.5 px-4 rounded-t-[10px] flex justify-between items-center">
                <span className="font-semibold">Sasidhar Assistant</span>
                <button
                    onClick={closeChat}
                    className="text-white cursor-pointer text-lg hover:opacity-80"
                    aria-label="Close chat"
                >
                    ✖
                </button>
            </div>

            <div className="p-5 flex-grow text-center text-[#777] text-sm space-y-3">
                <p className="mb-4">{t( 'chat_welcome' )}</p>
                <hr className="my-2.5 border-0 border-t border-[#eee]" />

                <a
                    href={`https://wa.me/${ whatsappNumber }?text=Book Cylinder`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outline" fullWidth className="text-xs mb-2">
                        Book Cylinder
                    </Button>
                </a>

                <a
                    href={`https://wa.me/${ whatsappNumber }?text=New Connection`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outline" fullWidth className="text-xs mb-2">
                        New Connection
                    </Button>
                </a>

                <a
                    href={`https://wa.me/${ whatsappNumber }?text=Complaint`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outline" fullWidth className="text-xs mb-2">
                        Register Complaint
                    </Button>
                </a>

                <p className="mt-5 text-[0.7rem] text-[#999]">
                    (Integration Ready: Embed Dialogflow/Widget Script here)
                </p>
            </div>
        </div>
    );
};
