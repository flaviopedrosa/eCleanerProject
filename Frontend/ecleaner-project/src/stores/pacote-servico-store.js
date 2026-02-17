import { defineStore } from 'pinia'
import { PacoteServico } from '@/core/domain/entities/pacoteServico'
import { pacoteServicoRepository } from '@/core/infrastructure/repositories/pacoteServicoRepository'

export const usePacoteServicoStore = defineStore('pacoteServico', {
  state: () => ({
    pacotes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPacotes() {
      this.loading = true
      try {
        // Busca os pacotes do localStorage através do repositório
        this.pacotes = pacoteServicoRepository.buscarTodos()
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao buscar pacotes:', e)
      } finally {
        this.loading = false
      }
    },

    async addPacote(pacote) {
      this.loading = true
      try {
        // Criar instância do pacote
        const novoPacote = new PacoteServico(pacote.Descricao, pacote.MargemLucro)
        novoPacote.ItensMaterial = pacote.ItensMaterial || []
        novoPacote.ItensEquipamento = pacote.ItensEquipamento || []
        novoPacote.ItensServico = pacote.ItensServico || []
        novoPacote.Favorito = pacote.Favorito || false

        // Salvar no repositório
        const pacoteSalvo = pacoteServicoRepository.adicionar(novoPacote)

        // Atualizar store
        this.pacotes.push(pacoteSalvo)
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao adicionar pacote:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    async updatePacote(pacote) {
      try {
        // Criar instância do pacote com dados atualizados
        const pacoteInstance = new PacoteServico(pacote.Descricao, pacote.MargemLucro)
        pacoteInstance.Id = pacote.Id
        pacoteInstance.ItensMaterial = pacote.ItensMaterial || []
        pacoteInstance.ItensEquipamento = pacote.ItensEquipamento || []
        pacoteInstance.ItensServico = pacote.ItensServico || []
        pacoteInstance.Favorito = pacote.Favorito || false

        // Atualizar no repositório
        const pacoteAtualizado = pacoteServicoRepository.atualizar(pacoteInstance)

        // Atualizar store
        const index = this.pacotes.findIndex((p) => p.Id === pacote.Id)
        if (index !== -1) {
          this.pacotes[index] = pacoteAtualizado
        }

        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao atualizar pacote:', e)
        throw e
      }
    },

    async deletePacote(id) {
      try {
        // Remover do repositório
        const removido = pacoteServicoRepository.remover(id)

        if (removido) {
          // Atualizar store
          this.pacotes = this.pacotes.filter((p) => p.Id !== id)
        }

        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao deletar pacote:', e)
        throw e
      }
    },

    getPacoteById(id) {
      return this.pacotes.find((p) => p.Id === id)
    },

    async toggleFavorito(id) {
      try {
        // Alterar favorito no repositório
        const pacoteAtualizado = pacoteServicoRepository.toggleFavorito(id)

        // Atualizar store
        const index = this.pacotes.findIndex((p) => p.Id === id)
        if (index !== -1) {
          this.pacotes[index] = pacoteAtualizado
        }

        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao alterar favorito:', e)
        throw e
      }
    },
  },

  getters: {
    pacotesSortedByDescricao: (state) => {
      return [...state.pacotes].sort((a, b) => a.Descricao.localeCompare(b.Descricao))
    },

    pacotesFavoritos: (state) => {
      return state.pacotes.filter((pacote) => pacote.Favorito)
    },

    totalPacotes: (state) => state.pacotes.length,

    totalPacotesFavoritos: (state) => {
      return state.pacotes.filter((pacote) => pacote.Favorito).length
    },

    valorTotalTodosPacotes: (state) => {
      return state.pacotes.reduce((total, pacote) => total + pacote.ValorVenda, 0)
    },
  },
})
