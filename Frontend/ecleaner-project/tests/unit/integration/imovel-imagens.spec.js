import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { Cliente } from '@/core/domain/entities/cliente'

describe('Integração: Persistência de Imagens em Imóveis', () => {
  let repository
  let enderecoExemplo
  let clienteExemplo

  beforeEach(() => {
    repository = new ImovelRepository()

    enderecoExemplo = new Endereco(
      'Casa Principal',
      'Rua Teste',
      '123',
      '01234-567',
      'Centro',
      'São Paulo',
      'SP',
      'Brasil',
    )

    clienteExemplo = new Cliente('João', 'Silva', 'joao@email.com', '11987654321', '1122334455')
  })

  afterEach(async () => {
    await repository.clear()
  })

  it('deve salvar e carregar imóvel com imagens completas', async () => {
    // Dados de imagem simulados (como viriam do formulário)
    const imagensFormulario = [
      {
        id: 'img1',
        nome: 'sala.jpg',
        preview: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA...', // Base64 simulado
        descricao: 'Foto da sala',
        tipo: 'image/jpeg',
        tamanho: 1024000,
        dataUpload: new Date().toISOString(),
      },
      {
        id: 'img2',
        nome: 'quarto.jpg',
        preview: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA...', // Base64 simulado
        descricao: 'Foto do quarto principal',
        tipo: 'image/jpeg',
        tamanho: 854000,
        dataUpload: new Date().toISOString(),
      },
    ]

    // Cria imóvel com imagens (como no formulário)
    const imovel = new Imovel(
      8,
      3,
      2,
      150,
      enderecoExemplo,
      clienteExemplo,
      'Casa com imagens',
      imagensFormulario, // Passa as imagens para o construtor
    )

    console.log('Imóvel criado com imagens:', {
      id: imovel.Id,
      totalImagens: imovel.TotalImagens,
      imagens: imovel.Imagens.map((img) => ({
        id: img.id,
        nome: img.nome,
        descricao: img.descricao,
      })),
    })

    // Salva o imóvel
    const imovelSalvo = await repository.save(imovel)

    console.log('Imóvel salvo:', {
      id: imovelSalvo.Id,
      totalImagens: imovelSalvo.TotalImagens,
      imagens: imovelSalvo.Imagens.map((img) => ({
        id: img.id,
        nome: img.nome,
        descricao: img.descricao,
      })),
    })

    // Verifica se foi salvo com as imagens
    expect(imovelSalvo.TotalImagens).toBe(2)
    expect(imovelSalvo.possuiImagens()).toBe(true)

    // Carrega o imóvel do repositório
    const imovelCarregado = await repository.getById(imovelSalvo.Id)

    console.log('Imóvel carregado:', {
      id: imovelCarregado.Id,
      totalImagens: imovelCarregado.TotalImagens,
      imagens: imovelCarregado.Imagens.map((img) => ({
        id: img.id,
        nome: img.nome,
        descricao: img.descricao,
      })),
    })

    // Verifica se as imagens foram persistidas corretamente
    expect(imovelCarregado).toBeDefined()
    expect(imovelCarregado.TotalImagens).toBe(2)
    expect(imovelCarregado.possuiImagens()).toBe(true)

    // Verifica detalhes das imagens
    const imagens = imovelCarregado.obterTodasImagens()
    expect(imagens).toHaveLength(2)

    const primeiraImagem = imagens[0]
    expect(primeiraImagem.id).toBe('img1')
    expect(primeiraImagem.nome).toBe('sala.jpg')
    expect(primeiraImagem.descricao).toBe('Foto da sala')
    expect(primeiraImagem.tipo).toBe('image/jpeg')
    expect(primeiraImagem.preview).toContain('data:image/jpeg;base64')

    const segundaImagem = imagens[1]
    expect(segundaImagem.id).toBe('img2')
    expect(segundaImagem.nome).toBe('quarto.jpg')
    expect(segundaImagem.descricao).toBe('Foto do quarto principal')
  })

  it('deve verificar se dados do localStorage contêm imagens', async () => {
    const imagensFormulario = [
      {
        id: 'img1',
        nome: 'cozinha.jpg',
        preview: 'data:image/jpeg;base64,teste123',
        descricao: 'Cozinha moderna',
        tipo: 'image/jpeg',
        tamanho: 500000,
        dataUpload: new Date().toISOString(),
      },
    ]

    const imovel = new Imovel(
      6,
      2,
      2,
      100,
      enderecoExemplo,
      clienteExemplo,
      'Apartamento',
      imagensFormulario,
    )

    await repository.save(imovel)

    // Verifica diretamente no localStorage
    const dadosLocalStorage = JSON.parse(localStorage.getItem('imoveis') || '[]')
    console.log('Dados no localStorage:', dadosLocalStorage)

    expect(dadosLocalStorage).toHaveLength(1)
    const imovelNoStorage = dadosLocalStorage[0]
    expect(imovelNoStorage.Imagens).toBeDefined()
    expect(imovelNoStorage.Imagens).toHaveLength(1)
    expect(imovelNoStorage.Imagens[0].nome).toBe('cozinha.jpg')
    expect(imovelNoStorage.Imagens[0].descricao).toBe('Cozinha moderna')
  })

  it('deve funcionar com imóvel sem imagens', async () => {
    const imovel = new Imovel(
      4,
      1,
      1,
      60,
      enderecoExemplo,
      clienteExemplo,
      'Kitnet sem fotos',
      // Sem parâmetro de imagens
    )

    const imovelSalvo = await repository.save(imovel)
    expect(imovelSalvo.TotalImagens).toBe(0)
    expect(imovelSalvo.possuiImagens()).toBe(false)

    const imovelCarregado = await repository.getById(imovelSalvo.Id)
    expect(imovelCarregado.TotalImagens).toBe(0)
    expect(imovelCarregado.Imagens).toEqual([])
  })
})
