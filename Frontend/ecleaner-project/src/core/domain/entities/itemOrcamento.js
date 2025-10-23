import { gerarGuid } from '../utils/guid'
import { TipoItemOrcamento, validarTipoItem } from '../enums/tipoItemOrcamento'

/**
 * Classe que representa um Item de Orçamento.
 * Pode ser um material ou serviço com informações básicas para composição do orçamento.
 */
export class ItemOrcamento {
  /**
   * @param {string} descricao - Descrição do item
   * @param {string} tipo - Tipo do item (MATERIAL ou SERVICO)
   * @param {number} custo - Custo unitário do item
   * @param {number} quantidade - Quantidade do item (padrão: 1)
   * @param {string} unidade - Unidade de medida do item (padrão: 'UN')
   * @param {string} observacoes - Observações adicionais sobre o item
   * @param {number} numero - Número sequencial do item no orçamento
   */
  constructor(
    descricao,
    tipo,
    custo,
    quantidade = 1,
    unidade = 'UN',
    observacoes = '',
    numero = null,
  ) {
    // Validações
    if (!descricao || typeof descricao !== 'string' || descricao.trim().length === 0) {
      throw new Error('A descrição é obrigatória e deve ser uma string não vazia')
    }

    if (!validarTipoItem(tipo)) {
      throw new Error(
        `Tipo inválido. Deve ser ${TipoItemOrcamento.MATERIAL} ou ${TipoItemOrcamento.SERVICO}`,
      )
    }

    // Converter e validar custo
    const custoNumerico = typeof custo === 'number' ? custo : parseFloat(custo) || 0
    if (custoNumerico < 0) {
      throw new Error('O custo deve ser um número não negativo')
    }

    // Converter e validar quantidade
    const quantidadeNumerica =
      typeof quantidade === 'number' ? quantidade : parseFloat(quantidade) || 1
    if (quantidadeNumerica <= 0) {
      throw new Error('A quantidade deve ser um número maior que zero')
    }

    // Propriedades da entidade
    this.Id = gerarGuid()
    this.Numero = numero
    this.Descricao = descricao.trim()
    this.Tipo = tipo
    this.Custo = custoNumerico
    this.Quantidade = quantidadeNumerica
    this.Unidade = unidade || 'UN'
    this.Observacoes = (observacoes || '').trim()
    this.DataCriacao = new Date()
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Calcula o valor total do item (custo × quantidade)
   * @returns {number} O valor total do item
   */
  calcularValorTotal() {
    return this.Custo * this.Quantidade
  }

  /**
   * Atualiza a descrição do item
   * @param {string} novaDescricao - Nova descrição do item
   */
  atualizarDescricao(novaDescricao) {
    if (!novaDescricao || typeof novaDescricao !== 'string' || novaDescricao.trim().length === 0) {
      throw new Error('A descrição é obrigatória e deve ser uma string não vazia')
    }

    this.Descricao = novaDescricao.trim()
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Atualiza o custo do item
   * @param {number} novoCusto - Novo custo unitário do item
   */
  atualizarCusto(novoCusto) {
    const custoNumerico = typeof novoCusto === 'number' ? novoCusto : parseFloat(novoCusto) || 0
    if (custoNumerico < 0) {
      throw new Error('O custo deve ser um número não negativo')
    }

    this.Custo = custoNumerico
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Atualiza a quantidade do item
   * @param {number} novaQuantidade - Nova quantidade do item
   */
  atualizarQuantidade(novaQuantidade) {
    const quantidadeNumerica =
      typeof novaQuantidade === 'number' ? novaQuantidade : parseFloat(novaQuantidade) || 1
    if (quantidadeNumerica <= 0) {
      throw new Error('A quantidade deve ser um número maior que zero')
    }

    this.Quantidade = quantidadeNumerica
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Atualiza as observações do item
   * @param {string} novasObservacoes - Novas observações do item
   */
  atualizarObservacoes(novasObservacoes) {
    this.Observacoes = (novasObservacoes || '').trim()
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Atualiza o número sequencial do item
   * @param {number} novoNumero - Novo número sequencial do item
   */
  atualizarNumero(novoNumero) {
    if (novoNumero !== null && (typeof novoNumero !== 'number' || novoNumero <= 0)) {
      throw new Error('O número deve ser um número positivo ou null')
    }

    this.Numero = novoNumero
    this.DataUltimaAlteracao = new Date()
  }

  /**
   * Verifica se o item é do tipo material
   * @returns {boolean} True se for material
   */
  isMaterial() {
    return this.Tipo === TipoItemOrcamento.MATERIAL
  }

  /**
   * Verifica se o item é do tipo serviço
   * @returns {boolean} True se for serviço
   */
  isServico() {
    return this.Tipo === TipoItemOrcamento.SERVICO
  }

  /**
   * Retorna uma representação em string do item
   * @returns {string} Representação textual do item
   */
  toString() {
    return `${this.Descricao} (${this.Tipo}) - ${this.Quantidade} ${this.Unidade} × R$ ${this.Custo.toFixed(2)} = R$ ${this.calcularValorTotal().toFixed(2)}`
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
      ValorTotal: this.calcularValorTotal(),
    }
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
      obj.Observacoes,
    )

    // Preserva IDs e datas se existirem
    if (obj.Id) item.Id = obj.Id
    if (obj.DataCriacao) item.DataCriacao = new Date(obj.DataCriacao)
    if (obj.DataUltimaAlteracao) item.DataUltimaAlteracao = new Date(obj.DataUltimaAlteracao)

    return item
  }
}
