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
                data-ga-ui-location="contact_section"
                data-ga-content-id="get_directions"
                data-ga-label="agency_directions"
                data-meta-source="contact_section"
                data-meta-name="get_directions"
                data-meta-category="location"
                data-meta-label="agency_directions"
            >
                <Button variant="outline" fullWidth>
                    📍 Get Directions
                </Button>
            </a>

            <a
                href={`tel:${ contactInfo.officeNumber }`}
                className="block mb-3"
                data-ga-ui-location="contact_section"
                data-ga-content-id="office_call"
                data-ga-label="office_phone"
                data-meta-source="contact_section"
                data-meta-name="office_call"
                data-meta-category="contact"
                data-meta-label="office_phone"
                data-meta-contact-method="phone"
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
                data-ga-ui-location="contact_section"
                data-ga-content-id="office_whatsapp"
                data-ga-label="office_whatsapp"
                data-meta-source="contact_section"
                data-meta-name="office_whatsapp"
                data-meta-category="contact"
                data-meta-label="office_whatsapp"
                data-meta-contact-method="whatsapp"
            >
                <Button variant="whatsapp" fullWidth>
                    🟢 Mobile/WA: +91 98661 95074
                </Button>
            </a>
        </Section>
    );
};
