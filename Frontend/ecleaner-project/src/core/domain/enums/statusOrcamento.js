/**
 * Enum que representa os possíveis status de um orçamento.
 * @readonly
 * @enum {string}
 */
export const StatusOrcamento = {
  /** Orçamento em elaboração */
  RASCUNHO: 'RASCUNHO',
  /** Orçamento enviado para o cliente */
  ENVIADO: 'ENVIADO',
  /** Orçamento aprovado pelo cliente */
  APROVADO: 'APROVADO',
  /** Orçamento recusado pelo cliente */
  RECUSADO: 'RECUSADO',
  /** Orçamento expirado (fora do prazo de validade) */
  EXPIRADO: 'EXPIRADO',
  /** Orçamento cancelado */
  CANCELADO: 'CANCELADO',
}
