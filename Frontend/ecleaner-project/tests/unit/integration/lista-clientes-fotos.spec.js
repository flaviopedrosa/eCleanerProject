import { describe, it, expect, beforeEach } from 'vitest'
import { Cliente } from '../../../src/core/domain/entities/cliente.js'
import { Endereco } from '../../../src/core/domain/entities/endereco.js'
import { ClienteRepository } from '../../../src/core/infrastructure/repositories/clienteRepository.js'

describe('Teste: Exibição de Fotos na Lista de Clientes', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear()
  })

  it('deve criar clientes com e sem fotos para testar a listagem', async () => {
    const clienteRepository = new ClienteRepository()

    // === CLIENTE COM FOTO ===
    const clienteComFoto = new Cliente('Ana', 'Silva', 'ana@email.com', '11999999999')

    // Simula uma foto em base64 (pequena imagem de teste)
    const fotoBase64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA4kZmWwAAAABJRU5ErkJggg=='
    clienteComFoto.definirFoto(fotoBase64)

    // Adiciona endereço
    const endereco1 = new Endereco(
      'Principal',
      'Rua das Flores, 123',
      '123',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )
    clienteComFoto.definirEndereco(endereco1)

    const clienteComFotoSalvo = await clienteRepository.save(clienteComFoto)

    // === CLIENTE SEM FOTO ===
    const clienteSemFoto = new Cliente('João', 'Santos', 'joao@email.com', '11888888888')

    // Adiciona endereço
    const endereco2 = new Endereco(
      'Principal',
      'Av. Paulista, 456',
      '456',
      '01310-100',
      'Bela Vista',
      'São Paulo',
      'SP',
      'Brasil',
    )
    clienteSemFoto.definirEndereco(endereco2)

    const clienteSemFotoSalvo = await clienteRepository.save(clienteSemFoto)

    // === VERIFICAÇÕES ===
    const todosClientes = await clienteRepository.getAll()

    expect(todosClientes).toHaveLength(2)

    // Verifica cliente com foto
    const clienteComFotoCarregado = todosClientes.find((c) => c.Email === 'ana@email.com')
    expect(clienteComFotoCarregado).toBeTruthy()
    expect(clienteComFotoCarregado.Foto).toBe(fotoBase64)
    expect(clienteComFotoCarregado.Nome).toBe('Ana')
    expect(clienteComFotoCarregado.Sobrenome).toBe('Silva')

    // Verifica cliente sem foto
    const clienteSemFotoCarregado = todosClientes.find((c) => c.Email === 'joao@email.com')
    expect(clienteSemFotoCarregado).toBeTruthy()
    expect(clienteSemFotoCarregado.Foto).toBeNull()
    expect(clienteSemFotoCarregado.Nome).toBe('João')
    expect(clienteSemFotoCarregado.Sobrenome).toBe('Santos')

    console.log('=== RESULTADO DO TESTE DE FOTOS ===')
    console.log('Cliente com foto:', {
      nome: clienteComFotoCarregado.Nome + ' ' + clienteComFotoCarregado.Sobrenome,
      temFoto: !!clienteComFotoCarregado.Foto,
      iniciais:
        `${clienteComFotoCarregado.Nome?.charAt(0) || ''}${clienteComFotoCarregado.Sobrenome?.charAt(0) || ''}`.toUpperCase(),
    })
    console.log('Cliente sem foto:', {
      nome: clienteSemFotoCarregado.Nome + ' ' + clienteSemFotoCarregado.Sobrenome,
      temFoto: !!clienteSemFotoCarregado.Foto,
      iniciais:
        `${clienteSemFotoCarregado.Nome?.charAt(0) || ''}${clienteSemFotoCarregado.Sobrenome?.charAt(0) || ''}`.toUpperCase(),
    })
  })

  it('deve simular a funcionalidade de iniciais para clientes sem foto', () => {
    // Função auxiliar como no componente
    const getInitials = (nome, sobrenome) => {
      return `${nome?.charAt(0) || ''}${sobrenome?.charAt(0) || ''}`.toUpperCase()
    }

    // Testes de iniciais
    expect(getInitials('Ana', 'Silva')).toBe('AS')
    expect(getInitials('João', 'Santos')).toBe('JS')
    expect(getInitials('Maria', 'Conceição')).toBe('MC')
    expect(getInitials('Pedro', '')).toBe('P')
    expect(getInitials('', 'Silva')).toBe('S')
    expect(getInitials('', '')).toBe('')

    console.log('✅ Função de iniciais funcionando corretamente!')
  })

  it('deve verificar que fotos são persistidas e carregadas corretamente', async () => {
    const clienteRepository = new ClienteRepository()

    // Cria cliente com foto
    const cliente = new Cliente('Maria', 'Oliveira', 'maria@email.com', '11777777777')

    // Foto de teste maior (simulando uma foto real comprimida)
    const fotoTeste =
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    cliente.definirFoto(fotoTeste)

    // Salva e recarrega
    const clienteSalvo = await clienteRepository.save(cliente)
    const clienteCarregado = await clienteRepository.getById(clienteSalvo.Id)

    // Verificações
    expect(clienteCarregado.Foto).toBe(fotoTeste)
    expect(clienteCarregado.Foto.startsWith('data:image/jpeg;base64,')).toBe(true)

    console.log('✅ Foto persistida e carregada corretamente!')
    console.log('   Tamanho da foto:', clienteCarregado.Foto.length, 'caracteres')
    console.log('   Formato detectado:', clienteCarregado.Foto.substring(0, 30) + '...')
  })
})
