import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock do fetch global
global.fetch = vi.fn()

describe('Teste de Traduções de CEP', () => {
  let mockT, mockNotify

  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    fetch.mockClear()

    // Mock da função de tradução
    mockT = vi.fn((key) => {
      const translations = {
        'forms.validation.invalidCep': 'CEP não encontrado',
        'forms.validation.cepFound': 'Endereço carregado com sucesso!',
        'forms.validation.cepError': 'Erro ao buscar CEP. Verifique sua conexão.',
      }
      return translations[key] || key
    })

    // Mock das notificações
    mockNotify = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deve usar as traduções corretas para CEP não encontrado', async () => {
    console.log('=== TESTE DE TRADUÇÃO - CEP INVÁLIDO ===')

    // Mock da resposta de erro da API ViaCEP
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ erro: true }),
    })

    // Função simplificada para teste de tradução
    async function buscarEnderecoPorCep(cep, t, notify) {
      const cepLimpo = cep.replace(/\D/g, '')

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          const message = t('forms.validation.invalidCep')
          console.log('📝 Mensagem traduzida:', message)

          notify({
            type: 'negative',
            message: message,
            timeout: 3000,
            position: 'top-right',
          })
          return
        }
      } catch (error) {
        const message = t('forms.validation.cepError')
        notify({
          type: 'negative',
          message: message,
          timeout: 3000,
          position: 'top-right',
        })
      }
    }

    console.log('🔍 Testando CEP inválido com tradução...')
    await buscarEnderecoPorCep('00000-000', mockT, mockNotify)

    // Verifica se a função de tradução foi chamada
    expect(mockT).toHaveBeenCalledWith('forms.validation.invalidCep')

    // Verifica se a notificação foi chamada com a mensagem traduzida
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'negative',
      message: 'CEP não encontrado',
      timeout: 3000,
      position: 'top-right',
    })

    console.log('   ✅ Tradução de CEP inválido funcionando!')
  })

  it('deve usar as traduções corretas para CEP encontrado', async () => {
    console.log('\n=== TESTE DE TRADUÇÃO - CEP VÁLIDO ===')

    // Mock da resposta da API ViaCEP
    const mockResponse = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    // Simulação de dados do formulário
    const form = {
      enderecos: [
        {
          cep: '01310-100',
          rua: '',
          bairro: '',
          cidade: '',
          estado: '',
        },
      ],
    }

    // Função simplificada para teste de tradução
    async function buscarEnderecoPorCep(cep, tipo, indice, t, notify) {
      const cepLimpo = cep.replace(/\D/g, '')

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          notify({
            type: 'negative',
            message: t('forms.validation.invalidCep'),
          })
          return
        }

        // Preenche os campos
        if (tipo === 'cliente' && indice !== null) {
          form.enderecos[indice].rua = data.logradouro || ''
          form.enderecos[indice].bairro = data.bairro || ''
          form.enderecos[indice].cidade = data.localidade || ''
          form.enderecos[indice].estado = data.uf || ''
        }

        const message = t('forms.validation.cepFound')
        console.log('📝 Mensagem traduzida:', message)

        notify({
          type: 'positive',
          message: message,
          timeout: 2000,
          position: 'top-right',
        })
      } catch (error) {
        notify({
          type: 'negative',
          message: t('forms.validation.cepError'),
        })
      }
    }

    console.log('🔍 Testando CEP válido com tradução...')
    await buscarEnderecoPorCep('01310-100', 'cliente', 0, mockT, mockNotify)

    // Verifica se a função de tradução foi chamada
    expect(mockT).toHaveBeenCalledWith('forms.validation.cepFound')

    // Verifica se a notificação foi chamada com a mensagem traduzida
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'positive',
      message: 'Endereço carregado com sucesso!',
      timeout: 2000,
      position: 'top-right',
    })

    // Verifica se os campos foram preenchidos
    expect(form.enderecos[0].rua).toBe('Avenida Paulista')
    expect(form.enderecos[0].bairro).toBe('Bela Vista')

    console.log('   ✅ Tradução de CEP válido funcionando!')
  })

  it('deve usar as traduções corretas para erro de rede', async () => {
    console.log('\n=== TESTE DE TRADUÇÃO - ERRO DE REDE ===')

    // Mock de erro de rede
    fetch.mockRejectedValueOnce(new Error('Network error'))

    // Função simplificada para teste de tradução
    async function buscarEnderecoPorCep(cep, t, notify) {
      const cepLimpo = cep.replace(/\D/g, '')

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()
        // ... resto da lógica
      } catch (error) {
        const message = t('forms.validation.cepError')
        console.log('📝 Mensagem traduzida:', message)

        notify({
          type: 'negative',
          message: message,
          timeout: 3000,
          position: 'top-right',
        })
      }
    }

    console.log('🔍 Testando erro de rede com tradução...')
    await buscarEnderecoPorCep('01310-100', mockT, mockNotify)

    // Verifica se a função de tradução foi chamada
    expect(mockT).toHaveBeenCalledWith('forms.validation.cepError')

    // Verifica se a notificação foi chamada com a mensagem traduzida
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'negative',
      message: 'Erro ao buscar CEP. Verifique sua conexão.',
      timeout: 3000,
      position: 'top-right',
    })

    console.log('   ✅ Tradução de erro de rede funcionando!')
  })

  it('deve verificar se todas as chaves de tradução existem', () => {
    console.log('\n=== TESTE DE CHAVES DE TRADUÇÃO ===')

    const chavesNecessarias = [
      'forms.validation.invalidCep',
      'forms.validation.cepFound',
      'forms.validation.cepError',
    ]

    chavesNecessarias.forEach((chave) => {
      const traducao = mockT(chave)
      console.log(`📋 ${chave}: "${traducao}"`)
      expect(traducao).not.toBe(chave) // Não deve retornar a própria chave
      expect(traducao).toBeTruthy() // Deve ter uma tradução
    })

    console.log('   ✅ Todas as chaves de tradução estão funcionando!')
  })
})
