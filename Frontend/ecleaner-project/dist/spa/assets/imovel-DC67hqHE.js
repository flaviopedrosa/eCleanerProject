import { P as Pessoa, E as Endereco } from "./pessoa-C98XhDqr.js";
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
   * @param {Array} imagens - Lista de imagens do imóvel
   */
  constructor(totalComodos, numeroQuartos, numeroBanheiros, areaTotal, endereco, dono, observacao = "", imagens = []) {
    this.Id = gerarGuid();
    this.TotalComodos = totalComodos;
    this.NumeroQuartos = numeroQuartos;
    this.NumeroBanheiros = numeroBanheiros;
    this.AreaTotal = areaTotal;
    this.Responsaveis = [];
    this.Imagens = Array.isArray(imagens) ? imagens : [];
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
  /**
   * Adiciona uma imagem à lista de imagens do imóvel
   * @param {string|Object} imagem - URL da imagem ou objeto com dados da imagem
   * @param {string} descricao - Descrição opcional da imagem
   */
  adicionarImagem(imagem, descricao = "") {
    if (!imagem) {
      throw new Error("A imagem é obrigatória");
    }
    const novaImagem = {
      id: gerarGuid(),
      url: typeof imagem === "string" ? imagem : imagem.url || imagem.src,
      nome: typeof imagem === "object" ? imagem.name || imagem.nome : "",
      descricao,
      dataUpload: (/* @__PURE__ */ new Date()).toISOString(),
      tipo: typeof imagem === "object" ? imagem.type || imagem.tipo : "image/jpeg",
      tamanho: typeof imagem === "object" ? imagem.size || imagem.tamanho : null
    };
    this.Imagens.push(novaImagem);
  }
  /**
   * Remove uma imagem da lista de imagens do imóvel
   * @param {string} imagemId - ID da imagem a ser removida
   */
  removerImagem(imagemId) {
    const index = this.Imagens.findIndex((img) => img.id === imagemId);
    if (index > -1) {
      this.Imagens.splice(index, 1);
    }
  }
  /**
   * Atualiza a descrição de uma imagem
   * @param {string} imagemId - ID da imagem
   * @param {string} novaDescricao - Nova descrição da imagem
   */
  atualizarDescricaoImagem(imagemId, novaDescricao) {
    const imagem = this.Imagens.find((img) => img.id === imagemId);
    if (imagem) {
      imagem.descricao = novaDescricao;
    }
  }
  /**
   * Obtém uma imagem pelo ID
   * @param {string} imagemId - ID da imagem
   * @returns {Object|null} A imagem encontrada ou null
   */
  obterImagemPorId(imagemId) {
    return this.Imagens.find((img) => img.id === imagemId) || null;
  }
  /**
   * Obtém todas as imagens do imóvel
   * @returns {Array} Lista de todas as imagens
   */
  obterTodasImagens() {
    return [...this.Imagens];
  }
  /**
   * Verifica se o imóvel possui imagens
   * @returns {boolean} True se possui imagens, false caso contrário
   */
  possuiImagens() {
    return this.Imagens.length > 0;
  }
  /**
   * Obtém o número total de imagens
   * @returns {number} Número total de imagens
   */
  get TotalImagens() {
    return this.Imagens.length;
  }
  /**
   * Obtém a primeira imagem (imagem principal)
   * @returns {Object|null} A primeira imagem ou null se não houver imagens
   */
  get ImagemPrincipal() {
    return this.Imagens.length > 0 ? this.Imagens[0] : null;
  }
}
export {
  Cliente as C,
  Imovel as I
};
//# sourceMappingURL=imovel-DC67hqHE.js.map
