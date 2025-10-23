/**
 * Fontes Montserrat para jsPDF (ARQUIVO AUXILIAR/LEGACY)
 *
 * NOTA: Este arquivo não é usado atualmente.
 * As fontes Montserrat estão implementadas em montserratFont.js
 *
 * Este arquivo é mantido para referência e possíveis expansões futuras.
 *
 * Convertidas de Google Fonts usando: https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
 *
 * Para adicionar mais pesos ou estilos:
 * 1. Baixe o arquivo TTF do Google Fonts
 * 2. Converta usando o link acima
 * 3. Adicione em montserratFont.js
 */

/**
 * Adiciona as fontes Montserrat ao documento jsPDF (LEGACY)
 * @param {jsPDF} _doc - Instância do jsPDF (não usado)
 * @deprecated Use addMontserratFont de montserratFont.js
 */
// eslint-disable-next-line no-unused-vars
export function adicionarFontesMontserrat(_doc) {
  console.warn('Esta função é legacy. Use addMontserratFont() de montserratFont.js')
}

/**
 * Função auxiliar para carregar fonte do Google Fonts (LEGACY)
 * @param {string} _fontUrl - URL da fonte (não usado)
 * @returns {Promise<null>}
 * @deprecated Não usado - fontes estão em base64
 */
// eslint-disable-next-line no-unused-vars
export async function carregarFonteDoGoogle(_fontUrl) {
  console.warn('Esta função é legacy e não está implementada')
  return null
}
