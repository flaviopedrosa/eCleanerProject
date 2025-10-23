import { gerarGuid } from '../utils/guid'
import { Cliente } from './cliente'
import { Imovel } from './imovel'
import { ItemOrcamento } from './itemOrcamento'
import { PacoteServico } from './pacoteServico'
import { StatusOrcamento } from '../enums/statusOrcamento'
import { TipoItemOrcamento } from '../enums/tipoItemOrcamento'

/**
 * Classe que representa um Orçamento.
 */
export class Orcamento {
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

    /** @type {ItemOrcamento[]} */
    this.Itens = []

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
   * Adiciona um item ao orçamento
   * @param {ItemOrcamento} item - O item de orçamento a ser adicionado
   */
  adicionarItem(item) {
    if (!(item instanceof ItemOrcamento)) {
      throw new Error('O item fornecido não é uma instância válida da classe ItemOrcamento')
    }
    this.Itens.push(item)
  }

  /**
   * Remove um item do orçamento
   * @param {ItemOrcamento} item - O item de orçamento a ser removido
   */
  removerItem(item) {
    const index = this.Itens.indexOf(item)
    if (index > -1) {
      this.Itens.splice(index, 1)
    }
  }

  /**
   * Remove um item do orçamento por ID
   * @param {string} itemId - O ID do item a ser removido
   */
  removerItemPorId(itemId) {
    const index = this.Itens.findIndex((item) => item.Id === itemId)
    if (index > -1) {
      this.Itens.splice(index, 1)
    }
  }

  /**
   * Obtém todos os itens do tipo material
   * @returns {ItemOrcamento[]} Array com os itens de material
   */
  obterItensMaterial() {
    return this.Itens.filter((item) => item.Tipo === TipoItemOrcamento.MATERIAL)
  }

  /**
   * Obtém todos os itens do tipo serviço
   * @returns {ItemOrcamento[]} Array com os itens de serviço
   */
  obterItensServico() {
    return this.Itens.filter((item) => item.Tipo === TipoItemOrcamento.SERVICO)
  }

  /**
   * Busca um item por ID
   * @param {string} itemId - O ID do item a ser buscado
   * @returns {ItemOrcamento|undefined} O item encontrado ou undefined
   */
  buscarItemPorId(itemId) {
    return this.Itens.find((item) => item.Id === itemId)
  }

  /**
   * Calcula o subtotal do orçamento (soma de todos os itens)
   * @returns {number} O valor do subtotal
   */
  get Subtotal() {
    return this.Itens.reduce((total, item) => total + item.calcularValorTotal(), 0)
  }

  /**
   * Calcula o subtotal apenas dos materiais
   * @returns {number} O valor do subtotal dos materiais
   */
  get SubtotalMateriais() {
    return this.obterItensMaterial().reduce((total, item) => total + item.calcularValorTotal(), 0)
  }

  /**
   * Calcula o subtotal apenas dos serviços
   * @returns {number} O valor do subtotal dos serviços
   */
  get SubtotalServicos() {
    return this.obterItensServico().reduce((total, item) => total + item.calcularValorTotal(), 0)
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
   * Define o pacote de serviço e atualiza os itens com base nele
   * @param {PacoteServico|null} pacoteServico - O pacote de serviço a ser definido ou null
   */
  definirPacoteServico(pacoteServico) {
    // Se o pacote for null, apenas limpa os itens e define como null
    if (!pacoteServico) {
      this.Itens = []
      this.PacoteServico = null
      return
    }

    if (!(pacoteServico instanceof PacoteServico)) {
      throw new Error(
        'O pacote de serviço fornecido não é uma instância válida da classe PacoteServico',
      )
    }

    console.log('Definindo pacote de serviço:', pacoteServico.Descricao)
    console.log('ItensMaterial:', pacoteServico.ItensMaterial)
    console.log('ItensServico:', pacoteServico.ItensServico)

    // Limpa os itens atuais
    this.Itens = []

    // Converte os itens do pacote para ItemOrcamento
    if (pacoteServico.ItensServico) {
      pacoteServico.ItensServico.forEach((itemServico) => {
        // Verificar se itemServico e Servico existem antes de acessar propriedades
        if (!itemServico || !itemServico.Servico) {
          console.warn('Item de serviço inválido encontrado no pacote de serviço:', itemServico)
          return // Pular este item
        }

        const item = new ItemOrcamento(
          itemServico.Servico.Descricao || 'Serviço',
          TipoItemOrcamento.SERVICO,
          itemServico.Servico.CustoUnitario || 0,
          itemServico.Quantidade || 1,
          itemServico.Servico.Unidade || 'UN',
          itemServico.Servico.Observacao || '',
        )
        this.adicionarItem(item)
      })
    }

    if (pacoteServico.ItensMaterial) {
      pacoteServico.ItensMaterial.forEach((itemMaterial) => {
        // Verificar se itemMaterial e Material existem antes de acessar propriedades
        if (!itemMaterial || !itemMaterial.Material) {
          console.warn('Item de material inválido encontrado no pacote de serviço:', itemMaterial)
          return // Pular este item
        }

        const item = new ItemOrcamento(
          itemMaterial.Material.Descricao || 'Material',
          TipoItemOrcamento.MATERIAL,
          itemMaterial.CustoUnitario || 0,
          itemMaterial.Quantidade || 1,
          itemMaterial.Material.Unidade || 'UN',
          itemMaterial.Observacao || '',
        )
        this.adicionarItem(item)
      })
    }

    this.PacoteServico = pacoteServico
  }
}
