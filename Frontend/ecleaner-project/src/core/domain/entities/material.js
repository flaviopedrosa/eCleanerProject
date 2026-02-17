import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa um Material.
 */
export class Material {
  /**
   * @param {string} descricao - A descrição ou nome do material.
   * @param {string} unidade - A unidade de medida do material (kg, L, un, etc).
   * @param {number} precoUnitario - O preço unitário do material.
   * @param {string} imagem - Uma string contendo a imagem codificada em Base64.
   * @param {string} url - Um link para a página do produto, fornecedor ou mais informações.
   * @param {number} quantidadeEstoque - Quantidade disponível em estoque.
   * @param {number} estoqueMinimo - Quantidade mínima desejada em estoque.
   */
  constructor(
    descricao,
    unidade,
    precoUnitario,
    imagem = '',
    url = '',
    quantidadeEstoque = 0,
    estoqueMinimo = 0,
  ) {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.Unidade = unidade
    this.PrecoUnitario = precoUnitario
    this.Imagem = imagem // Armazena a imagem como uma string Base64
    this.Url = url
    this.QuantidadeEstoque = quantidadeEstoque
    this.EstoqueMinimo = estoqueMinimo
  }

  /**
   * Adiciona quantidade ao estoque
   * @param {number} quantidade - Quantidade a adicionar
   */
  adicionarEstoque(quantidade) {
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }
    this.QuantidadeEstoque += quantidade
  }

  /**
   * Remove quantidade do estoque
   * @param {number} quantidade - Quantidade a remover
   */
  removerEstoque(quantidade) {
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }
    if (this.QuantidadeEstoque < quantidade) {
      throw new Error('Estoque insuficiente')
    }
    this.QuantidadeEstoque -= quantidade
  }

  /**
   * Verifica se o estoque está abaixo do mínimo
   */
  estaAbaixoDoMinimo() {
    return this.QuantidadeEstoque < this.EstoqueMinimo
  }
}
