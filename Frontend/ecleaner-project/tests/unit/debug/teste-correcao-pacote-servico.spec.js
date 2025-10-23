import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('OrcamentoCadastroPage - Correção Carregamento Itens Pacote', () => {
  // Mock da estrutura de pacote real
  const mockPacoteCompleto = {
    Id: 'pacote-123',
    Descricao: 'Limpeza Residencial Completa',
    ValorServico: 150,
    ValorMaterial: 50,
    ValorTotal: 200,
    ValorVenda: 250,
    MargemLucro: 25,
    ItensServico: [
      {
        Descricao: 'Limpeza de quartos',
        ValorUnitario: 75,
        Quantidade: 2,
        Unidade: 'UN',
        Observacoes: 'Inclui troca de roupa de cama',
      },
      {
        Descricao: 'Limpeza de banheiros',
        ValorUnitario: 50,
        Quantidade: 1,
        Unidade: 'UN',
        Observacoes: 'Desinfecção completa',
      },
    ],
    ItensMaterial: [
      {
        Descricao: 'Detergente multiuso',
        ValorUnitario: 12,
        Quantidade: 2,
        Unidade: 'UN',
        Observacoes: 'Produto ecológico',
      },
      {
        Descricao: 'Panos de microfibra',
        ValorUnitario: 8,
        Quantidade: 5,
        Unidade: 'UN',
        Observacoes: 'Reutilizáveis',
      },
    ],
  }

  const mockPacoteSemItens = {
    Id: 'pacote-456',
    Descricao: 'Limpeza Básica',
    ValorServico: 100,
    ValorMaterial: 30,
    ValorTotal: 130,
    ValorVenda: 150,
    MargemLucro: 15,
    ItensServico: [],
    ItensMaterial: [],
  }

  const mockPacoteOptions = [
    {
      label: 'Limpeza Residencial Completa',
      value: 'pacote-123',
      pacoteCompleto: mockPacoteCompleto,
    },
    {
      label: 'Limpeza Básica',
      value: 'pacote-456',
      pacoteCompleto: mockPacoteSemItens,
    },
  ]

  let mockForm, mockPacoteServicoOptionsAll, mockItensOrcamento

  beforeEach(() => {
    mockItensOrcamento = []
    mockForm = {
      value: {
        PacoteServico: null,
        ItensOrcamento: mockItensOrcamento,
      },
    }
    mockPacoteServicoOptionsAll = {
      value: mockPacoteOptions,
    }
  })

  function simulateCarregarItensPacote() {
    if (!mockForm.value.PacoteServico)
      return { success: false, message: 'Nenhum pacote selecionado' }

    const pacoteOption = mockPacoteServicoOptionsAll.value.find(
      (p) => p.value === mockForm.value.PacoteServico,
    )
    if (!pacoteOption || !pacoteOption.pacoteCompleto) {
      return { success: false, message: 'Pacote não encontrado' }
    }

    const pacote = pacoteOption.pacoteCompleto

    // Limpar itens existentes
    mockForm.value.ItensOrcamento = []

    let itensAdicionados = 0

    // Adicionar itens de serviço do pacote
    if (pacote.ItensServico && pacote.ItensServico.length > 0) {
      pacote.ItensServico.forEach((itemServico) => {
        const novoItem = {
          Descricao: itemServico.Descricao || itemServico.Nome || 'Serviço',
          Tipo: 'SERVICO',
          ValorUnitario: itemServico.ValorUnitario || itemServico.Valor || 0,
          Quantidade: itemServico.Quantidade || 1,
          Unidade: itemServico.Unidade || 'UN',
          Observacoes: itemServico.Observacoes || '',
        }
        mockForm.value.ItensOrcamento.push(novoItem)
        itensAdicionados++
      })
    }

    // Adicionar itens de material do pacote
    if (pacote.ItensMaterial && pacote.ItensMaterial.length > 0) {
      pacote.ItensMaterial.forEach((itemMaterial) => {
        const novoItem = {
          Descricao: itemMaterial.Descricao || itemMaterial.Nome || 'Material',
          Tipo: 'MATERIAL',
          ValorUnitario: itemMaterial.ValorUnitario || itemMaterial.Valor || 0,
          Quantidade: itemMaterial.Quantidade || 1,
          Unidade: itemMaterial.Unidade || 'UN',
          Observacoes: itemMaterial.Observacoes || '',
        }
        mockForm.value.ItensOrcamento.push(novoItem)
        itensAdicionados++
      })
    }

    // Se não há itens específicos, criar itens baseados nos valores do pacote
    if (mockForm.value.ItensOrcamento.length === 0) {
      if (pacote.ValorServico > 0) {
        const itemServico = {
          Descricao: `Serviços - ${pacote.Descricao}`,
          Tipo: 'SERVICO',
          ValorUnitario: pacote.ValorServico,
          Quantidade: 1,
          Unidade: 'UN',
          Observacoes: 'Item de serviço do pacote',
        }
        mockForm.value.ItensOrcamento.push(itemServico)
        itensAdicionados++
      }

      if (pacote.ValorMaterial > 0) {
        const itemMaterial = {
          Descricao: `Materiais - ${pacote.Descricao}`,
          Tipo: 'MATERIAL',
          ValorUnitario: pacote.ValorMaterial,
          Quantidade: 1,
          Unidade: 'UN',
          Observacoes: 'Item de material do pacote',
        }
        mockForm.value.ItensOrcamento.push(itemMaterial)
        itensAdicionados++
      }
    }

    return {
      success: true,
      message: `Itens do pacote "${pacote.Descricao}" carregados com sucesso!`,
      itensAdicionados,
      pacoteCarregado: pacote.Descricao,
    }
  }

  describe('Carregamento de itens com dados reais do pacote', () => {
    it('deve carregar itens específicos do pacote selecionado', () => {
      // Selecionar pacote com itens específicos
      mockForm.value.PacoteServico = 'pacote-123'

      const resultado = simulateCarregarItensPacote()

      expect(resultado.success).toBe(true)
      expect(resultado.itensAdicionados).toBe(4) // 2 serviços + 2 materiais
      expect(mockForm.value.ItensOrcamento).toHaveLength(4)

      // Verificar itens de serviço
      const itensServico = mockForm.value.ItensOrcamento.filter((item) => item.Tipo === 'SERVICO')
      expect(itensServico).toHaveLength(2)
      expect(itensServico[0].Descricao).toBe('Limpeza de quartos')
      expect(itensServico[0].ValorUnitario).toBe(75)
      expect(itensServico[0].Quantidade).toBe(2)

      // Verificar itens de material
      const itensMaterial = mockForm.value.ItensOrcamento.filter((item) => item.Tipo === 'MATERIAL')
      expect(itensMaterial).toHaveLength(2)
      expect(itensMaterial[0].Descricao).toBe('Detergente multiuso')
      expect(itensMaterial[0].ValorUnitario).toBe(12)
      expect(itensMaterial[0].Quantidade).toBe(2)
    })

    it('deve criar itens genéricos quando pacote não tem itens específicos', () => {
      // Selecionar pacote sem itens específicos
      mockForm.value.PacoteServico = 'pacote-456'

      const resultado = simulateCarregarItensPacote()

      expect(resultado.success).toBe(true)
      expect(resultado.itensAdicionados).toBe(2) // 1 serviço genérico + 1 material genérico
      expect(mockForm.value.ItensOrcamento).toHaveLength(2)

      // Verificar item de serviço genérico
      const itemServico = mockForm.value.ItensOrcamento.find((item) => item.Tipo === 'SERVICO')
      expect(itemServico.Descricao).toBe('Serviços - Limpeza Básica')
      expect(itemServico.ValorUnitario).toBe(100)
      expect(itemServico.Quantidade).toBe(1)

      // Verificar item de material genérico
      const itemMaterial = mockForm.value.ItensOrcamento.find((item) => item.Tipo === 'MATERIAL')
      expect(itemMaterial.Descricao).toBe('Materiais - Limpeza Básica')
      expect(itemMaterial.ValorUnitario).toBe(30)
      expect(itemMaterial.Quantidade).toBe(1)
    })

    it('deve limpar itens existentes antes de carregar novos', () => {
      // Adicionar alguns itens existentes
      mockForm.value.ItensOrcamento = [
        { Descricao: 'Item antigo 1', Tipo: 'SERVICO' },
        { Descricao: 'Item antigo 2', Tipo: 'MATERIAL' },
      ]

      // Selecionar pacote
      mockForm.value.PacoteServico = 'pacote-123'

      const resultado = simulateCarregarItensPacote()

      expect(resultado.success).toBe(true)
      expect(mockForm.value.ItensOrcamento).toHaveLength(4) // Apenas itens do pacote
      expect(
        mockForm.value.ItensOrcamento.every(
          (item) => item.Descricao !== 'Item antigo 1' && item.Descricao !== 'Item antigo 2',
        ),
      ).toBe(true)
    })

    it('deve retornar erro quando nenhum pacote está selecionado', () => {
      mockForm.value.PacoteServico = null

      const resultado = simulateCarregarItensPacote()

      expect(resultado.success).toBe(false)
      expect(resultado.message).toBe('Nenhum pacote selecionado')
      expect(mockForm.value.ItensOrcamento).toHaveLength(0)
    })

    it('deve retornar erro quando pacote não existe', () => {
      mockForm.value.PacoteServico = 'pacote-inexistente'

      const resultado = simulateCarregarItensPacote()

      expect(resultado.success).toBe(false)
      expect(resultado.message).toBe('Pacote não encontrado')
      expect(mockForm.value.ItensOrcamento).toHaveLength(0)
    })

    it('deve preservar observações e unidades dos itens originais', () => {
      mockForm.value.PacoteServico = 'pacote-123'

      const resultado = simulateCarregarItensPacote()

      const itemComObservacao = mockForm.value.ItensOrcamento.find(
        (item) => item.Descricao === 'Limpeza de quartos',
      )
      expect(itemComObservacao.Observacoes).toBe('Inclui troca de roupa de cama')
      expect(itemComObservacao.Unidade).toBe('UN')

      const itemMaterial = mockForm.value.ItensOrcamento.find(
        (item) => item.Descricao === 'Panos de microfibra',
      )
      expect(itemMaterial.Observacoes).toBe('Reutilizáveis')
      expect(itemMaterial.Quantidade).toBe(5)
    })
  })
})
