import React from 'react';
import { contactInfo } from '../../constants/data';
import { useLanguage } from '../../context/LanguageContext';
import type { StaffMember } from '../../types';
import { Section } from '../ui/Section';
import { StaffCard } from './StaffCard';

export const Staff: React.FC = () =>
{
    const { t } = useLanguage();

    const officeStaff: StaffMember[] = [
        {
            name: 'Manager',
            area: 'Administration',
            phone: contactInfo.officeNumber,
        },
    ];

    const deliveryStaff: StaffMember[] = [
        {
            name: 'Delivery Team',
            area: 'Piduguralla Area',
            phone: contactInfo.officeNumber,
        },
    ];

    return (
        <Section id="staff">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'staff_title' )}
            </h2>

            <div className="mb-5">
                <h4 className="mb-2.5 text-[#666] font-medium">{t( 'office_staff' )}</h4>
                {officeStaff.map( ( member, idx ) => (
                    <StaffCard key={idx} member={member} />
                ) )}
            </div>

            <div>
                <h4 className="mb-2.5 text-[#666] font-medium">{t( 'delivery_staff' )}</h4>
                {deliveryStaff.map( ( member, idx ) => (
                    <StaffCard key={idx} member={member} />
                ) )}
            </div>
        </Section>
    );
};
