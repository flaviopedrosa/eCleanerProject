import { gerarGuid } from '../utils/guid'
import { ItemMaterial } from './itemMaterial'
import { ItemServico } from './itemServico'

/**
 * Classe que representa um Pacote de Servi\u00e7os (conjunto de materiais e servi\u00e7os).
 */
export class PacoteServico {
  /**
   * @param {string} descricao - Descri\u00e7\u00e3o do pacote de servi\u00e7os
   * @param {number} margemLucro - Margem de lucro em porcentagem (ex: 20 para 20%)
   */
  constructor(descricao, margemLucro = 30) {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.MargemLucro = margemLucro
    /** @type {ItemMaterial[]} */
    this.ItensMaterial = []
    /** @type {ItemServico[]} */
    this.ItensServico = []
    this.ValorMaterial = 0
    this.ValorServico = 0
    this.ValorTotal = 0
    this.ValorVenda = 0
  }

  /**
   * Adiciona um item de material ao pacote
   * @param {ItemMaterial} item - O item de material a ser adicionado
   */
  adicionarItemMaterial(item) {
    if (!(item instanceof ItemMaterial)) {
      throw new Error(
        'O item fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida de ItemMaterial',
      )
    }
    this.ItensMaterial.push(item)
    this.recalcularValores()
  }

  /**
   * Adiciona um item de servi\u00e7o ao pacote
   * @param {ItemServico} item - O item de servi\u00e7o a ser adicionado
   */
  adicionarItemServico(item) {
    if (!(item instanceof ItemServico)) {
      throw new Error(
        'O item fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida de ItemServico',
      )
    }
    this.ItensServico.push(item)
    this.recalcularValores()
  }

  /**
   * Remove um item de material do pacote pelo ID
   * @param {string} itemId - ID do item a ser removido
   * @returns {boolean} true se o item foi removido, false caso contr\u00e1rio
   */
  removerItemMaterial(itemId) {
    const index = this.ItensMaterial.findIndex((item) => item.Id === itemId)
    if (index !== -1) {
      this.ItensMaterial.splice(index, 1)
      this.recalcularValores()
      return true
    }
    return false
  }

  /**
   * Remove um item de servi\u00e7o do pacote pelo ID
   * @param {string} itemId - ID do item a ser removido
   * @returns {boolean} true se o item foi removido, false caso contr\u00e1rio
   */
  removerItemServico(itemId) {
    const index = this.ItensServico.findIndex((item) => item.Id === itemId)
    if (index !== -1) {
      this.ItensServico.splice(index, 1)
      this.recalcularValores()
      return true
    }
    return false
  }

  /**
   * Atualiza a margem de lucro e recalcula os valores
   * @param {number} novaMargemLucro - Nova margem de lucro em porcentagem
   */
  atualizarMargemLucro(novaMargemLucro) {
    if (novaMargemLucro < 0) {
      throw new Error('A margem de lucro n\u00e3o pode ser negativa')
    }
    this.MargemLucro = novaMargemLucro
    this.recalcularValores()
  }

  /**
   * Recalcula todos os valores do pacote
   */
  recalcularValores() {
    // Calcula o valor total dos materiais
    this.ValorMaterial = this.ItensMaterial.reduce((total, item) => total + item.ValorTotal, 0)

    // Calcula o valor total dos servi\u00e7os
    this.ValorServico = this.ItensServico.reduce((total, item) => total + item.ValorTotal, 0)

    // Calcula o valor total (custo)
    this.ValorTotal = this.ValorMaterial + this.ValorServico

    // Calcula o valor de venda aplicando a margem de lucro
    this.ValorVenda = this.ValorTotal * (1 + this.MargemLucro / 100)
  }

  /**
   * Obt\u00e9m o tempo total estimado em horas para todos os servi\u00e7os
   * @returns {number} Tempo total em horas
   */
  calcularTempoTotalHoras() {
    return this.ItensServico.reduce((total, item) => total + item.calcularTempoTotalHoras(), 0)
  }
}
