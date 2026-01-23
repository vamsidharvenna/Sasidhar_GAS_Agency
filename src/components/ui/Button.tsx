import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
    variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ( {
    variant = 'primary',
    fullWidth = false,
    className = '',
    children,
    ...props
} ) =>
{
    const baseClasses = 'inline-block px-6 py-3 rounded-xl font-semibold text-center cursor-pointer transition-all duration-200 border-none text-base shadow-lg';

    const variantClasses = {
        primary: 'bg-[#004A99] text-white hover:bg-[#003875]',
        secondary: 'bg-[#b40e17] text-white hover:bg-[#8a0b12]',
        outline: 'border-2 border-[#004A99] text-[#004A99] bg-white hover:bg-[#eef4fb]',
        whatsapp: 'bg-[#1da851] text-white hover:bg-[#158a3f]',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${ baseClasses } ${ variantClasses[ variant ] } ${ widthClass } ${ className }`}
            {...props}
        >
            {children}
        </button>
    );
};
