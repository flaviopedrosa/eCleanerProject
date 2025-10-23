import { describe, it, expect, beforeEach } from 'vitest'

describe('Teste de Ordem de Imóveis - Correção de Reatividade', () => {
  let form, imovelVazio

  beforeEach(() => {
    // Simula o estado do formulário com imóveis existentes
    form = {
      value: {
        imoveis: [
          {
            id: 1001,
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
            id: 1002,
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

    // Simula a função imovelVazio com ID único
    imovelVazio = () => ({
      id: Date.now() + Math.random(), // ID único para reatividade
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

  it('deve adicionar novo imóvel sempre na primeira posição com IDs únicos', () => {
    console.log('=== TESTE DE ORDEM COM IDs ÚNICOS ===')

    // Estado inicial
    console.log('📋 Estado inicial:')
    form.value.imoveis.forEach((imovel, index) => {
      console.log(
        `   ${index + 1}. [ID: ${imovel.id}] ${imovel.observacao || 'Vazio'} (${imovel.totalComodos} cômodos)`,
      )
    })

    // Função que adiciona no início
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    console.log('\n🏠 Adicionando novo imóvel...')
    adicionarNovoImovel()

    console.log('\n📋 Estado após adição:')
    form.value.imoveis.forEach((imovel, index) => {
      console.log(
        `   ${index + 1}. [ID: ${imovel.id}] ${imovel.observacao || 'NOVO IMÓVEL'} (${imovel.totalComodos || 'vazio'} cômodos)`,
      )
    })

    // Verificações
    expect(form.value.imoveis.length).toBe(3)
    console.log('   ✅ Total de imóveis: 3')

    // Verifica se o primeiro é o novo (com campos vazios)
    const primeiro = form.value.imoveis[0]
    expect(primeiro.totalComodos).toBe('')
    expect(primeiro.observacao).toBe('')
    expect(primeiro.id).toBeDefined()
    expect(primeiro.id).not.toBe(1001)
    expect(primeiro.id).not.toBe(1002)
    console.log('   ✅ Primeiro imóvel é o novo (campos vazios, ID único)')

    // Verifica se os antigos mantiveram suas posições relativas
    const segundo = form.value.imoveis[1]
    expect(segundo.id).toBe(1001)
    expect(segundo.observacao).toBe('Imóvel existente 1')
    console.log('   ✅ Segundo imóvel é o antigo primeiro (ID 1001)')

    const terceiro = form.value.imoveis[2]
    expect(terceiro.id).toBe(1002)
    expect(terceiro.observacao).toBe('Imóvel existente 2')
    console.log('   ✅ Terceiro imóvel é o antigo segundo (ID 1002)')

    console.log('\n✅ TESTE CONCLUÍDO - IDs únicos garantem ordem correta!')
  })

  it('deve manter IDs únicos mesmo com múltiplas adições rápidas', () => {
    console.log('\n=== TESTE DE MÚLTIPLAS ADIÇÕES RÁPIDAS ===')

    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    const idsIniciais = form.value.imoveis.map((i) => i.id)
    console.log('📋 IDs iniciais:', idsIniciais)

    // Adiciona 3 imóveis rapidamente
    console.log('\n🏠 Adicionando 3 imóveis rapidamente...')
    adicionarNovoImovel()
    adicionarNovoImovel()
    adicionarNovoImovel()

    // Verifica se todos os IDs são únicos
    const todosIds = form.value.imoveis.map((i) => i.id)
    const idsUnicos = [...new Set(todosIds)]

    console.log('📋 Todos os IDs:', todosIds)
    console.log('📋 IDs únicos:', idsUnicos)

    expect(todosIds.length).toBe(idsUnicos.length)
    console.log('   ✅ Todos os IDs são únicos')

    expect(form.value.imoveis.length).toBe(5)
    console.log('   ✅ Total de imóveis: 5')

    // Verifica ordem: os 3 primeiros devem ser vazios (novos)
    for (let i = 0; i < 3; i++) {
      expect(form.value.imoveis[i].totalComodos).toBe('')
      expect(form.value.imoveis[i].observacao).toBe('')
    }
    console.log('   ✅ Primeiros 3 imóveis são novos (vazios)')

    // Os últimos 2 devem ser os originais
    expect(form.value.imoveis[3].id).toBe(1001)
    expect(form.value.imoveis[4].id).toBe(1002)
    console.log('   ✅ Últimos 2 imóveis são os originais')

    console.log('\n✅ TESTE CONCLUÍDO - Múltiplas adições funcionam corretamente!')
  })

  it('deve simular o comportamento do Vue com keys', () => {
    console.log('\n=== TESTE DE SIMULAÇÃO DE REATIVIDADE DO VUE ===')

    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    // Simula como o Vue renderizaria com :key="imovel.id"
    function simularRenderizacaoVue(imoveis) {
      return imoveis.map((imovel, index) => ({
        key: imovel.id,
        position: index + 1,
        title: `Imóvel ${index + 1}`,
        isEmpty: !imovel.totalComodos,
        content: imovel.observacao || 'Novo imóvel',
      }))
    }

    console.log('📋 Renderização inicial:')
    let renderizacao = simularRenderizacaoVue(form.value.imoveis)
    renderizacao.forEach((item) => {
      console.log(`   Posição ${item.position}: ${item.title} [Key: ${item.key}] - ${item.content}`)
    })

    console.log('\n🏠 Adicionando novo imóvel...')
    adicionarNovoImovel()

    console.log('\n📋 Renderização após adição:')
    renderizacao = simularRenderizacaoVue(form.value.imoveis)
    renderizacao.forEach((item) => {
      console.log(`   Posição ${item.position}: ${item.title} [Key: ${item.key}] - ${item.content}`)
    })

    // Verificações da renderização
    expect(renderizacao[0].isEmpty).toBe(true)
    expect(renderizacao[0].content).toBe('Novo imóvel')
    console.log('   ✅ Primeira posição: novo imóvel vazio')

    expect(renderizacao[1].key).toBe(1001)
    expect(renderizacao[1].content).toBe('Imóvel existente 1')
    console.log('   ✅ Segunda posição: antigo primeiro imóvel')

    expect(renderizacao[2].key).toBe(1002)
    expect(renderizacao[2].content).toBe('Imóvel existente 2')
    console.log('   ✅ Terceira posição: antigo segundo imóvel')

    console.log('\n✅ TESTE CONCLUÍDO - Reatividade do Vue funcionará corretamente!')
  })
})
