import Img from '../components/Img.jsx';
import { at } from '../components/Stage.jsx';
import { useLang, useT } from '../i18n.jsx';
import { projects } from '../data.js';

const COLS = [250, 740, 1230];

export default function Projects() {
  const { lang } = useLang();
  const t = useT();

  return (
    <>
      {lang === 'en' ? (
        <>
          <h1 className="sr-only">Projects</h1>
          <Img src="/assets/projects-title.png" x={681} y={150} w={568.5} h={176} />
        </>
      ) : (
        <h1 className="title-script centered pop" style={{ left: 965, top: 220 }}>
          <span className="cap">P</span>rojetos
        </h1>
      )}

      {projects.map((p, i) => {
        const Tag = p.href ? 'a' : 'div';
        const linkProps = p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {};
        return (
          <Tag
            key={p.id}
            className={`project pop ${p.href ? 'is-link' : ''}`}
            style={{ ...at(COLS[i], 356, 440, 543), animationDelay: `${100 + i * 110}ms` }}
            {...linkProps}
          >
            <img className="project-window" src="/assets/window.png" alt="" draggable="false" />
            <div className="project-card">
              <img src={p.card} alt="" draggable="false" />
              <p className="project-desc">{t(p.description)}</p>
            </div>
            <span className="sr-only">{p.name}</span>
          </Tag>
        );
      })}

      <Img src="/assets/cat-1.png" x={367} y={196} w={253} h={253} delay={460} className="wiggle" />
      <Img src="/assets/cat-3.png" x={1346} y={199} w={252} h={252} delay={520} className="wiggle" />
      {/* em português o gato fica mais baixo para não encostar na descrição do RFID */}
      <Img src="/assets/cat-2.png" x={lang === 'pt' ? 1067 : 1095} y={lang === 'pt' ? 860 : 853} w={130} h={135} delay={580} className="wiggle" />
    </>
  );
}
