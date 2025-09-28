import { Colaborador } from '../../../domain/entities/colaborador'
import { Endereco } from '../../../domain/entities/endereco'
import { ExperienciaProfissional, Referencia } from '../../../domain/entities/documentosColaborador'
import { StatusColaborador } from '../../../domain/enums/statusColaborador'
import { ColaboradorRepository } from '../colaboradorRepository'

/**
 * Adiciona colaboradores de teste ao repositório
 */
export async function seedColaboradores() {
  const colaboradorRepository = new ColaboradorRepository()

  // Criar colaboradores de teste
  const colaboradores = []

  // Colaborador 1 - João Silva (Líder)
  const joao = new Colaborador(
    'João',
    'Silva',
    'joao.silva@ecleaner.com',
    '(11) 3333-1111',
    '(11) 98888-1111',
    '12.345.678-9',
    new Date(1985, 5, 15),
    'Brasileira',
    3500,
    'Segunda a Sexta - 8h às 17h',
    ['Zona Sul', 'Centro'],
    'Experiência em liderança de equipes de limpeza',
  )

  joao.atualizarStatus(StatusColaborador.ATIVO)
  joao.definirEnderecoResidencial(
    new Endereco(
      '04038-001',
      'Rua Vergueiro',
      '1000',
      'Apto 45',
      'Vila Mariana',
      'São Paulo',
      'SP',
    ),
  )

  joao.adicionarExperienciaProfissional(
    new ExperienciaProfissional(
      'CleanMax Limpeza',
      'Supervisor de Equipe',
      new Date(2020, 0, 1),
      new Date(2023, 11, 31),
      'Supervisão de 8 colaboradores, controle de qualidade, treinamentos',
    ),
  )

  joao.adicionarReferencia(
    new Referencia(
      'Maria Santos',
      '(11) 99999-0001',
      'Ex-gerente na CleanMax Limpeza',
      'Contato: maria.santos@cleanmax.com',
    ),
  )

  colaboradores.push(joao)

  // Colaborador 2 - Ana Costa (Executora)
  const ana = new Colaborador(
    'Ana',
    'Costa',
    'ana.costa@ecleaner.com',
    '(11) 3333-2222',
    '(11) 97777-2222',
    '23.456.789-0',
    new Date(1990, 3, 20),
    'Brasileira',
    2800,
    'Segunda a Sábado - 7h às 16h',
    ['Zona Norte', 'Centro'],
    'Especialista em limpeza residencial e comercial',
  )

  ana.atualizarStatus(StatusColaborador.ATIVO)
  ana.definirEnderecoResidencial(
    new Endereco(
      '02070-000',
      'Rua Voluntários da Pátria',
      '500',
      'Casa',
      'Santana',
      'São Paulo',
      'SP',
    ),
  )

  ana.adicionarExperienciaProfissional(
    new ExperienciaProfissional(
      'Casa & Cia Limpeza',
      'Auxiliar de Limpeza',
      new Date(2018, 6, 1),
      new Date(2023, 5, 30),
      'Limpeza residencial e comercial, organização de ambientes',
    ),
  )

  colaboradores.push(ana)

  // Colaborador 3 - Carlos Motorista
  const carlos = new Colaborador(
    'Carlos',
    'Rodrigues',
    'carlos.rodrigues@ecleaner.com',
    '(11) 3333-3333',
    '(11) 96666-3333',
    '34.567.890-1',
    new Date(1982, 8, 10),
    'Brasileira',
    3200,
    'Segunda a Sexta - 6h às 15h',
    ['Grande São Paulo'],
    'Motorista com CNH categoria D, conhece bem a cidade',
  )

  carlos.atualizarStatus(StatusColaborador.ATIVO)
  carlos.definirEnderecoResidencial(
    new Endereco('08540-000', 'Rua das Flores', '123', '', 'Cidade Tiradentes', 'São Paulo', 'SP'),
  )

  carlos.adicionarExperienciaProfissional(
    new ExperienciaProfissional(
      'TransLimpe',
      'Motorista',
      new Date(2015, 0, 1),
      new Date(2023, 8, 31),
      'Transporte de equipes e equipamentos de limpeza',
    ),
  )

  colaboradores.push(carlos)

  // Colaborador 4 - Márcia (Em Análise)
  const marcia = new Colaborador(
    'Márcia',
    'Oliveira',
    'marcia.oliveira@email.com',
    '',
    '(11) 95555-4444',
    '45.678.901-2',
    new Date(1995, 1, 25),
    'Brasileira',
    2500,
    'Segunda a Sexta - 8h às 17h',
    ['Zona Oeste'],
    'Primeira experiência na área, muito interessada em aprender',
  )

  marcia.definirEnderecoResidencial(
    new Endereco('05408-000', 'Rua Rebouças', '800', 'Apto 102', 'Pinheiros', 'São Paulo', 'SP'),
  )

  marcia.adicionarReferencia(
    new Referencia(
      'José Silva',
      '(11) 99999-0002',
      'Ex-gerente no Mercado Central',
      'Contato: jose.silva@mercadocentral.com',
    ),
  )

  colaboradores.push(marcia)

  // Colaborador 5 - Roberto (Suspenso)
  const roberto = new Colaborador(
    'Roberto',
    'Ferreira',
    'roberto.ferreira@ecleaner.com',
    '(11) 3333-5555',
    '(11) 94444-5555',
    '56.789.012-3',
    new Date(1988, 11, 5),
    'Brasileira',
    3000,
    'Terça a Sábado - 8h às 17h',
    ['Zona Leste', 'Centro'],
    'Colaborador experiente, atualmente inativo',
  )

  roberto.atualizarStatus(StatusColaborador.INATIVO)
  roberto.definirEnderecoResidencial(
    new Endereco('08010-000', 'Rua da Mooca', '2000', 'Casa 15', 'Mooca', 'São Paulo', 'SP'),
  )

  roberto.adicionarExperienciaProfissional(
    new ExperienciaProfissional(
      'LimpaTudo Serviços',
      'Auxiliar de Limpeza',
      new Date(2016, 2, 1),
      new Date(2023, 10, 15),
      'Limpeza comercial e residencial, manuseio de equipamentos',
    ),
  )

  colaboradores.push(roberto)

  // Limpa os dados existentes
  await colaboradorRepository.clear()

  // Adiciona os colaboradores
  for (const colaborador of colaboradores) {
    await colaboradorRepository.save(colaborador)
  }

  console.log('✓ Colaboradores de teste adicionados com sucesso!')
}
