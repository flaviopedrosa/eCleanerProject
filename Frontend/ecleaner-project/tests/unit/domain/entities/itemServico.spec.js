import { describe, it, expect } from 'vitest'
import { ItemServico } from '../../../../src/core/domain/entities/itemServico'
import { Servico } from '../../../../src/core/domain/entities/servico'

describe('ItemServico', () => {
  // Servi\u00e7o exemplo para usar nos testes
  const servicoExemplo = new Servico('Limpeza Geral', 50.0, 'Hora', 'Limpeza completa do ambiente')

  it('deve criar uma inst\u00e2ncia de ItemServico com os dados corretos', () => {
    const item = new ItemServico(servicoExemplo, 4, 240, 2)

    expect(item.Id).toBeDefined()
    expect(item.Servico).toBe(servicoExemplo)
    expect(item.Quantidade).toBe(4)
    expect(item.TempoEstimado).toBe(240)
    expect(item.QuantidadePessoas).toBe(2)
    expect(item.ValorTotal).toBe(200) // 4 unidades * R$ 50,00
  })

  it('deve calcular corretamente o valor total', () => {
    const servicoCaro = new Servico('Servi\u00e7o Premium', 100.0, 'Hora', 'Servi\u00e7o especial')
    const item = new ItemServico(servicoCaro, 3, 180, 1)

    expect(item.ValorTotal).toBe(300) // 3 unidades * R$ 100,00
  })

  it('deve calcular corretamente o tempo total em horas', () => {
    const item = new ItemServico(servicoExemplo, 1, 120, 2) // 120 minutos com 2 pessoas

    expect(item.calcularTempoTotalHoras()).toBe(1) // (120 minutos / 60) / 2 pessoas = 1 hora
  })

  it('n\u00e3o deve aceitar um servi\u00e7o inv\u00e1lido', () => {
    const servicoInvalido = {
      descricao: 'Servi\u00e7o Inv\u00e1lido',
      custoUnitario: 50.0,
    }

    expect(() => {
      new ItemServico(servicoInvalido, 1, 60, 1)
    }).toThrow(
      'O servi\u00e7o fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida da classe Servico',
    )
  })

  it('deve gerar IDs diferentes para cada inst\u00e2ncia', () => {
    const item1 = new ItemServico(servicoExemplo, 1, 60, 1)
    const item2 = new ItemServico(servicoExemplo, 2, 120, 2)

    expect(item1.Id).not.toBe(item2.Id)
  })
})
