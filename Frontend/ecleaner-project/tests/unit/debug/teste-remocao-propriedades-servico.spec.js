import { describe, it, expect } from 'vitest'
import { Servico } from '../../../src/core/domain/entities/servico.js'

describe('Servico - Remoção de Propriedades', () => {
  describe('Construtor sem custoUnitario e categoria', () => {
    it('deve criar serviço com propriedades básicas', () => {
      const servico = new Servico(
        'Limpeza Residencial',
        'Limpeza completa de residência com todos os cômodos',
        150.0,
        'Hora',
        'Inclui todos os materiais',
      )

      // Verificar propriedades básicas mantidas
      expect(servico.Nome).toBe('Limpeza Residencial')
      expect(servico.Descricao).toBe('Limpeza completa de residência com todos os cômodos')
      expect(servico.Valor).toBe(150.0)
      expect(servico.Unidade).toBe('Hora')
      expect(servico.Observacao).toBe('Inclui todos os materiais')

      // Verificar propriedades automáticas
      expect(servico.Id).toBeDefined()
      expect(servico.Ativo).toBe(true)
      expect(servico.CriadoEm).toBeDefined()
      expect(servico.AtualizadoEm).toBeDefined()

      // Verificar que as propriedades removidas não existem
      expect(servico.CustoUnitario).toBeUndefined()
      expect(servico.Categoria).toBeUndefined()
    })

    it('deve criar serviço com valores padrão', () => {
      const servico = new Servico('Limpeza Básica', 'Limpeza básica de ambiente', 100.0)

      expect(servico.Nome).toBe('Limpeza Básica')
      expect(servico.Valor).toBe(100.0)
      expect(servico.Unidade).toBe('Unidade') // Valor padrão
      expect(servico.Observacao).toBe('') // Valor padrão

      // Verificar que as propriedades removidas não existem
      expect(servico.CustoUnitario).toBeUndefined()
      expect(servico.Categoria).toBeUndefined()
    })
  })

  describe('Validação sem categoria', () => {
    it('deve validar serviço válido sem categoria', () => {
      const servico = new Servico(
        'Limpeza Comercial',
        'Limpeza profissional para escritórios e estabelecimentos comerciais',
        200.0,
        'M²',
        'Serviço especializado',
      )

      const validacao = servico.isValid()

      expect(validacao.valido).toBe(true)
      expect(validacao.erros).toHaveLength(0)
    })

    it('deve validar serviço inválido sem checar categoria', () => {
      const servico = new Servico(
        'X', // Nome muito curto
        'Desc', // Descrição muito curta
        -10, // Valor negativo
        'UN',
      )

      const validacao = servico.isValid()

      expect(validacao.valido).toBe(false)
      expect(validacao.erros).toHaveLength(3)
      expect(validacao.erros).toContain('Nome deve ter pelo menos 3 caracteres')
      expect(validacao.erros).toContain('Valor deve ser maior que zero')
      expect(validacao.erros).toContain('Descrição deve ter pelo menos 10 caracteres')

      // Verificar que não há erro de categoria
      expect(validacao.erros.some((erro) => erro.includes('Categoria'))).toBe(false)
    })
  })

  describe('Serialização JSON sem propriedades removidas', () => {
    it('deve serializar para JSON sem custoUnitario e categoria', () => {
      const servico = new Servico(
        'Limpeza Industrial',
        'Limpeza especializada para ambientes industriais',
        300.0,
        'Dia',
        'Requer equipamentos especiais',
      )

      const json = servico.toJSON()

      // Verificar propriedades presentes
      expect(json.Id).toBeDefined()
      expect(json.Nome).toBe('Limpeza Industrial')
      expect(json.Descricao).toBe('Limpeza especializada para ambientes industriais')
      expect(json.Valor).toBe(300.0)
      expect(json.Unidade).toBe('Dia')
      expect(json.Observacao).toBe('Requer equipamentos especiais')
      expect(json.Ativo).toBe(true)
      expect(json.CriadoEm).toBeDefined()
      expect(json.AtualizadoEm).toBeDefined()

      // Verificar que as propriedades removidas não estão no JSON
      expect(json.CustoUnitario).toBeUndefined()
      expect(json.Categoria).toBeUndefined()

      // Verificar que não há propriedades extras
      const expectedKeys = [
        'Id',
        'Nome',
        'Descricao',
        'Valor',
        'Unidade',
        'Observacao',
        'Ativo',
        'CriadoEm',
        'AtualizadoEm',
      ]
      expect(Object.keys(json)).toEqual(expectedKeys)
    })
  })

  describe('Métodos mantidos funcionando', () => {
    it('deve calcular valor com desconto', () => {
      const servico = new Servico(
        'Limpeza Premium',
        'Serviço de limpeza premium com produtos especiais',
        200.0,
        'Hora',
      )

      const valorComDesconto = servico.calcularValorComDesconto(10)
      expect(valorComDesconto).toBe(180.0)
    })

    it('deve marcar como atualizado', () => {
      const servico = new Servico('Limpeza Express', 'Limpeza rápida para emergências', 120.0)

      const criadoEm = servico.CriadoEm
      const atualizadoEm = servico.AtualizadoEm

      // Aguardar um pouco para garantir diferença de timestamp
      setTimeout(() => {
        servico.marcarComoAtualizado()

        expect(servico.CriadoEm).toBe(criadoEm) // Não deve mudar
        expect(servico.AtualizadoEm).not.toBe(atualizadoEm) // Deve mudar
      }, 10)
    })
  })

  describe('Compatibilidade com código existente', () => {
    it('deve funcionar com parâmetros na nova ordem', () => {
      // Teste para garantir que mudanças no construtor não quebram uso existente
      const servico1 = new Servico('Nome', 'Descrição longa o suficiente', 100)
      const servico2 = new Servico('Nome', 'Descrição longa o suficiente', 100, 'M²')
      const servico3 = new Servico('Nome', 'Descrição longa o suficiente', 100, 'M²', 'Observação')

      expect(servico1.Nome).toBe('Nome')
      expect(servico1.Unidade).toBe('Unidade') // Padrão
      expect(servico1.Observacao).toBe('') // Padrão

      expect(servico2.Unidade).toBe('M²')
      expect(servico2.Observacao).toBe('') // Padrão

      expect(servico3.Unidade).toBe('M²')
      expect(servico3.Observacao).toBe('Observação')

      // Verificar que nenhum tem as propriedades removidas
      expect(servico1.CustoUnitario).toBeUndefined()
      expect(servico1.Categoria).toBeUndefined()
      expect(servico2.CustoUnitario).toBeUndefined()
      expect(servico2.Categoria).toBeUndefined()
      expect(servico3.CustoUnitario).toBeUndefined()
      expect(servico3.Categoria).toBeUndefined()
    })
  })
})
