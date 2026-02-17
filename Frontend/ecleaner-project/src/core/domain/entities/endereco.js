import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa um Endere\u00e7o.
 */
export class Endereco {
  /**
   * @param {string} descricao - Descri\u00e7\u00e3o do endere\u00e7o (ex: "Casa", "Trabalho").
   * @param {string} logradouro - O nome da rua, avenida, etc.
   * @param {string} numero - O n\u00famero do im\u00f3vel.
   * @param {string} cep - O C\u00f3digo de Endere\u00e7amento Postal.
   * @param {string} bairro - O bairro.
   * @param {string} cidade - A cidade.
   * @param {string} estado - O estado.
   * @param {string} pais - O pa\u00eds.
   */
  constructor(descricao, logradouro, numero, cep, bairro, cidade, estado, pais, complemento = '') {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.Logradouro = logradouro
    this.Numero = numero
    this.Cep = cep
    this.Bairro = bairro
    this.Cidade = cidade
    this.Estado = estado
    this.Pais = pais
    this.Complemento = complemento
  }
}
