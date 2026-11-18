import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Stage from './components/Stage.jsx';
import Tabs from './components/Tabs.jsx';
import LangToggle from './components/LangToggle.jsx';
import { LangProvider, useLang } from './i18n.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';

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

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
