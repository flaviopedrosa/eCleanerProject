import { defineStore } from 'pinia'
import { Orcamento } from '@/core/domain/entities/orcamento'
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'
import { orcamentoRepository } from '@/core/infrastructure/repositories/orcamentoRepository'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'

export const useOrcamentoStore = defineStore('orcamento', {
  state: () => ({
    orcamentos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchOrcamentos() {
      this.loading = true
      try {
        // Buscar orçamentos do repositório
        this.orcamentos = orcamentoRepository.buscarTodos()
        this.error = null
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    // Alias para compatibilidade com a página de listagem
    async loadOrcamentos() {
      return this.fetchOrcamentos()
    },

    async addOrcamento(orcamento) {
      this.loading = true
      try {
        // Criar instância do orçamento
        const novoOrcamento = new Orcamento(
          orcamento.NumeroOrcamento,
          orcamento.Cliente,
          orcamento.Imovel,
          null, // PacoteServico no construtor = null - será definido como propriedade separada
          orcamento.FrequenciaDesejada,
          orcamento.QuantidadeProfissionais,
          orcamento.EstimativaHoras,
          orcamento.Descontos,
          orcamento.ImpostosTaxas,
          orcamento.Validade,
        )

        // Copiar campos adicionais
        novoOrcamento.DataEmissao = orcamento.DataEmissao
        novoOrcamento.Status = orcamento.Status
        novoOrcamento.Observacoes = orcamento.Observacoes || ''

        // Salvar ID do pacote de serviços (apenas o ID, não o objeto completo)
        if (orcamento.PacoteServico) {
          novoOrcamento.PacoteServico = orcamento.PacoteServico // Já deve vir apenas o ID
        }

        // Adicionar itens do orçamento se existirem
        if (orcamento.ItensOrcamento && Array.isArray(orcamento.ItensOrcamento)) {
          console.log('Store addOrcamento - Adicionando itens:', orcamento.ItensOrcamento)
          orcamento.ItensOrcamento.forEach((item) => {
            if (item && typeof item === 'object') {
              console.log('Store addOrcamento - Processando item:', item)
              try {
                // Se não for uma instância de ItemOrcamento, criar uma nova instância
                if (!(item instanceof ItemOrcamento)) {
                  console.log('Store addOrcamento - Criando nova instância de ItemOrcamento')
                  const itemOrcamento = new ItemOrcamento(
                    item.Descricao || item.descricao || 'Item',
                    item.Tipo || item.tipo,
                    item.Custo || item.custo || 0,
                    item.Quantidade || item.quantidade || 1,
                    item.Unidade || item.unidade || 'UN',
                    item.Observacoes || item.observacoes || '',
                    item.Numero || item.numero,
                  )
                  // Preservar ID se existir
                  if (item.Id || item.id) {
                    itemOrcamento.Id = item.Id || item.id
                  }
                  novoOrcamento.adicionarItem(itemOrcamento)
                } else {
                  novoOrcamento.adicionarItem(item)
                }
              } catch (error) {
                console.error('Erro ao adicionar item:', error, item)
              }
            }
          })
        }

        // Salvar no repositório
        const orcamentoSalvo = orcamentoRepository.adicionar(novoOrcamento)

        // Atualizar store
        this.orcamentos.push(orcamentoSalvo)
        this.error = null

        return orcamentoSalvo
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateOrcamento(orcamento) {
      this.loading = true
      try {
        console.log('Store updateOrcamento - Recebendo orçamento:', orcamento)
        console.log('Store updateOrcamento - ID do orçamento:', orcamento.Id)

        // Criar instância do orçamento
        const orcamentoAtualizado = new Orcamento(
          orcamento.NumeroOrcamento,
          orcamento.Cliente,
          orcamento.Imovel,
          null, // PacoteServico no construtor = null - será definido como propriedade separada
          orcamento.FrequenciaDesejada,
          orcamento.QuantidadeProfissionais,
          orcamento.EstimativaHoras,
          orcamento.Descontos,
          orcamento.ImpostosTaxas,
          orcamento.Validade,
        )

        // Copiar campos adicionais
        orcamentoAtualizado.Id = orcamento.Id
        console.log(
          'Store updateOrcamento - Copiando ID:',
          orcamento.Id,
          'para orcamentoAtualizado.Id:',
          orcamentoAtualizado.Id,
        )
        orcamentoAtualizado.DataEmissao = orcamento.DataEmissao
        orcamentoAtualizado.Status = orcamento.Status
        orcamentoAtualizado.Observacoes = orcamento.Observacoes || ''

        // Salvar ID do pacote de serviços (apenas o ID, não o objeto completo)
        if (orcamento.PacoteServico) {
          orcamentoAtualizado.PacoteServico = orcamento.PacoteServico // Já deve vir apenas o ID
        }

        // Adicionar itens do orçamento se existirem
        if (orcamento.ItensOrcamento && Array.isArray(orcamento.ItensOrcamento)) {
          console.log('Store updateOrcamento - Atualizando itens:', orcamento.ItensOrcamento)
          orcamento.ItensOrcamento.forEach((item) => {
            if (item && typeof item === 'object') {
              console.log('Store updateOrcamento - Processando item:', item)
              try {
                // Se não for uma instância de ItemOrcamento, criar uma nova instância
                if (!(item instanceof ItemOrcamento)) {
                  console.log('Store updateOrcamento - Criando nova instância de ItemOrcamento')
                  const itemOrcamento = new ItemOrcamento(
                    item.Descricao || item.descricao || 'Item',
                    item.Tipo || item.tipo,
                    item.Custo || item.custo || 0,
                    item.Quantidade || item.quantidade || 1,
                    item.Unidade || item.unidade || 'UN',
                    item.Observacoes || item.observacoes || '',
                    item.Numero || item.numero,
                  )
                  // Preservar ID se existir
                  if (item.Id || item.id) {
                    itemOrcamento.Id = item.Id || item.id
                  }
                  orcamentoAtualizado.adicionarItem(itemOrcamento)
                } else {
                  orcamentoAtualizado.adicionarItem(item)
                }
              } catch (error) {
                console.error('Erro ao adicionar item:', error, item)
              }
            }
          })
        }

        // Atualizar no repositório
        console.log('Store updateOrcamento - Enviando para repository:', orcamentoAtualizado)
        const orcamentoSalvo = orcamentoRepository.atualizar(orcamentoAtualizado)

        // Atualizar store
        const index = this.orcamentos.findIndex((o) => o.Id === orcamento.Id)
        if (index !== -1) {
          this.orcamentos[index] = orcamentoSalvo
        }
        this.error = null

        return orcamentoSalvo
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async deleteOrcamento(id) {
      this.loading = true
      try {
        // Remover do repositório
        orcamentoRepository.remover(id)

        // Atualizar store
        this.orcamentos = this.orcamentos.filter((o) => o.Id !== id)
        this.error = null
      } catch (e) {
        this.error = e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateStatusOrcamento(id, novoStatus) {
      try {
        const orcamento = this.orcamentos.find((o) => o.Id === id)
        if (orcamento) {
          orcamento.atualizarStatus(novoStatus)
        }
        this.error = null
      } catch (e) {
        this.error = e.message
        throw e
      }
    },

    getOrcamentoById(id) {
      // Primeiro tentar encontrar no store em memória
      let orcamento = this.orcamentos.find((o) => o.Id === id)

      // Se não encontrou, buscar no repositório
      if (!orcamento) {
        orcamento = orcamentoRepository.buscarPorId(id)
      }

      return orcamento
    },

    getProximoNumero() {
      if (this.orcamentos.length === 0) {
        return 1
      }
      const ultimoNumero = Math.max(...this.orcamentos.map((o) => o.NumeroOrcamento))
      return ultimoNumero + 1
    },
  },

  getters: {
    totalOrcamentos: (state) => state.orcamentos.length,

    orcamentosSorted: (state) => {
      return [...state.orcamentos].sort((a, b) => {
        return new Date(b.DataEmissao) - new Date(a.DataEmissao)
      })
    },

    orcamentosPorStatus: (state) => (status) => {
      return state.orcamentos.filter((orcamento) => orcamento.Status === status)
    },

    orcamentosExpirados: (state) => {
      return state.orcamentos.filter((orcamento) => orcamento.EstaExpirado)
    },

    valorTotalOrcamentos: (state) => {
      return state.orcamentos.reduce((total, orcamento) => total + orcamento.ValorTotal, 0)
    },

    estatisticasPorStatus: (state) => {
      const stats = {}
      Object.values(StatusOrcamento).forEach((status) => {
        stats[status] = state.orcamentos.filter((o) => o.Status === status).length
      })
      return stats
    },
  },
})
