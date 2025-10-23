import { describe, it, expect } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Debug: Salvamento de Cliente com Imóvel', () => {
  it('deve simular o fluxo completo de salvamento como no formulário', async () => {
    const clienteRepository = new ClienteRepository()
    const imovelRepository = new ImovelRepository()

    // Limpar dados anteriores
    await clienteRepository.clear()
    await imovelRepository.clear()

    // Simular dados do formulário
    const form = {
      nome: 'João',
      sobrenome: 'Silva',
      email: 'joao@email.com',
      celular: '11987654321',
      telefone: '1122334455',
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
          areaTotal: '150',
          observacao: 'Casa ampla',
          endereco: {
            cep: '04321-876',
            rua: 'Rua dos Sonhos',
            numero: '456',
            complemento: '',
            bairro: 'Vila Nova',
            cidade: 'São Paulo',
            estado: 'SP',
          },
        },
      ],
      observacoes: 'Cliente VIP',
    }

    console.log('=== DADOS DO FORMULÁRIO ===')
    console.log('Form imoveis:', form.imoveis)
    console.log('Primeiro imóvel:', form.imoveis[0])
    console.log('Condições verificadas:')
    console.log(
      '- totalComodos:',
      form.imoveis[0].totalComodos,
      '(truthy:',
      !!form.imoveis[0].totalComodos,
      ')',
    )
    console.log(
      '- numeroBanheiros:',
      form.imoveis[0].numeroBanheiros,
      '(truthy:',
      !!form.imoveis[0].numeroBanheiros,
      ')',
    )
    console.log(
      '- endereco.cep:',
      form.imoveis[0].endereco.cep,
      '(trim truthy:',
      !!form.imoveis[0].endereco.cep.trim(),
      ')',
    )

    // EXATO MESMO CÓDIGO DO ClienteCadastroPage.vue
    // Cria a instância do cliente
    const clienteInstance = new Cliente(
      form.nome,
      form.sobrenome,
      form.email,
      form.celular,
      form.telefone,
    )

    // Adiciona todos os endereços ao cliente (se houver)
    form.enderecos.forEach((enderecoForm) => {
      if (enderecoForm.cep.trim()) {
        const endereco = new Endereco(
          'Principal', // descricao
          enderecoForm.rua, // logradouro
          enderecoForm.numero,
          enderecoForm.cep,
          enderecoForm.bairro,
          enderecoForm.cidade,
          enderecoForm.estado,
          'Brasil', // pais
        )
        clienteInstance.adicionarEndereco(endereco)
      }
    })

    // Adiciona todos os imóveis ao cliente (se houver)
    const imoveisCriados = []
    for (const imovelForm of form.imoveis) {
      console.log('=== PROCESSANDO IMÓVEL ===')
      console.log('imovelForm:', imovelForm)
      console.log('Verificando condições:')
      console.log(
        '- imovelForm.totalComodos:',
        imovelForm.totalComodos,
        typeof imovelForm.totalComodos,
      )
      console.log(
        '- imovelForm.numeroBanheiros:',
        imovelForm.numeroBanheiros,
        typeof imovelForm.numeroBanheiros,
      )
      console.log('- imovelForm.endereco.cep.trim():', imovelForm.endereco.cep.trim())

      // Só adiciona imóveis que tenham dados básicos preenchidos
      if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
        console.log('✅ CONDIÇÕES ATENDIDAS - Criando imóvel...')

        const enderecoImovel = new Endereco(
          'Imóvel', // descricao
          imovelForm.endereco.rua, // logradouro
          imovelForm.endereco.numero,
          imovelForm.endereco.cep,
          imovelForm.endereco.bairro,
          imovelForm.endereco.cidade,
          imovelForm.endereco.estado,
          'Brasil', // pais
        )

        const imovel = new Imovel(
          parseInt(imovelForm.totalComodos),
          parseInt(imovelForm.numeroQuartos) || 0,
          parseInt(imovelForm.numeroBanheiros),
          parseFloat(imovelForm.areaTotal) || 0,
          enderecoImovel,
          clienteInstance,
          imovelForm.observacao,
        )

        console.log('Imóvel criado:', imovel)

        // Salva o imóvel no repositório
        const imovelSalvo = await imovelRepository.save(imovel)
        console.log('Imóvel salvo no repositório:', imovelSalvo)

        // Adiciona o imóvel ao cliente
        clienteInstance.adicionarImovel(imovel)
        imoveisCriados.push(imovel)

        console.log('✅ Imóvel criado e salvo:', imovel)
      } else {
        console.log('❌ CONDIÇÕES NÃO ATENDIDAS - Imóvel não será criado')
      }
    }

    console.log('=== ANTES DE SALVAR CLIENTE ===')
    console.log('clienteInstance.Imoveis:', clienteInstance.Imoveis)
    console.log('imoveisCriados:', imoveisCriados)

    clienteInstance.Observacoes = form.observacoes

    // Salva o cliente no repositório
    const clienteSalvo = await clienteRepository.save(clienteInstance)
    console.log('✅ Cliente salvo:', clienteSalvo)

    // Verificações
    const clienteCarregado = await clienteRepository.getById(clienteInstance.Id)
    const imoveisCarregados = await imovelRepository.getAll()
    const imoveisDoCliente = await imovelRepository.getByClienteId(clienteInstance.Id)

    console.log('=== VERIFICAÇÕES FINAIS ===')
    console.log('Cliente carregado:', clienteCarregado)
    console.log('Cliente carregado Imoveis:', clienteCarregado?.Imoveis)
    console.log('Todos os imóveis no repositório:', imoveisCarregados)
    console.log('Imóveis do cliente específico:', imoveisDoCliente)

    // Testes
    expect(clienteCarregado).toBeDefined()
    expect(clienteCarregado.Nome).toBe('João')
    expect(imoveisCarregados).toHaveLength(1)
    expect(imoveisDoCliente).toHaveLength(1)
    expect(clienteCarregado.Imoveis).toHaveLength(1)
  })
})
