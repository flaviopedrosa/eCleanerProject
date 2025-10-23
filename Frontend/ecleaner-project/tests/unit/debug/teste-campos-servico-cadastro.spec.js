import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { Quasar } from 'quasar'
import ServicoCadastroPage from '../../../src/pages/ServicoCadastroPage.vue'

// Mock do router
const mockRouter = {
  push: vi.fn(),
}

const mockRoute = {
  params: {},
}

// Mock do store
const mockStore = {
  servicos: [],
  addServico: vi.fn(),
  updateServico: vi.fn(),
}

// Configuração do i18n para testes
const i18n = createI18n({
  locale: 'pt-BR',
  messages: {
    'pt-BR': {
      pages: {
        servico: {
          cadastroTitle: 'Novo Serviço',
          cadastroSubtitle: 'Preencha os dados do serviço',
          fields: {
            nome: 'Nome do Serviço',
            valor: 'Valor',
            descricao: 'Descrição',
            unidade: 'Unidade',
            observacao: 'Observações',
            ativo: 'Serviço Ativo',
          },
        },
      },
      forms: {
        buttons: {
          save: 'Salvar',
          cancel: 'Cancelar',
        },
      },
    },
  },
})

describe('ServicoCadastroPage - Campos da Entidade', () => {
  let wrapper

  beforeEach(() => {
    // Mock das funções globais
    vi.mock('vue-router', () => ({
      useRouter: () => mockRouter,
      useRoute: () => mockRoute,
    }))

    vi.mock('stores/servico-store', () => ({
      useServicoStore: () => mockStore,
    }))

    wrapper = mount(ServicoCadastroPage, {
      global: {
        plugins: [i18n, Quasar],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('deve renderizar todos os campos da entidade Servico', () => {
    // Verificações básicas de presença dos campos
    expect(wrapper.findAll('input').length).toBeGreaterThan(0)
    expect(wrapper.findAll('textarea').length).toBeGreaterThan(0)
    expect(wrapper.find('.q-select').exists()).toBe(true)
    expect(wrapper.find('.q-toggle').exists()).toBe(true)

    console.log('✅ Campos encontrados no formulário:')
    console.log('📝 Inputs:', wrapper.findAll('input').length)
    console.log('📄 Textareas:', wrapper.findAll('textarea').length)
    console.log('📋 Selects:', wrapper.findAll('.q-select').length)
    console.log('🔘 Toggles:', wrapper.findAll('.q-toggle').length)
  })

  it('deve ter valores padrão corretos conforme a entidade', () => {
    const vm = wrapper.vm

    // Verificar valores padrão do modelo
    expect(vm.servico.Id).toBeNull()
    expect(vm.servico.Nome).toBe('')
    expect(vm.servico.Valor).toBe(0)
    expect(vm.servico.Descricao).toBe('')
    expect(vm.servico.Unidade).toBe('Unidade')
    expect(vm.servico.Observacao).toBe('')
    expect(vm.servico.Ativo).toBe(true)

    console.log('✅ Modelo do serviço:', vm.servico)
  })

  it('deve ter opções de unidade apropriadas', () => {
    const vm = wrapper.vm

    expect(vm.unidadeOptions).toBeDefined()
    expect(Array.isArray(vm.unidadeOptions)).toBe(true)
    expect(vm.unidadeOptions.length).toBeGreaterThan(0)

    // Verificar se tem as unidades básicas
    const valores = vm.unidadeOptions.map((opt) => opt.value)
    expect(valores).toContain('Unidade')
    expect(valores).toContain('Hora')
    expect(valores).toContain('Metro Quadrado')

    console.log('✅ Opções de unidade disponíveis:')
    vm.unidadeOptions.forEach((opt) => {
      console.log(`   - ${opt.label} (${opt.value})`)
    })
  })

  it('deve validar campos obrigatórios', () => {
    const vm = wrapper.vm

    expect(vm.rules.required).toBeDefined()
    expect(typeof vm.rules.required).toBe('function')

    // Testar validação
    expect(vm.rules.required('')).toBe('Campo obrigatório')
    expect(vm.rules.required(null)).toBe('Campo obrigatório')
    expect(vm.rules.required('valor válido')).toBe(true)

    console.log('✅ Validação de campos obrigatórios funcionando')
  })
})
