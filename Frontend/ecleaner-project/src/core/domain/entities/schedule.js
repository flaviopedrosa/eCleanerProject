import { Pessoa } from './pessoa'
import { Endereco } from './endereco'
import { Cliente } from './cliente'
import { Imovel } from './imovel'
import { Colaborador } from './colaborador'
import { TipoEmpresa } from '../enums/tipoEmpresa'
import { FormaPagamento } from '../enums/formaPagamento'
import { DadosBancarios } from '../value-objects/dadosBancarios'
import { gerarGuid } from '../utils/guid'

/**
 * Representa um Schedule no sistema
 */
export class Schedule {
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
  constructor(
    responsavel,
    nomeEmpresa,
    documentoEmpresa,
    telefoneComercial,
    emailComercial,
    tipoEmpresa,
    logomarca,
  ) {
    if (!(responsavel instanceof Pessoa)) {
      throw new Error('Responsável deve ser uma instância de Pessoa')
    }

    if (!nomeEmpresa) {
      throw new Error('Nome do Schedule é obrigatório')
    }

    if (!documentoEmpresa) {
      throw new Error('Documento do Schedule é obrigatório')
    }

    if (!telefoneComercial) {
      throw new Error('Telefone comercial é obrigatório')
    }

    if (!emailComercial) {
      throw new Error('E-mail comercial é obrigatório')
    }

    if (!Object.values(TipoEmpresa).includes(tipoEmpresa)) {
      throw new Error('Tipo de Schedule inválido')
    }

    this.Id = gerarGuid()
    this.Responsavel = responsavel
    this.NomeEmpresa = nomeEmpresa
    this.Logomarca = logomarca ? this.validarLogomarca(logomarca) : null
    this.TipoEmpresa = tipoEmpresa
    this.DocumentoEmpresa = documentoEmpresa
    this.TelefoneComercial = telefoneComercial
    this.EmailComercial = emailComercial
    this.EnderecoEmpresa = null
    this.RegioesAtendidas = []
    this.Clientes = []
    this.Imoveis = []
    this.Colaboradores = []
    this.PoliticaCancelamento = ''
    this.FormasPagamentoAceitas = []
    this.DadosBancarios = null
    this.Observacoes = ''
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
      throw new Error('Logomarca deve conter url, tipo e tamanho')
    }

    const tiposPermitidos = ['png', 'jpg', 'jpeg', 'svg']
    const tipo = logomarca.tipo.toLowerCase()

    if (!tiposPermitidos.includes(tipo)) {
      throw new Error('Tipo de arquivo inválido. Tipos permitidos: ' + tiposPermitidos.join(', '))
    }

    // Limite de 5MB
    const tamanhoMaximo = 5 * 1024 * 1024
    if (logomarca.tamanho > tamanhoMaximo) {
      throw new Error('Tamanho do arquivo excede o limite de 5MB')
    }

    return {
      url: logomarca.url,
      tipo: tipo,
      tamanho: logomarca.tamanho,
      dataUpload: new Date().toISOString(),
    }
  }

  /**
   * Define a logomarca da empresa
   * @param {Object} logomarca Logomarca da empresa
   * @param {string} logomarca.url URL da imagem
   * @param {string} logomarca.tipo Tipo do arquivo (png, jpg, jpeg, svg)
   * @param {number} logomarca.tamanho Tamanho do arquivo em bytes
   */
  definirLogomarca(logomarca) {
    this.Logomarca = this.validarLogomarca(logomarca)
  }

  /**
   * Define o endereço da empresa
   * @param {Endereco} endereco Endereço da empresa
   */
  definirEnderecoEmpresa(endereco) {
    if (!(endereco instanceof Endereco)) {
      throw new Error('Endereço deve ser uma instância de Endereco')
    }
    this.EnderecoEmpresa = endereco
  }

  /**
   * Adiciona uma região atendida
   * @param {string} regiao Nome/identificação da região
   */
  adicionarRegiaoAtendida(regiao) {
    if (!regiao) {
      throw new Error('Região é obrigatória')
    }
    if (!this.RegioesAtendidas.includes(regiao)) {
      this.RegioesAtendidas.push(regiao)
    }
  }

  /**
   * Remove uma região atendida
   * @param {string} regiao Nome/identificação da região
   */
  removerRegiaoAtendida(regiao) {
    const index = this.RegioesAtendidas.indexOf(regiao)
    if (index > -1) {
      this.RegioesAtendidas.splice(index, 1)
    }
  }

  /**
   * Adiciona um cliente ao Schedule
   * @param {Cliente} cliente Cliente a ser adicionado
   */
  adicionarCliente(cliente) {
    if (!(cliente instanceof Cliente)) {
      throw new Error('Cliente deve ser uma instância de Cliente')
    }
    if (!this.Clientes.some((c) => c.Id === cliente.Id)) {
      this.Clientes.push(cliente)
    }
  }

  /**
   * Remove um cliente do Schedule
   * @param {string} clienteId ID do cliente a ser removido
   */
  removerCliente(clienteId) {
    this.Clientes = this.Clientes.filter((c) => c.Id !== clienteId)
  }

  /**
   * Adiciona um imóvel ao Schedule
   * @param {Imovel} imovel Imóvel a ser adicionado
   */
  adicionarImovel(imovel) {
    if (!(imovel instanceof Imovel)) {
      throw new Error('Imóvel deve ser uma instância de Imovel')
    }
    if (!this.Imoveis.some((i) => i.Id === imovel.Id)) {
      this.Imoveis.push(imovel)
    }
  }

  /**
   * Remove um imóvel do Schedule
   * @param {string} imovelId ID do imóvel a ser removido
   */
  removerImovel(imovelId) {
    this.Imoveis = this.Imoveis.filter((i) => i.Id !== imovelId)
  }

  /**
   * Adiciona um colaborador ao Schedule
   * @param {Colaborador} colaborador Colaborador a ser adicionado
   */
  adicionarColaborador(colaborador) {
    if (!(colaborador instanceof Colaborador)) {
      throw new Error('Colaborador deve ser uma instância de Colaborador')
    }
    if (!this.Colaboradores.some((c) => c.Id === colaborador.Id)) {
      this.Colaboradores.push(colaborador)
    }
  }

  /**
   * Remove um colaborador do Schedule
   * @param {string} colaboradorId ID do colaborador a ser removido
   */
  removerColaborador(colaboradorId) {
    this.Colaboradores = this.Colaboradores.filter((c) => c.Id !== colaboradorId)
  }

  /**
   * Define a política de cancelamento
   * @param {string} politica Texto da política de cancelamento
   */
  definirPoliticaCancelamento(politica) {
    if (!politica) {
      throw new Error('Política de cancelamento é obrigatória')
    }
    this.PoliticaCancelamento = politica
  }

  /**
   * Adiciona uma forma de pagamento aceita
   * @param {string} formaPagamento Forma de pagamento (usar FormaPagamento enum)
   */
  adicionarFormaPagamento(formaPagamento) {
    if (!Object.values(FormaPagamento).includes(formaPagamento)) {
      throw new Error('Forma de pagamento inválida')
    }
    if (!this.FormasPagamentoAceitas.includes(formaPagamento)) {
      this.FormasPagamentoAceitas.push(formaPagamento)
    }
  }

  /**
   * Remove uma forma de pagamento
   * @param {string} formaPagamento Forma de pagamento a ser removida
   */
  removerFormaPagamento(formaPagamento) {
    const index = this.FormasPagamentoAceitas.indexOf(formaPagamento)
    if (index > -1) {
      this.FormasPagamentoAceitas.splice(index, 1)
    }
  }

  /**
   * Define os dados bancários para recebimento
   * @param {DadosBancarios} dadosBancarios Dados bancários
   */
  definirDadosBancarios(dadosBancarios) {
    if (!(dadosBancarios instanceof DadosBancarios)) {
      throw new Error('Dados bancários devem ser uma instância de DadosBancarios')
    }
    this.DadosBancarios = dadosBancarios
  }

  /**
   * Retorna a quantidade de funcionários vinculados
   * @returns {number} Quantidade de funcionários
   */
  get QuantidadeFuncionarios() {
    return this.Colaboradores.length
  }
}
