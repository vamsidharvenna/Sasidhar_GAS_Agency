import React from 'react';
import { contactInfo, PRODUCT_IMAGE_URL } from '../../constants/data';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

export const Products: React.FC = () =>
{
    const { t } = useLanguage();
    const whatsappUrl = `https://wa.me/${ contactInfo.whatsappNumber.replace( '+', '' ) }?text=I want to buy gas stove accessories`;

    return (
        <Section id="products" className="scroll-mt-[220px] pt-10">
            <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
                {t( 'products_title' )}
            </h2>

            <div className="bg-white rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-5">
                <div className="relative w-full overflow-hidden aspect-[16/7] bg-black/5">
                    <img
                        src={PRODUCT_IMAGE_URL}
                        alt="Gas stoves and accessories"
                        className="w-full h-full object-contain md:object-cover md:object-center transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{t( 'prod_stove' )}</h3>
                    <p className="text-sm text-[#666] mb-3">{t( 'prod_desc' )}</p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="whatsapp" fullWidth>
                            {t( 'btn_enquire' )}
                        </Button>
                    </a>
                </div>
            </div>
        </Section>
    );
};
