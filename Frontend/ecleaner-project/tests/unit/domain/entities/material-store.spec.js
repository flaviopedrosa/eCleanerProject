import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMaterialStore } from '@/stores/material-store.js'

describe('Material Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adiciona um novo material', async () => {
    const store = useMaterialStore()

    const novoMaterial = {
      Descricao: 'Sabão em Pó',
      Unidade: 'kg',
      PrecoUnitario: 15.5,
    }

    await store.addMaterial(novoMaterial)

    expect(store.materiais.length).toBe(1)
    expect(store.materiais[0].Descricao).toBe('Sabão em Pó')
    expect(store.materiais[0].Unidade).toBe('kg')
    expect(store.materiais[0].PrecoUnitario).toBe(15.5)
  })

  it('atualiza um material existente', async () => {
    const store = useMaterialStore()

    // Adicionar um material primeiro
    const material = {
      Descricao: 'Material Original',
      Unidade: 'un',
      PrecoUnitario: 10.0,
    }

    await store.addMaterial(material)
    const materialAdicionado = store.materiais[0]

    // Atualizar o material
    const materialAtualizado = {
      ...materialAdicionado,
      Descricao: 'Material Atualizado',
      PrecoUnitario: 20.0,
    }

    await store.updateMaterial(materialAtualizado)

    expect(store.materiais[0].Descricao).toBe('Material Atualizado')
    expect(store.materiais[0].PrecoUnitario).toBe(20.0)
  })

  it('exclui um material', async () => {
    const store = useMaterialStore()

    // Adicionar um material primeiro
    await store.addMaterial({
      Descricao: 'Material para Excluir',
      Unidade: 'un',
      PrecoUnitario: 5.0,
    })

    expect(store.materiais.length).toBe(1)

    const materialId = store.materiais[0].Id
    await store.deleteMaterial(materialId)

    expect(store.materiais.length).toBe(0)
  })

  it('calcula total de materiais', async () => {
    const store = useMaterialStore()

    await store.addMaterial({
      Descricao: 'Material 1',
      Unidade: 'un',
      PrecoUnitario: 10.0,
    })
    await store.addMaterial({
      Descricao: 'Material 2',
      Unidade: 'kg',
      PrecoUnitario: 25.0,
    })

    expect(store.totalMateriais).toBe(2)
  })

  it('ordena materiais por descrição', async () => {
    const store = useMaterialStore()

    await store.addMaterial({
      Descricao: 'Zebra Material',
      Unidade: 'un',
      PrecoUnitario: 10.0,
    })
    await store.addMaterial({
      Descricao: 'Alpha Material',
      Unidade: 'kg',
      PrecoUnitario: 15.0,
    })

    const materiaisOrdenados = store.materiaisSorted

    expect(materiaisOrdenados[0].Descricao).toBe('Alpha Material')
    expect(materiaisOrdenados[1].Descricao).toBe('Zebra Material')
  })
})
