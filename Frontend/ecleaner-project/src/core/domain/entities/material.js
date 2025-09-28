import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa um Material.
 */
export class Material {
  /**
   * @param {string} descricao - A descrição ou nome do material.
   * @param {string} imagem - Uma string contendo a imagem codificada em Base64.
   * @param {string} url - Um link para a página do produto, fornecedor ou mais informações.
   */
  constructor(descricao, imagem, url) {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.Imagem = imagem // Armazena a imagem como uma string Base64
    this.Url = url
  }
}
