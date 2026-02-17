/**
 * Store Pinia de Contratos
 *
 * Gerencia estado e operações de contratos de prestação de serviço
 */

import { defineStore } from 'pinia'
import { Contrato } from '../core/domain/entities/contrato'
import * as contratoRepository from '../core/infrastructure/repositories/contratoRepository'
import { gerarNumeroContrato } from '../core/infrastructure/utils/hashGenerator'
import { gerarHashAssinatura } from '../core/infrastructure/utils/hashGenerator'
import { validarDocumento } from '../core/infrastructure/utils/documentValidator'
import { Notify } from 'quasar'

export const useContratoStore = defineStore('contrato', {
  state: () => ({
    contratos: [],
    contratoAtual: null,
    loading: false,
    erro: null,
  }),

  getters: {
    /**
     * Contratos ordenados por data de criação (mais recentes primeiro)
     */
    contratosOrdenados: (state) => {
      return [...state.contratos].sort((a, b) => {
        return new Date(b.DataCriacao) - new Date(a.DataCriacao)
      })
    },

    /**
     * Contratos vigentes
     */
    contratosVigentes: (state) => {
      return state.contratos.filter((c) => c.Status === 'VIGENTE')
    },

    /**
     * Contratos aguardando assinatura
     */
    contratosAguardandoAssinatura: (state) => {
      return state.contratos.filter((c) => c.Status === 'AGUARDANDO_ASSINATURA')
    },

    /**
     * Busca contrato por ID
     */
    buscarPorId: (state) => (id) => {
      return state.contratos.find((c) => c.Id === id)
    },

    /**
     * Busca contratos por cliente
     */
    buscarPorCliente: (state) => (clienteId) => {
      return state.contratos.filter((c) => c.Orcamento?.Cliente?.Id === clienteId)
    },
  },

  actions: {
    /**
     * Carrega todos os contratos do repositório
     */
    async carregarContratos() {
      this.loading = true
      this.erro = null

      try {
        this.contratos = contratoRepository.buscarTodos()

        // Atualiza contratos expirados
        const expirados = contratoRepository.atualizarExpirados()
        if (expirados > 0) {
          this.contratos = contratoRepository.buscarTodos()
        }
      } catch (error) {
        console.error('Erro ao carregar contratos:', error)
        this.erro = error.message

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao carregar contratos',
          caption: error.message,
        })
      } finally {
        this.loading = false
      }
    },

    /**
     * Cria novo contrato a partir de orçamento aprovado
     * @param {Object} orcamento - Orçamento aprovado
     * @param {string} locale - Idioma do contrato (pt-BR ou en-US)
     * @returns {Contrato}
     */
    async createContratoFromOrcamento(orcamento, locale = 'pt-BR') {
      this.loading = true
      this.erro = null

      try {
        console.log('=== CRIANDO CONTRATO ===')
        console.log('Orçamento ID:', orcamento.Id)
        console.log('Cliente:', orcamento.Cliente?.Nome)
        console.log('Número do Orçamento:', orcamento.NumeroOrcamento)

        // Verifica se já existe contrato ativo para este orçamento específico
        const contratosExistentes = contratoRepository.buscarPorOrcamento(orcamento.Id)
        console.log('Contratos existentes para este orçamento:', contratosExistentes.length)

        const contratoAtivo = contratosExistentes.find(
          (c) => c.Status !== 'CANCELADO' && c.Status !== 'EXPIRADO',
        )

        if (contratoAtivo) {
          console.log('❌ JÁ EXISTE CONTRATO ATIVO:', contratoAtivo.NumeroContrato)
          console.log('Status do contrato:', contratoAtivo.Status)

          Notify.create({
            type: 'info',
            position: 'top-right',
            message: 'Contrato já existe',
            caption: `Contrato ${contratoAtivo.NumeroContrato} já foi criado para este orçamento`,
            timeout: 4000,
          })

          return contratoAtivo
        }

        console.log('✅ Nenhum contrato ativo encontrado, criando novo...')

        // Gera número do contrato
        const sequencial = contratoRepository.obterProximoSequencial()
        const numeroContrato = gerarNumeroContrato(sequencial)

        // Cria instância do contrato
        const contrato = new Contrato(numeroContrato, orcamento, new Date())

        contrato.Locale = locale

        // Gera texto do contrato automaticamente
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
        const { gerarTextoContrato } = await import('../core/infrastructure/utils/contratoHelper')
        contrato.TextoContrato = gerarTextoContrato(contrato, config, locale)

        // Salva no repositório
        contratoRepository.salvar(contrato)

        // Atualiza estado
        await this.carregarContratos()

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'Contrato criado com sucesso',
          caption: `Contrato ${numeroContrato}`,
        })

        return contrato
      } catch (error) {
        console.error('Erro ao criar contrato:', error)
        this.erro = error.message

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao criar contrato',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Atualiza texto do contrato
     * @param {string} id - ID do contrato
     * @param {string} textoContrato - Texto com cláusulas
     */
    async atualizarTextoContrato(id, textoContrato) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        if (contrato.Status !== 'RASCUNHO') {
          throw new Error('Apenas contratos em rascunho podem ter o texto alterado')
        }

        contrato.TextoContrato = textoContrato
        contratoRepository.atualizar(contrato)

        await this.carregarContratos()

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'Texto do contrato atualizado',
        })
      } catch (error) {
        console.error('Erro ao atualizar texto:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao atualizar texto',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Envia contrato para assinatura do cliente
     * @param {string} id - ID do contrato
     */
    async enviarParaAssinatura(id) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        contrato.enviarParaAssinatura()
        contratoRepository.atualizar(contrato)

        await this.carregarContratos()

        // Envia email com link de assinatura
        try {
          const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
          const { enviarContratoParaAssinatura } = await import(
            '../core/infrastructure/utils/emailSender'
          )

          const cliente = contrato.Orcamento.Cliente
          const baseUrl = window.location.origin
          const linkAssinatura = `${baseUrl}/#/contrato/assinar/${contrato.Id}/${contrato.TokenAssinatura}`

          const dataExpiracao = contrato.TokenExpiraEm.toLocaleDateString(
            contrato.Locale || 'pt-BR',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            },
          )

          const valorTotal = new Intl.NumberFormat(contrato.Locale || 'pt-BR', {
            style: 'currency',
            currency: contrato.Locale === 'en-US' ? 'USD' : 'BRL',
          }).format(contrato.Orcamento.ValorTotal || 0)

          await enviarContratoParaAssinatura({
            clienteEmail: cliente.Email,
            clienteNome: cliente.Nome,
            nomeEmpresa: config.nomeEmpresa || 'eCleaner',
            emailEmpresa: config.emailEmpresa || '',
            telefoneEmpresa: config.telefoneEmpresa || '',
            numeroContrato: contrato.NumeroContrato,
            numeroOrcamento: contrato.Orcamento.NumeroOrcamento,
            valorTotal,
            linkAssinatura,
            dataExpiracao,
            locale: contrato.Locale || 'pt-BR',
          })
        } catch (emailError) {
          console.error('Erro ao enviar email:', emailError)
          // Não bloqueia o processo se email falhar
          Notify.create({
            type: 'warning',
            position: 'top-right',
            message: 'Contrato enviado, mas houve erro ao enviar email',
            caption: 'Você pode reenviar o email depois',
          })
        }

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'Contrato enviado para assinatura',
          caption: 'Email enviado ao cliente',
        })

        return contrato
      } catch (error) {
        console.error('Erro ao enviar contrato:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao enviar contrato',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Registra assinatura digital
     * @param {string} id - ID do contrato
     * @param {string} tipoAssinante - 'CLIENTE' ou 'PRESTADOR'
     * @param {Object} dadosAssinatura - Dados da assinatura
     */
    async assinarContrato(id, tipoAssinante, dadosAssinatura) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        // Valida documento
        const documentoValido = validarDocumento(
          dadosAssinatura.tipoDocumento,
          dadosAssinatura.numeroDocumento,
        )

        if (!documentoValido) {
          throw new Error('Documento inválido')
        }

        // Captura IP (será implementado na Fase 6)
        dadosAssinatura.ip = dadosAssinatura.ip || 'Não disponível'
        dadosAssinatura.userAgent = navigator.userAgent
        dadosAssinatura.timestamp = new Date()

        // Gera hash da assinatura
        const hash = await gerarHashAssinatura(
          {
            nome: dadosAssinatura.nome,
            numeroDocumento: dadosAssinatura.numeroDocumento,
            timestamp: dadosAssinatura.timestamp,
          },
          contrato.Salt,
        )

        dadosAssinatura.hash = hash

        // Registra assinatura
        if (tipoAssinante === 'CLIENTE') {
          contrato.assinarCliente(dadosAssinatura)
        } else if (tipoAssinante === 'PRESTADOR') {
          contrato.assinarPrestador(dadosAssinatura)
        } else {
          throw new Error('Tipo de assinante inválido')
        }

        contratoRepository.atualizar(contrato)
        await this.carregarContratos()

        // Envia email de confirmação
        try {
          const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
          const { enviarConfirmacaoAssinatura } = await import(
            '../core/infrastructure/utils/emailSender'
          )

          if (tipoAssinante === 'CLIENTE') {
            // Email para o cliente
            await enviarConfirmacaoAssinatura({
              destinatarioEmail: contrato.Orcamento.Cliente.Email,
              destinatarioNome: contrato.Orcamento.Cliente.Nome,
              numeroContrato: contrato.NumeroContrato,
              tipoAssinante: 'CLIENTE',
              nomeEmpresa: config.nomeEmpresa || 'eCleaner',
              emailEmpresa: config.emailEmpresa || '',
              locale: contrato.Locale || 'pt-BR',
            })

            // Email para o prestador
            if (config.emailEmpresa) {
              await enviarConfirmacaoAssinatura({
                destinatarioEmail: config.emailEmpresa,
                destinatarioNome: config.nomeEmpresa || 'eCleaner',
                numeroContrato: contrato.NumeroContrato,
                tipoAssinante: 'PRESTADOR',
                nomeEmpresa: config.nomeEmpresa || 'eCleaner',
                emailEmpresa: config.emailEmpresa || '',
                locale: contrato.Locale || 'pt-BR',
              })
            }
          } else {
            // Contrato agora está VIGENTE - email para ambos
            await enviarConfirmacaoAssinatura({
              destinatarioEmail: contrato.Orcamento.Cliente.Email,
              destinatarioNome: contrato.Orcamento.Cliente.Nome,
              numeroContrato: contrato.NumeroContrato,
              tipoAssinante: 'VIGENTE',
              nomeEmpresa: config.nomeEmpresa || 'eCleaner',
              emailEmpresa: config.emailEmpresa || '',
              locale: contrato.Locale || 'pt-BR',
            })
          }
        } catch (emailError) {
          console.error('Erro ao enviar email de confirmação:', emailError)
          // Não bloqueia o processo
        }

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'Assinatura registrada com sucesso',
          icon: 'check_circle',
        })

        return contrato
      } catch (error) {
        console.error('Erro ao assinar contrato:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao assinar contrato',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Valida token de assinatura pública
     * @param {string} id - ID do contrato
     * @param {string} token - Token de assinatura
     * @returns {Contrato|null}
     */
    async validarTokenAssinatura(id, token) {
      try {
        const contrato = contratoRepository.buscarPorId(id)

        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        if (!contrato.validarToken(token)) {
          if (contrato.Status === 'EXPIRADO') {
            throw new Error('Link de assinatura expirado. Solicite um novo link.')
          }
          throw new Error('Link de assinatura inválido')
        }

        return contrato
      } catch (error) {
        console.error('Erro ao validar token:', error)
        throw error
      }
    },

    /**
     * Cancela contrato
     * @param {string} id - ID do contrato
     * @param {string} motivo - Motivo do cancelamento
     * @param {string} canceladoPor - 'CLIENTE' ou 'PRESTADOR'
     */
    async cancelarContrato(id, motivo, canceladoPor) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        contrato.cancelar(motivo, canceladoPor)
        contratoRepository.atualizar(contrato)

        await this.carregarContratos()

        // Aqui será adicionado o envio de email de notificação na Fase 4

        Notify.create({
          type: 'warning',
          position: 'top-right',
          message: 'Contrato cancelado',
          icon: 'cancel',
        })
      } catch (error) {
        console.error('Erro ao cancelar contrato:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao cancelar contrato',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Reenviar email de assinatura
     * @param {string} id - ID do contrato
     */
    async reenviarEmailAssinatura(id) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        if (contrato.Status !== 'AGUARDANDO_ASSINATURA') {
          throw new Error('Contrato não está aguardando assinatura')
        }

        // Envia email
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
        const { enviarContratoParaAssinatura } = await import(
          '../core/infrastructure/utils/emailSender'
        )

        const cliente = contrato.Orcamento.Cliente
        const baseUrl = window.location.origin
        const linkAssinatura = `${baseUrl}/#/contrato/assinar/${contrato.Id}/${contrato.TokenAssinatura}`

        const dataExpiracao = contrato.TokenExpiraEm.toLocaleDateString(
          contrato.Locale || 'pt-BR',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          },
        )

        const valorTotal = new Intl.NumberFormat(contrato.Locale || 'pt-BR', {
          style: 'currency',
          currency: contrato.Locale === 'en-US' ? 'USD' : 'BRL',
        }).format(contrato.Orcamento.ValorTotal || 0)

        await enviarContratoParaAssinatura({
          clienteEmail: cliente.Email,
          clienteNome: cliente.Nome,
          nomeEmpresa: config.nomeEmpresa || 'eCleaner',
          emailEmpresa: config.emailEmpresa || '',
          telefoneEmpresa: config.telefoneEmpresa || '',
          numeroContrato: contrato.NumeroContrato,
          numeroOrcamento: contrato.Orcamento.NumeroOrcamento,
          valorTotal,
          linkAssinatura,
          dataExpiracao,
          locale: contrato.Locale || 'pt-BR',
        })

        contrato.adicionarEvento({
          evento: 'EMAIL_REENVIADO',
          detalhes: { timestamp: new Date() },
        })

        contratoRepository.atualizar(contrato)

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'Email reenviado com sucesso',
        })
      } catch (error) {
        console.error('Erro ao reenviar email:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao reenviar email',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Obtém estatísticas de contratos
     */
    async obterEstatisticas() {
      try {
        return contratoRepository.obterEstatisticas()
      } catch (error) {
        console.error('Erro ao obter estatísticas:', error)
        return null
      }
    },

    /**
     * Gera e faz download do PDF do contrato
     * @param {string} id - ID do contrato
     */
    async downloadPDF(id) {
      this.loading = true

      try {
        const contrato = contratoRepository.buscarPorId(id)
        if (!contrato) {
          throw new Error('Contrato não encontrado')
        }

        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

        // Importa função de geração de PDF
        const { gerarContratoPDF } = await import('../core/infrastructure/utils/pdfGenerator')

        // Gera PDF
        const doc = await gerarContratoPDF(contrato, config)

        // Faz download
        doc.save(`Contrato_${contrato.NumeroContrato}.pdf`)

        // Registra evento
        contrato.adicionarEvento({
          evento: 'PDF_DOWNLOADED',
          detalhes: { timestamp: new Date() },
        })
        contratoRepository.atualizar(contrato)

        Notify.create({
          type: 'positive',
          position: 'top-right',
          message: 'PDF gerado com sucesso',
          icon: 'download',
        })
      } catch (error) {
        console.error('Erro ao gerar PDF:', error)

        Notify.create({
          type: 'negative',
          position: 'top-right',
          message: 'Erro ao gerar PDF',
          caption: error.message,
        })

        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
