import { g as gerarGuid } from "./guid-BHuXRmln.js";
import { C as Colaborador } from "./colaborador-OpPhEqDl.js";
class ColaboradorEquipe {
  /**
   * @param {import('../entities/colaborador').Colaborador} colaborador - O colaborador
   * @param {string|string[]} funcoes - A função ou funções do colaborador na equipe (usar FuncaoColaborador enum)
   */
  constructor(colaborador, funcoes) {
    if (!colaborador) {
      throw new Error("Colaborador é obrigatório");
    }
    if (!funcoes || Array.isArray(funcoes) && funcoes.length === 0) {
      throw new Error("Pelo menos uma função é obrigatória");
    }
    this.Colaborador = colaborador;
    this.Funcoes = Array.isArray(funcoes) ? funcoes : [funcoes];
    this.Funcao = Array.isArray(funcoes) ? funcoes[0] : funcoes;
  }
}
const FuncaoColaborador = {
  MOTORISTA: "MOTORISTA",
  LIDER: "LIDER",
  EXECUTOR: "EXECUTOR"
};
class Equipe {
  /**
   * @param {string} descricao - A descrição/nome da equipe
   * @param {ColaboradorEquipe[]} colaboradores - Lista de colaboradores da equipe
   * @param {string} observacoes - Observações ou notas sobre a equipe (HTML)
   */
  constructor(descricao, colaboradores = [], observacoes = "") {
    if (!descricao) {
      throw new Error("Descrição da equipe é obrigatória");
    }
    this.Id = gerarGuid();
    this.Descricao = descricao;
    this.Observacoes = observacoes;
    this.Colaboradores = colaboradores;
    this.validarLider();
  }
  /**
   * Adiciona um colaborador à equipe
   * @param {import('../entities/colaborador').Colaborador} colaborador - O colaborador a ser adicionado
   * @param {string} funcao - A função do colaborador na equipe (usar FuncaoColaborador enum)
   */
  adicionarColaborador(colaborador, funcao) {
    const colaboradorExistente = this.Colaboradores.find((c) => c.Colaborador.Id === colaborador.Id);
    if (colaboradorExistente) {
      throw new Error("Colaborador já faz parte da equipe");
    }
    if (funcao === FuncaoColaborador.LIDER && this.temLider()) {
      throw new Error("Equipe já possui um líder");
    }
    this.Colaboradores.push(new ColaboradorEquipe(colaborador, funcao));
  }
  /**
   * Remove um colaborador da equipe
   * @param {string} colaboradorId - O ID do colaborador a ser removido
   */
  removerColaborador(colaboradorId) {
    const index = this.Colaboradores.findIndex((c) => c.Colaborador.Id === colaboradorId);
    if (index === -1) {
      throw new Error("Colaborador não encontrado na equipe");
    }
    if (this.Colaboradores[index].Funcao === FuncaoColaborador.LIDER && this.Colaboradores.length > 1) {
      throw new Error(
        "Não é possível remover o líder enquanto houver outros colaboradores na equipe"
      );
    }
    this.Colaboradores.splice(index, 1);
  }
  /**
   * Verifica se a equipe tem um líder
   * @returns {boolean} true se a equipe tem um líder, false caso contrário
   */
  temLider() {
    return this.Colaboradores.some((c) => c.Funcao === FuncaoColaborador.LIDER);
  }
  /**
   * Valida se há pelo menos um líder na equipe quando há mais de um colaborador
   */
  validarLider() {
    if (this.Colaboradores.length > 0 && !this.temLider()) {
      throw new Error("Equipe deve ter pelo menos um líder");
    }
  }
  /**
   * Altera a função de um colaborador na equipe
   * @param {string} colaboradorId - O ID do colaborador
   * @param {string} novaFuncao - A nova função do colaborador (usar FuncaoColaborador enum)
   */
  alterarFuncaoColaborador(colaboradorId, novaFuncao) {
    const colaborador = this.Colaboradores.find((c) => c.Colaborador.Id === colaboradorId);
    if (!colaborador) {
      throw new Error("Colaborador não encontrado na equipe");
    }
    if (novaFuncao === FuncaoColaborador.LIDER && this.temLider()) {
      throw new Error("Equipe já possui um líder");
    }
    if (colaborador.Funcao === FuncaoColaborador.LIDER && novaFuncao !== FuncaoColaborador.LIDER && this.Colaboradores.length > 1) {
      throw new Error(
        "Não é possível remover o líder enquanto houver outros colaboradores na equipe"
      );
    }
    colaborador.Funcao = novaFuncao;
  }
}
const joao = new Colaborador(
  "João",
  "Silva",
  "joao.silva@empresa.com",
  "(11) 3333-4444",
  "(11) 98765-4321",
  "RG-123456",
  // DocumentoIdentidade (obrigatório)
  /* @__PURE__ */ new Date("1990-01-15"),
  // DataNascimento (obrigatório)
  "Brasileira",
  // Nacionalidade (obrigatório)
  2500,
  // SalarioEsperado (obrigatório, valor positivo)
  "Integral",
  // Disponibilidade (obrigatório)
  ["Zona Sul", "Zona Oeste"],
  // RegioesAtuacao (opcional)
  "Experiência em limpeza residencial"
  // Observacoes (opcional)
);
const maria = new Colaborador(
  "Maria",
  "Santos",
  "maria.santos@empresa.com",
  "(11) 3333-5555",
  "(11) 98765-5432",
  "RG-789012",
  // DocumentoIdentidade (obrigatório)
  /* @__PURE__ */ new Date("1985-06-22"),
  // DataNascimento (obrigatório)
  "Brasileira",
  // Nacionalidade (obrigatório)
  2800,
  // SalarioEsperado (obrigatório, valor positivo)
  "Integral",
  // Disponibilidade (obrigatório)
  ["Zona Norte", "Zona Leste"],
  // RegioesAtuacao (opcional)
  "Experiência em gestão de equipes"
  // Observacoes (opcional)
);
const pedro = new Colaborador(
  "Pedro",
  "Oliveira",
  "pedro.oliveira@empresa.com",
  "(11) 3333-6666",
  "(11) 98765-6543",
  "RG-345678",
  // DocumentoIdentidade (obrigatório)
  /* @__PURE__ */ new Date("1992-03-10"),
  // DataNascimento (obrigatório)
  "Brasileira",
  // Nacionalidade (obrigatório)
  2300,
  // SalarioEsperado (obrigatório, valor positivo)
  "Meio Período",
  // Disponibilidade (obrigatório)
  ["Zona Sul"],
  // RegioesAtuacao (opcional)
  "Especialista em limpeza pós-obra"
  // Observacoes (opcional)
);
const ana = new Colaborador(
  "Ana",
  "Costa",
  "ana.costa@empresa.com",
  "(11) 3333-7777",
  "(11) 98765-7654",
  "RG-901234",
  // DocumentoIdentidade (obrigatório)
  /* @__PURE__ */ new Date("1988-12-03"),
  // DataNascimento (obrigatório)
  "Brasileira",
  // Nacionalidade (obrigatório)
  3e3,
  // SalarioEsperado (obrigatório, valor positivo)
  "Integral",
  // Disponibilidade (obrigatório)
  ["Zona Oeste", "Zona Central"],
  // RegioesAtuacao (opcional)
  "Experiência em limpeza comercial"
  // Observacoes (opcional)
);
const equipeSeeds = [
  (() => {
    const equipe = new Equipe("Equipe Limpeza Residencial");
    equipe.adicionarColaborador(joao, FuncaoColaborador.LIDER);
    equipe.adicionarColaborador(maria, FuncaoColaborador.MOTORISTA);
    equipe.adicionarColaborador(pedro, FuncaoColaborador.EXECUTOR);
    return equipe;
  })(),
  (() => {
    const equipe = new Equipe("Equipe Limpeza Comercial");
    equipe.adicionarColaborador(ana, FuncaoColaborador.LIDER);
    equipe.adicionarColaborador(pedro, FuncaoColaborador.EXECUTOR);
    return equipe;
  })()
];
class EquipeRepository {
  constructor() {
    if (!localStorage.getItem("equipes")) {
      localStorage.setItem("equipes", JSON.stringify([]));
    }
  }
  // Converte um objeto JSON em uma entidade Equipe
  _mapToEntity(data) {
    if (!data) return null;
    const colaboradores = data.Colaboradores.map((col) => {
      const colaborador = new Colaborador(
        col.Colaborador.Nome,
        col.Colaborador.Sobrenome,
        col.Colaborador.Email,
        col.Colaborador.Telefone,
        col.Colaborador.Celular,
        col.Colaborador.DocumentoIdentidade || "DOC-TEMP-" + Date.now(),
        // Valor temporário
        col.Colaborador.DataNascimento ? new Date(col.Colaborador.DataNascimento) : /* @__PURE__ */ new Date(),
        // Data atual como padrão
        col.Colaborador.Nacionalidade || "Brasileira",
        // Valor padrão
        col.Colaborador.SalarioEsperado || 2e3,
        // Valor padrão mínimo
        col.Colaborador.Disponibilidade || "Integral",
        // Valor padrão
        col.Colaborador.RegioesAtuacao || [],
        // Array vazio como padrão
        col.Colaborador.Observacoes || ""
        // String vazia como padrão
      );
      colaborador.Id = col.Colaborador.Id;
      return new ColaboradorEquipe(colaborador, col.Funcao);
    });
    const equipe = new Equipe(data.Descricao, colaboradores, data.Observacoes || "");
    equipe.Id = data.Id;
    return equipe;
  }
  // Converte uma entidade Equipe em um objeto JSON para armazenamento
  _mapToJSON(equipe) {
    if (!equipe) return null;
    return {
      Id: equipe.Id,
      Descricao: equipe.Descricao,
      Observacoes: equipe.Observacoes,
      Colaboradores: equipe.Colaboradores.map((col) => ({
        Funcao: col.Funcao,
        Colaborador: {
          Id: col.Colaborador.Id,
          Nome: col.Colaborador.Nome,
          Sobrenome: col.Colaborador.Sobrenome,
          Email: col.Colaborador.Email,
          Telefone: col.Colaborador.Telefone,
          Celular: col.Colaborador.Celular,
          DocumentoIdentidade: col.Colaborador.DocumentoIdentidade,
          DataNascimento: col.Colaborador.DataNascimento,
          Nacionalidade: col.Colaborador.Nacionalidade,
          SalarioEsperado: col.Colaborador.SalarioEsperado,
          Disponibilidade: col.Colaborador.Disponibilidade,
          RegioesAtuacao: col.Colaborador.RegioesAtuacao,
          Observacoes: col.Colaborador.Observacoes
        }
      }))
    };
  }
  // Lista todas as equipes
  async getAll() {
    try {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      return equipes.map((data) => this._mapToEntity(data));
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      throw new Error("Erro ao buscar equipes");
    }
  }
  // Busca uma equipe por ID
  async getById(id) {
    try {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      const equipe = equipes.find((e) => e.Id === id);
      return this._mapToEntity(equipe);
    } catch (error) {
      console.error("Erro ao buscar equipe:", error);
      throw new Error("Erro ao buscar equipe");
    }
  }
  // Salva uma nova equipe ou atualiza uma existente
  async save(equipe) {
    try {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      const equipeJSON = this._mapToJSON(equipe);
      const index = equipes.findIndex((e) => e.Id === equipeJSON.Id);
      if (index >= 0) {
        equipes[index] = equipeJSON;
      } else {
        equipes.push(equipeJSON);
      }
      localStorage.setItem("equipes", JSON.stringify(equipes));
      return this._mapToEntity(equipeJSON);
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
      throw new Error("Erro ao salvar equipe");
    }
  }
  // Exclui uma equipe
  async delete(id) {
    try {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      const filteredEquipes = equipes.filter((e) => e.Id !== id);
      localStorage.setItem("equipes", JSON.stringify(filteredEquipes));
    } catch (error) {
      console.error("Erro ao excluir equipe:", error);
      throw new Error("Erro ao excluir equipe");
    }
  }
  // Adiciona um colaborador a uma equipe
  async adicionarColaborador(equipeId, colaborador, funcao) {
    try {
      const equipe = await this.getById(equipeId);
      if (!equipe) {
        throw new Error("Equipe não encontrada");
      }
      equipe.adicionarColaborador(colaborador, funcao);
      return await this.save(equipe);
    } catch (error) {
      console.error("Erro ao adicionar colaborador à equipe:", error);
      throw error;
    }
  }
  // Remove um colaborador de uma equipe
  async removerColaborador(equipeId, colaboradorId) {
    try {
      const equipe = await this.getById(equipeId);
      if (!equipe) {
        throw new Error("Equipe não encontrada");
      }
      equipe.removerColaborador(colaboradorId);
      return await this.save(equipe);
    } catch (error) {
      console.error("Erro ao remover colaborador da equipe:", error);
      throw error;
    }
  }
  // Altera a função de um colaborador na equipe
  async alterarFuncaoColaborador(equipeId, colaboradorId, novaFuncao) {
    try {
      const equipe = await this.getById(equipeId);
      if (!equipe) {
        throw new Error("Equipe não encontrada");
      }
      equipe.alterarFuncaoColaborador(colaboradorId, novaFuncao);
      return await this.save(equipe);
    } catch (error) {
      console.error("Erro ao alterar função do colaborador:", error);
      throw error;
    }
  }
  // Carrega dados de teste
  async loadTestData() {
    try {
      localStorage.setItem("equipes", JSON.stringify(equipeSeeds.map((e) => this._mapToJSON(e))));
      return await this.getAll();
    } catch (error) {
      console.error("Erro ao carregar dados de teste:", error);
      throw new Error("Erro ao carregar dados de teste");
    }
  }
}
export {
  ColaboradorEquipe as C,
  EquipeRepository as E,
  FuncaoColaborador as F,
  Equipe as a
};
//# sourceMappingURL=equipeRepository-Cy9UNbRy.js.map
