import { describe, it, expect, beforeEach } from 'vitest'
import { Orcamento } from '@/core/domain/entities/orcamento'
import { Cliente } from '@/core/domain/entities/cliente'
import { Imovel } from '@/core/domain/entities/imovel'
import { PacoteServico } from '@/core/domain/entities/pacoteServico'
import { ItemServico } from '@/core/domain/entities/itemServico'
import { ItemMaterial } from '@/core/domain/entities/itemMaterial'
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'
import { TipoItemOrcamento } from '@/core/domain/enums/tipoItemOrcamento'
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

    servico = new Servico('Limpeza Geral', 100, 'UN', 'Serviço de limpeza completa')
    material = new Material('Produto de Limpeza', 'UN', 50)
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

    // Verifica se os itens do pacote foram convertidos para ItemOrcamento
    expect(orcamento.Itens).toHaveLength(2)
    expect(orcamento.obterItensServico()).toHaveLength(1)
    expect(orcamento.obterItensMaterial()).toHaveLength(1)

    const itemServicoConvertido = orcamento.obterItensServico()[0]
    expect(itemServicoConvertido).toBeInstanceOf(ItemOrcamento)
    expect(itemServicoConvertido.Tipo).toBe(TipoItemOrcamento.SERVICO)
    expect(itemServicoConvertido.Descricao).toBe(servico.Descricao)

    const itemMaterialConvertido = orcamento.obterItensMaterial()[0]
    expect(itemMaterialConvertido).toBeInstanceOf(ItemOrcamento)
    expect(itemMaterialConvertido.Tipo).toBe(TipoItemOrcamento.MATERIAL)
    expect(itemMaterialConvertido.Descricao).toBe(material.Descricao)
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

    // Verifica se os itens do pacote foram convertidos para ItemOrcamento
    expect(orcamento.Itens).toHaveLength(2)
    expect(orcamento.obterItensServico()).toHaveLength(1)
    expect(orcamento.obterItensMaterial()).toHaveLength(1)
  })

  it('deve adicionar e remover itens', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemOrcamento = new ItemOrcamento(
      'Limpeza Extra',
      TipoItemOrcamento.SERVICO,
      100,
      1,
      'UN',
      'Serviço adicional',
    )

    orcamento.adicionarItem(itemOrcamento)
    expect(orcamento.Itens).toHaveLength(1)
    expect(orcamento.Itens[0]).toBe(itemOrcamento)

    orcamento.removerItem(itemOrcamento)
    expect(orcamento.Itens).toHaveLength(0)
  })

  it('deve filtrar itens por tipo', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemServico = new ItemOrcamento(
      'Limpeza Extra',
      TipoItemOrcamento.SERVICO,
      100,
      1,
      'UN',
      'Serviço adicional',
    )
    const itemMaterial = new ItemOrcamento(
      'Detergente Extra',
      TipoItemOrcamento.MATERIAL,
      50,
      2,
      'UN',
      'Material adicional',
    )

    orcamento.adicionarItem(itemServico)
    orcamento.adicionarItem(itemMaterial)

    expect(orcamento.obterItensServico()).toHaveLength(1)
    expect(orcamento.obterItensServico()[0]).toBe(itemServico)
    expect(orcamento.obterItensMaterial()).toHaveLength(1)
    expect(orcamento.obterItensMaterial()[0]).toBe(itemMaterial)
  })

  it('deve calcular corretamente os subtotais', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)
    const itemServico = new ItemOrcamento('Limpeza Extra', TipoItemOrcamento.SERVICO, 100, 1, 'UN')
    const itemMaterial = new ItemOrcamento(
      'Detergente Extra',
      TipoItemOrcamento.MATERIAL,
      50,
      2,
      'UN',
    )

    orcamento.adicionarItem(itemServico)
    orcamento.adicionarItem(itemMaterial)

    // 1 serviço x 100 + 2 materiais x 50 = 200
    expect(orcamento.Subtotal).toBe(200)
    expect(orcamento.SubtotalServicos).toBe(100)
    expect(orcamento.SubtotalMateriais).toBe(100)
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
    const itemServico = new ItemOrcamento('Limpeza Extra', TipoItemOrcamento.SERVICO, 100, 1, 'UN')
    const itemMaterial = new ItemOrcamento(
      'Detergente Extra',
      TipoItemOrcamento.MATERIAL,
      50,
      2,
      'UN',
    )

    orcamento.adicionarItem(itemServico)
    orcamento.adicionarItem(itemMaterial)

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

  it('não deve aceitar item inválido', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    expect(() => orcamento.adicionarItem({ descricao: 'Item Inválido' })).toThrow(
      'O item fornecido não é uma instância válida da classe ItemOrcamento',
    )
  })

  it('deve limpar itens existentes ao definir novo pacote de serviço', () => {
    const orcamento = new Orcamento(1, cliente, imovel, pacoteServico, 'Semanal', 2, 4)

    // Adiciona itens avulsos ao orçamento
    const itemServicoAvulso = new ItemOrcamento(
      'Serviço Avulso',
      TipoItemOrcamento.SERVICO,
      200,
      2,
      'UN',
    )
    const itemMaterialAvulso = new ItemOrcamento(
      'Material Avulso',
      TipoItemOrcamento.MATERIAL,
      75,
      3,
      'UN',
    )
    orcamento.adicionarItem(itemServicoAvulso)
    orcamento.adicionarItem(itemMaterialAvulso)

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
    expect(orcamento.Itens).toHaveLength(2) // Apenas os itens do novo pacote
    expect(orcamento.obterItensServico()).toHaveLength(1)
    expect(orcamento.obterItensMaterial()).toHaveLength(1)

    // Verifica se os itens foram convertidos corretamente
    const itemServicoConvertido = orcamento.obterItensServico()[0]
    expect(itemServicoConvertido.Descricao).toBe(servico.Descricao)
    expect(itemServicoConvertido.Custo).toBe(servico.Valor) // 100

    const itemMaterialConvertido = orcamento.obterItensMaterial()[0]
    expect(itemMaterialConvertido.Descricao).toBe(material.Descricao)
    expect(itemMaterialConvertido.Custo).toBe(60) // ItemMaterial.CustoUnitario
  })
})
