# Edgar Mondadori / Mondadori Advocacia - Reconstrução AAA

Reconstrução completa após reprovação do Bruno da versão em
`output/2026-07-01-edgar-mondadori-aaa/` (preservada como
`output/2026-07-01-edgar-mondadori-aaa-rejected/`). Ver
`../2026-07-01-edgar-mondadori-aaa-rejected/EDGAR_REJECTION_REASON.md` para
o motivo completo e `CONSELHO_EDGAR_REBUILD_PRE_IMPLEMENTATION.md` para a
convocação real do Conselho antes desta reconstrução.

## Modelos

| Modelo | Diretório | Descrição |
|--------|-----------|-----------|
| Autoridade Pessoal | `modelo-a-autoridade/` | Marca pessoal de Edgar Mondadori, hero editorial em preto e branco |
| Inteligência Jurídica | `modelo-b-inteligencia-juridica/` | Escritório, hero institucional sem retrato dominante, seção de Governança exclusiva |

## Como visualizar

Abrir `index.html` (chooser) ou os `index.html` de cada modelo. Sem build,
sem backend.

## QA

```
npm install
npx playwright test
```

35/35 testes passando (ver `EDGAR_PLAYWRIGHT_REBUILD_QA.md`).

## O que mudou desde a versão rejeitada

Ver `EDGAR_REBUILD_STRATEGY.md` para a tabela completa. Resumo: novo hero
extraído de vídeo real (não foto estática), identidade visual própria
(monograma, linha de decisão, textura), 0 CSS inline, Página B com
arquitetura institucional própria, fluxo de contato honesto, motion sutil.

## Status

Reconstrução concluída, pronta para reauditoria de Codex e Cline (ver
`EDGAR_CODEX_REAUDIT_HANDOFF.md` e `EDGAR_CLINE_REAUDIT_HANDOFF.md`). Não
publicado em produção. Não apresentar ao cliente antes da reauditoria.

---

Arrange Corp / Bruno Goebel - bgmcruz1988@gmail.com
