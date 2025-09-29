import { Equipe } from '../../domain/entities/equipe'
import { Colaborador } from '../../domain/entities/colaborador'
import { ColaboradorEquipe } from '../../domain/value-objects/colaboradorEquipe'
import { equipeSeeds } from './seeds/equipe'

class EquipeRepository {
  constructor() {
    // Inicializa o array de equipes no localStorage se não existir
    if (!localStorage.getItem('equipes')) {
      localStorage.setItem('equipes', JSON.stringify([]))
    }
  }

  // Converte um objeto JSON em uma entidade Equipe
  _mapToEntity(data) {
    if (!data) return null

    // Mapeia os colaboradores da equipe
    const colaboradores = data.Colaboradores.map((col) => {
      // Cria a instância do Colaborador com valores padrão para campos obrigatórios
      const colaborador = new Colaborador(
        col.Colaborador.Nome,
        col.Colaborador.Sobrenome,
        col.Colaborador.Email,
        col.Colaborador.Telefone,
        col.Colaborador.Celular,
        col.Colaborador.DocumentoIdentidade || 'DOC-TEMP-' + Date.now(), // Valor temporário
        col.Colaborador.DataNascimento ? new Date(col.Colaborador.DataNascimento) : new Date(), // Data atual como padrão
        col.Colaborador.Nacionalidade || 'Brasileira', // Valor padrão
        col.Colaborador.SalarioEsperado || 2000, // Valor padrão mínimo
        col.Colaborador.Disponibilidade || 'Integral', // Valor padrão
        col.Colaborador.RegioesAtuacao || [], // Array vazio como padrão
        col.Colaborador.Observacoes || '', // String vazia como padrão
      )

      // Restaura o ID original do colaborador
      colaborador.Id = col.Colaborador.Id

      // Retorna uma nova instância de ColaboradorEquipe
      return new ColaboradorEquipe(colaborador, col.Funcao)
    })

    // Cria uma nova instância de Equipe
    const equipe = new Equipe(data.Descricao, colaboradores, data.Observacoes || '')

    // Restaura o ID original da equipe
    equipe.Id = data.Id

    return equipe
  }

  // Converte uma entidade Equipe em um objeto JSON para armazenamento
  _mapToJSON(equipe) {
    if (!equipe) return null

    return {
      Id: equipe.Id,
      Descricao: equipe.Descricao,
      Observacoes: equipe.Observacoes,
      Colaboradores: equipe.Colaboradores.map((col) => ({
        Funcao: col.Funcao,
        Colaborador: {
          Id: col.Colaborador.Id,
          Nome: col.Colaborador.Nome,
          Sobrenome: col.Colaborador.Sobrenome,
          Email: col.Colaborador.Email,
          Telefone: col.Colaborador.Telefone,
          Celular: col.Colaborador.Celular,
          DocumentoIdentidade: col.Colaborador.DocumentoIdentidade,
          DataNascimento: col.Colaborador.DataNascimento,
          Nacionalidade: col.Colaborador.Nacionalidade,
          SalarioEsperado: col.Colaborador.SalarioEsperado,
          Disponibilidade: col.Colaborador.Disponibilidade,
          RegioesAtuacao: col.Colaborador.RegioesAtuacao,
          Observacoes: col.Colaborador.Observacoes,
        },
      })),
    }
  }

  // Lista todas as equipes
  async getAll() {
    try {
      const equipes = JSON.parse(localStorage.getItem('equipes') || '[]')
      return equipes.map((data) => this._mapToEntity(data))
    } catch (error) {
      console.error('Erro ao buscar equipes:', error)
      throw new Error('Erro ao buscar equipes')
    }
  }

  // Busca uma equipe por ID
  async getById(id) {
    try {
      const equipes = JSON.parse(localStorage.getItem('equipes') || '[]')
      const equipe = equipes.find((e) => e.Id === id)
      return this._mapToEntity(equipe)
    } catch (error) {
      console.error('Erro ao buscar equipe:', error)
      throw new Error('Erro ao buscar equipe')
    }
  }

  // Salva uma nova equipe ou atualiza uma existente
  async save(equipe) {
    try {
      const equipes = JSON.parse(localStorage.getItem('equipes') || '[]')
      const equipeJSON = this._mapToJSON(equipe)

      const index = equipes.findIndex((e) => e.Id === equipeJSON.Id)
      if (index >= 0) {
        // Atualiza equipe existente
        equipes[index] = equipeJSON
      } else {
        // Adiciona nova equipe
        equipes.push(equipeJSON)
      }

      localStorage.setItem('equipes', JSON.stringify(equipes))
      return this._mapToEntity(equipeJSON)
    } catch (error) {
      console.error('Erro ao salvar equipe:', error)
      throw new Error('Erro ao salvar equipe')
    }
  }

  // Exclui uma equipe
  async delete(id) {
    try {
      const equipes = JSON.parse(localStorage.getItem('equipes') || '[]')
      const filteredEquipes = equipes.filter((e) => e.Id !== id)
      localStorage.setItem('equipes', JSON.stringify(filteredEquipes))
    } catch (error) {
      console.error('Erro ao excluir equipe:', error)
      throw new Error('Erro ao excluir equipe')
    }
  }

  // Adiciona um colaborador a uma equipe
  async adicionarColaborador(equipeId, colaborador, funcao) {
    try {
      const equipe = await this.getById(equipeId)
      if (!equipe) {
        throw new Error('Equipe não encontrada')
      }

      equipe.adicionarColaborador(colaborador, funcao)
      return await this.save(equipe)
    } catch (error) {
      console.error('Erro ao adicionar colaborador à equipe:', error)
      throw error
    }
  }

  // Remove um colaborador de uma equipe
  async removerColaborador(equipeId, colaboradorId) {
    try {
      const equipe = await this.getById(equipeId)
      if (!equipe) {
        throw new Error('Equipe não encontrada')
      }

      equipe.removerColaborador(colaboradorId)
      return await this.save(equipe)
    } catch (error) {
      console.error('Erro ao remover colaborador da equipe:', error)
      throw error
    }
  }

  // Altera a função de um colaborador na equipe
  async alterarFuncaoColaborador(equipeId, colaboradorId, novaFuncao) {
    try {
      const equipe = await this.getById(equipeId)
      if (!equipe) {
        throw new Error('Equipe não encontrada')
      }

      equipe.alterarFuncaoColaborador(colaboradorId, novaFuncao)
      return await this.save(equipe)
    } catch (error) {
      console.error('Erro ao alterar função do colaborador:', error)
      throw error
    }
  }

  // Carrega dados de teste
  async loadTestData() {
    try {
      localStorage.setItem('equipes', JSON.stringify(equipeSeeds.map((e) => this._mapToJSON(e))))
      return await this.getAll()
    } catch (error) {
      console.error('Erro ao carregar dados de teste:', error)
      throw new Error('Erro ao carregar dados de teste')
    }
  }
}

// Exporta uma única instância do repositório
export default new EquipeRepository()
