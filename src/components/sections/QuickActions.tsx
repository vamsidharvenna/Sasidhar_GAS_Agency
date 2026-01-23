import React from 'react';
import { quickActions } from '../../constants/data';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';
import { Section } from '../ui/Section';

export const QuickActions: React.FC = () =>
{
    const { t } = useLanguage();
    const { openChat } = useChat();

    const handleTileClick = ( item: typeof quickActions[ 0 ] ) =>
    {
        if ( item.href )
        {
            const element = document.querySelector( item.href );
            element?.scrollIntoView( { behavior: 'smooth' } );
        } else if ( item.topic )
        {
            openChat();
        }
    };

    return (
        <Section className="py-[70px] pb-[60px]">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'quick_actions_title' )}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map( ( item ) => (
                    <div
                        key={item.labelKey}
                        onClick={() => handleTileClick( item )}
                        className="bg-white p-5 rounded-[10px] text-center shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-transform duration-200 cursor-pointer border border-[#eee] hover:-translate-y-[3px] hover:border-[#004A99]"
                    >
                        <span className="text-[2rem] mb-2.5 block">{item.icon}</span>
                        <h3 className="text-base text-[#004A99] font-semibold">{t( item.labelKey )}</h3>
                    </div>
                ) )}
            </div>
        </Section>
    );
};
