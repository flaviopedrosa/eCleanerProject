import { Cliente } from '../../../domain/entities/cliente'
import { Endereco } from '../../../domain/entities/endereco'
import { Imovel } from '../../../domain/entities/imovel'
import { ClienteRepository } from '../clienteRepository'
import { ImovelRepository } from '../imovelRepository'

/**
 * Adiciona clientes de teste ao repositório
 */
export async function seedClientes() {
  const clienteRepository = new ClienteRepository()
  const imovelRepository = new ImovelRepository()

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
    new Cliente(
      'Juliana',
      'Costa',
      'juliana.costa@email.com',
      '(11) 93333-2222',
      '',
      'WHATSAPP',
      'Apartamento novo, necessita limpeza pós-obra',
    ),
    new Cliente(
      'Roberto',
      'Almeida',
      'roberto.almeida@email.com',
      '(11) 92222-1111',
      '(11) 3333-9999',
      'EMAIL',
      'Coberturas duplex, limpeza semanal',
    ),
    new Cliente(
      'Fernanda',
      'Martins',
      'fernanda.martins@email.com',
      '(11) 91111-0000',
      '(11) 3333-1010',
      'WHATSAPP',
      'Clínica médica, higienização especial requerida',
    ),
    new Cliente(
      'Ricardo',
      'Souza',
      'ricardo.souza@email.com',
      '(11) 90000-9999',
      '',
      'TELEFONE',
      'Possui 2 cachorros de grande porte',
    ),
    new Cliente(
      'Patricia',
      'Lima',
      'patricia.lima@email.com',
      '(11) 98765-4321',
      '(11) 3333-2020',
      'EMAIL',
      'Restaurante, limpeza diária após fechamento',
    ),
  ]

  // Adicionar endereços para todos os clientes
  const enderecos = [
    new Endereco(
      'Residencial',
      'Rua das Flores',
      '123',
      '01234-567',
      'Jardim Primavera',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 101',
    ),
    new Endereco(
      'Residencial',
      'Av. Paulista',
      '1500',
      '01310-100',
      'Bela Vista',
      'São Paulo',
      'SP',
      'Brasil',
      'Casa',
    ),
    new Endereco(
      'Residencial',
      'Rua Augusta',
      '2500',
      '01412-100',
      'Consolação',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 205',
    ),
    new Endereco(
      'Residencial',
      'Rua Oscar Freire',
      '800',
      '01426-001',
      'Jardins',
      'São Paulo',
      'SP',
      'Brasil',
      '',
    ),
    new Endereco(
      'Comercial',
      'Av. Faria Lima',
      '3000',
      '01452-000',
      'Itaim Bibi',
      'São Paulo',
      'SP',
      'Brasil',
      'Sala 1502',
    ),
    new Endereco(
      'Residencial',
      'Rua Haddock Lobo',
      '1234',
      '01414-001',
      'Cerqueira César',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 301',
    ),
    new Endereco(
      'Residencial',
      'Rua dos Pinheiros',
      '800',
      '05422-001',
      'Pinheiros',
      'São Paulo',
      'SP',
      'Brasil',
      'Cobertura',
    ),
    new Endereco(
      'Comercial',
      'Av. Brigadeiro Faria Lima',
      '2232',
      '01489-900',
      'Jardim Paulistano',
      'São Paulo',
      'SP',
      'Brasil',
      'Conjunto 405',
    ),
    new Endereco(
      'Residencial',
      'Rua Apinajés',
      '560',
      '05017-020',
      'Perdizes',
      'São Paulo',
      'SP',
      'Brasil',
      'Casa',
    ),
    new Endereco(
      'Comercial',
      'Rua 13 de Maio',
      '1850',
      '01327-002',
      'Bela Vista',
      'São Paulo',
      'SP',
      'Brasil',
      '',
    ),
  ]

  // Limpa os dados existentes
  await clienteRepository.clear()
  await imovelRepository.clear()

  // Adiciona os clientes com endereços
  for (let i = 0; i < clientes.length; i++) {
    clientes[i].definirEndereco(enderecos[i])
    await clienteRepository.save(clientes[i])
  }

  // Criar endereços para os imóveis (alguns iguais ao cliente, outros diferentes)
  const enderecosImoveis = [
    // João Silva - mesmo endereço do cliente
    new Endereco(
      'Residencial',
      'Rua das Flores',
      '123',
      '01234-567',
      'Jardim Primavera',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 101',
    ),
    // Maria Santos - endereço diferente (casa de praia)
    new Endereco(
      'Casa de Praia',
      'Av. Beira Mar',
      '450',
      '11010-200',
      'Praia Grande',
      'Santos',
      'SP',
      'Brasil',
      'Casa',
    ),
    // Pedro Oliveira - mesmo endereço
    new Endereco(
      'Residencial',
      'Rua Augusta',
      '2500',
      '01412-100',
      'Consolação',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 205',
    ),
    // Ana Ferreira - casa no interior
    new Endereco(
      'Casa de Campo',
      'Estrada Municipal',
      '1200',
      '13200-000',
      'Centro',
      'Jundiaí',
      'SP',
      'Brasil',
      '',
    ),
    // Carlos Ribeiro - mesmo endereço (escritório)
    new Endereco(
      'Comercial',
      'Av. Faria Lima',
      '3000',
      '01452-000',
      'Itaim Bibi',
      'São Paulo',
      'SP',
      'Brasil',
      'Sala 1502',
    ),
    // Juliana Costa - mesmo endereço
    new Endereco(
      'Residencial',
      'Rua Haddock Lobo',
      '1234',
      '01414-001',
      'Cerqueira César',
      'São Paulo',
      'SP',
      'Brasil',
      'Apto 301',
    ),
    // Roberto Almeida - mesmo endereço (cobertura)
    new Endereco(
      'Residencial',
      'Rua dos Pinheiros',
      '800',
      '05422-001',
      'Pinheiros',
      'São Paulo',
      'SP',
      'Brasil',
      'Cobertura',
    ),
    // Fernanda Martins - mesmo endereço (clínica)
    new Endereco(
      'Comercial',
      'Av. Brigadeiro Faria Lima',
      '2232',
      '01489-900',
      'Jardim Paulistano',
      'São Paulo',
      'SP',
      'Brasil',
      'Conjunto 405',
    ),
    // Ricardo Souza - endereço diferente (casa com quintal)
    new Endereco(
      'Residencial',
      'Rua Artur de Azevedo',
      '123',
      '05404-010',
      'Pinheiros',
      'São Paulo',
      'SP',
      'Brasil',
      'Casa com quintal',
    ),
    // Patricia Lima - mesmo endereço (restaurante)
    new Endereco(
      'Comercial',
      'Rua 13 de Maio',
      '1850',
      '01327-002',
      'Bela Vista',
      'São Paulo',
      'SP',
      'Brasil',
      '',
    ),
  ]

  // Configurações dos imóveis [totalComodos, quartos, banheiros, area]
  const configImoveis = [
    {
      totalComodos: 6,
      quartos: 3,
      banheiros: 2,
      area: 85,
      obs: 'Apartamento reformado, vista para o parque',
    },
    {
      totalComodos: 5,
      quartos: 2,
      banheiros: 2,
      area: 120,
      obs: 'Casa térrea com piscina e churrasqueira',
    },
    {
      totalComodos: 4,
      quartos: 2,
      banheiros: 1,
      area: 65,
      obs: 'Apartamento compacto, bem iluminado',
    },
    {
      totalComodos: 8,
      quartos: 4,
      banheiros: 3,
      area: 250,
      obs: 'Casa ampla com jardim e área de lazer',
    },
    {
      totalComodos: 10,
      quartos: 2,
      banheiros: 2,
      area: 180,
      obs: 'Escritório corporativo com sala de reuniões',
    },
    {
      totalComodos: 5,
      quartos: 2,
      banheiros: 2,
      area: 72,
      obs: 'Apartamento novo, recém entregue',
    },
    {
      totalComodos: 12,
      quartos: 4,
      banheiros: 4,
      area: 320,
      obs: 'Cobertura duplex com terraço e jacuzzi',
    },
    {
      totalComodos: 8,
      quartos: 3,
      banheiros: 3,
      area: 150,
      obs: 'Clínica com recepção, 3 consultórios e copa',
    },
    {
      totalComodos: 7,
      quartos: 3,
      banheiros: 2,
      area: 200,
      obs: 'Casa térrea com quintal amplo para pets',
    },
    {
      totalComodos: 6,
      quartos: 0,
      banheiros: 3,
      area: 95,
      obs: 'Restaurante com cozinha industrial e salão',
    },
  ]

  // Criar e adicionar imóveis para cada cliente
  for (let i = 0; i < clientes.length; i++) {
    const config = configImoveis[i]
    const imovel = new Imovel(
      config.totalComodos,
      config.quartos,
      config.banheiros,
      config.area,
      enderecosImoveis[i],
      clientes[i],
      config.obs,
      [],
    )

    // Adicionar o imóvel ao cliente
    clientes[i].adicionarImovel(imovel)

    // Salvar o imóvel no repositório
    await imovelRepository.save(imovel)

    // Atualizar o cliente com o imóvel associado
    await clienteRepository.save(clientes[i])
  }

  console.log('✓ Clientes de teste adicionados com sucesso!')
  console.log('✓ Imóveis de teste adicionados com sucesso!')
}
