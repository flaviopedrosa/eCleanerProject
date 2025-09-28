import { Equipe } from '../../../domain/entities/equipe'
import { Colaborador } from '../../../domain/entities/colaborador'
import { FuncaoColaborador } from '../../../domain/enums/funcaoColaborador'

// Criar alguns colaboradores para as equipes
const joao = new Colaborador(
  'João',
  'Silva',
  'joao.silva@empresa.com',
  '(11) 3333-4444',
  '(11) 98765-4321',
  'RG-123456', // DocumentoIdentidade (obrigatório)
  new Date('1990-01-15'), // DataNascimento (obrigatório)
  'Brasileira', // Nacionalidade (obrigatório)
  2500, // SalarioEsperado (obrigatório, valor positivo)
  'Integral', // Disponibilidade (obrigatório)
  ['Zona Sul', 'Zona Oeste'], // RegioesAtuacao (opcional)
  'Experiência em limpeza residencial', // Observacoes (opcional)
)

const maria = new Colaborador(
  'Maria',
  'Santos',
  'maria.santos@empresa.com',
  '(11) 3333-5555',
  '(11) 98765-5432',
  'RG-789012', // DocumentoIdentidade (obrigatório)
  new Date('1985-06-22'), // DataNascimento (obrigatório)
  'Brasileira', // Nacionalidade (obrigatório)
  2800, // SalarioEsperado (obrigatório, valor positivo)
  'Integral', // Disponibilidade (obrigatório)
  ['Zona Norte', 'Zona Leste'], // RegioesAtuacao (opcional)
  'Experiência em gestão de equipes', // Observacoes (opcional)
)

const pedro = new Colaborador(
  'Pedro',
  'Oliveira',
  'pedro.oliveira@empresa.com',
  '(11) 3333-6666',
  '(11) 98765-6543',
  'RG-345678', // DocumentoIdentidade (obrigatório)
  new Date('1992-03-10'), // DataNascimento (obrigatório)
  'Brasileira', // Nacionalidade (obrigatório)
  2300, // SalarioEsperado (obrigatório, valor positivo)
  'Meio Período', // Disponibilidade (obrigatório)
  ['Zona Sul'], // RegioesAtuacao (opcional)
  'Especialista em limpeza pós-obra', // Observacoes (opcional)
)

const ana = new Colaborador(
  'Ana',
  'Costa',
  'ana.costa@empresa.com',
  '(11) 3333-7777',
  '(11) 98765-7654',
  'RG-901234', // DocumentoIdentidade (obrigatório)
  new Date('1988-12-03'), // DataNascimento (obrigatório)
  'Brasileira', // Nacionalidade (obrigatório)
  3000, // SalarioEsperado (obrigatório, valor positivo)
  'Integral', // Disponibilidade (obrigatório)
  ['Zona Oeste', 'Zona Central'], // RegioesAtuacao (opcional)
  'Experiência em limpeza comercial', // Observacoes (opcional)
)

// Criar as equipes de teste
export const equipeSeeds = [
  (() => {
    const equipe = new Equipe('Equipe Limpeza Residencial')
    equipe.adicionarColaborador(joao, FuncaoColaborador.LIDER)
    equipe.adicionarColaborador(maria, FuncaoColaborador.MOTORISTA)
    equipe.adicionarColaborador(pedro, FuncaoColaborador.EXECUTOR)
    return equipe
  })(),

  (() => {
    const equipe = new Equipe('Equipe Limpeza Comercial')
    equipe.adicionarColaborador(ana, FuncaoColaborador.LIDER)
    equipe.adicionarColaborador(pedro, FuncaoColaborador.EXECUTOR)
    return equipe
  })(),
]
