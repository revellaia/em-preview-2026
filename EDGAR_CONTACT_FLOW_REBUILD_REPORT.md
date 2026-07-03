# Fluxo de Contato - Reconstrução

## Problema da versão anterior (bloqueio do Cline)

O modal de contato prometia implicitamente "enviar" algo ao clicar
"Solicitar contato" / "Apresentar uma demanda", mas na prática o botão de
envio apenas montava um texto e pedia que o usuário copiasse manualmente e
abrisse o Instagram por conta própria. Isso quebra a expectativa criada
pela própria interface - o usuário sente que algo deveria ter sido enviado
e não foi.

## Novo padrão implementado

1. **Transparência desde a abertura do modal**, não depois do envio: assim
   que o modal abre, um painel (`.channel-pending-panel`) informa
   imediatamente: "Canal oficial de WhatsApp em validação com o cliente.
   Enquanto isso, o contato mais rápido é pelo Instagram." O usuário nunca é
   surpreendido depois de preencher o formulário.
2. **Nenhuma simulação de envio.** O formulário existe apenas como
   ferramenta de organização de mensagem (nome, telefone, tipo de demanda,
   mensagem). Não há botão "Enviar" - o único CTA de ação é "Abrir Instagram
   para enviar", que é exatamente o que ele faz.
3. **Link do Instagram sempre visível**, não escondido atrás de um clique de
   "enviar" - está no `.modal-actions` junto ao formulário desde o início.
4. **Nota explícita** de que nenhum dado é enviado a servidor.

## Por que isso resolve o bloqueio sem "fingir funcionalidade que não existe"

A regra do Bruno era clara: não aceitar o fluxo antigo como solução final,
mas também não fingir um envio que não existe. A solução foi mudar o
**momento e o tom da transparência** - de "confissão pós-clique" para
"aviso claro pré-preenchimento" - o que é uma mudança de UX real, não
apenas de texto.

## Verificação automatizada

Teste Playwright `20. formulario de contato e honesto`: confirma que
`.channel-pending-panel` está visível assim que o modal abre e contém a
palavra "validação", e que o link do Instagram (`[data-instagram-link]`)
está sempre visível, nunca oculto.

## Pendência crítica registrada

Ver `EDGAR_PENDING_CLIENT_VALIDATION_REBUILD.md`: assim que o WhatsApp
oficial for confirmado pelo cliente, o CTA principal deve trocar para um
link `wa.me` real com mensagem pronta, eliminando a necessidade do painel
de "canal em validação" - mudança de poucas linhas quando o dado chegar.
