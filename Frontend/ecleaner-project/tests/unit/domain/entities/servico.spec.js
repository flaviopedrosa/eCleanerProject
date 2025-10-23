import { describe, it, expect } from 'vitest'
import { Servico } from '@/core/domain/entities/servico'

describe('Servico', () => {
  it('deve criar uma instância de Servico com os dados corretos', () => {
    const servico = new Servico(
      'Instalação de Porcelanato',
      'Instalação profissional de porcelanato em ambiente residencial',
      85.5,
      'Metro Quadrado',
      'O valor não inclui o material, apenas a mão de obra.',
    )

    expect(servico.Id).toBeDefined()
    expect(servico.Nome).toBe('Instalação de Porcelanato')
    expect(servico.Descricao).toBe('Instalação profissional de porcelanato em ambiente residencial')
    expect(servico.Valor).toBe(85.5)
    expect(servico.Unidade).toBe('Metro Quadrado')
    expect(servico.Observacao).toBe('O valor não inclui o material, apenas a mão de obra.')
    expect(servico.Ativo).toBe(true)
    expect(servico.CriadoEm).toBeDefined()
    expect(servico.AtualizadoEm).toBeDefined()
  })

  it('deve permitir a formatação do valor em moeda', () => {
    const servico = new Servico(
      'Consultoria de TI',
      'Consultoria especializada em tecnologia da informação',
      250.0,
      'Hora',
      'Mínimo de 2 horas para visita técnica.',
    )

    expect(servico.Valor.toFixed(2)).toBe('250.00')
  })

  it('deve criar uma instância com observação opcional', () => {
    const servico = new Servico(
      'Limpeza Básica',
      'Serviço de limpeza básica para ambientes residenciais',
      100.0,
      'Hora',
    )

    expect(servico.Id).toBeDefined()
    expect(servico.Nome).toBe('Limpeza Básica')
    expect(servico.Descricao).toBe('Serviço de limpeza básica para ambientes residenciais')
    expect(servico.Valor).toBe(100.0)
    expect(servico.Unidade).toBe('Hora')
    expect(servico.Observacao).toBe('')
    expect(servico.Ativo).toBe(true)
  })

  it('deve validar dados obrigatórios', () => {
    const servicoValido = new Servico(
      'Limpeza Comercial',
      'Limpeza profissional para escritórios e estabelecimentos',
      150.0,
      'M²',
      'Inclui todos os materiais',
    )

    const validacao = servicoValido.isValid()
    expect(validacao.valido).toBe(true)
    expect(validacao.erros).toHaveLength(0)
  })

  it('deve calcular valor com desconto', () => {
    const servico = new Servico(
      'Pintura Residencial',
      'Pintura completa de ambientes residenciais',
      200.0,
      'M²',
    )

    const valorComDesconto = servico.calcularValorComDesconto(10)
    expect(valorComDesconto).toBe(180.0)
  })

  it('deve serializar para JSON corretamente', () => {
    const servico = new Servico(
      'Jardinagem',
      'Serviço completo de jardinagem e paisagismo',
      75.0,
      'Hora',
      'Inclui poda, limpeza e manutenção',
    )

    const json = servico.toJSON()

    expect(json.Id).toBeDefined()
    expect(json.Nome).toBe('Jardinagem')
    expect(json.Descricao).toBe('Serviço completo de jardinagem e paisagismo')
    expect(json.Valor).toBe(75.0)
    expect(json.Unidade).toBe('Hora')
    expect(json.Observacao).toBe('Inclui poda, limpeza e manutenção')
    expect(json.Ativo).toBe(true)
    expect(json.CriadoEm).toBeDefined()
    expect(json.AtualizadoEm).toBeDefined()

    // Verificar que propriedades removidas não estão presentes
    expect(json.CustoUnitario).toBeUndefined()
    expect(json.Categoria).toBeUndefined()
  })
})
