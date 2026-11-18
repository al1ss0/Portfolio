import Img from '../components/Img.jsx';
import { at } from '../components/Stage.jsx';
import { useLang, useT } from '../i18n.jsx';
import { contacts, contact, whatsappNumber, whatsappMessage } from '../data.js';

export default function Contact() {
  const { lang } = useLang();
  const t = useT();
  const messageHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t(whatsappMessage))}`;
  const [line1, line2] = t(contact.intro);

  return (
    <>
      {lang === 'en' ? (
        <>
          <h1 className="sr-only">Let’s work together</h1>
          <Img src="/assets/lwt-title.png" x={365.5} y={215.7} w={1207} h={102.5} />
        </>
      ) : (
        <h1 className="title-pixel pop" style={{ left: 959.5, top: 196 }}>
          Vamos trabalhar juntos
        </h1>
      )}

      {/* a janela flutua de leve, com o cursor piscando no fim do texto e o botão pulsando */}
      <div className="lwt-window">
      <Img src="/assets/lwt-shadow.png" x={286} y={494} w={601} h={344} delay={80} />
      <Img src="/assets/lwt-window-bg.png" x={255} y={343} w={702} h={572} delay={80} />
      <div
        className={`intro pop ${lang}`}
        style={{ ...at(314, 524, 565, 267), animationDelay: '80ms' }}
      >
        <p>{line1}</p>
        <p>{line2}<span className="caret" /></p>
      </div>

      <a
        className="btn btn-grey btn-pulse"
        href={messageHref}
        target="_blank"
        rel="noreferrer"
        style={{ ...(lang === 'pt' ? { left: 630, top: 822, height: 78 } : { left: 627, top: 819, height: 84 }), animationDelay: '260ms' }}
      >
        {t(contact.button)}
      </a>
      </div>

      <ul className="contacts">
        {contacts.map((c, i) => (
          <li key={c.value}>
            <a
              className="contact-row pop"
              href={c.href}
              target="_blank"
              rel="noreferrer"
              style={{ ...at(1102, 421 + i * 94, 560, 76), animationDelay: `${160 + i * 80}ms` }}
            >
              <span className="contact-label">{t(c.label)}</span>
              <span className="contact-value">{c.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
