// Exemplo de uso da entidade ItemOrcamento
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'
import { TipoItemOrcamento } from '@/core/domain/enums/tipoItemOrcamento'

// ===== EXEMPLO DE USO =====

// 1. Criando um item de material
const detergente = new ItemOrcamento(
  'Detergente Industrial 5L',
  TipoItemOrcamento.MATERIAL,
  25.9,
  3,
  'UN',
  'Para limpeza pesada em escritórios',
)

console.log('Item Material:', detergente.toString())
console.log('Valor Total:', detergente.calcularValorTotal()) // 77.70

// 2. Criando um item de serviço
const limpezaCarpete = new ItemOrcamento(
  'Limpeza de Carpete Comercial',
  TipoItemOrcamento.SERVICO,
  15.0,
  50,
  'M²',
)

console.log('Item Serviço:', limpezaCarpete.toString())
console.log('Valor Total:', limpezaCarpete.calcularValorTotal()) // 750.00

// 3. Verificando tipo do item
console.log('É material?', detergente.isMaterial()) // true
console.log('É serviço?', limpezaCarpete.isServico()) // true

// 4. Atualizando propriedades
detergente.atualizarQuantidade(5)
detergente.atualizarCusto(22.5)
console.log('Novo valor total:', detergente.calcularValorTotal()) // 112.50

// 5. Serialização para JSON
const itemJson = detergente.toJSON()
console.log('Item serializado:', JSON.stringify(itemJson, null, 2))

// 6. Recriando item a partir de JSON
const itemRecriado = ItemOrcamento.fromJSON(itemJson)
console.log('Item recriado:', itemRecriado.toString())

// ===== EXEMPLO DE COMPOSIÇÃO DE ORÇAMENTO =====

class ComposicaoOrcamento {
  constructor() {
    this.itens = []
  }

  adicionarItem(item) {
    if (!(item instanceof ItemOrcamento)) {
      throw new Error('Item deve ser uma instância de ItemOrcamento')
    }
    this.itens.push(item)
  }

  calcularValorTotal() {
    return this.itens.reduce((total, item) => total + item.calcularValorTotal(), 0)
  }

  obterItensPorTipo(tipo) {
    return this.itens.filter((item) => item.Tipo === tipo)
  }

  obterResumo() {
    const materiais = this.obterItensPorTipo(TipoItemOrcamento.MATERIAL)
    const servicos = this.obterItensPorTipo(TipoItemOrcamento.SERVICO)

    return {
      totalItens: this.itens.length,
      totalMateriais: materiais.length,
      totalServicos: servicos.length,
      valorMateriais: materiais.reduce((total, item) => total + item.calcularValorTotal(), 0),
      valorServicos: servicos.reduce((total, item) => total + item.calcularValorTotal(), 0),
      valorTotal: this.calcularValorTotal(),
    }
  }
}

// Exemplo de uso da composição
const orcamento = new ComposicaoOrcamento()

// Adicionando itens ao orçamento
orcamento.adicionarItem(detergente)
orcamento.adicionarItem(limpezaCarpete)
orcamento.adicionarItem(
  new ItemOrcamento(
    'Aspirador de Pó Profissional',
    TipoItemOrcamento.MATERIAL,
    450.0,
    1,
    'UN',
    'Para limpeza de carpetes',
  ),
)

// Obtendo resumo
const resumo = orcamento.obterResumo()
console.log('Resumo do Orçamento:', resumo)

export { ComposicaoOrcamento }
