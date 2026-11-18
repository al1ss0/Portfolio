import { useEffect, useState } from 'react';

// O layout é desenhado em 1920×1080, igual ao frame do Figma,
// e escalado para caber na janela sem distorcer.
export const STAGE_W = 1920;
export const STAGE_H = 1080;

function fitScale() {
  return Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
}

export default function Stage({ children }) {
  const [scale, setScale] = useState(fitScale);

  useEffect(() => {
    const onResize = () => setScale(fitScale());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="viewport">
      <div
        className="stage"
        style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

// Posição absoluta em coordenadas do Figma.
export const at = (x, y, w, h) => ({ left: x, top: y, width: w, height: h });
