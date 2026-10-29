/**
 * Motion — o site é contado como uma história, e o scroll é o "play".
 *
 * GSAP + ScrollTrigger fazem as cenas presas (pin) e as animações ligadas ao
 * scroll (scrub). Lenis deixa a rolagem suave, o que faz o scrub parecer filme
 * em vez de degrau.
 *
 * Regras:
 * - Quem pede menos movimento (prefers-reduced-motion) recebe o site estático,
 *   com todo o conteúdo visível. Nada aqui é necessário para entender a página.
 * - Celular e desktop têm roteiros diferentes (gsap.matchMedia): o que prende a
 *   tela no desktop vira rolagem simples no celular quando não cabe.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const $ = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document) => raiz.querySelector<T>(sel)
const $$ = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document) =>
  Array.from(raiz.querySelectorAll<T>(sel))

const DESKTOP = '(min-width: 901px)'
const MOVEL = '(max-width: 900px)'

export function iniciarMotion(): void {
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Sinal para o "plano B" do <head>: o motion carregou, pode manter a classe .motion.
  ;(window as unknown as { __motionOk: boolean }).__motionOk = true

  if (reduzir) {
    document.documentElement.classList.remove('motion')
    return
  }

  const lenis = iniciarScrollSuave()
  barraDeProgresso()
  revelacoes()
  hero()
  dia()
  faixa()
  servicos()
  agente()
  omnizap()
  cliqueAgenda()
  engenharia()
  processo()
  rodape()
  holofote()
  navSobreEscuro()

  // Imagens mudam a altura das seções depois do load: recalcula os gatilhos.
  window.addEventListener('load', () => ScrollTrigger.refresh())
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  void lenis
}

function iniciarScrollSuave(): Lenis {
  const altura = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-altura')) || 52
  const lenis = new Lenis({ duration: 1.15, anchors: { offset: -altura } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

function barraDeProgresso(): void {
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (st) => document.documentElement.style.setProperty('--progresso', st.progress.toFixed(4)),
  })
}

/** Entrada padrão: sobe e aparece, em cascata, quando entra na tela. */
function revelacoes(): void {
  gsap.set('[data-revelar]', { opacity: 0, y: 32 })
  ScrollTrigger.batch('[data-revelar]', {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 }),
  })
}

/* ------------------------------------------------------------------ */
/* CENA 1 — Hero: o mascote chega e a câmera aproxima.                 */
/* ------------------------------------------------------------------ */
function hero(): void {
  const secao = $('[data-hero]')
  if (!secao) return
  const palco = $('[data-hero-palco]', secao)!
  const texto = $('[data-hero-texto]', secao)!
  const banner = $('[data-hero-banner]', secao)!

  // Luz e grade do fundo seguem o mouse (só em quem tem mouse de verdade).
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    palco.addEventListener('pointermove', (e) => {
      const r = palco.getBoundingClientRect()
      palco.style.setProperty('--mx', `${e.clientX - r.left}px`)
      palco.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  }

  // Abertura: tocada uma vez, no load, independente do scroll.
  const abertura = gsap.timeline({ defaults: { ease: 'expo.out' } })
  // fromTo (e não from): o estado inicial já vem escondido do CSS, para não piscar.
  abertura
    .fromTo('[data-hero-palavra]', { y: 0, yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.1)
    .fromTo('[data-hero-entrada]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.5)
    .fromTo($('img', banner), { opacity: 0, y: 80, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.8 }, 0.3)

  const mm = gsap.matchMedia()
  mm.add({ desktop: DESKTOP, movel: MOVEL }, (ctx) => {
    const { desktop } = ctx.conditions as { desktop: boolean }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        // Curto de propósito: só o tempo da câmera aproximar do mascote.
        end: '+=90%',
        pin: palco,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    tl.to(texto, { yPercent: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
      // A câmera aproxima do mascote no notebook.
      .to(banner, { scale: desktop ? 1.5 : 1.35, yPercent: desktop ? -8 : -5, duration: 1, ease: 'power1.inOut' }, 0)

    return () => tl.scrollTrigger?.kill()
  })
}

/* ------------------------------------------------------------------ */
/* Um dia na sua empresa — o relógio corre com o scroll e o fundo     */
/* vai do amanhecer à noite enquanto os agentes cumprem a rotina.     */
/* ------------------------------------------------------------------ */
function dia(): void {
  const encontrada = $('[data-dia]')
  if (!encontrada) return
  const secao: HTMLElement = encontrada
  const palco = $('[data-dia-palco]', secao)!
  const hora = $('[data-dia-hora]', secao)!
  const periodo = $('[data-dia-periodo]', secao)!
  const tinta = $('[data-dia-tinta]', secao)!
  const marcas = $$('[data-dia-marca]', secao)
  const eventos = $$('[data-dia-evento]', secao)
  const fecho = $('[data-dia-fecho]', secao)
  const nav = $('[data-nav]')

  const INICIO = 360 // 06:00
  const FIM = 1439 // 23:59
  const DURACAO = 10

  // Cor do céu ao longo do dia: [minuto, cor]. Entre duas paradas, interpola.
  const CEU: [number, string][] = [
    [360, '#e4edfc'],
    [600, '#f5f5f7'],
    [990, '#f5f5f7'],
    [1110, '#e3e7f4'],
    [1230, '#18224a'],
    [1380, '#070b1a'],
    [1440, '#070b1a'],
  ]
  const corDoCeu = (m: number) => {
    const i = Math.max(0, CEU.findIndex(([fim]) => fim >= m) - 1)
    const [m1, c1] = CEU[i]
    const [m2, c2] = CEU[i + 1]
    return gsap.utils.interpolate(c1, c2, (m - m1) / (m2 - m1))
  }

  const nomePeriodo = (m: number) =>
    m < 540 ? 'amanhecer' : m < 720 ? 'manhã' : m < 1080 ? 'tarde' : m < 1230 ? 'fim do dia' : 'noite'

  const relogio = { min: INICIO }
  const minutoDe = (el: HTMLElement) => Number(el.dataset.minuto)
  const tempoDe = (m: number) => ((m - INICIO) / (FIM - INICIO)) * DURACAO

  const mm = gsap.matchMedia()
  mm.add({ desktop: DESKTOP, movel: MOVEL }, (ctx) => {
    const { movel } = ctx.conditions as { movel: boolean }
    gsap.set(eventos, { opacity: 0, y: 30, scale: 0.97 })

    const tl = gsap.timeline({
      onUpdate: () => atualizar(),
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: '+=160%',
        pin: palco,
        scrub: 0.8,
        anticipatePin: 1,
        onToggle: (st) => {
          if (!st.isActive) nav?.classList.remove('escuro')
        },
      },
    })

    tl.to(relogio, { min: FIM, duration: DURACAO, ease: 'none' }, 0)
    eventos.forEach((ev, i) => {
      const t = tempoDe(minutoDe(ev))
      tl.to(ev, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, t)
      // No celular cabe um card por vez: o anterior sai quando o novo entra.
      if (movel && i > 0) tl.to(eventos[i - 1], { opacity: 0, y: -24, duration: 0.4 }, t)
    })
    if (fecho) tl.fromTo(fecho, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, DURACAO + 0.15)
    tl.to({}, { duration: 0.9 })

    function atualizar() {
      const m = Math.min(FIM, Math.round(relogio.min))
      hora.textContent = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
      periodo.textContent = nomePeriodo(m)
      tinta.style.transform = `scaleX(${(m - INICIO) / (FIM - INICIO)})`
      marcas.forEach((marca, i) => marca.classList.toggle('passou', m >= minutoDe(eventos[i])))
      secao.style.setProperty('--fundo-dia', corDoCeu(m))

      const noite = m >= 1200
      secao.classList.toggle('noite', noite)
      if (tl.scrollTrigger?.isActive) nav?.classList.toggle('escuro', noite)
    }
    atualizar()

    return () => {
      relogio.min = INICIO
    }
  })
}

/* Faixa infinita que acelera e inverte com a velocidade do scroll. */
function faixa(): void {
  const trilhos = $$('[data-faixa-trilho]')
  if (!trilhos.length) return

  const loop = gsap.to(trilhos, { xPercent: -100, repeat: -1, duration: 38, ease: 'none' })
  let direcao = 1

  ScrollTrigger.create({
    trigger: '[data-faixa]',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (st) => {
      direcao = st.direction
      const impulso = Math.min(Math.abs(st.getVelocity()) / 250, 8)
      gsap.to(loop, { timeScale: direcao * (1 + impulso), duration: 0.2, overwrite: true })
      gsap.to(loop, { timeScale: direcao, duration: 1.2, delay: 0.2, ease: 'power2.out' })
    },
  })
}

/* ------------------------------------------------------------------ */
/* Serviços — no desktop, a página desce e os cards andam para o lado. */
/* ------------------------------------------------------------------ */
function servicos(): void {
  const secao = $('[data-servicos]')
  if (!secao) return
  const pino = $('[data-servicos-pino]', secao)!
  const trilho = $('[data-servicos-trilho]', secao)!
  const barra = $('[data-servicos-barra]', secao)
  const cards = $$('[data-servico-card]', secao)
  const atual = $('[data-servicos-atual]', secao)
  const dica = $('[data-servicos-dica]', secao)

  const mm = gsap.matchMedia()

  mm.add(DESKTOP, () => {
    const distancia = () => Math.max(0, trilho.scrollWidth - window.innerWidth)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pino,
        start: 'top top',
        end: () => '+=' + distancia(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (st) => {
          const n = Math.min(cards.length, Math.floor(st.progress * (cards.length - 1) + 1.5))
          if (atual) atual.textContent = String(n).padStart(2, '0')
          if (dica) dica.style.opacity = st.progress > 0.97 ? '0' : '1'
        },
      },
    })
    tl.to(trilho, { x: () => -distancia(), ease: 'none' }, 0)
    if (barra) tl.fromTo(barra, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)

    gsap.from(cards, {
      opacity: 0,
      x: 120,
      rotateY: -12,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: pino, start: 'top 70%', once: true },
    })
  })

  mm.add(MOVEL, () => {
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: trilho, start: 'top 85%', once: true },
    })
  })
}

/* ------------------------------------------------------------------ */
/* Agentes de IA — quatro aplicações numa mesma janela, uma por vez.  */
/* ------------------------------------------------------------------ */
function agente(): void {
  const secao = $('[data-agente]')
  if (!secao) return
  const palco = $('[data-agente-palco]', secao)!
  const telas = $$('[data-agente-tela]', secao)
  const passos = $$('[data-agente-passo]', secao)
  const titulo = $('[data-agente-titulo]', secao)

  // Estado inicial: só a primeira tela visível; itens de todas escondidos.
  gsap.set(telas, { autoAlpha: 0 })
  gsap.set(telas[0], { autoAlpha: 1 })

  // onUpdate na TIMELINE (e não no ScrollTrigger): o scrub suaviza com atraso,
  // e o passo destacado tem que acompanhar o que está NA TELA, não o dedo.
  const tl = gsap.timeline({
    onUpdate: () => marcar(),
    scrollTrigger: {
      trigger: secao,
      start: 'top top',
      end: '+=420%',
      pin: palco,
      scrub: 0.8,
      anticipatePin: 1,
    },
  })

  const inicios: number[] = []

  telas.forEach((tela, i) => {
    if (i > 0) {
      tl.to(telas[i - 1], { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' })
      tl.fromTo(tela, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    }
    inicios.push(tl.duration() - (i > 0 ? 0.4 : 0))

    // Itens entram em grupos: `data-ordem` junta o que deve aparecer junto
    // (ex.: todas as linhas do diagrama). Sem ele, cada item é um grupo.
    const itens = $$('[data-agente-item]', tela)
    const grupos = new Map<number, HTMLElement[]>()
    itens.forEach((el, idx) => {
      const ordem = el.dataset.ordem !== undefined ? Number(el.dataset.ordem) : idx
      grupos.set(ordem, [...(grupos.get(ordem) ?? []), el])
    })

    ;[...grupos.keys()]
      .sort((a, b) => a - b)
      .forEach((ordem) => {
        const grupo = grupos.get(ordem)!
        const linhas = grupo.filter((el) => el.tagName.toLowerCase() === 'path')
        const blocos = grupo.filter((el) => el.tagName.toLowerCase() !== 'path')
        const pos = '+=0.08'
        if (linhas.length) {
          tl.fromTo(linhas, { opacity: 0.5, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: 'none', stagger: 0.03 }, pos)
        }
        if (blocos.length) {
          tl.fromTo(
            blocos,
            { opacity: 0, y: 14, scale: 0.96, transformOrigin: '50% 50%' },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)', stagger: 0.06 },
            linhas.length ? '<' : pos,
          )
        }
      })

    tl.to({}, { duration: 0.7 })
  })

  function marcar() {
    const t = tl.time()
    let ativo = 0
    inicios.forEach((inicio, i) => {
      if (t >= inicio - 0.01) ativo = i
    })
    passos.forEach((p, i) => p.classList.toggle('ativo', i === ativo))
    const rotulo = telas[ativo]?.dataset.titulo
    if (titulo && rotulo && titulo.textContent !== rotulo) titulo.textContent = rotulo
  }
  marcar()
}

/* OmniZap — os recursos entram em cascata. */
function omnizap(): void {
  gsap.from('[data-omnizap-recurso]', {
    opacity: 0,
    y: 60,
    duration: 1.1,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '[data-omnizap-recurso]', start: 'top 90%', once: true },
  })
}

/* ------------------------------------------------------------------ */
/* Clique Agenda — o celular mostra o agendamento tela a tela.        */
/* ------------------------------------------------------------------ */
function cliqueAgenda(): void {
  const secao = $('[data-clique]')
  if (!secao) return
  const palco = $('[data-clique-palco]', secao)!
  const telas = $('[data-clique-telas]', secao)!
  const logo = $('[data-clique-logo]', secao)
  const passos = $$('[data-clique-passo]', secao)

  const marcar = (progresso: number) => {
    const ativo = Math.min(passos.length - 1, Math.floor(progresso * passos.length))
    passos.forEach((p, i) => p.classList.toggle('ativo', i === ativo))
  }

  const mm = gsap.matchMedia()

  mm.add(DESKTOP, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: '+=200%',
        pin: palco,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (st) => marcar(st.progress),
      },
    })
    tl.to({}, { duration: 0.5 })
      .to(telas, { xPercent: -100 / 3, duration: 1, ease: 'power3.inOut' })
      .to({}, { duration: 0.5 })
      .to(telas, { xPercent: (-100 / 3) * 2, duration: 1, ease: 'power3.inOut' })
      .to({}, { duration: 0.5 })
    if (logo) tl.fromTo(logo, { rotate: -14, y: 10 }, { rotate: 10, y: -10, ease: 'none', duration: tl.duration() }, 0)
    marcar(0)
  })

  mm.add(MOVEL, () => {
    gsap
      .timeline({ scrollTrigger: { trigger: telas, start: 'top 70%', end: 'bottom 30%', scrub: 1 } })
      .to(telas, { xPercent: -100 / 3, duration: 1, ease: 'power2.inOut' })
      .to({}, { duration: 0.4 })
      .to(telas, { xPercent: (-100 / 3) * 2, duration: 1, ease: 'power2.inOut' })
  })

  if (logo) {
    gsap.from(logo, {
      scale: 0.4,
      rotate: -90,
      opacity: 0,
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: secao, start: 'top 70%', once: true },
    })
  }
}

/* Engenharia — o terminal digita o deploy quando entra na tela. */
function engenharia(): void {
  const linhas = $$('[data-terminal-linha]')
  const cursor = $('[data-terminal-cursor]')
  if (linhas.length && cursor) {
    const nos = linhas.map((el) => {
      const no = document.createTextNode('')
      el.textContent = ''
      el.append(no)
      return { el, no, texto: el.dataset.texto ?? '' }
    })
    nos[0].el.append(cursor)

    const tl = gsap.timeline({ paused: true })
    nos.forEach(({ el, no, texto }, i) => {
      const estado = { n: 0 }
      const ehComando = i === 0
      tl.call(() => el.append(cursor))
      tl.to(estado, {
        n: texto.length,
        duration: ehComando ? texto.length * 0.045 : 0.35,
        ease: 'none',
        onUpdate: () => (no.data = texto.slice(0, Math.round(estado.n))),
      })
      tl.to({}, { duration: ehComando ? 0.5 : 0.18 })
    })

    ScrollTrigger.create({ trigger: '[data-terminal]', start: 'top 75%', once: true, onEnter: () => tl.play() })
  }

  gsap.from('[data-pilar]', {
    opacity: 0,
    y: 50,
    duration: 1.1,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '[data-pilar]', start: 'top 88%', once: true },
  })
}

/* Processo — a linha se desenha e acende cada etapa quando passa por ela. */
function processo(): void {
  const linha = $('[data-processo-linha]')
  const passos = $$('[data-processo-passo]')
  if (!passos.length) return

  ScrollTrigger.create({
    trigger: '[data-processo]',
    start: 'top 65%',
    end: 'center 45%',
    scrub: 0.6,
    onUpdate: (st) => {
      if (linha) linha.style.strokeDashoffset = String(1000 * (1 - st.progress))
      passos.forEach((p, i) => p.classList.toggle('ativo', st.progress >= i / (passos.length - 1) - 0.02))
    },
  })

  gsap.from(passos, {
    opacity: 0,
    y: 50,
    duration: 1.1,
    ease: 'expo.out',
    stagger: 0.12,
    scrollTrigger: { trigger: passos[0], start: 'top 85%', once: true },
  })
}

/* A assinatura gigante do rodapé sobe letra por letra. */
function rodape(): void {
  const gigante = $('[data-gigante]')
  if (!gigante) return
  gsap.from($$('span', gigante), {
    yPercent: 100,
    opacity: 0,
    duration: 1.4,
    ease: 'expo.out',
    stagger: 0.06,
    scrollTrigger: { trigger: gigante, start: 'top 95%', once: true },
  })
}

/* A nav escurece enquanto passa por cima de uma seção escura. */
function navSobreEscuro(): void {
  const nav = $('[data-nav]')
  if (!nav) return
  $$('[data-tema="escuro"]').forEach((secao) => {
    ScrollTrigger.create({
      trigger: secao,
      start: 'top top+=26',
      end: 'bottom top+=26',
      toggleClass: { targets: nav, className: 'escuro' },
    })
  })
}

/* Luz que segue o mouse nas seções escuras. Só em quem tem mouse de verdade. */
function holofote(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  $$('[data-holofote]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  })
}
