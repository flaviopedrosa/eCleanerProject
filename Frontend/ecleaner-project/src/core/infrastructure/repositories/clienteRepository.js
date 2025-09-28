import { Cliente } from '../../domain/entities/cliente'
import { Endereco } from '../../domain/entities/endereco'

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

    // Adiciona endereços se existirem
    if (data.enderecos) {
      data.enderecos.forEach((e) => {
        cliente.adicionarEndereco(
          new Endereco(e.cep, e.logradouro, e.numero, e.complemento, e.bairro, e.cidade, e.estado),
        )
      })
    }

    cliente.Id = data.id // Preserva o ID original
    return cliente
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
      preferenciaContato: cliente.PreferenciaContato,
      enderecos: cliente.Enderecos.map((e) => ({
        cep: e.CEP,
        logradouro: e.Logradouro,
        numero: e.Numero,
        complemento: e.Complemento,
        bairro: e.Bairro,
        cidade: e.Cidade,
        estado: e.Estado,
      })),
      observacoes: cliente.Observacoes,
    }
  }

  // Lista todos os clientes
  async getAll() {
    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
      return clientes.map((data) => this._mapToEntity(data))
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
      return this._mapToEntity(cliente)
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      throw new Error('Erro ao buscar cliente')
    }
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

      localStorage.setItem('clientes', JSON.stringify(clientes))
      return this._mapToEntity(clienteJSON)
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      throw new Error('Erro ao salvar cliente')
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
