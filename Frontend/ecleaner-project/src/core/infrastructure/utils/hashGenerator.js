/**
 * Gerador de Hash SHA-256
 *
 * Utilizado para criar assinaturas digitais seguras
 */

/**
 * Gera hash SHA-256 usando Web Crypto API (nativo do navegador)
 * @param {string} conteudo - Conteúdo a ser hasheado
 * @returns {Promise<string>} Hash em formato hexadecimal
 */
export async function gerarHash(conteudo) {
  // Converte string para ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(conteudo)

  // Gera hash SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // Converte ArrayBuffer para string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

/**
 * Gera um salt único usando valores criptograficamente seguros
 * @returns {string} Salt em formato hexadecimal
 */
export function gerarSaltUnico() {
  const array = new Uint8Array(16) // 128 bits
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Gera hash de assinatura digital
 * Combina: nome + número documento + timestamp + salt
 *
 * @param {Object} dados - Dados da assinatura
 * @param {string} dados.nome - Nome completo do signatário
 * @param {string} dados.numeroDocumento - Número do documento
 * @param {Date|string} dados.timestamp - Data/hora da assinatura
 * @param {string} salt - Salt único do contrato
 * @returns {Promise<string>} Hash SHA-256
 */
export async function gerarHashAssinatura(dados, salt) {
  const { nome, numeroDocumento, timestamp } = dados

  // Normaliza timestamp para ISO string
  const timestampISO =
    timestamp instanceof Date ? timestamp.toISOString() : new Date(timestamp).toISOString()

  // Remove caracteres especiais do documento
  const documentoLimpo = numeroDocumento.replace(/[^\w]/g, '')

  // Combina todos os dados com separador |
  const conteudo = `${nome}|${documentoLimpo}|${timestampISO}|${salt}`

  return await gerarHash(conteudo)
}

/**
 * Valida um hash de assinatura
 * @param {Object} dados - Dados originais da assinatura
 * @param {string} hashEsperado - Hash a ser validado
 * @param {string} salt - Salt usado na geração
 * @returns {Promise<boolean>}
 */
export async function validarHashAssinatura(dados, hashEsperado, salt) {
  const hashCalculado = await gerarHashAssinatura(dados, salt)
  return hashCalculado === hashEsperado
}

/**
 * Gera um UUID v4 (para tokens de assinatura)
 * @returns {string} UUID no formato xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export function gerarUUID() {
  return crypto.randomUUID()
}

/**
 * Gera um token de assinatura único
 * Combina UUID + timestamp para garantir unicidade absoluta
 * @returns {string}
 */
export function gerarTokenAssinatura() {
  return gerarUUID()
}

/**
 * Gera número de contrato no formato CONT-YYYY-NNNN
 * @param {number} sequencial - Número sequencial do contrato no ano
 * @returns {string}
 */
export function gerarNumeroContrato(sequencial) {
  const ano = new Date().getFullYear()
  const numero = sequencial.toString().padStart(4, '0')
  return `CONT-${ano}-${numero}`
}
