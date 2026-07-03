# Edgar Mondadori - Pendências de Validação do Cliente (Reconstrução)

Atualização de `EDGAR_PENDING_CLIENT_VALIDATION.md` (versão rejeitada) para
o estado desta reconstrução. Nenhum item abaixo foi inventado - todos
seguem marcados como pendentes no próprio produto.

## 1. Canal oficial de contato (crítico, herdado e ainda não resolvido)

- **Status:** a confirmar.
- Nova solução de UX: painel de status honesto exibido assim que o modal
  abre ("Canal oficial de WhatsApp em validação"), com Instagram como canal
  atual. Ver `EDGAR_CONTACT_FLOW_REBUILD_REPORT.md`.
- **Ação necessária:** cliente confirmar WhatsApp oficial. Quando
  confirmado, trocar o CTA principal do modal para `wa.me` com mensagem
  pronta - mudança pontual, já prevista na arquitetura do componente.

## 2. Número de registro OAB (crítico, herdado)

- **Status:** a confirmar.
- Tratamento visual corrigido: `.footer-oab-discrete`, fora da área nobre,
  texto "Registro profissional: a confirmar com o cliente".
- **Ação necessária:** cliente informar número e secional.

## 3. Áreas de atuação (herdado)

- **Status:** estrutura inicial, a validar.
- **Ação necessária:** confirmar quais áreas de fato são praticadas.

## 4. Fotos/vídeo adicionais do escritório (novo)

- **Status:** não recebido.
- A Página B usa retrato editorial de Edgar (recorte secundário) sobre um
  painel institucional - não há foto do escritório físico ou da equipe.
- **Ação necessária:** se o cliente fornecer fotos do espaço físico ou da
  equipe, podem substituir/complementar o painel institucional atual sem
  mudança estrutural.

## 5. Vídeo "12 segundos.mp4" (novo, parcialmente resolvido)

- **Status:** 3 frames extraídos e usados; vídeo original não incorporado
  como vídeo de fato (só frames estáticos).
- **Ação necessária:** se o cliente aprovar, o mesmo vídeo pode ser
  incorporado como hero em vídeo (loop curto, mudo) em uma iteração futura -
  não implementado nesta rodada por não constar explicitamente no pedido de
  reconstrução (que pediu "usar o material", satisfeito via frames).

## 6. E-mail institucional

- **Status:** não incluído, não inventado.

## 7. Logo oficial da Mondadori Advocacia

- **Status:** não recebido. O monograma M criado nesta reconstrução é uma
  proposta de identidade visual, não um logo oficial já existente do
  cliente.
- **Ação necessária:** cliente aprovar o monograma como identidade visual
  ou fornecer logo já existente, se houver.

## 8. Deploy público

- **Status:** bloqueado até aprovação explícita do Bruno E confirmação dos
  itens 1-3 acima. Reforçado pela própria reprovação desta rodada: mesmo
  com aprovação técnica anterior, o produto não estava pronto para
  apresentação ao cliente - reforça a importância de não publicar antes da
  validação completa de percepção (Cline) e negócio (Bruno).
