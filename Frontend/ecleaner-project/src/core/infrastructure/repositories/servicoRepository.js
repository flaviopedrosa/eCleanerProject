import { Servico } from '../../domain/entities/servico.js'

/**
 * Repositório para gerenciar os serviços no localStorage
 */
export class ServicoRepository {
  constructor() {
    this.storageKey = 'ecleaner_servicos'
  }

  /**
   * Salva todos os serviços
   */
  salvarTodos(servicos) {
    const servicosJson = servicos.map((servico) => (servico.toJSON ? servico.toJSON() : servico))
    localStorage.setItem(this.storageKey, JSON.stringify(servicosJson))
  }

  /**
   * Busca todos os serviços
   */
  buscarTodos() {
    const servicosJson = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    return servicosJson.map((servicoData) => {
      // Se já é uma instância de Servico, retorna como está
      if (servicoData instanceof Servico) return servicoData

      // Se tem a estrutura nova (com propriedades capitalizadas)
      if (servicoData.Nome) {
        return new Servico(
          servicoData.Nome,
          servicoData.Descricao,
          servicoData.Valor,
          servicoData.Unidade,
          servicoData.Observacao,
        )
      }

      // Se tem a estrutura antiga (com propriedades minúsculas) - para compatibilidade
      return new Servico(
        servicoData.nome || servicoData.Nome,
        servicoData.descricao || servicoData.Descricao,
        servicoData.valor || servicoData.Valor,
        servicoData.unidade || servicoData.Unidade || 'Unidade',
        servicoData.observacao || servicoData.Observacao || '',
      )
    })
  }

  /**
   * Busca serviço por ID
   */
  buscarPorId(id) {
    const servicos = this.buscarTodos()
    return servicos.find((servico) => servico.Id === id)
  }

  /**
   * Adiciona um novo serviço
   */
  adicionar(servico) {
    const servicos = this.buscarTodos()
    servicos.push(servico)
    this.salvarTodos(servicos)
    return servico
  }

  /**
   * Atualiza um serviço existente
   */
  atualizar(servicoAtualizado) {
    const servicos = this.buscarTodos()
    const index = servicos.findIndex((servico) => servico.Id === servicoAtualizado.Id)

    if (index !== -1) {
      servicoAtualizado.marcarComoAtualizado()
      servicos[index] = servicoAtualizado
      this.salvarTodos(servicos)
      return servicoAtualizado
    }

    throw new Error('Serviço não encontrado')
  }

  /**
   * Remove um serviço
   */
  remover(id) {
    const servicos = this.buscarTodos()
    const servicosFiltrados = servicos.filter((servico) => servico.Id !== id)

    if (servicosFiltrados.length < servicos.length) {
      this.salvarTodos(servicosFiltrados)
      return true
    }

    return false
  }

  /**
   * Limpa todos os serviços
   */
  limparTodos() {
    localStorage.removeItem(this.storageKey)
  }

  /**
   * Conta total de serviços
   */
  contar() {
    return this.buscarTodos().length
  }

  /**
   * Busca serviços por faixa de preço
   */
  buscarPorFaixaPreco(valorMin, valorMax) {
    const servicos = this.buscarTodos()
    return servicos.filter((servico) => servico.Valor >= valorMin && servico.Valor <= valorMax)
  }
}

// Instância singleton do repositório
export const servicoRepository = new ServicoRepository()
