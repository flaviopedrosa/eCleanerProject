import { E as Equipamento } from "./equipamento-DInCJpxH.js";
import { E as EquipamentoRepository } from "./equipamentoRepository-C36gseZz.js";
async function seedEquipamentos() {
  const repository = new EquipamentoRepository();
  await repository.clear();
  const equipamentos = [
    {
      descricao: "Aspirador de Pó Industrial",
      unidade: "dia",
      precoUnitario: 50,
      imagem: ""
    },
    {
      descricao: "Enceradeira Profissional",
      unidade: "dia",
      precoUnitario: 45,
      imagem: ""
    },
    {
      descricao: "Lavadora de Alta Pressão",
      unidade: "dia",
      precoUnitario: 80,
      imagem: ""
    },
    {
      descricao: "Escada de Alumínio 6m",
      unidade: "dia",
      precoUnitario: 25,
      imagem: ""
    },
    {
      descricao: "Aspirador de Líquidos",
      unidade: "dia",
      precoUnitario: 40,
      imagem: ""
    },
    {
      descricao: "Politriz Industrial",
      unidade: "dia",
      precoUnitario: 60,
      imagem: ""
    },
    {
      descricao: "Soprador de Folhas",
      unidade: "dia",
      precoUnitario: 35,
      imagem: ""
    },
    {
      descricao: "Gerador de Vapor",
      unidade: "dia",
      precoUnitario: 70,
      imagem: ""
    },
    {
      descricao: "Carrinho de Limpeza com Kit",
      unidade: "un",
      precoUnitario: 150,
      imagem: ""
    },
    {
      descricao: "Limpadora de Estofados",
      unidade: "dia",
      precoUnitario: 55,
      imagem: ""
    },
    {
      descricao: "Máquina de Lavar Carpete",
      unidade: "dia",
      precoUnitario: 90,
      imagem: ""
    },
    {
      descricao: "Conjunto de Ferramentas de Limpeza",
      unidade: "un",
      precoUnitario: 120,
      imagem: ""
    },
    {
      descricao: "Escovão Rotativo Elétrico",
      unidade: "dia",
      precoUnitario: 40,
      imagem: ""
    },
    {
      descricao: "Hidrolimpadora Profissional",
      unidade: "dia",
      precoUnitario: 95,
      imagem: ""
    },
    {
      descricao: "Pulverizador Manual 5L",
      unidade: "un",
      precoUnitario: 45,
      imagem: ""
    }
  ];
  for (const equipData of equipamentos) {
    const equipamento = new Equipamento(
      equipData.descricao,
      equipData.unidade,
      equipData.precoUnitario,
      equipData.imagem
    );
    await repository.save(equipamento);
  }
  console.log(`✅ ${equipamentos.length} equipamentos criados com sucesso!`);
  return equipamentos.length;
}
export {
  seedEquipamentos as s
};
//# sourceMappingURL=equipamentoSeed-BsORFu6P.js.map
