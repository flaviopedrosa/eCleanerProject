/**
 * Validadores de Documentos
 *
 * Valida diferentes tipos de documentos de identificação
 */

import { TipoDocumento } from '../../domain/enums/tipoDocumento'

/**
 * Valida CPF (Cadastro de Pessoa Física - Brasil)
 * @param {string} cpf - CPF com ou sem formatação
 * @returns {boolean}
 */
export function validarCPF(cpf) {
  if (!cpf) return false

  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '')

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validação do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) return false

  // Validação do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf.charAt(10))) return false

  return true
}

/**
 * Valida CNPJ (Cadastro Nacional de Pessoa Jurídica - Brasil)
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {boolean}
 */
export function validarCNPJ(cnpj) {
  if (!cnpj) return false

  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '')

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validação do primeiro dígito verificador
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  const digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(0))) return false

  // Validação do segundo dígito verificador
  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(1))) return false

  return true
}

/**
 * Valida SSN (Social Security Number - EUA)
 * Validação básica: 9 dígitos no formato XXX-XX-XXXX
 * @param {string} ssn - SSN com ou sem formatação
 * @returns {boolean}
 */
export function validarSSN(ssn) {
  if (!ssn) return false

  // Remove caracteres não numéricos
  const numeros = ssn.replace(/[^\d]/g, '')

  // Verifica se tem 9 dígitos
  if (numeros.length !== 9) return false

  // Verifica se não são todos zeros
  if (numeros === '000000000') return false

  // Verifica área code (primeiros 3 dígitos)
  const areaCode = parseInt(numeros.substring(0, 3))
  if (areaCode === 0 || areaCode === 666 || areaCode >= 900) return false

  // Verifica group number (dígitos 4-5)
  const groupNumber = parseInt(numeros.substring(3, 5))
  if (groupNumber === 0) return false

  // Verifica serial number (dígitos 6-9)
  const serialNumber = parseInt(numeros.substring(5, 9))
  if (serialNumber === 0) return false

  return true
}

/**
 * Valida Passaporte
 * Validação básica: 6-9 caracteres alfanuméricos
 * @param {string} passport
 * @returns {boolean}
 */
export function validarPassaporte(passport) {
  if (!passport) return false

  // Remove espaços
  passport = passport.trim()

  // Verifica tamanho (6-9 caracteres)
  if (passport.length < 6 || passport.length > 9) return false

  // Verifica se contém apenas letras e números
  if (!/^[A-Z0-9]+$/i.test(passport)) return false

  return true
}

/**
 * Valida documento genérico (Driver's License, Tax ID, National ID)
 * Validação básica: mínimo 3 caracteres alfanuméricos
 * @param {string} documento
 * @returns {boolean}
 */
export function validarDocumentoGenerico(documento) {
  if (!documento) return false

  // Remove espaços
  documento = documento.trim()

  // Verifica tamanho mínimo
  if (documento.length < 3) return false

  // Verifica se contém pelo menos um caractere alfanumérico
  if (!/[A-Z0-9]/i.test(documento)) return false

  return true
}

/**
 * Valida documento conforme o tipo
 * @param {string} tipo - Tipo do documento (TipoDocumento enum)
 * @param {string} numero - Número do documento
 * @returns {boolean}
 */
export function validarDocumento(tipo, numero) {
  if (!tipo || !numero) return false

  switch (tipo) {
    case TipoDocumento.CPF:
      return validarCPF(numero)

    case TipoDocumento.CNPJ:
      return validarCNPJ(numero)

    case TipoDocumento.SSN:
      return validarSSN(numero)

    case TipoDocumento.PASSPORT:
      return validarPassaporte(numero)

    case TipoDocumento.DRIVER_LICENSE:
    case TipoDocumento.TAX_ID:
    case TipoDocumento.NATIONAL_ID:
      return validarDocumentoGenerico(numero)

    default:
      return false
  }
}

/**
 * Formata CPF: 12345678900 → 123.456.789-00
 */
export function formatarCPF(cpf) {
  if (!cpf) return ''
  const numeros = cpf.replace(/[^\d]/g, '')
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formata CNPJ: 12345678000100 → 12.345.678/0001-00
 */
export function formatarCNPJ(cnpj) {
  if (!cnpj) return ''
  const numeros = cnpj.replace(/[^\d]/g, '')
  return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

/**
 * Formata SSN: 123456789 → 123-45-6789
 */
export function formatarSSN(ssn) {
  if (!ssn) return ''
  const numeros = ssn.replace(/[^\d]/g, '')
  return numeros.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
}

/**
 * Formata documento conforme o tipo
 */
export function formatarDocumento(tipo, numero) {
  if (!numero) return ''

  switch (tipo) {
    case TipoDocumento.CPF:
      return formatarCPF(numero)

    case TipoDocumento.CNPJ:
      return formatarCNPJ(numero)

    case TipoDocumento.SSN:
      return formatarSSN(numero)

    default:
      return numero
  }
}

/**
 * Mascara documento para exibição (oculta parte dos dígitos)
 * Ex: 123.456.789-00 → ***.456.789-**
 */
export function mascaraDocumento(tipo, numero) {
  if (!numero) return ''

  const formatado = formatarDocumento(tipo, numero)

  switch (tipo) {
    case TipoDocumento.CPF:
      return formatado.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.$2.$3-**')

    case TipoDocumento.CNPJ:
      return formatado.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})/, '**.***.***/****-**')

    case TipoDocumento.SSN:
      return formatado.replace(/(\d{3})-(\d{2})-(\d{4})/, '***-**-' + formatado.slice(-4))

    case TipoDocumento.PASSPORT:
      return '****' + numero.slice(-2)

    default:
      if (numero.length > 4) {
        return '****' + numero.slice(-4)
      }
      return '****'
  }
}
