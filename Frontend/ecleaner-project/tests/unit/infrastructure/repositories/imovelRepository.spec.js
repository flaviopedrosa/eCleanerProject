import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { Cliente } from '@/core/domain/entities/cliente'

describe('ImovelRepository', () => {
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
    // Limpa os dados após cada teste
    await repository.clear()
  })

  it('deve salvar um imóvel no localStorage', async () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa com quintal')

    const imovelSalvo = await repository.save(imovel)

    expect(imovelSalvo).toBeDefined()
    expect(imovelSalvo.Id).toBe(imovel.Id)
    expect(imovelSalvo.TotalComodos).toBe(8)
    expect(imovelSalvo.Dono.Nome).toBe('João')
  })

  it('deve buscar todos os imóveis', async () => {
    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa 1')
    const imovel2 = new Imovel(5, 2, 1, 75, enderecoExemplo, clienteExemplo, 'Casa 2')

    await repository.save(imovel1)
    await repository.save(imovel2)

    const imoveis = await repository.getAll()

    expect(imoveis).toHaveLength(2)
    expect(imoveis[0].TotalComodos).toBe(8)
    expect(imoveis[1].TotalComodos).toBe(5)
  })

  it('deve buscar imóveis por cliente', async () => {
    const cliente2 = new Cliente('Maria', 'Santos', 'maria@email.com', '11999888777', '1133445566')

    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa João')
    const imovel2 = new Imovel(5, 2, 1, 75, enderecoExemplo, cliente2, 'Casa Maria')

    await repository.save(imovel1)
    await repository.save(imovel2)

    const imoveisJoao = await repository.getByClienteId(clienteExemplo.Id)
    const imoveisMaria = await repository.getByClienteId(cliente2.Id)

    expect(imoveisJoao).toHaveLength(1)
    expect(imoveisJoao[0].Observacao).toBe('Casa João')

    expect(imoveisMaria).toHaveLength(1)
    expect(imoveisMaria[0].Observacao).toBe('Casa Maria')
  })

  it('deve deletar um imóvel', async () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, clienteExemplo, 'Casa para deletar')

    await repository.save(imovel)
    let imoveis = await repository.getAll()
    expect(imoveis).toHaveLength(1)

    await repository.delete(imovel.Id)
    imoveis = await repository.getAll()
    expect(imoveis).toHaveLength(0)
  })

  // Testes para funcionalidades de imagem
  describe('Gerenciamento de Imagens no Repositório', () => {
    let imovelComImagens

    beforeEach(async () => {
      // Cria um imóvel com algumas imagens para testes
      const imagensIniciais = [
        {
          id: 'img1',
          url: 'imagem1.jpg',
          nome: 'foto1.jpg',
          descricao: 'Sala',
          dataUpload: new Date().toISOString(),
          tipo: 'image/jpeg',
          tamanho: 1024000,
        },
      ]

      imovelComImagens = new Imovel(
        8,
        3,
        2,
        150,
        enderecoExemplo,
        clienteExemplo,
        'Casa com imagens',
        imagensIniciais,
      )

      await repository.save(imovelComImagens)
    })

    it('deve salvar e carregar imóvel com imagens', async () => {
      const imovelCarregado = await repository.getById(imovelComImagens.Id)

      expect(imovelCarregado.TotalImagens).toBe(1)
      expect(imovelCarregado.possuiImagens()).toBe(true)
      expect(imovelCarregado.Imagens[0].url).toBe('imagem1.jpg')
      expect(imovelCarregado.Imagens[0].descricao).toBe('Sala')
    })

    it('deve adicionar imagem a um imóvel existente', async () => {
      const novaImagem = 'https://exemplo.com/quarto.jpg'

      const imovelAtualizado = await repository.adicionarImagem(
        imovelComImagens.Id,
        novaImagem,
        'Foto do quarto',
      )

      expect(imovelAtualizado.TotalImagens).toBe(2)

      // Verifica se foi salvo corretamente
      const imovelCarregado = await repository.getById(imovelComImagens.Id)
      expect(imovelCarregado.TotalImagens).toBe(2)

      const imagemAdicionada = imovelCarregado.Imagens.find((img) => img.url === novaImagem)
      expect(imagemAdicionada).toBeDefined()
      expect(imagemAdicionada.descricao).toBe('Foto do quarto')
    })

    it('deve remover imagem de um imóvel', async () => {
      const imagemId = imovelComImagens.Imagens[0].id

      const imovelAtualizado = await repository.removerImagem(imovelComImagens.Id, imagemId)

      expect(imovelAtualizado.TotalImagens).toBe(0)
      expect(imovelAtualizado.possuiImagens()).toBe(false)

      // Verifica se foi salvo corretamente
      const imovelCarregado = await repository.getById(imovelComImagens.Id)
      expect(imovelCarregado.TotalImagens).toBe(0)
    })

    it('deve atualizar descrição de uma imagem', async () => {
      const imagemId = imovelComImagens.Imagens[0].id
      const novaDescricao = 'Sala renovada'

      const imovelAtualizado = await repository.atualizarDescricaoImagem(
        imovelComImagens.Id,
        imagemId,
        novaDescricao,
      )

      const imagemAtualizada = imovelAtualizado.obterImagemPorId(imagemId)
      expect(imagemAtualizada.descricao).toBe(novaDescricao)

      // Verifica se foi salvo corretamente
      const imovelCarregado = await repository.getById(imovelComImagens.Id)
      const imagemCarregada = imovelCarregado.obterImagemPorId(imagemId)
      expect(imagemCarregada.descricao).toBe(novaDescricao)
    })

    it('deve buscar imóveis que possuem imagens', async () => {
      // Cria um imóvel sem imagens
      const imovelSemImagens = new Imovel(
        4,
        2,
        1,
        80,
        enderecoExemplo,
        clienteExemplo,
        'Sem imagens',
      )
      await repository.save(imovelSemImagens)

      const imoveisComImagens = await repository.getImoveisComImagens()

      expect(imoveisComImagens).toHaveLength(1)
      expect(imoveisComImagens[0].Id).toBe(imovelComImagens.Id)
    })

    it('deve buscar imóveis por número mínimo de imagens', async () => {
      // Adiciona mais uma imagem ao imóvel existente
      await repository.adicionarImagem(imovelComImagens.Id, 'imagem2.jpg', 'Cozinha')

      // Cria outro imóvel com 3 imagens
      const imovelMuitasImagens = new Imovel(
        6,
        2,
        2,
        120,
        enderecoExemplo,
        clienteExemplo,
        'Muitas imagens',
      )
      await repository.save(imovelMuitasImagens)
      await repository.adicionarImagem(imovelMuitasImagens.Id, 'img1.jpg')
      await repository.adicionarImagem(imovelMuitasImagens.Id, 'img2.jpg')
      await repository.adicionarImagem(imovelMuitasImagens.Id, 'img3.jpg')

      // Busca imóveis com pelo menos 2 imagens
      const imoveisCom2OuMais = await repository.getImovelsPorNumeroImagens(2)
      expect(imoveisCom2OuMais).toHaveLength(2)

      // Busca imóveis com pelo menos 3 imagens
      const imoveisCom3OuMais = await repository.getImovelsPorNumeroImagens(3)
      expect(imoveisCom3OuMais).toHaveLength(1)
      expect(imoveisCom3OuMais[0].Id).toBe(imovelMuitasImagens.Id)
    })

    it('deve buscar todas as imagens de um imóvel', async () => {
      const imagens = await repository.getImagensImovel(imovelComImagens.Id)

      expect(imagens).toHaveLength(1)
      expect(imagens[0].url).toBe('imagem1.jpg')
      expect(imagens[0].descricao).toBe('Sala')
    })

    it('deve buscar uma imagem específica por ID', async () => {
      const imagemId = imovelComImagens.Imagens[0].id
      const imagem = await repository.getImagemPorId(imovelComImagens.Id, imagemId)

      expect(imagem).toBeDefined()
      expect(imagem.id).toBe(imagemId)
      expect(imagem.url).toBe('imagem1.jpg')

      // Testa busca por ID inexistente
      const imagemInexistente = await repository.getImagemPorId(
        imovelComImagens.Id,
        'id-inexistente',
      )
      expect(imagemInexistente).toBeNull()
    })

    it('deve lançar erro ao tentar gerenciar imagens de imóvel inexistente', async () => {
      const idInexistente = 'imovel-inexistente'

      await expect(repository.adicionarImagem(idInexistente, 'imagem.jpg')).rejects.toThrow(
        'Imóvel não encontrado',
      )

      await expect(repository.removerImagem(idInexistente, 'img1')).rejects.toThrow(
        'Imóvel não encontrado',
      )

      await expect(
        repository.atualizarDescricaoImagem(idInexistente, 'img1', 'Nova descrição'),
      ).rejects.toThrow('Imóvel não encontrado')

      await expect(repository.getImagensImovel(idInexistente)).rejects.toThrow(
        'Imóvel não encontrado',
      )

      await expect(repository.getImagemPorId(idInexistente, 'img1')).rejects.toThrow(
        'Imóvel não encontrado',
      )
    })
  })
})
