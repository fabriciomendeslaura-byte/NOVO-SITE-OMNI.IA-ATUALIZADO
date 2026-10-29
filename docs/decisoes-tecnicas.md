# Decisões técnicas — Site OMNI.IA (Astro)

| Data | Decisão | Por quê |
|---|---|---|
| 29/10/2026 | Astro estático (`output: 'static'`) | Mesma arquitetura da Careca Chaves: HTML puro, rápido, barato, sem back-end exposto. |
| 29/10/2026 | GSAP + ScrollTrigger + Lenis | Pedido de site "com muito movimento, contado como história no scroll". |
| 29/10/2026 | Inter no lugar da SF Pro | SF Pro é licenciada da Apple. |
| 29/10/2026 | `prefers-reduced-motion` → versão estática completa | Acessibilidade; Windows com "Efeitos de animação" desligado cai aqui. Toda cena precisa funcionar sem motion. |
| 29/10/2026 | Cenas presas (pin) curtas: hero 90%, dia 160% | Fabricio achou a rolagem longa demais. Não alongar sem pedir. |
| 29/10/2026 | Texto todo em `src/content/site.ts` | Separar conteúdo de apresentação. |
| 29/10/2026 | Formulário: mesmo JSON do site oficial (origem `site-omniiabr`) | n8n não precisa mudar. CSP do `vercel.json` libera `webhook.omniiabr.com`. |
