import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { StaffMember } from '../../types';
import { Section } from '../ui/Section';
import { StaffCard } from './StaffCard';

export const Staff: React.FC = () =>
{
    const { t } = useLanguage();

    const officeStaff: StaffMember[] = [
        { name: 'Narasimha Rao', area: 'Manager', phone: '918649255551' },
        { name: 'Manasa', area: 'Office Staff', phone: '9141515153' },
    ];

    const deliveryStaff: StaffMember[] = [
        { name: 'Durga Rao', area: 'Delivery man', phone: '8247772923' },
        { name: 'Basavaiah', area: 'Delivery man', phone: '7780222104' },
        { name: 'Srinu', area: 'Delivery man', phone: '7013331367' },
        { name: 'Santha Kumar', area: 'Delivery man', phone: '8328218700' },
        { name: 'Ravi', area: 'Delivery man', phone: '6304294077' },
    ];

    return (
        <Section id="staff" className="scroll-mt-[220px] pt-10">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'staff_title' )}
            </h2>

            <div className="flex flex-col gap-6">
                <div>
                    <h4 className="mb-2.5 text-[#666] font-medium">{t( 'office_staff' )}</h4>
                    {officeStaff.map( ( member ) => (
                        <StaffCard key={`office-${ member.phone }`} member={member} />
                    ) )}
                </div>

                <div className="pt-2 border-t border-[#e5e7eb]">
                    <h4 className="mb-2.5 text-[#666] font-medium">{t( 'delivery_staff' )}</h4>
                    {deliveryStaff.map( ( member ) => (
                        <StaffCard key={`delivery-${ member.phone }`} member={member} />
                    ) )}
                </div>
            </div>
        </Section>
    );
};
