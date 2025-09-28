import { Cliente } from '../../../domain/entities/cliente'
import { ClienteRepository } from '../clienteRepository'

/**
 * Adiciona clientes de teste ao repositório
 */
export async function seedClientes() {
  const clienteRepository = new ClienteRepository()

  const clientes = [
    new Cliente(
      'João',
      'Silva',
      'joao.silva@email.com',
      '(11) 98888-7777',
      '(11) 3333-4444',
      'WHATSAPP',
      'Cliente VIP, prefere limpeza nas segundas-feiras',
    ),
    new Cliente(
      'Maria',
      'Santos',
      'maria.santos@email.com',
      '(11) 97777-6666',
      '(11) 3333-5555',
      'TELEFONE',
      'Possui animais de estimação: 2 gatos',
    ),
    new Cliente(
      'Pedro',
      'Oliveira',
      'pedro.oliveira@email.com',
      '(11) 96666-5555',
      '',
      'WHATSAPP',
      'Prefere contato por WhatsApp',
    ),
    new Cliente(
      'Ana',
      'Ferreira',
      'ana.ferreira@email.com',
      '(11) 95555-4444',
      '(11) 3333-7777',
      'EMAIL',
      'Limpeza quinzenal agendada',
    ),
    new Cliente(
      'Carlos',
      'Ribeiro',
      'carlos.ribeiro@email.com',
      '(11) 94444-3333',
      '(11) 3333-8888',
      'TELEFONE',
      'Escritório comercial, limpeza fora do horário comercial',
    ),
  ]

  // Limpa os dados existentes
  await clienteRepository.clear()

  // Adiciona os clientes
  for (const cliente of clientes) {
    await clienteRepository.save(cliente)
  }

  console.log('✓ Clientes de teste adicionados com sucesso!')
}
