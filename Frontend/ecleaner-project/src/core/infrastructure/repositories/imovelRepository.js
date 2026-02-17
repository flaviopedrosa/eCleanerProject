import { Imovel } from '../../domain/entities/imovel'
import { Endereco } from '../../domain/entities/endereco'
import { Cliente } from '../../domain/entities/cliente'

export class ImovelRepository {
  constructor() {
    this.storageKey = 'imoveis'
  }

  // Limpa todos os dados do repositório
  async clear() {
    localStorage.removeItem(this.storageKey)
  }

  // Converte um objeto JSON em uma entidade Imovel
  _mapToEntity(data) {
    try {
      // Recria o endereço
      const endereco = new Endereco(
        data.Endereco.Descricao,
        data.Endereco.Logradouro,
        data.Endereco.Numero,
        data.Endereco.Cep,
        data.Endereco.Bairro,
        data.Endereco.Cidade,
        data.Endereco.Estado,
        data.Endereco.Pais,
      )
      endereco.Id = data.Endereco.Id

      // Recria o dono (cliente)
      const dono = new Cliente(
        data.Dono.Nome,
        data.Dono.Sobrenome,
        data.Dono.Email,
        data.Dono.Celular,
        data.Dono.Telefone,
        data.Dono.PreferenciaContato,
        data.Dono.Observacoes,
      )
      dono.Id = data.Dono.Id

      // Recria os endereços do dono
      if (data.Dono.Enderecos && Array.isArray(data.Dono.Enderecos)) {
        dono.Enderecos = data.Dono.Enderecos.map((endData) => {
          const enderecoDono = new Endereco(
            endData.Descricao,
            endData.Logradouro,
            endData.Numero,
            endData.Cep,
            endData.Bairro,
            endData.Cidade,
            endData.Estado,
            endData.Pais,
          )
          enderecoDono.Id = endData.Id
          return enderecoDono
        })
      }

      // Recria o imóvel
      const imovel = new Imovel(
        data.TotalComodos,
        data.NumeroQuartos,
        data.NumeroBanheiros,
        data.AreaTotal,
        endereco,
        dono,
        data.Observacao,
        data.Imagens || [], // Inclui as imagens ou array vazio
      )
      imovel.Id = data.Id

      return imovel
    } catch (error) {
      console.error('Erro ao mapear imóvel:', error)
      throw new Error('Erro ao mapear dados do imóvel')
    }
  }

  // Converte uma entidade Imovel em um objeto JSON para armazenamento
  _mapToJSON(imovel) {
    return {
      Id: imovel.Id,
      TotalComodos: imovel.TotalComodos,
      NumeroQuartos: imovel.NumeroQuartos,
      NumeroBanheiros: imovel.NumeroBanheiros,
      AreaTotal: imovel.AreaTotal,
      Observacao: imovel.Observacao,
      Imagens: imovel.Imagens || [], // Inclui as imagens
      Endereco: {
        Id: imovel.Endereco.Id,
        Descricao: imovel.Endereco.Descricao,
        Logradouro: imovel.Endereco.Logradouro,
        Numero: imovel.Endereco.Numero,
        Cep: imovel.Endereco.Cep,
        Bairro: imovel.Endereco.Bairro,
        Cidade: imovel.Endereco.Cidade,
        Estado: imovel.Endereco.Estado,
        Pais: imovel.Endereco.Pais,
      },
      Dono: {
        Id: imovel.Dono.Id,
        Nome: imovel.Dono.Nome,
        Sobrenome: imovel.Dono.Sobrenome,
        Email: imovel.Dono.Email,
        Telefone: imovel.Dono.Telefone,
        Celular: imovel.Dono.Celular,
        PreferenciaContato: imovel.Dono.PreferenciaContato,
        Observacoes: imovel.Dono.Observacoes,
        Enderecos:
          imovel.Dono.Enderecos?.map((endereco) => ({
            Id: endereco.Id,
            Descricao: endereco.Descricao,
            Logradouro: endereco.Logradouro,
            Numero: endereco.Numero,
            Cep: endereco.Cep,
            Bairro: endereco.Bairro,
            Cidade: endereco.Cidade,
            Estado: endereco.Estado,
            Pais: endereco.Pais,
          })) || [],
      },
    }
  }

  // Lista todos os imóveis
  async getAll() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      return data.map((item) => this._mapToEntity(item))
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error)
      return []
    }
  }

  // Busca um imóvel por ID
  async getById(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      const item = data.find((item) => item.Id === id)
      return item ? this._mapToEntity(item) : null
    } catch (error) {
      console.error('Erro ao buscar imóvel por ID:', error)
      return null
    }
  }

  // Busca imóveis por cliente (dono)
  async getByClienteId(clienteId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      const imoveisCliente = data.filter((item) => item.Dono.Id === clienteId)
      return imoveisCliente.map((item) => this._mapToEntity(item))
    } catch (error) {
      console.error('Erro ao buscar imóveis por cliente:', error)
      return []
    }
  }

  // Salva um imóvel
  async save(imovel) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      const existingIndex = data.findIndex((item) => item.Id === imovel.Id)

      const imovelData = this._mapToJSON(imovel)

      if (existingIndex >= 0) {
        // Atualiza imóvel existente
        data[existingIndex] = imovelData
      } else {
        // Adiciona novo imóvel
        data.push(imovelData)
      }

      localStorage.setItem(this.storageKey, JSON.stringify(data))
      return this._mapToEntity(imovelData)
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error)
      throw new Error('Erro ao salvar imóvel')
    }
  }

  // Adiciona uma imagem a um imóvel específico
  async adicionarImagem(imovelId, imagem, descricao = '') {
    try {
      const imovel = await this.getById(imovelId)
      if (!imovel) {
        throw new Error('Imóvel não encontrado')
      }

      imovel.adicionarImagem(imagem, descricao)
      return await this.save(imovel)
    } catch (error) {
      console.error('Erro ao adicionar imagem ao imóvel:', error)
      throw error // Propaga o erro original em vez de criar um novo
    }
  }

  // Remove uma imagem de um imóvel específico
  async removerImagem(imovelId, imagemId) {
    try {
      const imovel = await this.getById(imovelId)
      if (!imovel) {
        throw new Error('Imóvel não encontrado')
      }

      imovel.removerImagem(imagemId)
      return await this.save(imovel)
    } catch (error) {
      console.error('Erro ao remover imagem do imóvel:', error)
      throw error // Propaga o erro original
    }
  }

  // Atualiza a descrição de uma imagem
  async atualizarDescricaoImagem(imovelId, imagemId, novaDescricao) {
    try {
      const imovel = await this.getById(imovelId)
      if (!imovel) {
        throw new Error('Imóvel não encontrado')
      }

      imovel.atualizarDescricaoImagem(imagemId, novaDescricao)
      return await this.save(imovel)
    } catch (error) {
      console.error('Erro ao atualizar descrição da imagem:', error)
      throw error // Propaga o erro original
    }
  }

  // Busca imóveis que possuem imagens
  async getImoveisComImagens() {
    try {
      const imoveis = await this.getAll()
      return imoveis.filter((imovel) => imovel.possuiImagens())
    } catch (error) {
      console.error('Erro ao buscar imóveis com imagens:', error)
      return []
    }
  }

  // Busca imóveis por número mínimo de imagens
  async getImovelsPorNumeroImagens(minImagens = 1) {
    try {
      const imoveis = await this.getAll()
      return imoveis.filter((imovel) => imovel.TotalImagens >= minImagens)
    } catch (error) {
      console.error('Erro ao buscar imóveis por número de imagens:', error)
      return []
    }
  }

  // Busca todas as imagens de um imóvel específico
  async getImagensImovel(imovelId) {
    try {
      const imovel = await this.getById(imovelId)
      if (!imovel) {
        throw new Error('Imóvel não encontrado')
      }

      return imovel.obterTodasImagens()
    } catch (error) {
      console.error('Erro ao buscar imagens do imóvel:', error)
      throw error // Propaga o erro original
    }
  }

  // Busca uma imagem específica de um imóvel
  async getImagemPorId(imovelId, imagemId) {
    try {
      const imovel = await this.getById(imovelId)
      if (!imovel) {
        throw new Error('Imóvel não encontrado')
      }

      return imovel.obterImagemPorId(imagemId)
    } catch (error) {
      console.error('Erro ao buscar imagem por ID:', error)
      throw error // Propaga o erro original
    }
  }

  // Exclui todos os imóveis de um cliente específico
  async deleteByDono(clienteId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      const imoveisRestantes = data.filter((item) => item.Dono.Id !== clienteId)
      const imoveisRemovidos = data.length - imoveisRestantes.length

      localStorage.setItem(this.storageKey, JSON.stringify(imoveisRestantes))

      console.log(`${imoveisRemovidos} imóveis removidos do cliente ${clienteId}`)
      return imoveisRemovidos
    } catch (error) {
      console.error('Erro ao deletar imóveis por cliente:', error)
      throw new Error('Erro ao deletar imóveis do cliente')
    }
  }

  // Exclui um imóvel
  async delete(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
      const index = data.findIndex((item) => item.Id === id)

      if (index === -1) {
        throw new Error('Imóvel não encontrado')
      }

      data.splice(index, 1)
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error)
      throw new Error('Erro ao deletar imóvel')
    }
  }
}

// Exporta uma única instância do repositório
export default new ImovelRepository()
