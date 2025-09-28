import { describe, it, expect, beforeEach } from 'vitest'
import { Cliente } from '../../../../src/core/domain/entities/cliente'
import { Avaliacao } from '../../../../src/core/domain/entities/avaliacao'
import { PreferenciaContato } from '../../../../src/core/domain/enums/preferenciaContato'

describe('Cliente', () => {
  const dadosBasicos = {
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@email.com',
    celular: '11987654321',
    telefone: '1122334455',
  }

  it('deve criar uma instância de Cliente com os dados corretos', () => {
    const cliente = new Cliente(
      dadosBasicos.nome,
      dadosBasicos.sobrenome,
      dadosBasicos.email,
      dadosBasicos.celular,
      dadosBasicos.telefone,
    )

    expect(cliente.Id).toBeDefined()
    expect(cliente.Nome).toBe(dadosBasicos.nome)
    expect(cliente.Sobrenome).toBe(dadosBasicos.sobrenome)
    expect(cliente.Email).toBe(dadosBasicos.email)
    expect(cliente.Celular).toBe(dadosBasicos.celular)
    expect(cliente.Telefone).toBe(dadosBasicos.telefone)
    expect(cliente.PreferenciaContato).toBe(PreferenciaContato.WHATSAPP)
    expect(cliente.Observacoes).toBe('')
    expect(cliente.Avaliacoes).toHaveLength(0)
  })

  it('deve retornar o nome completo corretamente', () => {
    const cliente = new Cliente(
      dadosBasicos.nome,
      dadosBasicos.sobrenome,
      dadosBasicos.email,
      dadosBasicos.celular,
      dadosBasicos.telefone,
    )

    expect(cliente.NomeCompleto).toBe('João Silva')
  })

  it('deve herdar a validação de e-mail da classe Pessoa', () => {
    expect(() => {
      new Cliente(
        dadosBasicos.nome,
        dadosBasicos.sobrenome,
        'email-invalido',
        dadosBasicos.celular,
        dadosBasicos.telefone,
      )
    }).toThrow('E-mail inválido')
  })

  describe('Gerenciamento de Avaliações', () => {
    let cliente

    beforeEach(() => {
      cliente = new Cliente(
        dadosBasicos.nome,
        dadosBasicos.sobrenome,
        dadosBasicos.email,
        dadosBasicos.celular,
        dadosBasicos.telefone,
      )
    })

    it('deve adicionar uma avaliação corretamente', () => {
      const avaliacao = new Avaliacao(5, 'Excelente serviço!')
      cliente.adicionarAvaliacao(avaliacao)

      expect(cliente.Avaliacoes).toHaveLength(1)
      expect(cliente.Avaliacoes[0]).toBe(avaliacao)
    })

    it('não deve aceitar uma avaliação inválida', () => {
      const avaliacaoInvalida = {
        nota: 5,
        comentario: 'Excelente serviço!'
      }

      expect(() => {
        cliente.adicionarAvaliacao(avaliacaoInvalida)
      }).toThrow('A avaliação fornecida não é uma instância válida da classe Avaliacao')
    })

    it('deve calcular a média das avaliações corretamente', () => {
      cliente.adicionarAvaliacao(new Avaliacao(5, 'Excelente!'))
      cliente.adicionarAvaliacao(new Avaliacao(4, 'Muito bom!'))
      cliente.adicionarAvaliacao(new Avaliacao(3, 'Bom'))

      expect(cliente.calcularMediaAvaliacoes()).toBe(4)
    })

    it('deve retornar 0 quando não houver avaliações', () => {
      expect(cliente.calcularMediaAvaliacoes()).toBe(0)
    })
  })
})