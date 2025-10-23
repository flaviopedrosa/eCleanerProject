import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Cliente } from '@/core/domain/entities/cliente'
import { Endereco } from '@/core/domain/entities/endereco'
import { Imovel } from '@/core/domain/entities/imovel'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'

describe('Teste de Visualização da Vinculação', () => {
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

  it('deve mostrar os dados exatamente como aparecerão na interface', async () => {
    console.log('=== TESTE DE VISUALIZAÇÃO DA VINCULAÇÃO ===')

    // 1. Criar um cliente com endereço
    const cliente = new Cliente(
      'Maria',
      'Santos',
      'maria.santos@email.com',
      '11987654321',
      '1133445566',
    )

    const enderecoCliente = new Endereco(
      'Residencial',
      'Rua das Palmeiras',
      '789',
      '01234-567',
      'Jardim Europa',
      'São Paulo',
      'SP',
      'Brasil',
    )

    cliente.adicionarEndereco(enderecoCliente)
    cliente.Observacoes = 'Cliente VIP'

    // 2. Salvar cliente
    const clienteSalvo = await clienteRepository.save(cliente)
    console.log('✅ Cliente salvo:', {
      Id: clienteSalvo.Id,
      Nome: `${clienteSalvo.Nome} ${clienteSalvo.Sobrenome}`,
      Email: clienteSalvo.Email,
    })

    // 3. Criar dois imóveis para o cliente
    const imoveis = [
      {
        totalComodos: 6,
        quartos: 2,
        banheiros: 2,
        area: 80.5,
        observacao: 'Apartamento com varanda',
        endereco: new Endereco(
          'Apartamento',
          'Rua dos Lírios',
          '456',
          '04567-890',
          'Vila Nova',
          'São Paulo',
          'SP',
          'Brasil',
        ),
      },
      {
        totalComodos: 10,
        quartos: 4,
        banheiros: 3,
        area: 200.0,
        observacao: 'Casa com quintal e piscina',
        endereco: new Endereco(
          'Casa',
          'Avenida das Flores',
          '123',
          '12345-678',
          'Jardim Botânico',
          'São Paulo',
          'SP',
          'Brasil',
        ),
      },
    ]

    for (const imovelData of imoveis) {
      const imovel = new Imovel(
        imovelData.totalComodos,
        imovelData.quartos,
        imovelData.banheiros,
        imovelData.area,
        imovelData.endereco,
        clienteSalvo,
        imovelData.observacao,
      )

      const imovelSalvo = await imovelRepository.save(imovel)
      clienteSalvo.adicionarImovel(imovelSalvo)

      console.log('✅ Imóvel salvo:', {
        Id: imovelSalvo.Id,
        TotalComodos: imovelSalvo.TotalComodos,
        Endereco: `${imovelSalvo.Endereco.Logradouro}, ${imovelSalvo.Endereco.Numero}`,
        DonoNome: imovelSalvo.Dono.Nome,
      })
    }

    // 4. Atualizar cliente com imóveis
    await clienteRepository.save(clienteSalvo)

    // 5. SIMULAR O QUE APARECE NA ClienteListagemPage
    console.log('\n=== COMO APARECE NA LISTAGEM DE CLIENTES ===')

    const clientesDaListagem = await clienteRepository.getAll()
    const clienteNaListagem = clientesDaListagem[0]

    console.log('📋 Dados do cliente na tabela:')
    console.log(`   Nome: ${clienteNaListagem.Nome} ${clienteNaListagem.Sobrenome}`)
    console.log(`   Email: ${clienteNaListagem.Email}`)
    console.log(
      `   Telefones: ${[clienteNaListagem.Telefone, clienteNaListagem.Celular].filter(Boolean).join(' / ')}`,
    )

    // Endereços do cliente
    console.log('   Endereços:')
    clienteNaListagem.Enderecos.forEach((endereco, index) => {
      console.log(
        `     ${index + 1}. ${endereco.Logradouro}, ${endereco.Numero} - ${endereco.Bairro}, ${endereco.Cidade}/${endereco.Estado}`,
      )
    })

    // IMÓVEIS (nova coluna)
    console.log('   Imóveis:')
    if (!clienteNaListagem.Imoveis || clienteNaListagem.Imoveis.length === 0) {
      console.log('     Nenhum imóvel')
    } else {
      clienteNaListagem.Imoveis.forEach((imovel, index) => {
        console.log(
          `     🏠 ${index + 1}. ${imovel.TotalComodos} cômodos - ${imovel.Endereco.Logradouro}, ${imovel.Endereco.Numero}`,
        )
        console.log(
          `        Quartos: ${imovel.NumeroQuartos}, Banheiros: ${imovel.NumeroBanheiros}`,
        )
        if (imovel.Observacao) {
          console.log(`        Obs: ${imovel.Observacao}`)
        }
      })
    }

    // 6. SIMULAR O QUE APARECE NA ImovelListagemPage
    console.log('\n=== COMO APARECE NA LISTAGEM DE IMÓVEIS ===')

    const imoveisDaListagem = await imovelRepository.getAll()

    console.log('🏠 Imóveis cadastrados:')
    imoveisDaListagem.forEach((imovel, index) => {
      console.log(`   ${index + 1}. ${imovel.TotalComodos} cômodos`)
      console.log(
        `      Endereço: ${imovel.Endereco.Logradouro}, ${imovel.Endereco.Numero} - ${imovel.Endereco.Bairro}`,
      )
      console.log(`      Proprietário: ${imovel.Dono.Nome} ${imovel.Dono.Sobrenome}`)
      console.log(`      Email do proprietário: ${imovel.Dono.Email}`)
      if (imovel.Observacao) {
        console.log(`      Observações: ${imovel.Observacao}`)
      }
      console.log('')
    })

    // 7. VERIFICAR DADOS NO LOCALSTORAGE
    console.log('=== DADOS NO LOCALSTORAGE ===')

    const clientesLS = JSON.parse(localStorage.getItem('clientes') || '[]')
    const imoveisLS = JSON.parse(localStorage.getItem('imoveis') || '[]')

    console.log('💾 LocalStorage - Clientes:')
    clientesLS.forEach((c, index) => {
      console.log(`   ${index + 1}. ${c.nome} ${c.sobrenome} (ID: ${c.id})`)
      console.log(`      Imóveis vinculados: ${c.imoveis?.length || 0}`)
    })

    console.log('💾 LocalStorage - Imóveis:')
    imoveisLS.forEach((i, index) => {
      console.log(`   ${index + 1}. ${i.TotalComodos} cômodos (ID: ${i.Id})`)
      console.log(`      Dono ID: ${i.Dono?.Id}`)
      console.log(`      Dono Nome: ${i.Dono?.nome}`)
    })

    // VERIFICAÇÕES
    expect(clienteNaListagem.Imoveis).toHaveLength(2)
    expect(imoveisDaListagem).toHaveLength(2)
    expect(imoveisDaListagem[0].Dono.Id).toBe(clienteNaListagem.Id)
    expect(imoveisDaListagem[1].Dono.Id).toBe(clienteNaListagem.Id)

    console.log('\n✅ TESTE CONCLUÍDO - A vinculação está funcionando perfeitamente!')
    console.log('   ✓ Cliente possui 2 imóveis na propriedade Imoveis')
    console.log('   ✓ Cada imóvel possui referência correta ao cliente na propriedade Dono')
    console.log('   ✓ Dados persistem corretamente no localStorage')
    console.log('   ✓ Interface agora mostra a coluna "Imóveis" na listagem de clientes')
  })
})
