import { useEffect, useRef, useState } from 'react';
import { useLang, useT } from '../i18n.jsx';
import { mobile as M, projects } from '../data.js';
import { useNowPlaying } from '../components/Player.jsx';
import '../mobile.css';

// A versão de celular segue o frame "Mobile" do Figma (402 de largura),
// escalado para a largura da tela. Coordenadas abaixo = coordenadas do Figma.
const W = 402;
const H = 1245;

// O inglês tem textos mais curtos, então no Figma algumas caixas ficaram mais baixas
// e os blocos de baixo subiram um pouco.
const LAYOUT = {
  pt: { bg3H: 1133, chat2H: 430, bio: [28, 302, 150], ps: [28, 582], links: [123, 594], infoH: 245, site: [0, 0], proj: [0, 0], work: [0, 0], player: 720.2 },
  en: { bg3H: 1122, chat2H: 405, bio: [26, 303, 154], ps: [26, 555], links: [121, 566], infoH: 226, site: [-1, -17], proj: [1, -29], work: [-2, -21], player: 697.2 },
};

const box = (x, y, w, h) => ({ left: x, top: y, width: w, height: h });

function useScale() {
  const get = () => window.innerWidth / W;
  const [s, setS] = useState(get);
  useEffect(() => {
    const on = () => setS(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return s;
}

// Conta a visita uma vez por navegador e mostra o total.
function useVisits() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let first = true;
    try {
      first = !localStorage.getItem('portfolio-visited');
    } catch { /* sem localStorage: conta de novo */ }
    fetch('/api/visits', { method: first ? 'POST' : 'GET' })
      .then((r) => r.json())
      .then((d) => {
        if (d.count == null) return;
        setCount(d.count);
        try { localStorage.setItem('portfolio-visited', '1'); } catch { /* ignore */ }
      })
      .catch(() => {});
  }, []);
  return count;
}

// Escreve a palavra letra por letra, espera, apaga e escreve de novo.
function Typewriter({ text }) {
  const [n, setN] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => { setN(0); setErasing(false); }, [text]);

  useEffect(() => {
    let delay;
    if (!erasing && n < text.length) delay = 130;
    else if (!erasing) delay = 2600; // palavra completa: segura um pouco
    else if (n > 0) delay = 60;
    else delay = 500; // vazio: pausa antes de recomeçar
    const id = setTimeout(() => {
      if (!erasing && n < text.length) setN(n + 1);
      else if (!erasing) setErasing(true);
      else if (n > 0) setN(n - 1);
      else setErasing(false);
    }, delay);
    return () => clearTimeout(id);
  }, [n, erasing, text]);

  return (
    <span className="m-typer" aria-label={text}>
      {/* a palavra invisível reserva o espaço, assim o texto não fica pulando no centro */}
      <span className="ghost" aria-hidden="true">{text}</span>
      <span className="typed" aria-hidden="true">{text.slice(0, n)}<i className="m-caret" /></span>
    </span>
  );
}

function Carousel({ style }) {
  const t = useT();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const n = projects.length;

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => setI((v) => (v + 1) % n), 3500);
    return () => clearTimeout(id);
  }, [i, paused, n]);

  const go = (d) => setI((v) => (v + d + n) % n);

  return (
    <div className="m-carousel" style={style}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
        setPaused(false);
      }}
      aria-roledescription="carousel"
    >
      <div className="m-carousel-track" style={{ transform: `translateX(${-i * 100}%)` }}>
        {projects.map((p, k) => {
          const Tag = p.href ? 'a' : 'div';
          const link = p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {};
          return (
            <Tag key={p.id} className="m-slide" aria-hidden={k !== i} tabIndex={k === i ? 0 : -1} {...link}>
              <img src={M.projectImages[p.id]} alt={p.name} draggable="false" />
              <span className="sr-only">{t(p.description)}</span>
            </Tag>
          );
        })}
      </div>
      <div className="m-dots">
        {projects.map((p, k) => (
          <button key={p.id} type="button" className={k === i ? 'on' : ''} aria-label={p.name} onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  );
}

function MiniPlayer({ top }) {
  const t = useT();
  const now = useNowPlaying();
  const live = now.status === 'playing' || now.status === 'recent';
  const song = live ? now.track : M.player.fallback.song;
  const artist = live ? now.artist : M.player.fallback.artist;
  const long = song.length > 15;

  return (
    <div className="m-player" style={{ left: 226, top }}>
      <div className="m-player-bar">
        <span>{t(M.player.title)}</span>
        <i aria-hidden="true">×</i>
      </div>
      <div className="m-player-body">
        <div className="m-player-song">
          <div className="m-player-cover">
            {live && now.image ? <img src={now.image} alt="" /> : <span aria-hidden="true">♪</span>}
          </div>
          <div className="m-player-text">
            <p className="m-player-label">{t(M.player.label)}</p>
            <p className="m-player-title">
              <span className={long ? 'scroll' : ''} style={long ? { animationDuration: `${Math.max(6, song.length * 0.35)}s` } : undefined}>
                {song}{long && <>&nbsp;&nbsp;&nbsp;&nbsp;{song}&nbsp;&nbsp;&nbsp;&nbsp;</>}
              </span>
            </p>
            <p className="m-player-artist">{artist}</p>
          </div>
        </div>
        <div className="m-player-progress" aria-hidden="true"><span className="fill" /><span className="knob" /></div>
        <div className="m-player-time" aria-hidden="true"><span>1:24</span><span>3:14</span></div>
        <div className="m-player-ctrl" aria-hidden="true">
          <span className="b small prev" /><span className="b play" /><span className="b small next" />
        </div>
      </div>
    </div>
  );
}

export default function MobileSite() {
  const { lang, setLang } = useLang();
  const t = useT();
  const s = useScale();
  const visits = useVisits();
  const [alertOpen, setAlertOpen] = useState(false);
  const L = LAYOUT[lang];
  const [sx, sy] = L.site, [px, py] = L.proj, [wx, wy] = L.work;

  // a página do celular rola; a do computador não
  useEffect(() => {
    document.body.classList.add('is-mobile');
    return () => document.body.classList.remove('is-mobile');
  }, []);

  const scrollTo = (y) => window.scrollTo({ top: Math.max(0, y * s - 8), behavior: 'smooth' });

  return (
    <>
      <div className="m-wrap" style={{ height: H * s }}>
        <div className={`m-canvas lang-${lang}`} style={{ transform: `scale(${s})` }}>
          <div className="m-bg" />
          <div className="m-panel" style={box(12, 79, 379, L.bg3H)} />

          {/* barra de título e menu, estilo Windows XP */}
          <header className="m-titlebar">
            <img src="/assets/m/title-icon.png" alt="" style={box(6, 8, 21, 18)} />
            <span className="m-title">Alisson Bosa</span>
            <span className="m-winbtn" style={{ left: 304 }} aria-hidden="true">–</span>
            <span className="m-winbtn" style={{ left: 333 }} aria-hidden="true">□</span>
            <span className="m-winbtn close" style={{ left: 362 }} aria-hidden="true">×</span>
          </header>
          <nav className="m-menu">
            <button type="button" onClick={() => scrollTo(294)}>{t(M.menu.file)}</button>
            <button type="button" onClick={() => setAlertOpen(true)}>{t(M.menu.edit)}</button>
            <button type="button" onClick={() => scrollTo(859 + py - 20)}>{t(M.menu.view)}</button>
            <button type="button" onClick={() => scrollTo(1105 + wy - 40)}>{t(M.menu.help)}</button>
            <div className="m-lang" role="group" aria-label={lang === 'pt' ? 'Idioma' : 'Language'}>
              {['en', 'pt'].map((l) => (
                <button key={l} type="button" className={lang === l ? 'on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>

          {/* perfil */}
          <div className="m-photo-frame" style={box(17, 98, 171, 177)} />
          <img className="abs" src="/assets/m/photo.png" alt="Alisson" style={box(33, 112, 139, 149)} />
          <h1 className="m-name" style={{ left: 206, top: 116 }}>Alisson</h1>
          <p className="m-age" style={{ left: 206, top: 152 }}>{t(M.age)}</p>
          <p className="m-meta" style={{ left: 206, top: 168 }}>{t(M.firstOnline)}</p>
          <p className="m-meta" style={{ left: 206, top: 180 }}>{t(M.lastSeen)}</p>

          {/* chat estilo MSN */}
          <div className="m-chat" style={box(202, 232, 180, 192.6)}>
            {t(M.chat).map(([who, text], k) => (
              <p key={k}>
                <b className={who}>{who === 'user' ? 'User:' : 'Alisson:'}</b> {text}
              </p>
            ))}
          </div>
          <img className="abs float" src="/assets/m/globe.png" alt="" style={box(318, 201, 79, 79)} />

          {/* bio */}
          <section className="m-bio-card" style={box(17, 294, 171, L.chat2H)} aria-label="bio">
            <h2 className="m-bio-title" style={{ left: L.bio[0] - 17, top: L.bio[1] - 294 }}>bio</h2>
            <div className="m-bio" style={{ left: L.bio[0] - 17, top: L.bio[1] + 19 - 294, width: L.bio[2] }}>
              {t(M.bio).map((p, k) => <p key={k}>{p}</p>)}
            </div>
            <img className="abs" src="/assets/m/ps-cover.png" alt="" style={box(L.ps[0] - 17, L.ps[1] - 294, 88, 128)} />
            {M.links.map((l, k) => (
              <a key={l.label} className="m-pill" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ ...box(L.links[0] - 17, L.links[1] - 294 + k * 37, 59, 29), background: l.color }}>
                {l.label}
              </a>
            ))}
          </section>

          {/* ficha técnica */}
          <section className="m-info" style={box(201, 455, 181, L.infoH)}>
            <h2 className="m-info-title">{t(M.factSheet)}</h2>
            <dl>
              {M.info.map((it) => (
                <div key={it.value.en ?? it.value}>
                  <dt>{t(it.label)}</dt>
                  <dd>{t(it.value)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <MiniPlayer top={L.player} />

          {/* site status */}
          <div className="m-status" style={box(35 + sx, 743 + sy, 180, 157)}>
            <p className="m-status-title">{M.status.title}</p>
            <p className="m-status-sub">{t(M.status.visitor)}</p>
            <p className="m-status-count">{visits ?? '…'}</p>
          </div>
          <img className="abs wobble over-projects" src="/assets/m/phone.png" alt="" style={box(4 + sx, 823 + sy, 98.7, 122.9)} />
          <img className="abs over-projects" src="/assets/m/emoji.png" alt="" style={box(137 + sx, 826 + sy, 64, 66)} />

          {/* projetos */}
          <section className="m-projects" style={box(101 + px, 888 + py, 283, 220)} aria-label={t(M.projectsTitle)}>
            <h2 className="m-projects-title" style={box(125, 12, 150, 21)}><Typewriter text={t(M.projectsTitle)} /></h2>
            <div className="m-projects-window" style={box(11, 41, 264, 161)} />
            <Carousel style={box(40, 54, 206, 136)} />
          </section>
          <img className="abs" src="/assets/m/folder.png" alt="" style={box(338 + px, 1076 + py, 59, 50)} />

          {/* trabalho */}
          <a className="m-work" href={M.email} style={box(28 + wx, 1131 + wy, 224.9, 50.2)}>{t(M.work)}</a>
          <a className="abs m-envelope" href={M.email} aria-label="E-mail" style={box(197 + wx, 1126 + wy, 90.3, 86)}>
            <img src="/assets/m/envelope.png" alt="" />
          </a>

          {/* barra de tarefas */}
          <footer className="m-taskbar">
            <button type="button" className="m-start" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/assets/m/start-icon.png" alt="" />
              {t(M.exit)}
            </button>
          </footer>
        </div>
      </div>

      {alertOpen && (
        <div className="m-alert-bg" onClick={() => setAlertOpen(false)}>
          <div className="m-alert" role="alertdialog" aria-modal="true" aria-labelledby="m-alert-t" onClick={(e) => e.stopPropagation()}>
            <div className="m-alert-bar">
              <span id="m-alert-t">{t(M.editAlert.title)}</span>
              <button type="button" aria-label="Fechar" onClick={() => setAlertOpen(false)}>×</button>
            </div>
            <div className="m-alert-body">
              <span className="m-alert-icon" aria-hidden="true">!</span>
              <p>{t(M.editAlert.text)}</p>
            </div>
            <button type="button" className="m-alert-ok" autoFocus onClick={() => setAlertOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
