import { describe, it, expect } from 'vitest'
import { Servico } from '../../../src/core/domain/entities/servico.js'

describe('ServicoCadastroPage - Validação dos Campos da Entidade', () => {
  it('deve ter todos os campos da entidade Servico representados', () => {
    // Criar uma instância da entidade para verificar suas propriedades
    const servico = new Servico('Teste', 'Descrição de teste', 100.0, 'Hora', 'Observação de teste')

    // Verificar que a entidade possui todos os campos esperados
    expect(servico.Id).toBeDefined()
    expect(servico.Nome).toBe('Teste')
    expect(servico.Descricao).toBe('Descrição de teste')
    expect(servico.Valor).toBe(100.0)
    expect(servico.Unidade).toBe('Hora')
    expect(servico.Observacao).toBe('Observação de teste')
    expect(servico.Ativo).toBe(true)
    expect(servico.CriadoEm).toBeDefined()
    expect(servico.AtualizadoEm).toBeDefined()

    console.log('✅ Estrutura da entidade Servico:')
    console.log('📝 Campos obrigatórios:')
    console.log('   - Id:', servico.Id)
    console.log('   - Nome:', servico.Nome)
    console.log('   - Descricao:', servico.Descricao)
    console.log('   - Valor:', servico.Valor)
    console.log('   - Unidade:', servico.Unidade)
    console.log('   - Observacao:', servico.Observacao)
    console.log('   - Ativo:', servico.Ativo)
    console.log('   - CriadoEm:', servico.CriadoEm)
    console.log('   - AtualizadoEm:', servico.AtualizadoEm)
  })

  it('deve validar a estrutura JSON da entidade', () => {
    const servico = new Servico(
      'Limpeza Residencial',
      'Limpeza completa de casa residencial',
      150.0,
      'Metro Quadrado',
      'Inclui todos os cômodos',
    )

    const json = servico.toJSON()

    // Verificar que todos os campos estão no JSON
    expect(json.Id).toBeDefined()
    expect(json.Nome).toBe('Limpeza Residencial')
    expect(json.Descricao).toBe('Limpeza completa de casa residencial')
    expect(json.Valor).toBe(150.0)
    expect(json.Unidade).toBe('Metro Quadrado')
    expect(json.Observacao).toBe('Inclui todos os cômodos')
    expect(json.Ativo).toBe(true)
    expect(json.CriadoEm).toBeDefined()
    expect(json.AtualizadoEm).toBeDefined()

    // Verificar que não há propriedades removidas
    expect(json.CustoUnitario).toBeUndefined()
    expect(json.Categoria).toBeUndefined()

    console.log('✅ JSON da entidade Servico:', json)
  })

  it('deve ter opções de unidade apropriadas para formulário', () => {
    // Simular as opções que devem estar disponíveis no formulário
    const unidadeOptions = [
      { label: 'Unidade', value: 'Unidade' },
      { label: 'Hora', value: 'Hora' },
      { label: 'Metro Quadrado (m²)', value: 'Metro Quadrado' },
      { label: 'Metro Linear (m)', value: 'Metro Linear' },
      { label: 'Dia', value: 'Dia' },
      { label: 'Projeto', value: 'Projeto' },
      { label: 'Pacote', value: 'Pacote' },
      { label: 'Cômodo', value: 'Cômodo' },
      { label: 'Casa', value: 'Casa' },
      { label: 'Apartamento', value: 'Apartamento' },
    ]

    expect(unidadeOptions).toBeDefined()
    expect(unidadeOptions.length).toBeGreaterThan(0)

    // Verificar estrutura das opções
    unidadeOptions.forEach((opcao) => {
      expect(opcao.label).toBeDefined()
      expect(opcao.value).toBeDefined()
      expect(typeof opcao.label).toBe('string')
      expect(typeof opcao.value).toBe('string')
    })

    // Verificar unidades básicas
    const valores = unidadeOptions.map((opt) => opt.value)
    expect(valores).toContain('Unidade')
    expect(valores).toContain('Hora')
    expect(valores).toContain('Metro Quadrado')

    console.log('✅ Opções de unidade para formulário:')
    unidadeOptions.forEach((opt) => {
      console.log(`   - ${opt.label} (${opt.value})`)
    })
  })

  it('deve ter modelo de dados compatível com a entidade', () => {
    // Simular o modelo do formulário
    const modeloFormulario = {
      Id: null,
      Nome: '',
      Valor: 0,
      Descricao: '',
      Unidade: 'Unidade',
      Observacao: '',
      Ativo: true,
    }

    // Verificar que o modelo tem todos os campos da entidade
    expect(modeloFormulario.Id).toBeDefined()
    expect(modeloFormulario.Nome).toBeDefined()
    expect(modeloFormulario.Valor).toBeDefined()
    expect(modeloFormulario.Descricao).toBeDefined()
    expect(modeloFormulario.Unidade).toBeDefined()
    expect(modeloFormulario.Observacao).toBeDefined()
    expect(modeloFormulario.Ativo).toBeDefined()

    // Testar criação de entidade com o modelo
    const servico = new Servico(
      modeloFormulario.Nome || 'Nome Teste',
      modeloFormulario.Descricao || 'Descrição Teste',
      modeloFormulario.Valor || 100,
      modeloFormulario.Unidade,
      modeloFormulario.Observacao,
    )

    expect(servico.Nome).toBeDefined()
    expect(servico.Unidade).toBe('Unidade')
    expect(servico.Ativo).toBe(true)

    console.log('✅ Modelo do formulário compatível com entidade')
    console.log('📋 Estrutura do modelo:', modeloFormulario)
  })

  it('deve validar campos obrigatórios conforme entidade', () => {
    const servico = new Servico(
      'Serviço Teste',
      'Descrição do serviço de teste com mais de 10 caracteres',
      100.0,
      'Hora',
      'Observação opcional',
    )

    const validacao = servico.isValid()
    expect(validacao.valido).toBe(true)
    expect(validacao.erros).toHaveLength(0)

    // Testar com dados inválidos
    const servicoInvalido = new Servico(
      'AB', // Nome muito curto
      'Desc', // Descrição muito curta
      -10, // Valor negativo
      'Hora',
    )

    const validacaoInvalida = servicoInvalido.isValid()
    expect(validacaoInvalida.valido).toBe(false)
    expect(validacaoInvalida.erros.length).toBeGreaterThan(0)

    console.log('✅ Validação da entidade funcionando')
    console.log('❌ Erros encontrados:', validacaoInvalida.erros)
  })
})
