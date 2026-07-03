# Edgar Mondadori - Hero Video Upgrade

## Objetivo

Elevar a percepção de valor do hero usando o vídeo real do cliente
("12 segundos.mp4"), com o Nelore Água Fria Premium como régua de
percepção (não como modelo a copiar) - hero mais vivo, vídeo como elemento
nobre, sensação cinematográfica, sem comprometer OAB, performance ou
sobriedade jurídica.

## Referência aplicada (Nelore Água Fria Premium)

Do padrão `output/nelore-agua-fria-redesign/modelo-a-premium/`: vídeo de
fundo full-bleed com `autoplay muted loop playsinline`, `poster` como
fallback, overlay para legibilidade de texto. Adaptado ao contexto
jurídico: sem paralelismo agro, tom mais editorial/boardroom, vídeo tratado
em preto e branco (nunca colorido "institucional demais para o campo"),
menos saturado, mais contido.

## Implementação por página

### Página A (Autoridade Pessoal) - vídeo semi-principal

O vídeo substitui a imagem estática como camada dominante do hero,
mantendo o mesmo enquadramento e filtro grayscale já usado para a foto
still (`edgar-hero-authority-bw`). A imagem still permanece como `poster` e
como conteúdo real do `<picture>` por baixo do vídeo - camada de fallback
funcional, não apenas cosmética.

### Página B (Institucional) - vídeo discreto/ambiente

Conforme pedido explícito ("usar vídeo com mais discrição... se for pessoal
demais, usar apenas como detalhe visual"), o vídeo aqui **não** é elemento
de hero dominante: é uma camada de fundo (`.hero-video-ambient`) com
`blur(6px)`, `brightness(0.35)` e opacidade máxima de 0,4, atrás da
textura e do monograma, atuando como profundidade ambiente. O retrato
editorial secundário (recorte pequeno) continua sendo o único elemento de
rosto nítido da página, preservando o caráter institucional.

## Requisitos técnicos atendidos

- `muted`, `loop`, `playsinline`, sem `controls`.
- `preload="none"` no HTML - nenhum byte de vídeo é buscado até o JS
  decidir buscar.
- Nenhum atributo `autoplay` estático no HTML - habilitado via JS somente
  quando `prefers-reduced-motion` não estiver ativo (ver
  `EDGAR_VIDEO_PERFORMANCE_REVIEW.md`).
- `poster` (Página A) e imagem estática por baixo (ambas as páginas) como
  fallback real, não decorativo.
- Fonte mobile (480x854, ~550kbps) separada da fonte desktop (720x1280,
  ~1000kbps), escolhida via JS conforme `matchMedia('(max-width: 767px)')`.

## Bug real encontrado e corrigido durante esta implementação

Ao tornar a imagem/vídeo do hero da Página A posicionados via
`position: absolute` (necessário para sobrepor vídeo e imagem no mesmo
lugar), o contêiner `.hero-media` perdeu a altura que antes vinha do
próprio conteúdo em fluxo normal - o hero ficou com a área de imagem
completamente vazia (regressão visual real, pega por inspeção do
screenshot, não por nenhum teste automatizado). Corrigido definindo
`min-height: 60vh` (mobile) / `82vh` (desktop) diretamente em
`.hero-media`, restaurando a altura antes de qualquer teste ser
reexecutado. Suite completa re-rodada após a correção: 41/41 passando.

## Nota visual não bloqueante

Um dos cortes do vídeo mostra, desfocado ao fundo, um pôster/placa de
parede com texto parcialmente legível (não relacionado à advocacia,
aparenta ser decoração do estúdio de fotos). Com o filtro grayscale e o
enquadramento atual o texto fica ilegível e não compete com o conteúdo -
avaliado como risco zero, mas registrado para transparência.
