import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa um Equipamento.
 */
export class Equipamento {
  /**
   * @param {string} descricao - A descrição ou nome do equipamento.
   * @param {string} unidade - A unidade de medida do equipamento (hora, dia, un, etc).
   * @param {number} precoUnitario - O preço unitário do equipamento.
   * @param {string} imagem - Uma string contendo a imagem codificada em Base64.
   */
  constructor(descricao, unidade, precoUnitario, imagem = '') {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.Unidade = unidade
    this.PrecoUnitario = precoUnitario
    this.Imagem = imagem // Armazena a imagem como uma string Base64
  }
}
