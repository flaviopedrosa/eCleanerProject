import { describe, it, expect, beforeEach } from 'vitest'
import { Cliente } from '../../../src/core/domain/entities/cliente.js'
import { Imovel } from '../../../src/core/domain/entities/imovel.js'
import { Endereco } from '../../../src/core/domain/entities/endereco.js'
import { ClienteRepository } from '../../../src/core/infrastructure/repositories/clienteRepository.js'
import imovelRepository from '../../../src/core/infrastructure/repositories/imovelRepository.js'

describe('Fix: Cliente Edição - Imóveis não duplicados', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear()
  })

  it('deve atualizar imóveis existentes sem criar duplicatas na edição', async () => {
    const clienteRepository = new ClienteRepository()
    // Usa a instância já exportada do repositório de imóveis

    // === FASE 1: CRIAÇÃO INICIAL ===
    // Cria um cliente
    const cliente = new Cliente('João', 'Silva', 'joao@email.com', '11999999999')
    const clienteSalvo = await clienteRepository.save(cliente)

    // Cria um endereço para o imóvel
    const endereco = new Endereco(
      'Casa Principal',
      'Rua das Flores, 123',
      '123',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )

    // Cria um imóvel inicial
    const imovelOriginal = new Imovel(
      5, // totalComodos
      2, // numeroQuartos
      2, // numeroBanheiros
      100, // areaTotal
      endereco,
      clienteSalvo,
      'Casa inicial',
      [{ id: 'img1', nome: 'foto1.jpg', descricao: 'Primeira foto' }],
    )

    const imovelSalvo = await imovelRepository.save(imovelOriginal)

    // Adiciona o imóvel ao cliente
    clienteSalvo.adicionarImovel(imovelSalvo)
    await clienteRepository.save(clienteSalvo)

    // Verifica estado inicial
    const imoveisIniciais = await imovelRepository.getAll()
    expect(imoveisIniciais).toHaveLength(1)
    expect(imoveisIniciais[0].Id).toBe(imovelSalvo.Id)
    expect(imoveisIniciais[0].Observacao).toBe('Casa inicial')

    console.log('Estado inicial:', {
      totalImoveis: imoveisIniciais.length,
      imovelId: imoveisIniciais[0].Id,
      observacao: imoveisIniciais[0].Observacao,
    })

    // === FASE 2: EDIÇÃO (SIMULANDO O BUG CORRIGIDO) ===

    // Carrega o cliente para edição
    const clienteParaEdicao = await clienteRepository.getById(clienteSalvo.Id)

    // Simula a edição - preserva ID do imóvel original
    const imovelEditado = new Imovel(
      6, // totalComodos (alterado)
      3, // numeroQuartos (alterado)
      2, // numeroBanheiros
      120, // areaTotal (alterado)
      endereco,
      clienteParaEdicao,
      'Casa editada', // observacao (alterada)
      [
        { id: 'img1', nome: 'foto1.jpg', descricao: 'Primeira foto' },
        { id: 'img2', nome: 'foto2.jpg', descricao: 'Segunda foto' },
      ],
    )

    // IMPORTANTE: Preserva o ID original (correção do bug)
    imovelEditado.Id = imovelSalvo.Id

    // Remove imóveis antigos do cliente (simulando a correção)
    await imovelRepository.deleteByDono(clienteParaEdicao.Id)

    // Salva o imóvel editado
    const imovelEditadoSalvo = await imovelRepository.save(imovelEditado)

    // Atualiza o cliente com o imóvel editado
    clienteParaEdicao.Imoveis = [imovelEditadoSalvo]
    await clienteRepository.save(clienteParaEdicao)

    // === FASE 3: VERIFICAÇÃO ===

    // Verifica que não há duplicatas
    const imoveisFinais = await imovelRepository.getAll()
    expect(imoveisFinais).toHaveLength(1) // Deve ter apenas 1 imóvel

    // Verifica que é o mesmo ID (não duplicado)
    expect(imoveisFinais[0].Id).toBe(imovelSalvo.Id)

    // Verifica que os dados foram atualizados
    expect(imoveisFinais[0].TotalComodos).toBe(6)
    expect(imoveisFinais[0].NumeroQuartos).toBe(3)
    expect(imoveisFinais[0].AreaTotal).toBe(120)
    expect(imoveisFinais[0].Observacao).toBe('Casa editada')
    expect(imoveisFinais[0].Imagens).toHaveLength(2)

    console.log('Estado final:', {
      totalImoveis: imoveisFinais.length,
      imovelId: imoveisFinais[0].Id,
      observacao: imoveisFinais[0].Observacao,
      totalComodos: imoveisFinais[0].TotalComodos,
      totalImagens: imoveisFinais[0].Imagens.length,
    })

    // Verifica que o cliente tem o imóvel correto
    const clienteFinal = await clienteRepository.getById(clienteSalvo.Id)
    expect(clienteFinal.Imoveis).toHaveLength(1)
    expect(clienteFinal.Imoveis[0].Id).toBe(imovelSalvo.Id)
    expect(clienteFinal.Imoveis[0].Observacao).toBe('Casa editada')
  })

  it('deve funcionar com múltiplos imóveis na edição', async () => {
    const clienteRepository = new ClienteRepository()
    // Usa a instância já exportada do repositório de imóveis

    // Cria cliente
    const cliente = new Cliente('Maria', 'Santos', 'maria@email.com', '11888888888')
    const clienteSalvo = await clienteRepository.save(cliente)

    // Cria 2 imóveis iniciais
    const endereco1 = new Endereco(
      'Casa',
      'Rua A, 100',
      '100',
      '01000-000',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )
    const endereco2 = new Endereco(
      'Apartamento',
      'Rua B, 200',
      '200',
      '02000-000',
      'Vila',
      'São Paulo',
      'SP',
      'Brasil',
    )

    const imovel1 = new Imovel(4, 2, 1, 80, endereco1, clienteSalvo, 'Casa original')
    const imovel2 = new Imovel(3, 1, 1, 60, endereco2, clienteSalvo, 'Apartamento original')

    const imovel1Salvo = await imovelRepository.save(imovel1)
    const imovel2Salvo = await imovelRepository.save(imovel2)

    clienteSalvo.adicionarImovel(imovel1Salvo)
    clienteSalvo.adicionarImovel(imovel2Salvo)
    await clienteRepository.save(clienteSalvo)

    // Verifica estado inicial
    const imoveisIniciais = await imovelRepository.getAll()
    expect(imoveisIniciais).toHaveLength(2)

    // Simula edição - modifica os 2 imóveis existentes
    await imovelRepository.deleteByDono(clienteSalvo.Id)

    const imovel1Editado = new Imovel(5, 3, 2, 90, endereco1, clienteSalvo, 'Casa editada')
    const imovel2Editado = new Imovel(4, 2, 1, 70, endereco2, clienteSalvo, 'Apartamento editado')

    // Preserva IDs originais
    imovel1Editado.Id = imovel1Salvo.Id
    imovel2Editado.Id = imovel2Salvo.Id

    await imovelRepository.save(imovel1Editado)
    await imovelRepository.save(imovel2Editado)

    // Verifica resultado
    const imoveisFinais = await imovelRepository.getAll()
    expect(imoveisFinais).toHaveLength(2) // Não duplicou

    // Verifica que são os mesmos IDs
    const idsFinais = imoveisFinais.map((i) => i.Id).sort()
    const idsOriginais = [imovel1Salvo.Id, imovel2Salvo.Id].sort()
    expect(idsFinais).toEqual(idsOriginais)

    // Verifica que os dados foram atualizados
    const casa = imoveisFinais.find((i) => i.Observacao === 'Casa editada')
    const apartamento = imoveisFinais.find((i) => i.Observacao === 'Apartamento editado')

    expect(casa).toBeTruthy()
    expect(apartamento).toBeTruthy()
    expect(casa.TotalComodos).toBe(5)
    expect(apartamento.TotalComodos).toBe(4)
  })
})
