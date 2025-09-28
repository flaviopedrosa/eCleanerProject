import { Schedule } from '../../domain/entities/schedule'
import { scheduleSeeds } from './seeds/schedule'
import { Pessoa } from '../../domain/entities/pessoa'

export class ScheduleRepository {
  constructor() {
    // Inicializa o array de schedules no localStorage se não existir
    if (!localStorage.getItem('schedules')) {
      localStorage.setItem('schedules', JSON.stringify([]))
    }
  }

  // Converte um objeto JSON em uma entidade Schedule
  _mapToEntity(data) {
    if (!data) return null

    // Cria a instância de Pessoa para o responsável
    const responsavel = new Pessoa(
      data.Responsavel.Nome,
      data.Responsavel.Sobrenome,
      data.Responsavel.Email || data.EmailComercial, // Usa o email comercial como fallback
      data.Responsavel.Telefone || data.TelefoneComercial, // Usa o telefone comercial como fallback
      data.Responsavel.Celular || data.TelefoneComercial, // Usa o telefone comercial como fallback
    )

    // Se a logomarca é um File ou Blob, cria uma URL para ela
    let logomarca = data.Logomarca
    if (logomarca instanceof File || logomarca instanceof Blob) {
      logomarca = URL.createObjectURL(logomarca)
    }

    return new Schedule(
      responsavel,
      data.NomeEmpresa,
      data.DocumentoEmpresa,
      data.TelefoneComercial,
      data.EmailComercial,
      data.TipoEmpresa,
      logomarca,
    )
  }

  // Converte uma entidade Schedule em um objeto JSON para armazenamento
  _mapToJSON(schedule) {
    if (!schedule) return null

    return {
      Id: schedule.Id,
      NomeEmpresa: schedule.NomeEmpresa,
      DocumentoEmpresa: schedule.DocumentoEmpresa,
      TelefoneComercial: schedule.TelefoneComercial,
      EmailComercial: schedule.EmailComercial,
      TipoEmpresa: schedule.TipoEmpresa,
      Logomarca: schedule.Logomarca,
      Responsavel: {
        Id: schedule.Responsavel.Id,
        Nome: schedule.Responsavel.Nome,
        Sobrenome: schedule.Responsavel.Sobrenome,
        Email: schedule.Responsavel.Email,
        Telefone: schedule.Responsavel.Telefone,
        Celular: schedule.Responsavel.Celular,
      },
    }
  }

  // Lista todas as schedules
  async getAll() {
    try {
      const schedules = JSON.parse(localStorage.getItem('schedules') || '[]')
      return schedules.map((data) => this._mapToEntity(data))
    } catch (error) {
      console.error('Erro ao buscar schedules:', error)
      throw new Error('Erro ao buscar schedules')
    }
  }

  // Busca uma schedule por ID
  async getById(id) {
    try {
      const schedules = JSON.parse(localStorage.getItem('schedules') || '[]')
      const schedule = schedules.find((s) => s.id === id)
      return this._mapToEntity(schedule)
    } catch (error) {
      console.error('Erro ao buscar schedule:', error)
      throw new Error('Erro ao buscar schedule')
    }
  }

  // Salva uma nova schedule
  async save(schedule) {
    try {
      const schedules = JSON.parse(localStorage.getItem('schedules') || '[]')
      const scheduleJSON = this._mapToJSON(schedule)

      // Se não tem ID, é uma nova schedule
      if (!scheduleJSON.id) {
        scheduleJSON.id = crypto.randomUUID()
        schedules.push(scheduleJSON)
      } else {
        // Se tem ID, atualiza a schedule existente
        const index = schedules.findIndex((s) => s.id === scheduleJSON.id)
        if (index >= 0) {
          schedules[index] = scheduleJSON
        } else {
          schedules.push(scheduleJSON)
        }
      }

      localStorage.setItem('schedules', JSON.stringify(schedules))
      return this._mapToEntity(scheduleJSON)
    } catch (error) {
      console.error('Erro ao salvar schedule:', error)
      throw new Error('Erro ao salvar schedule')
    }
  }

  // Exclui uma schedule
  async delete(id) {
    try {
      const schedules = JSON.parse(localStorage.getItem('schedules') || '[]')
      const filteredSchedules = schedules.filter((s) => s.id !== id)
      localStorage.setItem('schedules', JSON.stringify(filteredSchedules))
    } catch (error) {
      console.error('Erro ao excluir schedule:', error)
      throw new Error('Erro ao excluir schedule')
    }
  }

  // Carrega dados de teste
  async loadTestData() {
    try {
      localStorage.setItem('schedules', JSON.stringify(scheduleSeeds))
      return scheduleSeeds
    } catch (error) {
      console.error('Erro ao carregar dados de teste:', error)
      throw new Error('Erro ao carregar dados de teste')
    }
  }
}

// Exporta uma única instância do repositório
export default new ScheduleRepository()
