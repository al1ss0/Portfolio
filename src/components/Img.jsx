import { at } from './Stage.jsx';

// Imagem exportada do Figma, posicionada nas coordenadas do frame.
// `delay` escalona a animação de entrada.
export default function Img({ src, alt = '', x, y, w, h, delay = 0, className = '' }) {
  return (
    <img
      className={`abs pop ${className}`}
      src={src}
      alt={alt}
      style={{ ...at(x, y, w, h), animationDelay: `${delay}ms` }}
      draggable="false"
    />
  );
}
