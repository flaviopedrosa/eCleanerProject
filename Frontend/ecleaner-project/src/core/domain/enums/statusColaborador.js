/**
 * Enum que representa os possíveis status do cadastro de um colaborador.
 * @readonly
 * @enum {string}
 */
export const StatusColaborador = {
  /** Cadastro em análise */
  EM_ANALISE: 'EM_ANALISE',
  /** Cadastro aprovado */
  APROVADO: 'APROVADO',
  /** Cadastro rejeitado */
  REJEITADO: 'REJEITADO',
  /** Colaborador ativo */
  ATIVO: 'ATIVO',
  /** Colaborador inativo */
  INATIVO: 'INATIVO',
  /** Colaborador em período de experiência */
  EM_EXPERIENCIA: 'EM_EXPERIENCIA',
  /** Colaborador desligado */
  DESLIGADO: 'DESLIGADO',
}
