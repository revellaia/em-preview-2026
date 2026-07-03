# Motion e Microinterações - Relatório

## Achado original (Cline)

Ausência total de motion/microinterações na versão rejeitada - site
completamente estático.

## Implementado

1. **Reveal de seção** (`.reveal` + `IntersectionObserver`): seções entram
   com fade + translateY sutil (16px, 700ms, easing `cubic-bezier(0.16, 1,
   0.3, 1)`) ao entrarem no viewport.
2. **Linha de decisão animada** (`.decision-line`): traço com gradiente
   grafite-dourado que "desenha" via `stroke`/`transform: scaleX` quando a
   seção-pai entra em viewport.
3. **Indicador de progresso** (`#scroll-progress`): barra fina no topo,
   preenche conforme o scroll da página.
4. **Hover elegante**: mudança de temperatura de cor em links/botões
   (mantido do sistema original), agora com `transition` centralizada nos
   tokens `--motion-fast`/`--motion-base`.
5. **Cards com leve elevação** no hover (`translateY(-4px)`), reforçando
   profundidade sem exagero.

## Acessibilidade de movimento

Toda a implementação respeita `prefers-reduced-motion: reduce`:
- Regra global no final de `site.css` zera duração de transição/animação.
- JS (`initReveal`) verifica `window.matchMedia('(prefers-reduced-motion:
  reduce)')` e, se ativo, aplica `.in-view` a todas as seções imediatamente
  via JS, sem esperar scroll/observer - o conteúdo nunca fica invisível para
  quem desativou animações.

## Verificação automatizada

Teste Playwright `21. motion respeita prefers-reduced-motion`: cria um
contexto de navegador com `reducedMotion: 'reduce'`, aguarda 300ms e
confirma que toda seção `.reveal` está com opacidade > 0.9 (visível),
mesmo sem interação de scroll. 2/2 passando (uma execução por página).

## Nível de intensidade

Deliberadamente sutil, conforme pedido do Bruno ("não usar exagero"):
nenhuma animação de entrada com bounce/spring, nenhum parallax agressivo,
nenhuma animação maior que 700ms.
