import { describe, it, expect, beforeEach } from 'vitest'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { Pessoa } from '@/core/domain/entities/pessoa'

describe('Imovel', () => {
  let enderecoExemplo
  let donoExemplo

  beforeEach(() => {
    enderecoExemplo = new Endereco(
      'Rua Teste',
      '123',
      'Apto 1',
      'Centro',
      'São Paulo',
      'SP',
      '01234-567',
    )

    donoExemplo = new Pessoa('João', 'Silva', 'joao@email.com', '1122334455', '11987654321')
  })

  it('deve criar uma instância de Imovel com os dados corretos', () => {
    const imovel = new Imovel(
      8,
      3,
      2,
      150,
      enderecoExemplo,
      donoExemplo,
      'Imóvel com quintal amplo',
    )

    expect(imovel.Id).toBeDefined()
    expect(imovel.TotalComodos).toBe(8)
    expect(imovel.NumeroQuartos).toBe(3)
    expect(imovel.NumeroBanheiros).toBe(2)
    expect(imovel.AreaTotal).toBe(150)
    expect(imovel.Endereco).toBe(enderecoExemplo)
    expect(imovel.Dono).toBe(donoExemplo)
    expect(imovel.Responsaveis).toHaveLength(0)
    expect(imovel.Observacao).toBe('Imóvel com quintal amplo')
  })

  it('deve criar um imóvel sem observação (campo opcional)', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel.Observacao).toBe('')
  })

  it('deve calcular corretamente o número de outros cômodos', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel.NumeroOutrosComodos).toBe(3) // 8 - 3 - 2 = 3
  })

  it('deve gerar IDs diferentes para cada instância', () => {
    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const imovel2 = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel1.Id).not.toBe(imovel2.Id)
  })

  it('não deve aceitar dono inválido', () => {
    expect(
      () =>
        new Imovel(8, 3, 2, 150, enderecoExemplo, {
          nome: 'João',
          email: 'joao@email.com',
        }),
    ).toThrow('O dono fornecido não é uma instância válida da classe Pessoa')
  })

  it('deve permitir adicionar e remover responsáveis', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const responsavel = new Pessoa('Maria', 'Silva', 'maria@email.com', '1122334455', '11987654321')

    imovel.adicionarResponsavel(responsavel)
    expect(imovel.Responsaveis).toHaveLength(1)
    expect(imovel.Responsaveis[0]).toBe(responsavel)

    imovel.removerResponsavel(responsavel)
    expect(imovel.Responsaveis).toHaveLength(0)
  })

  it('não deve aceitar endereço inválido', () => {
    expect(
      () => new Imovel(8, 3, 2, 150, { rua: 'Rua Teste', numero: '123' }, donoExemplo),
    ).toThrow('O endereço fornecido não é uma instância válida da classe Endereco')
  })

  it('deve permitir atualizar o endereço', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const novoEndereco = new Endereco(
      'Nova Rua',
      '456',
      'Apto 2',
      'Novo Bairro',
      'São Paulo',
      'SP',
      '04567-890',
    )

    imovel.atualizarEndereco(novoEndereco)
    expect(imovel.Endereco).toBe(novoEndereco)
  })

  it('não deve permitir atualizar com endereço inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.atualizarEndereco({ rua: 'Nova Rua', numero: '456' })).toThrow(
      'O endereço fornecido não é uma instância válida da classe Endereco',
    )
  })

  it('não deve aceitar responsável inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.adicionarResponsavel({ nome: 'Maria', email: 'maria@email.com' })).toThrow(
      'O responsável fornecido não é uma instância válida da classe Pessoa',
    )
  })

  it('deve permitir alterar o dono do imóvel', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const novoDono = new Pessoa('Maria', 'Silva', 'maria@email.com', '1122334455', '11987654321')

    imovel.alterarDono(novoDono)
    expect(imovel.Dono).toBe(novoDono)
  })

  it('não deve permitir alterar para um dono inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.alterarDono({ nome: 'Maria', email: 'maria@email.com' })).toThrow(
      'O dono fornecido não é uma instância válida da classe Pessoa',
    )
  })
})
