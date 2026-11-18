import { NavLink } from 'react-router-dom';
import { at } from './Stage.jsx';
import { useLang, useT } from '../i18n.jsx';
import { tabs as labels } from '../data.js';

// Formatos das abas copiados dos vetores do Figma.
const SHAPES = {
  name: 'M62.3 86.8L0 202.9L62.3 0L459.1 0L523.2 202.9L459.1 85.5Z',
  about: 'M45.9 0L262.5 0L307.2 107.7L262.5 82.8L0 82.8Z',
  contact: 'M69.4 0L396.6 0L464 107.7L396.6 82.8L0 82.8Z',
  // em português a aba vira "Contatos", mais estreita
  contactPt: 'M40.2 0L229.9 0L269 108L229.9 83L0 83Z',
  // aba lateral, já girada 90°
  side: 'M0 236.1L0 40.4L97.9 0L75.2 40.4L75.2 277.6Z',
};

const TABS = [
  // o nome fica um pouco mais alto que no Figma, para respirar acima do cartão azul
  { to: '/', key: 'home', shape: 'name', box: at(335.8, 55.5, 523.2, 202.9), text: at(471, 58, 265, 51), size: 45, italic: true },
  { to: '/about', key: 'about', shape: 'about', box: at(859, 61, 307.2, 107.7), text: at(918.6, 64, 188.5, 47.6), size: 35 },
  { to: '/contact', key: 'contact', shape: 'contact', box: at(1168, 61, 464, 107.7), text: at(1234.5, 64, 348, 48), size: 35 },
  { to: '/projects', key: 'projects', shape: 'side', box: at(100, 267, 97.9, 277.6), text: at(57, 383, 161, 43), size: 35, vertical: true },
];

const CONTACT_PT = { shape: 'contactPt', box: at(1185, 61, 269, 108), text: at(1250, 64, 135.6, 48) };

export default function Tabs() {
  const t = useT();
  const { lang } = useLang();
  const tabs = TABS.map((tab) => (tab.key === 'contact' && lang === 'pt' ? { ...tab, ...CONTACT_PT } : tab));
  return (
    <nav className="tabs" aria-label="Main">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}>
          <svg
            className="tab-shape"
            style={tab.box}
            viewBox={`0 0 ${tab.box.width} ${tab.box.height}`}
            aria-hidden="true"
          >
            <path d={SHAPES[tab.shape]} />
          </svg>
          <span
            className={`tab-label ${tab.italic ? 'italic' : ''} ${tab.vertical ? 'vertical' : ''}`}
            style={{ ...tab.text, fontSize: tab.size }}
          >
            {t(labels[tab.key])}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
