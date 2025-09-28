import { gerarGuid } from '../utils/guid'

/**
 * Classe que representa uma referência profissional ou pessoal.
 */
export class Referencia {
  /**
   * @param {string} nome - Nome completo da referência
   * @param {string} telefone - Telefone de contato
   * @param {string} relacao - Relação com o colaborador (ex: ex-chefe, colega de trabalho)
   * @param {string} observacoes - Observações adicionais sobre a referência
   */
  constructor(nome, telefone, relacao, observacoes = '') {
    this.Id = gerarGuid()

    if (!nome || !telefone || !relacao) {
      throw new Error('Nome, telefone e relação são campos obrigatórios')
    }

    this.Nome = nome
    this.Telefone = telefone
    this.Relacao = relacao
    this.Observacoes = observacoes
  }
}

/**
 * Classe que representa uma experiência profissional anterior.
 */
export class ExperienciaProfissional {
  /**
   * @param {string} empresa - Nome da empresa
   * @param {string} cargo - Cargo ocupado
   * @param {Date} dataInicio - Data de início na empresa
   * @param {Date} dataFim - Data de término na empresa (opcional para trabalhos atuais)
   * @param {string} atribuicoes - Descrição das principais atribuições
   * @param {string} motivoSaida - Motivo da saída da empresa
   */
  constructor(empresa, cargo, dataInicio, dataFim, atribuicoes, motivoSaida = '') {
    this.Id = gerarGuid()

    if (!empresa || !cargo || !dataInicio) {
      throw new Error('Empresa, cargo e data de início são campos obrigatórios')
    }

    if (dataFim && dataInicio > dataFim) {
      throw new Error('A data de início não pode ser posterior à data de término')
    }

    this.Empresa = empresa
    this.Cargo = cargo
    this.DataInicio = dataInicio
    this.DataFim = dataFim
    this.Atribuicoes = atribuicoes
    this.MotivoSaida = motivoSaida
  }

  /**
   * Verifica se é o trabalho atual
   * @returns {boolean} true se for o trabalho atual (sem data de término)
   */
  get EhTrabalhoAtual() {
    return !this.DataFim
  }

  /**
   * Calcula a duração da experiência em meses
   * @returns {number} Duração em meses
   */
  get DuracaoMeses() {
    const fim = this.DataFim || new Date()
    const diffTime = Math.abs(fim - this.DataInicio)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.floor(diffDays / 30)
  }
}

/**
 * Classe que representa um documento adicional do colaborador.
 */
export class DocumentoAdicional {
  /**
   * @param {string} tipo - Tipo do documento
   * @param {string} numero - Número/identificador do documento
   * @param {Date} dataEmissao - Data de emissão
   * @param {Date} dataValidade - Data de validade (se aplicável)
   * @param {string} orgaoEmissor - Órgão emissor
   * @param {string} observacoes - Observações sobre o documento
   */
  constructor(tipo, numero, dataEmissao, dataValidade = null, orgaoEmissor = '', observacoes = '') {
    this.Id = gerarGuid()

    if (!tipo || !numero || !dataEmissao) {
      throw new Error('Tipo, número e data de emissão são campos obrigatórios')
    }

    if (dataValidade && dataEmissao > dataValidade) {
      throw new Error('A data de emissão não pode ser posterior à data de validade')
    }

    this.Tipo = tipo
    this.Numero = numero
    this.DataEmissao = dataEmissao
    this.DataValidade = dataValidade
    this.OrgaoEmissor = orgaoEmissor
    this.Observacoes = observacoes
  }

  /**
   * Verifica se o documento está vencido
   * @returns {boolean} true se o documento estiver vencido
   */
  get EstaVencido() {
    if (!this.DataValidade) return false
    return new Date() > this.DataValidade
  }
}
