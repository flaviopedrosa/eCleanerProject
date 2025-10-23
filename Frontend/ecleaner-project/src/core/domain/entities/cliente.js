import { Pessoa } from './pessoa'
import { PreferenciaContato } from '../enums/preferenciaContato'
import { Avaliacao } from './avaliacao'

/**
 * Classe que representa um Cliente, estendendo a classe Pessoa.
 */
export class Cliente extends Pessoa {
  /**
   * @param {string} nome - Nome do cliente
   * @param {string} sobrenome - Sobrenome do cliente
   * @param {string} email - Email do cliente
   * @param {string} celular - N\u00famero do celular
   * @param {string} telefone - N\u00famero do telefone residencial
   * @param {PreferenciaContato} preferenciaContato - Prefer\u00eancia de contato
   * @param {string} observacoes - Observa\u00e7\u00f5es gerais sobre o cliente
   */
  constructor(
    nome,
    sobrenome,
    email,
    celular,
    telefone,
    preferenciaContato = PreferenciaContato.WHATSAPP,
    observacoes = '',
  ) {
    super(nome, sobrenome, email, telefone, celular)

    this.PreferenciaContato = preferenciaContato
    this.Observacoes = observacoes
    /** @type {Avaliacao[]} */
    this.Avaliacoes = []
    /** @type {Imovel[]} */
    this.Imoveis = []
  }

  /**
   * Adiciona uma avalia\u00e7\u00e3o \u00e0 lista de avalia\u00e7\u00f5es do cliente
   * @param {Avaliacao} avaliacao - A avalia\u00e7\u00e3o a ser adicionada
   */
  adicionarAvaliacao(avaliacao) {
    if (!(avaliacao instanceof Avaliacao)) {
      throw new Error('A avaliação fornecida não é uma instância válida da classe Avaliacao')
    }
    this.Avaliacoes.push(avaliacao)
  }

  /**
   * Adiciona um imóvel à lista de imóveis do cliente
   * @param {*} imovel - O imóvel a ser adicionado
   */
  adicionarImovel(imovel) {
    // Verificação simples do ID para evitar dependência circular
    if (!imovel || !imovel.Id) {
      throw new Error('O imóvel fornecido não é válido')
    }
    this.Imoveis.push(imovel)
  }

  /**
   * Calcula a m\u00e9dia das avalia\u00e7\u00f5es do cliente
   * @returns {number} A m\u00e9dia das avalia\u00e7\u00f5es ou 0 se n\u00e3o houver avalia\u00e7\u00f5es
   */
  calcularMediaAvaliacoes() {
    if (this.Avaliacoes.length === 0) {
      return 0
    }

    const somaNotas = this.Avaliacoes.reduce((total, avaliacao) => total + avaliacao.Nota, 0)
    return somaNotas / this.Avaliacoes.length
  }

  /**
   * Retorna o nome completo do cliente
   * @returns {string} O nome completo (nome + sobrenome)
   */
  get NomeCompleto() {
    return `${this.Nome} ${this.Sobrenome}`
  }
}
