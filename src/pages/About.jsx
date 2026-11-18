import Img from '../components/Img.jsx';
import Player from '../components/Player.jsx';
import { at } from '../components/Stage.jsx';
import { useLang, useT } from '../i18n.jsx';
import { about, cvFile } from '../data.js';

// posição de cada rótulo e valor do cartão no Figma (versão PT)
const INFO_LABEL_Y = [276, 397, 515, 633];
const INFO_VALUE_Y = [317, 435, 553, 671];

// caixas da bio em português, com x e largura do Figma: [x, linha inicial, largura, alinhamento]
// o y sai da linha inicial, assim todas as linhas ficam com o mesmo espaçamento
const BIO_LINE = 40.8; // 34px × 1.2
const BIO_PT = [
  [859, 0, 849, 'right'], // 3 linhas
  [1071, 3, 595, 'right'],
  [1071, 4, 660, 'left'], // 2 linhas; um pouco mais larga que no Figma para o "de" não cair sozinho
  [1107, 6, 601, 'left'],
  [1090, 7, 580, 'right'], // 2 linhas
];

export default function About() {
  const { lang } = useLang();
  const t = useT();
  const bio = t(about.bio);

  return (
    <>
      {lang === 'en' ? (
        <>
          <h1 className="sr-only">About me</h1>
          <Img src="/assets/about-title.png" x={753.8} y={163.2} w={656.5} h={160.5} />
          <Img
            src="/assets/about-info.png"
            alt="Based in Passo Fundo, BR. Studying Computer Science. Currently looking for an internship. In 3 words: intense, loyal and fun."
            x={219} y={161} w={489} h={738} delay={80}
          />
        </>
      ) : (
        <>
          <h1 className="sr-only">Sobre mim</h1>
          <Img src="/assets/about-title-pt.png" x={741.7} y={143.9} w={694.3} h={328.8} />
          <Img src="/assets/about-info-bg.png" x={219} y={161} w={489} h={738} delay={80} />
          <dl className="info pop" style={{ animationDelay: '80ms' }}>
            {about.info.map((row, i) => (
              <div key={row.label}>
                <dt style={at(286, INFO_LABEL_Y[i], 357, 36)}>{row.label}</dt>
                <dd style={at(286, INFO_VALUE_Y[i], 357, 80)}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <Player />

      {lang === 'en' ? (
        <Img
          src="/assets/about-paint.png"
          alt="Photo of Alisson inside a Paint window"
          x={427} y={408} w={634.5} h={672} delay={200} className="tilt"
        />
      ) : (
        <Img
          src="/assets/about-paint-pt.png"
          alt="Foto do Alisson dentro de uma janela do Paint"
          x={532} y={432} w={603.8} h={648} delay={200} className="tilt"
        />
      )}

      {lang === 'en' ? (
        // No Figma a bio são duas caixas: a primeira mais larga, a segunda recuada para não bater no Paint
        <div className="bio pop" style={{ animationDelay: '140ms' }}>
          <p style={at(867, 370, 833, 95)}>{bio[0]}</p>
          <p style={at(1002, 465, 698, 330)}>{bio[1]}</p>
        </div>
      ) : (
        <div className="bio pt pop" style={{ animationDelay: '140ms' }}>
          {BIO_PT.map(([x, line, w, align], i) => (
            <p key={i} style={{ left: x, top: 397 + line * BIO_LINE, width: w, textAlign: align }}>{bio[i]}</p>
          ))}
        </div>
      )}

      <a
        className={`btn btn-white pop ${lang === 'pt' ? 'upright' : ''}`}
        href={t(cvFile)}
        download
        style={lang === 'pt'
          ? { left: 1380, top: 831, height: 68, animationDelay: '260ms' }
          : { left: 1379, top: 794, height: 68, animationDelay: '260ms' }}
      >
        {t(about.cvButton)}
      </a>
    </>
  );
}
