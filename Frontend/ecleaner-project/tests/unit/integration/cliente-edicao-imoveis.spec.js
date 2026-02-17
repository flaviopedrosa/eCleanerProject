import { describe, it, expect, beforeEach } from 'vitest'
import { Cliente } from '../../../src/core/domain/entities/cliente'
import { Imovel } from '../../../src/core/domain/entities/imovel'
import { Endereco } from '../../../src/core/domain/entities/endereco'
import { ClienteRepository } from '../../../src/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '../../../src/core/infrastructure/repositories/imovelRepository'

describe('Integração: Edição de Cliente com Imóveis', () => {
  let clienteRepository
  let imovelRepository

  beforeEach(async () => {
    // Limpa os repositórios antes de cada teste
    clienteRepository = new ClienteRepository()
    imovelRepository = new ImovelRepository()
    await clienteRepository.clear()
    await imovelRepository.clear()
  })

  it('deve atualizar imóveis existentes sem duplicar registros', async () => {
    // Arrange: Criar cliente inicial com imóveis
    const cliente = new Cliente(
      'João',
      'Silva',
      'joao@email.com',
      '11987654321',
      '1122334455',
      'WHATSAPP',
      'Cliente inicial',
    )

    const endereco1 = new Endereco(
      'Casa Principal',
      'Rua Teste A',
      '100',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )

    const endereco2 = new Endereco(
      'Apartamento',
      'Rua Teste B',
      '200',
      '01234-568',
      'Vila Nova',
      'São Paulo',
      'SP',
      'Brasil',
    )

    const imovel1 = new Imovel(
      5, // totalComodos
      2, // numeroQuartos
      2, // numeroBanheiros
      120, // areaTotal
      endereco1,
      cliente,
      'Casa grande',
      [{ id: 'img1', nome: 'casa1.jpg', descricao: 'Frente da casa' }],
    )

    const imovel2 = new Imovel(
      3, // totalComodos
      1, // numeroQuartos
      1, // numeroBanheiros
      60, // areaTotal
      endereco2,
      cliente,
      'Apartamento pequeno',
      [],
    )

    // Salvar cliente e imóveis iniciais
    const clienteSalvo = await clienteRepository.save(cliente)
    const imovel1Salvo = await imovelRepository.save(imovel1)
    const imovel2Salvo = await imovelRepository.save(imovel2)

    clienteSalvo.adicionarImovel(imovel1Salvo)
    clienteSalvo.adicionarImovel(imovel2Salvo)
    await clienteRepository.save(clienteSalvo)

    // Verificar estado inicial
    const imoveisIniciais = await imovelRepository.getAll()
    expect(imoveisIniciais).toHaveLength(2)

    console.log('Estado inicial:')
    console.log('- Cliente ID:', clienteSalvo.Id)
    console.log('- Imóvel 1 ID:', imovel1Salvo.Id)
    console.log('- Imóvel 2 ID:', imovel2Salvo.Id)
    console.log('- Total de imóveis:', imoveisIniciais.length)

    // Act: Simular edição - modificar imóvel existente e adicionar novo
    const clienteEditado = await clienteRepository.getById(clienteSalvo.Id)

    // Simular a lógica do formulário de edição
    const formularioImoveis = [
      {
        originalId: imovel1Salvo.Id, // Imóvel existente - será atualizado
        totalComodos: 6, // Alteração
        numeroQuartos: 3, // Alteração
        numeroBanheiros: 2,
        areaTotal: 150, // Alteração
        observacao: 'Casa reformada', // Alteração
        endereco: {
          rua: 'Rua Teste A Reformada', // Alteração
          numero: '100',
          cep: '01234-567',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        imagens: [
          { id: 'img1', nome: 'casa1.jpg', descricao: 'Frente da casa' },
          { id: 'img2', nome: 'casa2.jpg', descricao: 'Fundos da casa' }, // Nova imagem
        ],
      },
      // Imóvel 2 removido do formulário (será deletado)
      {
        originalId: null, // Novo imóvel
        totalComodos: 4,
        numeroQuartos: 2,
        numeroBanheiros: 1,
        areaTotal: 80,
        observacao: 'Imóvel novo',
        endereco: {
          rua: 'Rua Nova',
          numero: '300',
          cep: '01234-569',
          bairro: 'Bairro Novo',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        imagens: [],
      },
    ]

    // Processar os imóveis como faria a função onSubmit
    const imoveisProcessados = []
    const imoveisExistentesIds = []

    for (const imovelForm of formularioImoveis) {
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

      let imovelSalvo

      if (imovelForm.originalId) {
        // Atualizar imóvel existente
        const imovelExistente = await imovelRepository.getById(imovelForm.originalId)

        imovelExistente.TotalComodos = parseInt(imovelForm.totalComodos)
        imovelExistente.NumeroQuartos = parseInt(imovelForm.numeroQuartos)
        imovelExistente.NumeroBanheiros = parseInt(imovelForm.numeroBanheiros)
        imovelExistente.AreaTotal = parseFloat(imovelForm.areaTotal)
        imovelExistente.Endereco = enderecoImovel
        imovelExistente.Observacao = imovelForm.observacao
        imovelExistente.Imagens = imovelForm.imagens

        imovelSalvo = await imovelRepository.save(imovelExistente)
        imoveisExistentesIds.push(imovelSalvo.Id)
      } else {
        // Criar novo imóvel
        const novoImovel = new Imovel(
          parseInt(imovelForm.totalComodos),
          parseInt(imovelForm.numeroQuartos),
          parseInt(imovelForm.numeroBanheiros),
          parseFloat(imovelForm.areaTotal),
          enderecoImovel,
          clienteEditado,
          imovelForm.observacao,
          imovelForm.imagens,
        )
        imovelSalvo = await imovelRepository.save(novoImovel)
      }

      imoveisProcessados.push(imovelSalvo)
    }

    // Remover imóveis excluídos
    for (const imovelOriginal of clienteSalvo.Imoveis) {
      if (!imoveisExistentesIds.includes(imovelOriginal.Id)) {
        await imovelRepository.delete(imovelOriginal.Id)
      }
    }

    // Assert: Verificar resultado
    const imoveisFinal = await imovelRepository.getAll()

    console.log('Estado final:')
    console.log('- Total de imóveis após edição:', imoveisFinal.length)
    imoveisFinal.forEach((imovel, index) => {
      console.log(
        `- Imóvel ${index + 1}: ID=${imovel.Id}, Cômodos=${imovel.TotalComodos}, Observação="${imovel.Observacao}"`,
      )
    })

    // Deve ter apenas 2 imóveis: 1 atualizado + 1 novo
    expect(imoveisFinal).toHaveLength(2)

    // Verificar o imóvel atualizado
    const imovelAtualizado = imoveisFinal.find((i) => i.Id === imovel1Salvo.Id)
    expect(imovelAtualizado).toBeDefined()
    expect(imovelAtualizado.TotalComodos).toBe(6)
    expect(imovelAtualizado.NumeroQuartos).toBe(3)
    expect(imovelAtualizado.AreaTotal).toBe(150)
    expect(imovelAtualizado.Observacao).toBe('Casa reformada')
    expect(imovelAtualizado.Endereco.Logradouro).toBe('Rua Teste A Reformada')
    expect(imovelAtualizado.Imagens).toHaveLength(2)

    // Verificar o novo imóvel
    const novoImovel = imoveisFinal.find((i) => i.Id !== imovel1Salvo.Id)
    expect(novoImovel).toBeDefined()
    expect(novoImovel.TotalComodos).toBe(4)
    expect(novoImovel.NumeroQuartos).toBe(2)
    expect(novoImovel.Observacao).toBe('Imóvel novo')
    expect(novoImovel.Endereco.Logradouro).toBe('Rua Nova')

    // Verificar que o imóvel 2 original foi removido
    const imovelRemovido = imoveisFinal.find((i) => i.Id === imovel2Salvo.Id)
    expect(imovelRemovido).toBeUndefined()
  })

  it('deve manter imóveis inalterados quando não há modificações', async () => {
    // Arrange: Criar cliente com imóvel
    const cliente = new Cliente(
      'Maria',
      'Santos',
      'maria@email.com',
      '11999888777',
      '',
      'EMAIL',
      '',
    )

    const endereco = new Endereco(
      'Apartamento',
      'Rua Estável',
      '456',
      '12345-678',
      'Centro',
      'Rio de Janeiro',
      'RJ',
      'Brasil',
    )

    const imovel = new Imovel(
      4, // totalComodos
      2, // numeroQuartos
      1, // numeroBanheiros
      90, // areaTotal
      endereco,
      cliente,
      'Apartamento estável',
      [{ id: 'img1', nome: 'apto.jpg', descricao: 'Vista da sala' }],
    )

    const clienteSalvo = await clienteRepository.save(cliente)
    const imovelSalvo = await imovelRepository.save(imovel)

    clienteSalvo.adicionarImovel(imovelSalvo)
    await clienteRepository.save(clienteSalvo)

    const idOriginal = imovelSalvo.Id

    // Act: "Editar" sem mudanças
    const imovelExistente = await imovelRepository.getById(idOriginal)
    const imovelMantiido = await imovelRepository.save(imovelExistente)

    // Assert: ID deve permanecer o mesmo
    expect(imovelMantiido.Id).toBe(idOriginal)

    const todosImoveis = await imovelRepository.getAll()
    expect(todosImoveis).toHaveLength(1)
    expect(todosImoveis[0].Id).toBe(idOriginal)
  })
})
