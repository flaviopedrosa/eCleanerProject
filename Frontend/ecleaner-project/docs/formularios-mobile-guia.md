# Guia de Formulários Mobile - ECleaner Project

## 📱 Visão Geral

Este documento detalha os padrões e melhores práticas para implementação de formulários mobile no projeto ECleaner, baseado na implementação do `ClienteCadastroPage.vue`.

## 🎯 Filosofia de Design

### Layout Responsivo Dual

O projeto implementa uma abordagem dual para maximizar a experiência do usuário:

- **Desktop (gt-sm)**: Cards separados com layout grid
- **Mobile/Tablet (lt-md)**: Carrossel com navegação step-by-step

## 🏗️ Estrutura Base

### 1. Container Principal

```vue
<template>
  <q-page class="q-pa-lg">
    <!-- Conteúdo do formulário -->
  </q-page>
</template>
```

### 2. Layout Responsivo

```vue
<!-- Layout Desktop: Cards separados -->
<div class="desktop-layout gt-sm">
  <!-- Cards individuais para cada seção -->
</div>

<!-- Layout Mobile/Tablet: Carrossel -->
<div class="mobile-layout lt-md">
  <!-- Carrossel com slides -->
</div>
```

### 3. CSS Responsivo

```sass
// Layout responsivo
.desktop-layout
  display: block

.mobile-layout
  display: none

@media (max-width: 1023px)
  .desktop-layout
    display: none

  .mobile-layout
    display: block
```

## 🎠 Implementação do Carrossel Mobile

### Estrutura do Carrossel

```vue
<q-card flat bordered>
  <!-- Indicador de Progresso -->
  <q-card-section class="q-pb-sm">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-h6 text-primary">
        {{ secoes[secaoAtual].titulo }}
      </div>
      <div class="text-caption text-grey-6">
        {{ secaoAtual + 1 }}/{{ secoes.length }}
      </div>
    </div>
    <q-linear-progress 
      :value="(secaoAtual + 1) / secoes.length" 
      color="primary" 
      size="4px" 
    />
  </q-card-section>

  <!-- Carrossel de Seções -->
  <q-carousel 
    v-model="secaoAtual" 
    transition-prev="slide-right" 
    transition-next="slide-left" 
    swipeable 
    animated
    control-color="primary" 
    height="auto" 
    class="rounded-borders"
  >
    <!-- Slides aqui -->
  </q-carousel>
</q-card>
```

### Configuração das Seções

```javascript
// Estado do carrossel mobile
const secaoAtual = ref(0)
const secoes = ref([
  { id: 0, titulo: t('forms.cliente.sections.personalData'), icone: 'person' },
  { id: 1, titulo: t('forms.cliente.sections.addresses'), icone: 'location_on' },
  { id: 2, titulo: t('forms.cliente.sections.properties'), icone: 'home' },
  { id: 3, titulo: t('forms.cliente.sections.observacoes'), icone: 'notes' },
])
```

## 📝 Padrões de Formulário

### 1. Estrutura de Slide

```vue
<q-carousel-slide :name="0" class="q-pa-none">
  <q-card-section>
    <!-- Cabeçalho da Seção -->
    <div class="text-h6 text-primary q-mb-md">
      <q-icon name="person" class="q-mr-sm" />
      {{ $t('forms.cliente.sections.personalData') }}
    </div>

    <!-- Campos do Formulário -->
    <div class="q-gutter-md">
      <!-- Campos aqui -->
    </div>
  </q-card-section>
</q-carousel-slide>
```

### 2. Campos com Validação

```vue
<q-input
  v-model="form.nome"
  :label="$t('forms.cliente.fields.nome') + ' *'"
  filled
  lazy-rules
  :rules="[(val) => !!val || $t('forms.validation.required')]"
/>
```

### 3. Campos Especiais

#### Upload de Foto Mobile

```vue
<!-- Foto do Cliente -->
<div class="text-center q-mb-lg foto-cliente-container">
  <div class="text-subtitle2 q-mb-sm">{{ $t('forms.cliente.fields.foto') }}</div>
  <q-avatar size="100px" class="q-mb-md">
    <img v-if="form.fotoPreview" :src="form.fotoPreview" alt="Foto do cliente" style="object-fit: cover;" />
    <q-icon v-else name="person" size="50px" color="grey-6" />
  </q-avatar>
  <div>
    <q-btn
      color="primary"
      icon="photo_camera"
      :label="form.fotoPreview ? 'Alterar Foto' : 'Adicionar Foto'"
      size="sm"
      outline
      @click="$refs.fotoInputMobile.pickFiles()"
      class="q-mb-xs"
    />
    <q-btn
      v-if="form.fotoPreview"
      color="negative"
      icon="delete"
      label="Remover"
      size="sm"
      flat
      @click="removerFoto"
      class="q-ml-sm"
    />
  </div>
</div>

<!-- Input de arquivo para mobile (escondido) -->
<q-file
  v-model="form.foto"
  accept="image/*"
  max-file-size="5242880"
  @update:model-value="onFotoSelecionada"
  style="display: none"
  ref="fotoInputMobile"
/>
```

#### Máscaras de Entrada

```vue
<!-- CEP com máscara -->
<q-input
  v-model="form.endereco.cep"
  :label="$t('forms.cliente.address.fields.cep') + ' *'"
  filled
  mask="#####-###"
  lazy-rules
  :rules="[(val) => !!val || $t('forms.validation.required')]"
  @blur="buscarEnderecoPorCep(form.endereco.cep, 'cliente')"
/>

<!-- Telefone com máscara -->
<q-input
  v-model="form.celular"
  :label="$t('forms.cliente.fields.celular') + ' *'"
  filled
  mask="(##) #####-####"
  lazy-rules
  :rules="[(val) => !!val || $t('forms.validation.required')]"
/>
```

## 🎮 Navegação do Carrossel

### Controles de Navegação

```vue
<!-- Navegação do Carrossel -->
<q-card-section class="q-pt-sm">
  <div class="row justify-between">
    <!-- Botão Anterior - oculto no primeiro slide -->
    <q-btn 
      v-show="secaoAtual > 0" 
      flat 
      :label="$t('forms.buttons.previous')" 
      color="primary"
      icon="chevron_left" 
      @click="voltarSecao" 
    />

    <!-- Espaçador quando botão anterior está oculto -->
    <div v-show="secaoAtual === 0"></div>

    <!-- Botão Próximo/Finalizar -->
    <q-btn 
      :label="secaoAtual === secoes.length - 1 ? $t('forms.buttons.finish') : $t('forms.buttons.next')"
      color="primary" 
      :icon-right="secaoAtual === secoes.length - 1 ? 'check' : 'chevron_right'"
      @click="proximaSecao" 
      :loading="loading"
      type="submit" 
    />
  </div>
</q-card-section>
```

### Funções de Navegação

```javascript
// Navegação entre seções
const proximaSecao = () => {
  // Validar seção atual antes de avançar
  const errors = validarSecaoAtual()

  if (errors.length > 0) {
    // Mostrar erros
    errors.forEach((error) => {
      $q.notify({
        type: 'negative',
        message: error,
        timeout: 3000,
        position: 'top-right',
      })
    })
    return
  }

  if (secaoAtual.value < secoes.value.length - 1) {
    secaoAtual.value++
  } else {
    // Última seção - submeter formulário
    onSubmit()
  }
}

const voltarSecao = () => {
  if (secaoAtual.value > 0) {
    secaoAtual.value--
  }
}
```

## ✅ Sistema de Validação

### Validação por Seção

```javascript
const validarSecaoAtual = () => {
  switch (secaoAtual.value) {
    case 0: // Dados Pessoais
      return validarDadosPessoais()
    case 1: // Endereços
      return validarEnderecos()
    case 2: // Imóveis
      return validarImoveis()
    case 3: // Observações
      return validarObservacoes()
    default:
      return []
  }
}
```

### Exemplo de Validação

```javascript
const validarDadosPessoais = () => {
  const errors = []

  if (!form.value.nome?.trim()) {
    errors.push(t('forms.cliente.fields.nome'))
  }

  if (!form.value.sobrenome?.trim()) {
    errors.push(t('forms.cliente.fields.sobrenome'))
  }

  if (!form.value.email?.trim()) {
    errors.push(t('forms.cliente.fields.email'))
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.value.email)) {
    errors.push(t('forms.cliente.fields.email') + ' (formato inválido)')
  }

  if (!form.value.celular?.trim()) {
    errors.push(t('forms.cliente.fields.celular'))
  }

  return errors
}
```

## 🎨 Estilos e UX

### CSS para Carrossel

```sass
// Carrossel customizado
.q-carousel
  border-radius: 8px
  overflow: hidden

.q-carousel-slide
  padding: 0 !important
```

### Estilos para Componentes Especiais

```sass
// Estilos para foto do cliente
.foto-cliente-container
  .q-avatar
    border: 2px solid var(--q-primary)
    transition: border-color 0.3s ease

    &:hover
      border-color: var(--q-secondary)

  .q-btn
    transition: all 0.3s ease

    &:hover
      transform: translateY(-1px)
```

## 🔧 Funcionalidades Avançadas

### 1. Compressão de Imagem

```javascript
const comprimirImagem = (file, maxWidth = 300, maxHeight = 300, quality = 0.7) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calcular dimensões mantendo proporção
      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height)

      // Converter para base64 comprimido
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedDataUrl)
    }

    img.src = URL.createObjectURL(file)
  })
}
```

### 2. Busca de CEP Automática

```javascript
async function buscarEnderecoPorCep(cep, tipo) {
  if (!cep || cep.length < 8) return

  // Remove caracteres não numéricos
  const cepLimpo = cep.replace(/\D/g, '')

  if (cepLimpo.length !== 8) return

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await response.json()

    if (data.erro) {
      $q.notify({
        type: 'negative',
        message: t('forms.validation.invalidCep'),
        timeout: 3000,
        position: 'top-right',
      })
      return
    }

    // Preenche os campos automaticamente
    if (tipo === 'cliente') {
      form.value.endereco.rua = data.logradouro || ''
      form.value.endereco.bairro = data.bairro || ''
      form.value.endereco.cidade = data.localidade || ''
      form.value.endereco.estado = data.uf || ''
    }

    $q.notify({
      type: 'positive',
      message: t('forms.validation.cepFound'),
      timeout: 2000,
      position: 'top-right',
    })
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    $q.notify({
      type: 'negative',
      message: t('forms.validation.cepError'),
      timeout: 3000,
      position: 'top-right',
    })
  }
}
```

## 📱 Diretrizes de UX Mobile

### 1. Tamanhos de Componentes

- **Avatares Mobile**: `100px` (vs `120px` desktop)
- **Ícones**: `50px` para avatares, `2rem` para cabeçalhos
- **Botões**: `size="sm"` para mobile

### 2. Espaçamento

- **Gutter**: `q-gutter-md` para campos
- **Padding**: `q-pa-none` nos slides, `q-pa-lg` na página
- **Margin**: `q-mb-md` para seções, `q-mb-lg` para elementos especiais

### 3. Feedback Visual

- **Progress Bar**: Mostra progresso atual no carrossel
- **Transições**: `slide-right`/`slide-left` para navegação
- **Loading States**: Botões com estado de carregamento
- **Notificações**: Toast messages para feedback

### 4. Acessibilidade

- **Labels Obrigatórios**: Indicados com `*`
- **Validação em Tempo Real**: `lazy-rules` para melhor performance
- **Navegação por Teclado**: Suporte nativo do Quasar
- **Screen Readers**: Semantic HTML e labels apropriados

## 🚀 Checklist de Implementação

### ✅ Estrutura Base

- [ ] Layout responsivo dual (desktop/mobile)
- [ ] Container `q-page` com padding apropriado
- [ ] Classes CSS para controle de visibilidade

### ✅ Carrossel Mobile

- [ ] Configuração do `q-carousel`
- [ ] Indicador de progresso
- [ ] Slides organizados por seção lógica
- [ ] Transições suaves

### ✅ Navegação

- [ ] Botões anterior/próximo
- [ ] Validação por seção
- [ ] Submissão no último slide
- [ ] Feedback visual de estado

### ✅ Campos de Formulário

- [ ] Validação apropriada
- [ ] Máscaras de entrada
- [ ] Labels traduzidos
- [ ] Estados de erro/sucesso

### ✅ Funcionalidades Especiais

- [ ] Upload de imagem com compressão
- [ ] Busca automática de CEP
- [ ] Campos dinâmicos (se necessário)
- [ ] Persistência de dados

### ✅ UX e Acessibilidade

- [ ] Tamanhos adequados para touch
- [ ] Feedback visual claro
- [ ] Estados de carregamento
- [ ] Notificações informativas

## 📚 Recursos Adicionais

### Documentação Quasar

- [QCarousel](https://quasar.dev/vue-components/carousel)
- [QForm](https://quasar.dev/vue-components/form)
- [QInput](https://quasar.dev/vue-components/input)
- [Responsive Design](https://quasar.dev/style/spacing#responsive)

### Padrões do Projeto

- [Estrutura de Entities](./domain-entities.md)
- [Padrão Repository](./repository-pattern.md)
- [Tradução i18n](./internationalization.md)

---

**Desenvolvido para ECleaner Project**  
_Guia baseado na implementação ClienteCadastroPage.vue_
