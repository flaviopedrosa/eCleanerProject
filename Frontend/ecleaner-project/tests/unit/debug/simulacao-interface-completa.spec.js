import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Simulação completa da interface web', () => {
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

  it('deve simular o fluxo COMPLETO como na interface web', async () => {
    console.log('=== SIMULAÇÃO COMPLETA DA INTERFACE WEB ===')

    // 1. SIMULAR DADOS DO FORMULÁRIO (como vem da interface)
    const formData = {
      nome: 'João',
      sobrenome: 'Silva',
      email: 'joao.silva@email.com',
      celular: '11987654321',
      telefone: '1122334455',
      observacoes: 'Cliente teste',
      enderecos: [
        {
          cep: '01234-567',
          rua: 'Rua das Flores',
          numero: '123',
          complemento: '',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      ],
      imoveis: [
        {
          totalComodos: '8',
          numeroQuartos: '3',
          numeroBanheiros: '2',
          areaTotal: '150.5',
          observacao: 'Casa ampla com quintal',
          endereco: {
            cep: '04321-876',
            rua: 'Rua dos Sonhos',
            numero: '456',
            complemento: 'Casa',
            bairro: 'Vila Nova',
            cidade: 'São Paulo',
            estado: 'SP',
          },
        },
      ],
    }

    console.log('1. Dados do formulário:', formData)

    // 2. SIMULAR O CÓDIGO DO ClienteCadastroPage.vue EXATAMENTE
    const clienteInstance = new Cliente(
      formData.nome,
      formData.sobrenome,
      formData.email,
      formData.celular,
      formData.telefone,
    )

    // Adicionar endereços
    formData.enderecos.forEach((enderecoForm) => {
      if (enderecoForm.cep.trim()) {
        const endereco = new Endereco(
          'Principal',
          enderecoForm.rua,
          enderecoForm.numero,
          enderecoForm.cep,
          enderecoForm.bairro,
          enderecoForm.cidade,
          enderecoForm.estado,
          'Brasil',
        )
        clienteInstance.adicionarEndereco(endereco)
      }
    })

    clienteInstance.Observacoes = formData.observacoes

    // 3. SALVAR CLIENTE PRIMEIRO
    console.log('2. Salvando cliente...')
    const clienteSalvo = await clienteRepository.save(clienteInstance)
    console.log('   Cliente salvo com ID:', clienteSalvo.Id)

    // 4. CRIAR E SALVAR IMÓVEIS
    const imoveisCriados = []
    for (const imovelForm of formData.imoveis) {
      if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
        console.log('3. Criando imóvel...')

        const enderecoImovel = new Endereco(
          'Imóvel',
          imovelForm.endereco.rua,
          imovelForm.endereco.numero,
          imovelForm.endereco.cep,
          imovelForm.endereco.bairro,
          imovelForm.endereco.cidade,
          imovelForm.endereco.estado,
          'Brasil',
        )

        const imovel = new Imovel(
          parseInt(imovelForm.totalComodos),
          parseInt(imovelForm.numeroQuartos) || 0,
          parseInt(imovelForm.numeroBanheiros),
          parseFloat(imovelForm.areaTotal) || 0,
          enderecoImovel,
          clienteSalvo,
          imovelForm.observacao,
        )

        console.log('   Imóvel criado:', {
          Id: imovel.Id,
          TotalComodos: imovel.TotalComodos,
          DonoId: imovel.Dono.Id,
          DonoNome: imovel.Dono.Nome,
        })

        const imovelSalvo = await imovelRepository.save(imovel)
        console.log('   Imóvel salvo:', {
          Id: imovelSalvo.Id,
          DonoId: imovelSalvo.Dono.Id,
        })

        clienteSalvo.adicionarImovel(imovelSalvo)
        imoveisCriados.push(imovelSalvo)
      }
    }

    // 5. ATUALIZAR CLIENTE COM IMÓVEIS
    if (imoveisCriados.length > 0) {
      console.log('4. Atualizando cliente com imóveis...')
      await clienteRepository.save(clienteSalvo)
      console.log('   Cliente atualizado com', imoveisCriados.length, 'imóveis')
    }

    // 6. SIMULAR NAVEGAÇÃO PARA LISTAGEM E VERIFICAR DADOS
    console.log('5. Simulando carregamento da listagem...')

    // Como seria carregado na ClienteListagemPage
    const todosClientes = await clienteRepository.getAll()
    console.log('   Total de clientes:', todosClientes.length)

    const clienteEncontrado = todosClientes.find((c) => c.Id === clienteSalvo.Id)
    console.log('   Cliente encontrado:', {
      Id: clienteEncontrado.Id,
      Nome: clienteEncontrado.Nome,
      ImoveisCount: clienteEncontrado.Imoveis.length,
      Imoveis: clienteEncontrado.Imoveis.map((i) => ({
        Id: i.Id,
        TotalComodos: i.TotalComodos,
        Observacao: i.Observacao,
      })),
    })

    // Como seria carregado na ImovelListagemPage
    const todosImoveis = await imovelRepository.getAll()
    console.log('   Total de imóveis:', todosImoveis.length)

    const imovelEncontrado = todosImoveis.find((i) => i.Dono.Id === clienteSalvo.Id)
    console.log('   Imóvel encontrado:', {
      Id: imovelEncontrado.Id,
      TotalComodos: imovelEncontrado.TotalComodos,
      DonoId: imovelEncontrado.Dono.Id,
      DonoNome: imovelEncontrado.Dono.Nome,
      Observacao: imovelEncontrado.Observacao,
    })

    // 7. SIMULAR BUSCA ESPECÍFICA POR CLIENTE
    const imoveisDoClienteEspecifico = await imovelRepository.getByClienteId(clienteSalvo.Id)
    console.log('   Imóveis específicos do cliente:', imoveisDoClienteEspecifico.length)

    // 8. VERIFICAR DADOS BRUTOS NO LOCALSTORAGE
    const clientesLS = JSON.parse(localStorage.getItem('clientes') || '[]')
    const imoveisLS = JSON.parse(localStorage.getItem('imoveis') || '[]')

    console.log('6. Dados brutos no localStorage:')
    console.log(
      '   Clientes:',
      clientesLS.map((c) => ({
        id: c.id,
        nome: c.nome,
        imoveisCount: c.imoveis?.length || 0,
      })),
    )
    console.log(
      '   Imóveis:',
      imoveisLS.map((i) => ({
        id: i.Id,
        donoId: i.Dono?.Id,
        totalComodos: i.TotalComodos,
      })),
    )

    // VERIFICAÇÕES
    expect(clienteEncontrado).toBeDefined()
    expect(clienteEncontrado.Imoveis).toHaveLength(1)
    expect(imovelEncontrado).toBeDefined()
    expect(imovelEncontrado.Dono.Id).toBe(clienteSalvo.Id)
    expect(imoveisDoClienteEspecifico).toHaveLength(1)

    console.log('✅ SIMULAÇÃO COMPLETA CONCLUÍDA COM SUCESSO!')
    console.log('   - Cliente salvo com ID válido')
    console.log('   - Imóvel salvo com referência correta ao cliente')
    console.log('   - Vinculação funcionando em ambas as direções')
    console.log('   - Dados persistindo corretamente no localStorage')
  })
})
