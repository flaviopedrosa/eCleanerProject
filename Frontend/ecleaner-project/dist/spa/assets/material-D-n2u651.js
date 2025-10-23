import { g as gerarGuid } from "./guid-BHuXRmln.js";
class Material {
  /**
   * @param {string} descricao - A descrição ou nome do material.
   * @param {string} unidade - A unidade de medida do material (kg, L, un, etc).
   * @param {number} precoUnitario - O preço unitário do material.
   * @param {string} imagem - Uma string contendo a imagem codificada em Base64.
   * @param {string} url - Um link para a página do produto, fornecedor ou mais informações.
   */
  constructor(descricao, unidade, precoUnitario, imagem = "", url = "") {
    this.Id = gerarGuid();
    this.Descricao = descricao;
    this.Unidade = unidade;
    this.PrecoUnitario = precoUnitario;
    this.Imagem = imagem;
    this.Url = url;
  }
}
export {
  Material as M
};
//# sourceMappingURL=material-D-n2u651.js.map
