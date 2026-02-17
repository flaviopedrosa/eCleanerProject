import { Material } from '../../../domain/entities/material'
import { MaterialRepository } from '../materialRepository'

/**
 * Adiciona materiais de limpeza de teste ao repositório
 */
export async function seedMateriais() {
  const materialRepository = new MaterialRepository()

  const materiais = [
    // Detergentes e Sabões
    new Material(
      'Detergente Neutro 500ml',
      'UN',
      8.5,
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
      'https://www.esempio.com/detergente-neutro',
      45,
      20,
    ),
    new Material(
      'Detergente Líquido Limão 500ml',
      'UN',
      9.2,
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
      'https://www.esempio.com/detergente-limao',
      32,
      20,
    ),
    new Material(
      'Sabão Líquido Coco 5L',
      'UN',
      45.9,
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80',
      'https://www.esempio.com/sabao-liquido-coco',
      15,
      10,
    ),
    new Material(
      'Sabão em Pó 1kg',
      'UN',
      18.9,
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
      'https://www.esempio.com/sabao-em-po',
      28,
      15,
    ),
    new Material(
      'Sabão em Barra 200g',
      'UN',
      3.5,
      'https://images.unsplash.com/photo-1600857544200-242c6c65e67a?w=400&q=80',
      'https://www.esempio.com/sabao-barra',
      60,
      30,
    ),

    // Desinfetantes
    new Material(
      'Desinfetante Lavanda 1L',
      'UN',
      12.9,
      'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',
      'https://www.esempio.com/desinfetante-lavanda',
      25,
      15,
    ),
    new Material(
      'Desinfetante Eucalipto 1L',
      'UN',
      12.9,
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
      'https://www.esempio.com/desinfetante-eucalipto',
      22,
      15,
    ),
    new Material(
      'Desinfetante Citrus 2L',
      'UN',
      22.5,
      'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80',
      'https://www.esempio.com/desinfetante-citrus',
      18,
      10,
    ),
    new Material(
      'Álcool 70% Gel 500ml',
      'UN',
      18.9,
      'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&q=80',
      'https://www.esempio.com/alcool-gel',
      35,
      20,
    ),
    new Material(
      'Álcool 70% Líquido 1L',
      'UN',
      15.8,
      'https://images.unsplash.com/photo-1598561699832-097fc1b1e87e?w=400&q=80',
      'https://www.esempio.com/alcool-liquido',
      28,
      15,
    ),

    // Água Sanitária e Alvejantes
    new Material(
      'Água Sanitária 1L',
      'UN',
      4.5,
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&q=80',
      'https://www.esempio.com/agua-sanitaria',
      42,
      25,
    ),
    new Material(
      'Água Sanitária 5L',
      'UN',
      19.9,
      'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=400&q=80',
      'https://www.esempio.com/agua-sanitaria-5l',
      12,
      10,
    ),
    new Material(
      'Alvejante sem Cloro 1L',
      'UN',
      14.9,
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80',
      'https://www.esempio.com/alvejante-sem-cloro',
      0,
      10,
    ),

    // Limpadores Multiuso
    new Material(
      'Limpador Multiuso 500ml',
      'UN',
      11.5,
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
      'https://www.esempio.com/limpador-multiuso',
      38,
      20,
    ),
    new Material(
      'Limpador Concentrado 1L',
      'UN',
      24.9,
      'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400&q=80',
      'https://www.esempio.com/limpador-concentrado',
      8,
      12,
    ),
    new Material(
      'Limpador Perfumado Flowers 2L',
      'UN',
      28.5,
      'https://images.unsplash.com/photo-1627933842676-3b0c8f3f9446?w=400&q=80',
      'https://www.esempio.com/limpador-flowers',
      15,
      10,
    ),

    // Limpa Vidros e Superfícies
    new Material(
      'Limpa Vidros 500ml',
      'UN',
      9.75,
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&q=80',
      'https://www.esempio.com/limpa-vidros',
      24,
      15,
    ),
    new Material(
      'Limpa Inox 300ml',
      'UN',
      16.9,
      'https://images.unsplash.com/photo-1563209259-2819dbb22d93?w=400&q=80',
      'https://www.esempio.com/limpa-inox',
      6,
      10,
    ),
    new Material(
      'Removedor de Manchas 500ml',
      'UN',
      19.9,
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&q=80',
      'https://www.esempio.com/removedor-manchas',
      18,
      12,
    ),
    new Material(
      'Limpa Porcelanato 1L',
      'UN',
      25.5,
      'https://images.unsplash.com/photo-1600857544200-242c6c65e67a?w=400&q=80',
      'https://www.esempio.com/limpa-porcelanato',
      22,
      10,
    ),

    // Ceras e Polidores
    new Material(
      'Cera Incolor 750ml',
      'UN',
      22.4,
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
      'https://www.esempio.com/cera-incolor',
      14,
      8,
    ),
    new Material(
      'Cera Vermelha 750ml',
      'UN',
      22.4,
      'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80',
      'https://www.esempio.com/cera-vermelha',
      0,
      8,
    ),
    new Material(
      'Polidor de Móveis 200ml',
      'UN',
      14.9,
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&q=80',
      'https://www.esempio.com/polidor-moveis',
      26,
      12,
    ),
    new Material(
      'Lustrador Spray 400ml',
      'UN',
      18.5,
      'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=400&q=80',
      'https://www.esempio.com/lustrador-spray',
      19,
      10,
    ),

    // Produtos para Banheiro
    new Material(
      'Desincrostante para Banheiro 500ml',
      'UN',
      12.9,
      'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',
      'https://www.esempio.com/desincrostante',
      31,
      15,
    ),
    new Material(
      'Limpador de Azulejos 1L',
      'UN',
      15.9,
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
      'https://www.esempio.com/limpador-azulejos',
      27,
      12,
    ),
    new Material(
      'Pedra Sanitária Adesiva',
      'UN',
      6.5,
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
      'https://www.esempio.com/pedra-sanitaria',
      52,
      30,
    ),
    new Material(
      'Desodorizador Sanitário 60ml',
      'UN',
      8.9,
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&q=80',
      'https://www.esempio.com/desodorizador',
      45,
      25,
    ),

    // Panos e Esponjas
    new Material(
      'Pano de Microfibra 40x60cm',
      'UN',
      12.0,
      'https://images.unsplash.com/photo-1564694202883-46e7448c1b26?w=400&q=80',
      'https://www.esempio.com/pano-microfibra',
      36,
      20,
    ),
    new Material(
      'Pano de Chão Alvejado',
      'UN',
      4.5,
      'https://images.unsplash.com/photo-1600857544200-242c6c65e67a?w=400&q=80',
      'https://www.esempio.com/pano-chao',
      48,
      30,
    ),
    new Material(
      'Esponja Dupla Face',
      'UN',
      3.25,
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80',
      'https://www.esempio.com/esponja-dupla',
      62,
      40,
    ),
    new Material(
      'Esponja de Aço Pacote c/8',
      'PCT',
      7.9,
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80',
      'https://www.esempio.com/esponja-aco',
      0,
      15,
    ),
    new Material(
      'Esponja Limpeza Pesada',
      'UN',
      5.5,
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
      'https://www.esempio.com/esponja-pesada',
      29,
      20,
    ),
    new Material(
      'Luva para Limpeza de Vidros',
      'UN',
      14.9,
      'https://images.unsplash.com/photo-1564694202883-46e7448c1b26?w=400&q=80',
      'https://www.esempio.com/luva-vidros',
      11,
      8,
    ),

    // Sacos de Lixo
    new Material(
      'Saco de Lixo 15L - Pacote c/100',
      'PCT',
      9.9,
      'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=400&q=80',
      'https://www.esempio.com/saco-15l',
      68,
      30,
    ),
    new Material(
      'Saco de Lixo 50L - Pacote c/50',
      'PCT',
      12.9,
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&q=80',
      'https://www.esempio.com/saco-50l',
      55,
      25,
    ),
    new Material(
      'Saco de Lixo 100L - Pacote c/25',
      'PCT',
      16.5,
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&q=80',
      'https://www.esempio.com/saco-100l',
      42,
      20,
    ),
    new Material(
      'Saco de Lixo 200L - Pacote c/10',
      'PCT',
      24.9,
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80',
      'https://www.esempio.com/saco-200l',
      8,
      15,
    ),

    // Luvas de Proteção
    new Material(
      'Luva de Borracha P',
      'PAR',
      8.9,
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
      'https://www.esempio.com/luva-p',
      24,
      12,
    ),
    new Material(
      'Luva de Borracha M',
      'PAR',
      8.9,
      'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',
      'https://www.esempio.com/luva-m',
      32,
      12,
    ),
    new Material(
      'Luva de Borracha G',
      'PAR',
      8.9,
      'https://images.unsplash.com/photo-1598561699832-097fc1b1e87e?w=400&q=80',
      'https://www.esempio.com/luva-g',
      28,
      12,
    ),
    new Material(
      'Luva Descartável Caixa c/100',
      'CX',
      28.5,
      'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&q=80',
      'https://www.esempio.com/luva-descartavel',
      5,
      10,
    ),

    // Equipamentos e Ferramentas
    new Material(
      'Vassoura de Piaçava',
      'UN',
      25.8,
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
      'https://www.esempio.com/vassoura-piacava',
      0,
      6,
    ),
    new Material(
      'Vassoura de Nylon',
      'UN',
      22.9,
      'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=400&q=80',
      'https://www.esempio.com/vassoura-nylon',
      9,
      6,
    ),
    new Material(
      'Rodo 40cm',
      'UN',
      18.6,
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&q=80',
      'https://www.esempio.com/rodo-40cm',
      14,
      8,
    ),
    new Material(
      'Rodo 60cm',
      'UN',
      24.9,
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&q=80',
      'https://www.esempio.com/rodo-60cm',
      11,
      6,
    ),
    new Material(
      'Balde Plástico 10L',
      'UN',
      15.9,
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80',
      'https://www.esempio.com/balde-10l',
      16,
      8,
    ),
    new Material(
      'Balde Plástico 20L',
      'UN',
      28.5,
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80',
      'https://www.esempio.com/balde-20l',
      7,
      5,
    ),
    new Material(
      'Escova de Mão',
      'UN',
      7.5,
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80',
      'https://www.esempio.com/escova-mao',
      33,
      15,
    ),
    new Material(
      'Pá Coletora',
      'UN',
      12.9,
      'https://images.unsplash.com/photo-1564694202883-46e7448c1b26?w=400&q=80',
      'https://www.esempio.com/pa-coletora',
      20,
      10,
    ),
  ]

  // Limpar dados existentes primeiro
  await materialRepository.clear()

  // Adicionar cada material
  for (const material of materiais) {
    try {
      await materialRepository.save(material)
      console.log(`Material "${material.Descricao}" adicionado com sucesso`)
    } catch (error) {
      console.error(`Erro ao adicionar material "${material.Descricao}":`, error)
    }
  }

  console.log(`Seed de materiais concluído! ${materiais.length} materiais adicionados.`)
}

/**
 * Remove todos os materiais do repositório
 */
export async function clearMateriais() {
  const materialRepository = new MaterialRepository()
  await materialRepository.clear()
  console.log('Todos os materiais foram removidos.')
}
