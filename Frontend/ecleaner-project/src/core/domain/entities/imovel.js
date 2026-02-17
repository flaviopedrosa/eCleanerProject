import { gerarGuid } from '../utils/guid'
import { Endereco } from './endereco'
import { Pessoa } from './pessoa'

/**
 * Classe que representa um Imóvel.
 */
export class Imovel {
  /**
   * @param {number} totalComodos - Número total de cômodos do imóvel
   * @param {number} numeroQuartos - Número de quartos
   * @param {number} numeroBanheiros - Número de banheiros
   * @param {number} areaTotal - Área total do imóvel em metros quadrados
   * @param {Endereco} endereco - Endereço do imóvel
   * @param {Pessoa} dono - Dono do imóvel
   * @param {string} observacao - Observações adicionais sobre o imóvel
   * @param {Array} imagens - Lista de imagens do imóvel
   */
  constructor(
    totalComodos,
    numeroQuartos,
    numeroBanheiros,
    areaTotal,
    endereco,
    dono,
    observacao = '',
    imagens = [],
  ) {
    this.Id = gerarGuid()
    this.TotalComodos = totalComodos
    this.NumeroQuartos = numeroQuartos
    this.NumeroBanheiros = numeroBanheiros
    this.AreaTotal = areaTotal
    this.Responsaveis = []
    this.Imagens = Array.isArray(imagens)
      ? imagens.map((img) => this._normalizarImagem(img)).filter(Boolean)
      : []

    if (!(dono instanceof Pessoa)) {
      throw new Error('O dono fornecido não é uma instância válida da classe Pessoa')
    }

    if (!(endereco instanceof Endereco)) {
      throw new Error('O endereço fornecido não é uma instância válida da classe Endereco')
    }

    this.Dono = dono
    this.Endereco = endereco
    this.Observacao = observacao
  }

  /**
   * Normaliza a estrutura de uma imagem do imóvel
   * @param {string|Object} imagem - URL da imagem ou objeto com dados da imagem
   * @returns {Object} Imagem normalizada
   */
  _normalizarImagem(imagem) {
    if (!imagem) {
      return null
    }

    if (typeof imagem === 'string') {
      return {
        id: gerarGuid(),
        url: imagem,
        preview: imagem,
        nome: '',
        descricao: '',
        dataUpload: new Date().toISOString(),
        tipo: 'image/jpeg',
        tamanho: null,
      }
    }

    const urlImagem = imagem.url || imagem.preview || imagem.src || ''

    return {
      id: imagem.id || gerarGuid(),
      url: urlImagem,
      preview: imagem.preview || urlImagem,
      nome: imagem.name || imagem.nome || '',
      descricao: imagem.descricao || imagem.legenda || '',
      dataUpload: imagem.dataUpload || new Date().toISOString(),
      tipo: imagem.type || imagem.tipo || 'image/jpeg',
      tamanho: imagem.size || imagem.tamanho || null,
    }
  }

  /**
   * Retorna o número de outros cômodos (exceto quartos e banheiros)
   * @returns {number} O número de outros cômodos
   */
  get NumeroOutrosComodos() {
    return this.TotalComodos - this.NumeroQuartos - this.NumeroBanheiros
  }

  /**
   * Atualiza o endereço do imóvel
   * @param {Endereco} novoEndereco - O novo endereço do imóvel
   */
  atualizarEndereco(novoEndereco) {
    if (!(novoEndereco instanceof Endereco)) {
      throw new Error('O endereço fornecido não é uma instância válida da classe Endereco')
    }
    this.Endereco = novoEndereco
  }

  /**
   * Adiciona um responsável à lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser adicionada como responsável
   */
  adicionarResponsavel(responsavel) {
    if (!(responsavel instanceof Pessoa)) {
      throw new Error('O responsável fornecido não é uma instância válida da classe Pessoa')
    }
    if (!this.Responsaveis.includes(responsavel)) {
      this.Responsaveis.push(responsavel)
    }
  }

  /**
   * Remove um responsável da lista de responsáveis pelo imóvel
   * @param {Pessoa} responsavel - A pessoa a ser removida da lista de responsáveis
   */
  removerResponsavel(responsavel) {
    const index = this.Responsaveis.indexOf(responsavel)
    if (index > -1) {
      this.Responsaveis.splice(index, 1)
    }
  }

  /**
   * Altera o dono do imóvel
   * @param {Pessoa} novoDono - O novo dono do imóvel
   */
  alterarDono(novoDono) {
    if (!(novoDono instanceof Pessoa)) {
      throw new Error('O dono fornecido não é uma instância válida da classe Pessoa')
    }
    this.Dono = novoDono
  }

  /**
   * Adiciona uma imagem à lista de imagens do imóvel
   * @param {string|Object} imagem - URL da imagem ou objeto com dados da imagem
   * @param {string} descricao - Descrição opcional da imagem
   */
  adicionarImagem(imagem, descricao = '') {
    if (!imagem) {
      throw new Error('A imagem é obrigatória')
    }

    const novaImagem = this._normalizarImagem(
      typeof imagem === 'object' ? { ...imagem, descricao: descricao || imagem.descricao } : imagem,
    )

    if (novaImagem) {
      this.Imagens.push(novaImagem)
    }
  }

  /**
   * Remove uma imagem da lista de imagens do imóvel
   * @param {string} imagemId - ID da imagem a ser removida
   */
  removerImagem(imagemId) {
    const index = this.Imagens.findIndex((img) => img.id === imagemId)
    if (index > -1) {
      this.Imagens.splice(index, 1)
    }
  }

  /**
   * Atualiza a descrição de uma imagem
   * @param {string} imagemId - ID da imagem
   * @param {string} novaDescricao - Nova descrição da imagem
   */
  atualizarDescricaoImagem(imagemId, novaDescricao) {
    const imagem = this.Imagens.find((img) => img.id === imagemId)
    if (imagem) {
      imagem.descricao = novaDescricao
    }
  }

  /**
   * Obtém uma imagem pelo ID
   * @param {string} imagemId - ID da imagem
   * @returns {Object|null} A imagem encontrada ou null
   */
  obterImagemPorId(imagemId) {
    return this.Imagens.find((img) => img.id === imagemId) || null
  }

  /**
   * Obtém todas as imagens do imóvel
   * @returns {Array} Lista de todas as imagens
   */
  obterTodasImagens() {
    return [...this.Imagens]
  }

  /**
   * Verifica se o imóvel possui imagens
   * @returns {boolean} True se possui imagens, false caso contrário
   */
  possuiImagens() {
    return this.Imagens.length > 0
  }

  /**
   * Obtém o número total de imagens
   * @returns {number} Número total de imagens
   */
  get TotalImagens() {
    return this.Imagens.length
  }

  /**
   * Obtém a primeira imagem (imagem principal)
   * @returns {Object|null} A primeira imagem ou null se não houver imagens
   */
  get ImagemPrincipal() {
    return this.Imagens.length > 0 ? this.Imagens[0] : null
  }

  /**
   * Serializa o imóvel para JSON
   * @returns {Object} Representação em JSON
   */
  toJSON() {
    return {
      Id: this.Id,
      TotalComodos: this.TotalComodos,
      NumeroQuartos: this.NumeroQuartos,
      NumeroBanheiros: this.NumeroBanheiros,
      AreaTotal: this.AreaTotal,
      Endereco: {
        Logradouro: this.Endereco.Logradouro,
        Numero: this.Endereco.Numero,
        Bairro: this.Endereco.Bairro,
        Cidade: this.Endereco.Cidade,
        Estado: this.Endereco.Estado,
        Cep: this.Endereco.Cep,
        Complemento: this.Endereco.Complemento,
      },
      Dono: {
        Id: this.Dono.Id,
        Nome: this.Dono.Nome,
        Sobrenome: this.Dono.Sobrenome,
        Email: this.Dono.Email,
        Telefone: this.Dono.Telefone,
        Celular: this.Dono.Celular,
        PreferenciaContato: this.Dono.PreferenciaContato,
        Observacoes: this.Dono.Observacoes,
      },
      Responsaveis: this.Responsaveis.map((resp) => ({
        Id: resp.Id,
        Nome: resp.Nome,
        Sobrenome: resp.Sobrenome,
        Email: resp.Email,
        Telefone: resp.Telefone,
        Celular: resp.Celular,
      })),
      Imagens: this.Imagens,
      Observacao: this.Observacao,
    }
  }

  /**
   * Cria uma instância de Imovel a partir de dados JSON
   * @param {Object} data - Dados em formato JSON
   * @returns {Imovel} Nova instância de Imovel
   */
  static fromJSON(data) {
    // Recriar endereço
    const endereco = new Endereco(
      data.Endereco?.Logradouro || '',
      data.Endereco?.Numero || '',
      data.Endereco?.Bairro || '',
      data.Endereco?.Cidade || '',
      data.Endereco?.Estado || '',
      data.Endereco?.Cep || '',
      data.Endereco?.Complemento || '',
    )

    // Recriar dono usando Pessoa base (Cliente estende Pessoa)
    const dono = new Pessoa(
      data.Dono?.Nome || '',
      data.Dono?.Sobrenome || '',
      data.Dono?.Email || 'contato@exemplo.com',
      data.Dono?.Celular || '',
      data.Dono?.Telefone || '',
      data.Dono?.PreferenciaContato || 'whatsapp',
      data.Dono?.Observacoes || '',
    )
    if (data.Dono?.Id) {
      dono.Id = data.Dono.Id
    }

    const imovel = new Imovel(
      data.TotalComodos || 0,
      data.NumeroQuartos || 0,
      data.NumeroBanheiros || 0,
      data.AreaTotal || 0,
      endereco,
      dono,
      data.Observacao || '',
      data.Imagens || [],
    )

    // Preservar ID original
    if (data.Id) {
      imovel.Id = data.Id
    }

    // Recriar responsáveis se existirem
    if (Array.isArray(data.Responsaveis)) {
      imovel.Responsaveis = data.Responsaveis.map((resp) => {
        const pessoa = new Pessoa(
          resp.Nome || '',
          resp.Sobrenome || '',
          resp.Email || 'contato@exemplo.com',
          resp.Celular || '',
          resp.Telefone || '',
          resp.PreferenciaContato || 'whatsapp',
          resp.Observacoes || '',
        )
        if (resp.Id) {
          pessoa.Id = resp.Id
        }
        return pessoa
      })
    }

    return imovel
  }
}
