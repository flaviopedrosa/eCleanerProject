import { Equipamento } from '../../domain/entities/equipamento'

export class EquipamentoRepository {
  constructor() {
    // Inicializa o array de equipamentos no localStorage se não existir
    if (!localStorage.getItem('equipamentos')) {
      localStorage.setItem('equipamentos', JSON.stringify([]))
    }
  }

  // Limpa todos os dados do repositório
  async clear() {
    try {
      localStorage.setItem('equipamentos', JSON.stringify([]))
    } catch (error) {
      console.error('Erro ao limpar equipamentos:', error)
      throw new Error('Erro ao limpar equipamentos')
    }
  }

  // Converte um objeto JSON em uma entidade Equipamento
  _mapToEntity(data) {
    if (!data) return null

    const equipamento = new Equipamento(
      data.Descricao,
      data.Unidade,
      parseFloat(data.PrecoUnitario) || 0, // Garante que seja um número válido
      data.Imagem,
    )
    equipamento.Id = data.Id
    return equipamento
  }

  // Converte uma entidade Equipamento em objeto JSON
  _mapToData(equipamento) {
    return {
      Id: equipamento.Id,
      Descricao: equipamento.Descricao,
      Unidade: equipamento.Unidade,
      PrecoUnitario: parseFloat(equipamento.PrecoUnitario) || 0, // Garante que seja um número válido
      Imagem: equipamento.Imagem,
    }
  }

  // Busca todos os equipamentos
  async getAll() {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      return data.map((item) => this._mapToEntity(item))
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error)
      throw new Error('Erro ao buscar equipamentos')
    }
  }

  // Busca um equipamento por ID
  async getById(id) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const equipamentoData = data.find((item) => item.Id === id)
      return this._mapToEntity(equipamentoData)
    } catch (error) {
      console.error('Erro ao buscar equipamento:', error)
      throw new Error('Erro ao buscar equipamento')
    }
  }

  // Salva um equipamento (cria novo ou atualiza existente)
  async save(equipamento) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const existingIndex = data.findIndex((item) => item.Id === equipamento.Id)

      const equipamentoData = this._mapToData(equipamento)

      if (existingIndex >= 0) {
        // Atualiza equipamento existente
        data[existingIndex] = equipamentoData
      } else {
        // Adiciona novo equipamento
        data.push(equipamentoData)
      }

      localStorage.setItem('equipamentos', JSON.stringify(data))
      return this._mapToEntity(equipamentoData)
    } catch (error) {
      console.error('Erro ao salvar equipamento:', error)
      throw new Error('Erro ao salvar equipamento')
    }
  }

  // Cria um novo equipamento
  async create(equipamento) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const equipamentoData = this._mapToData(equipamento)
      data.push(equipamentoData)
      localStorage.setItem('equipamentos', JSON.stringify(data))
      return this._mapToEntity(equipamentoData)
    } catch (error) {
      console.error('Erro ao criar equipamento:', error)
      throw new Error('Erro ao criar equipamento')
    }
  }

  // Atualiza um equipamento existente
  async update(equipamento) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const index = data.findIndex((item) => item.Id === equipamento.Id)

      if (index === -1) {
        throw new Error('Equipamento não encontrado')
      }

      const equipamentoData = this._mapToData(equipamento)
      data[index] = equipamentoData
      localStorage.setItem('equipamentos', JSON.stringify(data))
      return this._mapToEntity(equipamentoData)
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error)
      throw new Error('Erro ao atualizar equipamento')
    }
  }

  // Remove um equipamento
  async delete(id) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const index = data.findIndex((item) => item.Id === id)

      if (index === -1) {
        throw new Error('Equipamento não encontrado')
      }

      data.splice(index, 1)
      localStorage.setItem('equipamentos', JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error)
      throw new Error('Erro ao deletar equipamento')
    }
  }

  // Busca equipamentos por descrição (busca parcial)
  async searchByDescricao(termo) {
    try {
      const data = JSON.parse(localStorage.getItem('equipamentos') || '[]')
      const termoLower = termo.toLowerCase()
      const filtered = data.filter((item) => item.Descricao.toLowerCase().includes(termoLower))
      return filtered.map((item) => this._mapToEntity(item))
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error)
      throw new Error('Erro ao buscar equipamentos')
    }
  }
}
