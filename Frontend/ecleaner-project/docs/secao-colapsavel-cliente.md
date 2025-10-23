# Seção Colapsável do Cliente - OrcamentoCadastroPage

## Funcionalidade Implementada

### Descrição

Transformei a seção do cliente na página de cadastro de orçamento em uma seção colapsável que exibe informações resumidas quando fechada.

## Modificações Realizadas

### 1. Template (OrcamentoCadastroPage.vue)

```vue
<!-- Antes: Seção estática -->
<q-card flat bordered>
  <q-card-section>
    <div class="text-h6 q-mb-md">
      <q-icon name="person" class="q-mr-sm" />
      {{ $t('forms.orcamento.sections.client') }}
    </div>
    <!-- conteúdo da seção -->
  </q-card-section>
</q-card>

<!-- Depois: Seção colapsável -->
<q-card flat bordered>
  <q-expansion-item 
    v-model="clienteExpanded" 
    :label="$t('forms.orcamento.sections.client')" 
    icon="person"
    :caption="clienteResumo" 
    header-class="text-h6" 
    expand-separator
  >
    <q-card-section>
      <!-- conteúdo da seção -->
    </q-card-section>
  </q-expansion-item>
</q-card>
```

### 2. Script - Variáveis Reativas

```javascript
// Estado da expansão da seção de cliente
const clienteExpanded = ref(true) // Inicia expandida por padrão
```

### 3. Script - Computed Property para Resumo

````javascript
// Computed property para o resumo do cliente na barra colapsada
const clienteResumo = computed(() => {
  // Se a seção está expandida, não mostrar resumo
  if (clienteExpanded.value) {
    return ''
  }

  if (!form.value.Cliente) {
    return t('forms.orcamento.clientSummary.noClient')
  }

  const cliente = form.value.Cliente
  const nomeCliente = typeof cliente === 'object' ? cliente.label : clienteOptions.value.find(c => c.id === cliente)?.label || 'Cliente selecionado'

  if (!form.value.Imovel || !imovelSelecionado.value) {
    return \`\${nomeCliente} • \${t('forms.orcamento.clientSummary.noProperty')}\`
  }

  const imovel = imovelSelecionado.value
  const resumoImovel = \`\${imovel.quartos}Q \${imovel.banheiros}B • \${imovel.area}m²\`

  // Endereço resumido do imóvel
  const enderecoResumo = imovel.endereco ?
    imovel.endereco.length > 50 ?
      imovel.endereco.substring(0, 47) + '...' :
      imovel.endereco
    : t('forms.orcamento.clientSummary.noAddress')

  return \`\${nomeCliente} • \${resumoImovel} • \${enderecoResumo}\`
})
```### 4. Implementação de Transições

#### Template com Slot Personalizado
```vue
<q-expansion-item v-model="clienteExpanded" header-class="text-h6" expand-separator>
  <template v-slot:header>
    <q-item-section avatar>
      <q-icon name="person" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-h6">{{ $t('forms.orcamento.sections.client') }}</q-item-label>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
      >
        <q-item-label
          v-if="!clienteExpanded && clienteResumo"
          caption
          class="client-summary-transition"
          key="summary"
        >
          {{ clienteResumo }}
        </q-item-label>
      </transition>
    </q-item-section>
  </template>
</q-expansion-item>
```

#### Estilos CSS para Transições
```sass
@keyframes fadeIn
  from
    opacity: 0
    transform: translateY(-10px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes fadeOut
  from
    opacity: 1
    transform: translateY(0)
  to
    opacity: 0
    transform: translateY(-10px)

.animated
  animation-duration: 0.3s
  animation-fill-mode: both

.client-summary-transition
  transition: all 0.3s ease-in-out
```

### 5. Traduções Adicionadas

#### Português (pt-BR/index.js)

```javascript
clientSummary: {
  noClient: 'Nenhum cliente selecionado',
  noProperty: 'Nenhum imóvel selecionado',
  noAddress: 'Endereço não informado',
}
````

#### Inglês (en-US/index.js)

```javascript
clientSummary: {
  noClient: 'No client selected',
  noProperty: 'No property selected',
  noAddress: 'Address not provided',
}
```

## Comportamento da Funcionalidade

### Estados do Resumo

1. **Nenhum cliente selecionado:**
   - Exibe: "Nenhum cliente selecionado"

2. **Cliente selecionado, sem imóvel:**
   - Exibe: "João Silva • Nenhum imóvel selecionado"

3. **Cliente e imóvel selecionados:**
   - Exibe: "João Silva • 3Q 2B • 80m² • Rua das Flores, 123 - Centro, São Paulo - SP"
   - Formato: Nome do Cliente • NúmeroQuartos Q NúmeroBanheiros B • Área m² • Endereço
   - **Endereço truncado**: Se o endereço tiver mais de 50 caracteres, será truncado com "..."

4. **Cliente e imóvel sem endereço:**
   - Exibe: "João Silva • 3Q 2B • 80m² • Endereço não informado"

### 📋 **Comportamento do Resumo**

- **Seção expandida**: O cabeçalho mostra apenas "Cliente" sem informações adicionais
- **Seção fechada**: O resumo com as informações do cliente e imóvel aparece com transição suave
- **Atualização dinâmica**: O resumo se atualiza conforme cliente/imóvel são selecionados
- **Transições animadas**: Efeitos de fade in/out com movimento vertical suave (300ms)

### 🎨 **Efeitos de Transição**

- **Entrada**: fadeIn com movimento de baixo para cima (-10px → 0px)
- **Saída**: fadeOut com movimento de cima para baixo (0px → -10px)
- **Duração**: 300ms com easing ease-in-out
- **Modo**: out-in (saída completa antes da entrada)

### Características da Seção

- **Estado inicial**: Expandida (clienteExpanded = true)
- **Ícone**: person (pessoa)
- **Título**: "Cliente" (localizado)
- **Separador**: Habilitado para melhor visual
- **Classe CSS**: text-h6 para o cabeçalho

## Vantagens da Implementação

1. **Economia de espaço**: Quando fechada, a seção ocupa apenas uma linha
2. **Informações à vista**: Mesmo fechada, mostra os dados essenciais
3. **Experiência do usuário**: Permite foco em outras seções sem perder contexto
4. **Responsivo**: Funciona bem em diferentes tamanhos de tela
5. **Localização**: Suporte completo a português e inglês

## Uso

1. **Expandir/Colapsar**: Clique no cabeçalho da seção
2. **Visualizar resumo**: As informações aparecem automaticamente na legenda quando a seção está fechada
3. **Editar dados**: Expanda a seção para modificar cliente ou imóvel

## Compatibilidade

- ✅ Vue.js 3 Composition API
- ✅ Quasar Framework v2
- ✅ Sistema de tradução vue-i18n
- ✅ Repositórios de dados (ClienteRepository, ImovelRepository)
- ✅ Componentes reativos com watchers

## Conclusão

A funcionalidade foi implementada com sucesso, proporcionando uma interface mais limpa e organizada para o cadastro de orçamentos, mantendo as informações essenciais sempre visíveis mesmo quando a seção está colapsada.
