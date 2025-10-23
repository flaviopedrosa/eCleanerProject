import { aj as defineStore } from "./index-DcwkHxen.js";
import { M as Material } from "./material-D-n2u651.js";
import { M as MaterialRepository } from "./materialRepository-ClMwRjl3.js";
const useMaterialStore = defineStore("material", {
  state: () => ({
    Materiais: [],
    Loading: false,
    Error: null
  }),
  actions: {
    // Inicializa o repository
    _getRepository() {
      return new MaterialRepository();
    },
    // Carrega todos os materiais
    async loadMateriais() {
      this.Loading = true;
      this.Error = null;
      try {
        const repository = this._getRepository();
        this.Materiais = await repository.getAll();
      } catch (error) {
        this.Error = error.message;
        throw error;
      } finally {
        this.Loading = false;
      }
    },
    // Adiciona um novo material
    async addMaterial(materialData) {
      this.Loading = true;
      this.Error = null;
      try {
        const material = new Material(
          materialData.Descricao,
          materialData.Unidade,
          parseFloat(materialData.PrecoUnitario) || 0,
          // Garante que seja um número válido
          materialData.Imagem,
          materialData.Url
        );
        const repository = this._getRepository();
        const novoMaterial = await repository.create(material);
        this.Materiais.push(novoMaterial);
        return novoMaterial;
      } catch (error) {
        this.Error = error.message;
        throw error;
      } finally {
        this.Loading = false;
      }
    },
    // Atualiza um material existente
    async updateMaterial(materialData) {
      this.Loading = true;
      this.Error = null;
      try {
        const dadosCorrigidos = {
          ...materialData,
          PrecoUnitario: parseFloat(materialData.PrecoUnitario) || 0
        };
        const repository = this._getRepository();
        const materialAtualizado = await repository.update(dadosCorrigidos);
        const index = this.Materiais.findIndex((m) => m.Id === materialData.Id);
        if (index !== -1) {
          this.Materiais[index] = materialAtualizado;
        }
        return materialAtualizado;
      } catch (error) {
        this.Error = error.message;
        throw error;
      } finally {
        this.Loading = false;
      }
    },
    // Remove um material
    async deleteMaterial(id) {
      this.Loading = true;
      this.Error = null;
      try {
        const repository = this._getRepository();
        await repository.delete(id);
        this.Materiais = this.Materiais.filter((m) => m.Id !== id);
      } catch (error) {
        this.Error = error.message;
        throw error;
      } finally {
        this.Loading = false;
      }
    },
    // Busca um material por ID
    async getMaterialById(id) {
      try {
        const repository = this._getRepository();
        return await repository.getById(id);
      } catch (error) {
        this.Error = error.message;
        throw error;
      }
    },
    // Busca materiais por descrição
    async searchMateriais(termo) {
      this.Loading = true;
      this.Error = null;
      try {
        const repository = this._getRepository();
        return await repository.searchByDescricao(termo);
      } catch (error) {
        this.Error = error.message;
        throw error;
      } finally {
        this.Loading = false;
      }
    },
    // Limpa o estado de erro
    clearError() {
      this.Error = null;
    }
  },
  getters: {
    // Total de materiais
    TotalMateriais: (state) => state.Materiais.length,
    // Materiais ordenados por descrição
    MateriaisOrdenados: (state) => {
      return [...state.Materiais].sort(
        (a, b) => a.Descricao.localeCompare(b.Descricao, "pt-BR", { sensitivity: "base" })
      );
    },
    // Verifica se há materiais
    HasMateriais: (state) => state.Materiais.length > 0,
    // Estado de loading
    IsLoading: (state) => state.Loading,
    // Estado de erro
    HasError: (state) => !!state.Error
  }
});
export {
  useMaterialStore as u
};
//# sourceMappingURL=material-store-CEub2Qqs.js.map
