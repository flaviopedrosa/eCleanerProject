# Validações de Data Internacionalizadas

Este documento descreve como usar as validações de data que se adaptam automaticamente ao idioma selecionado pelo usuário.

## Recursos Implementados

### 1. Funções de Validação Base

```javascript
import {
  isValidDate,
  isFutureDate,
  isPastDate,
  isDateAfter,
  isDateBefore,
  formatDateForLocale,
} from '@/core/utils/dateValidation'

// Validar se uma data é válida
isValidDate('2023-12-25') // true
isValidDate('2023-13-01') // false (mês inválido)
isValidDate('2023-02-30') // false (dia inválido)

// Validar datas futuras/passadas
isFutureDate('2025-01-01') // true (se estivermos em 2024)
isPastDate('2022-01-01') // true (se estivermos em 2024)

// Comparar datas
isDateAfter('2023-12-25', '2023-12-24') // true
isDateBefore('2023-12-24', '2023-12-25') // true

// Formatar data de acordo com o locale
formatDateForLocale('2023-12-25', 'pt-BR') // '25/12/2023'
formatDateForLocale('2023-12-25', 'en-US') // '12/25/2023'
```

### 2. Validadores para Vue/Quasar

```javascript
import { createDateValidators } from '@/core/utils/dateValidation'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const dateValidators = createDateValidators(t)

    return {
      dateValidators,
      // ... outros retornos
    }
  },
})
```

### 3. Uso no Template

```vue
<template>
  <q-form>
    <!-- Data de emissão -->
    <q-input
      v-model="form.dataEmissao"
      type="date"
      :label="$t('forms.fields.dataEmissao')"
      :rules="[dateValidators.required, dateValidators.validDate]"
    />

    <!-- Data de validade (deve ser posterior à emissão) -->
    <q-input
      v-model="form.dataValidade"
      type="date"
      :label="$t('forms.fields.dataValidade')"
      :rules="[
        dateValidators.required,
        dateValidators.validDate,
        dateValidators.validityAfterEmission(form.dataEmissao),
      ]"
    />

    <!-- Data futura -->
    <q-input
      v-model="form.dataEvento"
      type="date"
      :label="$t('forms.fields.dataEvento')"
      :rules="[dateValidators.required, dateValidators.futureDate]"
    />
  </q-form>
</template>
```

## Mensagens de Erro Localizadas

### Português (pt-BR)

```javascript
validation: {
  invalidDate: 'Data inválida',
  dateRequired: 'Data é obrigatória',
  futureDate: 'A data deve ser futura',
  pastDate: 'A data deve ser no passado',
  dateAfter: 'A data deve ser posterior a {date}',
  dateBefore: 'A data deve ser anterior a {date}',
  validityAfterEmission: 'A data de validade deve ser posterior à data de emissão',
}
```

### Inglês (en-US)

```javascript
validation: {
  invalidDate: 'Invalid date',
  dateRequired: 'Date is required',
  futureDate: 'Date must be in the future',
  pastDate: 'Date must be in the past',
  dateAfter: 'Date must be after {date}',
  dateBefore: 'Date must be before {date}',
  validityAfterEmission: 'Validity date must be after emission date',
}
```

## Validadores Disponíveis

| Validador                             | Descrição                   | Exemplo de Uso                                           |
| ------------------------------------- | --------------------------- | -------------------------------------------------------- |
| `required`                            | Campo obrigatório           | `dateValidators.required`                                |
| `validDate`                           | Data no formato correto     | `dateValidators.validDate`                               |
| `futureDate`                          | Data deve ser futura        | `dateValidators.futureDate`                              |
| `pastDate`                            | Data deve ser passada       | `dateValidators.pastDate`                                |
| `dateAfter(referenceDate)`            | Data posterior à referência | `dateValidators.dateAfter('2023-01-01')`                 |
| `dateBefore(referenceDate)`           | Data anterior à referência  | `dateValidators.dateBefore('2023-12-31')`                |
| `validityAfterEmission(emissionDate)` | Validade após emissão       | `dateValidators.validityAfterEmission(form.dataEmissao)` |

## Validação de Períodos

```javascript
import { validateDateRange } from '@/core/utils/dateValidation'

const { t } = useI18n()
const validation = validateDateRange('2023-12-24', '2023-12-25', t)

if (validation.isValid) {
  console.log('Período válido')
} else {
  console.log('Erros:', validation.errors)
}
```

## Exemplo Completo

```vue
<template>
  <q-form @submit="salvar">
    <q-input
      v-model="form.dataInicio"
      type="date"
      :label="$t('forms.fields.dataInicio')"
      :rules="[dateValidators.required, dateValidators.validDate]"
    />

    <q-input
      v-model="form.dataFim"
      type="date"
      :label="$t('forms.fields.dataFim')"
      :rules="[
        dateValidators.required,
        dateValidators.validDate,
        dateValidators.dateAfter(form.dataInicio),
      ]"
    />

    <q-btn type="submit" :label="$t('buttons.save')" />
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { createDateValidators } from '@/core/utils/dateValidation'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const dateValidators = createDateValidators(t)

    const form = ref({
      dataInicio: '',
      dataFim: '',
    })

    function salvar() {
      // Lógica de salvar
    }

    return {
      form,
      dateValidators,
      salvar,
    }
  },
})
</script>
```

## Benefícios

1. **Internacionalização Automática**: As mensagens de erro se adaptam ao idioma selecionado
2. **Validação Robusta**: Detecta datas inválidas como 30 de fevereiro
3. **Formato Consistente**: Aceita apenas formato ISO (YYYY-MM-DD)
4. **Flexibilidade**: Validadores podem ser combinados conforme necessário
5. **Reutilização**: Funções podem ser usadas em qualquer componente Vue
6. **Testabilidade**: Todas as funções têm testes unitários completos

## Implementação no OrcamentoCadastroPage

O arquivo `OrcamentoCadastroPage.vue` já foi atualizado para usar essas validações:

- Data de emissão: obrigatória e válida
- Data de validade: obrigatória, válida e posterior à data de emissão

As validações se adaptam automaticamente ao idioma selecionado pelo usuário (português ou inglês).
