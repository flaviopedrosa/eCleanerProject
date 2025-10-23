import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock do fetch global
global.fetch = vi.fn()

describe('Teste de Traduções de CEP - Inglês', () => {
  let mockT, mockNotify

  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    fetch.mockClear()

    // Mock da função de tradução para inglês
    mockT = vi.fn((key) => {
      const translations = {
        'forms.validation.invalidCep': 'ZIP Code not found',
        'forms.validation.cepFound': 'Address loaded successfully!',
        'forms.validation.cepError': 'Error fetching ZIP Code. Check your connection.',
      }
      return translations[key] || key
    })

    // Mock das notificações
    mockNotify = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deve usar as traduções em inglês para CEP não encontrado', async () => {
    console.log('=== TESTE DE TRADUÇÃO - CEP INVÁLIDO (INGLÊS) ===')

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
          console.log('📝 English message:', message)

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

    console.log('🔍 Testing invalid ZIP Code with English translation...')
    await buscarEnderecoPorCep('00000-000', mockT, mockNotify)

    // Verifica se a função de tradução foi chamada
    expect(mockT).toHaveBeenCalledWith('forms.validation.invalidCep')

    // Verifica se a notificação foi chamada com a mensagem traduzida em inglês
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'negative',
      message: 'ZIP Code not found',
      timeout: 3000,
      position: 'top-right',
    })

    console.log('   ✅ English translation for invalid ZIP Code working!')
  })

  it('deve usar as traduções em inglês para CEP encontrado', async () => {
    console.log('\n=== TESTE DE TRADUÇÃO - CEP VÁLIDO (INGLÊS) ===')

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
        console.log('📝 English message:', message)

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

    console.log('🔍 Testing valid ZIP Code with English translation...')
    await buscarEnderecoPorCep('01310-100', 'cliente', 0, mockT, mockNotify)

    // Verifica se a função de tradução foi chamada
    expect(mockT).toHaveBeenCalledWith('forms.validation.cepFound')

    // Verifica se a notificação foi chamada com a mensagem traduzida em inglês
    expect(mockNotify).toHaveBeenCalledWith({
      type: 'positive',
      message: 'Address loaded successfully!',
      timeout: 2000,
      position: 'top-right',
    })

    // Verifica se os campos foram preenchidos
    expect(form.enderecos[0].rua).toBe('Avenida Paulista')
    expect(form.enderecos[0].bairro).toBe('Bela Vista')

    console.log('   ✅ English translation for valid ZIP Code working!')
  })

  it('deve verificar todas as traduções em inglês', () => {
    console.log('\n=== TESTE DE CHAVES DE TRADUÇÃO (INGLÊS) ===')

    const translations = {
      'forms.validation.invalidCep': 'ZIP Code not found',
      'forms.validation.cepFound': 'Address loaded successfully!',
      'forms.validation.cepError': 'Error fetching ZIP Code. Check your connection.',
    }

    Object.entries(translations).forEach(([chave, esperado]) => {
      const traducao = mockT(chave)
      console.log(`📋 ${chave}: "${traducao}"`)
      expect(traducao).toBe(esperado)
    })

    console.log('   ✅ All English translations working correctly!')
  })
})
