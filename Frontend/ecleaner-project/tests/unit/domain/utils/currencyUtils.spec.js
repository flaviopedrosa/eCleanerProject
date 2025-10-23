import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  parseCurrency,
  currencyMask,
  getCurrencyConfig,
} from '@/core/domain/utils/currencyUtils'

describe('Currency Utils', () => {
  describe('formatCurrency', () => {
    it('formata valor em real brasileiro', () => {
      const result = formatCurrency(123.45, 'pt-BR', 'BRL')
      expect(result).toBe('R$ 123,45')
    })

    it('formata valor em dólar americano', () => {
      const result = formatCurrency(123.45, 'en-US', 'USD')
      expect(result).toBe('$123.45')
    })

    it('retorna string vazia para valor inválido', () => {
      const result = formatCurrency(null, 'pt-BR', 'BRL')
      expect(result).toBe('')
    })
  })

  describe('parseCurrency', () => {
    it('converte valor formatado em real para número', () => {
      const result = parseCurrency('R$ 123,45')
      expect(result).toBe(123.45)
    })

    it('converte valor formatado em dólar para número', () => {
      const result = parseCurrency('$123.45')
      expect(result).toBe(123.45)
    })

    it('retorna 0 para string vazia', () => {
      const result = parseCurrency('')
      expect(result).toBe(0)
    })
  })

  describe('currencyMask', () => {
    it('aplica máscara para real brasileiro', () => {
      const result = currencyMask('12345', 'pt-BR', 'BRL')
      expect(result).toBe('R$ 123,45')
    })

    it('aplica máscara para dólar americano', () => {
      const result = currencyMask('12345', 'en-US', 'USD')
      expect(result).toBe('$123.45')
    })

    it('retorna string vazia para valor vazio', () => {
      const result = currencyMask('', 'pt-BR', 'BRL')
      expect(result).toBe('')
    })
  })

  describe('getCurrencyConfig', () => {
    it('retorna configuração para português brasileiro', () => {
      const result = getCurrencyConfig('pt-BR')
      expect(result).toEqual({
        currency: 'BRL',
        symbol: 'R$',
        placeholder: 'R$ 0,00',
      })
    })

    it('retorna configuração para inglês americano', () => {
      const result = getCurrencyConfig('en-US')
      expect(result).toEqual({
        currency: 'USD',
        symbol: '$',
        placeholder: '$ 0.00',
      })
    })

    it('retorna configuração padrão para locale inválido', () => {
      const result = getCurrencyConfig('invalid-locale')
      expect(result).toEqual({
        currency: 'BRL',
        symbol: 'R$',
        placeholder: 'R$ 0,00',
      })
    })
  })
})
