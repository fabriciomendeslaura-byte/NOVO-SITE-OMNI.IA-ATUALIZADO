# Estado atual — Site OMNI.IA (Astro)

**Última sessão:** 29/10/2026
**Pasta:** `C:\Users\Usuário\Desktop\PASTA PARA SITE NOVO OMNI.IA`
**Status:** no GitHub (`github.com/fabriciomendeslaura-byte/NOVO-SITE-OMNI.IA-ATUALIZADO`, branch `main`). **No ar na Vercel:** https://siteomiiaatualizado.vercel.app — falta apontar omniiabr.tech.

## Próximo passo (quando voltar)

1. ~~Auditoria de segurança~~ — feita 29/10/2026: liberado com ressalvas.
2. Importar o repo na Vercel (o `vercel.json` já tem os headers de segurança) e apontar `omniiabr.tech`.
3. Testar o formulário em produção (webhook n8n `https://webhook.omniiabr.com/webhook/Formulario`).

## O que está pronto

| Cena | Situação |
|---|---|
| Hero (mascote + grade azul + luz no mouse) | ✅ aprovado |
| Um dia na sua empresa (relógio 06h→24h) | ✅ aprovado |
| Serviços (trilho horizontal + contador) | ✅ aprovado |
| Agentes de IA (4 telas + anatomia + áreas) | ✅ aprovado |
| Produtos, OmniZap, Clique Agenda | ✅ aprovado |
| Processo, Engenharia, FAQ, Contato, Rodapé | ✅ aprovado |
| Revisão de espaçamento desktop + celular | ✅ feita |

## Decisões tomadas nesta sessão

- Removidos a pedido: símbolo do logo no menu, cena "Rio de Janeiro / Daqui para todo o Brasil",
  banner grande do OmniZap.
- Texto aprovado do hero: "...eliminam o trabalho manual, aceleram o crescimento e dão a você
  controle total da operação."
- Agentes de IA apresentados de forma geral (qualquer área, Claude Code, multiagente) — nunca só WhatsApp.
- Clique Agenda: domínio definitivo `cliqueagenda.app`; confirmação e lembrete por WhatsApp
  confirmados em produção.

## Para ver localmente

```bash
npm run build
npx astro preview --host 0.0.0.0 --port 4321
```

Computador: http://localhost:4321 · Celular (mesmo Wi-Fi): http://192.168.1.70:4321
(o IP pode mudar se o roteador trocar).

Animações não aparecem se o Windows estiver com "Efeitos de animação" desligado
(Configurações → Acessibilidade → Efeitos visuais) — nesse caso o site mostra a versão estática.
