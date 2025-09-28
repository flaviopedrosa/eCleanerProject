import { gerarGuid } from '../utils/guid'
import { Material } from './material'

/**
 * Classe que representa um Item de Material em um servi\u00e7o.
 */
export class ItemMaterial {
  /**
   * @param {Material} material - O material a ser utilizado
   * @param {number} quantidade - A quantidade do material
   * @param {number} custoUnitario - O custo unit\u00e1rio do material
   * @param {string} observacao - Observa\u00e7\u00f5es adicionais sobre o uso do material
   */
  constructor(material, quantidade, custoUnitario, observacao = '') {
    if (!(material instanceof Material)) {
      throw new Error(
        'O material fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida da classe Material',
      )
    }

    if (quantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero')
    }

    if (custoUnitario < 0) {
      throw new Error('O custo unit\u00e1rio n\u00e3o pode ser negativo')
    }

    this.Id = gerarGuid()
    this.Material = material
    this.Quantidade = quantidade
    this.CustoUnitario = custoUnitario
    this.Observacao = observacao
    this.ValorTotal = this.calcularValorTotal()
  }

  /**
   * Calcula o valor total do item baseado na quantidade e custo unit\u00e1rio
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.CustoUnitario
  }

  /**
   * Atualiza a quantidade do material e recalcula o valor total
   * @param {number} novaQuantidade - Nova quantidade do material
   */
  atualizarQuantidade(novaQuantidade) {
    if (novaQuantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero')
    }

    this.Quantidade = novaQuantidade
    this.ValorTotal = this.calcularValorTotal()
  }

  /**
   * Atualiza o custo unit\u00e1rio do material e recalcula o valor total
   * @param {number} novoCusto - Novo custo unit\u00e1rio do material
   */
  atualizarCustoUnitario(novoCusto) {
    if (novoCusto < 0) {
      throw new Error('O custo unit\u00e1rio n\u00e3o pode ser negativo')
    }

    this.CustoUnitario = novoCusto
    this.ValorTotal = this.calcularValorTotal()
  }
}
