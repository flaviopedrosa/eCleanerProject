import { describe, it, expect } from 'vitest'
import { PacoteServico } from '@/core/domain/entities/pacoteServico'
import { ItemMaterial } from '@/core/domain/entities/itemMaterial'
import { ItemServico } from '@/core/domain/entities/itemServico'
import { Material } from '@/core/domain/entities/material'
import { Servico } from '@/core/domain/entities/servico'

describe('PacoteServico', () => {
  // Dados de exemplo para os testes
  const material = new Material(
    'Detergente',
    'data:image/png;base64,AAAA',
    'https://exemplo.com/detergente',
  )

  const servico = new Servico('Limpeza Geral', 50.0, 'Hora', 'Limpeza completa')

  const itemMaterial = new ItemMaterial(material, 2, 10.0, 'Teste')
  const itemServico = new ItemServico(servico, 3, 180, 2)

  it('deve criar uma inst\u00e2ncia de PacoteServico com os dados corretos', () => {
    const pacote = new PacoteServico('Pacote de Limpeza B\u00e1sica', 25)

    expect(pacote.Id).toBeDefined()
    expect(pacote.Descricao).toBe('Pacote de Limpeza B\u00e1sica')
    expect(pacote.MargemLucro).toBe(25)
    expect(pacote.ItensMaterial).toHaveLength(0)
    expect(pacote.ItensServico).toHaveLength(0)
    expect(pacote.ValorMaterial).toBe(0)
    expect(pacote.ValorServico).toBe(0)
    expect(pacote.ValorTotal).toBe(0)
    expect(pacote.ValorVenda).toBe(0)
  })

  it('deve usar margem de lucro padr\u00e3o de 30% quando n\u00e3o especificada', () => {
    const pacote = new PacoteServico('Pacote B\u00e1sico')
    expect(pacote.MargemLucro).toBe(30)
  })

  it('deve adicionar itens de material e servi\u00e7o corretamente', () => {
    const pacote = new PacoteServico('Pacote Completo', 20)

    pacote.adicionarItemMaterial(itemMaterial)
    pacote.adicionarItemServico(itemServico)

    expect(pacote.ItensMaterial).toHaveLength(1)
    expect(pacote.ItensServico).toHaveLength(1)
    expect(pacote.ItensMaterial[0]).toBe(itemMaterial)
    expect(pacote.ItensServico[0]).toBe(itemServico)
  })

  it('deve calcular valores corretamente', () => {
    const pacote = new PacoteServico('Pacote de C\u00e1lculo', 20)

    pacote.adicionarItemMaterial(itemMaterial) // 2 * 10.0 = 20.0
    pacote.adicionarItemServico(itemServico) // 3 * 50.0 = 150.0

    expect(pacote.ValorMaterial).toBe(20.0)
    expect(pacote.ValorServico).toBe(150.0)
    expect(pacote.ValorTotal).toBe(170.0)
    expect(pacote.ValorVenda).toBe(204.0) // 170 * (1 + 20/100)
  })

  it('deve atualizar valores ao remover itens', () => {
    const pacote = new PacoteServico('Pacote para Remover', 20)

    pacote.adicionarItemMaterial(itemMaterial)
    pacote.adicionarItemServico(itemServico)

    const materialId = pacote.ItensMaterial[0].Id
    pacote.removerItemMaterial(materialId)

    expect(pacote.ItensMaterial).toHaveLength(0)
    expect(pacote.ValorMaterial).toBe(0)
    expect(pacote.ValorTotal).toBe(150.0) // Apenas o valor do servi\u00e7o
    expect(pacote.ValorVenda).toBe(180.0) // 150 * (1 + 20/100)
  })

  it('deve atualizar valores ao mudar a margem de lucro', () => {
    const pacote = new PacoteServico('Pacote com Margem', 20)

    pacote.adicionarItemMaterial(itemMaterial) // 20.0
    pacote.atualizarMargemLucro(50)

    expect(pacote.MargemLucro).toBe(50)
    expect(pacote.ValorVenda).toBe(30.0) // 20 * (1 + 50/100)
  })

  it('n\u00e3o deve aceitar margem de lucro negativa', () => {
    const pacote = new PacoteServico('Pacote Teste', 20)

    expect(() => {
      pacote.atualizarMargemLucro(-10)
    }).toThrow('A margem de lucro n\u00e3o pode ser negativa')
  })

  it('deve calcular o tempo total em horas corretamente', () => {
    const pacote = new PacoteServico('Pacote com Tempo', 20)

    pacote.adicionarItemServico(itemServico) // 180 minutos / 60 / 2 pessoas = 1.5 horas

    expect(pacote.calcularTempoTotalHoras()).toBe(1.5)
  })

  it('deve gerar IDs diferentes para cada inst\u00e2ncia', () => {
    const pacote1 = new PacoteServico('Pacote 1')
    const pacote2 = new PacoteServico('Pacote 2')

    expect(pacote1.Id).not.toBe(pacote2.Id)
  })
})
