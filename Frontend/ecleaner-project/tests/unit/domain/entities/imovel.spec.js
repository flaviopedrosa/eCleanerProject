import { describe, it, expect, beforeEach } from 'vitest'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { Pessoa } from '@/core/domain/entities/pessoa'

describe('Imovel', () => {
  let enderecoExemplo
  let donoExemplo

  beforeEach(() => {
    enderecoExemplo = new Endereco(
      'Rua Teste',
      '123',
      'Apto 1',
      'Centro',
      'São Paulo',
      'SP',
      '01234-567',
    )

    donoExemplo = new Pessoa('João', 'Silva', 'joao@email.com', '1122334455', '11987654321')
  })

  it('deve criar uma instância de Imovel com os dados corretos', () => {
    const imovel = new Imovel(
      8,
      3,
      2,
      150,
      enderecoExemplo,
      donoExemplo,
      'Imóvel com quintal amplo',
    )

    expect(imovel.Id).toBeDefined()
    expect(imovel.TotalComodos).toBe(8)
    expect(imovel.NumeroQuartos).toBe(3)
    expect(imovel.NumeroBanheiros).toBe(2)
    expect(imovel.AreaTotal).toBe(150)
    expect(imovel.Endereco).toBe(enderecoExemplo)
    expect(imovel.Dono).toBe(donoExemplo)
    expect(imovel.Responsaveis).toHaveLength(0)
    expect(imovel.Observacao).toBe('Imóvel com quintal amplo')
  })

  it('deve criar um imóvel sem observação (campo opcional)', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel.Observacao).toBe('')
  })

  it('deve calcular corretamente o número de outros cômodos', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel.NumeroOutrosComodos).toBe(3) // 8 - 3 - 2 = 3
  })

  it('deve gerar IDs diferentes para cada instância', () => {
    const imovel1 = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const imovel2 = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(imovel1.Id).not.toBe(imovel2.Id)
  })

  it('não deve aceitar dono inválido', () => {
    expect(
      () =>
        new Imovel(8, 3, 2, 150, enderecoExemplo, {
          nome: 'João',
          email: 'joao@email.com',
        }),
    ).toThrow('O dono fornecido não é uma instância válida da classe Pessoa')
  })

  it('deve permitir adicionar e remover responsáveis', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const responsavel = new Pessoa('Maria', 'Silva', 'maria@email.com', '1122334455', '11987654321')

    imovel.adicionarResponsavel(responsavel)
    expect(imovel.Responsaveis).toHaveLength(1)
    expect(imovel.Responsaveis[0]).toBe(responsavel)

    imovel.removerResponsavel(responsavel)
    expect(imovel.Responsaveis).toHaveLength(0)
  })

  it('não deve aceitar endereço inválido', () => {
    expect(
      () => new Imovel(8, 3, 2, 150, { rua: 'Rua Teste', numero: '123' }, donoExemplo),
    ).toThrow('O endereço fornecido não é uma instância válida da classe Endereco')
  })

  it('deve permitir atualizar o endereço', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const novoEndereco = new Endereco(
      'Nova Rua',
      '456',
      'Apto 2',
      'Novo Bairro',
      'São Paulo',
      'SP',
      '04567-890',
    )

    imovel.atualizarEndereco(novoEndereco)
    expect(imovel.Endereco).toBe(novoEndereco)
  })

  it('não deve permitir atualizar com endereço inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.atualizarEndereco({ rua: 'Nova Rua', numero: '456' })).toThrow(
      'O endereço fornecido não é uma instância válida da classe Endereco',
    )
  })

  it('não deve aceitar responsável inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.adicionarResponsavel({ nome: 'Maria', email: 'maria@email.com' })).toThrow(
      'O responsável fornecido não é uma instância válida da classe Pessoa',
    )
  })

  it('deve permitir alterar o dono do imóvel', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    const novoDono = new Pessoa('Maria', 'Silva', 'maria@email.com', '1122334455', '11987654321')

    imovel.alterarDono(novoDono)
    expect(imovel.Dono).toBe(novoDono)
  })

  it('não deve permitir alterar para um dono inválido', () => {
    const imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    expect(() => imovel.alterarDono({ nome: 'Maria', email: 'maria@email.com' })).toThrow(
      'O dono fornecido não é uma instância válida da classe Pessoa',
    )
  })

  // Testes para funcionalidades de imagem
  describe('Gerenciamento de Imagens', () => {
    let imovel

    beforeEach(() => {
      imovel = new Imovel(8, 3, 2, 150, enderecoExemplo, donoExemplo)
    })

    it('deve inicializar com lista de imagens vazia', () => {
      expect(imovel.Imagens).toEqual([])
      expect(imovel.TotalImagens).toBe(0)
      expect(imovel.possuiImagens()).toBe(false)
      expect(imovel.ImagemPrincipal).toBeNull()
    })

    it('deve aceitar lista de imagens no construtor', () => {
      const imagensIniciais = ['imagem1.jpg', 'imagem2.jpg']
      const imovelComImagens = new Imovel(
        8,
        3,
        2,
        150,
        enderecoExemplo,
        donoExemplo,
        'Observação',
        imagensIniciais,
      )
      expect(imovelComImagens.Imagens).toEqual(imagensIniciais)
    })

    it('deve adicionar imagem como string (URL)', () => {
      const urlImagem = 'https://exemplo.com/imagem.jpg'
      imovel.adicionarImagem(urlImagem, 'Foto da sala')

      expect(imovel.TotalImagens).toBe(1)
      expect(imovel.possuiImagens()).toBe(true)

      const imagem = imovel.Imagens[0]
      expect(imagem.url).toBe(urlImagem)
      expect(imagem.descricao).toBe('Foto da sala')
      expect(imagem.id).toBeDefined()
      expect(imagem.dataUpload).toBeDefined()
    })

    it('deve adicionar imagem como objeto', () => {
      const objetoImagem = {
        url: 'https://exemplo.com/imagem.jpg',
        name: 'imagem.jpg',
        type: 'image/jpeg',
        size: 1024000,
      }

      imovel.adicionarImagem(objetoImagem, 'Foto do quarto')

      expect(imovel.TotalImagens).toBe(1)

      const imagem = imovel.Imagens[0]
      expect(imagem.url).toBe(objetoImagem.url)
      expect(imagem.nome).toBe(objetoImagem.name)
      expect(imagem.tipo).toBe(objetoImagem.type)
      expect(imagem.tamanho).toBe(objetoImagem.size)
      expect(imagem.descricao).toBe('Foto do quarto')
    })

    it('deve rejeitar adição de imagem vazia', () => {
      expect(() => imovel.adicionarImagem('')).toThrow('A imagem é obrigatória')
      expect(() => imovel.adicionarImagem(null)).toThrow('A imagem é obrigatória')
      expect(() => imovel.adicionarImagem(undefined)).toThrow('A imagem é obrigatória')
    })

    it('deve remover imagem pelo ID', () => {
      imovel.adicionarImagem('imagem1.jpg')
      imovel.adicionarImagem('imagem2.jpg')

      expect(imovel.TotalImagens).toBe(2)

      const primeiraImagem = imovel.Imagens[0]
      imovel.removerImagem(primeiraImagem.id)

      expect(imovel.TotalImagens).toBe(1)
      expect(imovel.obterImagemPorId(primeiraImagem.id)).toBeNull()
    })

    it('deve atualizar descrição da imagem', () => {
      imovel.adicionarImagem('imagem.jpg', 'Descrição antiga')

      const imagem = imovel.Imagens[0]
      imovel.atualizarDescricaoImagem(imagem.id, 'Nova descrição')

      expect(imagem.descricao).toBe('Nova descrição')
    })

    it('deve obter imagem por ID', () => {
      imovel.adicionarImagem('imagem.jpg')

      const imagemAdicionada = imovel.Imagens[0]
      const imagemEncontrada = imovel.obterImagemPorId(imagemAdicionada.id)

      expect(imagemEncontrada).toBe(imagemAdicionada)
      expect(imovel.obterImagemPorId('id-inexistente')).toBeNull()
    })

    it('deve obter todas as imagens', () => {
      imovel.adicionarImagem('imagem1.jpg')
      imovel.adicionarImagem('imagem2.jpg')

      const todasImagens = imovel.obterTodasImagens()

      expect(todasImagens).toHaveLength(2)
      expect(todasImagens).not.toBe(imovel.Imagens) // Deve retornar uma cópia
    })

    it('deve retornar imagem principal como primeira imagem', () => {
      expect(imovel.ImagemPrincipal).toBeNull()

      imovel.adicionarImagem('principal.jpg')
      imovel.adicionarImagem('segunda.jpg')

      expect(imovel.ImagemPrincipal).toBe(imovel.Imagens[0])
      expect(imovel.ImagemPrincipal.url).toBe('principal.jpg')
    })
  })
})
