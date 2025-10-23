import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import OrcamentoCadastroPage from '../../../src/pages/OrcamentoCadastroPage.vue'

// Mock router
const mockRouter = {
  push: vi.fn(),
  go: vi.fn(),
  currentRoute: {
    value: {
      params: {},
    },
  },
}

// Mock route
const mockRoute = {
  params: {},
}

// Mock i18n messages
const messages = {
  'pt-BR': {
    forms: {
      validation: {
        required: 'Campo obrigatório',
      },
      orcamento: {
        sections: {
          client: 'Cliente',
        },
        fields: {
          cliente: 'Cliente',
          imovel: 'Imóvel',
        },
        clientSummary: {
          noClient: 'Nenhum cliente selecionado',
          noProperty: 'Nenhum imóvel selecionado',
        },
        noClients: 'Nenhum cliente encontrado',
        noImoveis: 'Nenhum imóvel encontrado para este cliente',
      },
    },
  },
}

describe('OrcamentoCadastroPage - Seção Colapsável do Cliente', () => {
  let wrapper
  let i18n
  let pinia

  beforeEach(() => {
    // Configurar i18n
    i18n = createI18n({
      locale: 'pt-BR',
      fallbackLocale: 'pt-BR',
      messages,
    })

    // Configurar Pinia
    pinia = createPinia()

    // Criar wrapper do componente
    wrapper = mount(OrcamentoCadastroPage, {
      global: {
        plugins: [i18n, pinia, Quasar],
        mocks: {
          $router: mockRouter,
          $route: mockRoute,
          $q: {
            notify: vi.fn(),
          },
        },
        stubs: {
          'q-page': { template: '<div><slot /></div>' },
          'q-btn': { template: '<button><slot /></button>' },
          'q-icon': { template: '<i></i>' },
          'q-form': { template: '<form><slot /></form>' },
          'q-card': { template: '<div><slot /></div>' },
          'q-card-section': { template: '<div><slot /></div>' },
          'q-expansion-item': {
            template: '<div class="q-expansion-item"><slot /></div>',
            props: ['modelValue', 'label', 'icon', 'caption', 'headerClass', 'expandSeparator'],
          },
          'q-input': { template: '<input />' },
          'q-select': { template: '<select><slot /></select>' },
          'q-date': { template: '<div></div>' },
          'q-popup-proxy': { template: '<div><slot /></div>' },
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
        },
      },
    })
  })

  it('deve renderizar a seção do cliente como colapsável', () => {
    expect(wrapper.find('.q-expansion-item').exists()).toBe(true)
  })

  it('deve exibir o título "Cliente" na seção', () => {
    const expansionItem = wrapper.findComponent({ name: 'q-expansion-item' })
    expect(expansionItem.props('label')).toBe('Cliente')
  })

  it('deve exibir ícone de pessoa na seção', () => {
    const expansionItem = wrapper.findComponent({ name: 'q-expansion-item' })
    expect(expansionItem.props('icon')).toBe('person')
  })

  it('deve ter estado inicial da seção como expandida', () => {
    expect(wrapper.vm.clienteExpanded).toBe(true)
  })

  it('deve exibir resumo quando nenhum cliente está selecionado', () => {
    // Cliente não selecionado por padrão
    expect(wrapper.vm.clienteResumo).toBe('Nenhum cliente selecionado')
  })

  it('deve exibir resumo com cliente mas sem imóvel', async () => {
    // Simular seleção de cliente
    wrapper.vm.form.Cliente = { id: '1', label: 'João Silva' }
    wrapper.vm.clienteOptions = [{ id: '1', label: 'João Silva' }]

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clienteResumo).toBe('João Silva • Nenhum imóvel selecionado')
  })

  it('deve exibir resumo completo com cliente e imóvel', async () => {
    // Simular dados do cliente
    wrapper.vm.form.Cliente = { id: '1', label: 'João Silva' }
    wrapper.vm.clienteOptions = [{ id: '1', label: 'João Silva' }]

    // Simular dados do imóvel
    wrapper.vm.form.Imovel = '1'
    wrapper.vm.imovelOptionsAll = [
      {
        id: '1',
        label: 'Apartamento Centro',
        quartos: 3,
        banheiros: 2,
        area: 80,
        clienteId: '1',
      },
    ]

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clienteResumo).toBe('João Silva • 3Q 2B • 80m²')
  })

  it('deve permitir alternar o estado de expansão', async () => {
    // Estado inicial: expandido
    expect(wrapper.vm.clienteExpanded).toBe(true)

    // Simular fechamento
    wrapper.vm.clienteExpanded = false
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clienteExpanded).toBe(false)

    // Simular abertura novamente
    wrapper.vm.clienteExpanded = true
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clienteExpanded).toBe(true)
  })

  it('deve ter classe CSS correta no cabeçalho', () => {
    const expansionItem = wrapper.findComponent({ name: 'q-expansion-item' })
    expect(expansionItem.props('headerClass')).toBe('text-h6')
  })

  it('deve ter separador de expansão habilitado', () => {
    const expansionItem = wrapper.findComponent({ name: 'q-expansion-item' })
    expect(expansionItem.props('expandSeparator')).toBe(true)
  })
})
