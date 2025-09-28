import { gerarGuid } from '../utils/guid'
import { Endereco } from './endereco'
import { Pessoa } from './pessoa'

/**
 * Classe que representa um Imóvel.
 */
export class Imovel {
  /**
   * @param {number} totalComodos - Número total de cômodos do imóvel
   * @param {number} numeroQuartos - Número de quartos
   * @param {number} numeroBanheiros - Número de banheiros
   * @param {number} areaTotal - Área total do imóvel em metros quadrados
   * @param {Endereco} endereco - Endereço do imóvel
   * @param {Pessoa} dono - Dono do imóvel
   * @param {string} observacao - Observações adicionais sobre o imóvel
   */
  constructor(
    totalComodos,
    numeroQuartos,
    numeroBanheiros,
    areaTotal,
    endereco,
    dono,
    observacao = '',
  ) {
    this.Id = gerarGuid()
    this.TotalComodos = totalComodos
    this.NumeroQuartos = numeroQuartos
    this.NumeroBanheiros = numeroBanheiros
    this.AreaTotal = areaTotal
    this.Responsaveis = []

    if (!(dono instanceof Pessoa)) {
      throw new Error('O dono fornecido não é uma instância válida da classe Pessoa')
    }

    if (!(endereco instanceof Endereco)) {
      throw new Error('O endereço fornecido não é uma instância válida da classe Endereco')
    }

    this.Dono = dono
    this.Endereco = endereco
    this.Observacao = observacao
  }

  /**
   * Retorna o número de outros cômodos (exceto quartos e banheiros)
   * @returns {number} O número de outros cômodos
   */
  get NumeroOutrosComodos() {
    return this.TotalComodos - this.NumeroQuartos - this.NumeroBanheiros
  }

  /**
   * Atualiza o endereço do imóvel
   * @param {Endereco} novoEndereco - O novo endereço do imóvel
   */
  atualizarEndereco(novoEndereco) {
    if (!(novoEndereco instanceof Endereco)) {
      throw new Error('O endereço fornecido não é uma instância válida da classe Endereco')
    }
    this.Endereco = novoEndereco
  }

  /**
   * Adiciona um responsável à lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser adicionada como responsável
   */
  adicionarResponsavel(responsavel) {
    if (!(responsavel instanceof Pessoa)) {
      throw new Error('O responsável fornecido não é uma instância válida da classe Pessoa')
    }
    if (!this.Responsaveis.includes(responsavel)) {
      this.Responsaveis.push(responsavel)
    }
  }

  /**
   * Remove um responsável da lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser removida da lista de responsáveis
   */
  removerResponsavel(responsavel) {
    const index = this.Responsaveis.indexOf(responsavel)
    if (index > -1) {
      this.Responsaveis.splice(index, 1)
    }
  }

  /**
   * Altera o dono do imóvel
   * @param {Pessoa} novoDono - O novo dono do imóvel
   */
  alterarDono(novoDono) {
    if (!(novoDono instanceof Pessoa)) {
      throw new Error('O dono fornecido não é uma instância válida da classe Pessoa')
    }
    this.Dono = novoDono
  }
}
