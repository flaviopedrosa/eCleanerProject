import emailjs from '@emailjs/browser'

/**
 * Envia um orçamento por e-mail usando EmailJS com template completo
 *
 * NOTA: PDF não é enviado como anexo devido ao limite de 50KB do EmailJS.
 * O e-mail contém todos os detalhes do orçamento em formato HTML com tabela de itens.
 *
 * @param {Object} params - Parâmetros do e-mail
 * @param {string} params.clienteEmail - E-mail do cliente destinatário
 * @param {string} params.clienteNome - Nome completo do cliente
 * @param {string} params.numeroOrcamento - Número do orçamento
 * @param {string} params.valorTotal - Valor total formatado
 * @param {string} params.nomeEmpresa - Nome da empresa
 * @param {string} params.dataEmissao - Data de emissão do orçamento
 * @param {string} params.validade - Data de validade do orçamento
 * @param {string} params.status - Status do orçamento
 * @param {string} params.emailEmpresa - E-mail da empresa
 * @param {string} params.telefoneEmpresa - Telefone da empresa
 * @param {string} params.enderecoCompleto - Endereço completo da empresa
 * @param {Array} params.itens - Array de itens do orçamento
 * @param {string} [params.observacoes] - Observações do orçamento (opcional)
 * @returns {Promise<void>}
 */
export async function enviarOrcamentoPorEmail({
  clienteEmail,
  clienteNome,
  nomeEmpresa,
  emailEmpresa,
  telefoneEmpresa,
  numeroOrcamento,
  dataEmissao,
  validade,
  status,
  valorTotal,
  observacoes,
  enderecoCompleto,
  itens = [],
}) {
  try {
    // Lê configuração do localStorage
    const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

    const publicKey = config.emailJsKey
    const serviceId = config.emailJsServiceId || 'default_service'
    const templateId = config.emailJsTemplateIdOrcamento || 'orcamento_template'

    if (!publicKey) {
      throw new Error('EmailJS Public Key não configurada. Configure em Configurações do Sistema.')
    }

    // Inicializa o EmailJS
    emailjs.init(publicKey)

    // Função para sanitizar strings (remover caracteres problemáticos)
    const sanitize = (str) => {
      if (!str) return ''
      return String(str)
        .replace(/[{}]/g, '') // Remove chaves que podem conflitar com variáveis
        .replace(/[\r\n\t]/g, ' ') // Remove quebras de linha e tabs
        .trim()
    }

    // Converter itens para HTML (EmailJS não suporta arrays no template)
    const itensHTML = (itens || [])
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">${sanitize(item.numero || '')}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0;">${sanitize(item.descricao || '')}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">${sanitize(item.quantidade || '')}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">${sanitize(item.unidade || '')}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0; text-align: right;">${sanitize(item.precoUnitario || '')}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #e0e0e0; text-align: right;"><strong>${sanitize(item.total || '')}</strong></td>
      </tr>
    `,
      )
      .join('')

    // Prepara os parâmetros do template - TODOS como strings sanitizadas
    const templateParams = {
      to_email: sanitize(clienteEmail),
      to_name: sanitize(clienteNome),
      reply_to: sanitize(emailEmpresa),
      nomeEmpresa: sanitize(nomeEmpresa),
      clienteNome: sanitize(clienteNome),
      numeroOrcamento: sanitize(numeroOrcamento),
      dataEmissao: sanitize(dataEmissao),
      validade: sanitize(validade),
      status: sanitize(status),
      valorTotal: sanitize(valorTotal),
      emailEmpresa: sanitize(emailEmpresa),
      telefoneEmpresa: sanitize(telefoneEmpresa),
      enderecoCompleto: sanitize(enderecoCompleto),
      observacoes: sanitize(observacoes) || 'Nenhuma observação adicional',
      itensHTML: itensHTML,
      quantidadeItens: String((itens || []).length),
    }

    console.log('📧 Enviando e-mail com os seguintes dados:', {
      destinatario: clienteEmail,
      numeroOrcamento,
      quantidadeItens: itens?.length || 0,
      serviceId,
      templateId,
      tamanhoDados: JSON.stringify(templateParams).length + ' bytes',
    })

    // Log detalhado de cada parâmetro
    console.log('📋 Template Parameters:', templateParams)

    // Verificar se algum parâmetro está null/undefined
    Object.keys(templateParams).forEach((key) => {
      if (templateParams[key] === null || templateParams[key] === undefined) {
        console.warn(`⚠️ Parâmetro ${key} está null/undefined`)
      }
    })

    // Envia o e-mail
    const response = await emailjs.send(serviceId, templateId, templateParams)

    console.log('✅ E-mail enviado com sucesso!', response)
    return response
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error)
    throw error
  }
}

/**
 * Valida se a configuração do EmailJS está completa
 *
 * @returns {Object} { isValid: boolean, message: string }
 */
export function validarConfiguracaoEmailJS() {
  const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

  if (!config.emailJsKey) {
    return {
      isValid: false,
      message: 'EmailJS Public Key não configurada',
    }
  }

  return {
    isValid: true,
    message: 'Configuração válida',
  }
}

/**
 * Envia contrato para assinatura do cliente
 *
 * @param {Object} params - Parâmetros do e-mail
 * @param {string} params.clienteEmail - E-mail do cliente
 * @param {string} params.clienteNome - Nome do cliente
 * @param {string} params.numeroContrato - Número do contrato
 * @param {string} params.numeroOrcamento - Número do orçamento relacionado
 * @param {string} params.valorTotal - Valor total formatado
 * @param {string} params.nomeEmpresa - Nome da empresa
 * @param {string} params.emailEmpresa - E-mail da empresa
 * @param {string} params.telefoneEmpresa - Telefone da empresa
 * @param {string} params.linkAssinatura - URL para assinatura pública
 * @param {string} params.dataExpiracao - Data de expiração do link (72h)
 * @param {string} [params.locale] - Idioma (pt-BR ou en-US)
 * @returns {Promise<void>}
 */
export async function enviarContratoParaAssinatura({
  clienteEmail,
  clienteNome,
  nomeEmpresa,
  emailEmpresa,
  telefoneEmpresa,
  numeroContrato,
  numeroOrcamento,
  valorTotal,
  linkAssinatura,
  dataExpiracao,
  locale = 'pt-BR',
}) {
  try {
    // Lê configuração do localStorage
    const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

    const publicKey = config.emailJsKey
    const serviceId = config.emailJsServiceId || 'default_service'
    const templateId = config.emailJsTemplateIdContrato || 'contrato_template'

    if (!publicKey) {
      throw new Error('EmailJS Public Key não configurada. Configure em Configurações do Sistema.')
    }

    // Inicializa o EmailJS
    emailjs.init(publicKey)

    // Função para sanitizar strings
    const sanitize = (str) => {
      if (!str) return ''
      return String(str)
        .replace(/[{}]/g, '')
        .replace(/[\r\n\t]/g, ' ')
        .trim()
    }

    // Textos conforme idioma
    const textos = {
      'pt-BR': {
        assunto: `Contrato de Prestação de Serviços #${numeroContrato} - Aguardando Assinatura`,
        saudacao: 'Olá',
        paragrafo1:
          'Seu contrato de prestação de serviços está pronto e aguarda sua assinatura digital.',
        labelContrato: 'Contrato:',
        labelOrcamento: 'Orçamento:',
        labelValor: 'Valor Total:',
        labelEmpresa: 'Empresa:',
        instrucao: 'Para visualizar e assinar o contrato, clique no link abaixo:',
        botao: 'ASSINAR CONTRATO',
        validade: 'Este link é válido até',
        duvidas: 'Qualquer dúvida, entre em contato conosco:',
        despedida: 'Atenciosamente,',
      },
      'en-US': {
        assunto: `Service Agreement #${numeroContrato} - Awaiting Signature`,
        saudacao: 'Hello',
        paragrafo1: 'Your service agreement is ready and awaiting your digital signature.',
        labelContrato: 'Contract:',
        labelOrcamento: 'Quote:',
        labelValor: 'Total Amount:',
        labelEmpresa: 'Company:',
        instrucao: 'To view and sign the contract, click the link below:',
        botao: 'SIGN CONTRACT',
        validade: 'This link is valid until',
        duvidas: 'If you have any questions, please contact us:',
        despedida: 'Sincerely,',
      },
    }

    const t = textos[locale] || textos['pt-BR']

    // Prepara os parâmetros do template
    const templateParams = {
      to_email: sanitize(clienteEmail),
      to_name: sanitize(clienteNome),
      reply_to: sanitize(emailEmpresa),
      subject: sanitize(t.assunto),

      // Textos traduzidos
      saudacao: sanitize(t.saudacao),
      paragrafo1: sanitize(t.paragrafo1),
      labelContrato: sanitize(t.labelContrato),
      labelOrcamento: sanitize(t.labelOrcamento),
      labelValor: sanitize(t.labelValor),
      labelEmpresa: sanitize(t.labelEmpresa),
      instrucao: sanitize(t.instrucao),
      botaoTexto: sanitize(t.botao),
      validadeTexto: sanitize(t.validade),
      duvidasTexto: sanitize(t.duvidas),
      despedida: sanitize(t.despedida),

      // Dados do contrato
      nomeEmpresa: sanitize(nomeEmpresa),
      clienteNome: sanitize(clienteNome),
      numeroContrato: sanitize(numeroContrato),
      numeroOrcamento: sanitize(numeroOrcamento),
      valorTotal: sanitize(valorTotal),
      emailEmpresa: sanitize(emailEmpresa),
      telefoneEmpresa: sanitize(telefoneEmpresa),
      linkAssinatura: sanitize(linkAssinatura),
      dataExpiracao: sanitize(dataExpiracao),
    }

    console.log('📧 Enviando contrato para assinatura:', {
      destinatario: clienteEmail,
      numeroContrato,
      serviceId,
      templateId,
      locale,
    })

    // Envia o e-mail
    const response = await emailjs.send(serviceId, templateId, templateParams)

    console.log('✅ E-mail de contrato enviado com sucesso!', response)
    return response
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail de contrato:', error)
    throw error
  }
}

/**
 * Envia email de confirmação de assinatura
 *
 * @param {Object} params - Parâmetros
 * @param {string} params.destinatarioEmail - Email do destinatário
 * @param {string} params.destinatarioNome - Nome do destinatário
 * @param {string} params.numeroContrato - Número do contrato
 * @param {string} params.tipoAssinante - 'CLIENTE' ou 'PRESTADOR'
 * @param {string} params.nomeEmpresa - Nome da empresa
 * @param {string} params.emailEmpresa - Email da empresa
 * @param {string} params.locale - Idioma
 * @returns {Promise<void>}
 */
export async function enviarConfirmacaoAssinatura({
  destinatarioEmail,
  destinatarioNome,
  numeroContrato,
  tipoAssinante,
  nomeEmpresa,
  emailEmpresa,
  locale = 'pt-BR',
}) {
  try {
    const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
    const publicKey = config.emailJsKey

    if (!publicKey) {
      throw new Error('EmailJS não configurado')
    }

    emailjs.init(publicKey)

    const textos = {
      'pt-BR': {
        assunto: `Contrato #${numeroContrato} - Assinatura Confirmada`,
        mensagem:
          tipoAssinante === 'CLIENTE'
            ? 'Sua assinatura foi registrada com sucesso!'
            : 'O cliente assinou o contrato. Aguardando sua assinatura.',
        proximoPasso:
          tipoAssinante === 'CLIENTE'
            ? 'Aguardamos a assinatura da empresa para ativar o contrato.'
            : 'Acesse o sistema para assinar e ativar o contrato.',
      },
      'en-US': {
        assunto: `Contract #${numeroContrato} - Signature Confirmed`,
        mensagem:
          tipoAssinante === 'CLIENTE'
            ? 'Your signature has been successfully registered!'
            : 'The client has signed the contract. Awaiting your signature.',
        proximoPasso:
          tipoAssinante === 'CLIENTE'
            ? 'We are awaiting the company signature to activate the contract.'
            : 'Access the system to sign and activate the contract.',
      },
    }

    const t = textos[locale] || textos['pt-BR']

    const templateParams = {
      to_email: destinatarioEmail,
      to_name: destinatarioNome,
      reply_to: emailEmpresa,
      subject: t.assunto,
      mensagem: t.mensagem,
      proximoPasso: t.proximoPasso,
      numeroContrato,
      nomeEmpresa,
    }

    const serviceId = config.emailJsServiceId || 'default_service'
    const templateId = 'confirmacao_assinatura_template'

    await emailjs.send(serviceId, templateId, templateParams)

    console.log('✅ Email de confirmação enviado')
  } catch (error) {
    console.error('❌ Erro ao enviar email de confirmação:', error)
    // Não lança erro para não bloquear o fluxo principal
  }
}
