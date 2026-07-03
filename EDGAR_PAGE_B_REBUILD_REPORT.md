# Página B - Mondadori Advocacia Institucional (Reconstrução)

Arquivo: `modelo-b-inteligencia-juridica/index.html`

## O que mudou versus a versão rejeitada (a mais reconstruída das duas)

| Item | Antes | Agora |
|---|---|---|
| Hero | Foto de aeronave, dominante, risco OAB de ostentação | Painel institucional: textura de papel, monograma em marca d'água, retrato editorial em recorte secundário (320px desktop, 220px mobile) |
| Arquitetura | Espelho reduzido da Página A | Arquitetura própria: hero sem retrato dominante, áreas em lista (não bento), seção de Governança e Continuidade exclusiva |
| Áreas de atuação | Cards idênticos aos da Página A | `.area-list` (lista com hover), deliberadamente diferente do bento grid da Página A |
| Seção exclusiva | Nenhuma | "Governança e Continuidade" - não existe na Página A, dá à Página B uma razão própria de existir |
| CSS | Inline | 0 inline |
| Motion | Nenhum | Reveal de seção, textura de papel no hero e no método |

## Bug real encontrado e corrigido durante a implementação

A primeira versão do hero institucional usava `object-fit` implícito sem
`aspect-ratio`/altura controlada no container do retrato secundário -
resultado: a imagem esticava para preencher a altura de 80vh do hero,
estourando o contêiner e mostrando um recorte extremo (só olho e óculos)
em vez do retrato editorial completo. Corrigido fixando
`aspect-ratio: 3/4` e `object-fit: cover` com tamanho máximo controlado
(320px desktop / 220px mobile) em `.hero-institutional-portrait`. Verificado
visualmente via screenshot Playwright antes e depois da correção.

## Seções (8, conforme briefing original, com arquitetura nova)

1. Hero institucional - sem retrato dominante
2. Para quem atuamos - cards (únicos desta página, bento 2 metades + 1 wide)
3. Áreas de atuação - lista, não cards
4. Agro, negócios e patrimônio - bento assimétrico
5. Método de trabalho - timeline com motion (mesmo padrão da Página A, mas conteúdo próprio)
6. Governança e continuidade - **seção exclusiva**, pull-quote "Um escritório não é uma pessoa. É uma estrutura que continua."
7. Conteúdos jurídicos - painel único
8. Contato - CTA honesto + link cruzado para a Página A

## Por que a Página B agora tem peso equivalente à Página A

Teste Playwright `25. estrutura de secoes com peso equivalente` confirma
programaticamente que a Página B tem pelo menos 8 seções principais no
`<main>`, e a leitura visual (screenshots 1440px e 390px) confirma que o
hero institucional tem a mesma presença visual do hero da Página A, apenas
com composição diferente (textura + monograma em vez de retrato dominante).
