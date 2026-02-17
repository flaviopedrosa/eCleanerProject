import { Cliente } from '../../domain/entities/cliente'
import { Endereco } from '../../domain/entities/endereco'
import imovelRepository from './imovelRepository'

export class ClienteRepository {
  constructor() {
    // Inicializa o array de clientes no localStorage se não existir
    if (!localStorage.getItem('clientes')) {
      localStorage.setItem('clientes', JSON.stringify([]))
    }
  }

  // Limpa todos os dados do repositório
  async clear() {
    try {
      localStorage.setItem('clientes', JSON.stringify([]))
    } catch (error) {
      console.error('Erro ao limpar clientes:', error)
      throw new Error('Erro ao limpar clientes')
    }
  }

  // Converte um objeto JSON em uma entidade Cliente
  _mapToEntity(data) {
    if (!data) return null

    const cliente = new Cliente(
      data.nome,
      data.sobrenome,
      data.email,
      data.celular,
      data.telefone,
      data.preferenciaContato,
      data.observacoes,
    )

    // Define a foto se existir
    if (data.foto) {
      cliente.definirFoto(data.foto)
    }

    // Adiciona endereço se existir (apenas um)
    if (data.endereco) {
      cliente.definirEndereco(
        new Endereco(
          data.endereco.descricao || 'Principal', // descricao
          data.endereco.logradouro, // logradouro
          data.endereco.numero, // numero
          data.endereco.cep, // cep
          data.endereco.bairro, // bairro
          data.endereco.cidade, // cidade
          data.endereco.estado, // estado
          data.endereco.pais || 'Brasil', // pais
        ),
      )
    }

    // Compatibilidade com dados antigos (múltiplos endereços)
    if (data.enderecos && data.enderecos.length > 0) {
      const primeiroEndereco = data.enderecos[0]
      cliente.definirEndereco(
        new Endereco(
          primeiroEndereco.descricao || 'Principal',
          primeiroEndereco.logradouro,
          primeiroEndereco.numero,
          primeiroEndereco.cep,
          primeiroEndereco.bairro,
          primeiroEndereco.cidade,
          primeiroEndereco.estado,
          primeiroEndereco.pais || 'Brasil',
        ),
      )
    }

    // Adiciona informações básicas dos imóveis se existirem
    if (data.imoveis && Array.isArray(data.imoveis)) {
      data.imoveis.forEach((imovelData) => {
        // Criamos um objeto simples com os dados básicos do imóvel
        // Inclui endereço básico para exibição na interface
        const imovelBasico = {
          Id: imovelData.id,
          TotalComodos: imovelData.totalComodos,
          NumeroQuartos: imovelData.numeroQuartos,
          NumeroBanheiros: imovelData.numeroBanheiros,
          AreaTotal: imovelData.areaTotal,
          Observacao: imovelData.observacao,
          Endereco: imovelData.endereco
            ? {
                Id: imovelData.endereco.id,
                Descricao: imovelData.endereco.descricao,
                Logradouro: imovelData.endereco.logradouro,
                Numero: imovelData.endereco.numero,
                Cep: imovelData.endereco.cep,
                Bairro: imovelData.endereco.bairro,
                Cidade: imovelData.endereco.cidade,
                Estado: imovelData.endereco.estado,
                Pais: imovelData.endereco.pais,
              }
            : null,
        }
        cliente.Imoveis.push(imovelBasico)
      })
    }

    cliente.Id = data.id // Preserva o ID original
    return cliente
  }

  // Carregar imóveis completos do ImovelRepository
  async _loadImoveisCompletos(cliente) {
    try {
      const imoveisCompletos = await imovelRepository.getByClienteId(cliente.Id)
      cliente.Imoveis = imoveisCompletos
      return cliente
    } catch (error) {
      console.error('Erro ao carregar imóveis completos:', error)
      return cliente
    }
  }

  // Converte uma entidade Cliente em um objeto JSON para armazenamento
  _mapToJSON(cliente) {
    if (!cliente) return null

    return {
      id: cliente.Id,
      nome: cliente.Nome,
      sobrenome: cliente.Sobrenome,
      email: cliente.Email,
      telefone: cliente.Telefone,
      celular: cliente.Celular,
      foto: cliente.Foto, // Adicionando o mapeamento da foto
      preferenciaContato: cliente.PreferenciaContato,
      endereco: cliente.Endereco
        ? {
            descricao: cliente.Endereco.Descricao,
            logradouro: cliente.Endereco.Logradouro,
            numero: cliente.Endereco.Numero,
            cep: cliente.Endereco.Cep,
            bairro: cliente.Endereco.Bairro,
            cidade: cliente.Endereco.Cidade,
            estado: cliente.Endereco.Estado,
            pais: cliente.Endereco.Pais,
            complemento: cliente.Endereco.Complemento,
          }
        : null,
      observacoes: cliente.Observacoes,
      imoveis:
        cliente.Imoveis?.map((imovel) => ({
          id: imovel.Id,
          totalComodos: imovel.TotalComodos,
          numeroQuartos: imovel.NumeroQuartos,
          numeroBanheiros: imovel.NumeroBanheiros,
          areaTotal: imovel.AreaTotal,
          observacao: imovel.Observacao,
          endereco: imovel.Endereco
            ? {
                id: imovel.Endereco.Id,
                descricao: imovel.Endereco.Descricao,
                logradouro: imovel.Endereco.Logradouro,
                numero: imovel.Endereco.Numero,
                cep: imovel.Endereco.Cep,
                bairro: imovel.Endereco.Bairro,
                cidade: imovel.Endereco.Cidade,
                estado: imovel.Endereco.Estado,
                pais: imovel.Endereco.Pais,
              }
            : null,
        })) || [],
    }
  }

  // Lista todos os clientes
  async getAll() {
    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const clientesMapeados = clientes.map((data) => this._mapToEntity(data))

      // Carregar imóveis completos para cada cliente
      const clientesComImoveis = await Promise.all(
        clientesMapeados.map(async (cliente) => {
          return await this._loadImoveisCompletos(cliente)
        }),
      )

      return clientesComImoveis
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      throw new Error('Erro ao buscar clientes')
    }
  }

  // Busca um cliente por ID
  async getById(id) {
    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const cliente = clientes.find((c) => c.id === id)
      const clienteMapeado = this._mapToEntity(cliente)

      if (clienteMapeado) {
        return await this._loadImoveisCompletos(clienteMapeado)
      }

      return clienteMapeado
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      throw new Error('Erro ao buscar cliente')
    }
  }

  // Limpa fotos grandes de clientes antigos para liberar espaço
  _limparFotosAntigas(clientes) {
    let dadosLimpos = false
    clientes.forEach((cliente) => {
      if (cliente.foto && cliente.foto.length > 50000) {
        // Se foto > 50KB
        cliente.foto = null
        dadosLimpos = true
      }
    })
    return dadosLimpos
  }

  // Salva um novo cliente
  async save(cliente) {
    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const clienteJSON = this._mapToJSON(cliente)

      // Se não tem ID, é um novo cliente
      if (!clienteJSON.id) {
        clienteJSON.id = crypto.randomUUID()
        clientes.push(clienteJSON)
      } else {
        // Se tem ID, atualiza o cliente existente
        const index = clientes.findIndex((c) => c.id === clienteJSON.id)
        if (index >= 0) {
          clientes[index] = clienteJSON
        } else {
          clientes.push(clienteJSON)
        }
      }

      try {
        localStorage.setItem('clientes', JSON.stringify(clientes))
      } catch (quotaError) {
        if (quotaError.name === 'QuotaExceededError') {
          console.warn('LocalStorage cheio, tentando limpar dados antigos...')

          // Tenta limpar fotos antigas
          const dadosLimpos = this._limparFotosAntigas(clientes)

          if (dadosLimpos) {
            try {
              localStorage.setItem('clientes', JSON.stringify(clientes))
              console.log('Dados limpos com sucesso, cliente salvo')
            } catch {
              throw new Error(
                'Armazenamento local cheio. Considere remover alguns clientes com fotos.',
              )
            }
          } else {
            throw new Error(
              'Armazenamento local cheio. Considere remover alguns clientes para liberar espaço.',
            )
          }
        } else {
          throw quotaError
        }
      }

      return this._mapToEntity(clienteJSON)
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      throw new Error(error.message || 'Erro ao salvar cliente')
    }
  }

  // Exclui um cliente
  async delete(id) {
    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      const filteredClientes = clientes.filter((c) => c.id !== id)
      localStorage.setItem('clientes', JSON.stringify(filteredClientes))
    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
      throw new Error('Erro ao excluir cliente')
    }
  }
}

// Exporta uma única instância do repositório
export default new ClienteRepository()
