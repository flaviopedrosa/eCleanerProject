import { g as gerarGuid } from "./guid-BHuXRmln.js";
import { M as Material } from "./material-D-n2u651.js";
import { S as Servico } from "./servico-Bx3u9W9d.js";
import { E as Equipamento } from "./equipamento-DInCJpxH.js";
class ItemMaterial {
  /**
   * @param {Material} material - O material a ser utilizado
   * @param {number} quantidade - A quantidade do material
   * @param {number} custoUnitario - O custo unit\u00e1rio do material
   * @param {string} observacao - Observa\u00e7\u00f5es adicionais sobre o uso do material
   */
  constructor(material, quantidade, custoUnitario, observacao = "") {
    if (!(material instanceof Material)) {
      throw new Error(
        "O material fornecido não é uma instância válida da classe Material"
      );
    }
    if (quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero");
    }
    if (custoUnitario < 0) {
      throw new Error("O custo unitário não pode ser negativo");
    }
    this.Id = gerarGuid();
    this.Material = material;
    this.Quantidade = quantidade;
    this.CustoUnitario = custoUnitario;
    this.Observacao = observacao;
    this.ValorTotal = this.calcularValorTotal();
  }
  /**
   * Calcula o valor total do item baseado na quantidade e custo unit\u00e1rio
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.CustoUnitario;
  }
  /**
   * Atualiza a quantidade do material e recalcula o valor total
   * @param {number} novaQuantidade - Nova quantidade do material
   */
  atualizarQuantidade(novaQuantidade) {
    if (novaQuantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero");
    }
    this.Quantidade = novaQuantidade;
    this.ValorTotal = this.calcularValorTotal();
  }
  /**
   * Atualiza o custo unit\u00e1rio do material e recalcula o valor total
   * @param {number} novoCusto - Novo custo unit\u00e1rio do material
   */
  atualizarCustoUnitario(novoCusto) {
    if (novoCusto < 0) {
      throw new Error("O custo unitário não pode ser negativo");
    }
    this.CustoUnitario = novoCusto;
    this.ValorTotal = this.calcularValorTotal();
  }
}
class ItemServico {
  /**
   * @param {Servico} servico - O servi\u00e7o a ser prestado
   * @param {number} quantidade - A quantidade do servi\u00e7o
   * @param {number} tempoEstimado - Tempo estimado em minutos
   * @param {number} quantidadePessoas - N\u00famero de pessoas necess\u00e1rias
   */
  constructor(servico, quantidade, tempoEstimado, quantidadePessoas) {
    if (!(servico instanceof Servico)) {
      throw new Error(
        "O serviço fornecido não é uma instância válida da classe Servico"
      );
    }
    this.Id = gerarGuid();
    this.Servico = servico;
    this.Quantidade = quantidade;
    this.TempoEstimado = tempoEstimado;
    this.QuantidadePessoas = quantidadePessoas;
    this.ValorTotal = this.calcularValorTotal();
  }
  /**
   * Calcula o valor total do item baseado na quantidade e valor do serviço
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.Servico.Valor;
  }
  /**
   * Calcula o tempo total em horas considerando a quantidade de pessoas
   * @returns {number} Tempo total em horas
   */
  calcularTempoTotalHoras() {
    return this.TempoEstimado / 60 / this.QuantidadePessoas;
  }
}
class ItemEquipamento {
  /**
   * @param {Equipamento} equipamento - O equipamento a ser utilizado
   * @param {number} quantidade - A quantidade do equipamento
   * @param {number} custoUnitario - O custo unitário do equipamento
   * @param {string} observacao - Observações adicionais sobre o uso do equipamento
   */
  constructor(equipamento, quantidade, custoUnitario, observacao = "") {
    if (!(equipamento instanceof Equipamento)) {
      throw new Error("O equipamento fornecido não é uma instância válida da classe Equipamento");
    }
    if (quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero");
    }
    if (custoUnitario < 0) {
      throw new Error("O custo unitário não pode ser negativo");
    }
    this.Id = gerarGuid();
    this.Equipamento = equipamento;
    this.Quantidade = quantidade;
    this.CustoUnitario = custoUnitario;
    this.Observacao = observacao;
    this.ValorTotal = this.calcularValorTotal();
  }
  /**
   * Calcula o valor total do item baseado na quantidade e custo unitário
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Quantidade * this.CustoUnitario;
  }
  /**
   * Atualiza a quantidade do equipamento e recalcula o valor total
   * @param {number} novaQuantidade - Nova quantidade do equipamento
   */
  atualizarQuantidade(novaQuantidade) {
    if (novaQuantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero");
    }
    this.Quantidade = novaQuantidade;
    this.ValorTotal = this.calcularValorTotal();
  }
  /**
   * Atualiza o custo unitário do equipamento e recalcula o valor total
   * @param {number} novoCusto - Novo custo unitário do equipamento
   */
  atualizarCustoUnitario(novoCusto) {
    if (novoCusto < 0) {
      throw new Error("O custo unitário não pode ser negativo");
    }
    this.CustoUnitario = novoCusto;
    this.ValorTotal = this.calcularValorTotal();
  }
}
class PacoteServico {
  /**
   * @param {string} descricao - Descri\u00e7\u00e3o do pacote de servi\u00e7os
   * @param {number} margemLucro - Margem de lucro em porcentagem (ex: 20 para 20%)
   */
  constructor(descricao, margemLucro = 30) {
    this.Id = gerarGuid();
    this.Descricao = descricao;
    this.MargemLucro = margemLucro;
    this.Favorito = false;
    this.ItensMaterial = [];
    this.ItensEquipamento = [];
    this.ItensServico = [];
    this.ValorMaterial = 0;
    this.ValorEquipamento = 0;
    this.ValorServico = 0;
    this.ValorTotal = 0;
    this.ValorVenda = 0;
  }
  /**
   * Adiciona um item de material ao pacote
   * @param {ItemMaterial} item - O item de material a ser adicionado
   */
  adicionarItemMaterial(item) {
    if (!(item instanceof ItemMaterial)) {
      throw new Error(
        "O item fornecido não é uma instância válida de ItemMaterial"
      );
    }
    this.ItensMaterial.push(item);
    this.recalcularValores();
  }
  /**
   * Adiciona um item de serviço ao pacote
   * @param {ItemServico} item - O item de serviço a ser adicionado
   */
  adicionarItemServico(item) {
    if (!(item instanceof ItemServico)) {
      throw new Error("O item fornecido não é uma instância válida de ItemServico");
    }
    this.ItensServico.push(item);
    this.recalcularValores();
  }
  /**
   * Adiciona um item de equipamento ao pacote
   * @param {ItemEquipamento} item - O item de equipamento a ser adicionado
   */
  adicionarItemEquipamento(item) {
    if (!(item instanceof ItemEquipamento)) {
      throw new Error("O item fornecido não é uma instância válida de ItemEquipamento");
    }
    this.ItensEquipamento.push(item);
    this.recalcularValores();
  }
  /**
   * Remove um item de material do pacote pelo ID
   * @param {string} itemId - ID do item a ser removido
   * @returns {boolean} true se o item foi removido, false caso contr\u00e1rio
   */
  removerItemMaterial(itemId) {
    const index = this.ItensMaterial.findIndex((item) => item.Id === itemId);
    if (index !== -1) {
      this.ItensMaterial.splice(index, 1);
      this.recalcularValores();
      return true;
    }
    return false;
  }
  /**
   * Remove um item de serviço do pacote pelo ID
   * @param {string} itemId - ID do item a ser removido
   * @returns {boolean} true se o item foi removido, false caso contrário
   */
  removerItemServico(itemId) {
    const index = this.ItensServico.findIndex((item) => item.Id === itemId);
    if (index !== -1) {
      this.ItensServico.splice(index, 1);
      this.recalcularValores();
      return true;
    }
    return false;
  }
  /**
   * Remove um item de equipamento do pacote pelo ID
   * @param {string} itemId - ID do item a ser removido
   * @returns {boolean} true se o item foi removido, false caso contrário
   */
  removerItemEquipamento(itemId) {
    const index = this.ItensEquipamento.findIndex((item) => item.Id === itemId);
    if (index !== -1) {
      this.ItensEquipamento.splice(index, 1);
      this.recalcularValores();
      return true;
    }
    return false;
  }
  /**
   * Atualiza a margem de lucro e recalcula os valores
   * @param {number} novaMargemLucro - Nova margem de lucro em porcentagem
   */
  atualizarMargemLucro(novaMargemLucro) {
    if (novaMargemLucro < 0) {
      throw new Error("A margem de lucro não pode ser negativa");
    }
    this.MargemLucro = novaMargemLucro;
    this.recalcularValores();
  }
  /**
   * Recalcula todos os valores do pacote
   */
  recalcularValores() {
    this.ValorMaterial = this.ItensMaterial.reduce((total, item) => total + item.ValorTotal, 0);
    this.ValorEquipamento = this.ItensEquipamento.reduce(
      (total, item) => total + item.ValorTotal,
      0
    );
    this.ValorServico = this.ItensServico.reduce((total, item) => total + item.ValorTotal, 0);
    this.ValorTotal = this.ValorMaterial + this.ValorEquipamento + this.ValorServico;
    this.ValorVenda = this.ValorTotal * (1 + this.MargemLucro / 100);
  }
  /**
   * Obtém o tempo total estimado em horas para todos os serviços
   * @returns {number} Tempo total em horas
   */
  calcularTempoTotalHoras() {
    return this.ItensServico.reduce((total, item) => total + item.calcularTempoTotalHoras(), 0);
  }
  /**
   * Alterna o status de favorito do pacote
   */
  alternarFavorito() {
    this.Favorito = !this.Favorito;
  }
  /**
   * Define o pacote como favorito
   */
  marcarComoFavorito() {
    this.Favorito = true;
  }
  /**
   * Remove o pacote dos favoritos
   */
  removerDosFavoritos() {
    this.Favorito = false;
  }
}
export {
  PacoteServico as P
};
//# sourceMappingURL=pacoteServico-CHT6QKBY.js.map
