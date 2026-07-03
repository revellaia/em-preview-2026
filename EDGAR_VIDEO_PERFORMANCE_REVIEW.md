# Edgar Mondadori - Revisão de Performance do Vídeo de Hero

## Fonte original vs. otimizada

| Versão | Resolução | Bitrate | Áudio | Duração | Tamanho |
|---|---|---|---|---|---|
| Original (`12 segundos.mp4`) | 720x1280 | 2231 kb/s (vídeo+áudio) | AAC 98kb/s stereo | 12,47s | ~3,48 MB |
| Desktop (`edgar-hero-video-desktop.mp4`) | 720x1280 | ~1000 kb/s, max 1100k | Removido | 12,47s | 1,36 MB |
| Mobile (`edgar-hero-video-mobile.mp4`) | 480x854 | ~550 kb/s, max 650k | Removido | 12,47s | 0,77 MB |

Codec: H.264 (profile main), `yuv420p`, `-movflags +faststart` (permite
início de reprodução antes do download completo). Encodado com
`ffmpeg-static` (binário Node, já que o sistema não tem `ffmpeg` no PATH -
mesma ferramenta usada para os frames still da reconstrução anterior).

## Estratégia de carregamento (impacto em LCP)

1. `preload="none"` no HTML - o `<video>` não inicia nenhum download até o
   JavaScript decidir.
2. A imagem still (`edgar-hero-authority-bw-*.jpg/webp`, já otimizada e
   com `fetchpriority="high"`) continua sendo o elemento visível no
   primeiro paint - ela é o LCP real da página, não o vídeo.
3. O vídeo só recebe `<source>` via JS após o carregamento inicial da
   página, e só se `prefers-reduced-motion` não estiver ativo - ou seja,
   o maior recurso de rede (vídeo) nunca compete com o carregamento crítico
   inicial nem com o cálculo de LCP.
4. Fade-in de opacidade (`--motion-slow`, 700ms) evita troca abrupta entre
   still e vídeo quando ele fica pronto.

## Bandwidth mobile

Usuários mobile recebem a variante de 0,77MB (480x854, ~550kbps), não a de
1,36MB - decisão tomada via `matchMedia('(max-width: 767px)')` no momento
da escolha da fonte, antes de qualquer download começar.

## Usuários com `prefers-reduced-motion: reduce`

**Zero bytes de vídeo são baixados.** A função `initHeroVideo()` retorna
imediatamente se a media query de redução de movimento estiver ativa -
nenhum `<source>` é criado, nenhuma requisição de rede parte para o
arquivo de vídeo. Verificado por teste automatizado (`4/9`): com contexto
`reducedMotion: 'reduce'`, `querySelectorAll('source')` no elemento de
vídeo retorna 0 elementos.

## Autoplay bloqueado pelo navegador

Alguns navegadores/configurações bloqueiam autoplay mesmo com `muted`. A
implementação trata isso com uma Promise `.catch()` silenciosa - se
`video.play()` for rejeitado, nenhum erro aparece no console e a imagem
still (por baixo do vídeo, sempre presente no DOM) permanece visível
normalmente. Comportamento verificado no teste `1/2` (0 console errors) em
ambas as páginas.

## Peso total da primeira visita (Página A, desktop, motion habilitado)

Imagem still (WebP, ~1400px) + vídeo desktop (1,36MB) + CSS/JS (~15KB
combinados) - o vídeo é, de longe, o maior recurso, mas carrega de forma
não bloqueante e após o conteúdo crítico, conforme descrito acima.

## Veredito

Sem bloqueio de performance identificado. Estratégia de carregamento
adiado + variante mobile menor + respeito total a `prefers-reduced-motion`
atendem aos requisitos técnicos pedidos (preload adequado, não pesar
demais, não quebrar LCP de forma absurda).

## Adendo - Evidência real de reprodução (2026-07-02)

Capturado via `page.evaluate()` em Chromium headless, sem estimativa: em
desktop e em mobile (390/430px), o vídeo atinge `readyState: 4`
(`HAVE_ENOUGH_DATA`) e `currentTime` avança normalmente (~2,7s após 2s de
espera), confirmando que a estratégia de carregamento adiado não impede a
reprodução real em nenhum dos breakpoints testados. Com
`prefers-reduced-motion: reduce`, confirmado `hasSource: false` e
`currentTime: 0` em ambas as páginas - zero requisições de rede para o
vídeo. Dados brutos completos em `EDGAR_VIDEO_SCREENSHOTS_INDEX.md`.

## Adendo - Compactação mobile (Página A)

A altura mínima do vídeo/imagem no hero da Página A foi reduzida de 60vh
para 40vh em telas ≤480px (ver `EDGAR_FINAL_MICRO_POLISH_REPORT.md`) - isso
reduz proporcionalmente a área de vídeo renderizada em mobile, o que também
diminui o custo de decodificação de frame nesses dispositivos (menos
pixels a compor por frame), um benefício de performance incidental ao
ajuste de layout.
