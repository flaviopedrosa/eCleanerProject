import { C as Cliente, I as Imovel } from "./imovel-DC67hqHE.js";
import { E as Endereco } from "./pessoa-C98XhDqr.js";
class ImovelRepository {
  constructor() {
    this.storageKey = "imoveis";
  }
  // Limpa todos os dados do repositório
  async clear() {
    localStorage.removeItem(this.storageKey);
  }
  // Converte um objeto JSON em uma entidade Imovel
  _mapToEntity(data) {
    try {
      const endereco = new Endereco(
        data.Endereco.Descricao,
        data.Endereco.Logradouro,
        data.Endereco.Numero,
        data.Endereco.Cep,
        data.Endereco.Bairro,
        data.Endereco.Cidade,
        data.Endereco.Estado,
        data.Endereco.Pais
      );
      endereco.Id = data.Endereco.Id;
      const dono = new Cliente(
        data.Dono.Nome,
        data.Dono.Sobrenome,
        data.Dono.Email,
        data.Dono.Celular,
        data.Dono.Telefone,
        data.Dono.PreferenciaContato,
        data.Dono.Observacoes
      );
      dono.Id = data.Dono.Id;
      if (data.Dono.Enderecos && Array.isArray(data.Dono.Enderecos)) {
        dono.Enderecos = data.Dono.Enderecos.map((endData) => {
          const enderecoDono = new Endereco(
            endData.Descricao,
            endData.Logradouro,
            endData.Numero,
            endData.Cep,
            endData.Bairro,
            endData.Cidade,
            endData.Estado,
            endData.Pais
          );
          enderecoDono.Id = endData.Id;
          return enderecoDono;
        });
      }
      const imovel = new Imovel(
        data.TotalComodos,
        data.NumeroQuartos,
        data.NumeroBanheiros,
        data.AreaTotal,
        endereco,
        dono,
        data.Observacao,
        data.Imagens || []
        // Inclui as imagens ou array vazio
      );
      imovel.Id = data.Id;
      return imovel;
    } catch (error) {
      console.error("Erro ao mapear imóvel:", error);
      throw new Error("Erro ao mapear dados do imóvel");
    }
  }
  // Converte uma entidade Imovel em um objeto JSON para armazenamento
  _mapToJSON(imovel) {
    return {
      Id: imovel.Id,
      TotalComodos: imovel.TotalComodos,
      NumeroQuartos: imovel.NumeroQuartos,
      NumeroBanheiros: imovel.NumeroBanheiros,
      AreaTotal: imovel.AreaTotal,
      Observacao: imovel.Observacao,
      Imagens: imovel.Imagens || [],
      // Inclui as imagens
      Endereco: {
        Id: imovel.Endereco.Id,
        Descricao: imovel.Endereco.Descricao,
        Logradouro: imovel.Endereco.Logradouro,
        Numero: imovel.Endereco.Numero,
        Cep: imovel.Endereco.Cep,
        Bairro: imovel.Endereco.Bairro,
        Cidade: imovel.Endereco.Cidade,
        Estado: imovel.Endereco.Estado,
        Pais: imovel.Endereco.Pais
      },
      Dono: {
        Id: imovel.Dono.Id,
        Nome: imovel.Dono.Nome,
        Sobrenome: imovel.Dono.Sobrenome,
        Email: imovel.Dono.Email,
        Telefone: imovel.Dono.Telefone,
        Celular: imovel.Dono.Celular,
        PreferenciaContato: imovel.Dono.PreferenciaContato,
        Observacoes: imovel.Dono.Observacoes,
        Enderecos: imovel.Dono.Enderecos?.map((endereco) => ({
          Id: endereco.Id,
          Descricao: endereco.Descricao,
          Logradouro: endereco.Logradouro,
          Numero: endereco.Numero,
          Cep: endereco.Cep,
          Bairro: endereco.Bairro,
          Cidade: endereco.Cidade,
          Estado: endereco.Estado,
          Pais: endereco.Pais
        })) || []
      }
    };
  }
  // Lista todos os imóveis
  async getAll() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      return data.map((item) => this._mapToEntity(item));
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      return [];
    }
  }
  // Busca um imóvel por ID
  async getById(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const item = data.find((item2) => item2.Id === id);
      return item ? this._mapToEntity(item) : null;
    } catch (error) {
      console.error("Erro ao buscar imóvel por ID:", error);
      return null;
    }
  }
  // Busca imóveis por cliente (dono)
  async getByClienteId(clienteId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const imoveisCliente = data.filter((item) => item.Dono.Id === clienteId);
      return imoveisCliente.map((item) => this._mapToEntity(item));
    } catch (error) {
      console.error("Erro ao buscar imóveis por cliente:", error);
      return [];
    }
  }
  // Salva um imóvel
  async save(imovel) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const existingIndex = data.findIndex((item) => item.Id === imovel.Id);
      const imovelData = this._mapToJSON(imovel);
      if (existingIndex >= 0) {
        data[existingIndex] = imovelData;
      } else {
        data.push(imovelData);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return this._mapToEntity(imovelData);
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      throw new Error("Erro ao salvar imóvel");
    }
  }
  // Adiciona uma imagem a um imóvel específico
  async adicionarImagem(imovelId, imagem, descricao = "") {
    try {
      const imovel = await this.getById(imovelId);
      if (!imovel) {
        throw new Error("Imóvel não encontrado");
      }
      imovel.adicionarImagem(imagem, descricao);
      return await this.save(imovel);
    } catch (error) {
      console.error("Erro ao adicionar imagem ao imóvel:", error);
      throw error;
    }
  }
  // Remove uma imagem de um imóvel específico
  async removerImagem(imovelId, imagemId) {
    try {
      const imovel = await this.getById(imovelId);
      if (!imovel) {
        throw new Error("Imóvel não encontrado");
      }
      imovel.removerImagem(imagemId);
      return await this.save(imovel);
    } catch (error) {
      console.error("Erro ao remover imagem do imóvel:", error);
      throw error;
    }
  }
  // Atualiza a descrição de uma imagem
  async atualizarDescricaoImagem(imovelId, imagemId, novaDescricao) {
    try {
      const imovel = await this.getById(imovelId);
      if (!imovel) {
        throw new Error("Imóvel não encontrado");
      }
      imovel.atualizarDescricaoImagem(imagemId, novaDescricao);
      return await this.save(imovel);
    } catch (error) {
      console.error("Erro ao atualizar descrição da imagem:", error);
      throw error;
    }
  }
  // Busca imóveis que possuem imagens
  async getImoveisComImagens() {
    try {
      const imoveis = await this.getAll();
      return imoveis.filter((imovel) => imovel.possuiImagens());
    } catch (error) {
      console.error("Erro ao buscar imóveis com imagens:", error);
      return [];
    }
  }
  // Busca imóveis por número mínimo de imagens
  async getImovelsPorNumeroImagens(minImagens = 1) {
    try {
      const imoveis = await this.getAll();
      return imoveis.filter((imovel) => imovel.TotalImagens >= minImagens);
    } catch (error) {
      console.error("Erro ao buscar imóveis por número de imagens:", error);
      return [];
    }
  }
  // Busca todas as imagens de um imóvel específico
  async getImagensImovel(imovelId) {
    try {
      const imovel = await this.getById(imovelId);
      if (!imovel) {
        throw new Error("Imóvel não encontrado");
      }
      return imovel.obterTodasImagens();
    } catch (error) {
      console.error("Erro ao buscar imagens do imóvel:", error);
      throw error;
    }
  }
  // Busca uma imagem específica de um imóvel
  async getImagemPorId(imovelId, imagemId) {
    try {
      const imovel = await this.getById(imovelId);
      if (!imovel) {
        throw new Error("Imóvel não encontrado");
      }
      return imovel.obterImagemPorId(imagemId);
    } catch (error) {
      console.error("Erro ao buscar imagem por ID:", error);
      throw error;
    }
  }
  // Exclui todos os imóveis de um cliente específico
  async deleteByDono(clienteId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const imoveisRestantes = data.filter((item) => item.Dono.Id !== clienteId);
      const imoveisRemovidos = data.length - imoveisRestantes.length;
      localStorage.setItem(this.storageKey, JSON.stringify(imoveisRestantes));
      console.log(`${imoveisRemovidos} imóveis removidos do cliente ${clienteId}`);
      return imoveisRemovidos;
    } catch (error) {
      console.error("Erro ao deletar imóveis por cliente:", error);
      throw new Error("Erro ao deletar imóveis do cliente");
    }
  }
  // Exclui um imóvel
  async delete(id) {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const index = data.findIndex((item) => item.Id === id);
      if (index === -1) {
        throw new Error("Imóvel não encontrado");
      }
      data.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
      throw new Error("Erro ao deletar imóvel");
    }
  }
}
const imovelRepository = new ImovelRepository();
class ClienteRepository {
  constructor() {
    if (!localStorage.getItem("clientes")) {
      localStorage.setItem("clientes", JSON.stringify([]));
    }
  }
  // Limpa todos os dados do repositório
  async clear() {
    try {
      localStorage.setItem("clientes", JSON.stringify([]));
    } catch (error) {
      console.error("Erro ao limpar clientes:", error);
      throw new Error("Erro ao limpar clientes");
    }
  }
  // Converte um objeto JSON em uma entidade Cliente
  _mapToEntity(data) {
    if (!data) return null;
    const cliente = new Cliente(
      data.nome,
      data.sobrenome,
      data.email,
      data.celular,
      data.telefone,
      data.preferenciaContato,
      data.observacoes
    );
    if (data.foto) {
      cliente.definirFoto(data.foto);
    }
    if (data.endereco) {
      cliente.definirEndereco(
        new Endereco(
          data.endereco.descricao || "Principal",
          // descricao
          data.endereco.logradouro,
          // logradouro
          data.endereco.numero,
          // numero
          data.endereco.cep,
          // cep
          data.endereco.bairro,
          // bairro
          data.endereco.cidade,
          // cidade
          data.endereco.estado,
          // estado
          data.endereco.pais || "Brasil"
          // pais
        )
      );
    }
    if (data.enderecos && data.enderecos.length > 0) {
      const primeiroEndereco = data.enderecos[0];
      cliente.definirEndereco(
        new Endereco(
          primeiroEndereco.descricao || "Principal",
          primeiroEndereco.logradouro,
          primeiroEndereco.numero,
          primeiroEndereco.cep,
          primeiroEndereco.bairro,
          primeiroEndereco.cidade,
          primeiroEndereco.estado,
          primeiroEndereco.pais || "Brasil"
        )
      );
    }
    if (data.imoveis && Array.isArray(data.imoveis)) {
      data.imoveis.forEach((imovelData) => {
        const imovelBasico = {
          Id: imovelData.id,
          TotalComodos: imovelData.totalComodos,
          NumeroQuartos: imovelData.numeroQuartos,
          NumeroBanheiros: imovelData.numeroBanheiros,
          AreaTotal: imovelData.areaTotal,
          Observacao: imovelData.observacao,
          Endereco: imovelData.endereco ? {
            Id: imovelData.endereco.id,
            Descricao: imovelData.endereco.descricao,
            Logradouro: imovelData.endereco.logradouro,
            Numero: imovelData.endereco.numero,
            Cep: imovelData.endereco.cep,
            Bairro: imovelData.endereco.bairro,
            Cidade: imovelData.endereco.cidade,
            Estado: imovelData.endereco.estado,
            Pais: imovelData.endereco.pais
          } : null
        };
        cliente.Imoveis.push(imovelBasico);
      });
    }
    cliente.Id = data.id;
    return cliente;
  }
  // Carregar imóveis completos do ImovelRepository
  async _loadImoveisCompletos(cliente) {
    try {
      const imoveisCompletos = await imovelRepository.getByClienteId(cliente.Id);
      cliente.Imoveis = imoveisCompletos;
      return cliente;
    } catch (error) {
      console.error("Erro ao carregar imóveis completos:", error);
      return cliente;
    }
  }
  // Converte uma entidade Cliente em um objeto JSON para armazenamento
  _mapToJSON(cliente) {
    if (!cliente) return null;
    return {
      id: cliente.Id,
      nome: cliente.Nome,
      sobrenome: cliente.Sobrenome,
      email: cliente.Email,
      telefone: cliente.Telefone,
      celular: cliente.Celular,
      foto: cliente.Foto,
      // Adicionando o mapeamento da foto
      preferenciaContato: cliente.PreferenciaContato,
      endereco: cliente.Endereco ? {
        descricao: cliente.Endereco.Descricao,
        logradouro: cliente.Endereco.Logradouro,
        numero: cliente.Endereco.Numero,
        cep: cliente.Endereco.Cep,
        bairro: cliente.Endereco.Bairro,
        cidade: cliente.Endereco.Cidade,
        estado: cliente.Endereco.Estado,
        pais: cliente.Endereco.Pais,
        complemento: cliente.Endereco.Complemento
      } : null,
      observacoes: cliente.Observacoes,
      imoveis: cliente.Imoveis?.map((imovel) => ({
        id: imovel.Id,
        totalComodos: imovel.TotalComodos,
        numeroQuartos: imovel.NumeroQuartos,
        numeroBanheiros: imovel.NumeroBanheiros,
        areaTotal: imovel.AreaTotal,
        observacao: imovel.Observacao,
        endereco: imovel.Endereco ? {
          id: imovel.Endereco.Id,
          descricao: imovel.Endereco.Descricao,
          logradouro: imovel.Endereco.Logradouro,
          numero: imovel.Endereco.Numero,
          cep: imovel.Endereco.Cep,
          bairro: imovel.Endereco.Bairro,
          cidade: imovel.Endereco.Cidade,
          estado: imovel.Endereco.Estado,
          pais: imovel.Endereco.Pais
        } : null
      })) || []
    };
  }
  // Lista todos os clientes
  async getAll() {
    try {
      const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
      const clientesMapeados = clientes.map((data) => this._mapToEntity(data));
      const clientesComImoveis = await Promise.all(
        clientesMapeados.map(async (cliente) => {
          return await this._loadImoveisCompletos(cliente);
        })
      );
      return clientesComImoveis;
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw new Error("Erro ao buscar clientes");
    }
  }
  // Busca um cliente por ID
  async getById(id) {
    try {
      const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
      const cliente = clientes.find((c) => c.id === id);
      const clienteMapeado = this._mapToEntity(cliente);
      if (clienteMapeado) {
        return await this._loadImoveisCompletos(clienteMapeado);
      }
      return clienteMapeado;
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      throw new Error("Erro ao buscar cliente");
    }
  }
  // Limpa fotos grandes de clientes antigos para liberar espaço
  _limparFotosAntigas(clientes) {
    let dadosLimpos = false;
    clientes.forEach((cliente) => {
      if (cliente.foto && cliente.foto.length > 5e4) {
        cliente.foto = null;
        dadosLimpos = true;
      }
    });
    return dadosLimpos;
  }
  // Salva um novo cliente
  async save(cliente) {
    try {
      const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
      const clienteJSON = this._mapToJSON(cliente);
      if (!clienteJSON.id) {
        clienteJSON.id = crypto.randomUUID();
        clientes.push(clienteJSON);
      } else {
        const index = clientes.findIndex((c) => c.id === clienteJSON.id);
        if (index >= 0) {
          clientes[index] = clienteJSON;
        } else {
          clientes.push(clienteJSON);
        }
      }
      try {
        localStorage.setItem("clientes", JSON.stringify(clientes));
      } catch (quotaError) {
        if (quotaError.name === "QuotaExceededError") {
          console.warn("LocalStorage cheio, tentando limpar dados antigos...");
          const dadosLimpos = this._limparFotosAntigas(clientes);
          if (dadosLimpos) {
            try {
              localStorage.setItem("clientes", JSON.stringify(clientes));
              console.log("Dados limpos com sucesso, cliente salvo");
            } catch {
              throw new Error(
                "Armazenamento local cheio. Considere remover alguns clientes com fotos."
              );
            }
          } else {
            throw new Error(
              "Armazenamento local cheio. Considere remover alguns clientes para liberar espaço."
            );
          }
        } else {
          throw quotaError;
        }
      }
      return this._mapToEntity(clienteJSON);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      throw new Error(error.message || "Erro ao salvar cliente");
    }
  }
  // Exclui um cliente
  async delete(id) {
    try {
      const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
      const filteredClientes = clientes.filter((c) => c.id !== id);
      localStorage.setItem("clientes", JSON.stringify(filteredClientes));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      throw new Error("Erro ao excluir cliente");
    }
  }
}
new ClienteRepository();
export {
  ClienteRepository as C,
  ImovelRepository as I
};
//# sourceMappingURL=clienteRepository-DQ_hoKdA.js.map
