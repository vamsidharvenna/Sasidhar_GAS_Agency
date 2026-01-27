import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { FaMobileAlt, FaWhatsapp, FaPhoneAlt, FaListUl, FaGooglePlay, FaApple } from 'react-icons/fa';

export const RefillOptions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section id="refill" className="scroll-mt-[220px] pt-8 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl text-[#004A99] font-bold">{t('refill_heading')}</h2>
        <p className="text-sm sm:text-base text-[#475569] mt-2">
          {t('refill_subheading')}
        </p>
      </div>

      {/* Primary Booking Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* HP Pay Mobile App */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-2 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.10)] transition duration-200">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[#004A99] flex items-center justify-center text-white">
              <FaMobileAlt className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0f172a]">{t('refill_card1_title')}</h3>
              <p className="text-xs text-[#6b7280]">{t('refill_card1_sub')}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <a
              href="https://play.google.com/store/apps/details?id=com.drivetrackplusrefuel&pcampaignid=web_share"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366] text-sm flex items-center gap-1.5"
            >
              <FaGooglePlay className="h-4 w-4" />
              <span>Play Store</span>
            </a>
            <a
              href="https://apps.apple.com/in/app/hp-pay/id1343241227"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366] text-sm flex items-center gap-1.5"
            >
              <FaApple className="h-4 w-4" />
              <span>App Store</span>
            </a>
          </div>
        </div>

        {/* WhatsApp Booking */}
        <a
          href="https://wa.me/9222201122"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp booking chat"
          className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-2 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.10)] transition duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <FaWhatsapp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0f172a]">{t('refill_card2_title')}</h3>
              <p className="text-xs text-[#6b7280]">{t('refill_card2_sub')}</p>
            </div>
          </div>
          <span className="text-[#004A99] underline hover:text-[#003366] text-sm flex items-center gap-2 mt-1">
            <img
              src="https://storage.googleapis.com/sasidharstorage/logos/WhatsApp.png"
              alt="WhatsApp"
              className="h-4 w-auto"
            />
            92222 01122
          </span>
        </a>

        {/* HP ANY Time (IVRS) */}
        <a
          href="tel:8888823456"
          aria-label="Call HP ANY Time IVRS"
          className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-2 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.10)] transition duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white">
              <FaPhoneAlt className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0f172a]">{t('refill_card3_title')}</h3>
              <p className="text-xs text-[#6b7280]">{t('refill_card3_sub')}</p>
            </div>
          </div>
          <span className="text-[#004A99] underline hover:text-[#003366] text-sm flex items-center gap-2 mt-1">
            📞 88888 23456
          </span>
        </a>
      </div>

      {/* Other Booking Options */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_3px_10px_rgba(0,0,0,0.05)] p-4 mt-2">
        <div className="flex items-center gap-2 mb-3">
          <FaListUl className="text-[#004A99]" />
          <h3 className="text-base font-semibold text-[#0f172a]">{t('refill_other_heading')}</h3>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[#1f2937]">
          <li>
            <span className="font-semibold">{t('refill_missed')}</span>
          </li>
          <li>
            <span className="font-semibold">{t('refill_website')}</span>
          </li>
          <li>
            <span className="font-semibold">{t('refill_umang')}</span>{' '}
            <a
              href="https://play.google.com/store/apps/details?id=in.gov.umang.negd.g2c&pcampaignid=web_share"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366] ml-1 inline-flex items-center gap-1.5"
            >
              <FaGooglePlay className="h-4 w-4" />
              <span>Play Store</span>
            </a>
            <span className="mx-1">|</span>
            <a
              href="https://apps.apple.com/us/app/umang-india/id1544944177"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366] inline-flex items-center gap-1.5"
            >
              <FaApple className="h-4 w-4" />
              <span>App Store</span>
            </a>
          </li>
          <li>
            <span className="font-semibold">{t('refill_wallets')}</span>
          </li>
          <li>
            <span className="font-semibold">{t('refill_csc')}</span>
          </li>
          <li>
            <span className="font-semibold">{t('refill_distributor')}</span>{' '}
            <a
              href="tel:+918649255551"
              className="text-[#004A99] underline hover:text-[#003366] inline-flex items-center gap-1"
            >
              📞 +91 8649255551
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
};
