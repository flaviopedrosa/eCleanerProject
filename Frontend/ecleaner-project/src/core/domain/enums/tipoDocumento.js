/**
 * Enum de Tipos de Documento de Identificação
 *
 * Suporta múltiplos tipos de documentos para assinatura internacional
 */
export const TipoDocumento = {
  CPF: 'CPF', // Cadastro de Pessoa Física (Brasil)
  CNPJ: 'CNPJ', // Cadastro Nacional de Pessoa Jurídica (Brasil)
  SSN: 'SSN', // Social Security Number (EUA)
  PASSPORT: 'PASSPORT', // Passaporte (Internacional)
  DRIVER_LICENSE: 'DRIVER_LICENSE', // Carteira de Motorista
  TAX_ID: 'TAX_ID', // ID Fiscal Genérico
  NATIONAL_ID: 'NATIONAL_ID', // ID Nacional Genérico
}

/**
 * Retorna o label traduzido para o tipo de documento
 * @param {string} tipo - Tipo do documento
 * @param {string} locale - Locale atual (pt-BR ou en-US)
 */
export function getTipoDocumentoLabel(tipo, locale = 'pt-BR') {
  const labels = {
    'pt-BR': {
      CPF: 'CPF (Brasil)',
      CNPJ: 'CNPJ (Brasil)',
      SSN: 'SSN (EUA)',
      PASSPORT: 'Passaporte',
      DRIVER_LICENSE: 'Carteira de Motorista',
      TAX_ID: 'ID Fiscal',
      NATIONAL_ID: 'ID Nacional',
    },
    'en-US': {
      CPF: 'CPF (Brazil)',
      CNPJ: 'CNPJ (Brazil)',
      SSN: 'SSN (USA)',
      PASSPORT: 'Passport',
      DRIVER_LICENSE: "Driver's License",
      TAX_ID: 'Tax ID',
      NATIONAL_ID: 'National ID',
    },
  }

  return labels[locale]?.[tipo] || tipo
}

/**
 * Retorna a máscara para o tipo de documento (se aplicável)
 */
export function getDocumentoMask(tipo) {
  const masks = {
    CPF: '###.###.###-##',
    CNPJ: '##.###.###/####-##',
    SSN: '###-##-####',
  }
  return masks[tipo] || null
}

/**
 * Retorna o placeholder para o input de documento
 */
export function getDocumentoPlaceholder(tipo, locale = 'pt-BR') {
  const placeholders = {
    'pt-BR': {
      CPF: '000.000.000-00',
      CNPJ: '00.000.000/0000-00',
      SSN: '000-00-0000',
      PASSPORT: 'AB123456',
      DRIVER_LICENSE: '123456789',
      TAX_ID: '123456789',
      NATIONAL_ID: '123456789',
    },
    'en-US': {
      CPF: '000.000.000-00',
      CNPJ: '00.000.000/0000-00',
      SSN: '000-00-0000',
      PASSPORT: 'AB123456',
      DRIVER_LICENSE: '123456789',
      TAX_ID: '123456789',
      NATIONAL_ID: '123456789',
    },
  }

  return placeholders[locale]?.[tipo] || ''
}

/**
 * Retorna se o tipo de documento requer validação estrita
 */
export function requiresStrictValidation(tipo) {
  return tipo === TipoDocumento.CPF || tipo === TipoDocumento.CNPJ
}
