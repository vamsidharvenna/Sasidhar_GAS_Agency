import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';

const socials = [
  {
    name: 'Facebook',
    helper: 'Open profile',
    href: 'https://www.facebook.com/sasidhargas.piduguralla',
    Icon: FaFacebookF,
    circle: 'bg-[#1877F2]',
    tint: 'hover:bg-[rgba(24,119,242,0.04)]',
    border: 'hover:border-[#1877F2]/40',
    focus: 'focus:ring-[#1877F2]/40',
  },
  {
    name: 'X',
    helper: 'Open profile',
    href: 'https://x.com/GasSasidhar',
    Icon: FaTwitter,
    circle: 'bg-black',
    tint: 'hover:bg-[rgba(0,0,0,0.04)]',
    border: 'hover:border-black/30',
    focus: 'focus:ring-black/30',
  },
  {
    name: 'YouTube',
    helper: 'Open channel',
    href: 'https://www.youtube.com/@sasidhargasagencyhp8153',
    Icon: FaYoutube,
    circle: 'bg-[#FF0000]',
    tint: 'hover:bg-[rgba(255,0,0,0.04)]',
    border: 'hover:border-[#FF0000]/35',
    focus: 'focus:ring-[#FF0000]/35',
  },
  {
    name: 'Instagram',
    helper: 'Open profile',
    href: 'https://www.instagram.com/',
    Icon: FaInstagram,
    circle: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc2a8d]',
    tint: 'hover:bg-[rgba(244,144,51,0.05)]',
    border: 'hover:border-[#bc2a8d]/40',
    focus: 'focus:ring-[#bc2a8d]/35',
  },
];

export const SocialMedia: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[linear-gradient(180deg,#f8fafc,#ffffff)]">
      <Section id="social-media" className="py-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl text-[#004A99] font-bold">{t('social_title')}</h2>
          <p className="text-sm sm:text-base text-[#475569] mt-2 mb-4">
            {t('social_subtitle')}
          </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {socials.map(({ name, href, Icon, circle, tint, border, focus }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
              className={`group relative w-full bg-white rounded-[14px] border border-[#e5e7eb] shadow-[0_2px_8px_rgba(0,0,0,0.05)] px-4 py-3 flex flex-col items-center transition duration-200 hover:-translate-y-[4px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.10)] focus:outline-none focus:ring-2 ${focus} ${tint} ${border}`}
            >
                <FaExternalLinkAlt className="absolute right-3 top-3 text-[#94a3b8] opacity-0 text-xs transition duration-200 group-hover:opacity-90 group-focus-visible:opacity-90" />
                <div
                  className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white ${circle} transition duration-200 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 sm:h-5 sm:w-5" />
                </div>
                <span className="mt-2 text-sm sm:text-base font-medium text-[#1f2937]">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
