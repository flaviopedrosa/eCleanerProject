import { Equipamento } from '@/core/domain/entities/equipamento'
import { EquipamentoRepository } from '@/core/infrastructure/repositories/equipamentoRepository'

/**
 * Seed de equipamentos
 * Popula o banco de dados com equipamentos de limpeza comuns
 */
export async function seedEquipamentos() {
  const repository = new EquipamentoRepository()

  // Limpa os dados existentes
  await repository.clear()

  const equipamentos = [
    {
      descricao: 'Aspirador de Pó Industrial',
      unidade: 'dia',
      precoUnitario: 50.0,
      imagem: '',
    },
    {
      descricao: 'Enceradeira Profissional',
      unidade: 'dia',
      precoUnitario: 45.0,
      imagem: '',
    },
    {
      descricao: 'Lavadora de Alta Pressão',
      unidade: 'dia',
      precoUnitario: 80.0,
      imagem: '',
    },
    {
      descricao: 'Escada de Alumínio 6m',
      unidade: 'dia',
      precoUnitario: 25.0,
      imagem: '',
    },
    {
      descricao: 'Aspirador de Líquidos',
      unidade: 'dia',
      precoUnitario: 40.0,
      imagem: '',
    },
    {
      descricao: 'Politriz Industrial',
      unidade: 'dia',
      precoUnitario: 60.0,
      imagem: '',
    },
    {
      descricao: 'Soprador de Folhas',
      unidade: 'dia',
      precoUnitario: 35.0,
      imagem: '',
    },
    {
      descricao: 'Gerador de Vapor',
      unidade: 'dia',
      precoUnitario: 70.0,
      imagem: '',
    },
    {
      descricao: 'Carrinho de Limpeza com Kit',
      unidade: 'un',
      precoUnitario: 150.0,
      imagem: '',
    },
    {
      descricao: 'Limpadora de Estofados',
      unidade: 'dia',
      precoUnitario: 55.0,
      imagem: '',
    },
    {
      descricao: 'Máquina de Lavar Carpete',
      unidade: 'dia',
      precoUnitario: 90.0,
      imagem: '',
    },
    {
      descricao: 'Conjunto de Ferramentas de Limpeza',
      unidade: 'un',
      precoUnitario: 120.0,
      imagem: '',
    },
    {
      descricao: 'Escovão Rotativo Elétrico',
      unidade: 'dia',
      precoUnitario: 40.0,
      imagem: '',
    },
    {
      descricao: 'Hidrolimpadora Profissional',
      unidade: 'dia',
      precoUnitario: 95.0,
      imagem: '',
    },
    {
      descricao: 'Pulverizador Manual 5L',
      unidade: 'un',
      precoUnitario: 45.0,
      imagem: '',
    },
  ]

  // Salva cada equipamento no repositório
  for (const equipData of equipamentos) {
    const equipamento = new Equipamento(
      equipData.descricao,
      equipData.unidade,
      equipData.precoUnitario,
      equipData.imagem,
    )
    await repository.save(equipamento)
  }

  console.log(`✅ ${equipamentos.length} equipamentos criados com sucesso!`)
  return equipamentos.length
}
