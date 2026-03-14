type GAValue = string | number | boolean;
type GAParams = Record<string, GAValue | null | undefined>;

type GAWindow = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, GAValue>) => void;
};

type GADatasetElement = HTMLElement & {
  dataset: DOMStringMap & {
    gaEvent?: string;
    gaUiLocation?: string;
    gaContentType?: string;
    gaContentId?: string;
    gaLeadStatus?: string;
    gaContactMethod?: string;
    gaLabel?: string;
    gaSocialNetwork?: string;
    gaStore?: string;
    gaDestinationType?: string;
  };
};

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

const sanitizeParams = (params: GAParams): Record<string, GAValue> =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as Record<string, GAValue>;

const getGtag = () => {
  if (typeof window === 'undefined') return undefined;
  return (window as GAWindow).gtag;
};

export const trackGAEvent = (eventName: string, params: GAParams = {}) => {
  const gtag = getGtag();
  if (!gtag) return;

  const payload = sanitizeParams(params);
  if (Object.keys(payload).length > 0) {
    gtag('event', eventName, payload);
    return;
  }

  gtag('event', eventName);
};

const buildTrackedParams = (element: GADatasetElement): GAParams => ({
  ui_location: element.dataset.gaUiLocation,
  content_type: element.dataset.gaContentType,
  content_id: element.dataset.gaContentId,
  lead_status: element.dataset.gaLeadStatus,
  contact_method: element.dataset.gaContactMethod,
  label: element.dataset.gaLabel,
  social_network: element.dataset.gaSocialNetwork,
  store: element.dataset.gaStore,
  destination_type: element.dataset.gaDestinationType,
});

const normalizeHref = (href: string) => href.trim().toLowerCase();

const getHost = (href: string) => {
  try {
    return new URL(href, window.location.origin).hostname.toLowerCase();
  } catch {
    return '';
  }
};

export const trackGASelectContent = (contentId: string, uiLocation: string, contentType = 'quick_action') => {
  trackGAEvent('select_content', {
    content_type: contentType,
    content_id: contentId,
    ui_location: uiLocation,
  });
};

export const trackGAGenerateLead = (formType: string) => {
  trackGAEvent('generate_lead', {
    lead_source: 'website_quick_actions',
    form_type: formType,
    submission_method: 'web_form',
  });
};

export const trackGAWorkingLead = (leadStatus: string, params: GAParams = {}) => {
  trackGAEvent('working_lead', {
    lead_status: leadStatus,
    ...params,
  });
};

export const trackGALinkInteraction = (href: string, params: GAParams = {}) => {
  const normalizedHref = normalizeHref(href);
  const host = getHost(href);

  if (normalizedHref.startsWith('tel:')) {
    trackGAWorkingLead('phone_call_started', {
      contact_method: 'phone',
      ...params,
    });
    return;
  }

  if (normalizedHref.includes('wa.me') || normalizedHref.includes('whatsapp')) {
    trackGAWorkingLead('whatsapp_started', {
      contact_method: 'whatsapp',
      ...params,
    });
    return;
  }

  if (normalizedHref.includes('maps.app.goo.gl') || normalizedHref.includes('google.com/maps')) {
    trackGAEvent('get_directions_click', {
      destination_type: 'agency_location',
      ...params,
    });
    return;
  }

  if (SOCIAL_HOSTS.has(host)) {
    trackGAEvent('social_profile_visit', {
      social_network: SOCIAL_HOSTS.get(host),
      ...params,
    });
    return;
  }

  if (APP_STORE_HOSTS.has(host)) {
    trackGAEvent('app_store_visit', {
      store: APP_STORE_HOSTS.get(host),
      ...params,
    });
    return;
  }

  if (normalizedHref.startsWith('http://') || normalizedHref.startsWith('https://')) {
    trackGAEvent('outbound_content_click', {
      destination_host: host || undefined,
      ...params,
    });
  }
};

export const installGAClickTracker = () => {
  if (typeof document === 'undefined') return () => undefined;

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const trackedElement = target.closest('[data-ga-event]') as GADatasetElement | null;
    if (trackedElement?.dataset.gaEvent) {
      trackGAEvent(trackedElement.dataset.gaEvent, buildTrackedParams(trackedElement));
      return;
    }

    const link = target.closest('a[href]') as (HTMLAnchorElement & GADatasetElement) | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const params = buildTrackedParams(link);
    trackGALinkInteraction(href, {
      ...params,
      ui_location: params.ui_location ?? 'link_click',
    });
  };

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
};
