/**
 * Utilitários para validação de datas com suporte a internacionalização
 */

/**
 * Valida se uma string representa uma data válida
 * @param {string} dateString - String da data no formato YYYY-MM-DD
 * @returns {boolean} True se a data for válida
 */
export function isValidDate(dateString) {
  if (!dateString || typeof dateString !== 'string') return false

  // Verificar formato YYYY-MM-DD
  if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/)) return false

  const date = new Date(dateString + 'T00:00:00.000Z')

  // Verificar se a data é válida e se não houve overflow/underflow
  if (isNaN(date.getTime())) return false

  // Verificar se os componentes correspondem ao input (detectar datas inválidas como 2023-02-30)
  const [year, month, day] = dateString.split('-').map(Number)
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  )
}

/**
 * Valida se uma data é futura
 * @param {string} dateString - String da data no formato YYYY-MM-DD
 * @returns {boolean} True se a data for futura
 */
export function isFutureDate(dateString) {
  if (!isValidDate(dateString)) return false

  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date > today
}

/**
 * Valida se uma data é passada
 * @param {string} dateString - String da data no formato YYYY-MM-DD
 * @returns {boolean} True se a data for passada
 */
export function isPastDate(dateString) {
  if (!isValidDate(dateString)) return false

  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date < today
}

/**
 * Valida se uma data é posterior a outra
 * @param {string} dateString - String da data a ser validada
 * @param {string} afterDateString - String da data de referência
 * @returns {boolean} True se a primeira data for posterior à segunda
 */
export function isDateAfter(dateString, afterDateString) {
  if (!isValidDate(dateString) || !isValidDate(afterDateString)) return false

  const date = new Date(dateString)
  const afterDate = new Date(afterDateString)

  return date > afterDate
}

/**
 * Valida se uma data é anterior a outra
 * @param {string} dateString - String da data a ser validada
 * @param {string} beforeDateString - String da data de referência
 * @returns {boolean} True se a primeira data for anterior à segunda
 */
export function isDateBefore(dateString, beforeDateString) {
  if (!isValidDate(dateString) || !isValidDate(beforeDateString)) return false

  const date = new Date(dateString)
  const beforeDate = new Date(beforeDateString)

  return date < beforeDate
}

/**
 * Formata uma data de acordo com o locale
 * @param {string} dateString - String da data no formato YYYY-MM-DD
 * @param {string} locale - Locale para formatação (ex: 'pt-BR', 'en-US')
 * @returns {string} Data formatada
 */
export function formatDateForLocale(dateString, locale = 'pt-BR') {
  if (!isValidDate(dateString)) return ''

  // Usar parseando diretamente os componentes para evitar problemas de timezone
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat(locale).format(date)
}

/**
 * Cria funções de validação para uso com vue-i18n
 * @param {Function} t - Função de tradução do vue-i18n
 * @returns {Object} Objeto com funções de validação
 */
export function createDateValidators(t) {
  return {
    required: (val) => !!val || t('forms.validation.dateRequired'),

    validDate: (val) => {
      if (!val) return true // Deixar a validação required lidar com campos obrigatórios
      return isValidDate(val) || t('forms.validation.invalidDate')
    },

    futureDate: (val) => {
      if (!val) return true
      if (!isValidDate(val)) return t('forms.validation.invalidDate')
      return isFutureDate(val) || t('forms.validation.futureDate')
    },

    pastDate: (val) => {
      if (!val) return true
      if (!isValidDate(val)) return t('forms.validation.invalidDate')
      return isPastDate(val) || t('forms.validation.pastDate')
    },

    dateAfter: (referenceDate) => (val) => {
      if (!val) return true
      if (!isValidDate(val)) return t('forms.validation.invalidDate')
      if (!isValidDate(referenceDate)) return true

      const formattedReferenceDate = formatDateForLocale(referenceDate)
      return (
        isDateAfter(val, referenceDate) ||
        t('forms.validation.dateAfter', { date: formattedReferenceDate })
      )
    },

    dateBefore: (referenceDate) => (val) => {
      if (!val) return true
      if (!isValidDate(val)) return t('forms.validation.invalidDate')
      if (!isValidDate(referenceDate)) return true

      const formattedReferenceDate = formatDateForLocale(referenceDate)
      return (
        isDateBefore(val, referenceDate) ||
        t('forms.validation.dateBefore', { date: formattedReferenceDate })
      )
    },

    validityAfterEmission: (emissionDate) => (val) => {
      if (!val || !emissionDate) return true
      if (!isValidDate(val) || !isValidDate(emissionDate)) return t('forms.validation.invalidDate')

      return isDateAfter(val, emissionDate) || t('forms.validation.validityAfterEmission')
    },
  }
}

/**
 * Valida um período de datas (data inicial e final)
 * @param {string} startDate - Data inicial
 * @param {string} endDate - Data final
 * @param {Function} t - Função de tradução
 * @returns {Object} Resultado da validação com isValid e errors
 */
export function validateDateRange(startDate, endDate, t) {
  const errors = []

  if (startDate && !isValidDate(startDate)) {
    errors.push(t('forms.validation.invalidDate'))
  }

  if (endDate && !isValidDate(endDate)) {
    errors.push(t('forms.validation.invalidDate'))
  }

  if (startDate && endDate && isValidDate(startDate) && isValidDate(endDate)) {
    if (!isDateBefore(startDate, endDate)) {
      errors.push(t('forms.validation.validityAfterEmission'))
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
