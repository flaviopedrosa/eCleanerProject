import { Colaborador } from '../../domain/entities/colaborador'
import { Endereco } from '../../domain/entities/endereco'
import { ExperienciaProfissional, Referencia } from '../../domain/entities/documentosColaborador'

export class ColaboradorRepository {
  constructor() {
    // Inicializa o array de colaboradores no localStorage se não existir
    if (!localStorage.getItem('colaboradores')) {
      localStorage.setItem('colaboradores', JSON.stringify([]))
    }
  }

  // Limpa todos os dados do repositório
  async clear() {
    try {
      localStorage.setItem('colaboradores', JSON.stringify([]))
    } catch (error) {
      console.error('Erro ao limpar colaboradores:', error)
      throw new Error('Erro ao limpar colaboradores')
    }
  }

  // Converte um objeto JSON em uma entidade Colaborador
  _mapToEntity(data) {
    if (!data) return null

    // Se a fotoPerfil ou currículo é um File ou Blob, cria uma URL para eles
    let fotoPerfil = data.fotoPerfil
    if (fotoPerfil instanceof File || fotoPerfil instanceof Blob) {
      fotoPerfil = URL.createObjectURL(fotoPerfil)
    }

    let curriculo = data.curriculo
    if (curriculo instanceof File || curriculo instanceof Blob) {
      curriculo = URL.createObjectURL(curriculo)
    }

    const colaborador = new Colaborador(
      data.nome,
      data.sobrenome,
      data.email,
      data.telefone,
      data.celular,
      data.documentoIdentidade,
      new Date(data.dataNascimento),
      data.nacionalidade,
      data.salarioEsperado,
      data.disponibilidade,
      data.regioesAtuacao,
      data.observacoes,
    )

    // Configurar propriedades adicionais após a criação
    colaborador.Id = data.id
    if (fotoPerfil) colaborador.definirFotoPerfil(fotoPerfil)
    if (curriculo) colaborador.definirCurriculo(curriculo)

    // Reconstrói o endereço se existir
    if (data.endereco) {
      const endereco = new Endereco(
        data.endereco.CEP || data.endereco.cep,
        data.endereco.Logradouro || data.endereco.logradouro,
        data.endereco.Numero || data.endereco.numero,
        data.endereco.Complemento || data.endereco.complemento,
        data.endereco.Bairro || data.endereco.bairro,
        data.endereco.Cidade || data.endereco.cidade,
        data.endereco.Estado || data.endereco.estado,
      )
      colaborador.definirEnderecoResidencial(endereco)
    }

    if (data.experiencias) {
      data.experiencias.forEach((exp) => {
        const experiencia = new ExperienciaProfissional(
          exp.Empresa || exp.empresa,
          exp.Cargo || exp.cargo,
          exp.DataInicio
            ? new Date(exp.DataInicio)
            : exp.dataInicio
              ? new Date(exp.dataInicio)
              : null,
          exp.DataFim ? new Date(exp.DataFim) : exp.dataFim ? new Date(exp.dataFim) : null,
          exp.Atividades || exp.atividades || '',
        )
        colaborador.adicionarExperienciaProfissional(experiencia)
      })
    }
    if (data.referencias) {
      data.referencias.forEach((ref) => {
        const referencia = new Referencia(
          ref.Nome || ref.nome,
          ref.Telefone || ref.telefone,
          ref.Relacao ||
            ref.relacao ||
            `${ref.Cargo || ref.cargo} na ${ref.Empresa || ref.empresa}`,
          ref.Observacoes || ref.observacoes || `Contato: ${ref.Email || ref.email || 'N/A'}`,
        )
        colaborador.adicionarReferencia(referencia)
      })
    }

    // Define o status se existir
    if (data.status) {
      colaborador.atualizarStatus(data.status)
    }
    if (data.status) colaborador.Status = data.status

    return colaborador
  }

  // Converte uma entidade Colaborador em um objeto JSON para armazenamento
  _mapToJSON(colaborador) {
    if (!colaborador) return null

    return {
      id: colaborador.Id,
      nome: colaborador.Nome,
      sobrenome: colaborador.Sobrenome,
      email: colaborador.Email,
      telefone: colaborador.Telefone,
      celular: colaborador.Celular,
      documentoIdentidade: colaborador.DocumentoIdentidade,
      dataNascimento: colaborador.DataNascimento,
      nacionalidade: colaborador.Nacionalidade,
      fotoPerfil: colaborador.FotoPerfil,
      curriculo: colaborador.Curriculo,
      salarioEsperado: colaborador.SalarioEsperado,
      disponibilidade: colaborador.Disponibilidade,
      regioesAtuacao: colaborador.RegioesAtuacao,
      observacoes: colaborador.Observacoes,
      experiencias: colaborador.ExperienciasProfissionais.map((exp) => ({
        empresa: exp.Empresa,
        cargo: exp.Cargo,
        dataInicio: exp.DataInicio,
        dataFim: exp.DataFim,
        atividades: exp.Atividades,
      })),
      referencias: colaborador.Referencias.map((ref) => ({
        nome: ref.Nome,
        telefone: ref.Telefone,
        relacao: ref.Relacao,
        observacoes: ref.Observacoes,
      })),
      endereco: colaborador.Enderecos?.[0]
        ? {
            cep: colaborador.Enderecos[0].CEP,
            logradouro: colaborador.Enderecos[0].Logradouro,
            numero: colaborador.Enderecos[0].Numero,
            complemento: colaborador.Enderecos[0].Complemento,
            bairro: colaborador.Enderecos[0].Bairro,
            cidade: colaborador.Enderecos[0].Cidade,
            estado: colaborador.Enderecos[0].Estado,
          }
        : null,
      status: colaborador.Status,
    }
  }

  // Lista todos os colaboradores
  async getAll() {
    try {
      const colaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]')
      return colaboradores.map((data) => this._mapToEntity(data))
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error)
      throw new Error('Erro ao buscar colaboradores')
    }
  }

  // Busca um colaborador por ID
  async getById(id) {
    try {
      const colaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]')
      const colaborador = colaboradores.find((c) => c.id === id)
      return this._mapToEntity(colaborador)
    } catch (error) {
      console.error('Erro ao buscar colaborador:', error)
      throw new Error('Erro ao buscar colaborador')
    }
  }

  // Salva um novo colaborador
  async save(colaborador) {
    try {
      const colaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]')
      const colaboradorJSON = this._mapToJSON(colaborador)

      // Se não tem ID, é um novo colaborador
      if (!colaboradorJSON.id) {
        colaboradorJSON.id = crypto.randomUUID()
        colaboradores.push(colaboradorJSON)
      } else {
        // Se tem ID, atualiza o colaborador existente
        const index = colaboradores.findIndex((c) => c.id === colaboradorJSON.id)
        if (index >= 0) {
          colaboradores[index] = colaboradorJSON
        } else {
          colaboradores.push(colaboradorJSON)
        }
      }

      localStorage.setItem('colaboradores', JSON.stringify(colaboradores))
      return this._mapToEntity(colaboradorJSON)
    } catch (error) {
      console.error('Erro ao salvar colaborador:', error)
      throw new Error('Erro ao salvar colaborador')
    }
  }

  // Exclui um colaborador
  async delete(id) {
    try {
      const colaboradores = JSON.parse(localStorage.getItem('colaboradores') || '[]')
      const filteredColaboradores = colaboradores.filter((c) => c.id !== id)
      localStorage.setItem('colaboradores', JSON.stringify(filteredColaboradores))
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error)
      throw new Error('Erro ao excluir colaborador')
    }
  }
}

// Exporta uma única instância do repositório
export default new ColaboradorRepository()
