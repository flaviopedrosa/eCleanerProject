import { OrdemServico } from '../../domain/entities/OrdemServico'

/**
 * Repositório para gerenciar ordens de serviço no localStorage
 */
export class OrdemServicoRepository {
  constructor() {
    this.storageKey = 'ecleaner_ordens_servico'
    this.counterKey = 'ecleaner_ordens_servico_counter'
  }

  /**
   * Salva todas as ordens de serviço
   */
  salvarTodas(ordensServico) {
    const ordensJson = ordensServico.map((ordem) => ordem.toJSON())
    localStorage.setItem(this.storageKey, JSON.stringify(ordensJson))
  }

  /**
   * Busca todas as ordens de serviço
   */
  buscarTodas() {
    const ordensJson = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    return ordensJson.map((ordemData) => OrdemServico.fromJSON(ordemData))
  }

  /**
   * Busca ordem de serviço por ID
   */
  buscarPorId(id) {
    const ordens = this.buscarTodas()
    return ordens.find((ordem) => ordem.Id === id)
  }

  /**
   * Busca ordem de serviço por ID do orçamento
   */
  buscarPorIdOrcamento(idOrcamento) {
    const ordens = this.buscarTodas()
    return ordens.find((ordem) => ordem.IdOrcamento === idOrcamento)
  }

  /**
   * Adiciona uma nova ordem de serviço
   */
  adicionar(ordemServico) {
    const ordens = this.buscarTodas()

    // Garantir que tem um ID único
    if (!ordemServico.Id) {
      const { gerarGuid } = require('../../domain/utils/guid')
      ordemServico.Id = gerarGuid()
    }

    // Verificar se já existe uma ordem com o mesmo ID
    const existeOrdem = ordens.find((o) => o.Id === ordemServico.Id)
    if (existeOrdem) {
      throw new Error(`Ordem de Serviço com ID ${ordemServico.Id} já existe`)
    }

    // Se não tem número de OS, gerar um
    if (!ordemServico.NumeroOS) {
      ordemServico.NumeroOS = this._gerarNumeroOS()
    }

    ordens.push(ordemServico)
    this.salvarTodas(ordens)

    return ordemServico
  }

  /**
   * Atualiza uma ordem de serviço existente
   */
  atualizar(ordemServico) {
    const ordens = this.buscarTodas()
    const indice = ordens.findIndex((o) => o.Id === ordemServico.Id)

    if (indice === -1) {
      throw new Error(`Ordem de Serviço com ID ${ordemServico.Id} não encontrada`)
    }

    ordens[indice] = ordemServico
    this.salvarTodas(ordens)

    return ordemServico
  }

  /**
   * Remove uma ordem de serviço
   */
  remover(id) {
    const ordens = this.buscarTodas()
    const ordensFiltradas = ordens.filter((ordem) => ordem.Id !== id)

    if (ordens.length === ordensFiltradas.length) {
      throw new Error(`Ordem de Serviço com ID ${id} não encontrada`)
    }

    this.salvarTodas(ordensFiltradas)
    return true
  }

  /**
   * Gera o próximo número de OS
   * Formato: OS-YYYY-NNNN (ex: OS-2026-0001)
   */
  _gerarNumeroOS() {
    const ano = new Date().getFullYear()
    const counter = this._getNextCounter()
    const numeroSequencial = String(counter).padStart(4, '0')
    return `OS-${ano}-${numeroSequencial}`
  }

  /**
   * Obtém e incrementa o contador de ordens de serviço
   */
  _getNextCounter() {
    const counterData = JSON.parse(localStorage.getItem(this.counterKey) || '{}')
    const ano = new Date().getFullYear()

    if (!counterData[ano]) {
      counterData[ano] = 0
    }

    counterData[ano]++
    localStorage.setItem(this.counterKey, JSON.stringify(counterData))

    return counterData[ano]
  }

  /**
   * Limpa todos os dados (útil para desenvolvimento/testes)
   */
  limparTodos() {
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem(this.counterKey)
  }
}
