import { Schedule } from '../../../domain/entities/schedule'
import { TipoEmpresa } from '../../../domain/enums/tipoEmpresa'
import { Pessoa } from '../../../domain/entities/pessoa'

export const scheduleSeeds = [
  new Schedule(
    new Pessoa(
      'João',
      'Silva',
      'joao.silva@limpezaexpress.com.br',
      '(11) 3333-4444',
      '(11) 98765-4321',
    ),
    'Limpeza Express LTDA',
    '12.345.678/0001-90',
    '(11) 98765-4321',
    'contato@limpezaexpress.com.br',
    TipoEmpresa.LIMPEZA,
    null,
  ),
  new Schedule(
    new Pessoa(
      'Maria',
      'Santos',
      'maria.santos@casaclean.com.br',
      '(11) 2222-3333',
      '(11) 91234-5678',
    ),
    'Casa Clean Serviços',
    '98.765.432/0001-10',
    '(11) 91234-5678',
    'contato@casaclean.com.br',
    TipoEmpresa.LIMPEZA,
    null,
  ),
  new Schedule(
    new Pessoa(
      'Pedro',
      'Oliveira',
      'pedro.oliveira@higienetotal.com.br',
      '(11) 4444-5555',
      '(11) 94567-8901',
    ),
    'Higiene Total',
    '45.678.901/0001-23',
    '(11) 94567-8901',
    'contato@higienetotal.com.br',
    TipoEmpresa.LIMPEZA,
    null,
  ),
]
