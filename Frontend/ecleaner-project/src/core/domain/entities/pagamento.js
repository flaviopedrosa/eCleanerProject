/**
 * Classe que representa um pagamento.
 */
export class Pagamento {
  /**
   * @param {Date} data - Data do pagamento
   * @param {number} valor - Valor do pagamento
   * @param {string} formaPagamento - Forma de pagamento utilizada
   * @param {string} status - Status do pagamento
   * @param {string} observacao - Observa\u00e7\u00f5es sobre o pagamento
   */
  constructor(data, valor, formaPagamento, status, observacao = '') {
    if (valor <= 0) {
      throw new Error('O valor do pagamento deve ser maior que zero')
    }

    this.Data = data
    this.Valor = valor
    this.FormaPagamento = formaPagamento
    this.Status = status
    this.Observacao = observacao
  }
}
