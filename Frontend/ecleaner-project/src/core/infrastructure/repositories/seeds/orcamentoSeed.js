import { Orcamento } from '../../../domain/entities/orcamento.js'
import { OrdemServico } from '../../../domain/entities/OrdemServico.js'
import { OrcamentoRepository } from '../orcamentoRepository.js'
import { OrdemServicoRepository } from '../ordemServicoRepository.js'
import { ClienteRepository } from '../clienteRepository.js'
import { ImovelRepository } from '../imovelRepository.js'
import { PacoteServicoRepository } from '../pacoteServicoRepository.js'
import { StatusOrcamento } from '../../../domain/enums/statusOrcamento.js'

/**
 * Seed de orçamentos e ordens de serviço
 * Cria 30 orçamentos variados e transforma 20 em ordens de serviço
 */
export async function seedOrcamentos() {
  const orcamentoRepository = new OrcamentoRepository()
  const ordemServicoRepository = new OrdemServicoRepository()
  const clienteRepository = new ClienteRepository()
  const imovelRepository = new ImovelRepository()
  const pacoteRepository = new PacoteServicoRepository()

  // Buscar dados existentes
  const clientes = await clienteRepository.getAll()
  const imoveis = await imovelRepository.getAll()
  const pacotes = pacoteRepository.buscarTodos()

  if (clientes.length === 0) {
    console.warn('⚠️ Nenhum cliente encontrado. Execute o seed de clientes primeiro.')
    return []
  }

  if (imoveis.length === 0) {
    console.warn(
      '⚠️ Nenhum imóvel encontrado. Execute o seed de clientes primeiro (que cria imóveis).',
    )
    return []
  }

  if (pacotes.length === 0) {
    console.warn('⚠️ Nenhum pacote encontrado. Execute o seed de pacotes primeiro.')
    return []
  }

  console.log(
    `📋 Encontrados ${clientes.length} clientes, ${imoveis.length} imóveis e ${pacotes.length} pacotes`,
  )

  const frequencias = ['Única', 'Semanal', 'Quinzenal', 'Mensal', 'Trimestral']
  const orcamentos = []
  let numeroOrcamento = 1

  // Criar 30 orçamentos
  for (let i = 0; i < 30; i++) {
    try {
      // Selecionar cliente, imóvel e pacote aleatórios
      const cliente = clientes[Math.floor(Math.random() * clientes.length)]
      const imovel = imoveis[Math.floor(Math.random() * imoveis.length)]
      const pacote = pacotes[Math.floor(Math.random() * pacotes.length)]
      const frequencia = frequencias[Math.floor(Math.random() * frequencias.length)]

      // Calcular valores baseados no pacote
      const quantidadeProfissionais = Math.floor(Math.random() * 3) + 1 // 1 a 3 profissionais
      const estimativaHoras = Math.floor(Math.random() * 6) + 2 // 2 a 8 horas

      // Alguns orçamentos com desconto
      const descontos = i % 5 === 0 ? Math.random() * 100 + 50 : 0

      // Calcular impostos (aproximadamente 15% do valor total do pacote)
      const impostosTaxas = pacote.ValorTotal * 0.15

      // Validade varia entre 15 e 60 dias
      const diasValidade = Math.floor(Math.random() * 45) + 15
      const validade = new Date(Date.now() + diasValidade * 24 * 60 * 60 * 1000)

      // Criar orçamento
      const orcamento = new Orcamento(
        numeroOrcamento++,
        cliente,
        imovel,
        pacote,
        frequencia,
        quantidadeProfissionais,
        estimativaHoras,
        descontos,
        impostosTaxas,
        validade,
      )

      // Definir status baseado no índice
      if (i < 20) {
        // Primeiros 20 serão aprovados
        orcamento.Status = StatusOrcamento.APROVADO
      } else if (i < 25) {
        // 5 enviados aguardando resposta
        orcamento.Status = StatusOrcamento.ENVIADO
      } else {
        // Últimos 5 ficam em rascunho
        orcamento.Status = StatusOrcamento.RASCUNHO
      }

      // Ajustar data de emissão para simular orçamentos ao longo do tempo
      const diasAtras = Math.floor(Math.random() * 90) // até 90 dias atrás
      orcamento.DataEmissao = new Date(Date.now() - diasAtras * 24 * 60 * 60 * 1000)

      await orcamentoRepository.adicionar(orcamento)
      orcamentos.push(orcamento)

      console.log(`✅ Orçamento #${orcamento.NumeroOrcamento} criado - ${orcamento.Status}`)
    } catch (error) {
      console.error(`❌ Erro ao criar orçamento ${i + 1}:`, error.message)
    }
  }

  console.log(`✅ ${orcamentos.length} orçamentos criados!`)

  // Transformar os 20 primeiros orçamentos aprovados em ordens de serviço
  const orcamentosAprovados = orcamentos.filter((o) => o.Status === StatusOrcamento.APROVADO)
  console.log(`\n🔄 Transformando ${orcamentosAprovados.length} orçamentos em ordens de serviço...`)

  let numeroOS = 1
  const ordensServico = []

  for (const orcamento of orcamentosAprovados) {
    try {
      // Criar ordem de serviço a partir do orçamento
      const ordemServico = new OrdemServico(
        orcamento.Id,
        numeroOS++,
        orcamento.Cliente,
        orcamento.Imovel,
        orcamento.FrequenciaDesejada,
        orcamento.QuantidadeProfissionais,
        orcamento.EstimativaHoras,
        orcamento.Descontos,
        orcamento.ImpostosTaxas,
      )

      // Copiar itens do orçamento para a ordem de serviço
      orcamento.Itens.forEach((item) => {
        ordemServico.adicionarItem(item)
      })

      // Definir data de início previsto (entre 1 e 30 dias após criação)
      const diasAteInicio = Math.floor(Math.random() * 30) + 1
      ordemServico.InicioPrevisto = new Date(
        ordemServico.DataCriacao.getTime() + diasAteInicio * 24 * 60 * 60 * 1000,
      )

      // Definir data de fim previsto (início + estimativa de horas)
      ordemServico.FimPrevisto = new Date(
        ordemServico.InicioPrevisto.getTime() + orcamento.EstimativaHoras * 60 * 60 * 1000,
      )

      // Algumas ordens já iniciadas/concluídas
      if (Math.random() > 0.5) {
        ordemServico.InicioReal = ordemServico.InicioPrevisto
        ordemServico.DataInicio = ordemServico.InicioPrevisto

        // Algumas já concluídas
        if (Math.random() > 0.6) {
          ordemServico.FimReal = new Date(
            ordemServico.InicioReal.getTime() + orcamento.EstimativaHoras * 60 * 60 * 1000,
          )
          ordemServico.DataConclusao = ordemServico.FimReal
          ordemServico.DuracaoHoras = orcamento.EstimativaHoras
          ordemServico.concluir()
        } else {
          ordemServico.iniciar()
        }
      }

      await ordemServicoRepository.adicionar(ordemServico)
      ordensServico.push(ordemServico)

      console.log(`✅ Ordem de Serviço #${ordemServico.NumeroOS} criada - ${ordemServico.Status}`)
    } catch (error) {
      console.error(
        `❌ Erro ao criar ordem de serviço para orçamento ${orcamento.NumeroOrcamento}:`,
        error.message,
      )
    }
  }

  console.log(`\n✅ ${ordensServico.length} ordens de serviço criadas!`)
  console.log(`📊 Resumo:`)
  console.log(`   - Total de orçamentos: ${orcamentos.length}`)
  console.log(`   - Orçamentos aprovados: ${orcamentosAprovados.length}`)
  console.log(`   - Ordens de serviço criadas: ${ordensServico.length}`)

  return { orcamentos, ordensServico }
}
