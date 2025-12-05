import { create } from 'zustand';
import { translations } from '@/i18n/translations';

type Language = 'en' | 'ta';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang: Language) => set({ language: lang, t: translations[lang] }),
  t: translations.en,
}));
