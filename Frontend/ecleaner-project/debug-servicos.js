// Teste rápido de debug para localStorage
console.log('=== DEBUG SERVIÇOS ===')

// Verificar se existe dados no localStorage
const servicosLS = localStorage.getItem('ecleaner_servicos')
console.log(
  '1. localStorage ecleaner_servicos:',
  servicosLS ? JSON.parse(servicosLS).length + ' serviços' : 'vazio',
)

// Testar o repositório diretamente
import { servicoRepository } from '@/core/infrastructure/repositories/servicoRepository'

try {
  const servicosRepo = servicoRepository.buscarTodos()
  console.log('2. servicoRepository.buscarTodos():', servicosRepo.length, 'serviços')
  if (servicosRepo.length > 0) {
    console.log('   Primeiro serviço:', servicosRepo[0])
  }
} catch (e) {
  console.error('2. Erro no repositório:', e)
}

// Testar seed diretamente
import { seedServicos } from '@/core/infrastructure/repositories/seeds/servicoSeed'

try {
  console.log('3. Testando seed...')
  const resultado = await seedServicos()
  console.log('   Seed executado, criados:', resultado.length, 'serviços')
} catch (e) {
  console.error('3. Erro no seed:', e)
}

console.log('=== FIM DEBUG ===')
