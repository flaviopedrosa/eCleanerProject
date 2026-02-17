import { g as gerarGuid } from "./guid-BHuXRmln.js";
class Endereco {
  /**
   * @param {string} descricao - Descri\u00e7\u00e3o do endere\u00e7o (ex: "Casa", "Trabalho").
   * @param {string} logradouro - O nome da rua, avenida, etc.
   * @param {string} numero - O n\u00famero do im\u00f3vel.
   * @param {string} cep - O C\u00f3digo de Endere\u00e7amento Postal.
   * @param {string} bairro - O bairro.
   * @param {string} cidade - A cidade.
   * @param {string} estado - O estado.
   * @param {string} pais - O pa\u00eds.
   */
  constructor(descricao, logradouro, numero, cep, bairro, cidade, estado, pais, complemento = "") {
    this.Id = gerarGuid();
    this.Descricao = descricao;
    this.Logradouro = logradouro;
    this.Numero = numero;
    this.Cep = cep;
    this.Bairro = bairro;
    this.Cidade = cidade;
    this.Estado = estado;
    this.Pais = pais;
    this.Complemento = complemento;
  }
}
class Pessoa {
  /**
   * @param {string} nome - O primeiro nome da pessoa.
   * @param {string} sobrenome - O sobrenome da pessoa.
   * @param {string} email - O email da pessoa.
   * @param {string} telefone - O telefone de contato.
   * @param {string} celular - O número de celular.
   */
  constructor(nome, sobrenome, email, telefone, celular) {
    this.Id = gerarGuid();
    if (!this.validarEmail(email)) {
      throw new Error("E-mail inválido");
    }
    this.Nome = nome;
    this.Sobrenome = sobrenome;
    this.Email = email;
    this.Telefone = telefone;
    this.Celular = celular;
    this.Foto = null;
    this.Endereco = null;
  }
  /**
   * Define o endereço da pessoa.
   * @param {Endereco} endereco - A instância da classe Endereco a ser definida.
   */
  definirEndereco(endereco) {
    if (endereco instanceof Endereco) {
      this.Endereco = endereco;
    } else {
      console.error("O objeto fornecido não é uma instância da classe Endereco.");
    }
  }
  /**
   * Remove o endereço da pessoa.
   */
  removerEndereco() {
    this.Endereco = null;
  }
  /**
   * Define a foto da pessoa.
   * @param {string} foto - A foto em formato base64 ou URL.
   */
  definirFoto(foto) {
    this.Foto = foto;
  }
  /**
   * Remove a foto da pessoa.
   */
  removerFoto() {
    this.Foto = null;
  }
  /**
   * @deprecated Use definirEndereco() em vez disso
   * Adiciona um novo endereço (mantido para compatibilidade).
   * @param {Endereco} endereco - A instância da classe Endereco a ser adicionada.
   */
  adicionarEndereco(endereco) {
    this.definirEndereco(endereco);
  }
  /**
   * Valida o formato do e-mail
   * @param {string} email - O e-mail a ser validado
   * @returns {boolean} true se o e-mail é válido, false caso contrário
   */
  validarEmail(email) {
    if (!email || typeof email !== "string") return false;
    email = email.trim();
    if (email.length > 254) return false;
    if ((email.match(/@/g) || []).length !== 1) return false;
    const [localPart, domain] = email.split("@");
    if (!localPart || localPart.length > 64) return false;
    if (email.includes("..")) return false;
    if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
    const localPartRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
    if (!localPartRegex.test(localPart)) return false;
    if (!domain) return false;
    if (!domain.includes(".") || domain.endsWith(".")) return false;
    const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
    if (!domainRegex.test(domain)) return false;
    const tld = domain.split(".").pop();
    if (tld.length < 2) return false;
    return true;
  }
}
export {
  Endereco as E,
  Pessoa as P
};
//# sourceMappingURL=pessoa-C98XhDqr.js.map
