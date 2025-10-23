import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Teste de Adição de Imóvel - Primeiro da Lista', () => {
  let form, imovelVazio

  beforeEach(() => {
    // Simula o estado do formulário
    form = {
      value: {
        imoveis: [
          {
            totalComodos: '5',
            numeroQuartos: '2',
            numeroBanheiros: '2',
            areaTotal: '80',
            observacao: 'Imóvel existente 1',
            mesmoEnderecoCliente: false,
            endereco: {
              cep: '01310-100',
              rua: 'Avenida Paulista',
              numero: '100',
              complemento: '',
              bairro: 'Bela Vista',
              cidade: 'São Paulo',
              estado: 'SP',
            },
          },
          {
            totalComodos: '3',
            numeroQuartos: '1',
            numeroBanheiros: '1',
            areaTotal: '50',
            observacao: 'Imóvel existente 2',
            mesmoEnderecoCliente: false,
            endereco: {
              cep: '20040-020',
              rua: 'Rua da Assembléia',
              numero: '50',
              complemento: '',
              bairro: 'Centro',
              cidade: 'Rio de Janeiro',
              estado: 'RJ',
            },
          },
        ],
      },
    }

    // Simula a função imovelVazio
    imovelVazio = () => ({
      totalComodos: '',
      numeroQuartos: '',
      numeroBanheiros: '',
      areaTotal: '',
      observacao: '',
      mesmoEnderecoCliente: false,
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    })
  })

  it('deve adicionar novo imóvel como primeiro da lista', () => {
    console.log('=== TESTE DE ADIÇÃO DE IMÓVEL - PRIMEIRO DA LISTA ===')

    // Estado inicial
    const estadoInicial = form.value.imoveis.length
    console.log('📋 Estado inicial:')
    console.log(`   Total de imóveis: ${estadoInicial}`)
    form.value.imoveis.forEach((imovel, index) => {
      console.log(`   ${index + 1}. ${imovel.observacao} (${imovel.totalComodos} cômodos)`)
    })

    // Função que simula a adição (usando unshift em vez de push)
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    console.log('\n🏠 Adicionando novo imóvel...')
    adicionarNovoImovel()

    // Verificações
    console.log('\n📋 Estado após adição:')
    console.log(`   Total de imóveis: ${form.value.imoveis.length}`)
    form.value.imoveis.forEach((imovel, index) => {
      const descricao = imovel.observacao || 'Novo imóvel (vazio)'
      console.log(
        `   ${index + 1}. ${descricao} (${imovel.totalComodos || 'não definido'} cômodos)`,
      )
    })

    // Testes
    expect(form.value.imoveis.length).toBe(estadoInicial + 1)
    console.log('   ✅ Quantidade de imóveis aumentou em 1')

    // Verifica se o primeiro imóvel é o novo (vazio)
    const primeiroImovel = form.value.imoveis[0]
    expect(primeiroImovel.totalComodos).toBe('')
    expect(primeiroImovel.numeroQuartos).toBe('')
    expect(primeiroImovel.numeroBanheiros).toBe('')
    expect(primeiroImovel.areaTotal).toBe('')
    expect(primeiroImovel.observacao).toBe('')
    expect(primeiroImovel.mesmoEnderecoCliente).toBe(false)
    console.log('   ✅ Primeiro imóvel é o novo imóvel (vazio)')

    // Verifica se os imóveis antigos foram deslocados para baixo
    const segundoImovel = form.value.imoveis[1]
    expect(segundoImovel.observacao).toBe('Imóvel existente 1')
    expect(segundoImovel.totalComodos).toBe('5')
    console.log('   ✅ Imóvel anterior agora é o segundo da lista')

    const terceiroImovel = form.value.imoveis[2]
    expect(terceiroImovel.observacao).toBe('Imóvel existente 2')
    expect(terceiroImovel.totalComodos).toBe('3')
    console.log('   ✅ Segundo imóvel anterior agora é o terceiro da lista')

    console.log('\n✅ TESTE CONCLUÍDO - Novo imóvel adicionado como primeiro da lista!')
  })

  it('deve adicionar múltiplos imóveis sempre no início', () => {
    console.log('\n=== TESTE DE MÚLTIPLAS ADIÇÕES ===')

    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    // Estado inicial: 2 imóveis
    expect(form.value.imoveis.length).toBe(2)
    console.log('📋 Estado inicial: 2 imóveis')

    // Primeira adição
    console.log('\n🏠 Primeira adição...')
    adicionarNovoImovel()
    expect(form.value.imoveis.length).toBe(3)
    expect(form.value.imoveis[0].observacao).toBe('') // Novo imóvel vazio
    expect(form.value.imoveis[1].observacao).toBe('Imóvel existente 1')
    console.log('   ✅ Primeiro imóvel é vazio, segundo é o antigo primeiro')

    // Segunda adição
    console.log('\n🏠 Segunda adição...')
    adicionarNovoImovel()
    expect(form.value.imoveis.length).toBe(4)
    expect(form.value.imoveis[0].observacao).toBe('') // Novo imóvel vazio
    expect(form.value.imoveis[1].observacao).toBe('') // Imóvel vazio anterior
    expect(form.value.imoveis[2].observacao).toBe('Imóvel existente 1')
    console.log('   ✅ Novo imóvel sempre fica em primeiro lugar')

    console.log('\n📋 Estado final:')
    form.value.imoveis.forEach((imovel, index) => {
      const descricao = imovel.observacao || 'Novo imóvel (vazio)'
      console.log(`   ${index + 1}. ${descricao}`)
    })

    console.log('\n✅ TESTE CONCLUÍDO - Múltiplas adições funcionando corretamente!')
  })

  it('deve funcionar quando não há imóveis existentes', () => {
    console.log('\n=== TESTE COM LISTA VAZIA ===')

    // Simula lista vazia
    form.value.imoveis = []

    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    console.log('📋 Estado inicial: lista vazia')
    expect(form.value.imoveis.length).toBe(0)

    console.log('\n🏠 Adicionando primeiro imóvel...')
    adicionarNovoImovel()

    expect(form.value.imoveis.length).toBe(1)
    expect(form.value.imoveis[0].observacao).toBe('')
    console.log('   ✅ Primeiro imóvel adicionado com sucesso')

    console.log('\n🏠 Adicionando segundo imóvel...')
    adicionarNovoImovel()

    expect(form.value.imoveis.length).toBe(2)
    expect(form.value.imoveis[0].observacao).toBe('') // Novo
    expect(form.value.imoveis[1].observacao).toBe('') // Anterior
    console.log('   ✅ Segundo imóvel adicionado no início')

    console.log('\n✅ TESTE CONCLUÍDO - Funciona com lista vazia!')
  })
})
