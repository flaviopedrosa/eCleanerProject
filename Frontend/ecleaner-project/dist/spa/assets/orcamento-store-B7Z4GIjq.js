import { aO as defineStore } from "./index-C_9ZqZx5.js";
import { g as gerarGuid } from "./guid-BHuXRmln.js";
import { C as Cliente, I as Imovel } from "./imovel-DC67hqHE.js";
import { P as PacoteServico } from "./pacoteServico-CHT6QKBY.js";
const TipoItemOrcamento = Object.freeze({
  MATERIAL: "MATERIAL",
  SERVICO: "SERVICO",
  EQUIPAMENTO: "EQUIPAMENTO"
});
function validarTipoItem(tipo) {
  return Object.values(TipoItemOrcamento).includes(tipo);
}
class ItemOrcamento {
  /**
   * @param {string} descricao - Descrição do item
   * @param {string} tipo - Tipo do item (MATERIAL ou SERVICO)
   * @param {number} custo - Custo unitário do item
   * @param {number} quantidade - Quantidade do item (padrão: 1)
   * @param {string} unidade - Unidade de medida do item (padrão: 'UN')
   * @param {string} observacoes - Observações adicionais sobre o item
   * @param {number} numero - Número sequencial do item no orçamento
   */
  constructor(descricao, tipo, custo, quantidade = 1, unidade = "UN", observacoes = "", numero = null) {
    if (!descricao || typeof descricao !== "string" || descricao.trim().length === 0) {
      throw new Error("A descrição é obrigatória e deve ser uma string não vazia");
    }
    if (!validarTipoItem(tipo)) {
      throw new Error(
        `Tipo inválido. Deve ser ${TipoItemOrcamento.MATERIAL} ou ${TipoItemOrcamento.SERVICO}`
      );
    }
    const custoNumerico = typeof custo === "number" ? custo : parseFloat(custo) || 0;
    if (custoNumerico < 0) {
      throw new Error("O custo deve ser um número não negativo");
    }
    const quantidadeNumerica = typeof quantidade === "number" ? quantidade : parseFloat(quantidade) || 1;
    if (quantidadeNumerica <= 0) {
      throw new Error("A quantidade deve ser um número maior que zero");
    }
    this.Id = gerarGuid();
    this.Numero = numero;
    this.Descricao = descricao.trim();
    this.Tipo = tipo;
    this.Custo = custoNumerico;
    this.Quantidade = quantidadeNumerica;
    this.Unidade = unidade || "UN";
    this.Observacoes = (observacoes || "").trim();
    this.DataCriacao = /* @__PURE__ */ new Date();
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Calcula o valor total do item (custo × quantidade)
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Custo * this.Quantidade;
  }
  /**
   * Atualiza a descrição do item
   * @param {string} novaDescricao - Nova descrição do item
   */
  atualizarDescricao(novaDescricao) {
    if (!novaDescricao || typeof novaDescricao !== "string" || novaDescricao.trim().length === 0) {
      throw new Error("A descrição é obrigatória e deve ser uma string não vazia");
    }
    this.Descricao = novaDescricao.trim();
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Atualiza o custo do item
   * @param {number} novoCusto - Novo custo unitário do item
   */
  atualizarCusto(novoCusto) {
    const custoNumerico = typeof novoCusto === "number" ? novoCusto : parseFloat(novoCusto) || 0;
    if (custoNumerico < 0) {
      throw new Error("O custo deve ser um número não negativo");
    }
    this.Custo = custoNumerico;
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Atualiza a quantidade do item
   * @param {number} novaQuantidade - Nova quantidade do item
   */
  atualizarQuantidade(novaQuantidade) {
    const quantidadeNumerica = typeof novaQuantidade === "number" ? novaQuantidade : parseFloat(novaQuantidade) || 1;
    if (quantidadeNumerica <= 0) {
      throw new Error("A quantidade deve ser um número maior que zero");
    }
    this.Quantidade = quantidadeNumerica;
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Atualiza as observações do item
   * @param {string} novasObservacoes - Novas observações do item
   */
  atualizarObservacoes(novasObservacoes) {
    this.Observacoes = (novasObservacoes || "").trim();
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Atualiza o número sequencial do item
   * @param {number} novoNumero - Novo número sequencial do item
   */
  atualizarNumero(novoNumero) {
    if (novoNumero !== null && (typeof novoNumero !== "number" || novoNumero <= 0)) {
      throw new Error("O número deve ser um número positivo ou null");
    }
    this.Numero = novoNumero;
    this.DataUltimaAlteracao = /* @__PURE__ */ new Date();
  }
  /**
   * Verifica se o item é do tipo material
   * @returns {boolean} True se for material
   */
  isMaterial() {
    return this.Tipo === TipoItemOrcamento.MATERIAL;
  }
  /**
   * Verifica se o item é do tipo serviço
   * @returns {boolean} True se for serviço
   */
  isServico() {
    return this.Tipo === TipoItemOrcamento.SERVICO;
  }
  /**
   * Retorna uma representação em string do item
   * @returns {string} Representação textual do item
   */
  toString() {
    return `${this.Descricao} (${this.Tipo}) - ${this.Quantidade} ${this.Unidade} × R$ ${this.Custo.toFixed(2)} = R$ ${this.calcularValorTotal().toFixed(2)}`;
  }
  /**
   * Retorna uma cópia simples do objeto para serialização
   * @returns {Object} Objeto simples com as propriedades da entidade
   */
  toJSON() {
    return {
      Id: this.Id,
      Descricao: this.Descricao,
      Tipo: this.Tipo,
      Custo: this.Custo,
      Quantidade: this.Quantidade,
      Unidade: this.Unidade,
      Observacoes: this.Observacoes,
      DataCriacao: this.DataCriacao,
      DataUltimaAlteracao: this.DataUltimaAlteracao,
      ValorTotal: this.calcularValorTotal()
    };
  }
  /**
   * Cria uma instância a partir de um objeto simples
   * @param {Object} obj - Objeto com as propriedades da entidade
   * @returns {ItemOrcamento} Nova instância da entidade
   */
  static fromJSON(obj) {
    const item = new ItemOrcamento(
      obj.Descricao,
      obj.Tipo,
      obj.Custo,
      obj.Quantidade,
      obj.Unidade,
      obj.Observacoes
    );
    if (obj.Id) item.Id = obj.Id;
    if (obj.DataCriacao) item.DataCriacao = new Date(obj.DataCriacao);
    if (obj.DataUltimaAlteracao) item.DataUltimaAlteracao = new Date(obj.DataUltimaAlteracao);
    return item;
  }
}
const StatusOrcamento = {
  /** Orçamento em elaboração */
  RASCUNHO: "RASCUNHO",
  /** Orçamento enviado para o cliente */
  ENVIADO: "ENVIADO",
  /** Orçamento aprovado pelo cliente */
  APROVADO: "APROVADO",
  /** Orçamento recusado pelo cliente */
  RECUSADO: "RECUSADO",
  /** Orçamento expirado (fora do prazo de validade) */
  EXPIRADO: "EXPIRADO",
  /** Orçamento cancelado */
  CANCELADO: "CANCELADO"
};
class Orcamento {
  /**
   * @param {number} numeroOrcamento - Número sequencial do orçamento
   * @param {Cliente} cliente - Cliente para o qual o orçamento está sendo feito
   * @param {Imovel} imovel - Imóvel onde os serviços serão prestados
   * @param {PacoteServico|null} pacoteServico - Pacote de serviço base para o orçamento (pode ser null)
   * @param {string} frequenciaDesejada - Frequência desejada para execução dos serviços
   * @param {number} quantidadeProfissionais - Quantidade sugerida de profissionais
   * @param {number} estimativaHoras - Estimativa de horas necessárias para o serviço
   * @param {number} descontos - Valor dos descontos aplicados
   * @param {number} impostosTaxas - Valor dos impostos e taxas
   * @param {Date} validade - Data limite de validade do orçamento
   */
  constructor(numeroOrcamento, cliente, imovel, pacoteServico, frequenciaDesejada, quantidadeProfissionais, estimativaHoras, descontos = 0, impostosTaxas = 0, validade = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3)) {
    this.Id = gerarGuid();
    this.NumeroOrcamento = numeroOrcamento;
    this.DataEmissao = /* @__PURE__ */ new Date();
    if (!(cliente instanceof Cliente)) {
      throw new Error("O cliente fornecido não é uma instância válida da classe Cliente");
    }
    this.Cliente = cliente;
    if (!(imovel instanceof Imovel)) {
      throw new Error("O imóvel fornecido não é uma instância válida da classe Imovel");
    }
    this.Imovel = imovel;
    this.Itens = [];
    this.definirPacoteServico(pacoteServico);
    this.FrequenciaDesejada = frequenciaDesejada;
    this.QuantidadeProfissionais = quantidadeProfissionais;
    this.EstimativaHoras = estimativaHoras;
    this.Descontos = descontos;
    this.ImpostosTaxas = impostosTaxas;
    this.Validade = validade;
    this.Status = StatusOrcamento.RASCUNHO;
  }
  /**
   * Adiciona um item ao orçamento
   * @param {ItemOrcamento} item - O item de orçamento a ser adicionado
   */
  adicionarItem(item) {
    if (!(item instanceof ItemOrcamento)) {
      throw new Error("O item fornecido não é uma instância válida da classe ItemOrcamento");
    }
    this.Itens.push(item);
  }
  /**
   * Remove um item do orçamento
   * @param {ItemOrcamento} item - O item de orçamento a ser removido
   */
  removerItem(item) {
    const index = this.Itens.indexOf(item);
    if (index > -1) {
      this.Itens.splice(index, 1);
    }
  }
  /**
   * Remove um item do orçamento por ID
   * @param {string} itemId - O ID do item a ser removido
   */
  removerItemPorId(itemId) {
    const index = this.Itens.findIndex((item) => item.Id === itemId);
    if (index > -1) {
      this.Itens.splice(index, 1);
    }
  }
  /**
   * Obtém todos os itens do tipo material
   * @returns {ItemOrcamento[]} Array com os itens de material
   */
  obterItensMaterial() {
    return this.Itens.filter((item) => item.Tipo === TipoItemOrcamento.MATERIAL);
  }
  /**
   * Obtém todos os itens do tipo serviço
   * @returns {ItemOrcamento[]} Array com os itens de serviço
   */
  obterItensServico() {
    return this.Itens.filter((item) => item.Tipo === TipoItemOrcamento.SERVICO);
  }
  /**
   * Busca um item por ID
   * @param {string} itemId - O ID do item a ser buscado
   * @returns {ItemOrcamento|undefined} O item encontrado ou undefined
   */
  buscarItemPorId(itemId) {
    return this.Itens.find((item) => item.Id === itemId);
  }
  /**
   * Calcula o subtotal do orçamento (soma de todos os itens)
   * @returns {number} O valor do subtotal
   */
  get Subtotal() {
    return this.Itens.reduce((total, item) => total + item.calcularValorTotal(), 0);
  }
  /**
   * Calcula o subtotal apenas dos materiais
   * @returns {number} O valor do subtotal dos materiais
   */
  get SubtotalMateriais() {
    return this.obterItensMaterial().reduce((total, item) => total + item.calcularValorTotal(), 0);
  }
  /**
   * Calcula o subtotal apenas dos serviços
   * @returns {number} O valor do subtotal dos serviços
   */
  get SubtotalServicos() {
    return this.obterItensServico().reduce((total, item) => total + item.calcularValorTotal(), 0);
  }
  /**
   * Calcula o valor total do orçamento (subtotal - descontos + impostos)
   * @returns {number} O valor total
   */
  get ValorTotal() {
    return this.Subtotal - this.Descontos + this.ImpostosTaxas;
  }
  /**
   * Verifica se o orçamento está expirado
   * @returns {boolean} true se estiver expirado, false caso contrário
   */
  get EstaExpirado() {
    return /* @__PURE__ */ new Date() > this.Validade;
  }
  /**
   * Atualiza o status do orçamento
   * @param {string} novoStatus - O novo status do orçamento (usar valores do enum StatusOrcamento)
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusOrcamento).includes(novoStatus)) {
      throw new Error("Status inválido");
    }
    this.Status = novoStatus;
  }
  /**
   * Define o pacote de serviço e atualiza os itens com base nele
   * @param {PacoteServico|null} pacoteServico - O pacote de serviço a ser definido ou null
   */
  definirPacoteServico(pacoteServico) {
    if (!pacoteServico) {
      this.Itens = [];
      this.PacoteServico = null;
      return;
    }
    if (!(pacoteServico instanceof PacoteServico)) {
      throw new Error(
        "O pacote de serviço fornecido não é uma instância válida da classe PacoteServico"
      );
    }
    console.log("Definindo pacote de serviço:", pacoteServico.Descricao);
    console.log("ItensMaterial:", pacoteServico.ItensMaterial);
    console.log("ItensServico:", pacoteServico.ItensServico);
    this.Itens = [];
    if (pacoteServico.ItensServico) {
      pacoteServico.ItensServico.forEach((itemServico) => {
        if (!itemServico || !itemServico.Servico) {
          console.warn("Item de serviço inválido encontrado no pacote de serviço:", itemServico);
          return;
        }
        const item = new ItemOrcamento(
          itemServico.Servico.Descricao || "Serviço",
          TipoItemOrcamento.SERVICO,
          itemServico.Servico.CustoUnitario || 0,
          itemServico.Quantidade || 1,
          itemServico.Servico.Unidade || "UN",
          itemServico.Servico.Observacao || ""
        );
        this.adicionarItem(item);
      });
    }
    if (pacoteServico.ItensMaterial) {
      pacoteServico.ItensMaterial.forEach((itemMaterial) => {
        if (!itemMaterial || !itemMaterial.Material) {
          console.warn("Item de material inválido encontrado no pacote de serviço:", itemMaterial);
          return;
        }
        const item = new ItemOrcamento(
          itemMaterial.Material.Descricao || "Material",
          TipoItemOrcamento.MATERIAL,
          itemMaterial.CustoUnitario || 0,
          itemMaterial.Quantidade || 1,
          itemMaterial.Material.Unidade || "UN",
          itemMaterial.Observacao || ""
        );
        this.adicionarItem(item);
      });
    }
    this.PacoteServico = pacoteServico;
  }
}
class OrcamentoRepository {
  constructor() {
    this.storageKey = "ecleaner_orcamentos";
  }
  /**
   * Salva todos os orçamentos
   */
  salvarTodos(orcamentos) {
    const orcamentosJson = orcamentos.map((orcamento) => this._orcamentoToJson(orcamento));
    localStorage.setItem(this.storageKey, JSON.stringify(orcamentosJson));
  }
  /**
   * Busca todos os orçamentos
   */
  buscarTodos() {
    const orcamentosJson = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return orcamentosJson.map((orcamentoData) => this._jsonToOrcamento(orcamentoData));
  }
  /**
   * Busca orçamento por ID
   */
  buscarPorId(id) {
    const orcamentos = this.buscarTodos();
    return orcamentos.find((orcamento) => orcamento.Id === id);
  }
  /**
   * Adiciona um novo orçamento
   */
  adicionar(orcamento) {
    const orcamentos = this.buscarTodos();
    if (!orcamento.Id || orcamento.Id === null) {
      orcamento.Id = this._gerarId();
    }
    const existeOrcamento = orcamentos.find((o) => o.Id === orcamento.Id);
    if (existeOrcamento) {
      throw new Error(`Orçamento com ID ${orcamento.Id} já existe`);
    }
    orcamento.CriadoEm = (/* @__PURE__ */ new Date()).toISOString();
    orcamento.AtualizadoEm = (/* @__PURE__ */ new Date()).toISOString();
    orcamentos.push(orcamento);
    this.salvarTodos(orcamentos);
    return orcamento;
  }
  /**
   * Atualiza um orçamento existente
   */
  atualizar(orcamento) {
    console.log("Repository atualizar - Recebendo orçamento:", orcamento);
    console.log("Repository atualizar - ID do orçamento:", orcamento.Id);
    const orcamentos = this.buscarTodos();
    const indice = orcamentos.findIndex((o) => o.Id === orcamento.Id);
    if (indice === -1) {
      throw new Error(`Orçamento com ID ${orcamento.Id} não encontrado`);
    }
    orcamento.CriadoEm = orcamentos[indice].CriadoEm;
    orcamento.AtualizadoEm = (/* @__PURE__ */ new Date()).toISOString();
    orcamentos[indice] = orcamento;
    this.salvarTodos(orcamentos);
    return orcamento;
  }
  /**
   * Remove um orçamento
   */
  remover(id) {
    const orcamentos = this.buscarTodos();
    const indice = orcamentos.findIndex((o) => o.Id === id);
    if (indice === -1) {
      throw new Error(`Orçamento com ID ${id} não encontrado`);
    }
    const orcamentoRemovido = orcamentos.splice(indice, 1)[0];
    this.salvarTodos(orcamentos);
    return orcamentoRemovido;
  }
  /**
   * Gera um ID único para novos orçamentos
   */
  _gerarId() {
    return `orc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Converte orçamento para JSON serializable
   */
  _orcamentoToJson(orcamento) {
    return {
      Id: orcamento.Id,
      NumeroOrcamento: orcamento.NumeroOrcamento,
      DataEmissao: orcamento.DataEmissao,
      Validade: orcamento.Validade,
      Status: orcamento.Status,
      Cliente: orcamento.Cliente,
      Imovel: orcamento.Imovel,
      PacoteServico: orcamento.PacoteServico,
      Itens: orcamento.Itens || [],
      FrequenciaDesejada: orcamento.FrequenciaDesejada,
      QuantidadeProfissionais: orcamento.QuantidadeProfissionais,
      EstimativaHoras: orcamento.EstimativaHoras,
      Descontos: orcamento.Descontos || 0,
      ImpostosTaxas: orcamento.ImpostosTaxas || 0,
      ValorTotal: orcamento.ValorTotal || 0,
      Observacoes: orcamento.Observacoes || "",
      CriadoEm: orcamento.CriadoEm || (/* @__PURE__ */ new Date()).toISOString(),
      AtualizadoEm: orcamento.AtualizadoEm || (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Converte JSON para instância de Orçamento
   * Nota: Esta é uma versão simplificada que não reconstrói completamente as instâncias
   * das classes relacionadas, mas preserva os dados para exibição
   */
  _jsonToOrcamento(data) {
    return {
      Id: data.Id,
      NumeroOrcamento: data.NumeroOrcamento,
      DataEmissao: data.DataEmissao,
      Validade: data.Validade,
      Status: data.Status,
      Cliente: data.Cliente,
      Imovel: data.Imovel,
      PacoteServico: data.PacoteServico,
      Itens: data.Itens || [],
      FrequenciaDesejada: data.FrequenciaDesejada,
      QuantidadeProfissionais: data.QuantidadeProfissionais,
      EstimativaHoras: data.EstimativaHoras,
      Descontos: data.Descontos || 0,
      ImpostosTaxas: data.ImpostosTaxas || 0,
      ValorTotal: data.ValorTotal || 0,
      Observacoes: data.Observacoes || "",
      CriadoEm: data.CriadoEm,
      AtualizadoEm: data.AtualizadoEm
    };
  }
}
const orcamentoRepository = new OrcamentoRepository();
const useOrcamentoStore = defineStore("orcamento", {
  state: () => ({
    orcamentos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchOrcamentos() {
      this.loading = true;
      try {
        this.orcamentos = orcamentoRepository.buscarTodos();
        this.error = null;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    // Alias para compatibilidade com a página de listagem
    async loadOrcamentos() {
      return this.fetchOrcamentos();
    },
    async addOrcamento(orcamento) {
      this.loading = true;
      try {
        const novoOrcamento = new Orcamento(
          orcamento.NumeroOrcamento,
          orcamento.Cliente,
          orcamento.Imovel,
          null,
          // PacoteServico no construtor = null - será definido como propriedade separada
          orcamento.FrequenciaDesejada,
          orcamento.QuantidadeProfissionais,
          orcamento.EstimativaHoras,
          orcamento.Descontos,
          orcamento.ImpostosTaxas,
          orcamento.Validade
        );
        novoOrcamento.DataEmissao = orcamento.DataEmissao;
        novoOrcamento.Status = orcamento.Status;
        novoOrcamento.Observacoes = orcamento.Observacoes || "";
        if (orcamento.PacoteServico) {
          novoOrcamento.PacoteServico = orcamento.PacoteServico;
        }
        if (orcamento.ItensOrcamento && Array.isArray(orcamento.ItensOrcamento)) {
          console.log("Store addOrcamento - Adicionando itens:", orcamento.ItensOrcamento);
          orcamento.ItensOrcamento.forEach((item) => {
            if (item && typeof item === "object") {
              console.log("Store addOrcamento - Processando item:", item);
              try {
                if (!(item instanceof ItemOrcamento)) {
                  console.log("Store addOrcamento - Criando nova instância de ItemOrcamento");
                  const itemOrcamento = new ItemOrcamento(
                    item.Descricao || item.descricao || "Item",
                    item.Tipo || item.tipo,
                    item.Custo || item.custo || 0,
                    item.Quantidade || item.quantidade || 1,
                    item.Unidade || item.unidade || "UN",
                    item.Observacoes || item.observacoes || "",
                    item.Numero || item.numero
                  );
                  if (item.Id || item.id) {
                    itemOrcamento.Id = item.Id || item.id;
                  }
                  novoOrcamento.adicionarItem(itemOrcamento);
                } else {
                  novoOrcamento.adicionarItem(item);
                }
              } catch (error) {
                console.error("Erro ao adicionar item:", error, item);
              }
            }
          });
        }
        const orcamentoSalvo = orcamentoRepository.adicionar(novoOrcamento);
        this.orcamentos.push(orcamentoSalvo);
        this.error = null;
        return orcamentoSalvo;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async updateOrcamento(orcamento) {
      this.loading = true;
      try {
        console.log("Store updateOrcamento - Recebendo orçamento:", orcamento);
        console.log("Store updateOrcamento - ID do orçamento:", orcamento.Id);
        const orcamentoAtualizado = new Orcamento(
          orcamento.NumeroOrcamento,
          orcamento.Cliente,
          orcamento.Imovel,
          null,
          // PacoteServico no construtor = null - será definido como propriedade separada
          orcamento.FrequenciaDesejada,
          orcamento.QuantidadeProfissionais,
          orcamento.EstimativaHoras,
          orcamento.Descontos,
          orcamento.ImpostosTaxas,
          orcamento.Validade
        );
        orcamentoAtualizado.Id = orcamento.Id;
        console.log(
          "Store updateOrcamento - Copiando ID:",
          orcamento.Id,
          "para orcamentoAtualizado.Id:",
          orcamentoAtualizado.Id
        );
        orcamentoAtualizado.DataEmissao = orcamento.DataEmissao;
        orcamentoAtualizado.Status = orcamento.Status;
        orcamentoAtualizado.Observacoes = orcamento.Observacoes || "";
        if (orcamento.PacoteServico) {
          orcamentoAtualizado.PacoteServico = orcamento.PacoteServico;
        }
        if (orcamento.ItensOrcamento && Array.isArray(orcamento.ItensOrcamento)) {
          console.log("Store updateOrcamento - Atualizando itens:", orcamento.ItensOrcamento);
          orcamento.ItensOrcamento.forEach((item) => {
            if (item && typeof item === "object") {
              console.log("Store updateOrcamento - Processando item:", item);
              try {
                if (!(item instanceof ItemOrcamento)) {
                  console.log("Store updateOrcamento - Criando nova instância de ItemOrcamento");
                  const itemOrcamento = new ItemOrcamento(
                    item.Descricao || item.descricao || "Item",
                    item.Tipo || item.tipo,
                    item.Custo || item.custo || 0,
                    item.Quantidade || item.quantidade || 1,
                    item.Unidade || item.unidade || "UN",
                    item.Observacoes || item.observacoes || "",
                    item.Numero || item.numero
                  );
                  if (item.Id || item.id) {
                    itemOrcamento.Id = item.Id || item.id;
                  }
                  orcamentoAtualizado.adicionarItem(itemOrcamento);
                } else {
                  orcamentoAtualizado.adicionarItem(item);
                }
              } catch (error) {
                console.error("Erro ao adicionar item:", error, item);
              }
            }
          });
        }
        console.log("Store updateOrcamento - Enviando para repository:", orcamentoAtualizado);
        const orcamentoSalvo = orcamentoRepository.atualizar(orcamentoAtualizado);
        const index = this.orcamentos.findIndex((o) => o.Id === orcamento.Id);
        if (index !== -1) {
          this.orcamentos[index] = orcamentoSalvo;
        }
        this.error = null;
        return orcamentoSalvo;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async deleteOrcamento(id) {
      this.loading = true;
      try {
        orcamentoRepository.remover(id);
        this.orcamentos = this.orcamentos.filter((o) => o.Id !== id);
        this.error = null;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async updateStatusOrcamento(id, novoStatus) {
      try {
        const orcamento = this.orcamentos.find((o) => o.Id === id);
        if (orcamento) {
          orcamento.atualizarStatus(novoStatus);
        }
        this.error = null;
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },
    getOrcamentoById(id) {
      let orcamento = this.orcamentos.find((o) => o.Id === id);
      if (!orcamento) {
        orcamento = orcamentoRepository.buscarPorId(id);
      }
      return orcamento;
    },
    getProximoNumero() {
      if (this.orcamentos.length === 0) {
        return 1;
      }
      const ultimoNumero = Math.max(...this.orcamentos.map((o) => o.NumeroOrcamento));
      return ultimoNumero + 1;
    }
  },
  getters: {
    totalOrcamentos: (state) => state.orcamentos.length,
    orcamentosSorted: (state) => {
      return [...state.orcamentos].sort((a, b) => {
        return new Date(b.DataEmissao) - new Date(a.DataEmissao);
      });
    },
    orcamentosPorStatus: (state) => (status) => {
      return state.orcamentos.filter((orcamento) => orcamento.Status === status);
    },
    orcamentosExpirados: (state) => {
      return state.orcamentos.filter((orcamento) => orcamento.EstaExpirado);
    },
    valorTotalOrcamentos: (state) => {
      return state.orcamentos.reduce((total, orcamento) => total + orcamento.ValorTotal, 0);
    },
    estatisticasPorStatus: (state) => {
      const stats = {};
      Object.values(StatusOrcamento).forEach((status) => {
        stats[status] = state.orcamentos.filter((o) => o.Status === status).length;
      });
      return stats;
    }
  }
});
export {
  ItemOrcamento as I,
  StatusOrcamento as S,
  TipoItemOrcamento as T,
  useOrcamentoStore as u
};
//# sourceMappingURL=orcamento-store-B7Z4GIjq.js.map
