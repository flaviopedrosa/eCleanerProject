import { Material } from '../../domain/entities/material'

export class MaterialRepository {
  constructor() {
    // Inicializa o array de materiais no localStorage se não existir
    if (!localStorage.getItem('materiais')) {
      localStorage.setItem('materiais', JSON.stringify([]))
    }
  }

  // Limpa todos os dados do repositório
  async clear() {
    try {
      localStorage.setItem('materiais', JSON.stringify([]))
    } catch (error) {
      console.error('Erro ao limpar materiais:', error)
      throw new Error('Erro ao limpar materiais')
    }
  }

  // Converte um objeto JSON em uma entidade Material
  _mapToEntity(data) {
    if (!data) return null

    const material = new Material(
      data.Descricao,
      data.Unidade,
      parseFloat(data.PrecoUnitario) || 0, // Garante que seja um número válido
      data.Imagem,
      data.Url,
      data.QuantidadeEstoque || 0,
      data.EstoqueMinimo || 0,
    )
    material.Id = data.Id
    return material
  }

  // Converte uma entidade Material em objeto JSON
  _mapToData(material) {
    return {
      Id: material.Id,
      Descricao: material.Descricao,
      Unidade: material.Unidade,
      PrecoUnitario: parseFloat(material.PrecoUnitario) || 0, // Garante que seja um número válido
      Imagem: material.Imagem,
      Url: material.Url,
      QuantidadeEstoque: material.QuantidadeEstoque || 0,
      EstoqueMinimo: material.EstoqueMinimo || 0,
    }
  }

  // Busca todos os materiais
  async getAll() {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      return data.map((item) => this._mapToEntity(item))
    } catch (error) {
      console.error('Erro ao buscar materiais:', error)
      throw new Error('Erro ao buscar materiais')
    }
  }

  // Busca um material por ID
  async getById(id) {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      const materialData = data.find((item) => item.Id === id)
      return this._mapToEntity(materialData)
    } catch (error) {
      console.error('Erro ao buscar material:', error)
      throw new Error('Erro ao buscar material')
    }
  }

  // Salva um material (cria novo ou atualiza existente)
  async save(material) {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      const existingIndex = data.findIndex((item) => item.Id === material.Id)

      const materialData = this._mapToData(material)

      if (existingIndex >= 0) {
        // Atualiza material existente
        data[existingIndex] = materialData
      } else {
        // Adiciona novo material
        data.push(materialData)
      }

      localStorage.setItem('materiais', JSON.stringify(data))
      return this._mapToEntity(materialData)
    } catch (error) {
      console.error('Erro ao salvar material:', error)
      throw new Error('Erro ao salvar material')
    }
  }

  // Cria um novo material
  async create(material) {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      const materialData = this._mapToData(material)
      data.push(materialData)
      localStorage.setItem('materiais', JSON.stringify(data))
      return this._mapToEntity(materialData)
    } catch (error) {
      console.error('Erro ao criar material:', error)
      throw new Error('Erro ao criar material')
    }
  }

  // Atualiza um material existente
  async update(material) {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      const index = data.findIndex((item) => item.Id === material.Id)

      if (index === -1) {
        throw new Error('Material não encontrado')
      }

      const materialData = this._mapToData(material)
      data[index] = materialData
      localStorage.setItem('materiais', JSON.stringify(data))
      return this._mapToEntity(materialData)
    } catch (error) {
      console.error('Erro ao atualizar material:', error)
      throw new Error('Erro ao atualizar material')
    }
  }

  // Remove um material
  async delete(id) {
    try {
      const data = JSON.parse(localStorage.getItem('materiais') || '[]')
      const index = data.findIndex((item) => item.Id === id)

      if (index === -1) {
        throw new Error('Material não encontrado')
      }

      data.splice(index, 1)
      localStorage.setItem('materiais', JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Erro ao deletar material:', error)
      throw new Error('Erro ao deletar material')
    }
  }

  // Busca materiais por descrição (busca parcial)
  async searchByDescricao(termo) {
    try {
      const materiais = await this.getAll()
      return materiais.filter((material) =>
        material.Descricao.toLowerCase().includes(termo.toLowerCase()),
      )
    } catch (error) {
      console.error('Erro ao buscar materiais por descrição:', error)
      throw new Error('Erro ao buscar materiais por descrição')
    }
  }
}
