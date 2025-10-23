/**
 * Utilitário para Geração de PDFs
 *
 * Biblioteca: jsPDF + jsPDF-AutoTable
 *
 * Este módulo fornece funções reutilizáveis para geração de PDFs padronizados
 * no sistema eCleaner, incluindo templates de cabeçalho e rodapé.
 *
 * FONTE: Montserrat (mesma do aplicativo web)
 * - Mantém consistência visual entre o app e os documentos PDF
 * - Fontes convertidas e incluídas em montserratFont.js
 * - Suporta: Regular e Bold
 */

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Fontes customizadas Montserrat
import { addMontserratFont } from './montserratFont'

/**
 * Nome da fonte a ser usada nos PDFs
 * Usando Montserrat para manter consistência com o app web
 */
let FONT_FAMILY = 'Montserrat'

/**
 * Configuração padrão para PDFs
 */
const PDF_CONFIG = {
  margin: {
    top: 52, // Reduzido para dar mais espaço ao conteúdo
    bottom: 25, // Reduzido para dar mais espaço ao conteúdo
    left: 15,
    right: 15,
  },
  headerHeight: 50, // Ajustado para novo layout com separadores
  footerHeight: 20, // Reduzido para dar mais espaço ao conteúdo
  logoSize: {
    width: 100,
    height: 40,
  },
}

/**
 * Adiciona cabeçalho padronizado ao PDF
 *
 * @param {jsPDF} doc - Instância do jsPDF
 * @param {Object} config - Configurações da empresa (localStorage)
 * @param {Object} options - Opções adicionais
 * @param {string} options.title - Título do documento (ex: "ORÇAMENTO")
 * @param {string} options.subtitle - Subtítulo (ex: número do documento)
 */
export function adicionarCabecalhoPDF(doc, config, options = {}) {
  const pageWidth = doc.internal.pageSize.width

  // Logo da empresa (se disponível) - mantém proporções originais
  if (config.logo) {
    try {
      // Obter propriedades da imagem do jsPDF
      const imgProps = doc.getImageProperties(config.logo)

      // Calcular dimensões mantendo proporção
      const maxWidth = PDF_CONFIG.logoSize.width
      const maxHeight = PDF_CONFIG.logoSize.height

      // Calcular aspect ratio da imagem original
      const aspectRatio = imgProps.width / imgProps.height

      let width, height

      // Ajustar para caber dentro dos limites mantendo proporção
      if (aspectRatio > maxWidth / maxHeight) {
        // Imagem é mais larga proporcionalmente - limitar pela largura
        width = maxWidth
        height = maxWidth / aspectRatio
      } else {
        // Imagem é mais alta proporcionalmente - limitar pela altura
        height = maxHeight
        width = maxHeight * aspectRatio
      }

      doc.addImage(config.logo, 'PNG', 9, 0, width, height)
    } catch (error) {
      console.warn('Erro ao adicionar logo ao PDF:', error)
    }
  }

  // Dados da empresa (alinhados à direita, na mesma linha do cabeçalho)
  doc.setFontSize(10)
  doc.setFont(FONT_FAMILY, 'bold')
  doc.text(config.nomeEmpresa || 'eCleaner', pageWidth - PDF_CONFIG.margin.right, 15, {
    align: 'right',
  })

  doc.setFontSize(8)
  doc.setFont(FONT_FAMILY, 'normal')
  doc.text(config.emailEmpresa || '', pageWidth - PDF_CONFIG.margin.right, 22, { align: 'right' })
  doc.text(config.telefoneEmpresa || '', pageWidth - PDF_CONFIG.margin.right, 27, {
    align: 'right',
  })

  // Primeira linha separadora (após logo e dados da empresa)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(PDF_CONFIG.margin.left, 35, pageWidth - PDF_CONFIG.margin.right, 35)

  // Título do documento (centralizado, tamanho 14)
  if (options.title) {
    doc.setFontSize(14)
    doc.setFont(FONT_FAMILY, 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(options.title, pageWidth / 2, 43, { align: 'center' })
  }

  // Segunda linha separadora (após título)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(PDF_CONFIG.margin.left, 48, pageWidth - PDF_CONFIG.margin.right, 48)
}

/**
 * Adiciona rodapé padronizado ao PDF
 *
 * @param {jsPDF} doc - Instância do jsPDF
 * @param {Object} config - Configurações da empresa (localStorage)
 * @param {number} pageNumber - Número da página atual
 * @param {number} totalPages - Total de páginas
 */
export function adicionarRodapePDF(doc, config, pageNumber, totalPages) {
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const footerY = pageHeight - PDF_CONFIG.footerHeight + 5

  // Linha separadora
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(PDF_CONFIG.margin.left, footerY - 5, pageWidth - PDF_CONFIG.margin.right, footerY - 5)

  // Endereço da empresa
  doc.setFontSize(8)
  doc.setFont(FONT_FAMILY, 'normal')
  doc.setTextColor(100, 100, 100)

  if (config.endereco) {
    const endereco = `${config.endereco.logradouro}, ${config.endereco.numero}${config.endereco.complemento ? ' - ' + config.endereco.complemento : ''} - ${config.endereco.bairro}, ${config.endereco.cidade} - ${config.endereco.estado} ${config.endereco.cep}`
    doc.text(endereco, pageWidth / 2, footerY, { align: 'center' })
  }

  // Contatos da empresa
  const contatos = `${config.telefoneEmpresa || ''} • ${config.emailEmpresa || ''}`
  doc.text(contatos, pageWidth / 2, footerY + 5, { align: 'center' })

  // Número da página
  doc.setFontSize(8)
  doc.text(
    `Página ${pageNumber} de ${totalPages}`,
    pageWidth - PDF_CONFIG.margin.right,
    footerY + 10,
    { align: 'right' },
  )

  // Resetar cor do texto
  doc.setTextColor(0, 0, 0)
}

/**
 * Formata valor monetário conforme a moeda configurada
 *
 * @param {number} valor - Valor a ser formatado
 * @param {string} moeda - Código da moeda (BRL, USD, EUR)
 * @returns {string} Valor formatado
 */
export function formatarMoedaPDF(valor, moeda = 'BRL') {
  const simbolos = {
    BRL: 'R$',
    USD: '$',
    EUR: '€',
  }

  const simbolo = simbolos[moeda] || 'R$'
  return `${simbolo} ${(valor || 0).toFixed(2)}`
}

/**
 * Formata data para exibição no PDF
 *
 * @param {string|Date} data - Data a ser formatada
 * @param {string} locale - Locale para formatação (padrão: pt-BR)
 * @returns {string} Data formatada
 */
export function formatarDataPDF(data, locale = 'pt-BR') {
  if (!data) return ''

  const dataObj = typeof data === 'string' ? new Date(data) : data
  return dataObj.toLocaleDateString(locale)
}

/**
 * Gera PDF do Orçamento
 *
 * @param {Object} orcamento - Dados do orçamento
 * @param {Object} config - Configurações da empresa
 * @returns {jsPDF} Instância do documento PDF gerado
 */
export async function gerarOrcamentoPDF(orcamento, config) {
  const doc = new jsPDF()

  // Tentar adicionar fontes Montserrat ao documento
  const fontLoaded = addMontserratFont(doc)

  // Se falhar, usar Helvetica como fallback
  if (!fontLoaded) {
    FONT_FAMILY = 'helvetica'
  }

  const pageWidth = doc.internal.pageSize.width

  // Adicionar cabeçalho
  adicionarCabecalhoPDF(doc, config, {
    title: 'ORÇAMENTO',
  })

  // Informações do Orçamento
  let currentY = PDF_CONFIG.headerHeight + 10

  doc.setFontSize(9)
  doc.setFont(FONT_FAMILY, 'normal')

  // Linha 1: Número (esquerda) e Data (direita alinhada)
  doc.text(`Número: ${orcamento.NumeroOrcamento}`, PDF_CONFIG.margin.left, currentY)
  doc.text(
    `Data de Emissão: ${formatarDataPDF(orcamento.DataEmissao)}`,
    pageWidth - PDF_CONFIG.margin.right,
    currentY,
    { align: 'right' },
  )
  currentY += 5

  // Linha 2: Status (esquerda) e Validade (direita alinhada)
  doc.text(`Status: ${orcamento.Status}`, PDF_CONFIG.margin.left, currentY)
  doc.text(
    `Validade: ${formatarDataPDF(orcamento.Validade)}`,
    pageWidth - PDF_CONFIG.margin.right,
    currentY,
    { align: 'right' },
  )
  currentY += 10

  // Dados do Cliente e Imóvel (lado a lado)
  const clienteStartY = currentY

  // CLIENTE (lado esquerdo)
  doc.setFontSize(9)
  doc.setFont(FONT_FAMILY, 'bold')
  doc.text('CLIENTE', PDF_CONFIG.margin.left, currentY)
  currentY += 6

  doc.setFontSize(9)
  doc.setFont(FONT_FAMILY, 'normal')

  let clienteEndY = currentY
  if (orcamento.Cliente) {
    const cliente = orcamento.Cliente
    doc.text(`Nome: ${cliente.Nome} ${cliente.Sobrenome}`, PDF_CONFIG.margin.left, currentY)
    currentY += 5
    doc.text(`Email: ${cliente.Email}`, PDF_CONFIG.margin.left, currentY)
    currentY += 5
    if (cliente.Telefone || cliente.Celular) {
      doc.text(`Telefone: ${cliente.Celular || cliente.Telefone}`, PDF_CONFIG.margin.left, currentY)
      currentY += 5
    }
    clienteEndY = currentY
  }

  // IMÓVEL (lado direito alinhado, mesma linha inicial)
  if (orcamento.Imovel) {
    let imovelY = clienteStartY

    doc.setFontSize(9)
    doc.setFont(FONT_FAMILY, 'bold')
    doc.text('IMÓVEL', pageWidth - PDF_CONFIG.margin.right, imovelY, { align: 'right' })
    imovelY += 6

    doc.setFontSize(9)
    doc.setFont(FONT_FAMILY, 'normal')

    const imovel = orcamento.Imovel
    if (imovel.Endereco) {
      const end = imovel.Endereco
      const enderecoCompleto = `${end.Logradouro}, ${end.Numero}${end.Complemento ? ' - ' + end.Complemento : ''}`
      const enderecoCidade = `${end.Bairro}, ${end.Cidade} - ${end.Estado}`
      doc.text(`End: ${enderecoCompleto}`, pageWidth - PDF_CONFIG.margin.right, imovelY, {
        align: 'right',
      })
      imovelY += 5
      doc.text(enderecoCidade, pageWidth - PDF_CONFIG.margin.right, imovelY, { align: 'right' })
      imovelY += 5
    }

    if (imovel.NumeroQuartos || imovel.NumeroBanheiros || imovel.AreaTotal) {
      const detalhes = `${imovel.NumeroQuartos || 0} quartos • ${imovel.NumeroBanheiros || 0} banheiros`
      doc.text(detalhes, pageWidth - PDF_CONFIG.margin.right, imovelY, { align: 'right' })
      imovelY += 5
      doc.text(`Área: ${imovel.AreaTotal || 0}m²`, pageWidth - PDF_CONFIG.margin.right, imovelY, {
        align: 'right',
      })
      imovelY += 5
    }

    // Ajustar currentY para o maior valor entre cliente e imóvel
    currentY = Math.max(clienteEndY, imovelY)
  }

  currentY += 5

  // Tabela de Itens - suporta tanto Itens quanto ItensOrcamento
  const itensArray = orcamento.Itens || orcamento.ItensOrcamento || []

  console.log('Orçamento completo:', orcamento)
  console.log('Itens encontrados:', itensArray)
  console.log('Quantidade de itens:', itensArray.length)

  const items = itensArray.map((item) => {
    console.log('Item individual:', item)
    return [
      item.Numero || '',
      item.Descricao || '',
      item.Quantidade || 0,
      item.Unidade || 'UN',
      formatarMoedaPDF(item.Custo, config.moeda),
      formatarMoedaPDF((item.Quantidade || 0) * (item.Custo || 0), config.moeda),
    ]
  })

  console.log('Items array final:', items)
  console.log('Quantidade de itens processados:', items.length)

  // Usar autoTable diretamente (sintaxe para jspdf-autotable)
  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Descrição', 'Qtd', 'Un', 'Preço Unit.', 'Total']],
    body: items,

    // ✅ CONFIGURAÇÃO PARA ITENS INDIVISÍVEIS E MELHOR USO DO ESPAÇO
    rowPageBreak: 'avoid', // Linha não quebra entre páginas
    pageBreak: 'auto', // Quebra automática quando necessário
    showHead: 'everyPage', // Cabeçalho em todas as páginas
    tableWidth: 'auto', // Largura automática da tabela

    // Estilos
    theme: 'striped',
    headStyles: {
      fillColor: [70, 70, 70], // Cinza escuro
      textColor: 255, // Branco
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center',
      minCellHeight: 8, // Altura mínima reduzida
    },
    styles: {
      fontSize: 8, // Reduzido de 9 para 8
      cellPadding: 2, // Reduzido de 3 para 2
      overflow: 'linebreak',
      cellWidth: 'wrap',
      minCellHeight: 6, // Altura mínima das células
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' }, // # (número) - mais compacto
      1: { cellWidth: 85 }, // Descrição (maior)
      2: { cellWidth: 15, halign: 'center' }, // Qtd - mais compacto
      3: { cellWidth: 15, halign: 'center' }, // Un - mais compacto
      4: { cellWidth: 25, halign: 'right' }, // Preço Unit. - mais compacto
      5: { cellWidth: 25, halign: 'right' }, // Total - mais compacto
    },

    // Margens otimizadas
    margin: {
      top: PDF_CONFIG.margin.top,
      bottom: PDF_CONFIG.margin.bottom + 35, // Espaço extra para totais
      left: PDF_CONFIG.margin.left,
      right: PDF_CONFIG.margin.right,
    },

    // Callback para adicionar cabeçalho/rodapé em cada página
    didDrawPage: function (data) {
      adicionarCabecalhoPDF(doc, config, { title: 'ORÇAMENTO' })
      const totalPages = doc.internal.getNumberOfPages()
      adicionarRodapePDF(doc, config, data.pageNumber, totalPages)
    },
  })

  // Totais
  const finalY = doc.lastAutoTable.finalY + 10
  const pageHeight = doc.internal.pageSize.height

  // Verificar se há espaço para totais
  if (finalY + 50 > pageHeight - PDF_CONFIG.margin.bottom) {
    doc.addPage()
    adicionarCabecalhoPDF(doc, config, { title: 'ORÇAMENTO' })
    currentY = PDF_CONFIG.margin.top + 10
  } else {
    currentY = finalY
  }

  // Subtotal
  const subtotal = (orcamento.ItensOrcamento || []).reduce(
    (total, item) => total + (item.Quantidade || 0) * (item.Custo || 0),
    0,
  )

  doc.setFontSize(11)
  doc.setFont(FONT_FAMILY, 'normal')
  doc.text(
    `Subtotal: ${formatarMoedaPDF(subtotal, config.moeda)}`,
    pageWidth - PDF_CONFIG.margin.right,
    currentY,
    { align: 'right' },
  )
  currentY += 6

  // Desconto (se houver)
  if (orcamento.Desconto && orcamento.Desconto > 0) {
    doc.text(
      `Desconto: ${formatarMoedaPDF(orcamento.Desconto, config.moeda)}`,
      pageWidth - PDF_CONFIG.margin.right,
      currentY,
      { align: 'right' },
    )
    currentY += 6
  }

  // Total
  doc.setFontSize(14)
  doc.setFont(FONT_FAMILY, 'bold')
  doc.text(
    `TOTAL: ${formatarMoedaPDF(orcamento.ValorTotal, config.moeda)}`,
    pageWidth - PDF_CONFIG.margin.right,
    currentY,
    { align: 'right' },
  )
  currentY += 10

  // Observações (se houver)
  if (orcamento.Observacoes) {
    currentY += 5

    // Verificar se há espaço para observações
    if (currentY + 30 > pageHeight - PDF_CONFIG.margin.bottom) {
      doc.addPage()
      adicionarCabecalhoPDF(doc, config, { title: 'ORÇAMENTO' })
      currentY = PDF_CONFIG.margin.top + 10
    }

    doc.setFontSize(10)
    doc.setFont(FONT_FAMILY, 'bold')
    doc.text('Observações:', PDF_CONFIG.margin.left, currentY)
    currentY += 5

    doc.setFontSize(9)
    doc.setFont(FONT_FAMILY, 'normal')
    const splitObs = doc.splitTextToSize(
      orcamento.Observacoes,
      pageWidth - PDF_CONFIG.margin.left - PDF_CONFIG.margin.right,
    )
    doc.text(splitObs, PDF_CONFIG.margin.left, currentY)
  }

  // Adicionar rodapé na última página
  const totalPages = doc.internal.getNumberOfPages()
  adicionarRodapePDF(doc, config, totalPages, totalPages)

  return doc
}

/**
 * Faz download do PDF do orçamento
 *
 * @param {Object} orcamento - Dados do orçamento
 * @param {Object} config - Configurações da empresa
 */
export async function downloadOrcamentoPDF(orcamento, config) {
  try {
    const doc = await gerarOrcamentoPDF(orcamento, config)
    doc.save(`Orcamento_${orcamento.NumeroOrcamento}.pdf`)
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    throw error
  }
}

/**
 * Gera Blob do PDF para envio por email
 *
 * @param {Object} orcamento - Dados do orçamento
 * @param {Object} config - Configurações da empresa
 * @returns {Promise<Blob>} Blob do PDF gerado
 */
export async function gerarOrcamentoPDFBlob(orcamento, config) {
  try {
    const doc = await gerarOrcamentoPDF(orcamento, config)
    return doc.output('blob')
  } catch (error) {
    console.error('Erro ao gerar blob PDF:', error)
    throw error
  }
}

/**
 * Converte Blob para Base64 (útil para anexos de email)
 *
 * @param {Blob} blob - Blob a ser convertido
 * @returns {Promise<string>} String base64
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
