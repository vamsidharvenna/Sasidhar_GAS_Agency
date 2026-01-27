import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export const DeliveryInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section id="services">
      <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
        {t('timings_section_heading')}
      </h2>

      <Card borderLeft>
        <h3 className="text-lg font-semibold mb-2">{t('timings_head')}</h3>
        <p className="text-sm text-[#666] mb-1">{t('timings_line')}</p>
        <p className="text-sm text-[#666]">{t('sunday_closed')}</p>
      </Card>
    </Section>
  );
};




