import { Pessoa } from './pessoa'
import { Endereco } from './endereco'
import { StatusColaborador } from '../enums/statusColaborador'
import { DocumentoAdicional, ExperienciaProfissional, Referencia } from './documentosColaborador'

/**
 * Classe que representa um Colaborador, estendendo a classe Pessoa.
 */
export class Colaborador extends Pessoa {
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
   * @param {number} custoPorHora - Custo por hora do colaborador
   */
  constructor(
    nome,
    sobrenome,
    email,
    telefone,
    celular,
    documentoIdentidade,
    dataNascimento,
    nacionalidade,
    salarioEsperado,
    disponibilidade,
    regioesAtuacao = [],
    observacoes = '',
    custoPorHora = 0,
  ) {
    super(nome, sobrenome, email, telefone, celular)

    if (!documentoIdentidade) {
      throw new Error('Documento de identidade é obrigatório')
    }

    if (!dataNascimento || !(dataNascimento instanceof Date)) {
      throw new Error('Data de nascimento é obrigatória e deve ser uma data válida')
    }

    if (!nacionalidade) {
      throw new Error('Nacionalidade é obrigatória')
    }

    if (!salarioEsperado || salarioEsperado <= 0) {
      throw new Error('Salário esperado deve ser um valor positivo')
    }

    if (!disponibilidade) {
      throw new Error('Disponibilidade é obrigatória')
    }

    this.DocumentoIdentidade = documentoIdentidade
    this.DataNascimento = dataNascimento
    this.Nacionalidade = nacionalidade
    this.FotoPerfil = null // URL ou caminho para a foto
    this.Curriculo = null // URL ou caminho para o currículo
    this.SalarioEsperado = salarioEsperado
    this.CustoPorHora = custoPorHora
    this.Disponibilidade = disponibilidade
    this.RegioesAtuacao = regioesAtuacao
    this.Observacoes = observacoes

    /** @type {ExperienciaProfissional[]} */
    this.ExperienciasProfissionais = []

    /** @type {Referencia[]} */
    this.Referencias = []

    /** @type {DocumentoAdicional[]} */
    this.DocumentosAdicionais = []

    this.Status = StatusColaborador.EM_ANALISE
    this.DataInicioVinculo = null
    this.DataFimVinculo = null
  }

  /**
   * Define o endereço residencial do colaborador
   * @param {Endereco} endereco - O endereço residencial
   */
  definirEnderecoResidencial(endereco) {
    if (!(endereco instanceof Endereco)) {
      throw new Error('O endereço fornecido não é uma instância válida da classe Endereco')
    }
    // Remove endereços existentes e adiciona o novo
    this.Enderecos = [endereco]
  }

  /**
   * Define a foto de perfil do colaborador
   * @param {string} url - URL ou caminho para a foto
   */
  definirFotoPerfil(url) {
    if (!url) {
      throw new Error('URL da foto é obrigatória')
    }
    this.FotoPerfil = url
  }

  /**
   * Define o currículo do colaborador
   * @param {string} url - URL ou caminho para o currículo
   */
  definirCurriculo(url) {
    if (!url) {
      throw new Error('URL do currículo é obrigatória')
    }
    this.Curriculo = url
  }

  /**
   * Adiciona uma experiência profissional ao histórico
   * @param {ExperienciaProfissional} experiencia - A experiência profissional
   */
  adicionarExperienciaProfissional(experiencia) {
    if (!(experiencia instanceof ExperienciaProfissional)) {
      throw new Error(
        'A experiência fornecida não é uma instância válida da classe ExperienciaProfissional',
      )
    }
    this.ExperienciasProfissionais.push(experiencia)
  }

  /**
   * Adiciona uma referência à lista
   * @param {Referencia} referencia - A referência
   */
  adicionarReferencia(referencia) {
    if (!(referencia instanceof Referencia)) {
      throw new Error('A referência fornecida não é uma instância válida da classe Referencia')
    }
    this.Referencias.push(referencia)
  }

  /**
   * Adiciona um documento adicional
   * @param {DocumentoAdicional} documento - O documento
   */
  adicionarDocumento(documento) {
    if (!(documento instanceof DocumentoAdicional)) {
      throw new Error(
        'O documento fornecido não é uma instância válida da classe DocumentoAdicional',
      )
    }
    this.DocumentosAdicionais.push(documento)
  }

  /**
   * Atualiza o status do colaborador
   * @param {string} novoStatus - O novo status (usar valores do enum StatusColaborador)
   */
  atualizarStatus(novoStatus) {
    if (!Object.values(StatusColaborador).includes(novoStatus)) {
      throw new Error('Status inválido')
    }
    this.Status = novoStatus
  }

  /**
   * Registra o início do vínculo com a empresa
   * @param {Date} data - Data de início
   */
  registrarInicioVinculo(data) {
    if (!(data instanceof Date)) {
      throw new Error('Data inválida')
    }
    this.DataInicioVinculo = data
    this.atualizarStatus(StatusColaborador.EM_EXPERIENCIA)
  }

  /**
   * Registra o fim do vínculo com a empresa
   * @param {Date} data - Data de término
   */
  registrarFimVinculo(data) {
    if (!(data instanceof Date)) {
      throw new Error('Data inválida')
    }
    if (!this.DataInicioVinculo || data < this.DataInicioVinculo) {
      throw new Error('Data de fim deve ser posterior à data de início')
    }
    this.DataFimVinculo = data
    this.atualizarStatus(StatusColaborador.DESLIGADO)
  }

  /**
   * Calcula a idade do colaborador
   * @returns {number} A idade em anos
   */
  get Idade() {
    const hoje = new Date()
    let idade = hoje.getFullYear() - this.DataNascimento.getFullYear()
    const mesAtual = hoje.getMonth()
    const mesNascimento = this.DataNascimento.getMonth()

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && hoje.getDate() < this.DataNascimento.getDate())
    ) {
      idade--
    }

    return idade
  }

  /**
   * Calcula o tempo total de experiência profissional em meses
   * @returns {number} Total de meses de experiência
   */
  get TempoTotalExperiencia() {
    return this.ExperienciasProfissionais.reduce((total, exp) => total + exp.DuracaoMeses, 0)
  }
}
