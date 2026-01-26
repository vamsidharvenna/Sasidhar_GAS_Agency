import React, { useEffect, useMemo, useState } from 'react';
import { agencyImages, productImages, schemeImages } from '../../constants/data';

type GalleryKey = 'schemes' | 'agency' | 'products';

const ORDER: GalleryKey[] = ['schemes', 'agency', 'products'];
const ROTATION_MS = 4000;

const galleries: Record<GalleryKey, { images: string[] }> = {
  schemes: { images: schemeImages },
  agency: { images: agencyImages },
  products: { images: productImages },
};

const POSTER_KEYWORDS = [
  'poster',
  'banner',
  'scheme',
  'safety',
  'tips',
  'ujjwala',
  'cylinder',
  'test',
  'pdf',
  'gas-cylinder',
  'deepam',
];

const isPoster = (src: string): boolean => {
  const lower = src.toLowerCase();
  return POSTER_KEYWORDS.some((kw) => lower.includes(kw));
};

export const HeroSlider: React.FC = () => {
  const [indexes, setIndexes] = useState<Record<GalleryKey, number>>({
    schemes: 0,
    agency: 0,
    products: 0,
  });
  const [ready, setReady] = useState(false);
  const [enableRotation, setEnableRotation] = useState(true);
  const [columnPointer, setColumnPointer] = useState(0);

  const firstImages = useMemo(
    () => [schemeImages[0], agencyImages[0], productImages[0]].filter(Boolean),
    [],
  );

  // Preload first images
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    firstImages.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (!cancelled && loaded === firstImages.length) {
          setReady(true);
        }
      };
      img.src = src;
    });

    if (firstImages.length === 0) setReady(true);

    return () => {
      cancelled = true;
    };
  }, [firstImages]);

  // Pause rotation on small screens
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = () => setEnableRotation(!mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sequential rotation: advance one column at a time
  useEffect(() => {
    if (!ready || !enableRotation) return;

    const id = window.setInterval(() => {
      setIndexes((prev) => {
        const key = ORDER[columnPointer];
        const imgs = galleries[key].images;
        if (!imgs.length) return prev;
        return { ...prev, [key]: (prev[key] + 1) % imgs.length };
      });
      setColumnPointer((prev) => (prev + 1) % ORDER.length);
    }, ROTATION_MS);

    return () => window.clearInterval(id);
  }, [ready, enableRotation, columnPointer]);

  if (!ready) {
    return (
      <div className="h-[420px] w-full bg-gradient-to-br from-[#eef4fb] via-white to-[#dfeaf8]" />
    );
  }

  return (
    <div className="relative mx-auto max-w-screen-2xl px-2 pb-10 pt-6 md:px-6 lg:px-8">
      <div className="grid gap-3 sm:gap-4 lg:gap-4 lg:grid-cols-3">
        {(Object.keys(galleries) as GalleryKey[]).map((key) => {
          const images = galleries[key].images;
          const current = images[indexes[key]] ?? images[0];

          const poster = current ? isPoster(current) : false;
          const imageClass = poster
            ? 'object-contain'
            : 'object-cover';
          const wrapperBg = poster ? 'bg-[#f7f7f7]' : 'bg-white';

          return (
            <div
              key={key}
              className="relative overflow-hidden rounded-xl bg-[#f5f7fb] shadow-soft ring-1 ring-charcoal/8"
            >
              <div className={`relative w-full aspect-[4/3] overflow-hidden ${wrapperBg}`}>
                {current ? (
                  <img
                    src={current}
                    alt="Gallery item"
                    className={`absolute inset-0 h-full w-full ${imageClass} object-center`}
                    loading={indexes[key] === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-semibold text-brandBlue">
                    No images provided
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
