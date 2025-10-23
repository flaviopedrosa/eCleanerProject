import { defineStore } from 'pinia'
import { servicoRepository } from '@/core/infrastructure/repositories/servicoRepository'

export const useServicoStore = defineStore('servico', {
  state: () => ({
    servicos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchServicos() {
      this.loading = true
      try {
        // Busca os serviços do localStorage através do repositório
        this.servicos = servicoRepository.buscarTodos()
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao buscar serviços:', e)
      } finally {
        this.loading = false
      }
    },
    async addServico(servico) {
      try {
        const novoServico = servicoRepository.adicionar(servico)
        this.servicos.push(novoServico)
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao adicionar serviço:', e)
        throw e
      }
    },
    async updateServico(servico) {
      try {
        const servicoAtualizado = servicoRepository.atualizar(servico)
        const idx = this.servicos.findIndex((s) => s.Id === servico.Id)
        if (idx !== -1) this.servicos[idx] = servicoAtualizado
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao atualizar serviço:', e)
        throw e
      }
    },
    async deleteServico(id) {
      try {
        const removido = servicoRepository.remover(id)
        if (removido) {
          this.servicos = this.servicos.filter((s) => s.Id !== id)
        }
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error('Erro ao deletar serviço:', e)
        throw e
      }
    },
  },
})
