import { defineStore } from 'pinia'
import { OrdemServico } from '@/core/domain/entities/OrdemServico'
import { OrdemServicoRepository } from '@/core/infrastructure/repositories/ordemServicoRepository'
import { StatusOrdemServico } from '@/core/domain/enums/StatusOrdemServico'
import { Cliente } from '@/core/domain/entities/cliente'
import { Imovel } from '@/core/domain/entities/imovel'
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'

const ordemServicoRepository = new OrdemServicoRepository()

export const useOrdemServicoStore = defineStore('ordemServico', {
  state: () => ({
    ordensServico: [],
    loading: false,
    error: null,
  }),

  getters: {
    getOrdemServicoPorId: (state) => (id) => {
      return state.ordensServico.find((ordem) => ordem.Id === id)
    },

    getOrdemServicoPorIdOrcamento: (state) => (idOrcamento) => {
      return state.ordensServico.find((ordem) => ordem.IdOrcamento === idOrcamento)
    },

    ordensAbertas: (state) => {
      return state.ordensServico.filter((ordem) => ordem.Status === StatusOrdemServico.ABERTA)
    },

    ordensEmAndamento: (state) => {
      return state.ordensServico.filter((ordem) => ordem.Status === StatusOrdemServico.EM_ANDAMENTO)
    },

    ordensConcluidas: (state) => {
      return state.ordensServico.filter((ordem) => ordem.Status === StatusOrdemServico.CONCLUIDA)
    },
  },

  actions: {
    async fetchOrdensServico() {
      this.loading = true
      try {
        this.ordensServico = ordemServicoRepository.buscarTodas()
        this.error = null
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async loadOrdensServico() {
      return this.fetchOrdensServico()
    },

    /**
     * Cria uma nova ordem de serviço a partir de um orçamento
     * @param {Orcamento} orcamento - Orçamento aprovado
     * @returns {OrdemServico} Ordem de serviço criada
     */
    async criarDeOrcamento(orcamento) {
      this.loading = true
      try {
        // Verificar se já existe ordem de serviço para este orçamento
        const ordemExistente = ordemServicoRepository.buscarPorIdOrcamento(orcamento.Id)
        if (ordemExistente) {
          throw new Error('Já existe uma ordem de serviço para este orçamento')
        }

        // Garantir que Cliente e Imovel sejam instâncias das classes
        let cliente = orcamento.Cliente
        if (!(cliente instanceof Cliente)) {
          cliente = Cliente.fromJSON(orcamento.Cliente)
        }

        let imovel = orcamento.Imovel
        if (!(imovel instanceof Imovel)) {
          imovel = Imovel.fromJSON(orcamento.Imovel)
        }

        // Criar nova ordem de serviço
        const ordemServico = new OrdemServico(
          orcamento.Id,
          0, // Número será gerado pelo repositório
          cliente,
          imovel,
          orcamento.FrequenciaDesejada,
          orcamento.QuantidadeProfissionais,
          orcamento.EstimativaHoras,
          orcamento.Descontos,
          orcamento.ImpostosTaxas,
        )

        // Copiar itens do orçamento
        if (orcamento.Itens && Array.isArray(orcamento.Itens)) {
          orcamento.Itens.forEach((item) => {
            // Garantir que o item seja uma instância de ItemOrcamento
            const itemOrcamento =
              item instanceof ItemOrcamento ? item : ItemOrcamento.fromJSON(item)
            ordemServico.adicionarItem(itemOrcamento)
          })
        }

        // Salvar no repositório
        const ordemSalva = ordemServicoRepository.adicionar(ordemServico)

        // Atualizar store
        this.ordensServico.push(ordemSalva)
        this.error = null

        return ordemSalva
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async addOrdemServico(ordemServico) {
      this.loading = true
      try {
        const ordemSalva = ordemServicoRepository.adicionar(ordemServico)
        this.ordensServico.push(ordemSalva)
        this.error = null
        return ordemSalva
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateOrdemServico(ordemServico) {
      this.loading = true
      try {
        const ordemAtualizada = ordemServicoRepository.atualizar(ordemServico)

        const index = this.ordensServico.findIndex((o) => o.Id === ordemServico.Id)
        if (index !== -1) {
          this.ordensServico[index] = ordemAtualizada
        }

        this.error = null
        return ordemAtualizada
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async deleteOrdemServico(id) {
      this.loading = true
      try {
        ordemServicoRepository.remover(id)
        this.ordensServico = this.ordensServico.filter((ordem) => ordem.Id !== id)
        this.error = null
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateStatus(id, novoStatus) {
      this.loading = true
      try {
        const ordem = ordemServicoRepository.buscarPorId(id)
        if (!ordem) {
          throw new Error('Ordem de serviço não encontrada')
        }

        ordem.atualizarStatus(novoStatus)
        const ordemAtualizada = ordemServicoRepository.atualizar(ordem)

        const index = this.ordensServico.findIndex((o) => o.Id === id)
        if (index !== -1) {
          this.ordensServico[index] = ordemAtualizada
        }

        this.error = null
        return ordemAtualizada
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async iniciarOrdemServico(id) {
      return this.updateStatus(id, StatusOrdemServico.EM_ANDAMENTO)
    },

    async concluirOrdemServico(id) {
      return this.updateStatus(id, StatusOrdemServico.CONCLUIDA)
    },

    async cancelarOrdemServico(id, motivo = '') {
      this.loading = true
      try {
        const ordem = ordemServicoRepository.buscarPorId(id)
        if (!ordem) {
          throw new Error('Ordem de serviço não encontrada')
        }

        ordem.cancelar(motivo)
        const ordemAtualizada = ordemServicoRepository.atualizar(ordem)

        const index = this.ordensServico.findIndex((o) => o.Id === id)
        if (index !== -1) {
          this.ordensServico[index] = ordemAtualizada
        }

        this.error = null
        return ordemAtualizada
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})
