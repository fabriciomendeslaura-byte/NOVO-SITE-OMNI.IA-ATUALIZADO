# CHANGELOG — Site OMNI.IA (Astro)

## 29/10/2026 — criação do site (não publicado)

- Projeto criado do zero: Astro 7 estático + GSAP/ScrollTrigger + Lenis. Referência visual: style guide da Apple, tema claro.
- Cenas: hero com mascote (grade azul + luz no mouse), "Um dia na sua empresa" (relógio 06h→24h), serviços em trilho horizontal,
  agentes de IA (atendimento, financeiro, Claude Code, multiagente + anatomia), produtos, OmniZap, Clique Agenda,
  processo, engenharia (terminal), FAQ, contato, rodapé.
- Conteúdo reaproveitado do site oficial (`SITE OMNI.IA/src/content/site.ts`) e reescrito em tom executivo a partir dos agentes.
- Formulário com o mesmo contrato do site oficial → workflow n8n "SRD FORMULARIO" sem mudança.
- Removidos a pedido: símbolo do logo na nav, cena "Rio de Janeiro", banner do OmniZap.
- Revisão de espaçamento desktop + celular; correção de cards de produto travados e de textos empilhados com animação desligada.
- Link do Clique Agenda: `cliqueagenda.app`.
- Auditoria pré-deploy: liberado com ressalvas. Primeiro push para `github.com/fabriciomendeslaura-byte/NOVO-SITE-OMNI.IA-ATUALIZADO` (commit `499764e`).
- No ar na Vercel: https://siteomiiaatualizado.vercel.app. Conferido em produção (páginas, headers, console, CORS do formulário).
- Domínio www.omniiabr.tech apontado para o projeto novo. Hero no celular: mascote sempre abaixo do botão (`16ce0e0`).
