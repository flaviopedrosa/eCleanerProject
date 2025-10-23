import { aj as defineStore } from "./index-DcwkHxen.js";
import { P as PacoteServico } from "./pacoteServico-BEcXIkd0.js";
class PacoteServicoRepository {
  constructor() {
    this.storageKey = "ecleaner_pacotes_servicos";
  }
  /**
   * Salva todos os pacotes
   */
  salvarTodos(pacotes) {
    const pacotesJson = pacotes.map((pacote) => this._pacoteToJson(pacote));
    localStorage.setItem(this.storageKey, JSON.stringify(pacotesJson));
  }
  /**
   * Busca todos os pacotes
   */
  buscarTodos() {
    const pacotesJson = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return pacotesJson.map((pacoteData) => this._jsonToPacote(pacoteData));
  }
  /**
   * Busca pacote por ID
   */
  buscarPorId(id) {
    const pacotes = this.buscarTodos();
    return pacotes.find((pacote) => pacote.Id === id);
  }
  /**
   * Busca pacotes favoritos
   */
  buscarFavoritos() {
    const pacotes = this.buscarTodos();
    return pacotes.filter((pacote) => pacote.Favorito);
  }
  /**
   * Adiciona um novo pacote
   */
  adicionar(pacote) {
    const pacotes = this.buscarTodos();
    if (!pacote.Id || pacote.Id === null) {
      pacote.Id = Date.now().toString();
    }
    pacote.recalcularValores();
    pacotes.push(pacote);
    this.salvarTodos(pacotes);
    return pacote;
  }
  /**
   * Atualiza um pacote existente
   */
  atualizar(pacoteAtualizado) {
    const pacotes = this.buscarTodos();
    const index = pacotes.findIndex((pacote) => pacote.Id === pacoteAtualizado.Id);
    if (index !== -1) {
      pacoteAtualizado.recalcularValores();
      pacotes[index] = pacoteAtualizado;
      this.salvarTodos(pacotes);
      return pacoteAtualizado;
    }
    throw new Error("Pacote não encontrado");
  }
  /**
   * Remove um pacote
   */
  remover(id) {
    const pacotes = this.buscarTodos();
    const pacotesFiltrados = pacotes.filter((pacote) => pacote.Id !== id);
    if (pacotesFiltrados.length < pacotes.length) {
      this.salvarTodos(pacotesFiltrados);
      return true;
    }
    return false;
  }
  /**
   * Limpa todos os pacotes
   */
  limparTodos() {
    localStorage.removeItem(this.storageKey);
  }
  /**
   * Conta total de pacotes
   */
  contar() {
    return this.buscarTodos().length;
  }
  /**
   * Alterna status de favorito
   */
  toggleFavorito(id) {
    const pacotes = this.buscarTodos();
    const pacote = pacotes.find((p) => p.Id === id);
    if (pacote) {
      pacote.Favorito = !pacote.Favorito;
      this.salvarTodos(pacotes);
      return pacote;
    }
    throw new Error("Pacote não encontrado");
  }
  /**
   * Converte pacote para JSON serializable
   */
  _pacoteToJson(pacote) {
    return {
      Id: pacote.Id,
      Descricao: pacote.Descricao,
      MargemLucro: pacote.MargemLucro,
      Favorito: pacote.Favorito,
      ItensMaterial: pacote.ItensMaterial || [],
      ItensServico: pacote.ItensServico || [],
      ValorMaterial: pacote.ValorMaterial,
      ValorServico: pacote.ValorServico,
      ValorTotal: pacote.ValorTotal,
      ValorVenda: pacote.ValorVenda,
      CriadoEm: pacote.CriadoEm || (/* @__PURE__ */ new Date()).toISOString(),
      AtualizadoEm: pacote.AtualizadoEm || (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Converte JSON para instância de PacoteServico
   */
  _jsonToPacote(data) {
    const pacote = new PacoteServico(data.Descricao, data.MargemLucro);
    if (data.Id) {
      pacote.Id = data.Id;
    }
    pacote.Favorito = data.Favorito || false;
    pacote.ItensMaterial = data.ItensMaterial || [];
    pacote.ItensServico = data.ItensServico || [];
    pacote.ValorMaterial = data.ValorMaterial || 0;
    pacote.ValorServico = data.ValorServico || 0;
    pacote.ValorTotal = data.ValorTotal || 0;
    pacote.ValorVenda = data.ValorVenda || 0;
    pacote.CriadoEm = data.CriadoEm;
    pacote.AtualizadoEm = data.AtualizadoEm;
    return pacote;
  }
}
const pacoteServicoRepository = new PacoteServicoRepository();
const usePacoteServicoStore = defineStore("pacoteServico", {
  state: () => ({
    pacotes: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPacotes() {
      this.loading = true;
      try {
        this.pacotes = pacoteServicoRepository.buscarTodos();
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao buscar pacotes:", e);
      } finally {
        this.loading = false;
      }
    },
    async addPacote(pacote) {
      this.loading = true;
      try {
        const novoPacote = new PacoteServico(pacote.Descricao, pacote.MargemLucro);
        novoPacote.ItensMaterial = pacote.ItensMaterial || [];
        novoPacote.ItensServico = pacote.ItensServico || [];
        novoPacote.Favorito = pacote.Favorito || false;
        const pacoteSalvo = pacoteServicoRepository.adicionar(novoPacote);
        this.pacotes.push(pacoteSalvo);
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao adicionar pacote:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async updatePacote(pacote) {
      try {
        const pacoteInstance = new PacoteServico(pacote.Descricao, pacote.MargemLucro);
        pacoteInstance.Id = pacote.Id;
        pacoteInstance.ItensMaterial = pacote.ItensMaterial || [];
        pacoteInstance.ItensServico = pacote.ItensServico || [];
        pacoteInstance.Favorito = pacote.Favorito || false;
        const pacoteAtualizado = pacoteServicoRepository.atualizar(pacoteInstance);
        const index = this.pacotes.findIndex((p) => p.Id === pacote.Id);
        if (index !== -1) {
          this.pacotes[index] = pacoteAtualizado;
        }
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao atualizar pacote:", e);
        throw e;
      }
    },
    async deletePacote(id) {
      try {
        const removido = pacoteServicoRepository.remover(id);
        if (removido) {
          this.pacotes = this.pacotes.filter((p) => p.Id !== id);
        }
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao deletar pacote:", e);
        throw e;
      }
    },
    getPacoteById(id) {
      return this.pacotes.find((p) => p.Id === id);
    },
    async toggleFavorito(id) {
      try {
        const pacoteAtualizado = pacoteServicoRepository.toggleFavorito(id);
        const index = this.pacotes.findIndex((p) => p.Id === id);
        if (index !== -1) {
          this.pacotes[index] = pacoteAtualizado;
        }
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao alterar favorito:", e);
        throw e;
      }
    }
  },
  getters: {
    pacotesSortedByDescricao: (state) => {
      return [...state.pacotes].sort((a, b) => a.Descricao.localeCompare(b.Descricao));
    },
    pacotesFavoritos: (state) => {
      return state.pacotes.filter((pacote) => pacote.Favorito);
    },
    totalPacotes: (state) => state.pacotes.length,
    totalPacotesFavoritos: (state) => {
      return state.pacotes.filter((pacote) => pacote.Favorito).length;
    },
    valorTotalTodosPacotes: (state) => {
      return state.pacotes.reduce((total, pacote) => total + pacote.ValorVenda, 0);
    }
  }
});
export {
  usePacoteServicoStore as u
};
//# sourceMappingURL=pacote-servico-store-DgEwGr_q.js.map
