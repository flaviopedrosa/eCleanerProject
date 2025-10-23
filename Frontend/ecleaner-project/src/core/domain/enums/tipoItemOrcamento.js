/**
 * Enumeração que define os tipos de item de orçamento
 */
export const TipoItemOrcamento = Object.freeze({
  MATERIAL: 'MATERIAL',
  SERVICO: 'SERVICO',
})

/**
 * Retorna a descrição amigável do tipo de item
 * @param {string} tipo - O tipo do item
 * @returns {string} A descrição do tipo
 */
export function obterDescricaoTipoItem(tipo) {
  const descricoes = {
    [TipoItemOrcamento.MATERIAL]: 'Material',
    [TipoItemOrcamento.SERVICO]: 'Serviço',
  }

  return descricoes[tipo] || 'Tipo desconhecido'
}

/**
 * Valida se o tipo fornecido é válido
 * @param {string} tipo - O tipo a ser validado
 * @returns {boolean} True se o tipo for válido
 */
export function validarTipoItem(tipo) {
  return Object.values(TipoItemOrcamento).includes(tipo)
}
