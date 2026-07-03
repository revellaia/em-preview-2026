# Edgar Mondadori - Micro Polish Final (pós-reauditoria Codex)

## Contexto

Codex aprovou o rebuild com ajustes não bloqueantes: **EDGAR REBUILD
APROVADO COM AJUSTES NÃO BLOQUEANTES** (Página A 9,18 · Página B 9,22 ·
Geral 9,16). Dois ajustes recomendados, ambos tratados nesta rodada, sem
redesenho, sem mudança de arquitetura ou identidade.

## Ajuste 1 - OAB: palavra "garantem"

**Localização:** `modelo-b-inteligencia-juridica/index.html`, seção
"Governança e Continuidade" (única ocorrência em todo o projeto).

**Antes:** "...processos documentados, método replicável e acompanhamento
contínuo **garantem** que a estratégia jurídica de um cliente não dependa
de uma única pessoa."

**Depois:** "...processos documentados, método replicável e
acompanhamento contínuo **contribuem para que** a estratégia jurídica de
um cliente não dependa de uma única pessoa."

Verbo escolhido por ser o mais natural na frase original sem alterar o
sentido pretendido (continuidade estrutural, não garantia de resultado).

**Verificação (grep + Playwright):**
```
0 ocorrências de "garantem"
0 ocorrências de "garantia"
0 ocorrências de "garantido"
0 ocorrências de "blindagem garantida"
```
Único `garanti*` remanescente em todo o projeto: a negação obrigatória
"Não garantimos resultados" no disclaimer (correta e exigida, não é o
alvo deste ajuste).

## Ajuste 2 - Mobile: primeira dobra da Página A

**Problema:** em 390/430px, a headline/subheadline/CTA ficavam abaixo da
dobra por causa de padding vertical (96px) e altura mínima da imagem/vídeo
(60vh) generosos demais para telefone.

**Ajuste aplicado** (escopo `@media (max-width: 480px)`, não afeta tablet
768px nem desktop):
- `.hero-grid` padding vertical: 96px → 24px; gap: 64px → 24px
- `.hero-media` altura mínima: 60vh → 40vh
- `.hero h1` margem: 24px → 16px
- `.hero .body-lg` margem inferior: 40px → 24px

**Resultado:** headline, subheadline e início do CTA agora visíveis na
primeira dobra em 390/430px, sem reduzir o tamanho da fonte da headline
(mantém impacto AAA) e sem alterar desktop/tablet (verificado por
screenshot em 1440px - idêntico ao anterior).

## Regressão verificada

Nenhuma. Suite Playwright completa (41 testes, todos os 6 viewports)
rodada após os dois ajustes: **41/41 passando**, incluindo o teste de
overflow em 768/1366/1440/1920 (não afetados pela regra `max-width: 480px`).

## Escopo respeitado

Não houve redesenho, mudança de arquitetura, mudança de identidade visual,
remoção de vídeo, publicação em produção ou deploy público - apenas os
dois ajustes pedidos.
