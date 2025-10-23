import { g as gerarGuid } from "./guid-BHuXRmln.js";
class Servico {
  /**
   * @param {string} nome - Nome do serviço.
   * @param {string} descricao - Descrição detalhada do serviço prestado.
   * @param {number} valor - O valor monetário do serviço.
   * @param {string} unidade - A unidade de medida do serviço (ex: "Hora", "Metro Quadrado", "Unidade", "Projeto").
   * @param {string} observacao - Quaisquer notas ou observações adicionais sobre o serviço.
   */
  constructor(nome, descricao, valor, unidade = "Unidade", observacao = "") {
    this.Id = gerarGuid();
    this.Nome = nome;
    this.Descricao = descricao;
    this.Valor = valor;
    this.Unidade = unidade;
    this.Observacao = observacao;
    this.Ativo = true;
    this.CriadoEm = (/* @__PURE__ */ new Date()).toISOString();
    this.AtualizadoEm = (/* @__PURE__ */ new Date()).toISOString();
  }
  /**
   * Valida se o serviço está válido
   */
  isValid() {
    const erros = [];
    if (!this.Nome || this.Nome.trim().length < 3) {
      erros.push("Nome deve ter pelo menos 3 caracteres");
    }
    if (this.Valor <= 0) {
      erros.push("Valor deve ser maior que zero");
    }
    if (!this.Descricao || this.Descricao.trim().length < 10) {
      erros.push("Descrição deve ter pelo menos 10 caracteres");
    }
    return {
      valido: erros.length === 0,
      erros
    };
  }
  /**
   * Calcula o valor com desconto
   */
  calcularValorComDesconto(percentualDesconto = 0) {
    if (percentualDesconto < 0 || percentualDesconto > 100) {
      throw new Error("Percentual de desconto deve estar entre 0 e 100");
    }
    const desconto = this.Valor * percentualDesconto / 100;
    return this.Valor - desconto;
  }
  /**
   * Atualiza o timestamp de modificação
   */
  marcarComoAtualizado() {
    this.AtualizadoEm = (/* @__PURE__ */ new Date()).toISOString();
  }
  /**
   * Converte para objeto simples (para JSON)
   */
  toJSON() {
    return {
      Id: this.Id,
      Nome: this.Nome,
      Descricao: this.Descricao,
      Valor: this.Valor,
      Unidade: this.Unidade,
      Observacao: this.Observacao,
      Ativo: this.Ativo,
      CriadoEm: this.CriadoEm,
      AtualizadoEm: this.AtualizadoEm
    };
  }
}
export {
  Servico as S
};
//# sourceMappingURL=servico-Bx3u9W9d.js.map
