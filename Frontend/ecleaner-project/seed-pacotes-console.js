// Script para executar seed de pacotes de serviços no console do navegador
// Copie e cole este código no console do navegador (F12)

console.log('📦 Iniciando seed de pacotes de serviços...')

// Import dinâmico do seed
import('/src/core/infrastructure/repositories/seeds/pacoteServicoSeed.js')
  .then((module) => {
    return module.seedPacotesServicos()
  })
  .then(() => {
    console.log('✅ Seed de pacotes de serviços executado com sucesso!')
    console.log('🔄 Recarregando a página para ver os dados...')
    location.reload()
  })
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error)
  })
