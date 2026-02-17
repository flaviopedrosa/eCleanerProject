/**
 * Repositório de Contratos
 *
 * Gerencia persistência de contratos no localStorage
 */

import { Contrato } from '../../domain/entities/contrato'

const STORAGE_KEY = 'ecleaner_contratos'

/**
 * Converte objeto JSON do localStorage para instância de Contrato
 */
function _jsonToContrato(json) {
  const contrato = Object.assign(new Contrato('', {}, new Date()), json)

  // Converte datas de string para Date
  if (json.DataEmissao) contrato.DataEmissao = new Date(json.DataEmissao)
  if (json.DataCriacao) contrato.DataCriacao = new Date(json.DataCriacao)
  if (json.DataAlteracao) contrato.DataAlteracao = new Date(json.DataAlteracao)
  if (json.TokenExpiraEm) contrato.TokenExpiraEm = new Date(json.TokenExpiraEm)
  if (json.DataAssinaturaCliente)
    contrato.DataAssinaturaCliente = new Date(json.DataAssinaturaCliente)
  if (json.DataAssinaturaPrestador)
    contrato.DataAssinaturaPrestador = new Date(json.DataAssinaturaPrestador)
  if (json.DataVigenciaInicio) contrato.DataVigenciaInicio = new Date(json.DataVigenciaInicio)
  if (json.DataVigenciaFim) contrato.DataVigenciaFim = new Date(json.DataVigenciaFim)
  if (json.DataCancelamento) contrato.DataCancelamento = new Date(json.DataCancelamento)

  // Converte timestamps no histórico
  if (json.Historico && Array.isArray(json.Historico)) {
    contrato.Historico = json.Historico.map((evento) => ({
      ...evento,
      timestamp: new Date(evento.timestamp),
    }))
  }

  // Converte timestamps nas assinaturas
  if (json.AssinaturaCliente?.timestamp) {
    contrato.AssinaturaCliente.timestamp = new Date(json.AssinaturaCliente.timestamp)
  }
  if (json.AssinaturaPrestador?.timestamp) {
    contrato.AssinaturaPrestador.timestamp = new Date(json.AssinaturaPrestador.timestamp)
  }

  return contrato
}

/**
 * Carrega todos os contratos do localStorage
 */
function _loadContratos() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []

  try {
    const json = JSON.parse(data)
    return json.map(_jsonToContrato)
  } catch (error) {
    console.error('Erro ao carregar contratos:', error)
    return []
  }
}

/**
 * Salva array de contratos no localStorage
 */
function _saveContratos(contratos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contratos))
  } catch (error) {
    console.error('Erro ao salvar contratos:', error)
    throw new Error('Falha ao salvar contratos')
  }
}

/**
 * Busca todos os contratos
 */
export function buscarTodos() {
  return _loadContratos()
}

/**
 * Busca contrato por ID
 */
export function buscarPorId(id) {
  const contratos = _loadContratos()
  return contratos.find((c) => c.Id === id)
}

/**
 * Busca contrato por número
 */
export function buscarPorNumero(numeroContrato) {
  const contratos = _loadContratos()
  return contratos.find((c) => c.NumeroContrato === numeroContrato)
}

/**
 * Busca contratos por ID do orçamento
 */
export function buscarPorOrcamento(orcamentoId) {
  const contratos = _loadContratos()
  return contratos.filter((c) => c.Orcamento?.Id === orcamentoId)
}

/**
 * Busca contratos por cliente
 */
export function buscarPorCliente(clienteId) {
  const contratos = _loadContratos()
  return contratos.filter((c) => c.Orcamento?.Cliente?.Id === clienteId)
}

/**
 * Busca contratos por status
 */
export function buscarPorStatus(status) {
  const contratos = _loadContratos()
  return contratos.filter((c) => c.Status === status)
}

/**
 * Busca contrato por token de assinatura
 */
export function buscarPorToken(token) {
  const contratos = _loadContratos()
  return contratos.find((c) => c.TokenAssinatura === token)
}

/**
 * Salva novo contrato
 */
export function salvar(contrato) {
  if (!contrato || !contrato.Id) {
    throw new Error('Contrato inválido')
  }

  const contratos = _loadContratos()

  // Verifica se já existe
  const index = contratos.findIndex((c) => c.Id === contrato.Id)

  if (index >= 0) {
    throw new Error('Contrato com este ID já existe. Use atualizar() em vez de salvar()')
  }

  contratos.push(contrato)
  _saveContratos(contratos)

  return contrato
}

/**
 * Atualiza contrato existente
 */
export function atualizar(contrato) {
  if (!contrato || !contrato.Id) {
    throw new Error('Contrato inválido')
  }

  const contratos = _loadContratos()
  const index = contratos.findIndex((c) => c.Id === contrato.Id)

  if (index < 0) {
    throw new Error('Contrato não encontrado')
  }

  contrato.DataAlteracao = new Date()
  contratos[index] = contrato
  _saveContratos(contratos)

  return contrato
}

/**
 * Deleta contrato por ID
 */
export function deletar(id) {
  const contratos = _loadContratos()
  const filtered = contratos.filter((c) => c.Id !== id)

  if (contratos.length === filtered.length) {
    throw new Error('Contrato não encontrado')
  }

  _saveContratos(filtered)
}

/**
 * Obtém o próximo número sequencial de contrato do ano
 */
export function obterProximoSequencial() {
  const contratos = _loadContratos()
  const anoAtual = new Date().getFullYear()

  // Filtra contratos do ano atual
  const contratosDoAno = contratos.filter((c) => {
    const match = c.NumeroContrato.match(/CONT-(\d{4})-(\d{4})/)
    return match && parseInt(match[1]) === anoAtual
  })

  if (contratosDoAno.length === 0) {
    return 1
  }

  // Encontra o maior número sequencial
  const maiorSequencial = contratosDoAno.reduce((max, c) => {
    const match = c.NumeroContrato.match(/CONT-\d{4}-(\d{4})/)
    const seq = match ? parseInt(match[1]) : 0
    return Math.max(max, seq)
  }, 0)

  return maiorSequencial + 1
}

/**
 * Verifica se já existe contrato ativo para o orçamento
 */
export function existeContratoAtivoParaOrcamento(orcamentoId) {
  const contratos = buscarPorOrcamento(orcamentoId)

  // Considera ativo se não estiver cancelado ou expirado
  return contratos.some((c) => c.Status !== 'CANCELADO' && c.Status !== 'EXPIRADO')
}

/**
 * Busca contratos expirados (AGUARDANDO_ASSINATURA com token expirado)
 */
export function buscarExpirados() {
  const contratos = _loadContratos()
  const agora = new Date()

  return contratos.filter(
    (c) =>
      c.Status === 'AGUARDANDO_ASSINATURA' && c.TokenExpiraEm && agora > new Date(c.TokenExpiraEm),
  )
}

/**
 * Atualiza status de contratos expirados
 * Retorna número de contratos atualizados
 */
export function atualizarExpirados() {
  const expirados = buscarExpirados()

  expirados.forEach((contrato) => {
    contrato.verificarExpiracao()
    atualizar(contrato)
  })

  return expirados.length
}

/**
 * Estatísticas de contratos
 */
export function obterEstatisticas() {
  const contratos = _loadContratos()

  return {
    total: contratos.length,
    rascunho: contratos.filter((c) => c.Status === 'RASCUNHO').length,
    aguardandoAssinatura: contratos.filter((c) => c.Status === 'AGUARDANDO_ASSINATURA').length,
    assinadoCliente: contratos.filter((c) => c.Status === 'ASSINADO_CLIENTE').length,
    vigente: contratos.filter((c) => c.Status === 'VIGENTE').length,
    cancelado: contratos.filter((c) => c.Status === 'CANCELADO').length,
    expirado: contratos.filter((c) => c.Status === 'EXPIRADO').length,
  }
}

/**
 * Limpa todos os contratos (apenas para desenvolvimento/testes)
 */
export function limparTodos() {
  localStorage.removeItem(STORAGE_KEY)
}
