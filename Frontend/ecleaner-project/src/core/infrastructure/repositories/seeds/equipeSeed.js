import { Equipe } from '../../../domain/entities/equipe'
import { FuncaoColaborador } from '../../../domain/enums/funcaoColaborador'
import { EquipeRepository } from '../equipeRepository'
import { ColaboradorRepository } from '../colaboradorRepository'

/**
 * Adiciona equipes de teste ao repositório
 */
export async function seedEquipes() {
  const equipeRepository = new EquipeRepository()
  const colaboradorRepository = new ColaboradorRepository()

  // Limpar equipes existentes
  await equipeRepository.clear()

  // Buscar colaboradores existentes
  const colaboradores = await colaboradorRepository.getAll()

  const equipes = []

  // Equipe 1 - Limpeza Residencial
  const equipe1 = new Equipe('Equipe Limpeza Residencial')
  if (colaboradores.length >= 3) {
    equipe1.adicionarColaborador(colaboradores[0], FuncaoColaborador.LIDER)
    equipe1.adicionarColaborador(colaboradores[1], FuncaoColaborador.MOTORISTA)
    equipe1.adicionarColaborador(colaboradores[2], FuncaoColaborador.EXECUTOR)
  }
  equipes.push(equipe1)

  // Equipe 2 - Limpeza Comercial
  const equipe2 = new Equipe('Equipe Limpeza Comercial')
  if (colaboradores.length >= 5) {
    equipe2.adicionarColaborador(colaboradores[3], FuncaoColaborador.LIDER)
    equipe2.adicionarColaborador(colaboradores[4], FuncaoColaborador.EXECUTOR)
  }
  equipes.push(equipe2)

  // Equipe 3 - Limpeza Pesada
  const equipe3 = new Equipe('Equipe Limpeza Pesada')
  if (colaboradores.length >= 7) {
    equipe3.adicionarColaborador(colaboradores[5], FuncaoColaborador.LIDER)
    equipe3.adicionarColaborador(colaboradores[6], FuncaoColaborador.EXECUTOR)
  }
  equipes.push(equipe3)

  // Salvar equipes
  for (const equipe of equipes) {
    await equipeRepository.save(equipe)
  }

  console.log(`✅ ${equipes.length} equipes criadas com sucesso`)
}
