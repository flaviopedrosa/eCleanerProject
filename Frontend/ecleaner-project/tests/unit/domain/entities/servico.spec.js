import { describe, it, expect } from 'vitest'
import { Servico } from '@/core/domain/entities/servico'

describe('Servico', () => {
  it('deve criar uma inst\u00e2ncia de Servico com os dados corretos', () => {
    const servico = new Servico(
      'Instala\u00e7\u00e3o de Porcelanato',
      85.5,
      'Metro Quadrado',
      'O valor n\u00e3o inclui o material, apenas a m\u00e3o de obra.',
    )

    expect(servico.Id).toBeDefined()
    expect(servico.Descricao).toBe('Instala\u00e7\u00e3o de Porcelanato')
    expect(servico.CustoUnitario).toBe(85.5)
    expect(servico.Unidade).toBe('Metro Quadrado')
    expect(servico.Observacao).toBe(
      'O valor n\u00e3o inclui o material, apenas a m\u00e3o de obra.',
    )
  })

  it('deve permitir a formata\u00e7\u00e3o do custo unit\u00e1rio em moeda', () => {
    const servico = new Servico(
      'Consultoria de TI',
      250.0,
      'Hora',
      'M\u00ednimo de 2 horas para visita t\u00e9cnica.',
    )

    expect(servico.CustoUnitario.toFixed(2)).toBe('250.00')
  })

  it('deve criar uma inst\u00e2ncia com observa\u00e7\u00e3o opcional', () => {
    const servico = new Servico('Limpeza B\u00e1sica', 100.0, 'Hora')

    expect(servico.Id).toBeDefined()
    expect(servico.Descricao).toBe('Limpeza B\u00e1sica')
    expect(servico.CustoUnitario).toBe(100.0)
    expect(servico.Unidade).toBe('Hora')
    expect(servico.Observacao).toBeUndefined()
  })
})
