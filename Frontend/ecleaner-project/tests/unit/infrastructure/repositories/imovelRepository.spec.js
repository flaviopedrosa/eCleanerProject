import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { Cliente } from '@/core/domain/entities/cliente'

describe('ImovelRepository', () => {
  let repository
  let enderecoExemplo
  let clienteExemplo

  beforeEach(() => {
    repository = new ImovelRepository()

    enderecoExemplo = new Endereco(
      'Casa Principal',
      'Rua Teste',
      '123',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )

    clienteExemplo = new Cliente('João', 'Silva', 'joao@email.com', '11987654321', '1122334455')
  })

  afterEach(async () => {
    // Limpa os dados após cada teste
    await repository.clear()
  })

  it('deve salvar um imóvel no localStorage', async () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa com quintal')

    const imovelSalvo = await repository.save(imovel)

    expect(imovelSalvo).toBeDefined()
    expect(imovelSalvo.Id).toBe(imovel.Id)
    expect(imovelSalvo.TotalComodos).toBe(8)
    expect(imovelSalvo.Dono.Nome).toBe('João')
  })

  it('deve buscar todos os imóveis', async () => {
    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa 1')
    const imovel2 = new Imovel(5, 2, 1, 75, enderecoExemplo, clienteExemplo, 'Casa 2')

    await repository.save(imovel1)
    await repository.save(imovel2)

    const imoveis = await repository.getAll()

    expect(imoveis).toHaveLength(2)
    expect(imoveis[0].TotalComodos).toBe(8)
    expect(imoveis[1].TotalComodos).toBe(5)
  })

  it('deve buscar imóveis por cliente', async () => {
    const cliente2 = new Cliente('Maria', 'Santos', 'maria@email.com', '11999888777', '1133445566')

    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa João')
    const imovel2 = new Imovel(5, 2, 1, 75, enderecoExemplo, cliente2, 'Casa Maria')

    await repository.save(imovel1)
    await repository.save(imovel2)

    const imoveisJoao = await repository.getByClienteId(clienteExemplo.Id)
    const imoveisMaria = await repository.getByClienteId(cliente2.Id)

    expect(imoveisJoao).toHaveLength(1)
    expect(imoveisJoao[0].Observacao).toBe('Casa João')

    expect(imoveisMaria).toHaveLength(1)
    expect(imoveisMaria[0].Observacao).toBe('Casa Maria')
  })

  it('deve deletar um imóvel', async () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa para deletar')

    await repository.save(imovel)
    let imoveis = await repository.getAll()
    expect(imoveis).toHaveLength(1)

    await repository.delete(imovel.Id)
    imoveis = await repository.getAll()
    expect(imoveis).toHaveLength(0)
  })
})
