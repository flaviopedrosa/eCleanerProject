/**
 * Classe que representa um colaborador dentro de uma equipe e suas funções
 */
export class ColaboradorEquipe {
  /**
   * @param {import('../entities/colaborador').Colaborador} colaborador - O colaborador
   * @param {string|string[]} funcoes - A função ou funções do colaborador na equipe (usar FuncaoColaborador enum)
   */
  constructor(colaborador, funcoes) {
    if (!colaborador) {
      throw new Error('Colaborador é obrigatório')
    }

    if (!funcoes || (Array.isArray(funcoes) && funcoes.length === 0)) {
      throw new Error('Pelo menos uma função é obrigatória')
    }

    this.Colaborador = colaborador
    // Se receber uma string, converte para array; se já for array, mantém
    this.Funcoes = Array.isArray(funcoes) ? funcoes : [funcoes]

    // Manter compatibilidade com código antigo
    this.Funcao = Array.isArray(funcoes) ? funcoes[0] : funcoes
  }
}
