import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Debug: Vinculação Cliente-Imóvel', () => {
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

  it('deve verificar a vinculação completa entre cliente e imóvel', async () => {
    console.log('=== TESTE DE VINCULAÇÃO CLIENTE-IMÓVEL ===')

    // 1. Criar cliente
    const cliente = new Cliente('João', 'Silva', 'joao@email.com', '11987654321', '1122334455')
    console.log('1. Cliente criado:', {
      Id: cliente.Id,
      Nome: cliente.Nome,
      Imoveis: cliente.Imoveis.length,
    })

    // 2. Salvar cliente
    const clienteSalvo = await clienteRepository.save(cliente)
    console.log('2. Cliente salvo:', {
      Id: clienteSalvo.Id,
      Nome: clienteSalvo.Nome,
      Imoveis: clienteSalvo.Imoveis.length,
    })

    // 3. Criar imóvel
    const endereco = new Endereco(
      'Casa',
      'Rua A',
      '123',
      '01000-000',
      'Centro',
      'SP',
      'SP',
      'Brasil',
    )
    const imovel = new Imovel(8, 3, 2, 150, endereco, clienteSalvo, 'Casa teste')
    console.log('3. Imóvel criado:', {
      Id: imovel.Id,
      TotalComodos: imovel.TotalComodos,
      DonoId: imovel.Dono.Id,
      DonoNome: imovel.Dono.Nome,
    })

    // 4. Salvar imóvel
    const imovelSalvo = await imovelRepository.save(imovel)
    console.log('4. Imóvel salvo:', {
      Id: imovelSalvo.Id,
      TotalComodos: imovelSalvo.TotalComodos,
      DonoId: imovelSalvo.Dono.Id,
      DonoNome: imovelSalvo.Dono.Nome,
    })

    // 5. Adicionar imóvel ao cliente
    clienteSalvo.adicionarImovel(imovelSalvo)
    console.log('5. Cliente após adicionar imóvel:', {
      Id: clienteSalvo.Id,
      Nome: clienteSalvo.Nome,
      Imoveis: clienteSalvo.Imoveis.length,
      PrimeiroImovel: clienteSalvo.Imoveis[0]?.Id,
    })

    // 6. Salvar cliente atualizado
    const clienteAtualizado = await clienteRepository.save(clienteSalvo)
    console.log('6. Cliente atualizado salvo:', {
      Id: clienteAtualizado.Id,
      Nome: clienteAtualizado.Nome,
      Imoveis: clienteAtualizado.Imoveis.length,
      PrimeiroImovel: clienteAtualizado.Imoveis[0]?.Id,
    })

    // 7. Recarregar cliente do repositório
    const clienteRecarregado = await clienteRepository.getById(clienteSalvo.Id)
    console.log('7. Cliente recarregado:', {
      Id: clienteRecarregado.Id,
      Nome: clienteRecarregado.Nome,
      Imoveis: clienteRecarregado.Imoveis.length,
      PrimeiroImovel: clienteRecarregado.Imoveis[0]?.Id,
    })

    // 8. Buscar imóveis pelo ID do cliente
    const imoveisDoCliente = await imovelRepository.getByClienteId(clienteSalvo.Id)
    console.log('8. Imóveis encontrados por cliente:', {
      Quantidade: imoveisDoCliente.length,
      Imoveis: imoveisDoCliente.map((i) => ({
        Id: i.Id,
        TotalComodos: i.TotalComodos,
        DonoId: i.Dono.Id,
        Observacao: i.Observacao,
      })),
    })

    // 9. Verificar dados no localStorage
    const clientesLS = JSON.parse(localStorage.getItem('clientes') || '[]')
    const imoveisLS = JSON.parse(localStorage.getItem('imoveis') || '[]')
    console.log('9. Dados no localStorage:')
    console.log(
      '   Clientes:',
      clientesLS.map((c) => ({
        id: c.id,
        nome: c.nome,
        imoveisCount: c.imoveis?.length || 0,
        imoveis: c.imoveis,
      })),
    )
    console.log(
      '   Imóveis:',
      imoveisLS.map((i) => ({
        id: i.Id,
        totalComodos: i.TotalComodos,
        donoId: i.Dono?.Id,
        donoNome: i.Dono?.Nome,
      })),
    )

    // Verificações
    expect(clienteRecarregado).toBeDefined()
    expect(clienteRecarregado.Imoveis).toHaveLength(1)
    expect(clienteRecarregado.Imoveis[0].Id).toBe(imovelSalvo.Id)
    expect(imoveisDoCliente).toHaveLength(1)
    expect(imoveisDoCliente[0].Dono.Id).toBe(clienteSalvo.Id)

    console.log('✅ Teste de vinculação concluído!')
  })

  it('deve verificar se consegue carregar cliente com imóveis existentes', async () => {
    // Simular dados já existentes no localStorage
    const clienteData = {
      id: 'cliente-teste-123',
      nome: 'Maria',
      sobrenome: 'Santos',
      email: 'maria@email.com',
      celular: '11999888777',
      telefone: '1133445566',
      preferenciaContato: 'WHATSAPP',
      enderecos: [],
      observacoes: '',
      imoveis: [
        {
          id: 'imovel-teste-456',
          totalComodos: 6,
          numeroQuartos: 2,
          numeroBanheiros: 2,
          areaTotal: 90,
          observacao: 'Apartamento',
        },
      ],
    }

    const imovelData = {
      Id: 'imovel-teste-456',
      TotalComodos: 6,
      NumeroQuartos: 2,
      NumeroBanheiros: 2,
      AreaTotal: 90,
      Observacao: 'Apartamento',
      Endereco: {
        Id: 'endereco-456',
        Descricao: 'Apartamento',
        Logradouro: 'Rua B',
        Numero: '456',
        Cep: '02000-000',
        Bairro: 'Vila',
        Cidade: 'SP',
        Estado: 'SP',
        Pais: 'Brasil',
      },
      Dono: {
        Id: 'cliente-teste-123',
        Nome: 'Maria',
        Sobrenome: 'Santos',
        Email: 'maria@email.com',
        Telefone: '1133445566',
        Celular: '11999888777',
        PreferenciaContato: 'WHATSAPP',
        Observacoes: '',
        Enderecos: [],
      },
    }

    // Inserir dados no localStorage
    localStorage.setItem('clientes', JSON.stringify([clienteData]))
    localStorage.setItem('imoveis', JSON.stringify([imovelData]))

    console.log('=== TESTE DE CARREGAMENTO ===')

    // Carregar cliente
    const clienteCarregado = await clienteRepository.getById('cliente-teste-123')
    console.log('Cliente carregado:', {
      Id: clienteCarregado.Id,
      Nome: clienteCarregado.Nome,
      Imoveis: clienteCarregado.Imoveis.length,
      PrimeiroImovel: clienteCarregado.Imoveis[0],
    })

    // Carregar imóveis do cliente
    const imoveisDoCliente = await imovelRepository.getByClienteId('cliente-teste-123')
    console.log(
      'Imóveis do cliente:',
      imoveisDoCliente.map((i) => ({
        Id: i.Id,
        TotalComodos: i.TotalComodos,
        DonoId: i.Dono.Id,
      })),
    )

    // Verificações
    expect(clienteCarregado).toBeDefined()
    expect(clienteCarregado.Imoveis).toHaveLength(1)
    expect(imoveisDoCliente).toHaveLength(1)
    expect(imoveisDoCliente[0].Dono.Id).toBe('cliente-teste-123')

    console.log('✅ Teste de carregamento concluído!')
  })
})
