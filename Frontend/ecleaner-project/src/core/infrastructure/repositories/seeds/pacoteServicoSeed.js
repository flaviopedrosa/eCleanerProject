import { PacoteServico } from '../../../domain/entities/pacoteServico.js'
import { ItemServico } from '../../../domain/entities/itemServico.js'
import { ItemMaterial } from '../../../domain/entities/itemMaterial.js'
import { PacoteServicoRepository } from '../pacoteServicoRepository.js'
import { ServicoRepository } from '../servicoRepository.js'
import { MaterialRepository } from '../materialRepository.js'
import { Servico } from '../../../domain/entities/servico.js'

/**
 * Seed de pacotes de serviços de limpeza
 * Cria pacotes especializados de limpeza
 */
export async function seedPacotesServicos() {
  const pacoteRepository = new PacoteServicoRepository()
  const servicoRepository = new ServicoRepository()
  const materialRepository = new MaterialRepository()

  // Buscar serviços e materiais existentes
  const servicos = servicoRepository.buscarTodos()
  const materiais = await materialRepository.getAll()

  console.log('Serviços encontrados:', servicos.length)
  if (servicos.length > 0) {
    console.log('Primeiro serviço:', servicos[0])
    console.log('É instância de Servico?', servicos[0] instanceof Servico)
  }

  // Funções auxiliares para encontrar itens
  const encontrarServico = (nome) =>
    servicos.find((s) => s.Descricao.toLowerCase().includes(nome.toLowerCase()))
  const encontrarMaterial = (nome) =>
    materiais.find((m) => m.Descricao.toLowerCase().includes(nome.toLowerCase()))

  const pacotes = []

  // 1. Pacote: Limpeza Pós-Obra
  const pacoteObra = new PacoteServico('Limpeza Pós-Obra', 35)

  // Serviços
  const servicoObra = encontrarServico('Pós-Obra')
  if (servicoObra) {
    const itemServicoObra = new ItemServico(servicoObra, 1, 240, 2)
    pacoteObra.adicionarItemServico(itemServicoObra)
  }

  const servicoVidros = encontrarServico('Vidros')
  if (servicoVidros) {
    const itemVidros = new ItemServico(servicoVidros, 1, 120, 1)
    pacoteObra.adicionarItemServico(itemVidros)
  }

  // Materiais
  const detergente = encontrarMaterial('Detergente')
  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 3, detergente.PrecoUnitario)
    pacoteObra.adicionarItemMaterial(itemDetergente)
  }

  const desinfetante = encontrarMaterial('Desinfetante')
  if (desinfetante) {
    const itemDesinfetante = new ItemMaterial(desinfetante, 2, desinfetante.PrecoUnitario)
    pacoteObra.adicionarItemMaterial(itemDesinfetante)
  }

  const panoMicrofibra = encontrarMaterial('Pano')
  if (panoMicrofibra) {
    const itemPano = new ItemMaterial(panoMicrofibra, 5, panoMicrofibra.PrecoUnitario)
    pacoteObra.adicionarItemMaterial(itemPano)
  }

  pacotes.push(pacoteObra)

  // 2. Pacote: Limpeza de Mudança
  const pacoteMudanca = new PacoteServico('Limpeza de Mudança', 30)

  const servicoMudanca = encontrarServico('Mudança')
  if (servicoMudanca) {
    const itemMudanca = new ItemServico(servicoMudanca, 1, 300, 2)
    pacoteMudanca.adicionarItemServico(itemMudanca)
  }

  const servicoCozinha = encontrarServico('Cozinha')
  if (servicoCozinha) {
    const itemCozinha = new ItemServico(servicoCozinha, 1, 90, 1)
    pacoteMudanca.adicionarItemServico(itemCozinha)
  }

  const servicoBanheiro = encontrarServico('Banheiro')
  if (servicoBanheiro) {
    const itemBanheiro = new ItemServico(servicoBanheiro, 1, 60, 1)
    pacoteMudanca.adicionarItemServico(itemBanheiro)
  }

  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 2, detergente.PrecoUnitario)
    pacoteMudanca.adicionarItemMaterial(itemDetergente)
  }

  if (desinfetante) {
    const itemDesinfetante = new ItemMaterial(desinfetante, 2, desinfetante.PrecoUnitario)
    pacoteMudanca.adicionarItemMaterial(itemDesinfetante)
  }

  pacotes.push(pacoteMudanca)

  // 3. Pacote: Limpeza Pesada
  const pacotePesada = new PacoteServico('Limpeza Pesada', 40)

  const servicoPesada = encontrarServico('Pesada')
  if (servicoPesada) {
    const itemPesada = new ItemServico(servicoPesada, 1, 360, 3)
    pacotePesada.adicionarItemServico(itemPesada)
  }

  const servicoEstofados = encontrarServico('Estofado')
  if (servicoEstofados) {
    const itemEstofados = new ItemServico(servicoEstofados, 1, 180, 2)
    pacotePesada.adicionarItemServico(itemEstofados)
  }

  const servicoEnceramento = encontrarServico('Enceramento')
  if (servicoEnceramento) {
    const itemEnceramento = new ItemServico(servicoEnceramento, 1, 120, 2)
    pacotePesada.adicionarItemServico(itemEnceramento)
  }

  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 3, detergente.PrecoUnitario)
    pacotePesada.adicionarItemMaterial(itemDetergente)
  }

  const multiuso = encontrarMaterial('Multiuso')
  if (multiuso) {
    const itemMultiuso = new ItemMaterial(multiuso, 3, multiuso.PrecoUnitario)
    pacotePesada.adicionarItemMaterial(itemMultiuso)
  }

  pacotes.push(pacotePesada)

  // 4. Pacote: Limpeza de Áreas Externas
  const pacoteExternas = new PacoteServico('Limpeza de Áreas Externas', 35)

  const servicoQuintal =
    encontrarServico('Quintal') || encontrarServico('Jardim') || encontrarServico('Área Externa')
  if (servicoQuintal) {
    const itemQuintal = new ItemServico(servicoQuintal, 1, 240, 2)
    pacoteExternas.adicionarItemServico(itemQuintal)
  }

  const servicoPiscina = encontrarServico('Piscina')
  if (servicoPiscina) {
    const itemPiscina = new ItemServico(servicoPiscina, 1, 120, 1)
    pacoteExternas.adicionarItemServico(itemPiscina)
  }

  const vassoura = encontrarMaterial('Vassoura')
  if (vassoura) {
    const itemVassoura = new ItemMaterial(vassoura, 2, vassoura.PrecoUnitario)
    pacoteExternas.adicionarItemMaterial(itemVassoura)
  }

  if (desinfetante) {
    const itemDesinfetante = new ItemMaterial(desinfetante, 2, desinfetante.PrecoUnitario)
    pacoteExternas.adicionarItemMaterial(itemDesinfetante)
  }

  pacotes.push(pacoteExternas)

  // 5. Pacote: Limpeza Comercial Básica
  const pacoteComercial = new PacoteServico('Limpeza Comercial Básica', 30)

  const servicoComercial = encontrarServico('Comercial') || encontrarServico('Escritório')
  if (servicoComercial) {
    const itemComercial = new ItemServico(servicoComercial, 1, 180, 2)
    pacoteComercial.adicionarItemServico(itemComercial)
  }

  if (servicoBanheiro) {
    const itemBanheiro = new ItemServico(servicoBanheiro, 1, 60, 1)
    pacoteComercial.adicionarItemServico(itemBanheiro)
  }

  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 2, detergente.PrecoUnitario)
    pacoteComercial.adicionarItemMaterial(itemDetergente)
  }

  if (multiuso) {
    const itemMultiuso = new ItemMaterial(multiuso, 2, multiuso.PrecoUnitario)
    pacoteComercial.adicionarItemMaterial(itemMultiuso)
  }

  pacotes.push(pacoteComercial)

  // 6. Pacote: Limpeza de Condomínios
  const pacoteCondominio = new PacoteServico('Limpeza de Condomínios', 32)

  const servicoEscadas = encontrarServico('Escada') || encontrarServico('Área Comum')
  if (servicoEscadas) {
    const itemEscadas = new ItemServico(servicoEscadas, 1, 150, 2)
    pacoteCondominio.adicionarItemServico(itemEscadas)
  }

  const servicoCorretor = encontrarServico('Corredor')
  if (servicoCorretor) {
    const itemCorretor = new ItemServico(servicoCorretor, 1, 120, 2)
    pacoteCondominio.adicionarItemServico(itemCorretor)
  }

  if (desinfetante) {
    const itemDesinfetante = new ItemMaterial(desinfetante, 3, desinfetante.PrecoUnitario)
    pacoteCondominio.adicionarItemMaterial(itemDesinfetante)
  }

  if (panoMicrofibra) {
    const itemPano = new ItemMaterial(panoMicrofibra, 5, panoMicrofibra.PrecoUnitario)
    pacoteCondominio.adicionarItemMaterial(itemPano)
  }

  pacotes.push(pacoteCondominio)

  // 7. Pacote: Limpeza Residencial Completa
  const pacoteResidencial = new PacoteServico('Limpeza Residencial Completa', 28)

  const servicoResidencial =
    encontrarServico('Básica Residencial') || encontrarServico('Residencial')
  if (servicoResidencial) {
    const itemResidencial = new ItemServico(servicoResidencial, 1, 180, 2)
    pacoteResidencial.adicionarItemServico(itemResidencial)
  }

  if (servicoCozinha) {
    const itemCozinha = new ItemServico(servicoCozinha, 1, 90, 1)
    pacoteResidencial.adicionarItemServico(itemCozinha)
  }

  if (servicoBanheiro) {
    const itemBanheiro = new ItemServico(servicoBanheiro, 2, 60, 1)
    pacoteResidencial.adicionarItemServico(itemBanheiro)
  }

  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 2, detergente.PrecoUnitario)
    pacoteResidencial.adicionarItemMaterial(itemDetergente)
  }

  if (desinfetante) {
    const itemDesinfetante = new ItemMaterial(desinfetante, 1, desinfetante.PrecoUnitario)
    pacoteResidencial.adicionarItemMaterial(itemDesinfetante)
  }

  if (panoMicrofibra) {
    const itemPano = new ItemMaterial(panoMicrofibra, 3, panoMicrofibra.PrecoUnitario)
    pacoteResidencial.adicionarItemMaterial(itemPano)
  }

  pacotes.push(pacoteResidencial)

  // 8. Pacote: Limpeza Express
  const pacoteExpress = new PacoteServico('Limpeza Express', 25)

  const servicoApartamento = encontrarServico('Apartamento')
  if (servicoApartamento) {
    const itemApartamento = new ItemServico(servicoApartamento, 1, 120, 1)
    pacoteExpress.adicionarItemServico(itemApartamento)
  }

  if (detergente) {
    const itemDetergente = new ItemMaterial(detergente, 1, detergente.PrecoUnitario)
    pacoteExpress.adicionarItemMaterial(itemDetergente)
  }

  if (panoMicrofibra) {
    const itemPano = new ItemMaterial(panoMicrofibra, 2, panoMicrofibra.PrecoUnitario)
    pacoteExpress.adicionarItemMaterial(itemPano)
  }

  pacotes.push(pacoteExpress)

  // Salvar todos os pacotes
  for (const pacote of pacotes) {
    try {
      await pacoteRepository.adicionar(pacote)
      console.log(`✅ Pacote "${pacote.Descricao}" criado com sucesso`)
    } catch (error) {
      console.error(`❌ Erro ao criar pacote "${pacote.Descricao}":`, error)
    }
  }

  console.log(`✅ ${pacotes.length} pacotes de serviços criados com sucesso!`)
  return pacotes
}
