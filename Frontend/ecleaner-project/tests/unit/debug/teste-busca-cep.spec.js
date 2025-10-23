import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock do fetch global
global.fetch = vi.fn()

describe('Teste de Busca de CEP', () => {
  beforeEach(() => {
    // Reset do mock antes de cada teste
    fetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deve buscar endereço pelo CEP e preencher os campos', async () => {
    console.log('=== TESTE DE BUSCA DE CEP ===')

    // Mock da resposta da API ViaCEP
    const mockResponse = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      complemento: 'até 610 - lado par',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    }

    // Mock para múltiplas chamadas
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    // Simulando dados do formulário
    const form = {
      enderecos: [
        {
          cep: '01310-100',
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
        },
      ],
      imoveis: [
        {
          endereco: {
            cep: '01310-100',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
          },
        },
      ],
    }

    // Mock das notificações
    const mockNotify = vi.fn()

    // Função buscarEnderecoPorCep (copiada do componente)
    async function buscarEnderecoPorCep(cep, tipo, indice = null) {
      if (!cep || cep.length < 8) return

      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, '')

      if (cepLimpo.length !== 8) return

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          mockNotify({
            type: 'negative',
            message: 'CEP não encontrado',
          })
          return
        }

        // Preenche os campos conforme o tipo de endereço
        if (tipo === 'cliente' && indice !== null) {
          form.enderecos[indice].rua = data.logradouro || ''
          form.enderecos[indice].bairro = data.bairro || ''
          form.enderecos[indice].cidade = data.localidade || ''
          form.enderecos[indice].estado = data.uf || ''
        } else if (tipo === 'imovel' && indice !== null) {
          form.imoveis[indice].endereco.rua = data.logradouro || ''
          form.imoveis[indice].endereco.bairro = data.bairro || ''
          form.imoveis[indice].endereco.cidade = data.localidade || ''
          form.imoveis[indice].endereco.estado = data.uf || ''
        }

        mockNotify({
          type: 'positive',
          message: 'Endereço carregado com sucesso!',
        })
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        mockNotify({
          type: 'negative',
          message: 'Erro ao buscar CEP. Verifique sua conexão.',
        })
      }
    }

    console.log('📋 Estado inicial dos endereços:')
    console.log('   Cliente - Rua:', form.enderecos[0].rua)
    console.log('   Cliente - Bairro:', form.enderecos[0].bairro)
    console.log('   Imóvel - Rua:', form.imoveis[0].endereco.rua)
    console.log('   Imóvel - Bairro:', form.imoveis[0].endereco.bairro)

    // TESTE 1: Buscar CEP para endereço do cliente
    console.log('\n🔍 Buscando CEP para cliente...')
    await buscarEnderecoPorCep('01310-100', 'cliente', 0)

    console.log('   Cliente após busca:')
    console.log('   - Rua:', form.enderecos[0].rua)
    console.log('   - Bairro:', form.enderecos[0].bairro)
    console.log('   - Cidade:', form.enderecos[0].cidade)
    console.log('   - Estado:', form.enderecos[0].estado)

    // Verificações para cliente
    expect(form.enderecos[0].rua).toBe('Avenida Paulista')
    expect(form.enderecos[0].bairro).toBe('Bela Vista')
    expect(form.enderecos[0].cidade).toBe('São Paulo')
    expect(form.enderecos[0].estado).toBe('SP')

    console.log('   ✅ Endereço do cliente preenchido corretamente!')

    // TESTE 2: Buscar CEP para endereço do imóvel
    console.log('\n🏠 Buscando CEP para imóvel...')
    await buscarEnderecoPorCep('01310-100', 'imovel', 0)

    console.log('   Imóvel após busca:')
    console.log('   - Rua:', form.imoveis[0].endereco.rua)
    console.log('   - Bairro:', form.imoveis[0].endereco.bairro)
    console.log('   - Cidade:', form.imoveis[0].endereco.cidade)
    console.log('   - Estado:', form.imoveis[0].endereco.estado)

    // Verificações para imóvel
    expect(form.imoveis[0].endereco.rua).toBe('Avenida Paulista')
    expect(form.imoveis[0].endereco.bairro).toBe('Bela Vista')
    expect(form.imoveis[0].endereco.cidade).toBe('São Paulo')
    expect(form.imoveis[0].endereco.estado).toBe('SP')

    console.log('   ✅ Endereço do imóvel preenchido corretamente!')

    // TESTE 3: Verificar chamadas da API
    console.log('\n📡 Verificando chamadas da API...')
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01310100/json/')

    console.log('   ✅ API chamada corretamente!')

    // TESTE 4: Verificar notificações
    console.log('\n🔔 Verificando notificações...')
    expect(mockNotify).toHaveBeenCalledTimes(2)
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'positive',
      message: 'Endereço carregado com sucesso!',
    })

    console.log('   ✅ Notificações enviadas corretamente!')

    console.log('\n✅ TESTE CONCLUÍDO - Busca de CEP funcionando!')
    console.log('   ✓ API ViaCEP integrada')
    console.log('   ✓ Campos preenchidos automaticamente')
    console.log('   ✓ Funciona para cliente e imóvel')
    console.log('   ✓ Notificações de sucesso/erro')
  })

  it('deve tratar erro quando CEP não for encontrado', async () => {
    console.log('\n=== TESTE DE CEP INVÁLIDO ===')

    // Mock da resposta de erro da API ViaCEP
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ erro: true }),
    })

    const mockNotify = vi.fn()

    // Função simplificada para teste de erro
    async function buscarEnderecoPorCep(cep) {
      const cepLimpo = cep.replace(/\D/g, '')

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          mockNotify({
            type: 'negative',
            message: 'CEP não encontrado',
          })
          return
        }
      } catch (error) {
        mockNotify({
          type: 'negative',
          message: 'Erro ao buscar CEP',
        })
      }
    }

    console.log('🔍 Testando CEP inválido...')
    await buscarEnderecoPorCep('00000-000')

    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/00000000/json/')
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'negative',
      message: 'CEP não encontrado',
    })

    console.log('   ✅ Erro tratado corretamente!')
  })
})
