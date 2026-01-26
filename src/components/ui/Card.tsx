import React from 'react';
import type { ReactNode } from 'react';

interface CardProps
{
    children: ReactNode;
    className?: string;
    borderLeft?: boolean;
    borderColorClass?: string;
}

export const Card: React.FC<CardProps> = ( {
    children,
    className = '',
    borderLeft = false,
    borderColorClass,
} ) =>
{
    const borderWidthClass = borderLeft ? 'border-l-[5px]' : '';
    const borderColor = borderLeft ? ( borderColorClass ?? 'border-l-[#004A99]' ) : '';

    return (
        <div className={`bg-white p-5 rounded-lg mb-4 ${ borderWidthClass } ${ borderColor } ${ className }`}>
            {children}
        </div>
    );
};
