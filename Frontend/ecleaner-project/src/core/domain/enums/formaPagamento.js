/**
 * Formas de pagamento aceitas
 * @readonly
 * @enum {string}
 */
export const FormaPagamento = {
  /** Dinheiro em espécie */
  DINHEIRO: 'DINHEIRO',
  /** PIX */
  PIX: 'PIX',
  /** Cartão de débito */
  CARTAO_DEBITO: 'CARTAO_DEBITO',
  /** Cartão de crédito */
  CARTAO_CREDITO: 'CARTAO_CREDITO',
  /** Transferência bancária */
  TRANSFERENCIA: 'TRANSFERENCIA',
  /** Boleto bancário */
  BOLETO: 'BOLETO',
}
