import { describe, it, expect } from 'vitest'
import { Material } from '../../../../src/core/domain/entities/material'

describe('Material', () => {
  // Imagem exemplo para testes (pixel 1x1 transparente em Base64)
  const imagemBase64Exemplo =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

  it('deve criar uma inst\u00e2ncia de Material com os dados corretos', () => {
    const descricao = 'Porcelanato Calacatta 90x90cm'
    const url = 'https://www.exemplo-loja.com.br/porcelanato-calacatta'

    const material = new Material(descricao, imagemBase64Exemplo, url)

    expect(material.Id).toBeDefined()
    expect(material.Descricao).toBe(descricao)
    expect(material.Imagem).toBe(imagemBase64Exemplo)
    expect(material.Url).toBe(url)
  })

  it('deve criar diferentes IDs para diferentes inst\u00e2ncias', () => {
    const material1 = new Material('Material 1', imagemBase64Exemplo, 'http://exemplo1.com')
    const material2 = new Material('Material 2', imagemBase64Exemplo, 'http://exemplo2.com')

    expect(material1.Id).not.toBe(material2.Id)
  })

  it('deve aceitar imagens em diferentes formatos Base64', () => {
    const imagemJpeg = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
    const material = new Material('Material JPEG', imagemJpeg, 'http://exemplo.com')

    expect(material.Imagem).toBe(imagemJpeg)
  })

  it('deve permitir URL nula ou vazia', () => {
    const material1 = new Material('Material sem URL', imagemBase64Exemplo, '')
    const material2 = new Material('Material URL nula', imagemBase64Exemplo, null)

    expect(material1.Url).toBe('')
    expect(material2.Url).toBeNull()
  })
})
