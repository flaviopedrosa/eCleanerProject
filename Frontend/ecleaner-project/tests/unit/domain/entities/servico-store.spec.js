import { describe, it, expect } from 'vitest'
import { useServicoStore } from '@/stores/servico-store.js'

describe('Servico Store', () => {
  it('adiciona um novo serviço', async () => {
    const store = useServicoStore()
    await store.addServico({ Nome: 'Teste', Valor: 100, Descricao: 'Serviço de teste' })
    expect(store.servicos.some((s) => s.Nome === 'Teste')).toBe(true)
  })

  it('atualiza um serviço existente', async () => {
    const store = useServicoStore()
    await store.addServico({ Nome: 'Atualizar', Valor: 200, Descricao: 'Serviço' })
    const servico = store.servicos.find((s) => s.Nome === 'Atualizar')
    servico.Valor = 300
    await store.updateServico(servico)
    expect(store.servicos.find((s) => s.Nome === 'Atualizar').Valor).toBe(300)
  })

  it('exclui um serviço', async () => {
    const store = useServicoStore()
    await store.addServico({ Nome: 'Excluir', Valor: 50, Descricao: 'Serviço' })
    const servico = store.servicos.find((s) => s.Nome === 'Excluir')
    await store.deleteServico(servico.Id)
    expect(store.servicos.some((s) => s.Nome === 'Excluir')).toBe(false)
  })
})
