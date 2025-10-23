// Script para executar seed de serviços no console do navegador
// Copie e cole este código no console do navegador (F12)

console.log('🌱 Iniciando seed de serviços...')

// Import dinâmico do seed
import('/src/core/infrastructure/repositories/seeds/servicoSeed.js')
  .then((module) => {
    return module.seedServicos()
  })
  .then(() => {
    console.log('✅ Seed de serviços executado com sucesso!')
    console.log('🔄 Recarregando a página para ver os dados...')
    location.reload()
  })
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error)
  })
