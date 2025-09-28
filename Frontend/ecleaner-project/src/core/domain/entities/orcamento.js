import { gerarGuid } from '../utils/guid'
import { Cliente } from './cliente'
import { Imovel } from './imovel'
import { ItemMaterial } from './itemMaterial'
import { ItemServico } from './itemServico'
import { PacoteServico } from './pacoteServico'
import { StatusOrcamento } from '../enums/statusOrcamento'

/**
 * Classe que representa um Orçamento.
 */
export class Orcamento {
  /**
   * @param {number} numeroOrcamento - Número sequencial do orçamento
   * @param {Cliente} cliente - Cliente para o qual o orçamento está sendo feito
   * @param {Imovel} imovel - Imóvel onde os serviços serão prestados
   * @param {PacoteServico} pacoteServico - Pacote de serviço base para o orçamento
   * @param {string} frequenciaDesejada - Frequência desejada para execução dos serviços
   * @param {number} quantidadeProfissionais - Quantidade sugerida de profissionais
   * @param {number} estimativaHoras - Estimativa de horas necessárias para o serviço
   * @param {number} descontos - Valor dos descontos aplicados
   * @param {number} impostosTaxas - Valor dos impostos e taxas
   * @param {Date} validade - Data limite de validade do orçamento
   */
  constructor(
    numeroOrcamento,
    cliente,
    imovel,
    pacoteServico,
    frequenciaDesejada,
    quantidadeProfissionais,
    estimativaHoras,
    descontos = 0,
    impostosTaxas = 0,
    validade = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias por padrão
  ) {
    this.Id = gerarGuid()
    this.NumeroOrcamento = numeroOrcamento
    this.DataEmissao = new Date()

    if (!(cliente instanceof Cliente)) {
      throw new Error('O cliente fornecido não é uma instância válida da classe Cliente')
    }
    this.Cliente = cliente

    if (!(imovel instanceof Imovel)) {
      throw new Error('O imóvel fornecido não é uma instância válida da classe Imovel')
    }
    this.Imovel = imovel

    /** @type {ItemServico[]} */
    this.ItensServico = []

    /** @type {ItemMaterial[]} */
    this.ItensMaterial = []

    this.definirPacoteServico(pacoteServico)

    this.FrequenciaDesejada = frequenciaDesejada
    this.QuantidadeProfissionais = quantidadeProfissionais
    this.EstimativaHoras = estimativaHoras
    this.Descontos = descontos
    this.ImpostosTaxas = impostosTaxas
    this.Validade = validade
    this.Status = StatusOrcamento.RASCUNHO
  }

  /**
   * Adiciona um item de serviço ao orçamento
   * @param {ItemServico} item - O item de serviço a ser adicionado
   */
  adicionarItemServico(item) {
    if (!(item instanceof ItemServico)) {
      throw new Error('O item fornecido não é uma instância válida da classe ItemServico')
    }
    this.ItensServico.push(item)
  }

  /**
   * Adiciona um item de material ao orçamento
   * @param {ItemMaterial} item - O item de material a ser adicionado
   */
  adicionarItemMaterial(item) {
    if (!(item instanceof ItemMaterial)) {
      throw new Error('O item fornecido não é uma instância válida da classe ItemMaterial')
    }
    this.ItensMaterial.push(item)
  }

  /**
   * Remove um item de serviço do orçamento
   * @param {ItemServico} item - O item de serviço a ser removido
   */
  removerItemServico(item) {
    const index = this.ItensServico.indexOf(item)
    if (index > -1) {
      this.ItensServico.splice(index, 1)
    }
  }

  /**
   * Remove um item de material do orçamento
   * @param {ItemMaterial} item - O item de material a ser removido
   */
  removerItemMaterial(item) {
    const index = this.ItensMaterial.indexOf(item)
    if (index > -1) {
      this.ItensMaterial.splice(index, 1)
    }
  }

  /**
   * Calcula o subtotal do orçamento (soma dos serviços e materiais)
   * @returns {number} O valor do subtotal
   */
  get Subtotal() {
    const valorServicos = this.ItensServico.reduce((total, item) => total + item.ValorTotal, 0)
    const valorMateriais = this.ItensMaterial.reduce((total, item) => total + item.ValorTotal, 0)
    return valorServicos + valorMateriais
  }

  /**
   * Calcula o valor total do orçamento (subtotal - descontos + impostos)
   * @returns {number} O valor total
   */
  get ValorTotal() {
    return this.Subtotal - this.Descontos + this.ImpostosTaxas
  }

  /**
   * Verifica se o orçamento está expirado
   * @returns {boolean} true se estiver expirado, false caso contrário
   */
  get EstaExpirado() {
    return new Date() > this.Validade
  }

  /**
   * Atualiza o status do orçamento
   * @param {string} novoStatus - O novo status do orçamento (usar valores do enum StatusOrcamento)
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusOrcamento).includes(novoStatus)) {
      throw new Error('Status inválido')
    }
    this.Status = novoStatus
  }

  /**
   * Define o pacote de serviço e atualiza os itens de serviço e material com base nele
   * @param {PacoteServico} pacoteServico - O pacote de serviço a ser definido
   */
  definirPacoteServico(pacoteServico) {
    if (!(pacoteServico instanceof PacoteServico)) {
      throw new Error(
        'O pacote de serviço fornecido não é uma instância válida da classe PacoteServico',
      )
    }

    // Limpa os itens atuais
    this.ItensServico = []
    this.ItensMaterial = []

    // Adiciona os itens do pacote
    pacoteServico.ItensServico.forEach((item) => {
      this.adicionarItemServico(item)
    })

    pacoteServico.ItensMaterial.forEach((item) => {
      this.adicionarItemMaterial(item)
    })

    this.PacoteServico = pacoteServico
  }
}
