# Edgar Mondadori - Novo Design System (Rebuild)

Evolução do sistema "Executive Counsel Editorial" (mantido na base), com os
elementos de identidade exclusiva exigidos pelo Conselho.

## O que é novo

### 1. Monograma Mondadori (SVG próprio)

Um "M" geométrico construído como duas linhas de decisão que se cruzam num
nó central (losango, reaproveitando o ícone já usado nas áreas de atuação,
agora com significado: o ponto onde a decisão se resolve). Vetorial
(inline SVG), nunca imagem rasterizada - escala perfeitamente e pesa quase
nada.

Usado: nav (substituindo o wordmark isolado), selo de rodapé, marca d'água
sutil em seções-chave (opacidade ~0.04, nunca decorativo demais).

### 2. Linha de Decisão

Elemento de assinatura visual: um traço fino diagonal com gradiente
grafite→dourado que "desenha" (stroke-dashoffset) quando a seção entra em
viewport. Substitui o `<hr>` genérico como divisor entre blocos de
conteúdo-chave. Respeita `prefers-reduced-motion` (aparece direto, sem
animação, se o usuário preferir).

### 3. Textura de papel institucional

Textura sutil tipo linho/papel timbrado aplicada via CSS puro (gradientes
repetidos em diagonal, sem imagem), opacidade muito baixa, usada apenas no
hero institucional da Página B e no painel de "Método". Reforça o tato de
"papel timbrado de escritório" sem pesar a página.

### 4. Selo institucional

Círculo discreto com o monograma dentro, usado no rodapé das duas páginas
e como elemento de transição entre Página A e Página B (reforça que são a
mesma marca, duas leituras).

### 5. Motion e microinterações

- **Reveal de seção:** `IntersectionObserver` adiciona classe `.in-view`
  que anima opacidade + translateY sutil (12px, 500ms).
- **Hover elegante:** mudança de temperatura de cor (não escala/sombra
  pesada), como já definido no material Stitch original, mantido.
- **Linha de destaque animada:** ver item 2.
- **Indicador de progresso:** barra fina no topo da página, preenchendo
  conforme o scroll (`scroll-progress`), reforça sensação de "documento
  extenso e estruturado", coerente com a metáfora jurídica.
- Toda animação envolvida em `@media (prefers-reduced-motion: no-preference)`
  - com `reduce`, tudo aparece direto, sem transição.

## O que permanece do sistema anterior

- Paleta: `--bg #141314`, `--refined-gold #b39359`, `--silver-leaf #e2e8f0`,
  `--prestige-navy #0f172a`.
- Tipografia: Playfair Display (display) + Hanken Grotesk (corpo/label).
- Cantos retos (sem `border-radius`), rim-light em vez de sombra pesada.

## Tokens novos (além dos já existentes)

```css
--space-xs: 8px;  --space-sm: 16px; --space-md: 24px;
--space-lg: 40px; --space-xl: 64px; --space-2xl: 96px;
--motion-fast: 200ms; --motion-base: 400ms; --motion-slow: 700ms;
--line-decision: linear-gradient(90deg, transparent, var(--refined-gold), transparent);
```

Nenhum valor de espaçamento/cor é escrito solto em `style=""` - tudo passa
por estes tokens ou por classes utilitárias nomeadas (`.mt-lg`, `.reveal`
etc.), eliminando o CSS inline apontado como bloqueio pelo Cline.

## Arquitetura de seção (evitar repetição de componente)

Regra do Especialista Anti-Template aplicada: nenhum bloco de "card" reaparece
sem variação por mais de duas seções seguidas.

- Página A: hero (imagem dominante) → citação editorial (tipografia pura,
  sem card) → trajetória (duas colunas assimétricas + imagem secundária) →
  visão jurídica (pull-quote + texto) → método (timeline com motion,
  não cards) → áreas (bento grid assimétrico) → conteúdo (link único,
  não grid) → conexão com escritório (painel largo) → contato.
- Página B: hero institucional (textura + monograma + retrato secundário) →
  para quem atuamos (cards, únicos nesta página) → áreas (accordion/lista,
  não cards - diferente da Página A de propósito) → agro/negócios/patrimônio
  (bento assimétrico) → método (timeline) → governança e continuidade
  (painel exclusivo, não existe na Página A) → conteúdo → contato.

## Fluxo de contato (novo padrão)

Sem WhatsApp confirmado nesta rodada. Em vez do fluxo anterior (montar
mensagem → copiar → abrir Instagram manualmente), o CTA principal assume o
estado real: **"Canal oficial em validação"**, com o botão levando a um
painel que explica isso profissionalmente e oferece o Instagram como canal
atual, sem fingir que o formulário "envia" algo. Documentado como pendência
crítica em `EDGAR_PENDING_CLIENT_VALIDATION_REBUILD.md`.
