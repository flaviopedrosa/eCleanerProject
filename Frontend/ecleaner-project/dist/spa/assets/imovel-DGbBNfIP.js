import { P as Pessoa, E as Endereco } from "./pessoa-CnZ4y1f1.js";
import { g as gerarGuid } from "./guid-BHuXRmln.js";
const PreferenciaContato = {
  WHATSAPP: "WHATSAPP"
};
class Avaliacao {
  /**
   * @param {number} nota - Nota de 0 a 5
   * @param {string} comentario - Coment\u00e1rio da avalia\u00e7\u00e3o
   * @param {Date} data - Data da avalia\u00e7\u00e3o
   */
  constructor(nota, comentario, data = /* @__PURE__ */ new Date()) {
    if (nota < 0 || nota > 5) {
      throw new Error("A nota deve estar entre 0 e 5");
    }
    this.Nota = nota;
    this.Comentario = comentario;
    this.Data = data;
  }
}
class Cliente extends Pessoa {
  /**
   * @param {string} nome - Nome do cliente
   * @param {string} sobrenome - Sobrenome do cliente
   * @param {string} email - Email do cliente
   * @param {string} celular - N\u00famero do celular
   * @param {string} telefone - N\u00famero do telefone residencial
   * @param {PreferenciaContato} preferenciaContato - Prefer\u00eancia de contato
   * @param {string} observacoes - Observa\u00e7\u00f5es gerais sobre o cliente
   */
  constructor(nome, sobrenome, email, celular, telefone, preferenciaContato = PreferenciaContato.WHATSAPP, observacoes = "") {
    super(nome, sobrenome, email, telefone, celular);
    this.PreferenciaContato = preferenciaContato;
    this.Observacoes = observacoes;
    this.Avaliacoes = [];
    this.Imoveis = [];
  }
  /**
   * Adiciona uma avalia\u00e7\u00e3o \u00e0 lista de avalia\u00e7\u00f5es do cliente
   * @param {Avaliacao} avaliacao - A avalia\u00e7\u00e3o a ser adicionada
   */
  adicionarAvaliacao(avaliacao) {
    if (!(avaliacao instanceof Avaliacao)) {
      throw new Error("A avaliação fornecida não é uma instância válida da classe Avaliacao");
    }
    this.Avaliacoes.push(avaliacao);
  }
  /**
   * Adiciona um imóvel à lista de imóveis do cliente
   * @param {*} imovel - O imóvel a ser adicionado
   */
  adicionarImovel(imovel) {
    if (!imovel || !imovel.Id) {
      throw new Error("O imóvel fornecido não é válido");
    }
    this.Imoveis.push(imovel);
  }
  /**
   * Calcula a m\u00e9dia das avalia\u00e7\u00f5es do cliente
   * @returns {number} A m\u00e9dia das avalia\u00e7\u00f5es ou 0 se n\u00e3o houver avalia\u00e7\u00f5es
   */
  calcularMediaAvaliacoes() {
    if (this.Avaliacoes.length === 0) {
      return 0;
    }
    const somaNotas = this.Avaliacoes.reduce((total, avaliacao) => total + avaliacao.Nota, 0);
    return somaNotas / this.Avaliacoes.length;
  }
  /**
   * Retorna o nome completo do cliente
   * @returns {string} O nome completo (nome + sobrenome)
   */
  get NomeCompleto() {
    return `${this.Nome} ${this.Sobrenome}`;
  }
}
class Imovel {
  /**
   * @param {number} totalComodos - Número total de cômodos do imóvel
   * @param {number} numeroQuartos - Número de quartos
   * @param {number} numeroBanheiros - Número de banheiros
   * @param {number} areaTotal - Área total do imóvel em metros quadrados
   * @param {Endereco} endereco - Endereço do imóvel
   * @param {Pessoa} dono - Dono do imóvel
   * @param {string} observacao - Observações adicionais sobre o imóvel
   */
  constructor(totalComodos, numeroQuartos, numeroBanheiros, areaTotal, endereco, dono, observacao = "") {
    this.Id = gerarGuid();
    this.TotalComodos = totalComodos;
    this.NumeroQuartos = numeroQuartos;
    this.NumeroBanheiros = numeroBanheiros;
    this.AreaTotal = areaTotal;
    this.Responsaveis = [];
    if (!(dono instanceof Pessoa)) {
      throw new Error("O dono fornecido não é uma instância válida da classe Pessoa");
    }
    if (!(endereco instanceof Endereco)) {
      throw new Error("O endereço fornecido não é uma instância válida da classe Endereco");
    }
    this.Dono = dono;
    this.Endereco = endereco;
    this.Observacao = observacao;
  }
  /**
   * Retorna o número de outros cômodos (exceto quartos e banheiros)
   * @returns {number} O número de outros cômodos
   */
  get NumeroOutrosComodos() {
    return this.TotalComodos - this.NumeroQuartos - this.NumeroBanheiros;
  }
  /**
   * Atualiza o endereço do imóvel
   * @param {Endereco} novoEndereco - O novo endereço do imóvel
   */
  atualizarEndereco(novoEndereco) {
    if (!(novoEndereco instanceof Endereco)) {
      throw new Error("O endereço fornecido não é uma instância válida da classe Endereco");
    }
    this.Endereco = novoEndereco;
  }
  /**
   * Adiciona um responsável à lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser adicionada como responsável
   */
  adicionarResponsavel(responsavel) {
    if (!(responsavel instanceof Pessoa)) {
      throw new Error("O responsável fornecido não é uma instância válida da classe Pessoa");
    }
    if (!this.Responsaveis.includes(responsavel)) {
      this.Responsaveis.push(responsavel);
    }
  }
  /**
   * Remove um responsável da lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser removida da lista de responsáveis
   */
  removerResponsavel(responsavel) {
    const index = this.Responsaveis.indexOf(responsavel);
    if (index > -1) {
      this.Responsaveis.splice(index, 1);
    }
  }
  /**
   * Altera o dono do imóvel
   * @param {Pessoa} novoDono - O novo dono do imóvel
   */
  alterarDono(novoDono) {
    if (!(novoDono instanceof Pessoa)) {
      throw new Error("O dono fornecido não é uma instância válida da classe Pessoa");
    }
    this.Dono = novoDono;
  }
}
export {
  Cliente as C,
  Imovel as I
};
//# sourceMappingURL=imovel-DGbBNfIP.js.map
