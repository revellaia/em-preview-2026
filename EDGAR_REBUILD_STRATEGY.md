# Edgar Mondadori - Estratégia de Reconstrução AAA

Baseada integralmente nas 7 diretrizes do Conselho
(`CONSELHO_EDGAR_REBUILD_PRE_IMPLEMENTATION.md`) e nos 10 bloqueios do Cline
(`EDGAR_CLINE_FINDINGS_AS_BLOCKERS.md`, na pasta rejected).

## O que muda estruturalmente

| Área | Versão anterior (rejeitada) | Versão nova (rebuild) |
|---|---|---|
| Hero Página A | Foto de estúdio estática, cor | Frame P&B extraído do vídeo, poltrona chesterfield, softbox em halo - mais dramático e exclusivo |
| Hero Página B | Foto de aeronave, dominante | Painel institucional editorial (monograma + textura + linha de decisão), retrato do Edgar em recorte secundário |
| CSS | Inline espalhado + arquivo externo | 100% externo, tokens de espaçamento/cor/tipografia, 0 `style=""` |
| Identidade visual | Herdada do mockup Stitch, sem elemento exclusivo | Monograma M, linha de decisão, textura de papel sutil, selo institucional |
| Motion | Nenhum | Reveal de seção, hover elegante, linha de destaque animada, indicador de progresso, `prefers-reduced-motion` respeitado |
| Contato | Formulário monta texto + link manual para Instagram | WhatsApp real se confirmado; senão CTA "Canal oficial em validação" honesto |
| Página B arquitetura | Espelho reduzido da Página A | Arquitetura própria: hero institucional, bento grid de áreas, seção de governança exclusiva |
| Rodapé OAB | "Registro a confirmar" em destaque | Tratamento discreto, fora da área nobre, texto completo "Registro profissional: a confirmar com o cliente" |
| Copy | Institucional seguro, genérico | Pull-quotes de tensão ("Direito não é reação. É estrutura.") |
| Meta/title | "[Prototipo]" visível | Removido de title/description/conteúdo visível |

## O que NÃO muda (mantido por já ter sido validado)

- Paleta base "Executive Counsel Editorial" (dourado refinado, grafite,
  prestige navy) - o Conselho não apontou a cor como problema, apontou a
  ausência de elementos exclusivos além da cor/tipografia.
- Playfair Display + Hanken Grotesk como par tipográfico.
- Estrutura de duas páginas (A pessoal / B institucional), cross-linkadas.
- Compliance OAB textual (já estava correto - o problema era de leitura
  visual, não de palavra proibida).

## Assets novos usados

Extraídos de `raw/raw06_stitch_premium/Edgar Mondadori/12 segundos.mp4`
via `ffmpeg-static` (25 frames a 2fps analisados, 3 selecionados):

| Arquivo | Origem | Uso |
|---|---|---|
| `edgar-hero-authority-bw` | frame ~0.5s, P&B, poltrona chesterfield, softbox halo | Hero Página A |
| `edgar-editorial-blue-stool` | frame ~6.5s, cor, banqueta, candid | Secundária Página A (trajetória/método) |
| `edgar-editorial-profile-warm` | frame ~12s, blazer xadrez cinza, perfil, luz quente | Secundária Página B (painel institucional) |

Foto de aeronave (`edgar-executivo-aeronave-*`) **não é usada nesta
reconstrução** - decisão do Conselho (item 1 das diretrizes), preservada
apenas como asset histórico na pasta rejected.

## Ordem de implementação

1. Design system novo (`EDGAR_NEW_DESIGN_SYSTEM.md` + `shared-assets/site.css` + `site.js`)
2. Página A reconstruída
3. Página B reconstruída
4. Fluxo de contato corrigido
5. Relatório de risco OAB da reconstrução
6. Remoção de CSS inline verificada
7. Playwright expandido (25 itens)
8. Relatórios finais + handoffs
