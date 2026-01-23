import React from 'react';
import type { ReactNode } from 'react';

interface CardProps
{
    children: ReactNode;
    className?: string;
    borderLeft?: boolean;
}

export const Card: React.FC<CardProps> = ( { children, className = '', borderLeft = false } ) =>
{
    const borderClass = borderLeft ? 'border-l-[5px] border-l-[#004A99]' : '';

    return (
        <div className={`bg-white p-5 rounded-lg mb-4 ${ borderClass } ${ className }`}>
            {children}
        </div>
    );
};
