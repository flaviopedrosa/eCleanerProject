import { gerarGuid } from '../utils/guid'
import { ColaboradorEquipe } from '../value-objects/colaboradorEquipe'
import { FuncaoColaborador } from '../enums/funcaoColaborador'

/**
 * Classe que representa uma equipe de trabalho
 */
export class Equipe {
  /**
   * @param {string} descricao - A descrição/nome da equipe
   * @param {ColaboradorEquipe[]} colaboradores - Lista de colaboradores da equipe
   * @param {string} observacoes - Observações ou notas sobre a equipe (HTML)
   * @param {string} cor - Cor da equipe em formato hexadecimal (ex: #1976D2)
   */
  constructor(descricao, colaboradores = [], observacoes = '', cor = '') {
    if (!descricao) {
      throw new Error('Descrição da equipe é obrigatória')
    }

    this.Id = gerarGuid()
    this.Descricao = descricao
    this.Observacoes = observacoes
    this.Cor = cor
    this.Colaboradores = colaboradores

    // Valida se há pelo menos um líder na equipe
    this.validarLider()
  }

  /**
   * Adiciona um colaborador à equipe
   * @param {import('../entities/colaborador').Colaborador} colaborador - O colaborador a ser adicionado
   * @param {string} funcao - A função do colaborador na equipe (usar FuncaoColaborador enum)
   */
  adicionarColaborador(colaborador, funcao) {
    // Verifica se o colaborador já existe na equipe
    const colaboradorExistente = this.Colaboradores.find((c) => c.Colaborador.Id === colaborador.Id)

    if (colaboradorExistente) {
      throw new Error('Colaborador já faz parte da equipe')
    }

    // Se for adicionar um líder, verifica se já existe um
    if (funcao === FuncaoColaborador.LIDER && this.temLider()) {
      throw new Error('Equipe já possui um líder')
    }

    this.Colaboradores.push(new ColaboradorEquipe(colaborador, funcao))
  }

  /**
   * Remove um colaborador da equipe
   * @param {string} colaboradorId - O ID do colaborador a ser removido
   */
  removerColaborador(colaboradorId) {
    const index = this.Colaboradores.findIndex((c) => c.Colaborador.Id === colaboradorId)

    if (index === -1) {
      throw new Error('Colaborador não encontrado na equipe')
    }

    // Se for remover o líder, verifica se há outros colaboradores
    if (
      this.Colaboradores[index].Funcao === FuncaoColaborador.LIDER &&
      this.Colaboradores.length > 1
    ) {
      throw new Error(
        'Não é possível remover o líder enquanto houver outros colaboradores na equipe',
      )
    }

    this.Colaboradores.splice(index, 1)
  }

  /**
   * Verifica se a equipe tem um líder
   * @returns {boolean} true se a equipe tem um líder, false caso contrário
   */
  temLider() {
    return this.Colaboradores.some((c) => c.Funcao === FuncaoColaborador.LIDER)
  }

  /**
   * Valida se há pelo menos um líder na equipe quando há mais de um colaborador
   */
  validarLider() {
    if (this.Colaboradores.length > 0 && !this.temLider()) {
      throw new Error('Equipe deve ter pelo menos um líder')
    }
  }

  /**
   * Altera a função de um colaborador na equipe
   * @param {string} colaboradorId - O ID do colaborador
   * @param {string} novaFuncao - A nova função do colaborador (usar FuncaoColaborador enum)
   */
  alterarFuncaoColaborador(colaboradorId, novaFuncao) {
    const colaborador = this.Colaboradores.find((c) => c.Colaborador.Id === colaboradorId)

    if (!colaborador) {
      throw new Error('Colaborador não encontrado na equipe')
    }

    // Se estiver alterando para líder, verifica se já existe um
    if (novaFuncao === FuncaoColaborador.LIDER && this.temLider()) {
      throw new Error('Equipe já possui um líder')
    }

    // Se estiver removendo o líder, verifica se há outros colaboradores
    if (
      colaborador.Funcao === FuncaoColaborador.LIDER &&
      novaFuncao !== FuncaoColaborador.LIDER &&
      this.Colaboradores.length > 1
    ) {
      throw new Error(
        'Não é possível remover o líder enquanto houver outros colaboradores na equipe',
      )
    }

    colaborador.Funcao = novaFuncao
  }
}
