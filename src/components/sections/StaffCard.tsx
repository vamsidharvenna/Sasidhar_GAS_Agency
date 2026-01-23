import React from 'react';
import type { StaffMember } from '../../types';

interface StaffCardProps
{
    member: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ( { member } ) =>
{
    return (
        <div className="flex items-center bg-white p-4 rounded-lg mb-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="flex-grow">
                <strong className="text-base">{member.name}</strong>
                <br />
                <span className="text-xs text-[#999]">{member.area}</span>
            </div>
            <div className="flex gap-2.5">
                <a
                    href={`tel:${ member.phone }`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#004A99] text-white shadow-sm transition hover:-translate-y-[1px]"
                >
                    📞
                </a>
            </div>
        </div>
    );
};
