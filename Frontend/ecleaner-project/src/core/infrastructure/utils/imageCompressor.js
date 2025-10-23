/**
 * Utilitário para compressão e validação de imagens
 */

const CONFIG = {
  MAX_WIDTH: 500,
  MAX_HEIGHT: 200,
  MAX_FILE_SIZE: 500000, // 500KB em bytes
  QUALITY: 0.8,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
}

/**
 * Valida se o arquivo de imagem está dentro dos limites
 * @param {File} file - Arquivo de imagem
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateImage(file) {
  if (!file) return { valid: false, error: 'Nenhum arquivo selecionado' }

  // Validar tipo
  if (!CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de arquivo inválido. Aceitos: ${CONFIG.ALLOWED_TYPES.join(', ')}`,
    }
  }

  // Validar tamanho
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    const sizeMB = (CONFIG.MAX_FILE_SIZE / 1024 / 1024).toFixed(1)
    return {
      valid: false,
      error: `Arquivo muito grande. Máximo: ${sizeMB}MB`,
    }
  }

  return { valid: true }
}

/**
 * Comprime uma imagem reduzindo dimensões e qualidade
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string>} Data URL base64 da imagem comprimida
 */
export async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calcular novas dimensões mantendo aspect ratio
        if (width > height) {
          if (width > CONFIG.MAX_WIDTH) {
            height = Math.round((height * CONFIG.MAX_WIDTH) / width)
            width = CONFIG.MAX_WIDTH
          }
        } else {
          if (height > CONFIG.MAX_HEIGHT) {
            width = Math.round((width * CONFIG.MAX_HEIGHT) / height)
            height = CONFIG.MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Converter para data URL com qualidade reduzida
        const dataUrl = canvas.toDataURL('image/jpeg', CONFIG.QUALITY)
        resolve(dataUrl)
      }
      img.onerror = () => reject(new Error('Erro ao carregar imagem'))
      img.src = e.target.result
    }

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
    reader.readAsDataURL(file)
  })
}

/**
 * Valida e comprime uma imagem em uma única operação
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<Object>} { success: boolean, data?: string, error?: string }
 */
export async function processImage(file) {
  try {
    // Validar arquivo
    const validation = validateImage(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Comprimir imagem
    const compressedData = await compressImage(file)
    return { success: true, data: compressedData }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
