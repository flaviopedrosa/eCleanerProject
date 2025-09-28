import { describe, it, expect } from 'vitest'
import { seedClientes } from '../../../core/infrastructure/repositories/seeds/clienteSeed'

describe('Cliente Seeds', () => {
  it('deve adicionar clientes de teste', async () => {
    await seedClientes()
  })
})
