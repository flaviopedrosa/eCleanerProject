/**
 * Entidade Contrato de Prestação de Serviço
 *
 * Representa um contrato gerado a partir de um orçamento aprovado,
 * com suporte a assinatura digital de cliente e prestador
 */

import { StatusContrato, isValidTransition } from '../enums/statusContrato'
import {
  gerarUUID,
  gerarTokenAssinatura,
  gerarSaltUnico,
} from '../../infrastructure/utils/hashGenerator'

export class Contrato {
  constructor(
    numeroContrato, // String: "CONT-2026-0001"
    orcamento, // Object: { Id, NumeroOrcamento, Cliente, Imovel, Itens, ValorTotal, ... }
    dataEmissao = new Date(),
  ) {
    // Identificação
    this.Id = gerarUUID()
    this.NumeroContrato = numeroContrato
    this.Orcamento = orcamento // Referência completa ao orçamento

    // Datas
    this.DataEmissao = dataEmissao
    this.DataCriacao = new Date()
    this.DataAlteracao = new Date()

    // Status e workflow
    this.Status = StatusContrato.RASCUNHO
    this.Salt = gerarSaltUnico() // Salt único para hash de assinaturas

    // Token de assinatura pública
    this.TokenAssinatura = null // Gerado ao enviar para assinatura
    this.TokenExpiraEm = null // 72h após envio

    // Texto do contrato
    this.TextoContrato = null // String com cláusulas e condições
    this.Locale = 'pt-BR' // Idioma do contrato (pt-BR ou en-US)

    // Assinatura do Cliente
    this.AssinaturaCliente = null // Object com dados da assinatura ou null
    /*
    {
      nome: String,
      tipoDocumento: String (TipoDocumento enum),
      numeroDocumento: String,
      hash: String (SHA-256),
      ip: String,
      userAgent: String,
      timestamp: Date,
      geolocation: { latitude: Number, longitude: Number, cidade: String, pais: String } | null
    }
    */
    this.DataAssinaturaCliente = null

    // Assinatura do Prestador (empresa)
    this.AssinaturaPrestador = null // Object (mesma estrutura da assinatura do cliente)
    this.DataAssinaturaPrestador = null

    // Vigência
    this.DataVigenciaInicio = null // Quando ambos assinam
    this.DataVigenciaFim = null // Calculado conforme periodicidade
    this.PrazoVigenciaMeses = null // Número de meses de vigência

    // Cancelamento
    this.Cancelado = false
    this.MotivoCancelamento = null
    this.DataCancelamento = null
    this.CanceladoPor = null // 'CLIENTE' ou 'PRESTADOR'

    // Campos adicionais
    this.Observacoes = ''
    this.Historico = [] // Array de eventos: { timestamp, evento, usuario, detalhes }

    // Adiciona evento de criação ao histórico
    this.adicionarEvento({
      evento: 'CONTRATO_CRIADO',
      detalhes: {
        numeroOrcamento: orcamento.NumeroOrcamento,
        cliente: orcamento.Cliente?.Nome,
        valorTotal: orcamento.ValorTotal,
      },
    })
  }

  /**
   * Registra assinatura do cliente
   * @param {Object} dadosAssinatura - Dados da assinatura
   * @throws {Error} Se status não for AGUARDANDO_ASSINATURA
   */
  assinarCliente(dadosAssinatura) {
    if (this.Status !== StatusContrato.AGUARDANDO_ASSINATURA) {
      throw new Error(`Não é possível assinar com status ${this.Status}`)
    }

    if (!dadosAssinatura.nome || !dadosAssinatura.numeroDocumento || !dadosAssinatura.hash) {
      throw new Error('Dados de assinatura incompletos')
    }

    this.AssinaturaCliente = {
      nome: dadosAssinatura.nome,
      tipoDocumento: dadosAssinatura.tipoDocumento,
      numeroDocumento: dadosAssinatura.numeroDocumento,
      hash: dadosAssinatura.hash,
      ip: dadosAssinatura.ip || 'Não disponível',
      userAgent: dadosAssinatura.userAgent || 'Não disponível',
      timestamp: dadosAssinatura.timestamp || new Date(),
      geolocation: dadosAssinatura.geolocation || null,
    }

    this.DataAssinaturaCliente = new Date()
    this.Status = StatusContrato.ASSINADO_CLIENTE
    this.DataAlteracao = new Date()

    this.adicionarEvento({
      evento: 'ASSINATURA_CLIENTE',
      detalhes: {
        nome: dadosAssinatura.nome,
        tipoDocumento: dadosAssinatura.tipoDocumento,
        ip: dadosAssinatura.ip,
      },
    })
  }

  /**
   * Registra assinatura do prestador (empresa)
   * @param {Object} dadosAssinatura - Dados da assinatura
   * @throws {Error} Se status não for ASSINADO_CLIENTE
   */
  assinarPrestador(dadosAssinatura) {
    if (this.Status !== StatusContrato.ASSINADO_CLIENTE) {
      throw new Error(`Não é possível assinar com status ${this.Status}`)
    }

    if (!dadosAssinatura.nome || !dadosAssinatura.numeroDocumento || !dadosAssinatura.hash) {
      throw new Error('Dados de assinatura incompletos')
    }

    this.AssinaturaPrestador = {
      nome: dadosAssinatura.nome,
      tipoDocumento: dadosAssinatura.tipoDocumento,
      numeroDocumento: dadosAssinatura.numeroDocumento,
      hash: dadosAssinatura.hash,
      ip: dadosAssinatura.ip || 'Não disponível',
      userAgent: dadosAssinatura.userAgent || 'Não disponível',
      timestamp: dadosAssinatura.timestamp || new Date(),
      geolocation: dadosAssinatura.geolocation || null,
    }

    this.DataAssinaturaPrestador = new Date()
    this.DataVigenciaInicio = new Date()

    // Calcula data de vigência fim baseado na periodicidade do orçamento
    if (this.Orcamento.Periodicidade && this.Orcamento.Periodicidade !== 'Única') {
      this.calcularDataVigenciaFim()
    }

    this.Status = StatusContrato.VIGENTE
    this.DataAlteracao = new Date()

    this.adicionarEvento({
      evento: 'ASSINATURA_PRESTADOR',
      detalhes: {
        nome: dadosAssinatura.nome,
        tipoDocumento: dadosAssinatura.tipoDocumento,
        ip: dadosAssinatura.ip,
      },
    })

    this.adicionarEvento({
      evento: 'CONTRATO_VIGENTE',
      detalhes: {
        dataVigenciaInicio: this.DataVigenciaInicio,
        dataVigenciaFim: this.DataVigenciaFim,
      },
    })
  }

  /**
   * Envia contrato para assinatura do cliente
   * Gera token e define data de expiração (72h)
   */
  enviarParaAssinatura() {
    if (this.Status !== StatusContrato.RASCUNHO) {
      throw new Error(`Não é possível enviar com status ${this.Status}`)
    }

    if (!this.TextoContrato) {
      throw new Error('Texto do contrato não foi gerado')
    }

    this.TokenAssinatura = gerarTokenAssinatura()

    // Expira em 72 horas
    const expiracao = new Date()
    expiracao.setHours(expiracao.getHours() + 72)
    this.TokenExpiraEm = expiracao

    this.Status = StatusContrato.AGUARDANDO_ASSINATURA
    this.DataAlteracao = new Date()

    this.adicionarEvento({
      evento: 'ENVIADO_PARA_ASSINATURA',
      detalhes: {
        token: this.TokenAssinatura.substring(0, 8) + '...',
        expiraEm: this.TokenExpiraEm,
      },
    })
  }

  /**
   * Cancela o contrato
   * @param {string} motivo - Motivo do cancelamento
   * @param {string} canceladoPor - 'CLIENTE' ou 'PRESTADOR'
   */
  cancelar(motivo, canceladoPor) {
    if (this.Status === StatusContrato.CANCELADO) {
      throw new Error('Contrato já está cancelado')
    }

    if (!motivo || motivo.trim().length < 3) {
      throw new Error('Motivo do cancelamento deve ter no mínimo 3 caracteres')
    }

    if (!['CLIENTE', 'PRESTADOR'].includes(canceladoPor)) {
      throw new Error('Cancelado por deve ser CLIENTE ou PRESTADOR')
    }

    this.Cancelado = true
    this.MotivoCancelamento = motivo
    this.DataCancelamento = new Date()
    this.CanceladoPor = canceladoPor
    this.Status = StatusContrato.CANCELADO
    this.DataAlteracao = new Date()

    this.adicionarEvento({
      evento: 'CONTRATO_CANCELADO',
      detalhes: {
        motivo,
        canceladoPor,
      },
    })
  }

  /**
   * Verifica se o token de assinatura expirou
   * Se expirou, atualiza status para EXPIRADO
   * @returns {boolean} true se expirou
   */
  verificarExpiracao() {
    if (this.Status !== StatusContrato.AGUARDANDO_ASSINATURA) {
      return false
    }

    if (!this.TokenExpiraEm) {
      return false
    }

    const agora = new Date()
    if (agora > this.TokenExpiraEm) {
      this.Status = StatusContrato.EXPIRADO
      this.DataAlteracao = new Date()

      this.adicionarEvento({
        evento: 'TOKEN_EXPIRADO',
        detalhes: {
          expirouEm: this.TokenExpiraEm,
        },
      })

      return true
    }

    return false
  }

  /**
   * Valida token de assinatura
   * @param {string} token - Token a ser validado
   * @returns {boolean}
   */
  validarToken(token) {
    if (this.Status !== StatusContrato.AGUARDANDO_ASSINATURA) {
      return false
    }

    if (this.verificarExpiracao()) {
      return false
    }

    return this.TokenAssinatura === token
  }

  /**
   * Calcula data de vigência fim baseado na periodicidade
   */
  calcularDataVigenciaFim() {
    if (!this.DataVigenciaInicio || !this.Orcamento.Periodicidade) {
      return
    }

    const inicio = new Date(this.DataVigenciaInicio)
    const quantidade = this.Orcamento.QuantidadeNoPeriodo || 1

    switch (this.Orcamento.Periodicidade) {
      case 'Semana':
        this.PrazoVigenciaMeses = Math.ceil((quantidade * 7) / 30)
        inicio.setDate(inicio.getDate() + quantidade * 7)
        break

      case 'Mês':
        this.PrazoVigenciaMeses = quantidade
        inicio.setMonth(inicio.getMonth() + quantidade)
        break

      case 'Bimestre':
        this.PrazoVigenciaMeses = quantidade * 2
        inicio.setMonth(inicio.getMonth() + quantidade * 2)
        break

      case 'Trimestre':
        this.PrazoVigenciaMeses = quantidade * 3
        inicio.setMonth(inicio.getMonth() + quantidade * 3)
        break

      case 'Semestre':
        this.PrazoVigenciaMeses = quantidade * 6
        inicio.setMonth(inicio.getMonth() + quantidade * 6)
        break

      case 'Ano':
        this.PrazoVigenciaMeses = quantidade * 12
        inicio.setFullYear(inicio.getFullYear() + quantidade)
        break

      default:
        // Única ou indefinido - sem data fim
        this.DataVigenciaFim = null
        this.PrazoVigenciaMeses = null
        return
    }

    this.DataVigenciaFim = inicio
  }

  /**
   * Adiciona evento ao histórico
   * @param {Object} evento - { evento, detalhes }
   */
  adicionarEvento(evento) {
    this.Historico.push({
      timestamp: new Date(),
      evento: evento.evento,
      detalhes: evento.detalhes || {},
    })
  }

  /**
   * Verifica se o contrato está vigente (ativo)
   * @returns {boolean}
   */
  estaVigente() {
    if (this.Status !== StatusContrato.VIGENTE) {
      return false
    }

    if (!this.DataVigenciaFim) {
      return true // Contrato sem data de fim
    }

    const agora = new Date()
    return agora <= this.DataVigenciaFim
  }

  /**
   * Retorna dias restantes até expiração do token
   * @returns {number|null}
   */
  getDiasAteExpiracao() {
    if (this.Status !== StatusContrato.AGUARDANDO_ASSINATURA || !this.TokenExpiraEm) {
      return null
    }

    const agora = new Date()
    const diff = this.TokenExpiraEm - agora
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  /**
   * Verifica se uma transição de status é válida
   * @param {string} novoStatus
   * @returns {boolean}
   */
  podeTransicionarPara(novoStatus) {
    return isValidTransition(this.Status, novoStatus)
  }
}
