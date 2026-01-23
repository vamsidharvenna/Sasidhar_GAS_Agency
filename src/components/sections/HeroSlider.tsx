import React, { useEffect, useState } from 'react';
import { heroImages } from '../../constants/data';

export const HeroSlider: React.FC = () =>
{
    const [ activeSlide, setActiveSlide ] = useState( 0 );
    const [ imagesLoaded, setImagesLoaded ] = useState( false );

    useEffect( () =>
    {
        if ( heroImages.length === 0 ) return;

        // Preload images
        let loadedCount = 0;
        const totalImages = heroImages.length;

        heroImages.forEach( ( src ) =>
        {
            const img = new Image();
            img.onload = () =>
            {
                loadedCount++;
                if ( loadedCount === totalImages )
                {
                    setImagesLoaded( true );
                }
            };
            img.onerror = () =>
            {
                loadedCount++;
                if ( loadedCount === totalImages )
                {
                    setImagesLoaded( true );
                }
            };
            img.src = src;
        } );

        // Auto-advance slider
        const interval = setInterval( () =>
        {
            setActiveSlide( ( prev ) => ( prev + 1 ) % heroImages.length );
        }, 5000 );

        return () => clearInterval( interval );
    }, [] );

    if ( !imagesLoaded || heroImages.length === 0 )
    {
        return (
            <div className="h-[650px] flex items-center justify-center bg-gradient-to-br from-[#eef4fb] to-[#dfeaf8]">
                <p className="text-[#004A99] font-semibold text-center px-5">
                    Hero images are not loading. Please check the storage links or permissions.
                </p>
            </div>
        );
    }

    return (
        <div className="relative h-[650px] overflow-hidden bg-[#eef4fb]">
            {heroImages.map( ( src, idx ) => (
                <img
                    key={src}
                    src={src}
                    alt={`Sasidhar Gas Agency showcase ${ idx + 1 }`}
                    className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-1000 ${ idx === activeSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            ) )}
        </div>
    );
};
