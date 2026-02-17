/**
 * Enum de Status de Contrato
 *
 * Status possíveis para um contrato de prestação de serviço:
 * - RASCUNHO: Contrato criado mas ainda não enviado
 * - AGUARDANDO_ASSINATURA: Enviado para o cliente, aguardando assinatura
 * - ASSINADO_CLIENTE: Cliente assinou, aguardando assinatura do prestador
 * - VIGENTE: Ambas as partes assinaram, contrato em vigor
 * - CANCELADO: Contrato cancelado por alguma das partes
 * - EXPIRADO: Prazo de assinatura expirou (72h após envio)
 */
export const StatusContrato = {
  RASCUNHO: 'RASCUNHO',
  AGUARDANDO_ASSINATURA: 'AGUARDANDO_ASSINATURA',
  ASSINADO_CLIENTE: 'ASSINADO_CLIENTE',
  VIGENTE: 'VIGENTE',
  CANCELADO: 'CANCELADO',
  EXPIRADO: 'EXPIRADO',
}

/**
 * Obtém a cor do badge para cada status (Quasar color)
 */
export function getStatusColor(status) {
  const colors = {
    RASCUNHO: 'grey',
    AGUARDANDO_ASSINATURA: 'warning',
    ASSINADO_CLIENTE: 'info',
    VIGENTE: 'positive',
    CANCELADO: 'negative',
    EXPIRADO: 'orange',
  }
  return colors[status] || 'grey'
}

/**
 * Obtém o ícone para cada status (Material Icons)
 */
export function getStatusIcon(status) {
  const icons = {
    RASCUNHO: 'edit',
    AGUARDANDO_ASSINATURA: 'pending',
    ASSINADO_CLIENTE: 'check_circle_outline',
    VIGENTE: 'check_circle',
    CANCELADO: 'cancel',
    EXPIRADO: 'schedule',
  }
  return icons[status] || 'help'
}

/**
 * Verifica se uma transição de status é válida
 */
export function isValidTransition(fromStatus, toStatus) {
  const validTransitions = {
    RASCUNHO: ['AGUARDANDO_ASSINATURA', 'CANCELADO'],
    AGUARDANDO_ASSINATURA: ['ASSINADO_CLIENTE', 'EXPIRADO', 'CANCELADO'],
    ASSINADO_CLIENTE: ['VIGENTE', 'CANCELADO'],
    VIGENTE: ['CANCELADO'],
    CANCELADO: [],
    EXPIRADO: [],
  }

  return validTransitions[fromStatus]?.includes(toStatus) || false
}
