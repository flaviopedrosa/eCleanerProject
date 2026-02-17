/**
 * Enum para os possíveis status de uma Ordem de Serviço
 * @readonly
 * @enum {string}
 */
export const StatusOrdemServico = {
  ABERTA: 'ABERTA',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDA: 'CONCLUIDA',
  RECEBIDO: 'RECEBIDO',
  CANCELADA: 'CANCELADA',
}

export const StatusOrdemServicoLabel = {
  ABERTA: 'Aberta',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDA: 'Concluída',
  RECEBIDO: 'Recebido',
  CANCELADA: 'Cancelada',
}

/**
 * Retorna um array com todas as opções de status válidas para uso em selects
 * @returns {Array<{label: string, value: string}>}
 */
export function getStatusOrdemServicoOptions() {
  return Object.keys(StatusOrdemServico).map((key) => ({
    label: StatusOrdemServicoLabel[key],
    value: StatusOrdemServico[key],
  }))
}
