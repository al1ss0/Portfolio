import { useLang } from '../i18n.jsx';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={lang === 'pt' ? 'Idioma' : 'Language'}>
      {['en', 'pt'].map((l) => (
        <button key={l} type="button" className={lang === l ? 'is-active' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
