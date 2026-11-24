import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Stage from './components/Stage.jsx';
import Tabs from './components/Tabs.jsx';
import LangToggle from './components/LangToggle.jsx';
import { LangProvider, useLang } from './i18n.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';

// a versão de celular só é baixada no celular
const MobileSite = lazy(() => import('./mobile/MobileSite.jsx'));

function Site() {
  const location = useLocation();
  const { lang } = useLang();

  return (
    <Stage>
      <Tabs />
      <div className="card" aria-hidden="true" />
      {/* trocar de tela ou de idioma refaz a animação de entrada */}
      <main key={`${location.pathname}-${lang}`} className={`page lang-${lang}`}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <LangToggle />
    </Stage>
  );
}

// Celular em pé usa a versão mobile (frame "Mobile" do Figma); o resto usa o palco 1920×1080.
const MOBILE_QUERY = '(max-width: 767px)';

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

export default function App() {
  const mobile = useIsMobile();
  return (
    <LangProvider>
      {mobile ? (
        <Suspense fallback={null}>
          <MobileSite />
        </Suspense>
      ) : (
        <Site />
      )}
    </LangProvider>
  );
}
