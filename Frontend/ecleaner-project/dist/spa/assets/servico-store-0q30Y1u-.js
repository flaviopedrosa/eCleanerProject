import { aO as defineStore } from "./index-C_9ZqZx5.js";
import { S as Servico } from "./servico-Bx3u9W9d.js";
class ServicoRepository {
  constructor() {
    this.storageKey = "ecleaner_servicos";
  }
  /**
   * Salva todos os serviços
   */
  salvarTodos(servicos) {
    const servicosJson = servicos.map((servico) => servico.toJSON ? servico.toJSON() : servico);
    localStorage.setItem(this.storageKey, JSON.stringify(servicosJson));
  }
  /**
   * Busca todos os serviços
   */
  buscarTodos() {
    const servicosJson = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return servicosJson.map((servicoData) => {
      if (servicoData instanceof Servico) return servicoData;
      if (servicoData.Nome) {
        return new Servico(
          servicoData.Nome,
          servicoData.Descricao,
          servicoData.Valor,
          servicoData.Unidade,
          servicoData.Observacao
        );
      }
      return new Servico(
        servicoData.nome || servicoData.Nome,
        servicoData.descricao || servicoData.Descricao,
        servicoData.valor || servicoData.Valor,
        servicoData.unidade || servicoData.Unidade || "Unidade",
        servicoData.observacao || servicoData.Observacao || ""
      );
    });
  }
  /**
   * Busca serviço por ID
   */
  buscarPorId(id) {
    const servicos = this.buscarTodos();
    return servicos.find((servico) => servico.Id === id);
  }
  /**
   * Adiciona um novo serviço
   */
  adicionar(servico) {
    const servicos = this.buscarTodos();
    servicos.push(servico);
    this.salvarTodos(servicos);
    return servico;
  }
  /**
   * Atualiza um serviço existente
   */
  atualizar(servicoAtualizado) {
    const servicos = this.buscarTodos();
    const index = servicos.findIndex((servico) => servico.Id === servicoAtualizado.Id);
    if (index !== -1) {
      servicoAtualizado.marcarComoAtualizado();
      servicos[index] = servicoAtualizado;
      this.salvarTodos(servicos);
      return servicoAtualizado;
    }
    throw new Error("Serviço não encontrado");
  }
  /**
   * Remove um serviço
   */
  remover(id) {
    const servicos = this.buscarTodos();
    const servicosFiltrados = servicos.filter((servico) => servico.Id !== id);
    if (servicosFiltrados.length < servicos.length) {
      this.salvarTodos(servicosFiltrados);
      return true;
    }
    return false;
  }
  /**
   * Limpa todos os serviços
   */
  limparTodos() {
    localStorage.removeItem(this.storageKey);
  }
  /**
   * Conta total de serviços
   */
  contar() {
    return this.buscarTodos().length;
  }
  /**
   * Busca serviços por faixa de preço
   */
  buscarPorFaixaPreco(valorMin, valorMax) {
    const servicos = this.buscarTodos();
    return servicos.filter((servico) => servico.Valor >= valorMin && servico.Valor <= valorMax);
  }
}
const servicoRepository = new ServicoRepository();
const useServicoStore = defineStore("servico", {
  state: () => ({
    servicos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchServicos() {
      this.loading = true;
      try {
        this.servicos = servicoRepository.buscarTodos();
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao buscar serviços:", e);
      } finally {
        this.loading = false;
      }
    },
    async addServico(servico) {
      try {
        const novoServico = servicoRepository.adicionar(servico);
        this.servicos.push(novoServico);
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao adicionar serviço:", e);
        throw e;
      }
    },
    async updateServico(servico) {
      try {
        const servicoAtualizado = servicoRepository.atualizar(servico);
        const idx = this.servicos.findIndex((s) => s.Id === servico.Id);
        if (idx !== -1) this.servicos[idx] = servicoAtualizado;
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao atualizar serviço:", e);
        throw e;
      }
    },
    async deleteServico(id) {
      try {
        const removido = servicoRepository.remover(id);
        if (removido) {
          this.servicos = this.servicos.filter((s) => s.Id !== id);
        }
        this.error = null;
      } catch (e) {
        this.error = e.message;
        console.error("Erro ao deletar serviço:", e);
        throw e;
      }
    }
  }
});
export {
  useServicoStore as u
};
//# sourceMappingURL=servico-store-0q30Y1u-.js.map
