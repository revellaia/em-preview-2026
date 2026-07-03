# Edgar Mondadori - QA Playwright (Reconstrução)

Suite: `playwright/edgar-rebuild.spec.js` · **41 testes · 41/41 passando**
(execução real, ~42s). Atualizado após o micro polish pós-reauditoria
Codex (garantem/mobile) - mesma contagem de testes, regex de termos
proibidos ampliada dentro do teste `16/17` existente (4 padrões novos:
`garantem`, `garantia`, `garantido`, "blindagem garantida" isolados).

## Atualização - Micro Polish pós-Codex (2026-07-02)

| Item pedido | Verificação | Resultado |
|---|---|---|
| 8. 0 ocorrências de "garantem" | regex `\bgarantem\b` dentro do teste `16/17` | OK, 0 ocorrências |
| 11. Mobile Página A mais compacto | inspeção visual de `screenshots/video-check-a-mobile-390.png` e `-430.png`, headline/subheadline/CTA agora na primeira dobra | OK |
| 12. Página B continua premium | screenshot desktop revisado, hero institucional/bento/governança intactos | OK |
| 13. OAB continua seguro | teste `16/17` ampliado + `19` (registro discreto) | OK |
| 14. Sem regressão desktop | `screenshots/video-check-a.png` (1440px) comparado visualmente ao estado anterior, idêntico | OK |

Suite completa re-rodada após os 2 ajustes: 41/41 passando, nenhum teste
novo necessário além da ampliação do regex existente (os ajustes eram
correções pontuais, não features novas exigindo cobertura própria).

## Atualização - Hero Video Upgrade

Testes novos adicionados para cobrir a validação pedida no upgrade de
vídeo:

| Item do pedido | Teste | Resultado |
|---|---|---|
| 3. Vídeo roda no hero | `3/5/6.` confirma `<source>` correto anexado | OK |
| 4. Vídeo tem fallback | `4/9.` confirma que a estrutura de fallback (imagem still sempre no DOM) se mantém | OK |
| 5. Vídeo não aparece com controles | `3/5/6.` `hasAttribute('controls')` === false | OK |
| 6. Vídeo não gera console errors | `3/5/6.` listener de console, 0 erros | OK |
| 7. Mobile não quebra | teste dedicado `mobile: video de hero usa a fonte mobile otimizada` | OK |
| 9. `prefers-reduced-motion` respeitado | `4/9.` com contexto `reducedMotion: reduce`, 0 `<source>` carregadas | OK |
| 13. Screenshots do hero salvos | `screenshots/video-check-a.png`, `screenshots/video-check-b.png` gerados manualmente após dar tempo de reprodução (1,8s), revisados visualmente | OK |

Bug real encontrado e corrigido durante esta atualização (não pelo teste
automatizado, mas por inspeção visual do screenshot): `.hero-media`
colapsava para altura zero após o vídeo/imagem virarem `position: absolute`
- corrigido com `min-height` explícito. Ver `EDGAR_HERO_VIDEO_UPGRADE_REPORT.md`.

## Resultado original (antes do upgrade de vídeo)

Suite: `playwright/edgar-rebuild.spec.js` · 35 testes · **35/35 passando**
(execução real, ~53s).

## Cobertura dos 25 itens pedidos no briefing

| # | Item | Como foi testado | Resultado |
|---|---|---|---|
| 1 | Página A carrega | 0 console/page errors, 0 failed requests | OK |
| 2 | Página B carrega | idem | OK |
| 3 | Menu desktop | `.nav-links`/`.nav-cta` visíveis >=900px | OK |
| 4 | Menu mobile | hamburger + `#nav-mobile.open` em 390/430/768 | OK |
| 5 | CTAs | `[data-open-contact]` testado em ambas as páginas | OK |
| 6 | Modal/contato | abre, painel de status visível, foco, ESC, fecha | OK |
| 7 | Imagens | `naturalWidth > 0` para todas | OK |
| 8 | Nenhum asset quebrado | idem | OK |
| 9 | 0 console errors críticos | listener `console` tipo error | OK |
| 10 | 0 page errors | listener `pageerror` | OK |
| 11 | 0 failed requests críticos | listener `requestfailed` | OK |
| 12 | 0 overflow | `scrollWidth - innerWidth <= 2px`, 6 viewports | OK |
| 13 | Sem `href="#"` | 0 ocorrências | OK |
| 14 | Sem links falsos | 0 `<a>` sem `href` válido | OK |
| 15 | Sem CSS inline | leitura de arquivo bruto, 0 `style="` | OK |
| 16 | Sem travessão longo | 0 `—` no texto renderizado | OK |
| 17 | Sem termos OAB proibidos | regex contra lista de termos | OK |
| 18 | Sem foto da aeronave como hero | 0 `<img>` com "aeronave" no src, em qualquer lugar | OK |
| 19 | Sem "registro a confirmar" como dado final | só em `.footer-oab-discrete`, ausente do hero/CTA | OK |
| 20 | Sem formulário placeholder quebrado | painel de status visível antes do preenchimento, link Instagram sempre visível | OK |
| 21 | Motion respeita `prefers-reduced-motion` | contexto com `reducedMotion: 'reduce'`, `.reveal` opacidade > 0.9 | OK |
| 22 | Mobile premium | screenshots 390/430/768 revisados visualmente | OK |
| 23 | Headline mobile com tamanho adequado | `font-size` computado do `h1` >= 28px em <=430px | OK |
| 24 | Meta title sem "protótipo" | `page.title()` e corpo do texto verificados | OK |
| 25 | Página B visualmente forte | >= 8 seções em `<main>`, hero com peso equivalente (revisão visual) | OK |

## Bug real encontrado e corrigido durante esta rodada de QA

Ver `EDGAR_PAGE_B_REBUILD_REPORT.md`: o hero institucional da Página B
estourava o container do retrato secundário (imagem esticando para ~1600px
de altura dentro de um hero de ~700px), mostrando um recorte extremo em vez
do retrato completo. Identificado por inspeção visual do screenshot
Playwright (não pego por nenhum assert automatizado, já que
`naturalWidth > 0` não detecta cropping ruim) - corrigido fixando
`aspect-ratio` e `object-fit` no CSS, revalidado com nova screenshot.

## Viewports testados

390x844, 430x932, 768x1024, 1366x768, 1440x900, 1920x1080 - todos sem
overflow, nav correta, headline com tamanho adequado onde aplicável.

## Observação de processo

A suite anterior (`edgar.spec.js`, versão rejeitada) testava 18 dos 25
itens hoje exigidos - não testava CSS inline, hero de aeronave, honestidade
do formulário ou `prefers-reduced-motion`. Essa lacuna é exatamente o que
permitiu que uma versão "tecnicamente aprovada" (Codex 9,34) tivesse
problemas reais de percepção que só o Cline capturou. A suite desta
reconstrução fecha essa lacuna.
