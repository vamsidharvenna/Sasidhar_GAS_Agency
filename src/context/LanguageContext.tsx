import React, { createContext, ReactNode, useContext, useState } from 'react';
import { translations } from '../constants/data';
import type { Language } from '../types';

interface LanguageContextType
{
    language: Language;
    setLanguage: ( lang: Language ) => void;
    t: ( key: string ) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>( undefined );

export const useLanguage = (): LanguageContextType =>
{
    const context = useContext( LanguageContext );
    if ( !context )
    {
        throw new Error( 'useLanguage must be used within LanguageProvider' );
    }
    return context;
};

interface LanguageProviderProps
{
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ( { children } ) =>
{
    const [ language, setLanguage ] = useState<Language>( 'en' );

    const t = ( key: string ): string =>
    {
        return translations[ language ][ key ] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
