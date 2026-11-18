import { useEffect, useState } from 'react';
import { useLang } from '../i18n.jsx';

const REFRESH_MS = 30_000;

// Pergunta para /api/now-playing (Last.fm) o que o Alisson está ouvindo.
// Sem chave configurada ou se a API falhar, volta { status: 'off' } e o letreiro mostra o texto padrão.
function useNowPlaying() {
  const [data, setData] = useState({ status: 'off' });
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch('/api/now-playing')
        .then((r) => (r.ok ? r.json() : { status: 'off' }))
        .catch(() => ({ status: 'off' }))
        .then((d) => alive && setData(d));
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return data;
}

const LABELS = {
  playing: { pt: 'Tocando agora:', en: 'Now playing:' },
  recent: { pt: 'Alisson está escutando', en: 'Alisson is listening to' },
};

// Animação por cima do player (a imagem do cartão de info é um Windows Media Player).
// Coordenadas no palco 1920×1080; o cartão começa em (219, 161) com 489×738.
// O "Ready" e o botão da barra são cobertos com recortes da própria imagem e redesenhados animados.
export default function Player() {
  const { lang } = useLang();
  const now = useNowPlaying();

  const song = LABELS[now.status]
    ? `${LABELS[now.status][lang]} ${now.track}${now.artist ? ` — ${now.artist}` : ''}`
    : `${lang === 'pt' ? 'Tocando' : 'Now playing'}: alisson-bosa.mp3  •  03:14  •  128 kbps`;
  const text = `${song}      `;
  // a velocidade fica parecida não importa o tamanho do nome
  const duration = `${Math.max(10, text.length * 0.3)}s`;

  return (
    <div className="wmp pop" style={{ animationDelay: '120ms' }}>
      <p className="sr-only">{song}</p>
      <div className="wmp-status" aria-hidden="true">
        <span key={text} className="wmp-marquee" style={{ animationDuration: duration }}>
          {text}{text}
        </span>
      </div>

      {/* barra de progresso: tampa o botão original e desenha um que anda */}
      <span className="wmp-cover" aria-hidden="true" />
      <span className="wmp-fill" aria-hidden="true" />
      <span className="wmp-knob" aria-hidden="true" />

      {/* brilho no botão de play */}
      <span className="wmp-play" aria-hidden="true" />
    </div>
  );
}
