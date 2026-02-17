/**
 * Funções Auxiliares para Contratos
 *
 * Substitui variáveis nos templates e formata dados para o contrato
 */

import { TEMPLATE_CONTRATO_PT_BR } from '../../domain/templates/contrato/pt-BR'
import { TEMPLATE_CONTRATO_EN_US } from '../../domain/templates/contrato/en-US'
import { formatarDocumento, mascaraDocumento } from './documentValidator'
import { getTipoDocumentoLabel } from '../../domain/enums/tipoDocumento'

/**
 * Obtém template do contrato conforme locale
 * @param {string} locale - pt-BR ou en-US
 * @returns {string}
 */
export function obterTemplateContrato(locale = 'pt-BR') {
  return locale === 'en-US' ? TEMPLATE_CONTRATO_EN_US : TEMPLATE_CONTRATO_PT_BR
}

/**
 * Formata periodicidade para exibição no contrato
 * @param {string} periodicidade - Periodicidade do orçamento
 * @param {number} quantidade - Quantidade no período
 * @param {string} locale - Idioma
 * @returns {string}
 */
function formatarPeriodicidade(periodicidade, quantidade, locale = 'pt-BR') {
  if (!periodicidade || periodicidade === 'Única') {
    return locale === 'en-US' ? 'One-time service' : 'Serviço único'
  }

  const labels = {
    'pt-BR': {
      Semana: quantidade === 1 ? 'Semanal' : `${quantidade} vezes por semana`,
      Mês: quantidade === 1 ? 'Mensal' : `${quantidade} vezes por mês`,
      Bimestre: quantidade === 1 ? 'Bimestral' : `A cada ${quantidade} bimestres`,
      Trimestre: quantidade === 1 ? 'Trimestral' : `A cada ${quantidade} trimestres`,
      Semestre: quantidade === 1 ? 'Semestral' : `A cada ${quantidade} semestres`,
      Ano: quantidade === 1 ? 'Anual' : `A cada ${quantidade} anos`,
    },
    'en-US': {
      Semana: quantidade === 1 ? 'Weekly' : `${quantidade} times per week`,
      Mês: quantidade === 1 ? 'Monthly' : `${quantidade} times per month`,
      Bimestre: quantidade === 1 ? 'Bimonthly' : `Every ${quantidade} bimonths`,
      Trimestre: quantidade === 1 ? 'Quarterly' : `Every ${quantidade} quarters`,
      Semestre: quantidade === 1 ? 'Semiannually' : `Every ${quantidade} semesters`,
      Ano: quantidade === 1 ? 'Annually' : `Every ${quantidade} years`,
    },
  }

  return labels[locale]?.[periodicidade] || periodicidade
}

/**
 * Formata prazo de vigência para o contrato
 * @param {number} meses - Prazo em meses
 * @param {string} locale - Idioma
 * @returns {string}
 */
function formatarPrazoVigencia(meses, locale = 'pt-BR') {
  if (!meses) {
    return locale === 'en-US' ? '' : ''
  }

  const anos = Math.floor(meses / 12)
  const mesesRestantes = meses % 12

  if (locale === 'en-US') {
    if (anos > 0 && mesesRestantes > 0) {
      return `, for a period of ${anos} year${anos > 1 ? 's' : ''} and ${mesesRestantes} month${mesesRestantes > 1 ? 's' : ''}`
    } else if (anos > 0) {
      return `, for a period of ${anos} year${anos > 1 ? 's' : ''}`
    } else {
      return `, for a period of ${meses} month${meses > 1 ? 's' : ''}`
    }
  } else {
    if (anos > 0 && mesesRestantes > 0) {
      return `, pelo período de ${anos} ano${anos > 1 ? 's' : ''} e ${mesesRestantes} mês${mesesRestantes > 1 ? 'es' : ''}`
    } else if (anos > 0) {
      return `, pelo período de ${anos} ano${anos > 1 ? 's' : ''}`
    } else {
      return `, pelo período de ${meses} mês${meses > 1 ? 'es' : ''}`
    }
  }
}

/**
 * Formata endereço para exibição
 * @param {Object} endereco
 * @returns {string}
 */
function formatarEndereco(endereco) {
  if (!endereco) return 'Não informado'

  const partes = []
  if (endereco.logradouro) partes.push(endereco.logradouro)
  if (endereco.numero) partes.push(endereco.numero)
  if (endereco.complemento) partes.push(endereco.complemento)
  if (endereco.bairro) partes.push(endereco.bairro)
  if (endereco.cidade && endereco.estado) partes.push(`${endereco.cidade} - ${endereco.estado}`)
  if (endereco.cep) partes.push(`CEP: ${endereco.cep}`)

  return partes.join(', ')
}

/**
 * Obtém descrição dos serviços do orçamento
 * @param {Object} orcamento
 * @param {string} locale
 * @returns {string}
 */
function obterDescricaoServicos(orcamento, locale = 'pt-BR') {
  if (orcamento.PacoteServico?.Nome) {
    return orcamento.PacoteServico.Nome
  }

  if (orcamento.Itens && orcamento.Itens.length > 0) {
    const servicos = orcamento.Itens.filter((item) => item.Tipo === 'servico')
      .map((item) => item.Descricao)
      .slice(0, 3)
      .join(', ')

    return servicos || (locale === 'en-US' ? 'Cleaning services' : 'Serviços de limpeza')
  }

  return locale === 'en-US' ? 'Cleaning services' : 'Serviços de limpeza'
}

/**
 * Formata valor monetário
 * @param {number} valor
 * @param {string} locale
 * @returns {string}
 */
function formatarValor(valor, locale = 'pt-BR') {
  if (locale === 'en-US') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(valor || 0)
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor || 0)
}

/**
 * Formata data
 * @param {Date} data
 * @param {string} locale
 * @returns {string}
 */
function formatarData(data, locale = 'pt-BR') {
  if (!data) return ''

  const dataObj = data instanceof Date ? data : new Date(data)

  return dataObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Gera texto do contrato substituindo variáveis do template
 * @param {Object} contrato - Contrato com orçamento
 * @param {Object} config - Configurações da empresa
 * @param {string} locale - Idioma (pt-BR ou en-US)
 * @returns {string}
 */
export function gerarTextoContrato(contrato, config, locale = 'pt-BR') {
  const orcamento = contrato.Orcamento
  const cliente = orcamento.Cliente || {}
  const imovel = orcamento.Imovel || {}

  // Obtém template
  let texto = obterTemplateContrato(locale)

  // Define variáveis para substituição
  const variaveis = {
    numeroContrato: contrato.NumeroContrato,
    nomeEmpresa: config.nomeEmpresa || 'eCleaner',
    cnpjEmpresa: config.cnpjEmpresa || 'Não informado',
    enderecoEmpresa: formatarEndereco(config.endereco),
    emailEmpresa: config.emailEmpresa || '',
    telefoneEmpresa: config.telefoneEmpresa || '',

    nomeCliente: cliente.Nome || 'Não informado',
    tipoDocumentoCliente: getTipoDocumentoLabel(cliente.TipoDocumento || 'CPF', locale),
    documentoCliente: formatarDocumento(
      cliente.TipoDocumento || 'CPF',
      cliente.NumeroDocumento || '',
    ),
    enderecoCliente: formatarEndereco(imovel.Endereco || cliente.Endereco),
    emailCliente: cliente.Email || '',
    telefoneCliente: cliente.Telefone || '',

    descricaoServicos: obterDescricaoServicos(orcamento, locale),
    numeroOrcamento: orcamento.NumeroOrcamento || '',
    enderecoImovel: formatarEndereco(imovel.Endereco),

    valorTotal: formatarValor(orcamento.ValorTotal, locale),
    periodicidade: formatarPeriodicidade(
      orcamento.Periodicidade,
      orcamento.QuantidadeNoPeriodo || 1,
      locale,
    ),
    prazoVigencia: formatarPrazoVigencia(contrato.PrazoVigenciaMeses, locale),

    cidadeEmpresa: config.endereco?.cidade || (locale === 'en-US' ? 'City' : 'Cidade'),
    dataEmissao: formatarData(contrato.DataEmissao, locale),
  }

  // Substitui todas as variáveis no template
  Object.keys(variaveis).forEach((chave) => {
    const regex = new RegExp(`{{${chave}}}`, 'g')
    texto = texto.replace(regex, variaveis[chave])
  })

  return texto
}

/**
 * Formata assinatura para exibição
 * @param {Object} assinatura - Dados da assinatura
 * @param {string} locale - Idioma
 * @returns {Object} - Dados formatados
 */
export function formatarAssinatura(assinatura, locale = 'pt-BR') {
  if (!assinatura) return null

  return {
    nome: assinatura.nome,
    tipoDocumento: getTipoDocumentoLabel(assinatura.tipoDocumento, locale),
    numeroDocumento: mascaraDocumento(assinatura.tipoDocumento, assinatura.numeroDocumento),
    data: formatarData(assinatura.timestamp, locale),
    hora:
      assinatura.timestamp instanceof Date
        ? assinatura.timestamp.toLocaleTimeString(locale)
        : new Date(assinatura.timestamp).toLocaleTimeString(locale),
    ip: assinatura.ip,
    hash: assinatura.hash.substring(0, 16) + '...',
    hashCompleto: assinatura.hash,
  }
}
