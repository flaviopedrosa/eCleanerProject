import { describe, it, expect, vi } from 'vitest'
import {
  isValidDate,
  isFutureDate,
  isPastDate,
  isDateAfter,
  isDateBefore,
  formatDateForLocale,
  createDateValidators,
  validateDateRange,
} from '@/core/utils/dateValidation'

describe('dateValidation', () => {
  describe('isValidDate', () => {
    it('deve retornar true para datas válidas', () => {
      expect(isValidDate('2023-12-25')).toBe(true)
      expect(isValidDate('2024-02-29')).toBe(true) // Ano bissexto
      expect(isValidDate('2023-01-01')).toBe(true)
    })

    it('deve retornar false para datas inválidas', () => {
      expect(isValidDate('2023-13-01')).toBe(false) // Mês inválido
      expect(isValidDate('2023-02-30')).toBe(false) // Dia inválido
      expect(isValidDate('invalid-date')).toBe(false)
      expect(isValidDate('')).toBe(false)
      expect(isValidDate(null)).toBe(false)
      expect(isValidDate(undefined)).toBe(false)
    })

    it('deve retornar false para formatos incorretos', () => {
      expect(isValidDate('25/12/2023')).toBe(false) // Formato brasileiro
      expect(isValidDate('12/25/2023')).toBe(false) // Formato americano
      expect(isValidDate('2023-12-25T10:30:00')).toBe(false) // Com horário
    })
  })

  describe('isFutureDate', () => {
    it('deve retornar true para datas futuras', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowStr = tomorrow.toISOString().split('T')[0]

      expect(isFutureDate(tomorrowStr)).toBe(true)
    })

    it('deve retornar false para datas passadas', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      expect(isFutureDate(yesterdayStr)).toBe(false)
    })

    it('deve retornar false para datas inválidas', () => {
      expect(isFutureDate('invalid-date')).toBe(false)
      expect(isFutureDate('')).toBe(false)
    })
  })

  describe('isPastDate', () => {
    it('deve retornar true para datas passadas', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      expect(isPastDate(yesterdayStr)).toBe(true)
    })

    it('deve retornar false para datas futuras', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowStr = tomorrow.toISOString().split('T')[0]

      expect(isPastDate(tomorrowStr)).toBe(false)
    })
  })

  describe('isDateAfter', () => {
    it('deve retornar true quando a primeira data é posterior', () => {
      expect(isDateAfter('2023-12-25', '2023-12-24')).toBe(true)
      expect(isDateAfter('2024-01-01', '2023-12-31')).toBe(true)
    })

    it('deve retornar false quando a primeira data é anterior ou igual', () => {
      expect(isDateAfter('2023-12-24', '2023-12-25')).toBe(false)
      expect(isDateAfter('2023-12-25', '2023-12-25')).toBe(false)
    })

    it('deve retornar false para datas inválidas', () => {
      expect(isDateAfter('invalid', '2023-12-25')).toBe(false)
      expect(isDateAfter('2023-12-25', 'invalid')).toBe(false)
    })
  })

  describe('isDateBefore', () => {
    it('deve retornar true quando a primeira data é anterior', () => {
      expect(isDateBefore('2023-12-24', '2023-12-25')).toBe(true)
      expect(isDateBefore('2023-12-31', '2024-01-01')).toBe(true)
    })

    it('deve retornar false quando a primeira data é posterior ou igual', () => {
      expect(isDateBefore('2023-12-25', '2023-12-24')).toBe(false)
      expect(isDateBefore('2023-12-25', '2023-12-25')).toBe(false)
    })
  })

  describe('formatDateForLocale', () => {
    it('deve formatar datas em português brasileiro', () => {
      const formatted = formatDateForLocale('2023-12-25', 'pt-BR')
      expect(formatted).toBe('25/12/2023')
    })

    it('deve formatar datas em inglês americano', () => {
      const formatted = formatDateForLocale('2023-12-25', 'en-US')
      expect(formatted).toBe('12/25/2023')
    })

    it('deve retornar string vazia para datas inválidas', () => {
      expect(formatDateForLocale('invalid-date', 'pt-BR')).toBe('')
      expect(formatDateForLocale('', 'pt-BR')).toBe('')
    })
  })

  describe('createDateValidators', () => {
    const mockT = vi.fn((key, params) => {
      const translations = {
        'forms.validation.dateRequired': 'Data é obrigatória',
        'forms.validation.invalidDate': 'Data inválida',
        'forms.validation.futureDate': 'A data deve ser futura',
        'forms.validation.pastDate': 'A data deve ser no passado',
        'forms.validation.dateAfter': `A data deve ser posterior a ${params?.date || 'referência'}`,
        'forms.validation.dateBefore': `A data deve ser anterior a ${params?.date || 'referência'}`,
        'forms.validation.validityAfterEmission':
          'A data de validade deve ser posterior à data de emissão',
      }
      return translations[key] || key
    })

    const validators = createDateValidators(mockT)

    describe('required validator', () => {
      it('deve retornar erro para valores vazios', () => {
        expect(validators.required('')).toBe('Data é obrigatória')
        expect(validators.required(null)).toBe('Data é obrigatória')
        expect(validators.required(undefined)).toBe('Data é obrigatória')
      })

      it('deve retornar true para valores preenchidos', () => {
        expect(validators.required('2023-12-25')).toBe(true)
        expect(validators.required('any-value')).toBe(true)
      })
    })

    describe('validDate validator', () => {
      it('deve retornar true para valores vazios', () => {
        expect(validators.validDate('')).toBe(true)
        expect(validators.validDate(null)).toBe(true)
      })

      it('deve retornar true para datas válidas', () => {
        expect(validators.validDate('2023-12-25')).toBe(true)
      })

      it('deve retornar erro para datas inválidas', () => {
        expect(validators.validDate('invalid-date')).toBe('Data inválida')
        expect(validators.validDate('2023-13-01')).toBe('Data inválida')
      })
    })

    describe('futureDate validator', () => {
      it('deve retornar true para valores vazios', () => {
        expect(validators.futureDate('')).toBe(true)
      })

      it('deve retornar erro para datas inválidas', () => {
        expect(validators.futureDate('invalid-date')).toBe('Data inválida')
      })

      it('deve validar datas futuras', () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowStr = tomorrow.toISOString().split('T')[0]

        expect(validators.futureDate(tomorrowStr)).toBe(true)
      })
    })

    describe('validityAfterEmission validator', () => {
      const validator = validators.validityAfterEmission('2023-12-24')

      it('deve retornar true para valores vazios', () => {
        expect(validator('')).toBe(true)
      })

      it('deve retornar true quando validade é posterior à emissão', () => {
        expect(validator('2023-12-25')).toBe(true)
      })

      it('deve retornar erro quando validade é anterior à emissão', () => {
        expect(validator('2023-12-23')).toBe(
          'A data de validade deve ser posterior à data de emissão',
        )
      })
    })
  })

  describe('validateDateRange', () => {
    const mockT = vi.fn((key) => {
      const translations = {
        'forms.validation.invalidDate': 'Data inválida',
        'forms.validation.validityAfterEmission':
          'A data de validade deve ser posterior à data de emissão',
      }
      return translations[key] || key
    })

    it('deve retornar válido para período correto', () => {
      const result = validateDateRange('2023-12-24', '2023-12-25', mockT)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual([])
    })

    it('deve retornar inválido para datas inválidas', () => {
      const result = validateDateRange('invalid', '2023-12-25', mockT)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Data inválida')
    })

    it('deve retornar inválido quando data inicial é posterior à final', () => {
      const result = validateDateRange('2023-12-25', '2023-12-24', mockT)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('A data de validade deve ser posterior à data de emissão')
    })
  })
})
