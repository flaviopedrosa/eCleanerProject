import { P as Pessoa, E as Endereco } from "./pessoa-C98XhDqr.js";
import { g as gerarGuid } from "./guid-BHuXRmln.js";
const StatusColaborador = {
  /** Cadastro em análise */
  EM_ANALISE: "EM_ANALISE",
  /** Cadastro aprovado */
  APROVADO: "APROVADO",
  /** Cadastro rejeitado */
  REJEITADO: "REJEITADO",
  /** Colaborador ativo */
  ATIVO: "ATIVO",
  /** Colaborador inativo */
  INATIVO: "INATIVO",
  /** Colaborador em período de experiência */
  EM_EXPERIENCIA: "EM_EXPERIENCIA",
  /** Colaborador desligado */
  DESLIGADO: "DESLIGADO"
};
class Referencia {
  /**
   * @param {string} nome - Nome completo da referência
   * @param {string} telefone - Telefone de contato
   * @param {string} relacao - Relação com o colaborador (ex: ex-chefe, colega de trabalho)
   * @param {string} observacoes - Observações adicionais sobre a referência
   */
  constructor(nome, telefone, relacao, observacoes = "") {
    this.Id = gerarGuid();
    if (!nome || !telefone || !relacao) {
      throw new Error("Nome, telefone e relação são campos obrigatórios");
    }
    this.Nome = nome;
    this.Telefone = telefone;
    this.Relacao = relacao;
    this.Observacoes = observacoes;
  }
}
class ExperienciaProfissional {
  /**
   * @param {string} empresa - Nome da empresa
   * @param {string} cargo - Cargo ocupado
   * @param {Date} dataInicio - Data de início na empresa
   * @param {Date} dataFim - Data de término na empresa (opcional para trabalhos atuais)
   * @param {string} atribuicoes - Descrição das principais atribuições
   * @param {string} motivoSaida - Motivo da saída da empresa
   */
  constructor(empresa, cargo, dataInicio, dataFim, atribuicoes, motivoSaida = "") {
    this.Id = gerarGuid();
    if (!empresa || !cargo || !dataInicio) {
      throw new Error("Empresa, cargo e data de início são campos obrigatórios");
    }
    if (dataFim && dataInicio > dataFim) {
      throw new Error("A data de início não pode ser posterior à data de término");
    }
    this.Empresa = empresa;
    this.Cargo = cargo;
    this.DataInicio = dataInicio;
    this.DataFim = dataFim;
    this.Atribuicoes = atribuicoes;
    this.MotivoSaida = motivoSaida;
  }
  /**
   * Verifica se é o trabalho atual
   * @returns {boolean} true se for o trabalho atual (sem data de término)
   */
  get EhTrabalhoAtual() {
    return !this.DataFim;
  }
  /**
   * Calcula a duração da experiência em meses
   * @returns {number} Duração em meses
   */
  get DuracaoMeses() {
    const fim = this.DataFim || /* @__PURE__ */ new Date();
    const diffTime = Math.abs(fim - this.DataInicio);
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
  }
}
class DocumentoAdicional {
  /**
   * @param {string} tipo - Tipo do documento
   * @param {string} numero - Número/identificador do documento
   * @param {Date} dataEmissao - Data de emissão
   * @param {Date} dataValidade - Data de validade (se aplicável)
   * @param {string} orgaoEmissor - Órgão emissor
   * @param {string} observacoes - Observações sobre o documento
   */
  constructor(tipo, numero, dataEmissao, dataValidade = null, orgaoEmissor = "", observacoes = "") {
    this.Id = gerarGuid();
    if (!tipo || !numero || !dataEmissao) {
      throw new Error("Tipo, número e data de emissão são campos obrigatórios");
    }
    if (dataValidade && dataEmissao > dataValidade) {
      throw new Error("A data de emissão não pode ser posterior à data de validade");
    }
    this.Tipo = tipo;
    this.Numero = numero;
    this.DataEmissao = dataEmissao;
    this.DataValidade = dataValidade;
    this.OrgaoEmissor = orgaoEmissor;
    this.Observacoes = observacoes;
  }
  /**
   * Verifica se o documento está vencido
   * @returns {boolean} true se o documento estiver vencido
   */
  get EstaVencido() {
    if (!this.DataValidade) return false;
    return /* @__PURE__ */ new Date() > this.DataValidade;
  }
}
class Colaborador extends Pessoa {
  /**
   * @param {string} nome - Nome do colaborador
   * @param {string} sobrenome - Sobrenome do colaborador
   * @param {string} email - Email do colaborador
   * @param {string} telefone - Telefone fixo
   * @param {string} celular - Telefone celular
   * @param {string} documentoIdentidade - Número do documento de identidade
   * @param {Date} dataNascimento - Data de nascimento
   * @param {string} nacionalidade - Nacionalidade
   * @param {number} salarioEsperado - Salário esperado em dólar
   * @param {string} disponibilidade - Disponibilidade de horário
   * @param {string[]} regioesAtuacao - Lista de regiões onde pode atuar
   * @param {string} observacoes - Observações gerais
   */
  constructor(nome, sobrenome, email, telefone, celular, documentoIdentidade, dataNascimento, nacionalidade, salarioEsperado, disponibilidade, regioesAtuacao = [], observacoes = "") {
    super(nome, sobrenome, email, telefone, celular);
    if (!documentoIdentidade) {
      throw new Error("Documento de identidade é obrigatório");
    }
    if (!dataNascimento || !(dataNascimento instanceof Date)) {
      throw new Error("Data de nascimento é obrigatória e deve ser uma data válida");
    }
    if (!nacionalidade) {
      throw new Error("Nacionalidade é obrigatória");
    }
    if (!salarioEsperado || salarioEsperado <= 0) {
      throw new Error("Salário esperado deve ser um valor positivo");
    }
    if (!disponibilidade) {
      throw new Error("Disponibilidade é obrigatória");
    }
    this.DocumentoIdentidade = documentoIdentidade;
    this.DataNascimento = dataNascimento;
    this.Nacionalidade = nacionalidade;
    this.FotoPerfil = null;
    this.Curriculo = null;
    this.SalarioEsperado = salarioEsperado;
    this.Disponibilidade = disponibilidade;
    this.RegioesAtuacao = regioesAtuacao;
    this.Observacoes = observacoes;
    this.ExperienciasProfissionais = [];
    this.Referencias = [];
    this.DocumentosAdicionais = [];
    this.Status = StatusColaborador.EM_ANALISE;
    this.DataInicioVinculo = null;
    this.DataFimVinculo = null;
  }
  /**
   * Define o endereço residencial do colaborador
   * @param {Endereco} endereco - O endereço residencial
   */
  definirEnderecoResidencial(endereco) {
    if (!(endereco instanceof Endereco)) {
      throw new Error("O endereço fornecido não é uma instância válida da classe Endereco");
    }
    this.Enderecos = [endereco];
  }
  /**
   * Define a foto de perfil do colaborador
   * @param {string} url - URL ou caminho para a foto
   */
  definirFotoPerfil(url) {
    if (!url) {
      throw new Error("URL da foto é obrigatória");
    }
    this.FotoPerfil = url;
  }
  /**
   * Define o currículo do colaborador
   * @param {string} url - URL ou caminho para o currículo
   */
  definirCurriculo(url) {
    if (!url) {
      throw new Error("URL do currículo é obrigatória");
    }
    this.Curriculo = url;
  }
  /**
   * Adiciona uma experiência profissional ao histórico
   * @param {ExperienciaProfissional} experiencia - A experiência profissional
   */
  adicionarExperienciaProfissional(experiencia) {
    if (!(experiencia instanceof ExperienciaProfissional)) {
      throw new Error(
        "A experiência fornecida não é uma instância válida da classe ExperienciaProfissional"
      );
    }
    this.ExperienciasProfissionais.push(experiencia);
  }
  /**
   * Adiciona uma referência à lista
   * @param {Referencia} referencia - A referência
   */
  adicionarReferencia(referencia) {
    if (!(referencia instanceof Referencia)) {
      throw new Error("A referência fornecida não é uma instância válida da classe Referencia");
    }
    this.Referencias.push(referencia);
  }
  /**
   * Adiciona um documento adicional
   * @param {DocumentoAdicional} documento - O documento
   */
  adicionarDocumento(documento) {
    if (!(documento instanceof DocumentoAdicional)) {
      throw new Error(
        "O documento fornecido não é uma instância válida da classe DocumentoAdicional"
      );
    }
    this.DocumentosAdicionais.push(documento);
  }
  /**
   * Atualiza o status do colaborador
   * @param {string} novoStatus - O novo status (usar valores do enum StatusColaborador)
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusColaborador).includes(novoStatus)) {
      throw new Error("Status inválido");
    }
    this.Status = novoStatus;
  }
  /**
   * Registra o início do vínculo com a empresa
   * @param {Date} data - Data de início
   */
  registrarInicioVinculo(data) {
    if (!(data instanceof Date)) {
      throw new Error("Data inválida");
    }
    this.DataInicioVinculo = data;
    this.atualizarStatus(StatusColaborador.EM_EXPERIENCIA);
  }
  /**
   * Registra o fim do vínculo com a empresa
   * @param {Date} data - Data de término
   */
  registrarFimVinculo(data) {
    if (!(data instanceof Date)) {
      throw new Error("Data inválida");
    }
    if (!this.DataInicioVinculo || data < this.DataInicioVinculo) {
      throw new Error("Data de fim deve ser posterior à data de início");
    }
    this.DataFimVinculo = data;
    this.atualizarStatus(StatusColaborador.DESLIGADO);
  }
  /**
   * Calcula a idade do colaborador
   * @returns {number} A idade em anos
   */
  get Idade() {
    const hoje = /* @__PURE__ */ new Date();
    let idade = hoje.getFullYear() - this.DataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = this.DataNascimento.getMonth();
    if (mesAtual < mesNascimento || mesAtual === mesNascimento && hoje.getDate() < this.DataNascimento.getDate()) {
      idade--;
    }
    return idade;
  }
  /**
   * Calcula o tempo total de experiência profissional em meses
   * @returns {number} Total de meses de experiência
   */
  get TempoTotalExperiencia() {
    return this.ExperienciasProfissionais.reduce((total, exp) => total + exp.DuracaoMeses, 0);
  }
}
export {
  Colaborador as C,
  ExperienciaProfissional as E,
  Referencia as R,
  StatusColaborador as S
};
//# sourceMappingURL=colaborador-OpPhEqDl.js.map
