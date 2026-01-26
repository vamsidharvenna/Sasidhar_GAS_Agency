import React from 'react';
import { contactInfo } from '../../constants/data';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';

export const CTABlock: React.FC = () =>
{
    const { t } = useLanguage();
    const { openChat } = useChat();

    return (
        <section className="text-center py-7 px-4 bg-[#eef4fb] border-b border-[#e6e6e6] -mt-[60px] relative z-[3] shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
            <div className="max-w-[900px] mx-auto">
                <h1 className="text-3xl text-[#004A99] mb-4 uppercase font-bold">
                    {t( 'hero_title' )}
                </h1>

                <div className="w-full max-w-[520px] mx-auto space-y-3">
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={openChat}
                        className="text-lg"
                    >
                        {t( 'cta_chat' )}
                    </Button>

                    <div className="flex gap-2.5">
                        <a
                            href={`tel:${ contactInfo.officeNumber }`}
                            className="flex-1"
                        >
                            <Button variant="secondary" fullWidth>
                                {t( 'btn_call' )}
                            </Button>
                        </a>
                        <a
                            href={`https://wa.me/${ contactInfo.whatsappNumber.replace( '+', '' ) }`}
                            className="flex-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="whatsapp" fullWidth>
                                <span className="inline-flex items-center justify-center gap-2">
                                    <img
                                        src="https://storage.googleapis.com/sasidharstorage/logos/WhatsApp.png"
                                        alt="WhatsApp"
                                        className="h-5 w-auto"
                                    />
                                    <span>{t( 'btn_wa' )}</span>
                                </span>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
