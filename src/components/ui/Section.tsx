import React, { ReactNode } from 'react';

interface SectionProps
{
    id?: string;
    title?: string;
    children: ReactNode;
    className?: string;
}

export const Section: React.FC<SectionProps> = ( { id, title, children, className = '' } ) =>
{
    return (
        <section id={id} className={`py-10 px-4 border-b border-[#eee] ${ className }`}>
            <div className="max-w-[1200px] mx-auto">
                {title && (
                    <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};
