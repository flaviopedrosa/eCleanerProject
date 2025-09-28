import { describe, it, expect, beforeEach } from 'vitest'
import { Schedule } from '../../../../src/core/domain/entities/schedule'
import { Pessoa } from '../../../../src/core/domain/entities/pessoa'
import { Endereco } from '../../../../src/core/domain/entities/endereco'
import { Cliente } from '../../../../src/core/domain/entities/cliente'
import { Imovel } from '../../../../src/core/domain/entities/imovel'
import { Colaborador } from '../../../../src/core/domain/entities/colaborador'
import { TipoEmpresa } from '../../../../src/core/domain/enums/tipoEmpresa'
import { FormaPagamento } from '../../../../src/core/domain/enums/formaPagamento'
import { DadosBancarios } from '../../../../src/core/domain/value-objects/dadosBancarios'

describe('Schedule', () => {
  let dadosValidos
  let responsavel
  let schedule

  beforeEach(() => {
    responsavel = new Pessoa('João', 'Silva', 'joao@email.com', '1122334455', '11999887766')

    dadosValidos = {
      nomeEmpresa: 'Limpeza Total',
      documentoEmpresa: '12.345.678/0001-90',
      telefoneComercial: '1122334455',
      emailComercial: 'contato@limpezatotal.com',
      tipoEmpresa: TipoEmpresa.LIMPEZA,
    }

    schedule = new Schedule(
      responsavel,
      dadosValidos.nomeEmpresa,
      dadosValidos.documentoEmpresa,
      dadosValidos.telefoneComercial,
      dadosValidos.emailComercial,
      dadosValidos.tipoEmpresa,
    )
  })

  describe('Construtor e Validações Básicas', () => {
    it('deve criar uma agenda com dados válidos', () => {
      expect(schedule.Responsavel).toBe(responsavel)
      expect(schedule.NomeEmpresa).toBe(dadosValidos.nomeEmpresa)
      expect(schedule.DocumentoEmpresa).toBe(dadosValidos.documentoEmpresa)
      expect(schedule.TipoEmpresa).toBe(dadosValidos.tipoEmpresa)
    })

    it('deve lançar erro ao criar agenda sem responsável válido', () => {
      expect(() => {
        new Schedule(
          null,
          dadosValidos.nomeEmpresa,
          dadosValidos.documentoEmpresa,
          dadosValidos.telefoneComercial,
          dadosValidos.emailComercial,
          dadosValidos.tipoEmpresa,
        )
      }).toThrow('Responsável deve ser uma instância de Pessoa')
    })

    it('deve lançar erro ao criar agenda com tipo de empresa inválido', () => {
      expect(() => {
        new Schedule(
          responsavel,
          dadosValidos.nomeEmpresa,
          dadosValidos.documentoEmpresa,
          dadosValidos.telefoneComercial,
          dadosValidos.emailComercial,
          'TIPO_INVALIDO',
        )
      }).toThrow('Tipo de empresa inválido')
    })
  })

  describe('Gestão de Endereço e Regiões', () => {
    it('deve definir endereço da empresa corretamente', () => {
      const endereco = new Endereco(
        'Rua Teste',
        '123',
        'Sala 1',
        'Centro',
        'São Paulo',
        'SP',
        '01234-567',
      )

      schedule.definirEnderecoEmpresa(endereco)
      expect(schedule.EnderecoEmpresa).toBe(endereco)
    })

    it('deve gerenciar regiões atendidas corretamente', () => {
      schedule.adicionarRegiaoAtendida('Zona Sul')
      schedule.adicionarRegiaoAtendida('Zona Norte')

      expect(schedule.RegioesAtendidas).toContain('Zona Sul')
      expect(schedule.RegioesAtendidas).toContain('Zona Norte')

      schedule.removerRegiaoAtendida('Zona Sul')
      expect(schedule.RegioesAtendidas).not.toContain('Zona Sul')
      expect(schedule.RegioesAtendidas).toHaveLength(1)
    })
  })

  describe('Gestão de Clientes, Imóveis e Colaboradores', () => {
    it('deve adicionar e remover clientes corretamente', () => {
      const cliente = new Cliente('Maria', 'Santos', 'maria@email.com', '1122334455', '11999887766')

      schedule.adicionarCliente(cliente)
      expect(schedule.Clientes).toContain(cliente)

      schedule.removerCliente(cliente.Id)
      expect(schedule.Clientes).not.toContain(cliente)
    })

    it('deve adicionar e remover imóveis corretamente', () => {
      const dono = new Pessoa('Maria', 'Santos', 'maria@email.com', '1122334455', '11999887766')
      const endereco = new Endereco(
        'Rua Teste',
        '123',
        'Apto 1',
        'Bairro Teste',
        'Cidade Teste',
        'Estado Teste',
        '12345-678',
      )
      const imovel = new Imovel(
        8, // total de cômodos
        3, // quartos
        2, // banheiros
        150, // área total
        endereco,
        dono,
        'Área verde', // observação
      )

      schedule.adicionarImovel(imovel)
      expect(schedule.Imoveis).toContain(imovel)

      schedule.removerImovel(imovel.Id)
      expect(schedule.Imoveis).not.toContain(imovel)
    })

    it('deve adicionar e remover colaboradores corretamente', () => {
      const colaborador = new Colaborador(
        'Pedro',
        'Silva',
        'pedro@email.com',
        '1122334455',
        '11999887766',
        '123456789',
        new Date(1990, 0, 1),
        'Brasileira',
        5000,
        'Integral',
      )

      schedule.adicionarColaborador(colaborador)
      expect(schedule.Colaboradores).toContain(colaborador)
      expect(schedule.QuantidadeFuncionarios).toBe(1)

      schedule.removerColaborador(colaborador.Id)
      expect(schedule.Colaboradores).not.toContain(colaborador)
      expect(schedule.QuantidadeFuncionarios).toBe(0)
    })
  })

  describe('Gestão de Pagamentos e Políticas', () => {
    it('deve definir política de cancelamento corretamente', () => {
      const politica = 'Cancelamento com 24h de antecedência'
      schedule.definirPoliticaCancelamento(politica)
      expect(schedule.PoliticaCancelamento).toBe(politica)
    })

    it('deve gerenciar formas de pagamento corretamente', () => {
      schedule.adicionarFormaPagamento(FormaPagamento.PIX)
      schedule.adicionarFormaPagamento(FormaPagamento.CARTAO_CREDITO)

      expect(schedule.FormasPagamentoAceitas).toContain(FormaPagamento.PIX)
      expect(schedule.FormasPagamentoAceitas).toContain(FormaPagamento.CARTAO_CREDITO)

      schedule.removerFormaPagamento(FormaPagamento.PIX)
      expect(schedule.FormasPagamentoAceitas).not.toContain(FormaPagamento.PIX)
      expect(schedule.FormasPagamentoAceitas).toHaveLength(1)
    })

    it('deve definir dados bancários corretamente', () => {
      const dadosBancarios = new DadosBancarios(
        'Banco do Brasil',
        '1234',
        '56789-0',
        'Corrente',
        'Limpeza Total LTDA',
        '12.345.678/0001-90',
      )

      schedule.definirDadosBancarios(dadosBancarios)
      expect(schedule.DadosBancarios).toBe(dadosBancarios)
    })
  })

  describe('Gestão de Logomarca', () => {
    let logomarcaValida

    beforeEach(() => {
      logomarcaValida = {
        url: 'https://exemplo.com/logo.png',
        tipo: 'png',
        tamanho: 1024 * 1024, // 1MB
      }
    })

    it('deve criar agenda com logomarca válida', () => {
      const scheduleComLogo = new Schedule(
        responsavel,
        dadosValidos.nomeEmpresa,
        dadosValidos.documentoEmpresa,
        dadosValidos.telefoneComercial,
        dadosValidos.emailComercial,
        dadosValidos.tipoEmpresa,
        logomarcaValida,
      )

      expect(scheduleComLogo.Logomarca).toMatchObject({
        url: logomarcaValida.url,
        tipo: logomarcaValida.tipo,
        tamanho: logomarcaValida.tamanho,
      })
      expect(scheduleComLogo.Logomarca.dataUpload).toBeTruthy()
    })

    it('deve aceitar definição de logomarca após criação', () => {
      schedule.definirLogomarca(logomarcaValida)

      expect(schedule.Logomarca).toMatchObject({
        url: logomarcaValida.url,
        tipo: logomarcaValida.tipo,
        tamanho: logomarcaValida.tamanho,
      })
      expect(schedule.Logomarca.dataUpload).toBeTruthy()
    })

    it('deve aceitar diferentes tipos de arquivo válidos', () => {
      const tiposValidos = ['png', 'jpg', 'jpeg', 'svg']

      tiposValidos.forEach((tipo) => {
        const logo = { ...logomarcaValida, tipo }
        expect(() => schedule.definirLogomarca(logo)).not.toThrow()
      })
    })

    it('deve rejeitar tipos de arquivo inválidos', () => {
      const tiposInvalidos = ['gif', 'bmp', 'tiff', 'pdf']

      tiposInvalidos.forEach((tipo) => {
        const logo = { ...logomarcaValida, tipo }
        expect(() => schedule.definirLogomarca(logo)).toThrow('Tipo de arquivo inválido')
      })
    })

    it('deve rejeitar arquivo maior que 5MB', () => {
      const logoGrande = {
        ...logomarcaValida,
        tamanho: 6 * 1024 * 1024, // 6MB
      }

      expect(() => schedule.definirLogomarca(logoGrande)).toThrow(
        'Tamanho do arquivo excede o limite',
      )
    })

    it('deve validar campos obrigatórios da logomarca', () => {
      const camposObrigatorios = ['url', 'tipo', 'tamanho']

      camposObrigatorios.forEach((campo) => {
        const logoInvalida = { ...logomarcaValida }
        delete logoInvalida[campo]
        expect(() => schedule.definirLogomarca(logoInvalida)).toThrow(
          'deve conter url, tipo e tamanho',
        )
      })
    })

    it('deve normalizar o tipo do arquivo para minúsculas', () => {
      const logoUpperCase = {
        ...logomarcaValida,
        tipo: 'PNG',
      }

      schedule.definirLogomarca(logoUpperCase)
      expect(schedule.Logomarca.tipo).toBe('png')
    })
  })
})
