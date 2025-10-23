import { M as Material } from "./material-D-n2u651.js";
import { M as MaterialRepository } from "./materialRepository-ClMwRjl3.js";
import "./guid-BHuXRmln.js";
async function seedMateriais() {
  const materialRepository = new MaterialRepository();
  const materiais = [
    new Material(
      "Detergente Neutro 500ml",
      "UN",
      8.5,
      "",
      "https://www.exemplo.com/detergente-neutro"
    ),
    new Material(
      "Desinfetante Lavanda 1L",
      "UN",
      12.9,
      "",
      "https://www.exemplo.com/desinfetante-lavanda"
    ),
    new Material("Álcool 70% 1L", "UN", 15.8, "", "https://www.exemplo.com/alcool-70"),
    new Material("Água Sanitária 1L", "UN", 4.5, "", "https://www.exemplo.com/agua-sanitaria"),
    new Material("Sabão em Pó 1kg", "UN", 18.9, "", "https://www.exemplo.com/sabao-em-po"),
    new Material("Limpa Vidros 500ml", "UN", 9.75, "", "https://www.exemplo.com/limpa-vidros"),
    new Material("Cera Incolor 750ml", "UN", 22.4, "", "https://www.exemplo.com/cera-incolor"),
    new Material("Pano de Microfibra", "UN", 12, "", "https://www.exemplo.com/pano-microfibra"),
    new Material(
      "Esponja Dupla Face",
      "UN",
      3.25,
      "",
      "https://www.exemplo.com/esponja-dupla-face"
    ),
    new Material("Saco de Lixo 100L", "PCT", 16.5, "", "https://www.exemplo.com/saco-lixo-100l"),
    new Material("Luva de Borracha P", "PAR", 8.9, "", "https://www.exemplo.com/luva-borracha-p"),
    new Material("Luva de Borracha M", "PAR", 8.9, "", "https://www.exemplo.com/luva-borracha-m"),
    new Material("Luva de Borracha G", "PAR", 8.9, "", "https://www.exemplo.com/luva-borracha-g"),
    new Material("Vassoura de Piaçava", "UN", 25.8, "", "https://www.exemplo.com/vassoura-piacava"),
    new Material("Rodo 40cm", "UN", 18.6, "", "https://www.exemplo.com/rodo-40cm")
  ];
  await materialRepository.clear();
  for (const material of materiais) {
    try {
      await materialRepository.save(material);
      console.log(`Material "${material.Descricao}" adicionado com sucesso`);
    } catch (error) {
      console.error(`Erro ao adicionar material "${material.Descricao}":`, error);
    }
  }
  console.log(`Seed de materiais concluído! ${materiais.length} materiais adicionados.`);
}
async function clearMateriais() {
  const materialRepository = new MaterialRepository();
  await materialRepository.clear();
  console.log("Todos os materiais foram removidos.");
}
export {
  clearMateriais,
  seedMateriais
};
//# sourceMappingURL=materialSeed-DxCvsxFa.js.map
