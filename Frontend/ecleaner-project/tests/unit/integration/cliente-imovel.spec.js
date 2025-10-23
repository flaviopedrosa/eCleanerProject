import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Integração Cliente-Imovel', () => {
  let clienteRepository
  let imovelRepository

  beforeEach(() => {
    clienteRepository = new ClienteRepository()
    imovelRepository = new ImovelRepository()
  })

  afterEach(async () => {
    await clienteRepository.clear()
    await imovelRepository.clear()
  })

  it('deve salvar cliente com imóveis vinculados', async () => {
    // Criar cliente
    const cliente = new Cliente('João', 'Silva', 'joao@email.com', '11987654321', '1122334455')

    // Criar endereço para o cliente
    const enderecoCliente = new Endereco(
      'Principal',
      'Rua das Flores',
      '123',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )
    cliente.adicionarEndereco(enderecoCliente)

    // Criar endereço para o imóvel
    const enderecoImovel = new Endereco(
      'Imóvel',
      'Rua dos Sonhos',
      '456',
      '04321-876',
      'Vila Nova',
      'São Paulo',
      'SP',
      'Brasil',
    )

    // Criar imóvel
    const imovel = new Imovel(8, 3, 2, 150, enderecoImovel, cliente, 'Casa ampla com quintal')

    // Vincular imóvel ao cliente
    cliente.adicionarImovel(imovel)

    // Salvar imóvel no repositório
    await imovelRepository.save(imovel)

    // Salvar cliente no repositório
    await clienteRepository.save(cliente)

    // Verificar se foi salvo corretamente
    const clienteSalvo = await clienteRepository.getById(cliente.Id)
    expect(clienteSalvo).toBeDefined()
    expect(clienteSalvo.Nome).toBe('João')
    expect(clienteSalvo.Imoveis).toHaveLength(1)
    expect(clienteSalvo.Imoveis[0].TotalComodos).toBe(8)

    // Verificar se o imóvel foi salvo no repositório de imóveis
    const imovelSalvo = await imovelRepository.getById(imovel.Id)
    expect(imovelSalvo).toBeDefined()
    expect(imovelSalvo.TotalComodos).toBe(8)
    expect(imovelSalvo.Dono.Nome).toBe('João')

    // Verificar busca de imóveis por cliente
    const imoveisDoCliente = await imovelRepository.getByClienteId(cliente.Id)
    expect(imoveisDoCliente).toHaveLength(1)
    expect(imoveisDoCliente[0].Observacao).toBe('Casa ampla com quintal')
  })

  it('deve permitir múltiplos imóveis para o mesmo cliente', async () => {
    // Criar cliente
    const cliente = new Cliente('Maria', 'Santos', 'maria@email.com', '11999888777', '1133445566')

    // Criar endereços para os imóveis
    const endereco1 = new Endereco(
      'Casa Principal',
      'Rua A',
      '100',
      '01000-000',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )

    const endereco2 = new Endereco(
      'Casa de Praia',
      'Rua B',
      '200',
      '02000-000',
      'Praia',
      'Santos',
      'SP',
      'Brasil',
    )

    // Criar imóveis
    const imovel1 = new Imovel(10, 4, 3, 200, endereco1, cliente, 'Casa principal')
    const imovel2 = new Imovel(6, 2, 2, 120, endereco2, cliente, 'Casa de veraneio')

    // Vincular imóveis ao cliente
    cliente.adicionarImovel(imovel1)
    cliente.adicionarImovel(imovel2)

    // Salvar imóveis
    await imovelRepository.save(imovel1)
    await imovelRepository.save(imovel2)

    // Salvar cliente
    await clienteRepository.save(cliente)

    // Verificar
    const clienteSalvo = await clienteRepository.getById(cliente.Id)
    expect(clienteSalvo.Imoveis).toHaveLength(2)

    const imoveisDoCliente = await imovelRepository.getByClienteId(cliente.Id)
    expect(imoveisDoCliente).toHaveLength(2)

    const observacoes = imoveisDoCliente.map((i) => i.Observacao).sort()
    expect(observacoes).toEqual(['Casa de veraneio', 'Casa principal'])
  })
})
