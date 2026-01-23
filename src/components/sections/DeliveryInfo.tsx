import React from 'react';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export const DeliveryInfo: React.FC = () =>
{
    const { t } = useLanguage();
    const { openChat } = useChat();

    return (
        <Section id="services">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'delivery_title' )}
            </h2>

            <Card borderLeft>
                <h3 className="text-lg font-semibold mb-2">{t( 'timings_head' )}</h3>
                <p className="text-sm text-[#666] mb-1">Mon – Sat: 9:30 AM – 7:00 PM</p>
                <p className="text-sm text-[#666]">{t( 'sunday_closed' )}</p>
            </Card>

            <Card borderLeft>
                <h3 className="text-lg font-semibold mb-2">{t( 'delivery_note_head' )}</h3>
                <p className="text-sm text-[#666] mb-4">{t( 'delivery_note_body' )}</p>
                <Button variant="outline" fullWidth onClick={openChat}>
                    {t( 'btn_check_delivery' )}
                </Button>
            </Card>
        </Section>
    );
};
