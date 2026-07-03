# Remoção de CSS Inline - Relatório

## Achado original (Cline)

A versão rejeitada tinha estilos `style=""` espalhados pelo HTML para
ajustes pontuais de margem e cor, em vez de um sistema de tokens.

## O que foi feito

1. Todos os tokens de espaçamento (`--space-xs` a `--space-2xl`) e classes
   utilitárias (`.mt-xs`, `.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl`, `.mb-*`,
   `.max-w-sm/md/lg`, `.text-center`, `.text-gold`, `.text-muted`,
   `.self-start`, `.img-bordered`, `.z-above`, `.inline-group`,
   `.icon-inline`, `.card-row`, `.panel-row`, `.justify-center`) foram
   adicionados a `shared-assets/site.css` antes da escrita do HTML final.
2. Durante a própria escrita desta reconstrução, `style=""` apareceu
   temporariamente em 12 pontos (auto-detectado por varredura própria antes
   da entrega) e foi substituído integralmente pelas classes acima.
3. Teste Playwright `15. sem CSS inline` lê o arquivo HTML bruto de cada
   página e falha se qualquer ocorrência de `style="` for encontrada.

## Resultado verificado

```
grep -c 'style="' modelo-a-autoridade/index.html   -> 0
grep -c 'style="' modelo-b-inteligencia-juridica/index.html -> 0
```

0 ocorrências em ambas as páginas, confirmado tanto por grep manual quanto
pelo teste automatizado (2/2 passando).

## Nota de processo

Vale registrar com transparência: o próprio processo de construção desta
reconstrução introduziu CSS inline por engano em um primeiro rascunho (a
mesma armadilha que motivou o bloqueio original) - foi pego e corrigido
antes da entrega, com o teste automatizado servindo exatamente para isso:
impedir que o mesmo erro se repita silenciosamente em qualquer rodada
futura.
