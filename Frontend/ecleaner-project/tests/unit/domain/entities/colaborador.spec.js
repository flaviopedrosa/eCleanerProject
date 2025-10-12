import { describe, it, expect, beforeEach } from 'vitest'
import { Colaborador } from '@/core/domain/entities/colaborador'
import { Endereco } from '@/core/domain/entities/endereco'
import {
  DocumentoAdicional,
  ExperienciaProfissional,
  Referencia,
} from '@/core/domain/entities/documentosColaborador'
import { StatusColaborador } from '@/core/domain/enums/statusColaborador'

describe('Colaborador', () => {
  let dadosValidos

  beforeEach(() => {
    dadosValidos = {
      nome: 'João',
      sobrenome: 'Silva',
      email: 'joao@email.com',
      telefone: '1122334455',
      celular: '11999887766',
      documentoIdentidade: '123456789',
      dataNascimento: new Date(1990, 0, 1), // 1 de Janeiro de 1990
      nacionalidade: 'Brasileira',
      salarioEsperado: 5000,
      disponibilidade: 'Integral',
      regioesAtuacao: ['Zona Sul', 'Zona Oeste'],
      observacoes: 'Observações de teste',
    }
  })

  describe('Construtor e Validações Básicas', () => {
    it('deve criar um colaborador com dados válidos', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
        dadosValidos.regioesAtuacao,
        dadosValidos.observacoes,
      )

      expect(colaborador.Nome).toBe(dadosValidos.nome)
      expect(colaborador.DocumentoIdentidade).toBe(dadosValidos.documentoIdentidade)
      expect(colaborador.Status).toBe(StatusColaborador.EM_ANALISE)
    })

    it('deve lançar erro ao criar colaborador sem documento de identidade', () => {
      expect(() => {
        new Colaborador(
          dadosValidos.nome,
          dadosValidos.sobrenome,
          dadosValidos.email,
          dadosValidos.telefone,
          dadosValidos.celular,
          null,
          dadosValidos.dataNascimento,
          dadosValidos.nacionalidade,
          dadosValidos.salarioEsperado,
          dadosValidos.disponibilidade,
        )
      }).toThrow('Documento de identidade é obrigatório')
    })

    it('deve lançar erro ao criar colaborador com salário esperado inválido', () => {
      expect(() => {
        new Colaborador(
          dadosValidos.nome,
          dadosValidos.sobrenome,
          dadosValidos.email,
          dadosValidos.telefone,
          dadosValidos.celular,
          dadosValidos.documentoIdentidade,
          dadosValidos.dataNascimento,
          dadosValidos.nacionalidade,
          -100,
          dadosValidos.disponibilidade,
        )
      }).toThrow('Salário esperado deve ser um valor positivo')
    })
  })

  describe('Endereço', () => {
    it('deve definir endereço residencial corretamente', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      const endereco = new Endereco(
        'Rua Teste',
        '123',
        'Apto 1',
        'Bairro Teste',
        'Cidade Teste',
        'Estado Teste',
        '12345-678',
      )

      colaborador.definirEnderecoResidencial(endereco)
      expect(colaborador.Enderecos[0]).toBe(endereco)
    })

    it('deve lançar erro ao definir endereço inválido', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      expect(() => {
        colaborador.definirEnderecoResidencial({}) // Objeto inválido
      }).toThrow('O endereço fornecido não é uma instância válida da classe Endereco')
    })
  })

  describe('Experiências e Referências', () => {
    let colaborador

    beforeEach(() => {
      colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )
    })

    it('deve adicionar experiência profissional corretamente', () => {
      const experiencia = new ExperienciaProfissional(
        'Empresa Teste',
        'Cargo Teste',
        new Date(2020, 0, 1),
        new Date(2021, 0, 1),
        'Atividades de teste',
      )

      colaborador.adicionarExperienciaProfissional(experiencia)
      expect(colaborador.ExperienciasProfissionais).toContain(experiencia)
    })

    it('deve adicionar referência corretamente', () => {
      const referencia = new Referencia(
        'Nome Referência',
        'Empresa Teste',
        'Cargo Teste',
        'telefone@teste.com',
        '1122334455',
      )

      colaborador.adicionarReferencia(referencia)
      expect(colaborador.Referencias).toContain(referencia)
    })

    it('deve adicionar documento adicional corretamente', () => {
      const documento = new DocumentoAdicional(
        'Certificado',
        'Descrição do certificado',
        'url-do-documento',
      )

      colaborador.adicionarDocumento(documento)
      expect(colaborador.DocumentosAdicionais).toContain(documento)
    })
  })

  describe('Gestão do Vínculo', () => {
    it('deve registrar início de vínculo corretamente', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      const dataInicio = new Date()
      colaborador.registrarInicioVinculo(dataInicio)

      expect(colaborador.DataInicioVinculo).toBe(dataInicio)
      expect(colaborador.Status).toBe(StatusColaborador.EM_EXPERIENCIA)
    })

    it('deve registrar fim de vínculo corretamente', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      const dataInicio = new Date(2022, 0, 1)
      const dataFim = new Date(2023, 0, 1)

      colaborador.registrarInicioVinculo(dataInicio)
      colaborador.registrarFimVinculo(dataFim)

      expect(colaborador.DataFimVinculo).toBe(dataFim)
      expect(colaborador.Status).toBe(StatusColaborador.DESLIGADO)
    })

    it('deve lançar erro ao registrar fim de vínculo antes do início', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      const dataInicio = new Date(2022, 0, 1)
      const dataFimInvalida = new Date(2021, 0, 1)

      colaborador.registrarInicioVinculo(dataInicio)

      expect(() => {
        colaborador.registrarFimVinculo(dataFimInvalida)
      }).toThrow('Data de fim deve ser posterior à data de início')
    })
  })

  describe('Cálculos e Getters', () => {
    it('deve calcular idade corretamente', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        new Date(1990, 0, 1), // 1 de Janeiro de 1990
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      const anoAtual = new Date().getFullYear()
      const idadeEsperada = anoAtual - 1990

      // Ajusta para o caso onde ainda não chegou o aniversário no ano atual
      const mesAtual = new Date().getMonth()
      const diaAtual = new Date().getDate()
      const ajusteIdade = mesAtual < 0 || (mesAtual === 0 && diaAtual < 1) ? 1 : 0

      expect(colaborador.Idade).toBe(idadeEsperada - ajusteIdade)
    })

    it('deve calcular tempo total de experiência corretamente', () => {
      const colaborador = new Colaborador(
        dadosValidos.nome,
        dadosValidos.sobrenome,
        dadosValidos.email,
        dadosValidos.telefone,
        dadosValidos.celular,
        dadosValidos.documentoIdentidade,
        dadosValidos.dataNascimento,
        dadosValidos.nacionalidade,
        dadosValidos.salarioEsperado,
        dadosValidos.disponibilidade,
      )

      // Adiciona duas experiências
      const exp1 = new ExperienciaProfissional(
        'Empresa 1',
        'Cargo 1',
        new Date(2020, 0, 1),
        new Date(2021, 0, 1), // 12 meses
        'Atividades 1',
      )

      const exp2 = new ExperienciaProfissional(
        'Empresa 2',
        'Cargo 2',
        new Date(2021, 0, 1),
        new Date(2021, 6, 1), // 6 meses
        'Atividades 2',
      )

      colaborador.adicionarExperienciaProfissional(exp1)
      colaborador.adicionarExperienciaProfissional(exp2)

      expect(colaborador.TempoTotalExperiencia).toBe(18) // 12 + 6 = 18 meses
    })
  })
})
