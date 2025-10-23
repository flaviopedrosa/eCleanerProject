import { describe, it, expect } from 'vitest'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'
import ptBR from '@/i18n/pt-BR'
import enUS from '@/i18n/en-US'

describe('Traduções de Status de Orçamento', () => {
  it('deve ter traduções em português para todos os status', () => {
    Object.values(StatusOrcamento).forEach((status) => {
      const traducao = ptBR.enums.statusOrcamento[status]
      expect(traducao).toBeDefined()
      expect(traducao).not.toBe('')
      expect(typeof traducao).toBe('string')
    })
  })

  it('deve ter traduções em inglês para todos os status', () => {
    Object.values(StatusOrcamento).forEach((status) => {
      const traducao = enUS.enums.statusOrcamento[status]
      expect(traducao).toBeDefined()
      expect(traducao).not.toBe('')
      expect(typeof traducao).toBe('string')
    })
  })

  it('deve ter traduções específicas corretas em português', () => {
    expect(ptBR.enums.statusOrcamento.RASCUNHO).toBe('Rascunho')
    expect(ptBR.enums.statusOrcamento.ENVIADO).toBe('Enviado')
    expect(ptBR.enums.statusOrcamento.APROVADO).toBe('Aprovado')
    expect(ptBR.enums.statusOrcamento.RECUSADO).toBe('Recusado')
    expect(ptBR.enums.statusOrcamento.EXPIRADO).toBe('Expirado')
    expect(ptBR.enums.statusOrcamento.CANCELADO).toBe('Cancelado')
  })

  it('deve ter traduções específicas corretas em inglês', () => {
    expect(enUS.enums.statusOrcamento.RASCUNHO).toBe('Draft')
    expect(enUS.enums.statusOrcamento.ENVIADO).toBe('Sent')
    expect(enUS.enums.statusOrcamento.APROVADO).toBe('Approved')
    expect(enUS.enums.statusOrcamento.RECUSADO).toBe('Refused')
    expect(enUS.enums.statusOrcamento.EXPIRADO).toBe('Expired')
    expect(enUS.enums.statusOrcamento.CANCELADO).toBe('Cancelled')
  })

  it('deve manter compatibilidade com status antigos', () => {
    // Verificar se os status antigos ainda existem para compatibilidade
    expect(ptBR.enums.statusOrcamento.PENDENTE).toBe('Pendente')
    expect(ptBR.enums.statusOrcamento.REJEITADO).toBe('Rejeitado')
    expect(enUS.enums.statusOrcamento.PENDENTE).toBe('Pending')
    expect(enUS.enums.statusOrcamento.REJEITADO).toBe('Rejected')
  })

  it('deve ter o mesmo número de status no enum e nas traduções', () => {
    const enumKeys = Object.keys(StatusOrcamento)
    const ptTranslationKeys = Object.keys(ptBR.enums.statusOrcamento).filter((key) =>
      // Filtrar apenas as chaves que correspondem aos valores do enum
      enumKeys.includes(key),
    )
    const enTranslationKeys = Object.keys(enUS.enums.statusOrcamento).filter((key) =>
      enumKeys.includes(key),
    )

    expect(ptTranslationKeys).toHaveLength(enumKeys.length)
    expect(enTranslationKeys).toHaveLength(enumKeys.length)
  })
})
