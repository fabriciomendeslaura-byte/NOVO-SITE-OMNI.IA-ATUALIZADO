# Site OMNI.IA — Astro estático

Site institucional da OMNI.IA (software, agentes de IA, automações) com os produtos
**OmniZap** e **Clique Agenda**. Mesma arquitetura do site da Careca Chaves: **Astro, saída
100% estática** — o build gera HTML puro em `dist/`, sem servidor.

## Rodar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # checa tipos + gera dist/
npm run preview   # serve o dist/ para conferir
```

## Onde mexer

| Quero mudar…                    | Arquivo                                   |
|---------------------------------|-------------------------------------------|
| Qualquer texto, link, preço     | `src/content/site.ts`                     |
| Link do OmniZap / Clique Agenda | `LINKS` em `src/content/site.ts`          |
| Cores, fontes, espaçamentos     | `src/styles/tokens.css`                   |
| Animações de scroll             | `src/scripts/motion.ts` (uma função por cena) |
| Formulário (envio ao n8n)       | `src/scripts/formulario.ts`               |
| Banners                         | `src/assets/banners/` e `src/assets/produtos/` |

## A história (ordem das cenas)

Hero (mascote → zoom → escritório no Rio) · Um dia na sua empresa (relógio 06h→24h, o fundo vai do dia à noite) · Faixa infinita ·
Serviços (trilho horizontal preso) · Agentes de IA (4 telas: atendimento, financeiro, Claude Code, multiagente) ·
Produtos · OmniZap (banner abre para tela cheia) · Clique Agenda (celular tela a tela) ·
Processo (linha se desenha) · Engenharia (terminal digita) · FAQ · Contato.

## Decisões

- **Motion:** GSAP + ScrollTrigger + Lenis. Quem ativa "reduzir movimento" no sistema recebe
  o site estático, com tudo visível. Se o JS falhar, um plano B no `<head>` mostra o conteúdo em 4s.
- **Imagens:** os PNGs originais (~1,6 MB) viram AVIF/WebP de 15–80 KB no build (`astro:assets`).
- **Formulário:** mesmo contrato JSON do site oficial → o workflow do n8n não muda.
  Webhook configurável em `PUBLIC_WEBHOOK_CONTATO` (ver `.env.example`).
- **Segurança:** headers (CSP, HSTS, X-Frame-Options…) em `vercel.json`. Nenhum segredo no código.
- **Fonte:** Inter (self-hosted) no lugar da SF Pro da referência — a SF Pro é licenciada da Apple.

## Antes de publicar

- [ ] Rodar a auditoria de segurança (skill `auditoria-seguranca`).
