# Edgar Mondadori - Evidência Visual para o Cline

## Por que este relatório existe

O Cline pausou a auditoria final pedindo para ver, com evidência real (não
descrição), o hero das duas páginas com o vídeo em reprodução, nos
formatos desktop, mobile (390/430) e com `prefers-reduced-motion`. Este
relatório entrega exatamente isso, com dados lidos diretamente do DOM via
Playwright - não há afirmação aqui que não tenha vindo de uma leitura real
do navegador.

## Screenshots gerados (8/8)

Ver `EDGAR_VIDEO_SCREENSHOTS_INDEX.md` para a tabela completa com caminho,
página, viewport e estado do vídeo de cada um. Resumo:

| Screenshot | Página | Viewport | Vídeo rodando? | Fallback usado? |
|---|---|---|---|---|
| `video-check-a.png` | A | Desktop 1440px | Sim (currentTime 2,69s) | Não |
| `video-check-b.png` | B | Desktop 1440px | Sim (currentTime 2,68s) | Não |
| `video-check-a-mobile-390.png` | A | 390px | Sim (currentTime 2,70s) | Não |
| `video-check-b-mobile-390.png` | B | 390px | Sim (currentTime 2,71s) | Não |
| `video-check-a-mobile-430.png` | A | 430px | Sim (currentTime 2,71s) | Não |
| `video-check-b-mobile-430.png` | B | 430px | Sim (currentTime 2,69s) | Não |
| `video-check-a-reduced-motion.png` | A | Desktop 1440px, reduced motion | Não (por design) | Sim - imagem still visível, 0 bytes de vídeo buscados |
| `video-check-b-reduced-motion.png` | B | Desktop 1440px, reduced motion | Não (por design) | Sim - textura/monograma sem camada de vídeo, 0 bytes buscados |

## Observações visuais (para a avaliação de percepção do Cline)

- **Página A (hero semi-principal):** o vídeo em movimento mostra Edgar em
  ângulos diferentes do frame still usado como poster - o resultado
  visual, mesmo em imagem estática (screenshot), já comunica profundidade
  adicional por causa do leve desfoque de movimento capturado no frame.
  Recomenda-se ao Cline abrir o arquivo HTML diretamente no navegador para
  avaliar a sensação de movimento real, já que um screenshot único
  necessariamente "congela" a experiência cinematográfica.
- **Página B (camada ambiente):** o vídeo aparece propositalmente sutil -
  um observador que não soubesse que há vídeo ali poderia não notar
  conscientemente, mas a cena deixa de ser 100% estática. Este é o
  comportamento pretendido (discrição), não uma falha de implementação.
- **Mobile 390/430:** a primeira dobra ficou mais compacta nesta mesma
  rodada (ver `EDGAR_FINAL_MICRO_POLISH_REPORT.md`) - os screenshots mobile
  já refletem o layout compactado, não o anterior.
- **Reduced motion:** confirma visualmente que a página permanece completa
  e legível sem nenhum vídeo - a foto still (Página A) e a textura/monograma
  (Página B) sustentam o hero sozinhos.

## Honestidade da evidência

Nenhum dado foi assumido ou estimado. Os valores de `currentTime`,
`readyState`, `paused` e `hasSource` vêm de `page.evaluate()` lendo o
elemento `<video>` real no DOM de cada página, no momento exato da
captura. Não houve necessidade de documentar um cenário de "vídeo não
avançou, fallback forçado" porque o Chromium headless deste ambiente
reproduziu o vídeo normalmente em todos os 6 casos com motion habilitado.

## Pendência para o Cline

Esta evidência resolve o bloqueio de "preciso ver screenshots reais" -
mas a avaliação final de **percepção** (a página realmente parece mais
cinematográfica, ou ainda parece "ensaio de estúdio com filtro"?) continua
sendo um julgamento que só o Cline pode emitir. Ver perguntas específicas
em `EDGAR_CLINE_REAUDIT_HANDOFF.md`.
