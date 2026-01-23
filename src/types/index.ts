export type Language = "en" | "te";

export interface Translations {
  [key: string]: string;
}

export interface TranslationDict {
  en: Translations;
  te: Translations;
}

export interface QuickActionItem {
  icon: string;
  labelKey: string;
  href: string | null;
  topic: string | null;
}

export interface StaffMember {
  name: string;
  area: string;
  phone: string;
}

export interface ProductItem {
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  whatsappText: string;
}

export interface ContactInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  officeNumber: string;
  whatsappNumber: string;
  fireStationNumber: string;
  mapsUrl: string;
}
