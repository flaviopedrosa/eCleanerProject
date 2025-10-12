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

### 2.4 Padrão de Cabeçalho de Página

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

### 4.1 Validações

- Regras consistentes
- Mensagens de erro traduzidas
- Feedback visual claro

```javascript
// Exemplo de regras
const rules = {
  required: (val) => !!val || this.$t('forms.validation.required'),
  email: (val) => isValidEmail(val) || this.$t('forms.validation.email'),
}
```

### 4.2 Layout

- Campos agrupados logicamente
- Responsivo usando grid system
- Feedback visual consistente
- Botões de ação padronizados

## 5. Padrões de Design

### 5.1 Cores

- Primária: Classes Quasar `bg-primary`, `text-primary`
- Secundária: Classes Quasar `bg-secondary`, `text-secondary`
- Feedback: success, warning, error padronizados

### 5.2 Componentes

- Botões: Quasar `q-btn`
- Campos: Quasar `q-input`, `q-select`
- Tabelas: Quasar `q-table`
- Diálogos: Quasar `q-dialog`

### 5.3 Espaçamento

- Margens e padding consistentes
- Uso das classes Quasar (`q-pa-md`, `q-mx-sm`, etc)

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

## 8. Boas Práticas

### 8.1 Código

- DRY (Don't Repeat Yourself)
- SOLID principles
- Nomes descritivos
- Comentários quando necessário
- Tratamento de erros consistente

### 8.2 Git

- Commits atômicos
- Mensagens descritivas
- Branch por feature
- Pull requests documentados

## 9. Documentação

### 9.1 Código

- JSDoc para classes e métodos públicos
- Tipos claramente definidos
- Exemplos de uso quando necessário

### 9.2 Arquitetura

- Diagramas atualizados
- Decisões documentadas
- Fluxos de processo
