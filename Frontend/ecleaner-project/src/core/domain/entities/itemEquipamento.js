import { gerarGuid } from '../utils/guid'
import { Equipamento } from './equipamento'

/**
 * Classe que representa um Item de Equipamento em um serviço.
 */
export class ItemEquipamento {
  /**
   * @param {Equipamento} equipamento - O equipamento a ser utilizado
   * @param {number} quantidade - A quantidade do equipamento
   * @param {number} custoUnitario - O custo unitário do equipamento
   * @param {string} observacao - Observações adicionais sobre o uso do equipamento
   */
  constructor(equipamento, quantidade, custoUnitario, observacao = '') {
    if (!(equipamento instanceof Equipamento)) {
      throw new Error('O equipamento fornecido não é uma instância válida da classe Equipamento')
    }

    if (quantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero')
    }

    if (custoUnitario < 0) {
      throw new Error('O custo unitário não pode ser negativo')
    }

    this.Id = gerarGuid()
    this.Equipamento = equipamento
    this.Quantidade = quantidade
    this.CustoUnitario = custoUnitario
    this.Observacao = observacao
    this.ValorTotal = this.calcularValorTotal()
  }

  /**
   * Calcula o valor total do item baseado na quantidade e custo unitário
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.CustoUnitario
  }

  /**
   * Atualiza a quantidade do equipamento e recalcula o valor total
   * @param {number} novaQuantidade - Nova quantidade do equipamento
   */
  atualizarQuantidade(novaQuantidade) {
    if (novaQuantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero')
    }

    this.Quantidade = novaQuantidade
    this.ValorTotal = this.calcularValorTotal()
  }

  /**
   * Atualiza o custo unitário do equipamento e recalcula o valor total
   * @param {number} novoCusto - Novo custo unitário do equipamento
   */
  atualizarCustoUnitario(novoCusto) {
    if (novoCusto < 0) {
      throw new Error('O custo unitário não pode ser negativo')
    }

    this.CustoUnitario = novoCusto
    this.ValorTotal = this.calcularValorTotal()
  }
}
