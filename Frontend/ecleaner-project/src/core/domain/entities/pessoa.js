import { gerarGuid } from '../utils/guid'
import { Endereco } from './endereco'

/**
 * Classe que representa uma Pessoa.
 */
export class Pessoa {
  /**
   * @param {string} nome - O primeiro nome da pessoa.
   * @param {string} sobrenome - O sobrenome da pessoa.
   * @param {string} email - O email da pessoa.
   * @param {string} telefone - O telefone de contato.
   * @param {string} celular - O número de celular.
   */
  constructor(nome, sobrenome, email, telefone, celular) {
    this.Id = gerarGuid()

    if (!this.validarEmail(email)) {
      throw new Error('E-mail inválido')
    }

    this.Nome = nome
    this.Sobrenome = sobrenome
    this.Email = email
    this.Telefone = telefone
    this.Celular = celular
    /** @type {Endereco[]} */
    this.Enderecos = []
  }

  /**
   * Adiciona um novo endereço à lista de endereços da pessoa.
   * @param {Endereco} endereco - A instância da classe Endereco a ser adicionada.
   */
  adicionarEndereco(endereco) {
    if (endereco instanceof Endereco) {
      this.Enderecos.push(endereco)
    } else {
      console.error('O objeto fornecido não é uma instância da classe Endereco.')
    }
  }

  /**
   * Valida o formato do e-mail
   * @param {string} email - O e-mail a ser validado
   * @returns {boolean} true se o e-mail é válido, false caso contrário
   */
  validarEmail(email) {
    if (!email || typeof email !== 'string') return false

    // Remove espaços em branco no início e fim
    email = email.trim()

    // Verifica o comprimento total do email (máximo 254 caracteres)
    if (email.length > 254) return false

    // Verifica se tem exatamente um @
    if ((email.match(/@/g) || []).length !== 1) return false

    // Divide o email em local part e domain
    const [localPart, domain] = email.split('@')

    // Verifica o comprimento do local part (máximo 64 caracteres)
    if (!localPart || localPart.length > 64) return false

    // Verifica se não há pontos consecutivos
    if (email.includes('..')) return false

    // Verifica se não começa ou termina com ponto no local part
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false

    // Verifica se os caracteres do local part são válidos
    const localPartRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/
    if (!localPartRegex.test(localPart)) return false

    // Verifica se o domínio não está vazio e tem formato válido
    if (!domain) return false

    // Verifica se o domínio tem pelo menos um ponto e não termina com ponto
    if (!domain.includes('.') || domain.endsWith('.')) return false

    // Regex para validar o formato do domínio
    const domainRegex =
      /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/
    if (!domainRegex.test(domain)) return false

    // Verifica se o TLD tem pelo menos 2 caracteres
    const tld = domain.split('.').pop()
    if (tld.length < 2) return false

    return true
  }
}
