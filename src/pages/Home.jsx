import { useEffect, useRef } from 'react';
import Img from '../components/Img.jsx';
import { at } from '../components/Stage.jsx';
import { useLang } from '../i18n.jsx';

// brilhos que piscam por cima das estrelas (posições no frame do Figma)
const SPARKLES = [
  [1560, 270, 0], [1700, 300, 0.7], [1645, 395, 1.4], [1745, 470, 0.35],
  [1610, 520, 1.05], [1700, 585, 1.75], [1570, 445, 2.1],
];

function Sparkle({ x, y, delay }) {
  return (
    <svg className="sparkle" style={{ ...at(x - 14, y - 14, 28, 28), animationDelay: `${delay}s` }} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 0C54 38 62 46 100 50C62 54 54 62 50 100C46 62 38 54 0 50C38 46 46 38 50 0Z" />
    </svg>
  );
}

export default function Home() {
  const { lang } = useLang();
  const ref = useRef(null);

  // parallax: a foto e as estrelas seguem o mouse em direções opostas
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={ref} className="home">
      <h1 className="sr-only">
        {lang === 'pt'
          ? 'Alisson Bosa — Portfólio. Design Engineer, sem precisar escolher entre design e código.'
          : 'Alisson Bosa — Portfolio. Design Engineer, building my path between design and code.'}
      </h1>
      <Img src="/assets/home-title.png" x={227} y={184} w={856} h={444.5} />

      {lang === 'en' ? (
        <Img src="/assets/home-phrase.png" x={241} y={700} w={800} h={179.5} delay={240} />
      ) : (
        <Img src="/assets/home-phrase-pt.png" x={227} y={700} w={821} h={164.25} delay={240} />
      )}

      <Img src="/assets/home-sub.png" x={844} y={200} w={553} h={127} delay={180} />

      <div className="parallax photo-layer">
        <Img
          src="/assets/home-photo-only.png"
          alt={lang === 'pt' ? 'Selfie em preto e branco do Alisson' : 'Black and white selfie of Alisson'}
          x={1065}
          y={101}
          w={686.5}
          h={864}
          delay={60}
          className="breathe"
        />
      </div>
      <div className="parallax stars-layer">
        <Img src="/assets/stars.png" x={1520} y={241} w={250} h={378.5} delay={300} className="stars" />
        {SPARKLES.map(([x, y, d]) => (
          <Sparkle key={`${x}-${y}`} x={x} y={y} delay={d} />
        ))}
      </div>

      {lang === 'pt' ? (
        <Img src="/assets/mouse.png" x={740} y={807} w={118.6} h={117.5} delay={420} className="float" />
      ) : (
        <Img src="/assets/mouse.png" x={760} y={823} w={144} h={142.5} delay={420} className="float" />
      )}
    </div>
  );
}
