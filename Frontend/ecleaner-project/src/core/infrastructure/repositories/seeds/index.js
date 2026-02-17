import { seedClientes } from './clienteSeed'
import { seedColaboradores } from './colaboradorSeed'
import { seedMateriais } from './materialSeed'
import { seedServicos } from './servicoSeed'
import { seedEquipamentos } from './equipamentoSeed'
import { seedEquipes } from './equipeSeed'
import { seedAtribuicoesMateriais } from './atribuicaoMaterialSeed'
import { seedPacotesServicos } from './pacoteServicoSeed'
import { seedOrcamentos } from './orcamentoSeed'

/**
 * Executa todos os seeds do sistema
 */
export async function runAllSeeds() {
  console.log('🌱 Iniciando processo de seeds...')

  try {
    console.log('📦 Carregando materiais...')
    await seedMateriais()

    console.log('�️ Carregando equipamentos...')
    await seedEquipamentos()

    console.log('�👥 Carregando clientes...')
    await seedClientes()

    console.log('👷 Carregando colaboradores...')
    await seedColaboradores()

    console.log('👨‍👩‍👧‍👦 Carregando equipes...')
    await seedEquipes()

    console.log('🧹 Carregando serviços...')
    await seedServicos()

    console.log('� Carregando pacotes de serviços...')
    await seedPacotesServicos()

    console.log('�📋 Atribuindo materiais às equipes...')
    await seedAtribuicoesMateriais()
    console.log('💼 Carregando orçamentos e ordens de serviço...')
    await seedOrcamentos()
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

/**
 * Executa apenas o seed de equipamentos
 */
export async function runEquipamentoSeed() {
  console.log('🛠️ Iniciando seed de equipamentos...')

  try {
    await seedEquipamentos()
    console.log('✅ Seed de equipamentos executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed de equipamentos:', error)
    throw error
  }
}

/**
 * Executa apenas o seed de pacotes de serviços
 */
export async function runPacoteServicoSeed() {
  console.log('📦 Iniciando seed de pacotes de serviços...')

  try {
    await seedPacotesServicos()
    console.log('✅ Seed de pacotes de serviços executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed de pacotes de serviços:', error)
    throw error
  }
}

/**
 * Executa apenas o seed de orçamentos e ordens de serviço
 */
export async function runOrcamentoSeed() {
  console.log('💼 Iniciando seed de orçamentos...')

  try {
    await seedOrcamentos()
    console.log('✅ Seed de orçamentos executado com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed de orçamentos:', error)
    throw error
  }
}
