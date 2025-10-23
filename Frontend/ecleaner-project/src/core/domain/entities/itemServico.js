import { gerarGuid } from '../utils/guid'
import { Servico } from './servico'

/**
 * Classe que representa um Item de Servi\u00e7o.
 */
export class ItemServico {
  /**
   * @param {Servico} servico - O servi\u00e7o a ser prestado
   * @param {number} quantidade - A quantidade do servi\u00e7o
   * @param {number} tempoEstimado - Tempo estimado em minutos
   * @param {number} quantidadePessoas - N\u00famero de pessoas necess\u00e1rias
   */
  constructor(servico, quantidade, tempoEstimado, quantidadePessoas) {
    if (!(servico instanceof Servico)) {
      throw new Error(
        'O servi\u00e7o fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida da classe Servico',
      )
    }

    this.Id = gerarGuid()
    this.Servico = servico
    this.Quantidade = quantidade
    this.TempoEstimado = tempoEstimado
    this.QuantidadePessoas = quantidadePessoas
    this.ValorTotal = this.calcularValorTotal()
  }

  /**
   * Calcula o valor total do item baseado na quantidade e valor do serviço
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.Servico.Valor
  }

  /**
   * Calcula o tempo total em horas considerando a quantidade de pessoas
   * @returns {number} Tempo total em horas
   */
  calcularTempoTotalHoras() {
    // Converte o tempo estimado de minutos para horas e divide pelo n\u00famero de pessoas
    return this.TempoEstimado / 60 / this.QuantidadePessoas
  }
}
