import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Teste de Edição de Cliente com Imóveis', () => {
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

  it('deve carregar cliente com imóveis para edição', async () => {
    console.log('=== TESTE DE EDIÇÃO DE CLIENTE COM IMÓVEIS ===')

    // 1. Criar um cliente com dados completos
    const cliente = new Cliente('Ana', 'Costa', 'ana.costa@email.com', '11987654321', '1133445566')

    const enderecoCliente = new Endereco(
      'Residencial',
      'Rua das Orquídeas',
      '321',
      '04567-890',
      'Vila Esperança',
      'São Paulo',
      'SP',
      'Brasil',
    )

    cliente.adicionarEndereco(enderecoCliente)
    cliente.Observacoes = 'Cliente premium com contrato especial'

    // 2. Salvar cliente
    const clienteSalvo = await clienteRepository.save(cliente)
    console.log('✅ Cliente criado:', {
      Id: clienteSalvo.Id,
      Nome: `${clienteSalvo.Nome} ${clienteSalvo.Sobrenome}`,
      Email: clienteSalvo.Email,
    })

    // 3. Criar imóvel para o cliente
    const enderecoImovel = new Endereco(
      'Casa',
      'Rua dos Girassóis',
      '789',
      '12345-678',
      'Jardim das Flores',
      'São Paulo',
      'SP',
      'Brasil',
    )

    const imovel = new Imovel(
      8, // totalComodos
      3, // numeroQuartos
      2, // numeroBanheiros
      120.5, // areaTotal
      enderecoImovel,
      clienteSalvo,
      'Casa térrea com garagem para 2 carros',
    )

    const imovelSalvo = await imovelRepository.save(imovel)
    console.log('✅ Imóvel criado:', {
      Id: imovelSalvo.Id,
      TotalComodos: imovelSalvo.TotalComodos,
      Endereco: `${imovelSalvo.Endereco.Logradouro}, ${imovelSalvo.Endereco.Numero}`,
    })

    // 4. Adicionar imóvel ao cliente e salvar
    clienteSalvo.adicionarImovel(imovelSalvo)
    await clienteRepository.save(clienteSalvo)

    // 5. SIMULAR O QUE ACONTECE NO ClienteCadastroPage.vue EM MODO EDIÇÃO
    console.log('\n=== SIMULANDO CARREGAMENTO PARA EDIÇÃO ===')

    // Simula o que a função carregarCliente() faz
    const clienteParaEdicao = await clienteRepository.getById(clienteSalvo.Id)

    console.log('📝 Cliente carregado para edição:')
    console.log(`   Nome: ${clienteParaEdicao.Nome} ${clienteParaEdicao.Sobrenome}`)
    console.log(`   Email: ${clienteParaEdicao.Email}`)
    console.log(`   Telefones: ${clienteParaEdicao.Telefone} / ${clienteParaEdicao.Celular}`)
    console.log(`   Observações: ${clienteParaEdicao.Observacoes}`)

    // Endereços
    console.log('   Endereços:')
    clienteParaEdicao.Enderecos.forEach((endereco, index) => {
      console.log(
        `     ${index + 1}. ${endereco.Logradouro}, ${endereco.Numero} - ${endereco.Bairro}, ${endereco.Cidade}/${endereco.Estado}`,
      )
    })

    // Imóveis (aqui estava o problema!)
    console.log('   Imóveis:')
    if (clienteParaEdicao.Imoveis && clienteParaEdicao.Imoveis.length > 0) {
      clienteParaEdicao.Imoveis.forEach((imovel, index) => {
        console.log(`     🏠 ${index + 1}. ${imovel.TotalComodos} cômodos`)
        console.log(
          `        Quartos: ${imovel.NumeroQuartos}, Banheiros: ${imovel.NumeroBanheiros}`,
        )
        console.log(`        Área: ${imovel.AreaTotal}m²`)
        console.log(
          `        Endereço: ${imovel.Endereco.Logradouro}, ${imovel.Endereco.Numero} - ${imovel.Endereco.Bairro}`,
        )
        console.log(`        Observação: ${imovel.Observacao}`)
      })
    } else {
      console.log('     ❌ NENHUM IMÓVEL ENCONTRADO (Este era o problema!)')
    }

    // 6. SIMULAR O PREENCHIMENTO DO FORMULÁRIO
    console.log('\n=== PREENCHIMENTO DO FORMULÁRIO DE EDIÇÃO ===')

    const formData = {
      nome: clienteParaEdicao.Nome,
      sobrenome: clienteParaEdicao.Sobrenome,
      email: clienteParaEdicao.Email,
      telefone: clienteParaEdicao.Telefone || '',
      celular: clienteParaEdicao.Celular,
      observacoes: clienteParaEdicao.Observacoes || '',
      enderecos: [],
      imoveis: [],
    }

    // Preencher endereços
    if (clienteParaEdicao.Enderecos && clienteParaEdicao.Enderecos.length > 0) {
      formData.enderecos = clienteParaEdicao.Enderecos.map((endereco) => ({
        cep: endereco.Cep,
        rua: endereco.Logradouro,
        numero: endereco.Numero,
        complemento: endereco.Complemento || '',
        bairro: endereco.Bairro,
        cidade: endereco.Cidade,
        estado: endereco.Estado,
      }))
    }

    // Preencher imóveis
    if (clienteParaEdicao.Imoveis && clienteParaEdicao.Imoveis.length > 0) {
      formData.imoveis = clienteParaEdicao.Imoveis.map((imovel) => ({
        totalComodos: imovel.TotalComodos?.toString() || '',
        numeroQuartos: imovel.NumeroQuartos?.toString() || '',
        numeroBanheiros: imovel.NumeroBanheiros?.toString() || '',
        areaTotal: imovel.AreaTotal?.toString() || '',
        observacao: imovel.Observacao || '',
        endereco: {
          cep: imovel.Endereco?.Cep || '',
          rua: imovel.Endereco?.Logradouro || '',
          numero: imovel.Endereco?.Numero || '',
          complemento: imovel.Endereco?.Complemento || '',
          bairro: imovel.Endereco?.Bairro || '',
          cidade: imovel.Endereco?.Cidade || '',
          estado: imovel.Endereco?.Estado || '',
        },
      }))
    }

    console.log('📋 Dados do formulário preenchido:')
    console.log(`   Nome: ${formData.nome} ${formData.sobrenome}`)
    console.log(`   Email: ${formData.email}`)
    console.log(`   Endereços: ${formData.enderecos.length}`)
    console.log(`   Imóveis: ${formData.imoveis.length}`)

    if (formData.imoveis.length > 0) {
      formData.imoveis.forEach((imovel, index) => {
        console.log(`     Imóvel ${index + 1}:`)
        console.log(`       Cômodos: ${imovel.totalComodos}`)
        console.log(`       Quartos: ${imovel.numeroQuartos}`)
        console.log(`       Banheiros: ${imovel.numeroBanheiros}`)
        console.log(`       Endereço: ${imovel.endereco.rua}, ${imovel.endereco.numero}`)
      })
    }

    // VERIFICAÇÕES
    expect(clienteParaEdicao).toBeDefined()
    expect(clienteParaEdicao.Nome).toBe('Ana')
    expect(clienteParaEdicao.Imoveis).toHaveLength(1)
    expect(clienteParaEdicao.Imoveis[0].TotalComodos).toBe(8)
    expect(clienteParaEdicao.Imoveis[0].Endereco.Logradouro).toBe('Rua dos Girassóis')
    expect(formData.imoveis).toHaveLength(1)
    expect(formData.imoveis[0].totalComodos).toBe('8')
    expect(formData.imoveis[0].endereco.rua).toBe('Rua dos Girassóis')

    console.log('\n✅ TESTE CONCLUÍDO - Edição de cliente com imóveis funcionando!')
    console.log('   ✓ Cliente carregado corretamente do repositório')
    console.log('   ✓ Imóveis carregados com todos os dados')
    console.log('   ✓ Formulário preenchido corretamente')
    console.log('   ✓ Problema da edição resolvido!')
  })
})
