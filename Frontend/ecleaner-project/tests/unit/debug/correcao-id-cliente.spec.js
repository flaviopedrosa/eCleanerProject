import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Correção: ID do cliente no imóvel', () => {
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

  it('deve garantir que o cliente tenha ID antes de criar imóveis', async () => {
    // Simular o fluxo CORRIGIDO do ClienteCadastroPage.vue

    // 1. Criar cliente
    const clienteInstance = new Cliente(
      'João',
      'Silva',
      'joao.silva@email.com',
      '11987654321',
      '1122334455',
    )

    // 2. Adicionar endereço ao cliente
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
    clienteInstance.adicionarEndereco(enderecoCliente)
    clienteInstance.Observacoes = 'Cliente VIP'

    // 3. PRIMEIRO: Salvar cliente para garantir que tenha ID
    console.log('ID do cliente ANTES de salvar:', clienteInstance.Id)
    const clienteSalvo = await clienteRepository.save(clienteInstance)
    console.log('ID do cliente DEPOIS de salvar:', clienteSalvo.Id)

    expect(clienteSalvo.Id).toBeDefined()
    expect(clienteSalvo.Id).not.toBe('')
    expect(clienteSalvo.Id).not.toBeNull()

    // 4. SEGUNDO: Criar imóvel com cliente já salvo
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

    const imovel = new Imovel(
      8,
      3,
      2,
      150,
      enderecoImovel,
      clienteSalvo, // Usa o cliente já salvo com ID
      'Casa ampla',
    )

    // 5. Verificar se o imóvel tem o ID correto do cliente
    console.log('ID do cliente no imóvel ANTES de salvar:', imovel.Dono.Id)
    expect(imovel.Dono.Id).toBeDefined()
    expect(imovel.Dono.Id).toBe(clienteSalvo.Id)
    expect(imovel.Dono.Id).not.toBe('undefined')

    // 6. Salvar imóvel
    const imovelSalvo = await imovelRepository.save(imovel)
    console.log('ID do cliente no imóvel DEPOIS de salvar:', imovelSalvo.Dono.Id)

    expect(imovelSalvo.Dono.Id).toBeDefined()
    expect(imovelSalvo.Dono.Id).toBe(clienteSalvo.Id)
    expect(imovelSalvo.Dono.Id).not.toBe('undefined')

    // 7. Verificar se consegue buscar o imóvel por cliente
    const imoveisDoCliente = await imovelRepository.getByClienteId(clienteSalvo.Id)
    expect(imoveisDoCliente).toHaveLength(1)
    expect(imoveisDoCliente[0].Observacao).toBe('Casa ampla')
    expect(imoveisDoCliente[0].Dono.Id).toBe(clienteSalvo.Id)

    console.log('✅ Teste passou! O ID do cliente está sendo preservado corretamente nos imóveis.')
  })

  it('deve funcionar com múltiplos imóveis', async () => {
    // 1. Criar e salvar cliente primeiro
    const cliente = new Cliente('Maria', 'Santos', 'maria@email.com', '11999888777', '1133445566')
    const clienteSalvo = await clienteRepository.save(cliente)

    // 2. Criar múltiplos imóveis
    const endereco1 = new Endereco(
      'Casa 1',
      'Rua A',
      '100',
      '01000-000',
      'Centro',
      'SP',
      'SP',
      'Brasil',
    )
    const endereco2 = new Endereco(
      'Casa 2',
      'Rua B',
      '200',
      '02000-000',
      'Vila',
      'SP',
      'SP',
      'Brasil',
    )

    const imovel1 = new Imovel(8, 3, 2, 150, endereco1, clienteSalvo, 'Casa principal')
    const imovel2 = new Imovel(5, 2, 1, 75, endereco2, clienteSalvo, 'Casa de veraneio')

    // 3. Salvar imóveis
    const imovel1Salvo = await imovelRepository.save(imovel1)
    const imovel2Salvo = await imovelRepository.save(imovel2)

    // 4. Verificar IDs
    expect(imovel1Salvo.Dono.Id).toBe(clienteSalvo.Id)
    expect(imovel2Salvo.Dono.Id).toBe(clienteSalvo.Id)
    expect(imovel1Salvo.Dono.Id).not.toBe('undefined')
    expect(imovel2Salvo.Dono.Id).not.toBe('undefined')

    // 5. Verificar busca por cliente
    const imoveisDoCliente = await imovelRepository.getByClienteId(clienteSalvo.Id)
    expect(imoveisDoCliente).toHaveLength(2)

    const observacoes = imoveisDoCliente.map((i) => i.Observacao).sort()
    expect(observacoes).toEqual(['Casa de veraneio', 'Casa principal'])
  })
})
