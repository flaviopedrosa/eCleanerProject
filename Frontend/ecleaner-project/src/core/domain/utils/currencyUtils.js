/**
 * Utilitários para formatação de moeda
 */

/**
 * Formata um valor numérico para moeda de acordo com o locale
 * @param {number} value - Valor a ser formatado
 * @param {string} locale - Locale para formatação (ex: 'pt-BR', 'en-US')
 * @param {string} currency - Código da moeda (ex: 'BRL', 'USD')
 * @returns {string} Valor formatado como moeda
 */
export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  if (!value || isNaN(value)) return ''

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Remove formatação de moeda e retorna apenas o número
 * @param {string} formattedValue - Valor formatado como moeda
 * @returns {number} Valor numérico
 */
export function parseCurrency(formattedValue) {
  if (!formattedValue) return 0

  // Remove todos os caracteres que não são dígitos, vírgula ou ponto
  const cleaned = formattedValue.replace(/[^\d,.-]/g, '')

  // Substitui vírgula por ponto para conversão
  const normalized = cleaned.replace(',', '.')

  return parseFloat(normalized) || 0
}

/**
 * Máscara de entrada para campo de moeda
 * @param {string} value - Valor de entrada
 * @param {string} locale - Locale para formatação
 * @param {string} currency - Código da moeda
 * @returns {string} Valor com máscara aplicada
 */
export function currencyMask(value, locale = 'pt-BR', currency = 'BRL') {
  if (!value) return ''

  // Remove caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  if (!numericValue) return ''

  // Converte para centavos
  const cents = parseInt(numericValue, 10)
  const amount = cents / 100

  return formatCurrency(amount, locale, currency)
}

/**
 * Obtém o símbolo da moeda baseado no locale
 * @param {string} locale - Locale
 * @returns {object} Configuração da moeda
 */
export function getCurrencyConfig(locale = 'pt-BR') {
  const configs = {
    'pt-BR': {
      currency: 'BRL',
      symbol: 'R$',
      placeholder: 'R$ 0,00',
    },
    'en-US': {
      currency: 'USD',
      symbol: '$',
      placeholder: '$ 0.00',
    },
  }

  return configs[locale] || configs['pt-BR']
}
