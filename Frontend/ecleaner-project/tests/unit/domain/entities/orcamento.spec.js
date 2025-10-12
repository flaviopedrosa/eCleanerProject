import { describe, it, expect, beforeEach } from 'vitest'
import { Orcamento } from '@/core/domain/entities/orcamento'
import { Cliente } from '@/core/domain/entities/cliente'
import { Imovel } from '@/core/domain/entities/imovel'
import { PacoteServico } from '@/core/domain/entities/pacoteServico'
import { ItemServico } from '@/core/domain/entities/itemServico'
import { ItemMaterial } from '@/core/domain/entities/itemMaterial'
import { Servico } from '@/core/domain/entities/servico'
import { Material } from '@/core/domain/entities/material'
import { Pessoa } from '@/core/domain/entities/pessoa'
import { Endereco } from '@/core/domain/entities/endereco'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'

describe('Orcamento', () => {
  let cliente
  let imovel
  let pacoteServico
  let servico
  let material

  beforeEach(() => {
    cliente = new Cliente('João', 'Silva', 'joao.silva@email.com', '11987654321', '1122334455')

    const endereco = new Endereco(
      'Residência',
      'Rua das Flores',
      '123',
      'Centro',
      'São Paulo',
      'SP',
      '01234-567',
    )

    const dono = new Pessoa(
      'Maria',
      'Santos',
      'maria.santos@email.com',
      '11987654321',
      '1122334455',
    )

    imovel = new Imovel(8, 3, 2, 150, endereco, dono)

    servico = new Servico('Limpeza Geral', 100)
    material = new Material('Produto de Limpeza', 50, 'UN')
    pacoteServico = new PacoteServico('Pacote Básico', 'Limpeza completa')
  })

  it('deve criar uma instância de Orçamento com os dados corretos e itens do pacote', () => {
    // Adiciona itens ao pacote de serviço
    const itemServico = new ItemServico(servico, 1, 100)
    const itemMaterial = new ItemMaterial(material, 2, 50)
    pacoteServico.adicionarItemServico(itemServico)
    pacoteServico.adicionarItemMaterial(itemMaterial)

    const orcamento = new Orcamento(
      1,
      cliente,
      imovel,
      pacoteServico,
      'Semanal',
      2,
      4,
      10,
      5,
      new Date('2024-12-31'),
    )

    expect(orcamento.Id).toBeDefined()
    expect(orcamento.NumeroOrcamento).toBe(1)
    expect(orcamento.DataEmissao).toBeInstanceOf(Date)
    expect(orcamento.Cliente).toBe(cliente)
    expect(orcamento.Imovel).toBe(imovel)
    expect(orcamento.PacoteServico).toBe(pacoteServico)
    expect(orcamento.FrequenciaDesejada).toBe('Semanal')
    expect(orcamento.QuantidadeProfissionais).toBe(2)
    expect(orcamento.EstimativaHoras).toBe(4)
    expect(orcamento.Descontos).toBe(10)
    expect(orcamento.ImpostosTaxas).toBe(5)
    expect(orcamento.Validade).toEqual(new Date('2024-12-31'))
    expect(orcamento.Status).toBe(StatusOrcamento.RASCUNHO)

    // Verifica se os itens do pacote foram adicionados
    expect(orcamento.ItensServico).toHaveLength(1)
    expect(orcamento.ItensServico[0]).toBe(itemServico)
    expect(orcamento.ItensMaterial).toHaveLength(1)
    expect(orcamento.ItensMaterial[0]).toBe(itemMaterial)
  })

  it('deve criar um orçamento com valores padrão e herdar itens do pacote', () => {
    // Adiciona itens ao pacote de serviço
    const itemServico = new ItemServico(servico, 1, 100)
    const itemMaterial = new ItemMaterial(material, 2, 50)
    pacoteServico.adicionarItemServico(itemServico)
    pacoteServico.adicionarItemMaterial(itemMaterial)

    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    expect(orcamento.Descontos).toBe(0)
    expect(orcamento.ImpostosTaxas).toBe(0)
    expect(orcamento.Validade).toBeInstanceOf(Date)

    // Verifica se os itens do pacote foram adicionados
    expect(orcamento.ItensServico).toHaveLength(1)
    expect(orcamento.ItensServico[0]).toBe(itemServico)
    expect(orcamento.ItensMaterial).toHaveLength(1)
    expect(orcamento.ItensMaterial[0]).toBe(itemMaterial)
  })

  it('deve adicionar e remover itens de serviço', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemServico = new ItemServico(servico, 1, 100)

    orcamento.adicionarItemServico(itemServico)
    expect(orcamento.ItensServico).toHaveLength(1)
    expect(orcamento.ItensServico[0]).toBe(itemServico)

    orcamento.removerItemServico(itemServico)
    expect(orcamento.ItensServico).toHaveLength(0)
  })

  it('deve adicionar e remover itens de material', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemMaterial = new ItemMaterial(material, 2, 50)

    orcamento.adicionarItemMaterial(itemMaterial)
    expect(orcamento.ItensMaterial).toHaveLength(1)
    expect(orcamento.ItensMaterial[0]).toBe(itemMaterial)

    orcamento.removerItemMaterial(itemMaterial)
    expect(orcamento.ItensMaterial).toHaveLength(0)
  })

  it('deve calcular corretamente o subtotal', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemServico = new ItemServico(servico, 1, 100)
    const itemMaterial = new ItemMaterial(material, 2, 50)

    orcamento.adicionarItemServico(itemServico)
    orcamento.adicionarItemMaterial(itemMaterial)

    // 1 serviço x 100 + 2 materiais x 50 = 200
    expect(orcamento.Subtotal).toBe(200)
  })

  it('deve calcular corretamente o valor total', () => {
    const orcamento = new Orcamento(
      1,
      cliente,
      imovel,
      pacoteServico,
      'Semanal',
      2,
      4,
      20, // desconto
      10, // impostos
    )
    const itemServico = new ItemServico(servico, 1, 100)
    const itemMaterial = new ItemMaterial(material, 2, 50)

    orcamento.adicionarItemServico(itemServico)
    orcamento.adicionarItemMaterial(itemMaterial)

    // subtotal (200) - desconto (20) + impostos (10) = 190
    expect(orcamento.ValorTotal).toBe(190)
  })

  it('deve identificar corretamente quando está expirado', () => {
    const dataPassada = new Date()
    dataPassada.setDate(dataPassada.getDate() - 1) // ontem

    const orcamento = new Orcamento(
      1,
      cliente,
      imovel,
      pacoteServico,
      'Semanal',
      2,
      4,
      0,
      0,
      dataPassada,
    )

    expect(orcamento.EstaExpirado).toBe(true)
  })

  it('deve atualizar o status corretamente', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    orcamento.atualizarStatus(StatusOrcamento.ENVIADO)
    expect(orcamento.Status).toBe(StatusOrcamento.ENVIADO)

    orcamento.atualizarStatus(StatusOrcamento.APROVADO)
    expect(orcamento.Status).toBe(StatusOrcamento.APROVADO)
  })

  it('não deve aceitar um status inválido', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    expect(() => orcamento.atualizarStatus('STATUS_INVALIDO')).toThrow('Status inválido')
  })

  it('não deve aceitar cliente inválido', () => {
    expect(
      () => new Orcamento(1, { nome: 'Cliente Inválido' }, imovel, pacoteServico, 'Semanal', 2, 4),
    ).toThrow('O cliente fornecido não é uma instância válida da classe Cliente')
  })

  it('não deve aceitar imóvel inválido', () => {
    expect(
      () =>
        new Orcamento(
          1,
          cliente,
          { endereco: 'Endereço Inválido' },
          pacoteServico,
          'Semanal',
          2,
          4,
        ),
    ).toThrow('O imóvel fornecido não é uma instância válida da classe Imovel')
  })

  it('não deve aceitar pacote de serviço inválido', () => {
    expect(
      () => new Orcamento(1, cliente, imovel, { nome: 'Pacote Inválido' }, 'Semanal', 2, 4),
    ).toThrow('O pacote de serviço fornecido não é uma instância válida da classe PacoteServico')
  })

  it('não deve aceitar item de serviço inválido', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    expect(() => orcamento.adicionarItemServico({ descricao: 'Serviço Inválido' })).toThrow(
      'O item fornecido não é uma instância válida da classe ItemServico',
    )
  })

  it('não deve aceitar item de material inválido', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    expect(() => orcamento.adicionarItemMaterial({ descricao: 'Material Inválido' })).toThrow(
      'O item fornecido não é uma instância válida da classe ItemMaterial',
    )
  })

  it('deve limpar itens existentes ao definir novo pacote de serviço', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    // Adiciona itens avulsos ao orçamento
    const itemServicoAvulso = new ItemServico(servico, 2, 200)
    const itemMaterialAvulso = new ItemMaterial(material, 3, 75)
    orcamento.adicionarItemServico(itemServicoAvulso)
    orcamento.adicionarItemMaterial(itemMaterialAvulso)

    // Cria novo pacote com itens diferentes
    const novoPacote = new PacoteServico('Pacote Premium', 'Limpeza premium')
    const novoItemServico = new ItemServico(servico, 1, 150)
    const novoItemMaterial = new ItemMaterial(material, 1, 60)
    novoPacote.adicionarItemServico(novoItemServico)
    novoPacote.adicionarItemMaterial(novoItemMaterial)

    // Define o novo pacote
    orcamento.definirPacoteServico(novoPacote)

    // Verifica se os itens antigos foram substituídos pelos novos
    expect(orcamento.PacoteServico).toBe(novoPacote)
    expect(orcamento.ItensServico).toHaveLength(1)
    expect(orcamento.ItensServico[0]).toBe(novoItemServico)
    expect(orcamento.ItensMaterial).toHaveLength(1)
    expect(orcamento.ItensMaterial[0]).toBe(novoItemMaterial)
  })
})
