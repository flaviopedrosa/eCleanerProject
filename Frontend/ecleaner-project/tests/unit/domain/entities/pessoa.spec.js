import { describe, it, expect, vi } from 'vitest'
import { Pessoa } from '../../../../src/core/domain/entities/pessoa'
import { Endereco } from '../../../../src/core/domain/entities/endereco'

describe('Pessoa', () => {
  const dadosExemplo = {
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@email.com',
    telefone: '1122334455',
    celular: '11987654321',
  }

  it('deve criar uma instância de Pessoa com os dados corretos', () => {
    const pessoa = new Pessoa(
      dadosExemplo.nome,
      dadosExemplo.sobrenome,
      dadosExemplo.email,
      dadosExemplo.telefone,
      dadosExemplo.celular,
    )

    expect(pessoa.Id).toBeDefined()
    expect(pessoa.Nome).toBe(dadosExemplo.nome)
    expect(pessoa.Sobrenome).toBe(dadosExemplo.sobrenome)
    expect(pessoa.Email).toBe(dadosExemplo.email)
    expect(pessoa.Telefone).toBe(dadosExemplo.telefone)
    expect(pessoa.Celular).toBe(dadosExemplo.celular)
    expect(pessoa.Enderecos).toHaveLength(0)
  })

  it('não deve aceitar email inválido', () => {
    expect(() => {
      new Pessoa(
        dadosExemplo.nome,
        dadosExemplo.sobrenome,
        'email-invalido',
        dadosExemplo.telefone,
        dadosExemplo.celular,
      )
    }).toThrow('E-mail inválido')
  })

  it('deve adicionar um endereço corretamente', () => {
    const pessoa = new Pessoa(
      dadosExemplo.nome,
      dadosExemplo.sobrenome,
      dadosExemplo.email,
      dadosExemplo.telefone,
      dadosExemplo.celular,
    )
    const endereco = new Endereco(
      'Residência',
      'Rua das Flores',
      '123',
      '01234-567',
      'Jardim Primavera',
      'São Paulo',
      'SP',
      'Brasil',
    )

    pessoa.adicionarEndereco(endereco)

    expect(pessoa.Enderecos).toHaveLength(1)
    expect(pessoa.Enderecos[0]).toBe(endereco)
  })

  it('não deve adicionar um endereço inválido', () => {
    const pessoa = new Pessoa(
      dadosExemplo.nome,
      dadosExemplo.sobrenome,
      dadosExemplo.email,
      dadosExemplo.telefone,
      dadosExemplo.celular,
    )
    const enderecoInvalido = {
      descricao: 'Residência',
      logradouro: 'Rua das Flores',
    }

    const consoleSpy = vi.spyOn(console, 'error')
    pessoa.adicionarEndereco(enderecoInvalido)

    expect(pessoa.Enderecos).toHaveLength(0)
    expect(consoleSpy).toHaveBeenCalledWith(
      'O objeto fornecido não é uma instância da classe Endereco.',
    )
  })
})

describe('Endereco', () => {
  it('deve criar uma instância de Endereco com os dados corretos', () => {
    const endereco = new Endereco(
      'Residência',
      'Rua das Flores',
      '123',
      '01234-567',
      'Jardim Primavera',
      'São Paulo',
      'SP',
      'Brasil',
    )

    expect(endereco.Id).toBeDefined()
    expect(endereco.Descricao).toBe('Residência')
    expect(endereco.Logradouro).toBe('Rua das Flores')
    expect(endereco.Numero).toBe('123')
    expect(endereco.Cep).toBe('01234-567')
    expect(endereco.Bairro).toBe('Jardim Primavera')
    expect(endereco.Cidade).toBe('São Paulo')
    expect(endereco.Estado).toBe('SP')
    expect(endereco.Pais).toBe('Brasil')
  })
})
