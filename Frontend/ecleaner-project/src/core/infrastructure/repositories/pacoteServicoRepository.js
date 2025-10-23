import { PacoteServico } from '../../domain/entities/pacoteServico.js'

/**
 * Repositório para gerenciar os pacotes de serviços no localStorage
 */
export class PacoteServicoRepository {
  constructor() {
    this.storageKey = 'ecleaner_pacotes_servicos'
  }

  /**
   * Salva todos os pacotes
   */
  salvarTodos(pacotes) {
    const pacotesJson = pacotes.map((pacote) => this._pacoteToJson(pacote))
    localStorage.setItem(this.storageKey, JSON.stringify(pacotesJson))
  }

  /**
   * Busca todos os pacotes
   */
  buscarTodos() {
    const pacotesJson = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
    return pacotesJson.map((pacoteData) => this._jsonToPacote(pacoteData))
  }

  /**
   * Busca pacote por ID
   */
  buscarPorId(id) {
    const pacotes = this.buscarTodos()
    return pacotes.find((pacote) => pacote.Id === id)
  }

  /**
   * Busca pacotes favoritos
   */
  buscarFavoritos() {
    const pacotes = this.buscarTodos()
    return pacotes.filter((pacote) => pacote.Favorito)
  }

  /**
   * Adiciona um novo pacote
   */
  adicionar(pacote) {
    const pacotes = this.buscarTodos()

    // Garantir que tem um ID único
    if (!pacote.Id || pacote.Id === null) {
      pacote.Id = Date.now().toString()
    }

    // Recalcular valores antes de salvar
    pacote.recalcularValores()

    pacotes.push(pacote)
    this.salvarTodos(pacotes)
    return pacote
  }

  /**
   * Atualiza um pacote existente
   */
  atualizar(pacoteAtualizado) {
    const pacotes = this.buscarTodos()
    const index = pacotes.findIndex((pacote) => pacote.Id === pacoteAtualizado.Id)

    if (index !== -1) {
      // Recalcular valores antes de salvar
      pacoteAtualizado.recalcularValores()
      pacotes[index] = pacoteAtualizado
      this.salvarTodos(pacotes)
      return pacoteAtualizado
    }

    throw new Error('Pacote não encontrado')
  }

  /**
   * Remove um pacote
   */
  remover(id) {
    const pacotes = this.buscarTodos()
    const pacotesFiltrados = pacotes.filter((pacote) => pacote.Id !== id)

    if (pacotesFiltrados.length < pacotes.length) {
      this.salvarTodos(pacotesFiltrados)
      return true
    }

    return false
  }

  /**
   * Limpa todos os pacotes
   */
  limparTodos() {
    localStorage.removeItem(this.storageKey)
  }

  /**
   * Conta total de pacotes
   */
  contar() {
    return this.buscarTodos().length
  }

  /**
   * Alterna status de favorito
   */
  toggleFavorito(id) {
    const pacotes = this.buscarTodos()
    const pacote = pacotes.find((p) => p.Id === id)

    if (pacote) {
      pacote.Favorito = !pacote.Favorito
      this.salvarTodos(pacotes)
      return pacote
    }

    throw new Error('Pacote não encontrado')
  }

  /**
   * Converte pacote para JSON serializable
   */
  _pacoteToJson(pacote) {
    return {
      Id: pacote.Id,
      Descricao: pacote.Descricao,
      MargemLucro: pacote.MargemLucro,
      Favorito: pacote.Favorito,
      ItensMaterial: pacote.ItensMaterial || [],
      ItensServico: pacote.ItensServico || [],
      ValorMaterial: pacote.ValorMaterial,
      ValorServico: pacote.ValorServico,
      ValorTotal: pacote.ValorTotal,
      ValorVenda: pacote.ValorVenda,
      CriadoEm: pacote.CriadoEm || new Date().toISOString(),
      AtualizadoEm: pacote.AtualizadoEm || new Date().toISOString(),
    }
  }

  /**
   * Converte JSON para instância de PacoteServico
   */
  _jsonToPacote(data) {
    const pacote = new PacoteServico(data.Descricao, data.MargemLucro)

    // Preservar o ID original se existir
    if (data.Id) {
      pacote.Id = data.Id
    }

    pacote.Favorito = data.Favorito || false
    pacote.ItensMaterial = data.ItensMaterial || []
    pacote.ItensServico = data.ItensServico || []
    pacote.ValorMaterial = data.ValorMaterial || 0
    pacote.ValorServico = data.ValorServico || 0
    pacote.ValorTotal = data.ValorTotal || 0
    pacote.ValorVenda = data.ValorVenda || 0
    pacote.CriadoEm = data.CriadoEm
    pacote.AtualizadoEm = data.AtualizadoEm

    return pacote
  }
}

// Instância singleton do repositório
export const pacoteServicoRepository = new PacoteServicoRepository()
