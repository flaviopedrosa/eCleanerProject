import { seedClientes } from './clienteSeed'
import { seedColaboradores } from './colaboradorSeed'
import { seedMateriais } from './materialSeed'
import { seedServicos } from './servicoSeed'

/**
 * Executa todos os seeds do sistema
 */
export async function runAllSeeds() {
  console.log('🌱 Iniciando processo de seeds...')

  try {
    console.log('📦 Carregando materiais...')
    await seedMateriais()

    console.log('👥 Carregando clientes...')
    await seedClientes()

    console.log('👷 Carregando colaboradores...')
    await seedColaboradores()

    console.log('🧹 Carregando serviços...')
    await seedServicos()

    console.log('✅ Todos os seeds foram executados com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante a execução dos seeds:', error)
    throw error
  }
}

/**
 * Executa apenas o seed de materiais
 */
export async function runMaterialSeed() {
  console.log('🧽 Iniciando seed de materiais...')

  try {
    await seedMateriais()
    console.log('✅ Seed de materiais executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed de materiais:', error)
    throw error
  }
}

/**
 * Executa apenas o seed de serviços
 */
export async function runServiceSeed() {
  console.log('🧹 Iniciando seed de serviços...')

  try {
    await seedServicos()
    console.log('✅ Seed de serviços executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed de serviços:', error)
    throw error
  }
}
