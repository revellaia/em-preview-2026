# Página A - Autoridade Pessoal (Reconstrução)

Arquivo: `modelo-a-autoridade/index.html`

## O que mudou versus a versão rejeitada

| Item | Antes | Agora |
|---|---|---|
| Hero | Foto de estúdio estática, cor | Frame P&B extraído do vídeo "12 segundos.mp4" (poltrona chesterfield, softbox em halo) - mais dramático, exclusivo desta reconstrução |
| Imagem secundária | Nenhuma | Frame editorial colorido (banqueta) na seção de trajetória, criando sequência visual de dois registros |
| CSS | Inline em ~10 pontos | 0 inline - 100% em `shared-assets/site.css`, tokens e classes utilitárias |
| "Liderança & Advocacia" | Com `&` | Corrigido para "Liderança e Advocacia" |
| Meta/title | "[Prototipo]" visível | Removido |
| Rodapé OAB | Destaque nobre | `.footer-oab-discrete`, tratamento discreto |
| Motion | Nenhum | Reveal de seção, linha de decisão animada, scroll progress bar |
| Identidade | Nenhuma exclusiva | Monograma M (nav, rodapé, marca d'água), linha de decisão, selo institucional |

## Seções (9, mantendo a estrutura pedida no briefing original, com nova execução)

1. Hero cinematográfico - novo retrato P&B
2. Frase de posicionamento - "Direito não é reação. É estrutura." (pull-quote editorial, não card)
3. Trajetória - duas colunas assimétricas + imagem secundária
4. Visão jurídica - pull-quote "Risco não se elimina com promessa. Risco se administra com método." + texto
5. Método Mondadori - timeline com motion, sem cards
6. Áreas de atuação - bento grid assimétrico (1 wide + 2 narrow + 2 half), não 3 colunas idênticas
7. Conteúdo e presença digital - painel único (Instagram), não grid
8. Conexão com Mondadori Advocacia - painel largo com selo institucional e textura
9. CTA final - contato honesto sobre o estado do canal

## Anti-template aplicado

O componente de card (losango + título + texto) aparece só 2 vezes
consecutivas no máximo (nas Áreas de Atuação) antes de mudar de formato
(pull-quote, timeline, painel único, painel largo) - regra do Conselho
(item 10, Especialista Anti-Template) verificada por leitura do HTML final.

## Testes que cobrem esta página

23/35 asserções da suite `edgar-rebuild.spec.js` rodam contra esta página
(11 testes de conteúdo/segurança + 6 viewports x 1 teste de layout + reduced
motion). Todas passando.
