import { useEffect, useMemo, useState } from 'react'
import './index.css'

type Lang = 'en' | 'te'

const translations: Record<Lang, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_products: 'Products',
    nav_staff: 'Staff',
    nav_contact: 'Contact',
    hero_title: 'SASIDHAR GAS AGENCY (HP)',
    cta_chat: 'Chat Now for Help',
    btn_call: 'Call',
    btn_wa: 'WhatsApp',
    quick_actions_title: 'Quick Actions',
    tile_new_conn: 'New LPG Connection',
    tile_complaint: 'Complaint / Issue',
    tile_delivery: 'Delivery Estimates',
    tile_buy: 'Buy Products',
    tile_staff: 'Staff Contacts',
    tile_safety: 'Safety Guidance',
    delivery_title: 'Delivery & Timings',
    timings_head: '🕒 Office Timings',
    sunday_closed: 'Sunday: Closed',
    delivery_note_head: '🚚 Delivery Estimates',
    delivery_note_body: 'Estimated delivery depends on your area and booking day.',
    btn_check_delivery: 'Check Delivery Estimate in Chat',
    products_title: 'Buy Accessories',
    prod_stove: 'Gas Stove / Pipe / Regulator',
    prod_desc: 'Availability may vary. Confirm via WhatsApp.',
    btn_enquire: 'Enquire on WhatsApp',
    staff_title: 'Staff Contacts',
    office_staff: 'Office Staff',
    delivery_staff: 'Delivery Staff',
    safety_title: 'Safety First',
    safe_1: 'Keep cylinder upright.',
    safe_2: 'Check rubber tube/regulator regularly.',
    safe_3: "Don't store near flames.",
    safe_4: 'Turn off regulator when not in use.',
    emergency_label: 'EMERGENCY: Gas Leak / Fire',
    leak_steps: "Open windows, avoid switches, close regulator, and exit.",
    contact_title: 'Contact Us',
    chat_welcome: 'Hello! How can I help you today?',
  },
  te: {
    nav_home: 'హోమ్',
    nav_services: 'సేవలు',
    nav_products: 'ఉత్పత్తులు',
    nav_staff: 'సిబ్బంది',
    nav_contact: 'సంప్రదించండి',
    hero_title: 'ససిధర్ గ్యాస్ ఏజెన్సీ (HP)',
    cta_chat: 'సహాయం కోసం చాట్ చేయండి',
    btn_call: 'కాల్చేయండి',
    btn_wa: 'వాట్సాప్',
    quick_actions_title: 'త్వరిత సేవలు',
    tile_new_conn: 'కొత్త LPG కనెక్షన్',
    tile_complaint: 'ఫిర్యాదు / సమస్య',
    tile_delivery: 'డెలివరీ అంచనా',
    tile_buy: 'ఉత్పత్తులు కొనండి',
    tile_staff: 'సిబ్బందితో మాట్లాడండి',
    tile_safety: 'భద్రత సూచనలు',
    delivery_title: 'డెలివరీ & సమయాలు',
    timings_head: '🕒 ఆఫీస్ సమయాలు',
    sunday_closed: 'ఆదివారం: సెలవు',
    delivery_note_head: '🚚 డెలివరీ అంచనా',
    delivery_note_body: 'మీ ప్రాంతం, బుకింగ్ రోజుపై ఆధారపడి డెలివరీ ఉంటుంది.',
    btn_check_delivery: 'చాట్‌లో డెలివరీ అడగండి',
    products_title: 'అసెసరీస్ కొనండి',
    prod_stove: 'గ్యాస్ స్టౌ / పైపు / రెగ్యులేటర్',
    prod_desc: 'లభ్యత మారవచ్చు. వాట్సాప్‌లో ధృవీకరించండి.',
    btn_enquire: 'వాట్సాప్‌లో అడగండి',
    staff_title: 'సిబ్బంది సంప్రదింపు',
    office_staff: 'ఆఫీస్ సిబ్బంది',
    delivery_staff: 'డెలివరీ సిబ్బంది',
    safety_title: 'భద్రత ముఖ్యం',
    safe_1: 'సిలిండర్‌ను నిలువుగా ఉంచండి.',
    safe_2: 'రబ్బర్ ట్యూబ్/రెగ్యులేటర్‌ను తరచూ చూడండి.',
    safe_3: 'మంటల దగ్గర ఉంచవద్దు.',
    safe_4: 'వాడనప్పుడు రెగ్యులేటర్ ఆఫ్ చేయండి.',
    emergency_label: 'అత్యవసరం: గ్యాస్ లీక్ / ఫైర్',
    leak_steps: 'కిటికీలు తెరవండి, స్విచ్‌లు వాడవద్దు, రెగ్యులేటర్ మూసి బయటకు రండి.',
    contact_title: 'మమ్మల్ని సంప్రదించండి',
    chat_welcome: 'నమస్కారం! నేను ఎలా సహాయపడగలను?',
  },
}

const heroImages = [
  'https://storage.googleapis.com/sasidharstorage/Head/image%20(2).png',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20180624-WA0011.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20180825-WA0008.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20180825-WA0022.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/image%20(3).png',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG_20250305_173624.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG_20200829_130457.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG_20181027_165451.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181113-WA0022.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181106-WA0003.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181103-WA0135.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181103-WA0123.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181031-WA0041.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20181031-WA0026.jpg',
  'https://storage.googleapis.com/sasidharstorage/sub%20head/IMG-20180913-WA0029.jpg',
]

const quickActions = [
  { icon: '🔥', labelKey: 'tile_new_conn', href: null as string | null, topic: 'new_connection' },
  { icon: '⚠️', labelKey: 'tile_complaint', href: null as string | null, topic: 'complaint' },
  { icon: '🚚', labelKey: 'tile_delivery', href: null as string | null, topic: 'delivery' },
  { icon: '🛒', labelKey: 'tile_buy', href: '#products', topic: null },
  { icon: '👥', labelKey: 'tile_staff', href: '#staff', topic: null },
  { icon: '🛡️', labelKey: 'tile_safety', href: '#safety', topic: null },
]

const safetyList = ['safe_1', 'safe_2', 'safe_3', 'safe_4']

const heroTitle = 'Sasidhar Gas Agency (HP)'
const officeNumber = '+918649255551'
const whatsappNumber = '+919866195074'
const fireStationNumber = '+919642770955'

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [chatOpen, setChatOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const t = (key: string) => translations[lang][key] ?? key

  useEffect(() => {
    if (!heroImages.length) return
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  const langLabel = useMemo(
    () => (lang === 'en' ? '🇺🇸 EN / 🇮🇳 తెలుగు' : '🇮🇳 తెలుగు / 🇺🇸 EN'),
    [lang],
  )

  return (
    <div className="relative min-h-screen bg-cloud text-charcoal">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-10 h-64 w-64 rounded-full bg-brandBlue/10 blur-3xl" />
        <div className="absolute right-[-14%] top-28 h-72 w-72 rounded-full bg-brandRed/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-charcoal/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/HP_Gas_Logo.svg/1200px-HP_Gas_Logo.svg.png"
              alt="HP Gas logo"
              className="h-10 w-auto"
              loading="lazy"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Sasidhar Gas</p>
              <p className="text-base font-semibold text-brandBlue">Trusted HP Distributor</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal/70 md:flex">
            {[
              { id: 'home', label: t('nav_home') },
              { id: 'services', label: t('nav_services') },
              { id: 'products', label: t('nav_products') },
              { id: 'staff', label: t('nav_staff') },
              { id: 'contact', label: t('nav_contact') },
            ].map((link) => (
              <a key={link.id} href={`#${link.id}`} className="hover:text-charcoal">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-brandBlue/30 px-3 py-2 text-xs font-semibold text-brandBlue transition hover:border-brandBlue/60"
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            >
              {langLabel}
            </button>
            <a
              href={`tel:${officeNumber}`}
              className="hidden rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px] md:inline-flex"
            >
              {t('btn_call')}
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-16 px-4 pb-16 pt-10 md:px-6">
        {/* Hero + CTA */}
        <section id="home" className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-soft">
          <div className="relative h-[420px] w-full overflow-hidden bg-gradient-to-br from-cloud via-white to-cloud">
            {heroImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt="Sasidhar Gas Agency"
                loading={idx === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            {!heroImages.length && (
              <div className="flex h-full items-center justify-center text-center text-sm font-semibold text-brandBlue">
                Hero images are not loading. Please check links or permissions.
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-charcoal/10 to-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              {heroImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-all ${
                    idx === activeSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="-mt-12 grid gap-6 px-4 pb-10 md:px-8">
            <div className="rounded-2xl bg-white/95 px-6 py-6 text-center shadow-soft ring-1 ring-charcoal/5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">{heroTitle}</p>
              <h1 className="mt-2 text-2xl font-semibold text-brandBlue md:text-3xl">{t('hero_title')}</h1>
              <p className="mt-2 text-sm text-charcoal/70">
                Official HP distributor in Piduguralla — fast bookings, timely delivery, and safety-first support.
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full rounded-xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px] sm:w-auto"
                >
                  {t('cta_chat')}
                </button>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <a
                    href={`tel:${officeNumber}`}
                    className="flex-1 rounded-xl border border-brandBlue/20 bg-white px-4 py-3 text-sm font-semibold text-brandBlue shadow-sm transition hover:-translate-y-[1px]"
                  >
                    {t('btn_call')}
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                    className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('btn_wa')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-brandBlue">{t('quick_actions_title')}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((item) => (
              <button
                key={item.labelKey}
                onClick={() => {
                  if (item.href) {
                    const el = document.querySelector(item.href)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    setChatOpen(true)
                  }
                }}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-charcoal/10 bg-white/95 p-4 text-left shadow-sm transition hover:-translate-y-[1px] hover:border-brandBlue/30"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandBlue/10 text-lg">
                  {item.icon}
                </span>
                <p className="text-base font-semibold text-charcoal">{t(item.labelKey)}</p>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                  Tap to proceed →
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Delivery info */}
        <section id="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-brandBlue">{t('delivery_title')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-l-4 border-brandBlue bg-white/95 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-charcoal">{t('timings_head')}</h3>
              <p className="mt-2 text-sm text-charcoal/70">Mon – Sat: 9:30 AM – 7:00 PM</p>
              <p className="text-sm text-charcoal/60">{t('sunday_closed')}</p>
            </div>
            <div className="rounded-2xl border-l-4 border-brandBlue bg-white/95 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-charcoal">{t('delivery_note_head')}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{t('delivery_note_body')}</p>
              <button
                onClick={() => setChatOpen(true)}
                className="mt-4 w-full rounded-xl border border-brandBlue/30 px-4 py-3 text-sm font-semibold text-brandBlue transition hover:border-brandBlue/60"
              >
                {t('btn_check_delivery')}
              </button>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-brandBlue">{t('products_title')}</h2>
            <a
              href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=I want to buy gas stove accessories`}
              className="text-sm font-semibold text-brandBlue hover:text-charcoal"
              target="_blank"
              rel="noreferrer"
            >
              {t('btn_enquire')} →
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white/95 shadow-soft ring-1 ring-charcoal/5">
            <div
              className="h-56 w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://drive.google.com/uc?export=view&id=1r-BNmdTjuaFdNUTQeVcGqp7SIsTil0bJ')",
              }}
            />
            <div className="space-y-2 px-5 py-4">
              <h3 className="text-lg font-semibold text-charcoal">{t('prod_stove')}</h3>
              <p className="text-sm text-charcoal/70">{t('prod_desc')}</p>
              <a
                href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=I want to buy gas stove accessories`}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px]"
                target="_blank"
                rel="noreferrer"
              >
                {t('btn_enquire')}
              </a>
            </div>
          </div>
        </section>

        {/* Staff */}
        <section id="staff" className="space-y-4">
          <h2 className="text-xl font-semibold text-brandBlue">{t('staff_title')}</h2>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal/60">{t('office_staff')}</p>
            <StaffCard name="Manager" area="Administration" phone={officeNumber} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal/60">{t('delivery_staff')}</p>
            <StaffCard name="Delivery Team" area="Piduguralla Area" phone={officeNumber} />
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-charcoal/5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandRed/70">{t('safety_title')}</p>
              <h3 className="text-lg font-semibold text-charcoal">Checklist we reinforce on every visit</h3>
            </div>
            <span className="rounded-full bg-brandRed/10 px-4 py-2 text-xs font-semibold text-brandRed">
              DGCA & PESO compliant
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {safetyList.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-white px-4 py-3"
              >
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brandBlue" />
                <p className="text-sm text-charcoal/75">{t(key)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border-l-4 border-brandRed bg-white px-4 py-4">
            <p className="text-sm font-semibold text-brandRed">{t('emergency_label')}</p>
            <p className="text-sm text-charcoal/75">{t('leak_steps')}</p>
            <a
              href={`tel:${fireStationNumber}`}
              className="mt-3 inline-flex items-center justify-center rounded-xl bg-brandRed px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px]"
            >
              📞 Call Fire Station
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl font-semibold text-brandBlue">{t('contact_title')}</h2>
          <div className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-charcoal/5">
            <p className="text-lg font-semibold text-charcoal">Sasidhar Gas Agency (HP)</p>
            <p className="mt-1 text-sm text-charcoal/70">
              D.NO. 15-223, Main Road, near police station,
              <br />
              Piduguralla, Andhra Pradesh 522413
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a
                href="https://maps.app.goo.gl/1HkGRZBqhADZGNHM6"
                className="flex items-center justify-center gap-2 rounded-xl border border-brandBlue/20 bg-white px-4 py-3 text-sm font-semibold text-brandBlue transition hover:-translate-y-[1px]"
                target="_blank"
                rel="noreferrer"
              >
                📍 Get Directions
              </a>
              <a
                href={`tel:${officeNumber}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-brandBlue px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px]"
              >
                📞 Office: 08649-255551
              </a>
              <a
                href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-[1px]"
                target="_blank"
                rel="noreferrer"
              >
                🛰️ Mobile/WA: +91 98661 95074
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-charcoal/10 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-sm text-charcoal/70 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="font-semibold text-charcoal">Sasidhar Gas Agency · LPG you can trust</p>
          <p>© 2024 Sasidhar Gas Agency. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-3">
        <a
          href={`tel:${officeNumber}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brandBlue text-white shadow-soft transition hover:scale-105"
        >
          📞
        </a>
        <a
          href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-soft transition hover:scale-105"
          target="_blank"
          rel="noreferrer"
        >
          💬
        </a>
        <button
          onClick={() => setChatOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brandRed text-white shadow-soft transition hover:scale-105"
        >
          💭
        </button>
      </div>

      {/* Chat widget */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-80 overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
          <div className="flex items-center justify-between bg-brandBlue px-4 py-3 text-white">
            <p className="text-sm font-semibold">Sasidhar Assistant</p>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="space-y-3 px-4 py-4 text-sm text-charcoal/75">
            <p>{t('chat_welcome')}</p>
            <div className="h-px bg-charcoal/10" />
            <ChatButton label="Book Cylinder" href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=Book Cylinder`} />
            <ChatButton label="New Connection" href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=New Connection`} />
            <ChatButton label="Register Complaint" href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=Complaint`} />
            <p className="pt-1 text-[11px] text-charcoal/50">
              (Integration ready: embed Dialogflow or preferred chatbot script here.)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function StaffCard({ name, area, phone }: { name: string; area: string; phone: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-charcoal/5">
      <div>
        <p className="text-base font-semibold text-charcoal">{name}</p>
        <p className="text-xs uppercase tracking-[0.14em] text-charcoal/50">{area}</p>
      </div>
      <a
        href={`tel:${phone}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brandBlue text-white shadow-sm transition hover:-translate-y-[1px]"
      >
        📞
      </a>
    </div>
  )
}

function ChatButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-charcoal/10 bg-white px-3 py-2 text-center text-sm font-semibold text-charcoal transition hover:-translate-y-[1px] hover:border-brandBlue/30"
    >
      {label}
    </a>
  )
}

export default App
