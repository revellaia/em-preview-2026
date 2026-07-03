# Handoff para Codex - Edgar Mondadori Reaudit (Reconstrução)

## Contexto

A versão anterior (branch `edgar-mondadori-aaa`, commit `0ade32f`) foi
aprovada tecnicamente pelo Codex (9,34) mas **reprovada pelo Bruno** por
percepção fraca (Cline: 7,8/10). Esta é uma reconstrução completa, não um
patch - branch `edgar-mondadori-aaa-rebuild`, pasta
`output/2026-07-01-edgar-mondadori-rebuild/`.

## O que mudou desde a última auditoria Codex

Ver `EDGAR_REBUILD_STRATEGY.md` para a tabela completa. Resumo: novo hero
(frame de vídeo, não a foto antiga), 0 CSS inline (era um bloqueio real),
Página B com arquitetura própria, fluxo de contato reformulado, identidade
visual nova (monograma, linha de decisão, textura), motion adicionado.

## O que revisar nesta rodada

1. **Confirmar 0 CSS inline de fato** - não confiar no relatório, rodar
   `grep -c 'style="' modelo-*/index.html` de forma independente.
2. **Confirmar ausência real da foto de aeronave** em qualquer lugar do
   projeto (não só nas duas páginas - verificar se `shared-assets/edgar/`
   ainda contém o arquivo, o que é aceitável para histórico, mas ele não
   deve ser referenciado em nenhum HTML).
3. **Rodar suite Playwright própria** (`npx playwright test`) e comparar
   contra os 35 testes já documentados em `EDGAR_PLAYWRIGHT_REBUILD_QA.md`.
4. **Verificar se o painel de contato é honesto** - abrir o modal e
   confirmar que o aviso de "canal em validação" aparece antes de qualquer
   preenchimento, não depois.
5. **Comparar objetivamente contra a versão rejeitada** em
   `output/2026-07-01-edgar-mondadori-aaa-rejected/` - o Codex está numa
   posição única para dizer se algo que já estava tecnicamente correto foi
   quebrado nesta reconstrução.

## Arquivos-chave

- `shared-assets/site.css` / `shared-assets/site.js`
- `modelo-a-autoridade/index.html`, `modelo-b-inteligencia-juridica/index.html`
- `playwright/edgar-rebuild.spec.js`
- `CONSELHO_EDGAR_REBUILD_PRE_IMPLEMENTATION.md` (para entender o porquê de cada decisão)

## Áreas proibidas (não alterar sem autorização)

- `output/2026-07-01-edgar-mondadori-aaa-rejected/` (histórico, não tocar)
- `raw/raw06_stitch_premium/Edgar Mondadori/` (pasta imutável, fonte original)
- Não promover a branch para `main` nem publicar sem aprovação do Bruno

## Critérios de aceite

- [ ] 0 CSS inline confirmado independentemente
- [ ] 0 referência à foto de aeronave em qualquer HTML
- [ ] Suite Playwright própria rodando sem falhas
- [ ] Fluxo de contato confirmado honesto (aviso antes do preenchimento)
- [ ] Comparação explícita: o que melhorou / o que ainda falta vs. a versão rejeitada

## Adendo - Hero Video Upgrade (rodada seguinte)

Após esta reconstrução, foi aplicado um upgrade de hero usando o vídeo real
do cliente ("12 segundos.mp4") como camada de vídeo no hero. Ver
`EDGAR_HERO_VIDEO_UPGRADE_REPORT.md`, `EDGAR_VIDEO_OAB_RISK_REVIEW.md` e
`EDGAR_VIDEO_PERFORMANCE_REVIEW.md`. Itens adicionais a confirmar:

- [ ] Vídeo não usa `autoplay` estático no HTML (só via JS condicional)
- [ ] 0 bytes de vídeo carregados com `prefers-reduced-motion: reduce`
- [ ] Vídeo desktop (~1,36MB) e mobile (~0,77MB) confirmados como as fontes
      corretas em cada breakpoint
- [ ] Nenhum frame do vídeo contém aeronave ou elemento de ostentação
      (25 frames já analisados, ver `EDGAR_VIDEO_OAB_RISK_REVIEW.md`)
- [ ] Suite Playwright agora com 41 testes, 41/41 passando

## Adendo - Resposta aos 2 ajustes não bloqueantes (2026-07-02)

Obrigado pela reauditoria (EDGAR REBUILD APROVADO COM AJUSTES NÃO
BLOQUEANTES, 9,16 geral). Os 2 ajustes recomendados foram implementados:

1. "Garantem" (Página B, seção Governança) trocado por "contribuem para
   que" - verificar com `grep -in "garantem\|garantia\|garantido" modelo-*/index.html`
   (deve retornar 0).
2. Primeira dobra mobile da Página A compactada (`@media (max-width: 480px)`
   em `.hero-grid`/`.hero-media`/`.hero h1`/`.hero .body-lg`) - verificar
   headline/subheadline/CTA visíveis sem scroll em 390/430px.

Nenhuma outra mudança foi feita além destes 2 pontos e da geração dos 8
screenshots de evidência para o Cline. Ver `EDGAR_FINAL_MICRO_POLISH_REPORT.md`
para o detalhamento completo.
