# Alisson Bosa — Portfolio

Portfólio pessoal feito em React + Vite, a partir do design no Figma (página **Web**).

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:5173.

## Telas

| Rota | Tela |
|---|---|
| `/` | Home |
| `/about` | About me |
| `/projects` | Projects |
| `/contact` | Let's Work Together |

## Onde mexer

- **Links, contatos, WhatsApp, projetos:** `src/data.js`
- **Currículo:** `public/cv-alisson-bosa-pt.pdf` e `public/cv-alisson-bosa-en.pdf`
- **Imagens exportadas do Figma:** `public/assets/`
- **Cores e fontes:** topo de `src/styles.css`

## Música tocando (Last.fm)

O player do "About me" mostra o que está tocando agora (ou a última música) pelo Last.fm.

1. Copie `.env.local.example` para `.env.local` e preencha `LASTFM_API_KEY` e `LASTFM_USER`.
2. Reinicie o `npm run dev`.

Sem chave, o letreiro mostra o texto padrão. Para testar sem conta, use `LASTFM_MOCK=playing` no `.env.local`.
Quando publicar (ex.: Vercel), a função `api/now-playing.js` faz o mesmo papel; configure as duas variáveis lá.

O layout é desenhado em 1920×1080 (igual ao frame do Figma) e escala para caber na tela.
Só versão desktop por enquanto.
