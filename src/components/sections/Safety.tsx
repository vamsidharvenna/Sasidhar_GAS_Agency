import React from 'react';
import { contactInfo, safetyTips } from '../../constants/data';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export const Safety: React.FC = () =>
{
    const { t } = useLanguage();

    return (
        <Section id="safety" className="bg-[#fff3f3]">
            <h2 className="text-center text-3xl text-[#D31018] mb-5 font-bold">
                {t( 'safety_title' )}
            </h2>

            <ul className="list-none mb-5">
                {safetyTips.map( ( key ) => (
                    <li
                        key={key}
                        className="mb-2.5 pl-5 relative before:content-['⚠️'] before:absolute before:left-0"
                    >
                        {t( key )}
                    </li>
                ) )}
            </ul>

            <Card
                borderLeft
                className="border-l-[#D31018]"
            >
                <strong className="text-red-600 block mb-2">
                    {t( 'emergency_label' )}
                </strong>
                <span className="block mb-3 text-sm text-[#666]">
                    {t( 'leak_steps' )}
                </span>
                <a href={`tel:${ contactInfo.fireStationNumber }`}>
                    <Button variant="secondary" fullWidth>
                        📞 Call Fire Station
                    </Button>
                </a>
            </Card>
        </Section>
    );
};
