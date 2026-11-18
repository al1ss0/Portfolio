import { createContext, useContext, useEffect, useState } from 'react';

const LangContext = createContext({ lang: 'en', setLang: () => {} });
const KEY = 'portfolio-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    /* sem localStorage: segue o idioma do navegador */
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// Escolhe o texto do idioma atual: t({ en: '...', pt: '...' })
export function useT() {
  const { lang } = useLang();
  return (obj) => (obj && typeof obj === 'object' && lang in obj ? obj[lang] : obj);
}
