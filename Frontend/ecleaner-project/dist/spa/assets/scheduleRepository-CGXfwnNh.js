import { P as Pessoa, E as Endereco } from "./pessoa-CnZ4y1f1.js";
import { C as Cliente, I as Imovel } from "./imovel-DGbBNfIP.js";
import { C as Colaborador } from "./colaborador-BV0dUqnP.js";
import { g as gerarGuid } from "./guid-BHuXRmln.js";
const TipoEmpresa = {
  /** Empresa de limpeza */
  LIMPEZA: "LIMPEZA",
  /** Empresa de conservação */
  CONSERVACAO: "CONSERVACAO",
  /** Empresa de limpeza e conservação */
  LIMPEZA_E_CONSERVACAO: "LIMPEZA_E_CONSERVACAO",
  /** Profissional autônomo */
  AUTONOMO: "AUTONOMO",
  /** Outro tipo de empresa */
  OUTRO: "OUTRO"
};
const FormaPagamento = {
  /** Dinheiro em espécie */
  DINHEIRO: "DINHEIRO",
  /** PIX */
  PIX: "PIX",
  /** Cartão de débito */
  CARTAO_DEBITO: "CARTAO_DEBITO",
  /** Cartão de crédito */
  CARTAO_CREDITO: "CARTAO_CREDITO",
  /** Transferência bancária */
  TRANSFERENCIA: "TRANSFERENCIA",
  /** Boleto bancário */
  BOLETO: "BOLETO"
};
class DadosBancarios {
  /**
   * @param {string} banco Nome do banco
   * @param {string} agencia Número da agência
   * @param {string} conta Número da conta
   * @param {string} tipoConta Tipo da conta (corrente/poupança)
   * @param {string} titularConta Nome do titular da conta
   * @param {string} cpfCnpjTitular CPF ou CNPJ do titular
   */
  constructor(banco, agencia, conta, tipoConta, titularConta, cpfCnpjTitular) {
    if (!banco) throw new Error("Banco é obrigatório");
    if (!agencia) throw new Error("Agência é obrigatória");
    if (!conta) throw new Error("Conta é obrigatória");
    if (!tipoConta) throw new Error("Tipo de conta é obrigatório");
    if (!titularConta) throw new Error("Titular da conta é obrigatório");
    if (!cpfCnpjTitular) throw new Error("CPF/CNPJ do titular é obrigatório");
    this.Banco = banco;
    this.Agencia = agencia;
    this.Conta = conta;
    this.TipoConta = tipoConta;
    this.TitularConta = titularConta;
    this.CpfCnpjTitular = cpfCnpjTitular;
  }
}
class Schedule {
  /**
   * @param {Pessoa} responsavel Pessoa responsável pelo Schedule
   * @param {string} nomeEmpresa Nome do Schedule
   * @param {string} documentoEmpresa CNPJ ou CPF do Schedule
   * @param {string} telefoneComercial Telefone comercial
   * @param {string} emailComercial E-mail comercial
   * @param {string} tipoEmpresa Tipo do Schedule (usar TipoEmpresa enum)
   * @param {Object} logomarca Logomarca do Schedule
   * @param {string} logomarca.url URL da imagem
   * @param {string} logomarca.tipo Tipo do arquivo (png, jpg, jpeg, svg)
   * @param {number} logomarca.tamanho Tamanho do arquivo em bytes
   */
  constructor(responsavel, nomeEmpresa, documentoEmpresa, telefoneComercial, emailComercial, tipoEmpresa, logomarca) {
    if (!(responsavel instanceof Pessoa)) {
      throw new Error("Responsável deve ser uma instância de Pessoa");
    }
    if (!nomeEmpresa) {
      throw new Error("Nome do Schedule é obrigatório");
    }
    if (!documentoEmpresa) {
      throw new Error("Documento do Schedule é obrigatório");
    }
    if (!telefoneComercial) {
      throw new Error("Telefone comercial é obrigatório");
    }
    if (!emailComercial) {
      throw new Error("E-mail comercial é obrigatório");
    }
    if (!Object.values(TipoEmpresa).includes(tipoEmpresa)) {
      throw new Error("Tipo de Schedule inválido");
    }
    this.Id = gerarGuid();
    this.Responsavel = responsavel;
    this.NomeEmpresa = nomeEmpresa;
    this.Logomarca = logomarca ? this.validarLogomarca(logomarca) : null;
    this.TipoEmpresa = tipoEmpresa;
    this.DocumentoEmpresa = documentoEmpresa;
    this.TelefoneComercial = telefoneComercial;
    this.EmailComercial = emailComercial;
    this.EnderecoEmpresa = null;
    this.RegioesAtendidas = [];
    this.Clientes = [];
    this.Imoveis = [];
    this.Colaboradores = [];
    this.PoliticaCancelamento = "";
    this.FormasPagamentoAceitas = [];
    this.DadosBancarios = null;
    this.Observacoes = "";
  }
  /**
   * Valida e define a logomarca da empresa
   * @param {Object} logomarca Logomarca da empresa
   * @param {string} logomarca.url URL da imagem
   * @param {string} logomarca.tipo Tipo do arquivo (png, jpg, jpeg, svg)
   * @param {number} logomarca.tamanho Tamanho do arquivo em bytes
   * @returns {Object} Objeto logomarca validado
   * @throws {Error} Se a logomarca for inválida
   */
  validarLogomarca(logomarca) {
    if (!logomarca || !logomarca.url || !logomarca.tipo || !logomarca.tamanho) {
      throw new Error("Logomarca deve conter url, tipo e tamanho");
    }
    const tiposPermitidos = ["png", "jpg", "jpeg", "svg"];
    const tipo = logomarca.tipo.toLowerCase();
    if (!tiposPermitidos.includes(tipo)) {
      throw new Error("Tipo de arquivo inválido. Tipos permitidos: " + tiposPermitidos.join(", "));
    }
    const tamanhoMaximo = 5 * 1024 * 1024;
    if (logomarca.tamanho > tamanhoMaximo) {
      throw new Error("Tamanho do arquivo excede o limite de 5MB");
    }
    return {
      url: logomarca.url,
      tipo,
      tamanho: logomarca.tamanho,
      dataUpload: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Define a logomarca da empresa
   * @param {Object} logomarca Logomarca da empresa
   * @param {string} logomarca.url URL da imagem
   * @param {string} logomarca.tipo Tipo do arquivo (png, jpg, jpeg, svg)
   * @param {number} logomarca.tamanho Tamanho do arquivo em bytes
   */
  definirLogomarca(logomarca) {
    this.Logomarca = this.validarLogomarca(logomarca);
  }
  /**
   * Define o endereço da empresa
   * @param {Endereco} endereco Endereço da empresa
   */
  definirEnderecoEmpresa(endereco) {
    if (!(endereco instanceof Endereco)) {
      throw new Error("Endereço deve ser uma instância de Endereco");
    }
    this.EnderecoEmpresa = endereco;
  }
  /**
   * Adiciona uma região atendida
   * @param {string} regiao Nome/identificação da região
   */
  adicionarRegiaoAtendida(regiao) {
    if (!regiao) {
      throw new Error("Região é obrigatória");
    }
    if (!this.RegioesAtendidas.includes(regiao)) {
      this.RegioesAtendidas.push(regiao);
    }
  }
  /**
   * Remove uma região atendida
   * @param {string} regiao Nome/identificação da região
   */
  removerRegiaoAtendida(regiao) {
    const index = this.RegioesAtendidas.indexOf(regiao);
    if (index > -1) {
      this.RegioesAtendidas.splice(index, 1);
    }
  }
  /**
   * Adiciona um cliente ao Schedule
   * @param {Cliente} cliente Cliente a ser adicionado
   */
  adicionarCliente(cliente) {
    if (!(cliente instanceof Cliente)) {
      throw new Error("Cliente deve ser uma instância de Cliente");
    }
    if (!this.Clientes.some((c) => c.Id === cliente.Id)) {
      this.Clientes.push(cliente);
    }
  }
  /**
   * Remove um cliente do Schedule
   * @param {string} clienteId ID do cliente a ser removido
   */
  removerCliente(clienteId) {
    this.Clientes = this.Clientes.filter((c) => c.Id !== clienteId);
  }
  /**
   * Adiciona um imóvel ao Schedule
   * @param {Imovel} imovel Imóvel a ser adicionado
   */
  adicionarImovel(imovel) {
    if (!(imovel instanceof Imovel)) {
      throw new Error("Imóvel deve ser uma instância de Imovel");
    }
    if (!this.Imoveis.some((i) => i.Id === imovel.Id)) {
      this.Imoveis.push(imovel);
    }
  }
  /**
   * Remove um imóvel do Schedule
   * @param {string} imovelId ID do imóvel a ser removido
   */
  removerImovel(imovelId) {
    this.Imoveis = this.Imoveis.filter((i) => i.Id !== imovelId);
  }
  /**
   * Adiciona um colaborador ao Schedule
   * @param {Colaborador} colaborador Colaborador a ser adicionado
   */
  adicionarColaborador(colaborador) {
    if (!(colaborador instanceof Colaborador)) {
      throw new Error("Colaborador deve ser uma instância de Colaborador");
    }
    if (!this.Colaboradores.some((c) => c.Id === colaborador.Id)) {
      this.Colaboradores.push(colaborador);
    }
  }
  /**
   * Remove um colaborador do Schedule
   * @param {string} colaboradorId ID do colaborador a ser removido
   */
  removerColaborador(colaboradorId) {
    this.Colaboradores = this.Colaboradores.filter((c) => c.Id !== colaboradorId);
  }
  /**
   * Define a política de cancelamento
   * @param {string} politica Texto da política de cancelamento
   */
  definirPoliticaCancelamento(politica) {
    if (!politica) {
      throw new Error("Política de cancelamento é obrigatória");
    }
    this.PoliticaCancelamento = politica;
  }
  /**
   * Adiciona uma forma de pagamento aceita
   * @param {string} formaPagamento Forma de pagamento (usar FormaPagamento enum)
   */
  adicionarFormaPagamento(formaPagamento) {
    if (!Object.values(FormaPagamento).includes(formaPagamento)) {
      throw new Error("Forma de pagamento inválida");
    }
    if (!this.FormasPagamentoAceitas.includes(formaPagamento)) {
      this.FormasPagamentoAceitas.push(formaPagamento);
    }
  }
  /**
   * Remove uma forma de pagamento
   * @param {string} formaPagamento Forma de pagamento a ser removida
   */
  removerFormaPagamento(formaPagamento) {
    const index = this.FormasPagamentoAceitas.indexOf(formaPagamento);
    if (index > -1) {
      this.FormasPagamentoAceitas.splice(index, 1);
    }
  }
  /**
   * Define os dados bancários para recebimento
   * @param {DadosBancarios} dadosBancarios Dados bancários
   */
  definirDadosBancarios(dadosBancarios) {
    if (!(dadosBancarios instanceof DadosBancarios)) {
      throw new Error("Dados bancários devem ser uma instância de DadosBancarios");
    }
    this.DadosBancarios = dadosBancarios;
  }
  /**
   * Retorna a quantidade de funcionários vinculados
   * @returns {number} Quantidade de funcionários
   */
  get QuantidadeFuncionarios() {
    return this.Colaboradores.length;
  }
}
const scheduleSeeds = [
  new Schedule(
    new Pessoa(
      "João",
      "Silva",
      "joao.silva@limpezaexpress.com.br",
      "(11) 3333-4444",
      "(11) 98765-4321"
    ),
    "Limpeza Express LTDA",
    "12.345.678/0001-90",
    "(11) 98765-4321",
    "contato@limpezaexpress.com.br",
    TipoEmpresa.LIMPEZA,
    null
  ),
  new Schedule(
    new Pessoa(
      "Maria",
      "Santos",
      "maria.santos@casaclean.com.br",
      "(11) 2222-3333",
      "(11) 91234-5678"
    ),
    "Casa Clean Serviços",
    "98.765.432/0001-10",
    "(11) 91234-5678",
    "contato@casaclean.com.br",
    TipoEmpresa.LIMPEZA,
    null
  ),
  new Schedule(
    new Pessoa(
      "Pedro",
      "Oliveira",
      "pedro.oliveira@higienetotal.com.br",
      "(11) 4444-5555",
      "(11) 94567-8901"
    ),
    "Higiene Total",
    "45.678.901/0001-23",
    "(11) 94567-8901",
    "contato@higienetotal.com.br",
    TipoEmpresa.LIMPEZA,
    null
  )
];
class ScheduleRepository {
  constructor() {
    if (!localStorage.getItem("schedules")) {
      localStorage.setItem("schedules", JSON.stringify([]));
    }
  }
  // Converte um objeto JSON em uma entidade Schedule
  _mapToEntity(data) {
    if (!data) return null;
    const responsavel = new Pessoa(
      data.Responsavel.Nome,
      data.Responsavel.Sobrenome,
      data.Responsavel.Email || data.EmailComercial,
      // Usa o email comercial como fallback
      data.Responsavel.Telefone || data.TelefoneComercial,
      // Usa o telefone comercial como fallback
      data.Responsavel.Celular || data.TelefoneComercial
      // Usa o telefone comercial como fallback
    );
    let logomarca = data.Logomarca;
    if (logomarca instanceof File || logomarca instanceof Blob) {
      logomarca = URL.createObjectURL(logomarca);
    }
    return new Schedule(
      responsavel,
      data.NomeEmpresa,
      data.DocumentoEmpresa,
      data.TelefoneComercial,
      data.EmailComercial,
      data.TipoEmpresa,
      logomarca
    );
  }
  // Converte uma entidade Schedule em um objeto JSON para armazenamento
  _mapToJSON(schedule) {
    if (!schedule) return null;
    return {
      Id: schedule.Id,
      NomeEmpresa: schedule.NomeEmpresa,
      DocumentoEmpresa: schedule.DocumentoEmpresa,
      TelefoneComercial: schedule.TelefoneComercial,
      EmailComercial: schedule.EmailComercial,
      TipoEmpresa: schedule.TipoEmpresa,
      Logomarca: schedule.Logomarca,
      Responsavel: {
        Id: schedule.Responsavel.Id,
        Nome: schedule.Responsavel.Nome,
        Sobrenome: schedule.Responsavel.Sobrenome,
        Email: schedule.Responsavel.Email,
        Telefone: schedule.Responsavel.Telefone,
        Celular: schedule.Responsavel.Celular
      }
    };
  }
  // Lista todas as schedules
  async getAll() {
    try {
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      return schedules.map((data) => this._mapToEntity(data));
    } catch (error) {
      console.error("Erro ao buscar schedules:", error);
      throw new Error("Erro ao buscar schedules");
    }
  }
  // Busca uma schedule por ID
  async getById(id) {
    try {
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      const schedule = schedules.find((s) => s.id === id);
      return this._mapToEntity(schedule);
    } catch (error) {
      console.error("Erro ao buscar schedule:", error);
      throw new Error("Erro ao buscar schedule");
    }
  }
  // Salva uma nova schedule
  async save(schedule) {
    try {
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      const scheduleJSON = this._mapToJSON(schedule);
      if (!scheduleJSON.id) {
        scheduleJSON.id = crypto.randomUUID();
        schedules.push(scheduleJSON);
      } else {
        const index = schedules.findIndex((s) => s.id === scheduleJSON.id);
        if (index >= 0) {
          schedules[index] = scheduleJSON;
        } else {
          schedules.push(scheduleJSON);
        }
      }
      localStorage.setItem("schedules", JSON.stringify(schedules));
      return this._mapToEntity(scheduleJSON);
    } catch (error) {
      console.error("Erro ao salvar schedule:", error);
      throw new Error("Erro ao salvar schedule");
    }
  }
  // Exclui uma schedule
  async delete(id) {
    try {
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      const filteredSchedules = schedules.filter((s) => s.id !== id);
      localStorage.setItem("schedules", JSON.stringify(filteredSchedules));
    } catch (error) {
      console.error("Erro ao excluir schedule:", error);
      throw new Error("Erro ao excluir schedule");
    }
  }
  // Carrega dados de teste
  async loadTestData() {
    try {
      localStorage.setItem("schedules", JSON.stringify(scheduleSeeds));
      return scheduleSeeds;
    } catch (error) {
      console.error("Erro ao carregar dados de teste:", error);
      throw new Error("Erro ao carregar dados de teste");
    }
  }
}
const scheduleRepository = new ScheduleRepository();
export {
  DadosBancarios as D,
  ScheduleRepository as S,
  TipoEmpresa as T,
  Schedule as a,
  scheduleRepository as s
};
//# sourceMappingURL=scheduleRepository-CGXfwnNh.js.map
