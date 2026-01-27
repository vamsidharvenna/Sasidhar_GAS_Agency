import React from 'react';
import type { StaffMember } from '../../types';

interface StaffCardProps {
  member: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  return (
    <a
      href={`tel:${member.phone}`}
      className="flex items-center bg-white p-3 rounded-lg mb-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-[#004A99]/30"
      aria-label={`Call ${member.name}`}
    >
      <div className="flex-grow">
        <strong className="text-base">{member.name}</strong>
        <br />
        <span className="inline-flex items-center text-[11px] font-semibold text-[#555] bg-[#eef1f5] px-2 py-[2px] rounded-full">
          {member.area}
        </span>
        <br />
        <span className="text-sm font-semibold text-[#004A99]">{member.phone}</span>
      </div>
      <div className="flex gap-2.5">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#004A99] text-white shadow-sm transition">
          📞
        </div>
      </div>
    </a>
  );
};

