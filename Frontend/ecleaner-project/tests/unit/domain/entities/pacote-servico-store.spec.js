import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePacoteServicoStore } from '@/stores/pacote-servico-store.js'

describe('Pacote Servico Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adiciona um novo pacote de serviços', async () => {
    const store = usePacoteServicoStore()

    const novoPacote = {
      Descricao: 'Pacote Teste',
      MargemLucro: 25,
      ItensMaterial: [],
      ItensServico: [],
    }

    await store.addPacote(novoPacote)

    expect(store.pacotes.length).toBe(1)
    expect(store.pacotes[0].Descricao).toBe('Pacote Teste')
    expect(store.pacotes[0].MargemLucro).toBe(25)
  })

  it('atualiza um pacote existente', async () => {
    const store = usePacoteServicoStore()

    // Adicionar um pacote primeiro
    const pacote = {
      Descricao: 'Pacote Original',
      MargemLucro: 30,
      ItensMaterial: [],
      ItensServico: [],
    }

    await store.addPacote(pacote)
    const pacoteAdicionado = store.pacotes[0]

    // Atualizar o pacote
    const pacoteAtualizado = {
      ...pacoteAdicionado,
      Descricao: 'Pacote Atualizado',
      MargemLucro: 35,
    }

    await store.updatePacote(pacoteAtualizado)

    expect(store.pacotes[0].Descricao).toBe('Pacote Atualizado')
    expect(store.pacotes[0].MargemLucro).toBe(35)
  })

  it('exclui um pacote', async () => {
    const store = usePacoteServicoStore()

    // Adicionar um pacote primeiro
    const pacote = {
      Descricao: 'Pacote para Excluir',
      MargemLucro: 20,
      ItensMaterial: [],
      ItensServico: [],
    }

    await store.addPacote(pacote)
    const pacoteAdicionado = store.pacotes[0]

    // Excluir o pacote
    await store.deletePacote(pacoteAdicionado.Id)

    expect(store.pacotes.length).toBe(0)
  })

  it('busca pacote por ID', async () => {
    const store = usePacoteServicoStore()

    const pacote = {
      Descricao: 'Pacote para Buscar',
      MargemLucro: 40,
      ItensMaterial: [],
      ItensServico: [],
    }

    await store.addPacote(pacote)
    const pacoteAdicionado = store.pacotes[0]

    const pacoteEncontrado = store.getPacoteById(pacoteAdicionado.Id)

    expect(pacoteEncontrado).toBeDefined()
    expect(pacoteEncontrado.Descricao).toBe('Pacote para Buscar')
  })

  it('calcula total de pacotes', async () => {
    const store = usePacoteServicoStore()

    await store.addPacote({
      Descricao: 'Pacote 1',
      MargemLucro: 30,
      ItensMaterial: [],
      ItensServico: [],
    })
    await store.addPacote({
      Descricao: 'Pacote 2',
      MargemLucro: 25,
      ItensMaterial: [],
      ItensServico: [],
    })

    expect(store.totalPacotes).toBe(2)
  })

  it('ordena pacotes por descrição', async () => {
    const store = usePacoteServicoStore()

    await store.addPacote({
      Descricao: 'Zebra',
      MargemLucro: 30,
      ItensMaterial: [],
      ItensServico: [],
    })
    await store.addPacote({
      Descricao: 'Alpha',
      MargemLucro: 25,
      ItensMaterial: [],
      ItensServico: [],
    })

    const pacotesOrdenados = store.pacotesSortedByDescricao

    expect(pacotesOrdenados[0].Descricao).toBe('Alpha')
    expect(pacotesOrdenados[1].Descricao).toBe('Zebra')
  })

  it('alterna status de favorito', async () => {
    const store = usePacoteServicoStore()

    const pacote = {
      Descricao: 'Pacote Teste',
      MargemLucro: 30,
      Favorito: false,
      ItensMaterial: [],
      ItensServico: [],
    }

    await store.addPacote(pacote)
    const pacoteAdicionado = store.pacotes[0]

    // Verificar estado inicial
    expect(pacoteAdicionado.Favorito).toBe(false)

    // Alternar para favorito
    await store.toggleFavorito(pacoteAdicionado.Id)
    expect(store.pacotes[0].Favorito).toBe(true)

    // Alternar de volta
    await store.toggleFavorito(pacoteAdicionado.Id)
    expect(store.pacotes[0].Favorito).toBe(false)
  })

  it('filtra pacotes favoritos', async () => {
    const store = usePacoteServicoStore()

    await store.addPacote({
      Descricao: 'Favorito',
      MargemLucro: 30,
      Favorito: true,
      ItensMaterial: [],
      ItensServico: [],
    })
    await store.addPacote({
      Descricao: 'Normal',
      MargemLucro: 25,
      Favorito: false,
      ItensMaterial: [],
      ItensServico: [],
    })

    const favoritos = store.pacotesFavoritos

    expect(favoritos.length).toBe(1)
    expect(favoritos[0].Descricao).toBe('Favorito')
    expect(store.totalPacotesFavoritos).toBe(1)
  })
})
