/**
 * Formulário de diagnóstico — mesma lógica e mesmo contrato do site oficial
 * (SITE OMNI.IA/src/hooks/useFormularioContato.ts), sem React.
 *
 * ⚠️ Validação aqui é conveniência, NÃO segurança: quem protege é o n8n.
 */

const URL_WEBHOOK_PADRAO = 'https://webhook.omniiabr.com/webhook/Formulario'

// Checagem explícita (e não `??`): variável VAZIA em produção já quebrou o
// formulário do site oficial uma vez — ver comentário no hook original.
const urlConfigurada = (import.meta.env.PUBLIC_WEBHOOK_CONTATO as string | undefined)?.trim()
const URL_WEBHOOK = urlConfigurada ? urlConfigurada : URL_WEBHOOK_PADRAO

type Dados = Record<string, string | boolean>
type Erros = Record<string, string>

function validar(d: Dados): Erros {
  const erros: Erros = {}
  const texto = (k: string) => String(d[k] ?? '').trim()

  const nome = texto('nome')
  if (nome.length < 2) erros.nome = 'Digite seu nome completo'
  else if (nome.length > 120) erros.nome = 'Nome muito longo'

  const email = texto('email')
  if (!email) erros.email = 'Digite seu e-mail'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) erros.email = 'E-mail inválido'
  else if (email.length > 160) erros.email = 'E-mail muito longo'

  const digitos = texto('whatsapp').replace(/\D/g, '')
  if (!digitos) erros.whatsapp = 'Digite seu WhatsApp'
  else if (digitos.length < 10 || digitos.length > 13) erros.whatsapp = 'Número incompleto'

  if (texto('empresa').length < 2) erros.empresa = 'Digite o nome da empresa'
  if (!texto('interesse')) erros.interesse = 'Escolha uma opção'

  const mensagem = texto('mensagem')
  if (mensagem.length < 10) erros.mensagem = 'Conte um pouco mais sobre a operação'
  else if (mensagem.length > 2000) erros.mensagem = 'Mensagem muito longa (máximo 2000 caracteres)'

  if (!d.consentimento) erros.consentimento = 'Precisamos da sua autorização para entrar em contato'

  return erros
}

export function iniciarFormulario(): void {
  const form = document.querySelector<HTMLFormElement>('[data-form]')
  if (!form) return

  const botao = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
  const rotuloBotao = botao.querySelector('span')!
  const textoOriginal = rotuloBotao.textContent ?? ''
  const erroGeral = form.querySelector<HTMLElement>('[data-form-erro]')!
  const sucesso = document.querySelector<HTMLElement>('[data-form-sucesso]')!

  const mostrarErros = (erros: Erros) => {
    form.querySelectorAll<HTMLElement>('[data-erro-de]').forEach((el) => {
      const campo = el.dataset.erroDe!
      el.textContent = erros[campo] ?? ''
      const input = form.elements.namedItem(campo) as HTMLInputElement | null
      input?.setAttribute('aria-invalid', String(Boolean(erros[campo])))
    })
    const primeiro = Object.keys(erros)[0]
    if (primeiro) (form.elements.namedItem(primeiro) as HTMLElement | null)?.focus()
  }

  // Erro some assim que a pessoa corrige o campo.
  form.addEventListener('input', (e) => {
    const alvo = e.target as HTMLInputElement
    const aviso = form.querySelector<HTMLElement>(`[data-erro-de="${alvo.name}"]`)
    if (aviso?.textContent) {
      aviso.textContent = ''
      alvo.setAttribute('aria-invalid', 'false')
    }
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    erroGeral.hidden = true

    const fd = new FormData(form)
    const dados: Dados = {
      nome: String(fd.get('nome') ?? ''),
      email: String(fd.get('email') ?? ''),
      whatsapp: String(fd.get('whatsapp') ?? ''),
      empresa: String(fd.get('empresa') ?? ''),
      site: String(fd.get('site') ?? ''),
      faturamento: String(fd.get('faturamento') ?? ''),
      leads: String(fd.get('leads') ?? ''),
      interesse: String(fd.get('interesse') ?? ''),
      mensagem: String(fd.get('mensagem') ?? ''),
      consentimento: fd.get('consentimento') === 'on',
    }

    const concluir = () => {
      form.hidden = true
      sucesso.hidden = false
      sucesso.focus()
    }

    // Honeypot preenchido = robô. Finge sucesso para ele não tentar outro caminho.
    if (fd.get('armadilha')) {
      concluir()
      return
    }

    const erros = validar(dados)
    if (Object.keys(erros).length > 0) {
      mostrarErros(erros)
      return
    }

    botao.disabled = true
    rotuloBotao.textContent = botao.dataset.enviando ?? 'Enviando…'

    try {
      const resposta = await fetch(URL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dados, origem: 'site-omniiabr', enviadoEm: new Date().toISOString() }),
      })
      if (!resposta.ok) throw new Error(`Webhook respondeu ${resposta.status}`)
      form.reset()
      concluir()
    } catch {
      erroGeral.hidden = false
    } finally {
      botao.disabled = false
      rotuloBotao.textContent = textoOriginal
    }
  })
}
