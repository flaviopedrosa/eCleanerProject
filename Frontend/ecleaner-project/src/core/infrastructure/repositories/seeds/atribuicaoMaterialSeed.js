import { AtribuicaoMaterial } from '../../../domain/entities/atribuicaoMaterial'
import { AtribuicaoMaterialRepository } from '../atribuicaoMaterialRepository'
import { MaterialRepository } from '../materialRepository'
import { EquipeRepository } from '../equipeRepository'

/**
 * Atribui parte dos estoques de materiais às equipes
 */
export async function seedAtribuicoesMateriais() {
  const atribuicaoRepository = new AtribuicaoMaterialRepository()
  const materialRepository = new MaterialRepository()
  const equipeRepository = new EquipeRepository()

  // Limpar atribuições existentes
  await atribuicaoRepository.clear()

  const materiais = await materialRepository.getAll()
  const equipes = await equipeRepository.getAll()

  if (equipes.length === 0) {
    console.warn('⚠️ Nenhuma equipe encontrada. Pulando atribuições de materiais.')
    return
  }

  if (materiais.length === 0) {
    console.warn('⚠️ Nenhum material encontrado. Pulando atribuições de materiais.')
    return
  }

  console.log(
    `📦 Atribuindo materiais de ${materiais.length} produtos para ${equipes.length} equipes...`,
  )

  const atribuicoes = []

  // Atribuir materiais às equipes
  // Estratégia: Atribuir diferentes quantidades de materiais para cada equipe
  equipes.forEach((equipe, indexEquipe) => {
    // Cada equipe recebe cerca de 70% dos materiais disponíveis
    materiais.forEach((material, indexMaterial) => {
      // Distribuir materiais de forma alternada entre as equipes
      if ((indexMaterial + indexEquipe) % equipes.length === indexEquipe) {
        const quantidadeDisponivel = material.QuantidadeEstoque || 0

        if (quantidadeDisponivel > 0) {
          // Atribuir entre 20% e 40% do estoque disponível
          const percentualAtribuicao = 0.2 + Math.random() * 0.2
          const quantidadeAtribuir = Math.floor(quantidadeDisponivel * percentualAtribuicao)

          if (quantidadeAtribuir > 0) {
            const atribuicao = new AtribuicaoMaterial(material.Id, equipe.Id, quantidadeAtribuir)

            atribuicoes.push(atribuicao)

            // Remover do estoque
            material.removerEstoque(quantidadeAtribuir)
          }
        }
      }
    })
  })

  // Salvar atribuições
  for (const atribuicao of atribuicoes) {
    await atribuicaoRepository.save(atribuicao)
  }

  // Atualizar materiais com estoque reduzido
  for (const material of materiais) {
    await materialRepository.save(material)
  }

  console.log(
    `✅ ${atribuicoes.length} atribuições de materiais criadas para ${equipes.length} equipes`,
  )
}
