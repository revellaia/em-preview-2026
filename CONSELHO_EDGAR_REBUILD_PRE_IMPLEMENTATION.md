# Conselho de 7 LLMs (extensão 13 papéis) - Edgar Mondadori Rebuild
## Convocado ANTES da reconstrução, conforme exigência do Bruno

**Decisão em análise:** reconstrução completa (não polish) das duas páginas
do Edgar Mondadori / Mondadori Advocacia, após reprovação do Bruno.

**Modo UI/UX Pro Max: ATIVADO** (decisão envolve site/produto digital).

**Contexto factual usado por todos os conselheiros:**
- Versão reprovada: `output/2026-07-01-edgar-mondadori-aaa-rejected/` (branch
  `edgar-mondadori-aaa`, commit `0ade32f`).
- Codex aprovou tecnicamente (9,34) - função, segurança, OAB textual, 0
  bugs Playwright.
- Cline avaliou percepção: 7,8/10 - abaixo do padrão premium.
- Achados do Cline já registrados como bloqueios em
  `EDGAR_CLINE_FINDINGS_AS_BLOCKERS.md`.
- Novo material real disponível e já processado: vídeo "12 segundos.mp4",
  3 frames extraídos e otimizados: `edgar-hero-authority-bw` (P&B dramático,
  poltrona chesterfield, luz de softbox em halo), `edgar-editorial-blue-stool`
  (cor, banqueta, candid), `edgar-editorial-profile-warm` (blazer xadrez
  cinza, perfil, luz quente lateral).

---

## 1. Presidente do Conselho

Conduz a sessão, não antecipa veredito. Reserva a síntese para o final desta
sessão.

## 2. Especialista OAB

**Diagnóstico:** o texto da versão anterior já estava tecnicamente limpo
(0 termos proibidos, disclaimer presente). O risco real não é textual, é de
**leitura visual**: uma foto de aeronave particular ao lado de copy jurídica
lê como "veja quanto dinheiro a advocacia me trouxe", o que se aproxima de
ostentação vazia mesmo sem nenhuma palavra proibida no texto - o Provimento
205/2021 pune tanto a captação mercantilista quanto a autopromoção
inadequada por *imagem*, não só por palavra.
**Risco por elemento:**
- Foto de aeronave como hero: **alto risco de leitura**, mesmo sem texto
  associado a valor/luxo.
- "Registro profissional: a confirmar" na área nobre do rodapé: **risco
  médio** - pode ser lido como a OAB do cliente sendo tratada como detalhe
  menor, quando na verdade é dado obrigatório de identificação profissional.
- Cargos (AgroMonda, Revisei Consultoria, mentor do Método Mondadori): **sem
  risco**, são fatos biográficos públicos, não ostentação, desde que
  descritos como trajetória, não como prova de sucesso financeiro.
**Alerta:** a foto de aeronave precisa sair do papel de hero
independentemente da qualidade estética dela - o risco é de leitura, não de
execução fotográfica.

## 3. Diretor de Arte Jurídico Premium

**Diagnóstico:** a versão anterior aplicou o sistema "Executive Counsel
Editorial" do material Stitch de forma correta, mas **literal** - cores,
tipografia e componentes vieram quase 1:1 do mockup fornecido, sem nenhum
elemento visual que nasça exclusivamente da marca Mondadori. Isso é a causa
raiz do "parece protótipo": tecnicamente bonito, mas sem assinatura própria.
**O que deve nascer:** um monograma "M" geométrico (SVG/CSS, não foto),
uma "linha de decisão" (regra fina que separa blocos de conteúdo com um
gesto de traço, não apenas um `<hr>`), textura sutil de papel/linho no
fundo de seções-chave, um selo institucional discreto no rodapé e nas
transições entre página A e B.
**Achado de maior impacto:** o novo frame P&B do vídeo (poltrona
chesterfield, softbox em halo atrás da cabeça) é objetivamente superior à
foto estática usada antes - tem tensão dramática real, não apenas boa
iluminação de estúdio. Deve ser o hero.

## 4. UX Designer Sênior

**Diagnóstico:** o fluxo de contato (preencher formulário → copiar texto →
abrir Instagram manualmente) quebra a promessa do próprio botão "Solicitar
contato" - o usuário clica esperando enviar algo e recebe uma tarefa manual
extra. Isso é o maior ofensor de UX da versão anterior, mais que qualquer
detalhe visual.
**Reconstrução necessária:** CTA único e honesto sobre o estado real do
canal de contato (WhatsApp real se confirmado; senão, "Canal oficial em
validação" como estado sério, não como link quebrado disfarçado).
**Ponto cego adicional:** os 6 CTAs "Solicitar contato" repetidos
idênticos ao longo da página não criam hierarquia de decisão - todo ponto
de contato pede a mesma ação, sem variar por estágio de interesse do
visitante.

## 5. UI Designer Triple AAA

**Diagnóstico:** CSS inline espalhado (`style="margin-top: 16px"` etc.)
confirmado no código da versão anterior - isso não é só um problema de
organização, é a razão prática de a Página B parecer "variação menor" da A:
ajustes ad-hoc por elemento em vez de um sistema de espaçamento consistente
aplicado via classe/token.
**Rebuild:** remover 100% dos `style=""` inline, mover para tokens CSS
(`--space-*`) e classes utilitárias nomeadas. Bento grid assimétrico nas
áreas de atuação (não 3 colunas idênticas). Cards com profundidade real
(camadas de borda + leve textura), não só `border: 1px solid`.

## 6. Copywriter Jurídico High-Ticket

**Diagnóstico:** a headline principal era forte ("Inteligência jurídica
para quem lidera decisões de alto impacto"), mas o corpo do texto caía em
frases institucionais seguras demais ("compreensão profunda da dinâmica
corporativa") que não têm assinatura de voz - qualquer escritório poderia
ter escrito aquilo.
**Reconstrução:** usar as frases de maior tensão já aprovadas pelo Bruno
como pull-quotes editoriais: "Direito não é reação. É estrutura.", "Risco
não se elimina com promessa. Risco se administra com método." - frases
assim são simultaneamente seguras para a OAB (não prometem resultado) e
memoráveis (têm ritmo, têm ponto de vista).

## 7. Estrategista de Marca Pessoal Executiva

**Diagnóstico:** o retrato de estúdio anterior (cor, chesterfield) é
correto mas neutro - poderia ser qualquer executivo de terno. O novo frame
P&B do vídeo tem tensão de olhar direto à câmera e iluminação dramática que
comunica "decisão", não apenas "profissionalismo".
**Risco a evitar:** Página A não pode soar como mentor/coach - qualquer
menção a "método" precisa ficar ancorada em advocacia e gestão de risco,
nunca em desenvolvimento pessoal.
**Recomendação:** hero P&B + frame editorial azul (banqueta) como imagem
secundária na seção de trajetória, criando uma sequência visual (dois
momentos do mesmo homem, dois registros: dramático e humano) em vez de uma
única foto estática repetida mentalmente pelo visitante.

## 8. Estrategista para Escritórios de Advocacia

**Diagnóstico:** a Página B anterior era estruturalmente uma cópia
reduzida da Página A com trocas de palavra - por isso "lida como variação
menor". Um escritório institucional precisa comunicar **estrutura**, não
uma pessoa com um H1 diferente.
**Reconstrução:** hero institucional sem retrato dominante (painel
editorial + monograma + Edgar em recorte menor, secundário), bento grid de
áreas de atuação com peso visual próprio, timeline de método com motion,
seção de governança/continuidade que não existe na Página A - dando à
Página B uma razão de existir que não é "a mesma coisa, mais curta".

## 9. Especialista em Agro e Patrimônio

**Diagnóstico:** a seção "Agro, negócios e patrimônio" da versão anterior
era 3 cards genéricos intercambiáveis com qualquer escritório - nenhuma
palavra ali provava conexão real com a AgroMonda (marca já confirmada como
real, ligada ao Edgar).
**Reconstrução:** dar à frente Agro peso visual equivalente às outras duas
(negócios, patrimônio), com linguagem que reconhece a complexidade real do
setor (contratos agrários, sucessão rural, regularização fundiária), sem
inventar nenhum dado técnico (nenhum número de hectare, cliente ou caso).

## 10. Especialista Anti-Template

**Diagnóstico:** o maior "tell" de template não é a paleta nem a
tipografia (ambas bem escolhidas) - é a **repetição idêntica de componente**
(o mesmo card, com o mesmo ícone-losango, reaparecendo em Página A e
Página B, em Áreas de Atuação e em Conteúdo e Presença Digital) sem
variação de ritmo. Um site "sem cara de template" varia a composição por
seção; um com cara de template usa o mesmo bloco repetidamente por
economia de esforço.
**Bloqueio:** proibir reuso do mesmo componente de card em mais de duas
seções consecutivas sem alterar proporção, alinhamento ou tratamento
visual.

## 11. Especialista Anti-IA

**Diagnóstico:** frases como "Mais do que aconselhamento jurídico, uma
atuação pautada pela compreensão profunda da dinâmica corporativa" têm o
ritmo típico de texto gerado sem curadoria - abstrato, sem substantivo
concreto, substituível por qualquer segmento.
**Reconstrução:** preferir frases curtas, diretas, com verbo de ação e
objeto concreto (ex: "Diagnóstico do negócio antes de qualquer tese
jurídica", já presente no Método Mondadori) e evitar adjetivos vazios
("profundo", "estratégico") sem um substantivo específico ao lado.

## 12. Especialista em Conversão Ética

**Diagnóstico:** um formulário que promete envio e na verdade pede ação
manual do usuário (copiar e colar no Instagram) é o tipo de atrito que
mais destrói confiança em conversão - o usuário sente que foi enganado
sobre o que o botão fazia.
**Reconstrução:** CTA precisa ser honesto sobre o estado do canal
("Canal oficial em validação") em vez de fingir um fluxo que não existe.
Conversão ética aqui significa: não simular funcionalidade que não existe,
mesmo que isso signifique um CTA menos "completo" no protótipo.

## 13. QA Visual

**Diagnóstico:** a suite Playwright anterior testava ausência de
`href="#"`, palavras proibidas e travessão - mas não testava CSS inline,
não testava se a foto de aeronave era ou não hero, e não testava motion/
`prefers-reduced-motion`. A suite validou o que foi pedido na primeira
rodada, não o que faltava.
**Reconstrução:** suite expandida (25 itens, ver
`EDGAR_PLAYWRIGHT_REBUILD_QA.md`) cobrindo especificamente os bloqueios
desta reconstrução: 0 `style=""`, 0 uso de imagem de aeronave como hero, 0
"a confirmar" fora de tratamento discreto, motion respeitando redução de
movimento.

---

## Presidente Relator - Veredito Final

### Nota da versão antiga
**7,8/10** (nota do Cline, adotada como fonte de verdade de percepção -
prevalece sobre a nota técnica de 9,34 do Codex, pois mede uma dimensão
diferente e é essa dimensão que motivou a reprovação do Bruno).

### Decisão de reconstrução
**Reconstruir integralmente**, não fazer polish pontual. A causa raiz não
é um conjunto de bugs isolados - é ausência de identidade visual própria
(item 3, 10), um fluxo de contato que quebra a promessa da própria
interface (item 4, 12) e uma Página B sem razão estrutural de existir
separada da A (item 8). Polish não resolve esses três problemas; exige
nova arquitetura.

### Até 7 diretrizes obrigatórias
1. **Hero P&B do vídeo** (`edgar-hero-authority-bw`) como imagem principal
   da Página A; foto de aeronave **fora** de qualquer papel de hero em
   qualquer página.
2. **Identidade Mondadori própria:** monograma M, linha de decisão, textura
   sutil, selo institucional - nascendo nesta reconstrução, não herdados do
   mockup Stitch sem adaptação.
3. **0 CSS inline:** todo estilo em tokens/classes externas.
4. **Contato honesto:** WhatsApp real se confirmado; senão, CTA "Canal
   oficial em validação" sério e visualmente profissional - nunca um fluxo
   de copiar-colar disfarçado de envio.
5. **Página B com arquitetura própria:** hero institucional sem retrato
   dominante, bento grid de áreas com peso visual equivalente ao da Página
   A, seção de governança/continuidade exclusiva dela.
6. **Motion e microinterações sutis:** reveal de seção, hover elegante,
   linha dourada/azul de destaque, respeitando `prefers-reduced-motion`.
7. **Copy com assinatura de voz:** usar as frases de tensão já aprovadas
   ("Direito não é reação. É estrutura.") como pull-quotes editoriais,
   eliminar frases institucionais genéricas substituíveis por qualquer
   escritório.

### Régua de aprovação
Seguindo a régua já formalizada em `UIUX_PRO_MAX_SONNET5.md`: abaixo de 8 =
bloquear; 8,0-8,7 = bom mas não premium suficiente; 8,8-9,1 = forte, com
ajustes; **9,2 ou mais = padrão premium desejado**, meta explícita desta
reconstrução.

### Status final do Conselho
**CONSELHO BLOQUEIA VERSÃO ATUAL · RECONSTRUÇÃO OBRIGATÓRIA**
