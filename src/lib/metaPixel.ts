type MetaValue = string | number | boolean;
type MetaParams = Record<string, MetaValue | null | undefined>;
type MetaStandardEvent = 'Contact' | 'FindLocation' | 'Lead' | 'Search' | 'ViewContent';

type MetaWindow = Window & {
  fbq?: (command: 'track' | 'trackCustom', eventName: string, params?: Record<string, MetaValue>) => void;
};

type MetaDatasetElement = HTMLElement & {
  dataset: DOMStringMap & {
    metaStandardEvent?: MetaStandardEvent;
    metaCustomEvent?: string;
    metaSource?: string;
    metaName?: string;
    metaCategory?: string;
    metaLabel?: string;
    metaContactMethod?: string;
  };
};

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() ?? '';

const SOCIAL_HOSTS = new Map<string, string>([
  ['facebook.com', 'facebook'],
  ['www.facebook.com', 'facebook'],
  ['instagram.com', 'instagram'],
  ['www.instagram.com', 'instagram'],
  ['x.com', 'x'],
  ['www.x.com', 'x'],
  ['twitter.com', 'x'],
  ['www.twitter.com', 'x'],
  ['youtube.com', 'youtube'],
  ['www.youtube.com', 'youtube'],
  ['youtu.be', 'youtube'],
]);

const APP_STORE_HOSTS = new Map<string, string>([
  ['play.google.com', 'google_play'],
  ['apps.apple.com', 'app_store'],
]);

const sanitizeParams = (params: MetaParams): Record<string, MetaValue> =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as Record<string, MetaValue>;

const getFbq = () => {
  if (typeof window === 'undefined') return undefined;
  return (window as MetaWindow).fbq;
};

const dispatchMetaEvent = (command: 'track' | 'trackCustom', eventName: string, params: MetaParams = {}) => {
  const fbq = getFbq();
  if (!META_PIXEL_ID || !fbq) return;

  const payload = sanitizeParams(params);
  if (Object.keys(payload).length > 0) {
    fbq(command, eventName, payload);
    return;
  }

  fbq(command, eventName);
};

const buildTrackedParams = (element: MetaDatasetElement): MetaParams => ({
  source: element.dataset.metaSource,
  content_name: element.dataset.metaName,
  content_category: element.dataset.metaCategory,
  label: element.dataset.metaLabel,
  contact_method: element.dataset.metaContactMethod,
});

const normalizeHref = (href: string) => href.trim().toLowerCase();

const getHost = (href: string) => {
  try {
    return new URL(href, window.location.origin).hostname.toLowerCase();
  } catch {
    return '';
  }
};

export const trackMetaStandardEvent = (eventName: MetaStandardEvent, params: MetaParams = {}) => {
  dispatchMetaEvent('track', eventName, params);
};

export const trackMetaCustomEvent = (eventName: string, params: MetaParams = {}) => {
  dispatchMetaEvent('trackCustom', eventName, params);
};

export const trackMetaLinkInteraction = (href: string, params: MetaParams = {}) => {
  const normalizedHref = normalizeHref(href);
  const host = getHost(href);

  if (normalizedHref.startsWith('tel:')) {
    trackMetaStandardEvent('Contact', { contact_method: 'phone', ...params });
    return;
  }

  if (normalizedHref.includes('wa.me') || normalizedHref.includes('whatsapp')) {
    trackMetaStandardEvent('Contact', { contact_method: 'whatsapp', ...params });
    return;
  }

  if (normalizedHref.includes('maps.app.goo.gl') || normalizedHref.includes('google.com/maps')) {
    trackMetaStandardEvent('FindLocation', params);
    return;
  }

  if (SOCIAL_HOSTS.has(host)) {
    trackMetaCustomEvent('SocialProfileVisit', {
      social_network: SOCIAL_HOSTS.get(host),
      ...params,
    });
    return;
  }

  if (APP_STORE_HOSTS.has(host)) {
    trackMetaCustomEvent('AppStoreVisit', {
      store: APP_STORE_HOSTS.get(host),
      ...params,
    });
    return;
  }

  if (normalizedHref.startsWith('http://') || normalizedHref.startsWith('https://')) {
    trackMetaStandardEvent('ViewContent', {
      destination_host: host || undefined,
      ...params,
    });
  }
};

export const installMetaClickTracker = () => {
  if (typeof document === 'undefined') return () => undefined;

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const trackedElement = target.closest('[data-meta-standard-event], [data-meta-custom-event]') as MetaDatasetElement | null;
    if (trackedElement) {
      const params = buildTrackedParams(trackedElement);

      if (trackedElement.dataset.metaStandardEvent) {
        trackMetaStandardEvent(trackedElement.dataset.metaStandardEvent, params);
      }

      if (trackedElement.dataset.metaCustomEvent) {
        trackMetaCustomEvent(trackedElement.dataset.metaCustomEvent, params);
      }

      return;
    }

    const link = target.closest('a[href]') as (HTMLAnchorElement & MetaDatasetElement) | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const params = buildTrackedParams(link);
    trackMetaLinkInteraction(href, {
      ...params,
      source: params.source ?? 'link_click',
    });
  };

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
};
