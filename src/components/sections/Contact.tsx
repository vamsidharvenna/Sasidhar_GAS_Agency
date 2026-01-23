import React from 'react';
import { contactInfo } from '../../constants/data';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

export const Contact: React.FC = () =>
{
    const { t } = useLanguage();

    return (
        <Section id="contact" className="text-center">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'contact_title' )}
            </h2>

            <p className="font-bold text-lg mb-2">
                <strong>{contactInfo.name}</strong>
            </p>
            <p className="text-sm text-[#555] mb-4">
                {contactInfo.address},<br />
                {contactInfo.city}, {contactInfo.state} {contactInfo.postalCode}
            </p>

            <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
            >
                <Button variant="outline" fullWidth>
                    📍 Get Directions
                </Button>
            </a>

            <a
                href={`tel:${ contactInfo.officeNumber }`}
                className="block mb-3"
            >
                <Button variant="primary" fullWidth>
                    📞 Office: 08649-255551
                </Button>
            </a>

            <a
                href={`https://wa.me/${ contactInfo.whatsappNumber.replace( '+', '' ) }`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <Button variant="whatsapp" fullWidth>
                    🟢 Mobile/WA: +91 98661 95074
                </Button>
            </a>
        </Section>
    );
};
