import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa uma atribuição de material para uma equipe
 */
export class AtribuicaoMaterial {
  /**
   * @param {string} materialId - ID do material atribuído
   * @param {string} equipeId - ID da equipe que recebeu o material
   * @param {number} quantidade - Quantidade atribuída
   * @param {Date} dataAtribuicao - Data da atribuição
   * @param {string} observacao - Observações sobre a atribuição
   * @param {string} responsavelId - ID do responsável pela atribuição (opcional)
   */
  constructor(
    materialId,
    equipeId,
    quantidade,
    dataAtribuicao = new Date(),
    observacao = '',
    responsavelId = '',
  ) {
    if (!materialId) {
      throw new Error('ID do material é obrigatório')
    }
    if (!equipeId) {
      throw new Error('ID da equipe é obrigatório')
    }
    if (!quantidade || quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }

    this.Id = gerarGuid()
    this.MaterialId = materialId
    this.EquipeId = equipeId
    this.Quantidade = quantidade
    this.DataAtribuicao = dataAtribuicao
    this.Observacao = observacao
    this.ResponsavelId = responsavelId
    this.DataDevolucao = null
    this.QuantidadeDevolvida = 0
    this.Status = 'ATIVO' // ATIVO, DEVOLVIDO_PARCIAL, DEVOLVIDO_TOTAL
  }

  /**
   * Registra devolução parcial ou total do material
   * @param {number} quantidade - Quantidade devolvida
   */
  registrarDevolucao(quantidade) {
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }

    const novaQuantidadeDevolvida = this.QuantidadeDevolvida + quantidade

    if (novaQuantidadeDevolvida > this.Quantidade) {
      throw new Error('Quantidade devolvida não pode ser maior que a quantidade atribuída')
    }

    this.QuantidadeDevolvida = novaQuantidadeDevolvida
    this.DataDevolucao = new Date()

    if (this.QuantidadeDevolvida === this.Quantidade) {
      this.Status = 'DEVOLVIDO_TOTAL'
    } else {
      this.Status = 'DEVOLVIDO_PARCIAL'
    }
  }

  /**
   * Retorna a quantidade ainda com a equipe
   */
  getQuantidadeAtual() {
    return this.Quantidade - this.QuantidadeDevolvida
  }

  /**
   * Verifica se a atribuição está ativa
   */
  estaAtiva() {
    return this.Status === 'ATIVO' || this.Status === 'DEVOLVIDO_PARCIAL'
  }
}
