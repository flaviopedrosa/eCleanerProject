# Protocolo de Contexto de Modelo (MCP) - eCleaner

## 1. Estrutura de Domínio

### 1.0 Padrões de Nomenclatura

- **Classes e Entidades**: PascalCase (ex: `Cliente`, `Pessoa`, `Endereco`)
- **Propriedades de Classes**: PascalCase (ex: `Nome`, `Sobrenome`, `Email`)
- **Métodos**: camelCase (ex: `adicionarEndereco`, `validarEmail`)
- **Variáveis locais**: camelCase (ex: `clienteRepository`, `novoEndereco`)
- **Constantes**: UPPERCASE com underscore (ex: `MAX_TENTATIVAS`, `STATUS_ATIVO`)
- **Arquivos**:
  - Classes/Entidades: PascalCase (ex: `Cliente.js`, `Pessoa.js`)
  - Componentes Vue: PascalCase + sufixo específico (ex: `ClienteListagemPage.vue`)
  - Utilitários: camelCase (ex: `formatHelper.js`, `validationRules.js`)
  - Configurações: kebab-case (ex: `quasar.config.js`, `eslint.config.js`)

Exemplos de uso:

```javascript
export class Cliente extends Pessoa {
  constructor(nome, sobrenome, email) {
    // Propriedades em PascalCase
    this.Nome = nome
    this.Sobrenome = sobrenome
    this.Email = email
    this.Enderecos = []
    this.Status = 'ATIVO'
  }

  // Métodos em camelCase
  adicionarEndereco(endereco) {
    this.Enderecos.push(endereco)
  }
}
```

### 1.1 Entidades Base

Todas as entidades de domínio devem seguir estas diretrizes:

- Localização: `/src/core/domain/entities/`
- Nomenclatura:
  - Nome da Classe: PascalCase (ex: `Cliente.js`, `Pessoa.js`)
  - Propriedades: PascalCase (ex: `Nome`, `Email`, `Enderecos`)
  - Métodos: camelCase (ex: `adicionarEndereco`, `validarEmail`)
- Documentação: JSDoc obrigatório para classe e métodos públicos
- Validações: Implementadas no construtor
- Identificadores: Usar GUID gerado automaticamente

### 1.2 Design Responsivo

Todas as páginas de listagem devem seguir este padrão para exibição responsiva:

- **Desktop (>600px)**: Usar tabela com todas as colunas

  ```vue
  <div class="gt-sm">
    <q-table :rows="items" :columns="columns" />
  </div>
  ```

- **Mobile (<600px)**: Usar cards com informações principais
  ```vue
  <div class="lt-md">
    <div class="row q-col-gutter-md">
      <div v-for="item in items" :key="item.id" class="col-12">
        <q-card flat bordered>
          <!-- Conteúdo do card -->
        </q-card>
      </div>
    </div>
  </div>
  ```

Classes de Breakpoint do Quasar:

- `gt-sm`: Exibe em telas maiores que 600px
- `lt-md`: Exibe em telas menores que 1024px
- Não usar classes customizadas como `desktop-only` ou `mobile-only`
- Evitar media queries customizadas para responsividade

### 1.3 Padrão de Campo de Busca em Listagens

Todas as páginas de listagem devem implementar um campo de busca seguindo este padrão consistente:

#### 1.3.1 Template - Campo de Busca

```vue
<template>
  <!-- Campo de Busca e Botão de Ação Principal -->
  <div class="row q-mb-lg items-center q-gutter-md">
    <div class="col-12 col-md-6">
      <q-input
        v-model="filtro"
        :placeholder="$t('pages.[modulo].searchPlaceholder')"
        filled
        clearable
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-space />
    <q-btn
      color="primary"
      icon="add"
      :label="$t('pages.[modulo].newButton')"
      @click="irParaNovo[Modulo]"
    />
  </div>

  <!-- Listagem Desktop -->
  <div class="gt-sm">
    <q-table
      :rows="[itens]Filtrados"
      :columns="columns"
      row-key="Id"
      flat
      bordered
      :loading="loading"
      :no-data-label="$t('pages.[modulo].noData')"
    >
      <!-- Templates customizados -->
    </q-table>
  </div>

  <!-- Listagem Mobile -->
  <div class="lt-md">
    <div class="row q-col-gutter-md">
      <div v-for="item in [itens]Filtrados" :key="item.Id" class="col-12">
        <q-card flat bordered>
          <!-- Conteúdo do card -->
        </q-card>
      </div>
      <div v-if="[itens]Filtrados.length === 0" class="col-12">
        <q-card flat bordered class="text-center q-pa-xl">
          <q-icon name="[icone-modulo]" size="4rem" color="grey-5" />
          <div class="text-h6 q-mt-md text-grey-6">
            {{ $t('pages.[modulo].noData') }}
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
```

#### 1.3.2 Script - Lógica de Busca

```javascript
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = use[Modulo]Store()

    // Estado do filtro
    const filtro = ref('')

    // Computed para dados ordenados
    const [itens]Sorted = computed(() => store.[Itens]Ordenados)
    const loading = computed(() => store.IsLoading)

    // Computed para filtrar itens
    const [itens]Filtrados = computed(() => {
      if (!filtro.value) {
        return [itens]Sorted.value
      }

      const filtroLowerCase = filtro.value.toLowerCase()
      return [itens]Sorted.value.filter(item =>
        item.Descricao.toLowerCase().includes(filtroLowerCase) ||
        item.[CampoSecundario].toLowerCase().includes(filtroLowerCase)
        // Adicione outros campos conforme necessário
      )
    })

    return {
      // Estado
      filtro,

      // Computed
      [itens]Filtrados,
      loading,

      // Métodos...
    }
  }
})
```

#### 1.3.3 Traduções Necessárias

```javascript
// /src/i18n/pt-BR/index.js e /src/i18n/en-US/index.js
export default {
  pages: {
    [modulo]: {
      searchPlaceholder: 'Buscar [item]...' / 'Search [item]...',
      newButton: 'Novo [Item]' / 'New [Item]',
      noData: 'Nenhum [item] encontrado' / 'No [items] found',
      // ... outras traduções
    },
  },
}
```

#### 1.3.4 Regras de Implementação

**Layout:**

- Campo de busca ocupa 50% da largura em desktop (`col-12 col-md-6`)
- `q-space` para empurrar botão para direita
- Botão de ação principal alinhado à direita
- Espaçamento inferior `q-mb-lg` antes da listagem

**Campo de Entrada:**

- Propriedades: `filled`, `clearable`, `dense`
- Ícone de busca no `prepend`
- Placeholder traduzido e específico do módulo
- Model vinculado a `filtro` (ref)

**Filtragem:**

- Busca case-insensitive usando `toLowerCase()`
- Múltiplos campos pesquisáveis (mínimo 2: campo principal + secundário)
- Retorna lista original quando filtro está vazio
- Usa computed property para reatividade

**Listagem:**

- Desktop: tabela com `[itens]Filtrados`
- Mobile: cards com `[itens]Filtrados`
- Estado vazio tratado com card centralizado e ícone
- Internacionalização para `noData`

**Exemplo de Implementação (Materiais):**

```vue
<!-- Campo específico para materiais -->
<q-input
  v-model="filtro"
  :placeholder="$t('pages.material.searchPlaceholder')"
  filled
  clearable
  dense
></q-input>
```

**Campos Pesquisáveis por Módulo:**

- **Materiais**: Descrição, Unidade
- **Clientes**: Nome, Sobrenome, Email
- **Colaboradores**: Nome, Sobrenome, Email
- **Serviços**: Nome, Descrição
- **Imóveis**: Endereço, Cidade, Proprietário

```javascript
/**
 * Descrição clara da entidade e seu propósito
 */
export class MinhaEntidade {
  /**
   * @param {string} nome - Nome da entidade
   * @param {string} descricao - Descrição da entidade
   */
  constructor(nome, descricao) {
    // Identificador em PascalCase
    this.Id = gerarGuid()

    // Propriedades em PascalCase
    this.Nome = nome
    this.Descricao = descricao
    this.DataCriacao = new Date()
    this.Status = 'ATIVO'

    // Validações necessárias
    if (!this.Nome) {
      throw new Error('Nome é obrigatório')
    }
  }

  // Métodos em camelCase
  atualizarDescricao(novaDescricao) {
    this.Descricao = novaDescricao
  }
}
```

### 1.2 Value Objects

- Localização: `/src/core/domain/value-objects/`
- Imutáveis após criação
- Validação no construtor
- Sem identidade própria

### 1.3 Enumerações

- Localização: `/src/core/domain/enums/`
- Nomenclatura: PascalCase
- Valores em UPPERCASE
- Documentação clara do propósito

```javascript
export const MinhaEnum = {
  VALOR_UM: 'VALOR_UM',
  VALOR_DOIS: 'VALOR_DOIS',
}
```

## 2. Interface do Usuário

### 2.1 Páginas

- Localização: `/src/pages/`
- Nomenclatura: PascalCase + Page.vue (ex: `ClienteListagemPage.vue`)
- Estrutura:

  ```vue
  <template>
    <q-page padding>
      <!-- Conteúdo -->
    </q-page>
  </template>

  <script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'NomeDaPagina',
    // ... resto do código
  })
  </script>

  <style lang="sass">
  // Estilos específicos da página
  </style>
  ```

### 2.2 Componentes

- Localização: `/src/components/`
- Nomenclatura: PascalCase
- Props documentadas
- Eventos definidos claramente

### 2.3 Layouts

- Localização: `/src/layouts/`
- Menu e navegação consistentes
- Responsivo para mobile e desktop

### 2.4 Padrão de Títulos de Seção

Todos os títulos de seção em formulários devem seguir este padrão consistente:

```vue
<!-- Para seções em cards -->
<div class="text-h6 text-primary q-mb-md">
  <q-icon name="relevant_icon" class="q-mr-sm" />
  {{ $t('forms.moduleName.sections.sectionName') }}
</div>

<!-- Para seções em expansion items -->
<q-item-label class="text-h6 text-primary">
  <q-icon name="relevant_icon" class="q-mr-sm" />
  {{ $t('forms.moduleName.sections.sectionName') }}
</q-item-label>

<!-- Para seções inline com botões de ação -->
<div class="text-h6 text-primary">
  <q-icon name="relevant_icon" class="q-mr-sm" />
  {{ $t('forms.moduleName.sections.sectionName') }}
</div>
```

**Regras de implementação:**

- **Classe base**: `text-h6` para tamanho consistente
- **Cor**: `text-primary` para destaque visual
- **Ícone**: Sempre incluir ícone relevante com `class="q-mr-sm"`
- **Espaçamento**: `q-mb-md` quando aplicável
- **Internacionalização**: Sempre usar `$t()` para traduções

**Ícones recomendados por contexto:**

- **Informações Básicas**: `info`
- **Cliente/Pessoa**: `person`
- **Pacotes/Produtos**: `inventory_2`
- **Itens/Lista**: `list_alt`
- **Financeiro/Cálculos**: `calculate`
- **Materiais**: `cleaning_services`
- **Serviços**: `room_service`
- **Endereços**: `place`
- **Configurações**: `settings`

### 2.5 Padrão de Cabeçalho de Página

Todas as páginas devem seguir este padrão consistente para o cabeçalho:

```vue
<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="[icone-da-pagina]" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('[chave-traducao].title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('[chave-traducao].subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Conteúdo da página -->
  </q-page>
</template>
```

**Componentes do padrão:**

1. **Ícone + Título**: Alinhados à esquerda na primeira linha
2. **Linha divisória**: 100% da largura usando `.accent-divider`
3. **Subtítulo**: Alinhado à direita abaixo da linha divisória

**Regras de implementação:**

- Ícone: Usar ícones relacionados ao contexto da página
- Título: Usar h4 com classe `text-h5` e cor `text-secondary`
- Linha divisória: Usar `.accent-divider` (altura de 2px, cor accent)
- Subtítulo: Texto smaller, cor `text-grey-7`, alinhado à direita
- Internacionalização: Sempre usar `$t()` para títulos e subtítulos
- Classes CSS: Manter consistência com `q-pa-lg`, `q-mb-xl`, etc.
- CSS Global: A classe `.accent-divider` está definida em `/src/css/app.sass`

**Exemplo de uso:**

```vue
<!-- Padrão para todas as páginas -->
<q-icon name="home" size="2rem" class="text-secondary q-mr-md" />
<h4 class="text-h5 q-ma-none text-secondary">
  {{ $t('indexPage.title') }}
</h4>
<!-- ... -->
<div class="accent-divider q-mb-md"></div>
<!-- ... -->
<p class="text-subtitle1 text-grey-7 q-ma-none">
  {{ $t('indexPage.overview') }}
</p>
```

## 3. Internacionalização (i18n)

### 3.1 Estrutura de Traduções

- Localização: `/src/i18n/[lang]/index.js`
- Organização por contexto:
  ```javascript
  export default {
    pages: {
      nomeModulo: {
        title: 'Título',
        buttons: {},
        messages: {},
        fields: {},
      },
    },
    menu: {},
    enums: {},
    forms: {
      validation: {},
      buttons: {},
      nomeFormulario: {
        title: '',
        sections: {},
        fields: {},
      },
    },
  }
  ```

## 4. Padrões de Formulário

### 4.1 Estrutura de Formulário Complexo

Formulários complexos devem seguir este padrão de estrutura:

#### 4.1.1 Cabeçalho com Navegação

```vue
<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon name="receipt_long" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditing ? $t('forms.orcamento.editTitle') : $t('forms.orcamento.createTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{
              isEditing ? $t('forms.orcamento.editSubtitle') : $t('forms.orcamento.createSubtitle')
            }}
          </p>
        </div>
      </div>
    </div>

    <q-form @submit="salvarFormulario" class="q-gutter-md">
      <!-- Seções do formulário -->
    </q-form>
  </q-page>
</template>
```

#### 4.1.2 Seções com Cards

Cada seção principal deve ser organizada em cards:

```vue
<!-- Seção Básica -->
<q-card flat bordered>
  <q-card-section>
    <div class="text-h6 text-primary q-mb-md">
      <q-icon name="info" class="q-mr-sm" />
      {{ $t('forms.moduleName.sections.basicInfo') }}
    </div>
    
    <div class="row q-col-gutter-md">
      <!-- Campos da seção -->
    </div>
  </q-card-section>
</q-card>
```

#### 4.1.3 Seções Expansíveis

Para seções opcionais ou secundárias:

```vue
<q-card flat bordered>
  <q-expansion-item v-model="secaoExpanded" expand-separator>
    <template v-slot:header>
      <q-item-section>
        <q-item-label class="text-h6 text-primary">
          <q-icon name="person" class="q-mr-sm" />
          {{ $t('forms.moduleName.sections.sectionName') }}
        </q-item-label>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <q-item-label v-if="!secaoExpanded && resumoSecao" caption>
            {{ resumoSecao }}
          </q-item-label>
        </transition>
      </q-item-section>
    </template>
    <q-card-section>
      <!-- Conteúdo da seção -->
    </q-card-section>
  </q-expansion-item>
</q-card>
```

#### 4.1.4 Cards de Informação Contextual

Para exibir informações relacionadas aos dados selecionados:

```vue
<!-- Informações do item selecionado -->
<div v-if="itemSelecionado" class="q-mt-md">
  <q-card flat bordered class="bg-grey-1">
    <q-card-section class="q-pa-md">
      <div class="text-subtitle2 text-primary q-mb-md">
        <q-icon name="info" class="q-mr-xs" />
        {{ $t('forms.moduleName.itemInfo.title') }}
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6 col-md-3">
          <div class="text-caption text-grey-7">{{ $t('forms.moduleName.itemInfo.field1') }}</div>
          <div class="text-body1 text-weight-medium">{{ itemSelecionado.campo1 }}</div>
        </div>
        <!-- Mais campos... -->
      </div>
    </q-card-section>
  </q-card>
</div>
```

#### 4.1.5 Listas Dinâmicas (Itens do Formulário)

Para seções com múltiplos itens editáveis:

```vue
<q-card flat bordered>
  <q-card-section>
    <div class="row items-center q-mb-md">
      <div class="text-h6 text-primary">
        <q-icon name="list_alt" class="q-mr-sm" />
        {{ $t('forms.moduleName.sections.items') }}
      </div>
      <q-space />
      <q-btn color="primary" icon="add" :label="$t('forms.moduleName.actions.addItem')"
        @click="adicionarItem" size="sm" />
    </div>

    <!-- Estado vazio -->
    <div v-if="form.Itens.length === 0" class="text-center text-grey-6 q-py-lg">
      <q-icon name="inventory_2" size="48px" class="q-mb-md" />
      <div class="text-body1">{{ $t('forms.moduleName.messages.noItems') }}</div>
      <div class="text-caption">{{ $t('forms.moduleName.messages.addItemsHint') }}</div>
    </div>

    <!-- Lista de itens -->
    <div v-for="(item, index) in form.Itens" :key="item.Id || index" class="q-mb-md">
      <q-card flat bordered class="bg-grey-1">
        <q-card-section class="q-pb-none">
          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">{{ $t('forms.moduleName.labels.item') }} {{ index + 1 }}</div>
            <q-space />
            <q-btn flat round color="negative" icon="delete" size="sm"
              @click="removerItem(index)" />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-md">
            <!-- Campos do item -->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</q-card>
```

#### 4.1.6 Resumo/Totais

Para seções de resumo financeiro ou totais:

```vue
<q-card flat bordered>
  <q-card-section>
    <div class="text-h6 text-primary q-mb-md">
      <q-icon name="calculate" class="q-mr-sm" />
      {{ $t('forms.moduleName.sections.summary') }}
    </div>
    
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-input :model-value="formatarMoeda(subtotal)" 
          :label="$t('forms.moduleName.fields.subtotal')"
          filled readonly bg-color="grey-1" />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model.number="form.Desconto" 
          :label="$t('forms.moduleName.fields.desconto')" 
          filled type="number" min="0" step="0.01" />
      </div>
      <div class="col-12 col-md-4">
        <q-input :model-value="formatarMoeda(form.Total)" 
          :label="$t('forms.moduleName.fields.total')"
          filled readonly bg-color="primary" class="text-white" />
      </div>
    </div>
  </q-card-section>
</q-card>
```

#### 4.1.7 Botões de Ação

Padrão consistente para botões de ação:

```vue
<!-- Botões de Ação -->
<div class="row q-gutter-md justify-end">
  <q-btn flat :label="$t('buttons.cancel')" @click="$router.go(-1)" />
  <q-btn color="primary" 
    :label="isEditing ? $t('buttons.update') : $t('buttons.save')" 
    type="submit" :loading="store.loading" />
</div>
```

### 4.2 Padrões de Campo

#### 4.2.1 Campos com Autocomplete/Filtro

```vue
<q-select
  v-model="form.Campo"
  :options="opcoesFiltradas"
  option-label="label"
  use-input
  :label="$t('forms.moduleName.fields.campo')"
  filled
  emit-value
  map-options
  option-value="value"
  @filter="filtrarOpcoes"
  input-debounce="300"
  clearable
  lazy-rules
  :rules="[(val) => val || $t('forms.validation.required')]"
>
  
  <template v-slot:no-option>
    <q-item>
      <q-item-section>{{ $t('forms.moduleName.noOptions') }}</q-item-section>
    </q-item>
  </template>
  
  <template v-slot:option="scope">
    <q-item v-bind="scope.itemProps">
      <q-item-section>
        <q-item-label>{{ scope.opt.label }}</q-item-label>
        <q-item-label caption>{{ scope.opt.subtitle }}</q-item-label>
      </q-item-section>
      <q-item-section side v-if="scope.opt.featured">
        <q-icon name="star" color="amber" />
      </q-item-section>
    </q-item>
  </template>
</q-select>
```

#### 4.2.2 Campos de Data

```vue
<q-input
  :model-value="dataFormatada"
  :label="$t('forms.moduleName.fields.data')"
  filled
  readonly
  lazy-rules
  :rules="[dateValidators.required, dateValidators.validDate]"
>
  <template v-slot:append>
    <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
        <q-date v-model="form.Data" mask="YYYY-MM-DD" :locale="currentLocale">
          <div class="row items-center justify-end">
            <q-btn v-close-popup :label="$t('buttons.close')" color="primary" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-icon>
  </template>
</q-input>
```

#### 4.2.3 Campos Monetários

```vue
<q-input
  v-model.number="form.Valor"
  :label="$t('forms.moduleName.fields.valor')"
  filled
  type="number"
  min="0"
  step="0.01"
  :prefix="'R$'"
  @update:model-value="calcularTotal"
/>
```

#### 4.2.4 Campos Somente Leitura (Calculados)

```vue
<q-input
  :model-value="formatarMoeda(valorCalculado)"
  :label="$t('forms.moduleName.fields.valorCalculado')"
  filled
  readonly
  bg-color="grey-2"
/>
```

### 4.3 Validações

- Usar `lazy-rules` para validação apenas no submit
- Mensagens de erro traduzidas
- Validadores reutilizáveis

```javascript
// Validadores padrão
const rules = {
  required: (val) => !!val || t('forms.validation.required'),
  email: (val) => isValidEmail(val) || t('forms.validation.email'),
  positiveNumber: (val) => val >= 0 || t('forms.validation.positiveNumber'),
}

// Validadores de data localizados
const dateValidators = createDateValidators(t)
```

### 4.4 Layout Responsivo

- Grid system: `col-12 col-md-6` para responsividade
- Campos `dense` em listas de itens para economia de espaço
- `filled` como padrão para todos os campos de entrada
- Espaçamento consistente: `q-gutter-md`, `q-mb-md`, `q-mt-md`

### 4.5 Estados Visuais

#### 4.5.1 Cores por Contexto

- **Títulos de Seção**: `text-primary`
- **Campos Calculados**: `bg-grey-1` ou `bg-grey-2`
- **Total/Resumo**: `bg-primary` com `text-white`
- **Informações Contextuais**: `bg-grey-1` ou `bg-blue-1`
- **Botões de Remoção**: `color="negative"`

#### 4.5.2 Estados de Loading

```vue
<q-btn :loading="store.loading" />
```

#### 4.5.3 Estados Vazios

```vue
<div class="text-center text-grey-6 q-py-lg">
  <q-icon name="relevant_icon" size="48px" class="q-mb-md" />
  <div class="text-body1">{{ $t('messages.noData') }}</div>
  <div class="text-caption">{{ $t('messages.actionHint') }}</div>
</div>
```

## 5. Padrões de Design

### 5.1 Cores e Estados Visuais

#### 5.1.1 Cores Principais

- **Primária**: `bg-primary`, `text-primary` - Para títulos de seção, botões principais, destaques
- **Secundária**: `bg-secondary`, `text-secondary` - Para títulos de página, elementos secundários
- **Feedback**: `success`, `warning`, `negative` - Para estados e notificações

#### 5.1.2 Cores Contextuais em Formulários

```vue
<!-- Títulos de seção -->
<div class="text-h6 text-primary">Título da Seção</div>

<!-- Campos readonly/calculados -->
<q-input bg-color="grey-1" readonly />
<q-input bg-color="grey-2" readonly />

<!-- Campos de total/destaque -->
<q-input bg-color="primary" class="text-white" readonly />

<!-- Cards informativos -->
<q-card class="bg-grey-1"></q-card>
```

#### 5.1.3 Hierarquia de Cores para Texto

```vue
<!-- Títulos principais -->
<h4 class="text-secondary">Título da Página</h4>

<!-- Títulos de seção -->
<div class="text-h6 text-primary">Título da Seção</div>

<!-- Subtítulos informativos -->
<div class="text-subtitle2 text-primary">Subtítulo</div>

<!-- Texto secundário -->
<p class="text-subtitle1 text-grey-7">Descrição</p>

<!-- Labels de campos -->
<div class="text-caption text-grey-7">Label do Campo</div>

<!-- Valores destacados -->
<div class="text-body1 text-weight-medium">Valor Importante</div>
<div class="text-body2 text-weight-bold text-green-7">Valor Positivo</div>
```

### 5.2 Componentes

- Botões: Quasar `q-btn`
- Campos: Quasar `q-input`, `q-select`
- Tabelas: Quasar `q-table`
- Diálogos: Quasar `q-dialog`

### 5.3 Espaçamento e Layout

#### 5.3.1 Espaçamento de Página

```vue
<!-- Página principal -->
<q-page class="q-pa-lg"></q-page>
```

#### 5.3.2 Espaçamento em Cards

```vue
<!-- Card padrão -->
<q-card flat bordered>
  <q-card-section>              <!-- Padding automático -->
    <div class="q-mb-md">        <!-- Margem inferior média -->
      <!-- Conteúdo -->
    </div>
  </q-card-section>
</q-card>

<!-- Card de item com espaçamento reduzido -->
<q-card-section class="q-pb-none"></q-card-section>
```

#### 5.3.3 Espaçamento em Grid

```vue
<!-- Grid com gutters -->
<div class="row q-col-gutter-md">     <!-- Espaçamento entre colunas -->
  <div class="col-12 col-md-6">
    <!-- Conteúdo -->
  </div>

<!-- Espaçamento vertical entre elementos -->
<div class="q-mb-md"></div>
```

#### 5.3.4 Espaçamento de Componentes

```vue
<!-- Entre ícone e texto -->
<q-icon name="info" class="q-mr-sm" />
<q-icon name="info" class="q-mr-xs" />
<!-- Espaçamento menor -->

<!-- Em botões -->
<div class="row q-gutter-md justify-end"></div>
```

#### 5.3.5 Classes de Espaçamento Padrão

**Tamanhos disponíveis:** `xs`, `sm`, `md`, `lg`, `xl`

**Aplicação:**

- **Páginas**: `q-pa-lg` (padding large)
- **Cards**: Padding automático do `q-card-section`
- **Entre seções**: `q-mb-xl` (margin-bottom extra large)
- **Entre elementos**: `q-mb-md`, `q-mt-md` (margin medium)
- **Entre componentes pequenos**: `q-mr-sm`, `q-mr-xs` (margin-right small/extra small)
- **Grid gaps**: `q-col-gutter-md` (gutter medium)
- **Formulários**: `q-gutter-md` (gap medium entre elementos do form)

## 6. Testes

### 6.1 Testes de Unidade

- Localização: `/tests/unit/`
- Framework: Vitest
- Nomenclatura: `[nome-arquivo].spec.js`
- Cobertura mínima requerida

```javascript
import { describe, it, expect } from 'vitest'

describe('MinhaClasse', () => {
  it('deve fazer algo específico', () => {
    // Arrange
    // Act
    // Assert
  })
})
```

### 6.2 Padrão de Testes

- Arrange-Act-Assert
- Descrições claras
- Testes de casos de erro
- Mocks quando necessário

## 7. Fluxo de Trabalho

### 7.1 Criando Nova Funcionalidade

1. Definir entidades de domínio
2. Implementar testes
3. Criar componentes UI
4. Adicionar traduções
5. Implementar validações
6. Testar responsividade

### 7.2 Modificando Funcionalidade Existente

1. Revisar testes existentes
2. Fazer alterações necessárias
3. Atualizar testes
4. Atualizar traduções
5. Validar mudanças

## 8. Internacionalização e Componentes de Data

### 8.1 Sistema de Internacionalização (i18n)

O sistema utiliza **vue-i18n** para suporte multilíngue:

```javascript
// Configuração em boot/i18n.js
const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages,
})
```

**Estrutura de Traduções:**

- `/src/i18n/pt-BR/index.js` - Português brasileiro
- `/src/i18n/en-US/index.js` - Inglês americano

### 8.2 Componentes QDate Localizados

Para garantir que os calendários QDate estejam alinhados com o idioma do sistema:

#### 8.2.1 Configuração Global do Quasar

```javascript
// quasar.config.js
framework: {
  config: {},
  lang: 'pt-BR', // Quasar language pack
}
```

#### 8.2.2 Configuração Dinâmica de Idioma

```vue
<template>
  <q-date v-model="form.data" mask="YYYY-MM-DD" :locale="currentLocale">
    <div class="row items-center justify-end">
      <q-btn v-close-popup :label="$t('buttons.close')" color="primary" flat />
    </div>
  </q-date>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, locale } = useI18n()

    // Computed property para localização dinâmica
    const currentLocale = computed(() => {
      const localeMap = {
        'pt-BR': {
          days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
        },
        'en-US': {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          monthsShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
      }
      return localeMap[locale.value] || localeMap['pt-BR']
    })

    return {
      currentLocale,
      // ... outros returns
    }
  },
}
</script>
```

#### 8.2.3 Formatação de Datas

```javascript
// Usando utilitário de formatação localizada
import { formatDateForLocale } from '@/core/utils/dateValidation'

const dataFormatada = computed(() => {
  return form.value.data ? formatDateForLocale(form.value.data, locale.value) : ''
})
```

#### 8.2.4 Validação de Datas Internacionalizada

```javascript
import { createDateValidators } from '@/core/utils/dateValidation'

export default {
  setup() {
    const { t } = useI18n()

    // Criar validadores localizados
    const dateValidators = createDateValidators(t)

    return {
      dateValidators,
    }
  },
}
```

### 8.3 Padrões de Implementação

**Ao implementar componentes de data:**

1. **Configure o idioma global** no `quasar.config.js`
2. **Use `:locale="currentLocale"`** nos componentes QDate
3. **Implemente formatação localizada** para exibição
4. **Mantenha valores ISO** (YYYY-MM-DD) internamente
5. **Adicione traduções** para botões e labels
6. **Teste em múltiplos idiomas**

**Exemplo de estrutura completa:**

```vue
<q-input :model-value="dataFormatada" readonly lazy-rules>
  <template v-slot:append>
    <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
        <q-date v-model="form.data" mask="YYYY-MM-DD" :locale="currentLocale">
          <div class="row items-center justify-end">
            <q-btn v-close-popup :label="$t('buttons.close')" color="primary" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-icon>
  </template>
</q-input>
```

## 9. Boas Práticas

### 9.1 Código

- DRY (Don't Repeat Yourself)
- SOLID principles
- Nomes descritivos
- Comentários quando necessário
- Tratamento de erros consistente

### 9.2 Git

- Commits atômicos
- Mensagens descritivas
- Branch por feature
- Pull requests documentados

## 10. Documentação

### 10.1 Código

- JSDoc para classes e métodos públicos
- Tipos claramente definidos
- Exemplos de uso quando necessário

### 10.2 Arquitetura

- Diagramas atualizados
- Decisões documentadas
- Fluxos de processo

## 11. Histórico de Implementações

### 11.1 Sistema de Validação de Datas Internacionalizada (Outubro 2025)

**Problema:** Validações de data não estavam localizadas e componentes de calendário em inglês.

**Solução Implementada:**

1. **Criação do utilitário `dateValidation.js`**:
   - Funções de validação localizadas
   - Formatação automática por idioma
   - Validadores reutilizáveis (`required`, `validDate`, `futureDate`)
   - 30 testes unitários com cobertura completa

2. **Configuração de idioma do Quasar**:

   ```javascript
   // quasar.config.js
   framework: {
     lang: 'pt-BR'
   }
   ```

3. **Implementação de QDate localizado**:
   - Mapeamento dinâmico de idiomas
   - Calendários em português brasileiro
   - Formatação de exibição localizada
   - Botões traduzidos

4. **Padrão lazy-rules implementado**:
   - Validação apenas ao salvar formulário
   - Melhor experiência do usuário
   - Performance otimizada

**Arquivos Modificados:**

- `src/core/utils/dateValidation.js` (novo)
- `tests/unit/utils/dateValidation.spec.js` (novo)
- `src/pages/OrcamentoCadastroPage.vue`
- `src/i18n/pt-BR/index.js`
- `src/i18n/en-US/index.js`
- `quasar.config.js`

**Resultados:**

- ✅ 36 testes passando (30 validação + 6 traduções)
- ✅ Interface completamente localizada
- ✅ Validações inteligentes e consistentes
- ✅ Calendários em português brasileiro

## 12. Envio de E-mails (EmailJS)

### 12.1 Configuração

- O campo `emailJsKey` deve ser preenchido na página de configurações gerais (`ConfiguracoesPage.vue`).
- A chave pública do EmailJS é persistida em `localStorage['ecleaner_config'].emailJsKey`.

### 12.2 Utilização

- Para enviar e-mails de qualquer parte do sistema, utilize o utilitário:

```javascript
import { sendEmail } from '@/core/infrastructure/utils/emailSender'

// Exemplo de uso:
await sendEmail({
  to: 'destinatario@dominio.com',
  subject: 'Assunto do e-mail',
  message: 'Conteúdo do e-mail',
  templateParams: { nome: 'Fulano', outroCampo: 'valor' },
})
```

- O utilitário lê automaticamente a chave do EmailJS das configurações.
- Configure `serviceId` e `templateId` em `emailSender.js` conforme sua conta EmailJS.
- Se a chave não estiver configurada, será lançada uma exceção.

### 12.3 Regras de Implementação

- Sempre utilize o utilitário `sendEmail` para envio de e-mails.
- O campo de configuração deve ser protegido por permissão de administrador.
- O envio de e-mails pode ser chamado por qualquer módulo do sistema.
- Mensagens de erro devem ser exibidas ao usuário em caso de falha no envio.

### 12.4 Exemplo de Configuração

```json
{
  "nomeEmpresa": "eCleaner",
  "emailEmpresa": "contato@ecleaner.com.br",
  "telefoneEmpresa": "(11) 99999-9999",
  "moeda": "BRL",
  "validadeOrcamentoDias": 30,
  "emailJsKey": "SUA_CHAVE_PUBLICA_EMAILJS"
}
```

### 12.5 Dependências

- Instale o pacote `emailjs-com`:

```bash
npm install emailjs-com
```

### 12.6 Testes

- Teste o envio de e-mails em ambiente de desenvolvimento e produção.
- Valide a configuração da chave antes de enviar.
- Utilize templates do EmailJS para personalização dos e-mails.

---

## 13. Sistema de Geração de PDF

O sistema eCleaner implementa um gerador de PDF centralizado e reutilizável para criação de documentos profissionais com layout padronizado. O sistema é baseado nas bibliotecas **jsPDF** e **jsPDF-AutoTable** e oferece templates padronizados para cabeçalho e rodapé.

### 13.1 Visão Geral e Arquitetura

#### Localização

- **Utilitário Principal**: `/src/core/infrastructure/utils/pdfGenerator.js`
- **Tipo**: Utility Module
- **Dependências**:
  - `jspdf` - Biblioteca principal para geração de PDF
  - `jspdf-autotable` - Plugin para criação de tabelas com paginação automática

#### Filosofia do Design

- **Reutilizável**: Funções exportadas podem ser usadas em qualquer parte do sistema
- **Configurável**: Templates personalizáveis através de configurações da empresa
- **Consistente**: Layout padronizado para todos os documentos
- **Profissional**: Design limpo e organizado com separação visual clara

#### Instalação das Dependências

```bash
npm install jspdf jspdf-autotable
```

### 13.2 Configuração de Layout (PDF_CONFIG)

O objeto `PDF_CONFIG` define as especificações de layout padrão para todos os documentos:

```javascript
const PDF_CONFIG = {
  margin: {
    top: 50, // Margem superior (reservada para cabeçalho)
    bottom: 35, // Margem inferior (reservada para rodapé)
    left: 15, // Margem esquerda
    right: 15, // Margem direita
  },
  headerHeight: 40, // Altura do cabeçalho
  footerHeight: 30, // Altura do rodapé
  logoSize: {
    width: 50, // Largura máxima do logo
    height: 20, // Altura máxima do logo
  },
}
```

### 13.2.1 Configuração de Fontes

O sistema utiliza a fonte **Montserrat** (mesma do aplicativo web) para manter consistência visual entre a interface e os documentos PDF.

#### Status Atual

**Fonte Ativa**: ✅ Montserrat

- Mesma fonte usada no app web (`app.sass`)
- Mantém identidade visual consistente
- Suporta Regular e Bold
- Convertida de TTF para base64 e incluída no projeto

#### Implementação

A fonte Montserrat é carregada automaticamente ao gerar PDFs:

```javascript
// pdfGenerator.js
import { addMontserratFont } from './montserratFont'

const FONT_FAMILY = 'Montserrat'

export async function gerarOrcamentoPDF(orcamento, config) {
  const doc = new jsPDF()

  // Fonte Montserrat carregada automaticamente
  addMontserratFont(doc)

  // Todos os setFont usam FONT_FAMILY = 'Montserrat'
  doc.setFont(FONT_FAMILY, 'normal')
  doc.setFont(FONT_FAMILY, 'bold')
  // ...
}
```

#### Arquivos Relacionados

- `/src/core/infrastructure/utils/montserratFont.js` - Fontes Montserrat em base64 (891KB)
- `/src/core/infrastructure/utils/fonts/README.md` - Documentação sobre conversão de fontes
- `/src/core/infrastructure/utils/fonts/montserrat-fonts.js` - Metadata das fontes
- `/src/core/infrastructure/utils/pdfGenerator.js` - Implementação do gerador de PDF

#### Pesos de Fonte Disponíveis

| Peso       | Uso              | Exemplo                                |
| ---------- | ---------------- | -------------------------------------- |
| **normal** | Texto regular    | Corpo do documento, descrições, dados  |
| **bold**   | Títulos e ênfase | Cabeçalhos de seção, totais, destaques |

### 13.3 Template de Cabeçalho Padronizado

A função `adicionarCabecalhoPDF` cria um cabeçalho consistente em todas as páginas do documento.

#### Estrutura do Cabeçalho

1. **Logo da Empresa** (canto superior esquerdo)
   - Tamanho: 50×20px
   - Suporta imagens em base64
   - Posicionamento automático

2. **Dados da Empresa** (ao lado do logo)
   - Nome da empresa (10pt, negrito)
   - E-mail (8pt)
   - Telefone (8pt)

3. **Título do Documento** (centralizado)
   - Fonte: 18pt, negrito
   - Exemplo: "ORÇAMENTO"

4. **Linha Separadora**
   - Cor: cinza (RGB: 200, 200, 200)
   - Espessura: 0.5pt

#### Exemplo de Uso

```javascript
import { adicionarCabecalhoPDF } from '@/core/infrastructure/utils/pdfGenerator'

// Configuração da empresa (vem do localStorage)
const config = {
  nomeEmpresa: 'eCleaner Serviços',
  emailEmpresa: 'contato@ecleaner.com.br',
  telefoneEmpresa: '(11) 99999-9999',
  logo: 'data:image/jpeg;base64,...', // Logo em base64
}

// Adicionar cabeçalho ao documento
const doc = new jsPDF()
adicionarCabecalhoPDF(doc, config, {
  title: 'ORÇAMENTO',
  subtitle: 'Orçamento #ORC20250121153045',
})
```

### 13.4 Template de Rodapé Padronizado

A função `adicionarRodapePDF` cria um rodapé consistente com informações de contato e paginação.

#### Estrutura do Rodapé

1. **Linha Separadora** (topo do rodapé)
   - Cor: cinza (RGB: 200, 200, 200)
   - Espessura: 0.5pt

2. **Endereço Completo** (centralizado)
   - Formato: "Rua, Número - Complemento - Bairro, Cidade - Estado - CEP"
   - Fonte: 8pt, cinza

3. **Informações de Contato** (centralizado)
   - Formato: "Telefone • E-mail"
   - Fonte: 8pt, cinza

4. **Número da Página** (alinhado à direita)
   - Formato: "Página X de Y"
   - Fonte: 8pt

#### Exemplo de Uso

```javascript
import { adicionarRodapePDF } from '@/core/infrastructure/utils/pdfGenerator'

// Adicionar rodapé em cada página
adicionarRodapePDF(doc, config, pageNumber, totalPages)
```

### 13.5 Funções Utilitárias

#### 13.5.1 formatarMoedaPDF(valor, moeda)

Formata valores monetários de acordo com o padrão da moeda.

```javascript
import { formatarMoedaPDF } from '@/core/infrastructure/utils/pdfGenerator'

formatarMoedaPDF(1234.56, 'BRL') // "R$ 1.234,56"
formatarMoedaPDF(1234.56, 'USD') // "$1,234.56"
formatarMoedaPDF(1234.56, 'EUR') // "€1.234,56"
```

**Moedas Suportadas**: BRL, USD, EUR

#### 13.5.2 formatarDataPDF(data, locale)

Formata datas de acordo com o locale especificado.

```javascript
import { formatarDataPDF } from '@/core/infrastructure/utils/pdfGenerator'

formatarDataPDF('2025-01-21', 'pt-BR') // "21/01/2025"
formatarDataPDF('2025-01-21', 'en-US') // "01/21/2025"
```

### 13.6 Padrão de Itens Indivisíveis

Um dos recursos mais importantes do sistema é garantir que **itens de orçamento não sejam quebrados entre páginas**. Isso é implementado através da configuração do AutoTable:

```javascript
doc.autoTable({
  startY: currentY,
  head: [columns.map((col) => col.title)],
  body: tableData,
  theme: 'striped',
  headStyles: {
    fillColor: [41, 128, 185],
    textColor: 255,
    fontSize: 10,
    fontStyle: 'bold',
    halign: 'center',
  },
  bodyStyles: {
    fontSize: 9,
    cellPadding: 3,
  },
  columnStyles: columnStyles,

  // ✅ CONFIGURAÇÕES CRÍTICAS PARA INDIVISIBILIDADE
  rowPageBreak: 'avoid', // Items NÃO serão divididos entre páginas
  pageBreak: 'auto', // Quebra automática quando necessário
  showHead: 'everyPage', // Cabeçalho da tabela em todas as páginas

  // Callback para adicionar cabeçalho/rodapé em cada página
  didDrawPage: (data) => {
    const pageNumber = doc.internal.getNumberOfPages()
    adicionarCabecalhoPDF(doc, config, { title: 'ORÇAMENTO' })
    adicionarRodapePDF(doc, config, pageNumber, doc.internal.getNumberOfPages())
  },
})
```

#### Por que isso é importante?

- **Legibilidade**: Um item de orçamento deve ser lido por completo
- **Profissionalismo**: Evita confusão na apresentação
- **Design Atômico**: Segue o princípio de que cada `ItemOrcamento` é uma unidade indivisível

### 13.7 Geração de PDF de Orçamento

A função principal `gerarOrcamentoPDF` cria um PDF completo com:

- Informações do orçamento (número, data, status, validade)
- Dados do cliente (nome, e-mail, telefone)
- Dados do imóvel (endereço, quartos, banheiros, área)
- Tabela de itens (indivisíveis)
- Resumo financeiro (subtotal, desconto, total)
- Observações (se houver)

#### Exemplo de Uso Completo

```javascript
import { downloadOrcamentoPDF } from '@/core/infrastructure/utils/pdfGenerator'

// Em um componente Vue
async function baixarPDF() {
  try {
    // Carregar configuração da empresa
    const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

    // Validar configuração
    if (!config.nomeEmpresa) {
      throw new Error('Configure os dados da empresa antes de gerar o PDF')
    }

    // Buscar orçamento completo
    const orcamento = await orcamentoStore.getById(orcamentoId)

    // Gerar e baixar PDF
    await downloadOrcamentoPDF(orcamento, config)

    // Feedback ao usuário
    $q.notify({
      type: 'positive',
      message: 'PDF gerado com sucesso!',
    })
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao gerar PDF. Verifique os dados e tente novamente.',
    })
  }
}
```

### 13.8 Estrutura de Colunas da Tabela

A tabela de itens possui 6 colunas otimizadas:

| Coluna      | Largura | Alinhamento | Descrição                    |
| ----------- | ------- | ----------- | ---------------------------- |
| #           | 15px    | Centro      | Número sequencial do item    |
| Descrição   | 70px    | Esquerda    | Descrição completa do item   |
| Qtd         | 20px    | Centro      | Quantidade                   |
| Un          | 20px    | Centro      | Unidade de medida            |
| Preço Unit. | 30px    | Direita     | Preço unitário formatado     |
| Total       | 35px    | Direita     | Total da linha (Qtd × Preço) |

### 13.9 Integração com E-mail (EmailJS)

O sistema também suporta geração de PDF como Blob para anexar em e-mails:

```javascript
import { gerarOrcamentoPDFBlob, blobToBase64 } from '@/core/infrastructure/utils/pdfGenerator'

// Gerar PDF como Blob
const pdfBlob = await gerarOrcamentoPDFBlob(orcamento, config)

// Converter para base64 (necessário para EmailJS)
const pdfBase64 = await blobToBase64(pdfBlob)

// Enviar por e-mail
await emailjs.send(
  'service_id',
  'template_id',
  {
    to_email: cliente.Email,
    from_name: config.nomeEmpresa,
    subject: `Orçamento ${orcamento.NumeroOrcamento}`,
    message: 'Segue em anexo o orçamento solicitado.',
    attachment: pdfBase64, // PDF em base64
    filename: `Orcamento_${orcamento.NumeroOrcamento}.pdf`,
  },
  config.emailJsKey,
)
```

### 13.10 Funções Exportadas

| Função                  | Parâmetros                              | Retorno           | Descrição                      |
| ----------------------- | --------------------------------------- | ----------------- | ------------------------------ |
| `adicionarCabecalhoPDF` | `(doc, config, options)`                | `void`            | Adiciona cabeçalho padronizado |
| `adicionarRodapePDF`    | `(doc, config, pageNumber, totalPages)` | `void`            | Adiciona rodapé padronizado    |
| `formatarMoedaPDF`      | `(valor, moeda)`                        | `string`          | Formata valores monetários     |
| `formatarDataPDF`       | `(data, locale)`                        | `string`          | Formata datas                  |
| `gerarOrcamentoPDF`     | `(orcamento, config)`                   | `jsPDF`           | Gera instância do PDF          |
| `downloadOrcamentoPDF`  | `(orcamento, config)`                   | `Promise<void>`   | Gera e baixa o PDF             |
| `gerarOrcamentoPDFBlob` | `(orcamento, config)`                   | `Promise<Blob>`   | Gera PDF como Blob             |
| `blobToBase64`          | `(blob)`                                | `Promise<string>` | Converte Blob para base64      |

### 13.11 Boas Práticas

#### 13.11.1 Sempre Valide a Configuração

```javascript
const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

if (!config.nomeEmpresa || !config.emailEmpresa) {
  $q.notify({
    type: 'warning',
    message: 'Configure os dados da empresa em Configurações antes de gerar o PDF.',
  })
  return
}
```

#### 13.11.2 Use Loading States

```javascript
const loadingPDF = ref(false)

async function baixarPDF() {
  try {
    loadingPDF.value = true
    await downloadOrcamentoPDF(orcamento, config)
  } catch (error) {
    // Tratamento de erro
  } finally {
    loadingPDF.value = false
  }
}
```

#### 13.11.3 Feedback ao Usuário

```javascript
// Sucesso
$q.notify({
  type: 'positive',
  message: 'PDF gerado com sucesso!',
  timeout: 3000,
  position: 'top-right',
})

// Erro
$q.notify({
  type: 'negative',
  message: 'Erro ao gerar PDF. Verifique os dados e tente novamente.',
  timeout: 5000,
  position: 'top-right',
})
```

#### 13.11.4 Sempre Teste com Dados Reais

- Teste com orçamentos de 1 item
- Teste com orçamentos de 50+ itens (múltiplas páginas)
- Teste com descrições muito longas
- Teste com e sem logo
- Teste com e sem observações
- Verifique paginação e indivisibilidade dos itens

### 13.12 Exemplo de Integração Completa

```vue
<template>
  <q-btn
    v-if="isEditing"
    color="secondary"
    :label="$t('buttons.downloadPDF')"
    icon="download"
    @click="baixarPDF"
    :loading="loadingPDF"
    :disable="!form.Id"
  />
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { downloadOrcamentoPDF } from '@/core/infrastructure/utils/pdfGenerator'

export default {
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const loadingPDF = ref(false)

    async function baixarPDF() {
      try {
        loadingPDF.value = true

        // Carregar configuração
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

        // Validar
        if (!config.nomeEmpresa) {
          $q.notify({
            type: 'warning',
            message: t('messages.pdfConfigMissing'),
          })
          return
        }

        // Buscar orçamento
        const orcamento = store.orcamentos.find((o) => o.Id === form.value.Id)
        if (!orcamento) {
          throw new Error('Orçamento não encontrado')
        }

        // Gerar e baixar
        await downloadOrcamentoPDF(orcamento, config)

        // Feedback
        $q.notify({
          type: 'positive',
          message: t('messages.pdfGenerateSuccess'),
        })
      } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        $q.notify({
          type: 'negative',
          message: t('messages.pdfGenerateError'),
        })
      } finally {
        loadingPDF.value = false
      }
    }

    return {
      loadingPDF,
      baixarPDF,
    }
  },
}
</script>
```

### 13.13 Tradução (i18n)

Adicione as seguintes chaves de tradução:

```javascript
// pt-BR/index.js
export default {
  buttons: {
    downloadPDF: 'Baixar PDF',
  },
  messages: {
    pdfGenerateSuccess: 'PDF gerado com sucesso!',
    pdfGenerateError: 'Erro ao gerar PDF. Verifique os dados e tente novamente.',
    pdfConfigMissing: 'Configure os dados da empresa em Configurações antes de gerar o PDF.',
  },
}
```

### 13.14 Troubleshooting

#### Problema: PDF não é gerado

**Solução**: Verifique se a configuração da empresa está completa no localStorage.

#### Problema: Logo não aparece

**Solução**: Certifique-se de que o logo está em formato base64 válido.

#### Problema: Itens são quebrados entre páginas

**Solução**: Verifique se `rowPageBreak: 'avoid'` está configurado no autoTable.

#### Problema: Texto muito longo ultrapassa margens

**Solução**: O autoTable faz wrapping automático. Se necessário, reduza o tamanho da fonte em `bodyStyles.fontSize`.

---
