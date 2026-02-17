import { gerarGuid } from '../utils/guid'
import { Cliente } from './cliente'
import { Imovel } from './imovel'
import { ItemOrcamento } from './itemOrcamento'
import { StatusOrdemServico } from '../enums/StatusOrdemServico'

/**
 * Classe que representa uma Ordem de Serviço.
 * Uma Ordem de Serviço é criada a partir de um Orçamento aprovado.
 */
export class OrdemServico {
  /**
   * @param {string} idOrcamento - ID do orçamento que originou esta ordem
   * @param {number} numeroOS - Número sequencial da ordem de serviço
   * @param {Cliente} cliente - Cliente para o qual a ordem de serviço foi criada
   * @param {Imovel} imovel - Imóvel onde os serviços serão prestados
   * @param {string} frequenciaDesejada - Frequência desejada para execução dos serviços
   * @param {number} quantidadeProfissionais - Quantidade sugerida de profissionais
   * @param {number} estimativaHoras - Estimativa de horas necessárias para o serviço
   * @param {number} descontos - Valor dos descontos aplicados
   * @param {number} impostosTaxas - Valor dos impostos e taxas
   */
  constructor(
    idOrcamento,
    numeroOS,
    cliente,
    imovel,
    frequenciaDesejada,
    quantidadeProfissionais,
    estimativaHoras,
    descontos = 0,
    impostosTaxas = 0,
  ) {
    this.Id = gerarGuid()
    this.IdOrcamento = idOrcamento
    this.NumeroOS = numeroOS
    this.DataCriacao = new Date()
    this.DataInicio = null
    this.DataConclusao = null
    this.InicioPrevisto = null
    this.FimPrevisto = null
    this.InicioReal = null
    this.FimReal = null
    this.IdEquipe = null
    this.DuracaoHoras = null

    if (!(cliente instanceof Cliente)) {
      throw new Error('O cliente fornecido não é uma instância válida da classe Cliente')
    }
    this.Cliente = cliente

    if (!(imovel instanceof Imovel)) {
      throw new Error('O imóvel fornecido não é uma instância válida da classe Imovel')
    }
    this.Imovel = imovel

    /** @type {ItemOrcamento[]} */
    this.Itens = []

    this.FrequenciaDesejada = frequenciaDesejada
    this.QuantidadeProfissionais = quantidadeProfissionais
    this.EstimativaHoras = estimativaHoras
    this.Descontos = descontos
    this.ImpostosTaxas = impostosTaxas
    this.Status = StatusOrdemServico.ABERTA
    this.Observacoes = ''
  }

  /**
   * Adiciona um item à ordem de serviço
   * @param {ItemOrcamento} item - O item a ser adicionado
   */
  adicionarItem(item) {
    if (!(item instanceof ItemOrcamento)) {
      throw new Error('O item fornecido não é uma instância válida da classe ItemOrcamento')
    }
    this.Itens.push(item)
  }

  /**
   * Remove um item da ordem de serviço
   * @param {ItemOrcamento} item - O item a ser removido
   */
  removerItem(item) {
    const index = this.Itens.indexOf(item)
    if (index > -1) {
      this.Itens.splice(index, 1)
    }
  }

  /**
   * Remove um item da ordem de serviço por ID
   * @param {string} itemId - O ID do item a ser removido
   */
  removerItemPorId(itemId) {
    const index = this.Itens.findIndex((item) => item.Id === itemId)
    if (index > -1) {
      this.Itens.splice(index, 1)
    }
  }

  /**
   * Calcula o subtotal de todos os itens
   * @returns {number} Subtotal dos itens
   */
  calcularSubtotal() {
    return this.Itens.reduce((total, item) => total + item.calcularTotal(), 0)
  }

  /**
   * Calcula o valor total da ordem de serviço
   * @returns {number} Valor total
   */
  calcularTotal() {
    const subtotal = this.calcularSubtotal()
    return subtotal - this.Descontos + this.ImpostosTaxas
  }

  /**
   * Inicia a execução da ordem de serviço
   */
  iniciar() {
    if (this.Status !== StatusOrdemServico.ABERTA) {
      throw new Error('Apenas ordens com status ABERTA podem ser iniciadas')
    }
    this.Status = StatusOrdemServico.EM_ANDAMENTO
    this.DataInicio = new Date()
  }

  /**
   * Conclui a ordem de serviço
   */
  concluir() {
    if (this.Status !== StatusOrdemServico.EM_ANDAMENTO) {
      throw new Error('Apenas ordens EM_ANDAMENTO podem ser concluídas')
    }
    this.Status = StatusOrdemServico.CONCLUIDA
    this.DataConclusao = new Date()
  }

  /**
   * Cancela a ordem de serviço
   * @param {string} motivo - Motivo do cancelamento
   */
  cancelar(motivo = '') {
    if (this.Status === StatusOrdemServico.CONCLUIDA) {
      throw new Error('Não é possível cancelar uma ordem já concluída')
    }
    this.Status = StatusOrdemServico.CANCELADA
    this.Observacoes = motivo ? `Cancelada: ${motivo}` : 'Cancelada'
  }

  /**
   * Atualiza o status da ordem de serviço
   * @param {string} novoStatus - Novo status
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusOrdemServico).includes(novoStatus)) {
      throw new Error(`Status inválido: ${novoStatus}`)
    }

    const statusValido = {
      [StatusOrdemServico.ABERTA]: [StatusOrdemServico.EM_ANDAMENTO, StatusOrdemServico.CANCELADA],
      [StatusOrdemServico.EM_ANDAMENTO]: [
        StatusOrdemServico.CONCLUIDA,
        StatusOrdemServico.CANCELADA,
      ],
      [StatusOrdemServico.CONCLUIDA]: [StatusOrdemServico.RECEBIDO],
      [StatusOrdemServico.RECEBIDO]: [],
      [StatusOrdemServico.CANCELADA]: [],
    }

    if (!statusValido[this.Status].includes(novoStatus)) {
      throw new Error(`Transição de status inválida: ${this.Status} -> ${novoStatus}`)
    }

    this.Status = novoStatus

    if (novoStatus === StatusOrdemServico.EM_ANDAMENTO && !this.DataInicio) {
      this.DataInicio = new Date()
    }
    if (novoStatus === StatusOrdemServico.CONCLUIDA && !this.DataConclusao) {
      this.DataConclusao = new Date()
    }
  }

  /**
   * Serializa a ordem de serviço para JSON
   * @returns {Object} Representação em JSON
   */
  toJSON() {
    return {
      Id: this.Id,
      IdOrcamento: this.IdOrcamento,
      NumeroOS: this.NumeroOS,
      DataCriacao: this.DataCriacao,
      DataInicio: this.DataInicio,
      DataConclusao: this.DataConclusao,
      InicioPrevisto: this.InicioPrevisto,
      FimPrevisto: this.FimPrevisto,
      InicioReal: this.InicioReal,
      FimReal: this.FimReal,
      IdEquipe: this.IdEquipe,
      DuracaoHoras: this.DuracaoHoras,
      Cliente: this.Cliente.toJSON(),
      Imovel: this.Imovel.toJSON(),
      Itens: this.Itens.map((item) => (typeof item.toJSON === 'function' ? item.toJSON() : item)),
      FrequenciaDesejada: this.FrequenciaDesejada,
      QuantidadeProfissionais: this.QuantidadeProfissionais,
      EstimativaHoras: this.EstimativaHoras,
      Descontos: this.Descontos,
      ImpostosTaxas: this.ImpostosTaxas,
      Status: this.Status,
      Observacoes: this.Observacoes,
    }
  }

  /**
   * Cria uma instância de OrdemServico a partir de dados JSON
   * @param {Object} data - Dados em formato JSON
   * @returns {OrdemServico} Nova instância de OrdemServico
   */
  static fromJSON(data) {
    const cliente = Cliente.fromJSON(data.Cliente)
    const imovel = Imovel.fromJSON(data.Imovel)

    const ordemServico = new OrdemServico(
      data.IdOrcamento,
      data.NumeroOS,
      cliente,
      imovel,
      data.FrequenciaDesejada,
      data.QuantidadeProfissionais,
      data.EstimativaHoras,
      data.Descontos,
      data.ImpostosTaxas,
    )
    ordemServico.InicioPrevisto = data.InicioPrevisto ? new Date(data.InicioPrevisto) : null
    ordemServico.FimPrevisto = data.FimPrevisto ? new Date(data.FimPrevisto) : null
    ordemServico.InicioReal = data.InicioReal ? new Date(data.InicioReal) : null
    ordemServico.FimReal = data.FimReal ? new Date(data.FimReal) : null
    ordemServico.IdEquipe = data.IdEquipe || null
    ordemServico.DuracaoHoras = data.DuracaoHoras || null
    ordemServico.Id = data.Id
    ordemServico.DataCriacao = data.DataCriacao ? new Date(data.DataCriacao) : new Date()
    ordemServico.DataInicio = data.DataInicio ? new Date(data.DataInicio) : null
    ordemServico.DataConclusao = data.DataConclusao ? new Date(data.DataConclusao) : null
    ordemServico.Status = data.Status || StatusOrdemServico.ABERTA
    ordemServico.Observacoes = data.Observacoes || ''

    if (data.Itens && Array.isArray(data.Itens)) {
      data.Itens.forEach((itemData) => {
        const item = ItemOrcamento.fromJSON(itemData)
        ordemServico.adicionarItem(item)
      })
    }

    return ordemServico
  }
}
