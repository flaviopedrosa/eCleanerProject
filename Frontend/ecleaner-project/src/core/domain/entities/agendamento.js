import { gerarGuid } from '../utils/guid'

/**
 * Status possíveis para um agendamento
 * @enum {string}
 */
export const StatusAgendamento = {
  AGENDADO: 'Agendado',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
}

/**
 * Classe que representa um agendamento de servi\u00e7o.
 */
export class Agendamento {
  /**
   * @param {Date} data - Data do agendamento
   * @param {string} status - Status do agendamento (Agendado, Concluído, Cancelado)
   * @param {string} observacao - Observa\u00e7\u00f5es do agendamento
   */
  constructor(data, status, observacao = '') {
    if (!(data instanceof Date)) {
      throw new Error('A data fornecida não é uma instância válida de Date')
    }

    if (!Object.values(StatusAgendamento).includes(status)) {
      throw new Error(
        'Status inválido. Use um dos valores: ' + Object.values(StatusAgendamento).join(', '),
      )
    }

    this.Id = gerarGuid()
    this.Data = data
    this.Status = status
    this.Observacao = observacao
  }

  /**
   * Atualiza o status do agendamento
   * @param {string} novoStatus - Novo status do agendamento
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusAgendamento).includes(novoStatus)) {
      throw new Error(
        'Status inválido. Use um dos valores: ' + Object.values(StatusAgendamento).join(', '),
      )
    }
    this.Status = novoStatus
  }

  /**
   * Verifica se o agendamento está no passado
   * @returns {boolean} true se a data do agendamento é anterior à data atual
   */
  estaNoPassado() {
    return this.Data < new Date()
  }

  /**
   * Verifica se o agendamento pode ser cancelado
   * @returns {boolean} true se o agendamento pode ser cancelado
   */
  podeCancelar() {
    return this.Status === StatusAgendamento.AGENDADO && !this.estaNoPassado()
  }

  /**
   * Verifica se o agendamento pode ser concluído
   * @returns {boolean} true se o agendamento pode ser concluído
   */
  podeConcluir() {
    return this.Status === StatusAgendamento.AGENDADO
  }
}
