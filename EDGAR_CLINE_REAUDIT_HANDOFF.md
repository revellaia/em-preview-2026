# Handoff para Cline - Edgar Mondadori Reaudit (Reconstrução)

## Contexto

Sua avaliação anterior (nota 7,8/10) foi a causa direta desta reconstrução
completa. Esta rodada existe para responder diretamente aos seus 10
achados, todos tratados como bloqueios (ver
`output/2026-07-01-edgar-mondadori-aaa-rejected/EDGAR_CLINE_FINDINGS_AS_BLOCKERS.md`).

## O que avaliar nesta rodada (item a item dos seus achados anteriores)

1. Formulário - agora honesto desde a abertura do modal. Isso resolve o
   problema de percepção, ou ainda parece "menos completo" por não ter
   envio automático?
2. Foto da aeronave - removida por completo. A ausência dela enfraquece a
   Página B ou o painel institucional novo (textura + monograma + retrato
   secundário) compensa?
3. Número OAB - reposicionado como nota discreta de rodapé. Isso resolve a
   percepção de "dado exposto como se fosse final"?
4. CSS inline - eliminado (verificável por você mesmo lendo o HTML).
5. Página B fraca - reconstruída com arquitetura própria (hero
   institucional, área em lista, seção de Governança exclusiva). Ela agora
   compete de igual para igual com a Página A?
6. Motion - adicionado (reveal, linha de decisão, scroll progress). O nível
   está adequado (nem exagerado, nem ausente)?
7. Identidade Mondadori - monograma M, linha de decisão, textura, selo.
   Isso realmente lê como "identidade própria" ou ainda parece genérico?
8. Estrutura B2B previsível - a nova arquitetura (pull-quotes, timeline,
   bento assimétrico, área em lista) rompe esse padrão?
9. Aparência de protótipo - title/meta/conteúdo visível limpos. A percepção
   geral já parece "produto final", ou ainda falta algo?
10. Conselho não acionado antes - desta vez foi (ver
    `CONSELHO_EDGAR_REBUILD_PRE_IMPLEMENTATION.md`). Verifique se as 7
    diretrizes do Conselho foram de fato implementadas, uma a uma.

## Nova avaliação solicitada

Dar uma nova nota de percepção (0-10) usando o mesmo critério da rodada
anterior, e declarar explicitamente se a meta de 9,2+ (régua UI/UX Pro Max)
foi atingida.

## Uso de DeepSeek V4 Flash

Autorizado para: segunda leitura de copy, varredura de padrões repetidos
entre as duas páginas, patches atômicos pequenos - não para reescrever
seções inteiras sem aprovação.

## Áreas proibidas (não alterar sem autorização)

- `output/2026-07-01-edgar-mondadori-aaa-rejected/` (histórico)
- `raw/raw06_stitch_premium/Edgar Mondadori/` (pasta imutável)
- Não publicar nem promover branch sem aprovação do Bruno

## Critérios de aceite

- [ ] Nota de percepção nova, item a item contra os 10 achados anteriores
- [ ] Declaração explícita: atingiu 9,2+ ou não, com justificativa
- [ ] Se não atingiu: lista objetiva do que falta, no mesmo formato de
      bloqueio usado na rodada anterior

## Adendo - Hero Video Upgrade (rodada seguinte)

Bruno pediu explicitamente para elevar o hero usando o vídeo real do
cliente, com o Nelore Água Fria Premium como régua de percepção (não de
cópia literal). Ver `EDGAR_HERO_VIDEO_UPGRADE_REPORT.md`. Perguntas
específicas para esta avaliação:

- O vídeo no hero da Página A realmente aumenta a percepção premium, ou
  compete com o texto/CTA?
- A camada ambiente de vídeo na Página B (desfocada, opacidade 0,4) é
  perceptível o suficiente para adicionar profundidade, ou é sutil demais
  a ponto de não fazer diferença?
- O tratamento em preto e branco do vídeo (idêntico ao da foto still)
  mantém coerência visual entre os cortes de cor variada do vídeo original?
- A Página A ainda parece "advocacia de alto padrão", ou o vídeo (com
  múltiplos ângulos/poses) aproxima demais de estética de perfil
  pessoal/influencer?

## Adendo - Evidência visual entregue (2026-07-02)

Os 8 screenshots solicitados (hero das duas páginas em desktop, 390px,
430px, e com `prefers-reduced-motion`) foram gerados com dados reais lidos
do DOM (não estimados). Ver `EDGAR_CLINE_VISUAL_EVIDENCE_REPORT.md` e
`EDGAR_VIDEO_SCREENSHOTS_INDEX.md`. Pergunta central para esta rodada: o
hero com vídeo eleva a percepção cinematográfica de fato, ou ainda parece
"ensaio de estúdio com filtro"? Micro ajustes de OAB (palavra "garantem")
e mobile (primeira dobra da Página A) já foram feitos nesta mesma rodada -
ver `EDGAR_FINAL_MICRO_POLISH_REPORT.md`.
