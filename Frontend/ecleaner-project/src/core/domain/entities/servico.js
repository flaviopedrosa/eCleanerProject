import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa um Serviço.
 */
export class Servico {
  /**
   * @param {string} descricao - Descrição detalhada do serviço prestado.
   * @param {number} custoUnitario - O valor monetário por unidade do serviço.
   * @param {string} unidade - A unidade de medida do serviço (ex: "Hora", "Metro Quadrado", "Unidade", "Projeto").
   * @param {string} observacao - Quaisquer notas ou observações adicionais sobre o serviço.
   */
  constructor(descricao, custoUnitario, unidade, observacao) {
    this.Id = gerarGuid()
    this.Descricao = descricao
    this.CustoUnitario = custoUnitario
    this.Unidade = unidade
    this.Observacao = observacao
  }
}
