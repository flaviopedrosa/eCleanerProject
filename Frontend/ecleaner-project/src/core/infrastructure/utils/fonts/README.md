# Adicionando Fonte Montserrat ao jsPDF

Este guia explica como adicionar a fonte **Montserrat** (usada no app) aos PDFs gerados pelo sistema.

## 📋 Status Atual

Atualmente, os PDFs usam **Helvetica** (fonte padrão do jsPDF), que é visualmente similar à Montserrat, mas não é exatamente a mesma.

## 🎯 Objetivo

Usar a mesma fonte **Montserrat** que o aplicativo web usa, garantindo consistência visual entre a interface e os documentos PDF.

## 📝 Passo a Passo

### 1. Baixar as Fontes TTF

Baixe os arquivos TTF do repositório oficial do Montserrat:

- **Montserrat Regular**: https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-Regular.ttf
- **Montserrat Bold**: https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-Bold.ttf

Opcional (para itálico):

- **Montserrat Italic**: https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-Italic.ttf
- **Montserrat Bold Italic**: https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-BoldItalic.ttf

### 2. Converter TTF para Formato jsPDF

Acesse o conversor online:
**https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html**

Para cada arquivo TTF:

1. Clique em "Choose File" e selecione o arquivo TTF
2. Clique em "Create"
3. Copie o código JavaScript gerado (uma string base64 longa)

### 3. Adicionar ao Projeto

Edite o arquivo `montserratFont.js` nesta pasta e substitua o conteúdo:

```javascript
/**
 * Montserrat Font for jsPDF
 * Convertido de TTF usando: https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
 */

// Cole aqui a string base64 gerada para Montserrat-Regular.ttf
const MontserratRegular = 'AAEAAAA....' // String base64 MUITO longa

// Cole aqui a string base64 gerada para Montserrat-Bold.ttf
const MontserratBold = 'AAEAAAA....' // String base64 MUITO longa

/**
 * Registra a fonte Montserrat no documento jsPDF
 * @param {jsPDF} doc - Instância do jsPDF
 */
export function addMontserratFont(doc) {
  // Adicionar Montserrat Regular
  doc.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular)
  doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal')

  // Adicionar Montserrat Bold
  doc.addFileToVFS('Montserrat-Bold.ttf', MontserratBold)
  doc.addFont('Montserrat-Bold.ttf', 'Montserrat', 'bold')

  console.log('✅ Fontes Montserrat carregadas no PDF')
}
```

### 4. Ativar no pdfGenerator.js

No arquivo `pdfGenerator.js`, faça as seguintes alterações:

```javascript
// 1. Descomentar o import (linha ~22)
import { addMontserratFont } from './fonts/montserratFont'

// 2. Alterar a constante FONT_FAMILY (linha ~27)
const FONT_FAMILY = 'Montserrat' // Era: 'helvetica'

// 3. Na função gerarOrcamentoPDF, adicionar ANTES de qualquer setFont:
export function gerarOrcamentoPDF(orcamento) {
  const doc = new jsPDF()

  // Adicionar fontes Montserrat
  addMontserratFont(doc)

  // ... resto do código
}
```

### 5. Testar

1. Gere um PDF de orçamento
2. Abra o PDF
3. Verifique se a fonte está correta (comparar com o app web)

## ⚠️ Notas Importantes

### Tamanho do Arquivo

As fontes em base64 são grandes (~500KB cada). Isso aumentará o tamanho do bundle JavaScript. Alternativas:

1. **Lazy Loading**: Carregar as fontes apenas quando gerar PDF
2. **Fontes parciais**: Usar apenas os caracteres necessários (subset)
3. **WOFF2 to TTF**: Converter os WOFF2 do `@fontsource/montserrat` (requer ferramenta extra)

### Performance

A conversão de base64 para fonte acontece toda vez que um PDF é gerado. Para melhorar:

- Cache da fonte no navegador
- Pré-carregar as fontes na inicialização do app

## 🔧 Alternativa Rápida: Usar Fonte Similar

Se não quiser converter as fontes agora, pode usar uma fonte padrão similar:

```javascript
// Em pdfGenerator.js
const FONT_FAMILY = 'helvetica' // Mantenha como está

// Helvetica é muito similar à Montserrat em:
// - Largura dos caracteres
// - Altura das letras
// - Espaçamento
// - Legibilidade
```

## 📚 Recursos

- **Repositório Montserrat**: https://github.com/JulietaUla/Montserrat
- **Conversor jsPDF**: https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
- **Documentação jsPDF Fonts**: https://artskydj.github.io/jsPDF/docs/jsPDF.html#addFont
- **Google Fonts Montserrat**: https://fonts.google.com/specimen/Montserrat

## ✅ Checklist

- [ ] Baixar Montserrat-Regular.ttf
- [ ] Baixar Montserrat-Bold.ttf
- [ ] Converter Regular para base64
- [ ] Converter Bold para base64
- [ ] Atualizar montserratFont.js
- [ ] Descomentar import em pdfGenerator.js
- [ ] Alterar FONT_FAMILY para 'Montserrat'
- [ ] Adicionar addMontserratFont(doc) em gerarOrcamentoPDF
- [ ] Testar geração de PDF
- [ ] Verificar fonte no PDF gerado
