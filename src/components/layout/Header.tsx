import React from 'react';
import { HP_LOGO_URL } from '../../constants/data';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () =>
{
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () =>
    {
        setLanguage( language === 'en' ? 'te' : 'en' );
    };

    const langLabel = language === 'en' ? '🇺🇸 EN / 🇮🇳 తెలుగు' : '🇮🇳 తెలుగు / 🇺🇸 EN';

    return (
        <header className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] sticky top-0 z-[1000]">
            {/* Top Bar */}
            <div className="flex justify-between items-center py-3.5 px-5 gap-3">
                <div className="flex items-center gap-3 text-xl font-bold text-[#004A99]">
                    <img
                        src={HP_LOGO_URL}
                        alt="HP Logo"
                        className="h-[42px] w-auto"
                    />
                    <div>
                        Sasidhar Gas <span className="text-[#D31018]">(HP)</span>
                    </div>
                </div>

                <button
                    className="bg-[#eef4fb] py-2 px-3.5 rounded-[22px] text-xs cursor-pointer border border-[#004A99] text-[#004A99] font-bold transition hover:bg-[#dfeaf8]"
                    onClick={toggleLanguage}
                >
                    {langLabel}
                </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block bg-[#004A99] text-white">
                <ul className="flex justify-center gap-6 py-3.5 px-5">
                    <li>
                        <a href="#home" className="text-white text-[0.95rem] hover:underline">
                            {t( 'nav_home' )}
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="text-white text-[0.95rem] hover:underline">
                            {t( 'nav_services' )}
                        </a>
                    </li>
                    <li>
                        <a href="#products" className="text-white text-[0.95rem] hover:underline">
                            {t( 'nav_products' )}
                        </a>
                    </li>
                    <li>
                        <a href="#staff" className="text-white text-[0.95rem] hover:underline">
                            {t( 'nav_staff' )}
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="text-white text-[0.95rem] hover:underline">
                            {t( 'nav_contact' )}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
