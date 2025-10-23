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
