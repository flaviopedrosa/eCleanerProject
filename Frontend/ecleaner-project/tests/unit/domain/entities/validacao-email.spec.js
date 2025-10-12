import { describe, it, expect, beforeEach } from 'vitest'
import { Pessoa } from '@/core/domain/entities/pessoa'

describe('Pessoa - Validação de Email', () => {
  let pessoa

  beforeEach(() => {
    pessoa = new Pessoa('João', 'Silva', 'joao@email.com', '1122334455', '11987654321')
  })

  describe('Emails Válidos', () => {
    const emailsValidos = [
      'nome@dominio.com',
      'nome.sobrenome@dominio.com',
      'nome+tag@dominio.com',
      'nome@subdominio.dominio.com',
      'nome@dominio.com.br',
      'nome123@dominio.com',
      'n@dominio.com',
      'NOME@DOMINIO.COM',
      'nome@dominio-teste.com',
      'nome_sobrenome@dominio.com',
      'nome.sobrenome.final@dominio.com',
    ]

    emailsValidos.forEach((email) => {
      it(`deve aceitar o email válido: ${email}`, () => {
        expect(pessoa.validarEmail(email)).toBe(true)
      })
    })
  })

  describe('Emails Inválidos', () => {
    const emailsInvalidos = [
      '', // vazio
      'nome', // sem @
      '@dominio.com', // sem local part
      'nome@', // sem domínio
      'nome@dominio', // sem TLD
      'nome@.com', // domínio iniciando com ponto
      'nome@dominio..com', // pontos consecutivos
      'nome@@dominio.com', // múltiplos @
      'nome @dominio.com', // espaço no local part
      'nome@dominio .com', // espaço no domínio
      'nome.@dominio.com', // ponto antes do @
      '.nome@dominio.com', // ponto no início
      'nome@dominio.c', // TLD muito curto
      'nome..sobrenome@dominio.com', // pontos consecutivos no local part
      'nome@domínio.com', // caracteres acentuados no domínio
      'nomé@dominio.com', // caracteres acentuados no local part
      'nome@dominio.com.', // ponto no final
      'nome\\@dominio.com', // caractere de escape
      'nome@[123.123.123.123]', // IP no domínio
      'a'.repeat(65) + '@dominio.com', // local part muito longo (>64 caracteres)
      'nome@' + 'a'.repeat(256) + '.com', // domínio muito longo (>255 caracteres)
    ]

    emailsInvalidos.forEach((email) => {
      it(`deve rejeitar o email inválido: ${email}`, () => {
        expect(pessoa.validarEmail(email)).toBe(false)
      })
    })
  })

  it('não deve permitir criar uma pessoa com email inválido', () => {
    expect(() => {
      new Pessoa('João', 'Silva', 'email_invalido', '1122334455', '11987654321')
    }).toThrow('E-mail inválido')
  })
})
