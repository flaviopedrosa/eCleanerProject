/**
 * Repositório para gerenciar orçamentos no localStorage
 */
export class OrcamentoRepository {
  constructor() {
    this.storageKey = 'ecleaner_orcamentos'
  }

  /**
   * Salva todos os orçamentos
   */
  salvarTodos(orcamentos) {
    const orcamentosJson = orcamentos.map((orcamento) => this._orcamentoToJson(orcamento))
    localStorage.setItem(this.storageKey, JSON.stringify(orcamentosJson))
  }

  /**
   * Busca todos os orçamentos
   */
  buscarTodos() {
    const orcamentosJson = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    return orcamentosJson.map((orcamentoData) => this._jsonToOrcamento(orcamentoData))
  }

  /**
   * Busca orçamento por ID
   */
  buscarPorId(id) {
    const orcamentos = this.buscarTodos()
    return orcamentos.find((orcamento) => orcamento.Id === id)
  }

  /**
   * Adiciona um novo orçamento
   */
  adicionar(orcamento) {
    const orcamentos = this.buscarTodos()

    // Garantir que tem um ID único
    if (!orcamento.Id || orcamento.Id === null) {
      orcamento.Id = this._gerarId()
    }

    // Verificar se já existe um orçamento com o mesmo ID
    const existeOrcamento = orcamentos.find((o) => o.Id === orcamento.Id)
    if (existeOrcamento) {
      throw new Error(`Orçamento com ID ${orcamento.Id} já existe`)
    }

    // Adicionar timestamp de criação
    orcamento.CriadoEm = new Date().toISOString()
    orcamento.AtualizadoEm = new Date().toISOString()

    orcamentos.push(orcamento)
    this.salvarTodos(orcamentos)

    return orcamento
  }

  /**
   * Atualiza um orçamento existente
   */
  atualizar(orcamento) {
    console.log('Repository atualizar - Recebendo orçamento:', orcamento)
    console.log('Repository atualizar - ID do orçamento:', orcamento.Id)

    const orcamentos = this.buscarTodos()
    const indice = orcamentos.findIndex((o) => o.Id === orcamento.Id)

    if (indice === -1) {
      throw new Error(`Orçamento com ID ${orcamento.Id} não encontrado`)
    }

    // Manter data de criação original e atualizar data de modificação
    orcamento.CriadoEm = orcamentos[indice].CriadoEm
    orcamento.AtualizadoEm = new Date().toISOString()

    orcamentos[indice] = orcamento
    this.salvarTodos(orcamentos)

    return orcamento
  }

  /**
   * Remove um orçamento
   */
  remover(id) {
    const orcamentos = this.buscarTodos()
    const indice = orcamentos.findIndex((o) => o.Id === id)

    if (indice === -1) {
      throw new Error(`Orçamento com ID ${id} não encontrado`)
    }

    const orcamentoRemovido = orcamentos.splice(indice, 1)[0]
    this.salvarTodos(orcamentos)

    return orcamentoRemovido
  }

  /**
   * Gera um ID único para novos orçamentos
   */
  _gerarId() {
    return `orc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Converte orçamento para JSON serializable
   */
  _orcamentoToJson(orcamento) {
    return {
      Id: orcamento.Id,
      NumeroOrcamento: orcamento.NumeroOrcamento,
      DataEmissao: orcamento.DataEmissao,
      Validade: orcamento.Validade,
      Status: orcamento.Status,
      Cliente: orcamento.Cliente,
      Imovel: orcamento.Imovel,
      PacoteServico: orcamento.PacoteServico,
      Itens: orcamento.Itens || [],
      FrequenciaDesejada: orcamento.FrequenciaDesejada,
      QuantidadeProfissionais: orcamento.QuantidadeProfissionais,
      EstimativaHoras: orcamento.EstimativaHoras,
      Descontos: orcamento.Descontos || 0,
      ImpostosTaxas: orcamento.ImpostosTaxas || 0,
      ValorTotal: orcamento.ValorTotal || 0,
      Observacoes: orcamento.Observacoes || '',
      CriadoEm: orcamento.CriadoEm || new Date().toISOString(),
      AtualizadoEm: orcamento.AtualizadoEm || new Date().toISOString(),
    }
  }

  /**
   * Converte JSON para instância de Orçamento
   * Nota: Esta é uma versão simplificada que não reconstrói completamente as instâncias
   * das classes relacionadas, mas preserva os dados para exibição
   */
  _jsonToOrcamento(data) {
    // Para fins de listagem e edição, retornamos um objeto simples
    // que será convertido para instância Orcamento quando necessário
    return {
      Id: data.Id,
      NumeroOrcamento: data.NumeroOrcamento,
      DataEmissao: data.DataEmissao,
      Validade: data.Validade,
      Status: data.Status,
      Cliente: data.Cliente,
      Imovel: data.Imovel,
      PacoteServico: data.PacoteServico,
      Itens: data.Itens || [],
      FrequenciaDesejada: data.FrequenciaDesejada,
      QuantidadeProfissionais: data.QuantidadeProfissionais,
      EstimativaHoras: data.EstimativaHoras,
      Descontos: data.Descontos || 0,
      ImpostosTaxas: data.ImpostosTaxas || 0,
      ValorTotal: data.ValorTotal || 0,
      Observacoes: data.Observacoes || '',
      CriadoEm: data.CriadoEm,
      AtualizadoEm: data.AtualizadoEm,
    }
  }
}

// Instância singleton do repositório
export const orcamentoRepository = new OrcamentoRepository()
