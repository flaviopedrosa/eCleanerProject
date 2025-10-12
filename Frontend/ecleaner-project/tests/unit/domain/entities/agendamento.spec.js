import { describe, it, expect } from 'vitest'
import { Agendamento, StatusAgendamento } from '@/core/domain/entities/agendamento'

describe('Agendamento', () => {
  const dataFutura = new Date(Date.now() + 24 * 60 * 60 * 1000) // Amanhã
  const dataPassada = new Date(Date.now() - 24 * 60 * 60 * 1000) // Ontem

  it('deve criar uma instância de Agendamento com os dados corretos', () => {
    const observacao = 'Agendamento para limpeza completa'
    const agendamento = new Agendamento(dataFutura, StatusAgendamento.AGENDADO, observacao)

    expect(agendamento.Id).toBeDefined()
    expect(agendamento.Data).toBe(dataFutura)
    expect(agendamento.Status).toBe(StatusAgendamento.AGENDADO)
    expect(agendamento.Observacao).toBe(observacao)
  })

  it('deve criar um agendamento sem observação (campo opcional)', () => {
    const agendamento = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)

    expect(agendamento.Data).toBe(dataFutura)
    expect(agendamento.Status).toBe(StatusAgendamento.AGENDADO)
    expect(agendamento.Observacao).toBe('')
  })

  it('deve aceitar todos os status de agendamento válidos', () => {
    Object.values(StatusAgendamento).forEach((status) => {
      const agendamento = new Agendamento(dataFutura, status)
      expect(agendamento.Status).toBe(status)
    })
  })

  it('não deve aceitar status inválido', () => {
    expect(() => {
      new Agendamento(dataFutura, 'Status Inválido')
    }).toThrow('Status inválido')
  })

  it('não deve aceitar data inválida', () => {
    expect(() => {
      new Agendamento('2025-09-20', StatusAgendamento.AGENDADO)
    }).toThrow('A data fornecida não é uma instância válida de Date')
  })

  it('deve manter a data exata fornecida no construtor', () => {
    const data = new Date(2025, 8, 20, 14, 30) // 20/09/2025 14:30
    const agendamento = new Agendamento(data, StatusAgendamento.AGENDADO)

    expect(agendamento.Data.getFullYear()).toBe(2025)
    expect(agendamento.Data.getMonth()).toBe(8) // Setembro (0-based)
    expect(agendamento.Data.getDate()).toBe(20)
    expect(agendamento.Data.getHours()).toBe(14)
    expect(agendamento.Data.getMinutes()).toBe(30)
  })

  it('deve permitir atualizar o status corretamente', () => {
    const agendamento = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)

    agendamento.atualizarStatus(StatusAgendamento.CONCLUIDO)
    expect(agendamento.Status).toBe(StatusAgendamento.CONCLUIDO)

    agendamento.atualizarStatus(StatusAgendamento.CANCELADO)
    expect(agendamento.Status).toBe(StatusAgendamento.CANCELADO)
  })

  it('não deve permitir atualizar para um status inválido', () => {
    const agendamento = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)

    expect(() => {
      agendamento.atualizarStatus('Status Inválido')
    }).toThrow('Status inválido')
  })

  it('deve identificar corretamente agendamentos no passado', () => {
    const agendamentoPassado = new Agendamento(dataPassada, StatusAgendamento.AGENDADO)
    const agendamentoFuturo = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)

    expect(agendamentoPassado.estaNoPassado()).toBe(true)
    expect(agendamentoFuturo.estaNoPassado()).toBe(false)
  })

  it('deve verificar corretamente se pode cancelar', () => {
    const agendamentoFuturo = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)
    expect(agendamentoFuturo.podeCancelar()).toBe(true)

    const agendamentoPassado = new Agendamento(dataPassada, StatusAgendamento.AGENDADO)
    expect(agendamentoPassado.podeCancelar()).toBe(false)

    const agendamentoConcluido = new Agendamento(dataFutura, StatusAgendamento.CONCLUIDO)
    expect(agendamentoConcluido.podeCancelar()).toBe(false)
  })

  it('deve verificar corretamente se pode concluir', () => {
    const agendamentoAgendado = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)
    expect(agendamentoAgendado.podeConcluir()).toBe(true)

    const agendamentoCancelado = new Agendamento(dataFutura, StatusAgendamento.CANCELADO)
    expect(agendamentoCancelado.podeConcluir()).toBe(false)

    const agendamentoConcluido = new Agendamento(dataFutura, StatusAgendamento.CONCLUIDO)
    expect(agendamentoConcluido.podeConcluir()).toBe(false)
  })

  it('deve gerar IDs diferentes para cada instância', () => {
    const agendamento1 = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)
    const agendamento2 = new Agendamento(dataFutura, StatusAgendamento.AGENDADO)

    expect(agendamento1.Id).toBeDefined()
    expect(agendamento2.Id).toBeDefined()
    expect(agendamento1.Id).not.toBe(agendamento2.Id)
  })
})
