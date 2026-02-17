import { defineStore } from 'pinia'
import { Equipamento } from '@/core/domain/entities/equipamento'
import { EquipamentoRepository } from '@/core/infrastructure/repositories/equipamentoRepository'

export const useEquipamentoStore = defineStore('equipamento', {
  state: () => ({
    Equipamentos: [],
    Loading: false,
    Error: null,
  }),

  actions: {
    // Inicializa o repository
    _getRepository() {
      return new EquipamentoRepository()
    },

    // Carrega todos os equipamentos
    async loadEquipamentos() {
      this.Loading = true
      this.Error = null
      try {
        const repository = this._getRepository()
        this.Equipamentos = await repository.getAll()
      } catch (error) {
        this.Error = error.message
        throw error
      } finally {
        this.Loading = false
      }
    },

    // Adiciona um novo equipamento
    async addEquipamento(equipamentoData) {
      this.Loading = true
      this.Error = null
      try {
        const equipamento = new Equipamento(
          equipamentoData.Descricao,
          equipamentoData.Unidade,
          parseFloat(equipamentoData.PrecoUnitario) || 0, // Garante que seja um número válido
          equipamentoData.Imagem,
        )

        const repository = this._getRepository()
        const novoEquipamento = await repository.create(equipamento)
        this.Equipamentos.push(novoEquipamento)
        return novoEquipamento
      } catch (error) {
        this.Error = error.message
        throw error
      } finally {
        this.Loading = false
      }
    },

    // Atualiza um equipamento existente
    async updateEquipamento(equipamentoData) {
      this.Loading = true
      this.Error = null
      try {
        // Garante que o preço seja um número válido
        const dadosCorrigidos = {
          ...equipamentoData,
          PrecoUnitario: parseFloat(equipamentoData.PrecoUnitario) || 0,
        }

        const repository = this._getRepository()
        const equipamentoAtualizado = await repository.update(dadosCorrigidos)

        const index = this.Equipamentos.findIndex((e) => e.Id === equipamentoData.Id)
        if (index !== -1) {
          this.Equipamentos[index] = equipamentoAtualizado
        }
        return equipamentoAtualizado
      } catch (error) {
        this.Error = error.message
        throw error
      } finally {
        this.Loading = false
      }
    },

    // Remove um equipamento
    async deleteEquipamento(id) {
      this.Loading = true
      this.Error = null
      try {
        const repository = this._getRepository()
        await repository.delete(id)
        this.Equipamentos = this.Equipamentos.filter((e) => e.Id !== id)
      } catch (error) {
        this.Error = error.message
        throw error
      } finally {
        this.Loading = false
      }
    },

    // Busca um equipamento por ID
    async getEquipamentoById(id) {
      try {
        const repository = this._getRepository()
        return await repository.getById(id)
      } catch (error) {
        this.Error = error.message
        throw error
      }
    },

    // Busca equipamentos por descrição
    async searchEquipamentos(termo) {
      this.Loading = true
      this.Error = null
      try {
        const repository = this._getRepository()
        return await repository.searchByDescricao(termo)
      } catch (error) {
        this.Error = error.message
        throw error
      } finally {
        this.Loading = false
      }
    },

    // Limpa o estado de erro
    clearError() {
      this.Error = null
    },
  },

  getters: {
    // Total de equipamentos
    TotalEquipamentos: (state) => state.Equipamentos.length,

    // Equipamentos ordenados por descrição
    EquipamentosOrdenados: (state) => {
      return [...state.Equipamentos].sort((a, b) =>
        a.Descricao.localeCompare(b.Descricao, 'pt-BR', { sensitivity: 'base' }),
      )
    },

    // Verifica se há equipamentos
    HasEquipamentos: (state) => state.Equipamentos.length > 0,

    // Estado de loading
    IsLoading: (state) => state.Loading,

    // Estado de erro
    HasError: (state) => !!state.Error,
  },
})
