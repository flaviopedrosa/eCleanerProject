import { describe, it, expect, beforeEach } from 'vitest'
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'
import { TipoItemOrcamento } from '@/core/domain/enums/tipoItemOrcamento'

describe('ItemOrcamento', () => {
  let itemMaterial
  let itemServico

  beforeEach(() => {
    itemMaterial = new ItemOrcamento(
      'Detergente Industrial',
      TipoItemOrcamento.MATERIAL,
      15.5,
      2,
      'L',
      'Para limpeza pesada',
    )

    itemServico = new ItemOrcamento('Limpeza de Carpete', TipoItemOrcamento.SERVICO, 80.0, 1, 'M²')
  })

  describe('Construtor', () => {
    it('deve criar um item de orçamento com propriedades corretas', () => {
      expect(itemMaterial.Id).toBeDefined()
      expect(itemMaterial.Descricao).toBe('Detergente Industrial')
      expect(itemMaterial.Tipo).toBe(TipoItemOrcamento.MATERIAL)
      expect(itemMaterial.Custo).toBe(15.5)
      expect(itemMaterial.Quantidade).toBe(2)
      expect(itemMaterial.Unidade).toBe('L')
      expect(itemMaterial.Observacoes).toBe('Para limpeza pesada')
      expect(itemMaterial.DataCriacao).toBeInstanceOf(Date)
      expect(itemMaterial.DataUltimaAlteracao).toBeInstanceOf(Date)
    })

    it('deve usar valores padrão quando não fornecidos', () => {
      const item = new ItemOrcamento('Item Teste', TipoItemOrcamento.MATERIAL, 10.0)
      expect(item.Quantidade).toBe(1)
      expect(item.Unidade).toBe('UN')
      expect(item.Observacoes).toBe('')
    })

    it('deve gerar erro para descrição inválida', () => {
      expect(() => {
        new ItemOrcamento('', TipoItemOrcamento.MATERIAL, 10.0)
      }).toThrow('A descrição é obrigatória e deve ser uma string não vazia')

      expect(() => {
        new ItemOrcamento(null, TipoItemOrcamento.MATERIAL, 10.0)
      }).toThrow('A descrição é obrigatória e deve ser uma string não vazia')
    })

    it('deve gerar erro para tipo inválido', () => {
      expect(() => {
        new ItemOrcamento('Teste', 'TIPO_INVALIDO', 10.0)
      }).toThrow('Tipo inválido. Deve ser MATERIAL ou SERVICO')
    })

    it('deve gerar erro para custo inválido', () => {
      expect(() => {
        new ItemOrcamento('Teste', TipoItemOrcamento.MATERIAL, -5)
      }).toThrow('O custo deve ser um número não negativo')

      expect(() => {
        new ItemOrcamento('Teste', TipoItemOrcamento.MATERIAL, 'abc')
      }).toThrow('O custo deve ser um número não negativo')
    })

    it('deve gerar erro para quantidade inválida', () => {
      expect(() => {
        new ItemOrcamento('Teste', TipoItemOrcamento.MATERIAL, 10.0, 0)
      }).toThrow('A quantidade deve ser um número maior que zero')

      expect(() => {
        new ItemOrcamento('Teste', TipoItemOrcamento.MATERIAL, 10.0, -1)
      }).toThrow('A quantidade deve ser um número maior que zero')
    })
  })

  describe('calcularValorTotal', () => {
    it('deve calcular o valor total corretamente', () => {
      expect(itemMaterial.calcularValorTotal()).toBe(31.0) // 15.50 × 2
      expect(itemServico.calcularValorTotal()).toBe(80.0) // 80.00 × 1
    })
  })

  describe('atualizarDescricao', () => {
    it('deve atualizar a descrição corretamente', () => {
      const dataOriginal = itemMaterial.DataUltimaAlteracao

      // Aguarda 1ms para garantir diferença na data
      setTimeout(() => {
        itemMaterial.atualizarDescricao('Nova Descrição')
        expect(itemMaterial.Descricao).toBe('Nova Descrição')
        expect(itemMaterial.DataUltimaAlteracao).not.toEqual(dataOriginal)
      }, 1)
    })

    it('deve gerar erro para descrição inválida', () => {
      expect(() => {
        itemMaterial.atualizarDescricao('')
      }).toThrow('A descrição é obrigatória e deve ser uma string não vazia')
    })
  })

  describe('atualizarCusto', () => {
    it('deve atualizar o custo corretamente', () => {
      itemMaterial.atualizarCusto(20.0)
      expect(itemMaterial.Custo).toBe(20.0)
    })

    it('deve gerar erro para custo inválido', () => {
      expect(() => {
        itemMaterial.atualizarCusto(-1)
      }).toThrow('O custo deve ser um número não negativo')
    })
  })

  describe('atualizarQuantidade', () => {
    it('deve atualizar a quantidade corretamente', () => {
      itemMaterial.atualizarQuantidade(5)
      expect(itemMaterial.Quantidade).toBe(5)
    })

    it('deve gerar erro para quantidade inválida', () => {
      expect(() => {
        itemMaterial.atualizarQuantidade(0)
      }).toThrow('A quantidade deve ser um número maior que zero')
    })
  })

  describe('atualizarObservacoes', () => {
    it('deve atualizar as observações corretamente', () => {
      itemMaterial.atualizarObservacoes('Novas observações')
      expect(itemMaterial.Observacoes).toBe('Novas observações')
    })

    it('deve permitir observações vazias', () => {
      itemMaterial.atualizarObservacoes('')
      expect(itemMaterial.Observacoes).toBe('')
    })
  })

  describe('Métodos de verificação de tipo', () => {
    it('isMaterial deve retornar true para item do tipo material', () => {
      expect(itemMaterial.isMaterial()).toBe(true)
      expect(itemMaterial.isServico()).toBe(false)
    })

    it('isServico deve retornar true para item do tipo serviço', () => {
      expect(itemServico.isMaterial()).toBe(false)
      expect(itemServico.isServico()).toBe(true)
    })
  })

  describe('toString', () => {
    it('deve retornar representação textual correta', () => {
      const str = itemMaterial.toString()
      expect(str).toContain('Detergente Industrial')
      expect(str).toContain('MATERIAL')
      expect(str).toContain('2 L')
      expect(str).toContain('R$ 15.50')
      expect(str).toContain('R$ 31.00')
    })
  })

  describe('Serialização JSON', () => {
    it('toJSON deve retornar objeto simples com todas as propriedades', () => {
      const json = itemMaterial.toJSON()
      expect(json.Id).toBe(itemMaterial.Id)
      expect(json.Descricao).toBe('Detergente Industrial')
      expect(json.Tipo).toBe(TipoItemOrcamento.MATERIAL)
      expect(json.Custo).toBe(15.5)
      expect(json.Quantidade).toBe(2)
      expect(json.Unidade).toBe('L')
      expect(json.Observacoes).toBe('Para limpeza pesada')
      expect(json.ValorTotal).toBe(31.0)
      expect(json.DataCriacao).toBeInstanceOf(Date)
      expect(json.DataUltimaAlteracao).toBeInstanceOf(Date)
    })

    it('fromJSON deve criar instância a partir de objeto', () => {
      const json = itemMaterial.toJSON()
      const itemRecriado = ItemOrcamento.fromJSON(json)

      expect(itemRecriado.Id).toBe(itemMaterial.Id)
      expect(itemRecriado.Descricao).toBe(itemMaterial.Descricao)
      expect(itemRecriado.Tipo).toBe(itemMaterial.Tipo)
      expect(itemRecriado.Custo).toBe(itemMaterial.Custo)
      expect(itemRecriado.Quantidade).toBe(itemMaterial.Quantidade)
      expect(itemRecriado.Unidade).toBe(itemMaterial.Unidade)
      expect(itemRecriado.Observacoes).toBe(itemMaterial.Observacoes)
    })
  })
})
