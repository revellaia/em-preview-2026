# Edgar Mondadori - Revisão de Risco OAB (Reconstrução)

## Escopo

Auditoria de risco OAB da reconstrução, cobrindo tanto texto quanto
**percepção visual** - o motivo real da reprovação anterior foi de leitura,
não de palavra proibida.

## Termos proibidos (varredura automatizada, `edgar-rebuild.spec.js`)

| Termo/prática | Resultado |
|---|---|
| Promessa de resultado | Não encontrado |
| "Ganhe sua causa" | Não encontrado |
| "Garantimos" (afirmativo) | Só a negativa exigida: "Não garantimos resultados" |
| "Blindagem garantida" | Não encontrado |
| Consulta grátis agressiva | Não encontrado |
| Preço / desconto | Não encontrado |
| Urgência artificial | Não encontrado |
| Comparação com outros advogados | Não encontrado |
| "Melhor advogado" / "número 1" | Não encontrado |
| Especialização não comprovada | Nenhuma área rotulada como "especialidade"; nota explícita de validação pendente mantida |

## Risco de percepção visual (o que motivou a reprovação)

| Elemento | Risco na versão anterior | Tratamento na reconstrução |
|---|---|---|
| Foto de aeronave | Alto - lida como ostentação mesmo sem texto associado | Removida de qualquer papel de hero ou elemento nobre em ambas as páginas. Não usada nesta reconstrução. |
| "OAB: registro a confirmar" | Médio - aparecia com peso visual de dado final no rodapé | Reescrito como "Registro profissional: a confirmar com o cliente", em `.footer-oab-discrete` (fonte 10px, opacidade reduzida, fora da área nobre do rodapé) |
| Cargos empresariais (AgroMonda, Revisei Consultoria, mentor) | Baixo | Mantidos como fatos biográficos, descritos como trajetória, nunca como prova de sucesso financeiro |
| Retrato B&W dramático (hero Página A) | Novo elemento - avaliado | Risco baixo: é um retrato profissional de estúdio, sem elemento de luxo (joia, carro, avião, dinheiro) no enquadramento - aprovado pelo Conselho como upgrade de qualidade sem risco adicional |

## Verificação automatizada

Teste Playwright `18. foto da aeronave nao e usada como hero` confirma
programaticamente que nenhuma imagem com "aeronave" no nome do arquivo
existe em nenhuma das duas páginas desta reconstrução (0 ocorrências).

## Separação confirmado / inferido / pendente

- **Confirmado:** cargos (Mondadori Advocacia, AgroMonda, Revisei
  Consultoria, Método Mondadori), +10 anos de advocacia, Instagram
  @edgarmondadori.
- **Inferido:** nenhum dado técnico foi inferido nesta reconstrução.
- **Pendente:** número de registro OAB, WhatsApp oficial, e-mail
  institucional, validação final das áreas de atuação (ver
  `EDGAR_PENDING_CLIENT_VALIDATION_REBUILD.md`).

## Veredito

Nenhum risco textual novo. Risco de percepção visual do item mais crítico
(foto de aeronave) **eliminado** por remoção completa, não por retoque.
Pendência formal isolada (número de registro) tratada com peso visual
discreto e correto.

## Adendo - Micro Polish pós-reauditoria Codex (2026-07-02)

Codex encontrou 1 ocorrência de "garantem" na seção de Governança e
Continuidade da Página B (não pega na varredura anterior, que buscava
apenas "garantimos vitória", não a forma "garantem" isolada). Corrigido
para "contribuem para que" - ver `EDGAR_FINAL_MICRO_POLISH_REPORT.md` para
antes/depois completo. Varredura ampliada: regex de termos proibidos no
Playwright agora cobre `garantem`, `garantia`, `garantido` e "blindagem
garantida" isoladamente, não só combinados com "vitória". 0 ocorrências em
todo o projeto após a correção, exceto a negação obrigatória "Não
garantimos resultados".
