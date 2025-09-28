/**
 * Classe que representa uma avalia\u00e7\u00e3o feita por um cliente.
 */
export class Avaliacao {
  /**
   * @param {number} nota - Nota de 0 a 5
   * @param {string} comentario - Coment\u00e1rio da avalia\u00e7\u00e3o
   * @param {Date} data - Data da avalia\u00e7\u00e3o
   */
  constructor(nota, comentario, data = new Date()) {
    if (nota < 0 || nota > 5) {
      throw new Error('A nota deve estar entre 0 e 5')
    }

    this.Nota = nota
    this.Comentario = comentario
    this.Data = data
  }
}
