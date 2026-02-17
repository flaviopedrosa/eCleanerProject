import { AtribuicaoMaterial } from '../../domain/entities/atribuicaoMaterial'

/**
 * Repositório para gerenciar atribuições de materiais no localStorage
 */
export class AtribuicaoMaterialRepository {
  constructor() {
    this.storageKey = 'atribuicoesMateriais'
  }

  /**
   * Salva ou atualiza uma atribuição
   * @param {AtribuicaoMaterial} atribuicao
   */
  async save(atribuicao) {
    const atribuicoes = await this.getAll()
    const atribuicoesData = atribuicoes.map((a) => this._mapToData(a))
    const index = atribuicoesData.findIndex((a) => a.Id === atribuicao.Id)

    const atribuicaoData = this._mapToData(atribuicao)

    if (index >= 0) {
      atribuicoesData[index] = atribuicaoData
    } else {
      atribuicoesData.push(atribuicaoData)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(atribuicoesData))
    return atribuicao
  }

  /**
   * Busca todas as atribuições
   */
  async getAll() {
    const data = localStorage.getItem(this.storageKey)
    if (!data) return []

    const atribuicoes = JSON.parse(data)
    return atribuicoes.map((a) => this._mapToEntity(a))
  }

  /**
   * Converte um objeto JSON em uma entidade AtribuicaoMaterial
   * @private
   */
  _mapToEntity(data) {
    if (!data || !data.MaterialId || !data.EquipeId) return null

    const atribuicao = new AtribuicaoMaterial(
      data.MaterialId,
      data.EquipeId,
      data.Quantidade,
      data.DataAtribuicao ? new Date(data.DataAtribuicao) : new Date(),
      data.Observacao || '',
      data.ResponsavelId || '',
    )

    // Restaurar propriedades adicionais
    atribuicao.Id = data.Id
    atribuicao.DataDevolucao = data.DataDevolucao ? new Date(data.DataDevolucao) : null
    atribuicao.QuantidadeDevolvida = data.QuantidadeDevolvida || 0
    atribuicao.Status = data.Status || 'ATIVO'

    return atribuicao
  }

  /**
   * Converte uma entidade AtribuicaoMaterial em objeto JSON
   * @private
   */
  _mapToData(atribuicao) {
    return {
      Id: atribuicao.Id,
      MaterialId: atribuicao.MaterialId,
      EquipeId: atribuicao.EquipeId,
      Quantidade: atribuicao.Quantidade,
      DataAtribuicao: atribuicao.DataAtribuicao,
      Observacao: atribuicao.Observacao,
      ResponsavelId: atribuicao.ResponsavelId,
      DataDevolucao: atribuicao.DataDevolucao,
      QuantidadeDevolvida: atribuicao.QuantidadeDevolvida,
      Status: atribuicao.Status,
    }
  }

  /**
   * Busca atribuição por ID
   * @param {string} id
   */
  async getById(id) {
    const atribuicoes = await this.getAll()
    return atribuicoes.find((a) => a.Id === id)
  }

  /**
   * Busca atribuições por material
   * @param {string} materialId
   */
  async getByMaterialId(materialId) {
    const atribuicoes = await this.getAll()
    return atribuicoes.filter((a) => a.MaterialId === materialId)
  }

  /**
   * Busca atribuições por equipe
   * @param {string} equipeId
   */
  async getByEquipeId(equipeId) {
    const atribuicoes = await this.getAll()
    return atribuicoes.filter((a) => a.EquipeId === equipeId)
  }

  /**
   * Busca atribuições ativas por material
   * @param {string} materialId
   */
  async getAtivasByMaterialId(materialId) {
    const atribuicoes = await this.getByMaterialId(materialId)
    return atribuicoes.filter((a) => a.estaAtiva())
  }

  /**
   * Busca atribuições ativas por equipe
   * @param {string} equipeId
   */
  async getAtivasByEquipeId(equipeId) {
    const atribuicoes = await this.getByEquipeId(equipeId)
    return atribuicoes.filter((a) => a.estaAtiva())
  }

  /**
   * Remove uma atribuição
   * @param {string} id
   */
  async delete(id) {
    const atribuicoes = await this.getAll()
    const filtered = atribuicoes.filter((a) => a.Id !== id)
    const filteredData = filtered.map((a) => this._mapToData(a))
    localStorage.setItem(this.storageKey, JSON.stringify(filteredData))
  }

  /**
   * Remove todas as atribuições
   */
  async clear() {
    localStorage.removeItem(this.storageKey)
  }
}
