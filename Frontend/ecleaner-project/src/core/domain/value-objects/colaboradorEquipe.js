/**
 * Classe que representa um colaborador dentro de uma equipe e sua função
 */
export class ColaboradorEquipe {
  /**
   * @param {import('../entities/colaborador').Colaborador} colaborador - O colaborador
   * @param {string} funcao - A função do colaborador na equipe (usar FuncaoColaborador enum)
   */
  constructor(colaborador, funcao) {
    if (!colaborador) {
      throw new Error('Colaborador é obrigatório')
    }

    if (!funcao) {
      throw new Error('Função é obrigatória')
    }

    this.Colaborador = colaborador
    this.Funcao = funcao
  }
}
