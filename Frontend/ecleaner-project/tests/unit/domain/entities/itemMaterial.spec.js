import { describe, it, expect } from 'vitest'
import { ItemMaterial } from '../../../../src/core/domain/entities/itemMaterial'
import { Material } from '../../../../src/core/domain/entities/material'

describe('ItemMaterial', () => {
  // Material exemplo para usar nos testes
  const materialExemplo = new Material(
    'Detergente Multiuso',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8=',
    'https://exemplo.com/detergente',
  )

  it('deve criar uma inst\u00e2ncia de ItemMaterial com os dados corretos', () => {
    const item = new ItemMaterial(materialExemplo, 5, 10.5, 'Usar com modera\u00e7\u00e3o')

    expect(item.Id).toBeDefined()
    expect(item.Material).toBe(materialExemplo)
    expect(item.Quantidade).toBe(5)
    expect(item.CustoUnitario).toBe(10.5)
    expect(item.Observacao).toBe('Usar com modera\u00e7\u00e3o')
    expect(item.ValorTotal).toBe(52.5) // 5 * 10.50
  })

  it('deve criar uma inst\u00e2ncia sem observa\u00e7\u00e3o (campo opcional)', () => {
    const item = new ItemMaterial(materialExemplo, 2, 10.5)

    expect(item.Observacao).toBe('')
  })

  it('deve calcular corretamente o valor total', () => {
    const item = new ItemMaterial(materialExemplo, 3, 15.75)

    expect(item.ValorTotal).toBe(47.25) // 3 * 15.75
  })

  it('deve atualizar a quantidade e recalcular o valor total', () => {
    const item = new ItemMaterial(materialExemplo, 2, 10.0)
    item.atualizarQuantidade(4)

    expect(item.Quantidade).toBe(4)
    expect(item.ValorTotal).toBe(40.0) // 4 * 10.00
  })

  it('deve atualizar o custo unit\u00e1rio e recalcular o valor total', () => {
    const item = new ItemMaterial(materialExemplo, 2, 10.0)
    item.atualizarCustoUnitario(12.5)

    expect(item.CustoUnitario).toBe(12.5)
    expect(item.ValorTotal).toBe(25.0) // 2 * 12.50
  })

  it('n\u00e3o deve aceitar quantidade menor ou igual a zero', () => {
    expect(() => {
      new ItemMaterial(materialExemplo, 0, 10.0)
    }).toThrow('A quantidade deve ser maior que zero')

    expect(() => {
      new ItemMaterial(materialExemplo, -1, 10.0)
    }).toThrow('A quantidade deve ser maior que zero')
  })

  it('n\u00e3o deve aceitar custo unit\u00e1rio negativo', () => {
    expect(() => {
      new ItemMaterial(materialExemplo, 1, -10.0)
    }).toThrow('O custo unit\u00e1rio n\u00e3o pode ser negativo')
  })

  it('n\u00e3o deve aceitar um material inv\u00e1lido', () => {
    const materialInvalido = {
      descricao: 'Material Inv\u00e1lido',
      imagem: 'base64...',
      url: 'http://exemplo.com',
    }

    expect(() => {
      new ItemMaterial(materialInvalido, 1, 10.0)
    }).toThrow(
      'O material fornecido n\u00e3o \u00e9 uma inst\u00e2ncia v\u00e1lida da classe Material',
    )
  })

  it('deve gerar IDs diferentes para cada inst\u00e2ncia', () => {
    const item1 = new ItemMaterial(materialExemplo, 1, 10.0)
    const item2 = new ItemMaterial(materialExemplo, 2, 10.0)

    expect(item1.Id).not.toBe(item2.Id)
  })
})
