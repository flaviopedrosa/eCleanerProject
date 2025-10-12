<template>
    <q-card flat bordered class="q-mb-md">
        <q-card-section>
            <!-- Header com título e botão de remover -->
            <div class="row items-center">
                <div class="col">
                    <div class="text-h6 text-primary">
                        {{ index === 0 ? $t('components.colaboradorEquipeCard.firstMember') :
                            $t('components.colaboradorEquipeCard.memberNumber', { number: index + 1 }) }}
                    </div>
                </div>
                <div class="col-auto">
                    <!-- Só mostra botão de remover se não for o primeiro card -->
                    <q-btn v-if="index > 0" flat round dense icon="close" color="negative" size="sm"
                        @click="$emit('remove')" :title="$t('components.colaboradorEquipeCard.remove')" />
                </div>
            </div>
        </q-card-section>

        <q-card-section>
            <div class="row q-col-gutter-md">
                <!-- Seleção de Colaborador -->
                <div class="col-12 col-md-8">
                    <q-select v-model="localColaboradorEquipe.Colaborador" :options="colaboradoresDisponiveis"
                        :label="$t('components.colaboradorEquipeCard.fields.colaborador')"
                        :rules="[val => !!val || $t('forms.validation.required')]"
                        :option-label="opt => `${opt.Nome} ${opt.Sobrenome}`" option-value="Id" emit-value map-options
                        outlined @update:model-value="onColaboradorChange">
                        <template v-slot:option="{ itemProps, opt, toggleOption }">
                            <q-item v-bind="itemProps" @click="toggleOption(opt)">
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white">
                                        {{ opt.Nome[0] }}{{ opt.Sobrenome[0] }}
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ opt.Nome }} {{ opt.Sobrenome }}</q-item-label>
                                    <q-item-label caption>{{ opt.Email }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>

                        <template v-slot:selected>
                            <template v-if="selectedColaborador">
                                <q-avatar color="primary" text-color="white" class="q-mr-sm">
                                    {{ selectedColaborador.Nome[0] }}{{ selectedColaborador.Sobrenome[0] }}
                                </q-avatar>
                                {{ selectedColaborador.Nome }} {{ selectedColaborador.Sobrenome }}
                            </template>
                        </template>
                    </q-select>
                </div>

                <!-- Seleção de Funções (múltiplas) -->
                <div class="col-12 col-md-4">
                    <div class="text-subtitle2 q-mb-sm">{{ $t('components.colaboradorEquipeCard.fields.funcoes') }}
                    </div>
                    <q-option-group v-model="localColaboradorEquipe.Funcoes" :options="funcoesDisponiveis"
                        color="primary" type="checkbox" inline @update:model-value="onFuncaoChange" />
                    <div v-if="!localColaboradorEquipe.Funcoes || localColaboradorEquipe.Funcoes.length === 0"
                        class="text-negative text-caption q-mt-xs">
                        {{ $t('forms.validation.required') }}
                    </div>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ColaboradorEquipe } from '@/core/domain/value-objects/colaboradorEquipe'
import { FuncaoColaborador } from '@/core/domain/enums/funcaoColaborador'

export default defineComponent({
    name: 'ColaboradorEquipeCard',

    props: {
        modelValue: {
            type: ColaboradorEquipe,
            default: null
        },
        index: {
            type: Number,
            required: true
        },
        colaboradores: {
            type: Array,
            required: true
        },
        colaboradoresJaSelecionados: {
            type: Array,
            default: () => []
        }
    },

    emits: ['update:modelValue', 'remove'],

    setup(props, { emit }) {
        const { t } = useI18n()

        // Estado local
        const localColaboradorEquipe = ref({
            Colaborador: props.modelValue?.Colaborador?.Id || null,
            Funcoes: props.modelValue?.Funcoes || []
        })

        // Colaborador selecionado atualmente
        const selectedColaborador = computed(() => {
            if (!localColaboradorEquipe.value.Colaborador) return null
            return props.colaboradores.find(c => c.Id === localColaboradorEquipe.value.Colaborador)
        })

        // Lista de colaboradores disponíveis (excluindo os já selecionados)
        const colaboradoresDisponiveis = computed(() => {
            return props.colaboradores.filter(colaborador => {
                // Se é o colaborador atual, sempre incluir
                if (colaborador.Id === localColaboradorEquipe.value.Colaborador) {
                    return true
                }
                // Senão, só incluir se não estiver na lista de já selecionados
                return !props.colaboradoresJaSelecionados.includes(colaborador.Id)
            })
        })

        // Opções de função disponíveis
        const funcoesDisponiveis = computed(() => [
            { label: t('enums.funcaoColaborador.LIDER'), value: FuncaoColaborador.LIDER },
            { label: t('enums.funcaoColaborador.EXECUTOR'), value: FuncaoColaborador.EXECUTOR },
            { label: t('enums.funcaoColaborador.MOTORISTA'), value: FuncaoColaborador.MOTORISTA }
        ])

        // Emite alteração quando colaborador muda
        const onColaboradorChange = () => {
            emitChange()
        }

        // Emite alteração quando função muda
        const onFuncaoChange = () => {
            emitChange()
        }

        // Emite as mudanças para o componente pai
        const emitChange = () => {
            if (localColaboradorEquipe.value.Colaborador && localColaboradorEquipe.value.Funcoes && localColaboradorEquipe.value.Funcoes.length > 0) {
                const colaborador = props.colaboradores.find(c => c.Id === localColaboradorEquipe.value.Colaborador)
                if (colaborador) {
                    const colaboradorEquipe = new ColaboradorEquipe(colaborador, localColaboradorEquipe.value.Funcoes)
                    emit('update:modelValue', colaboradorEquipe)
                }
            } else {
                emit('update:modelValue', null)
            }
        }

        // Watchers para sincronizar com props
        watch(() => props.modelValue, (newValue) => {
            if (newValue) {
                localColaboradorEquipe.value = {
                    Colaborador: newValue.Colaborador?.Id || null,
                    Funcoes: newValue.Funcoes || []
                }
            } else {
                localColaboradorEquipe.value = {
                    Colaborador: null,
                    Funcoes: []
                }
            }
        }, { immediate: true })

        return {
            localColaboradorEquipe,
            selectedColaborador,
            colaboradoresDisponiveis,
            funcoesDisponiveis,
            onColaboradorChange,
            onFuncaoChange
        }
    }
})
</script>

<style lang="sass" scoped>
.q-card
  border-radius: 8px
  border: 1px solid $grey-4

  &:hover
    border-color: $primary
    transition: border-color 0.2s ease

// Estilos para checkboxes de função
:deep(.q-option-group)
  &.inline .q-checkbox
    margin-right: 12px
    margin-bottom: 4px

    .q-checkbox__label
      font-size: 14px
      color: $grey-8

    &:last-child
      margin-right: 0
</style>
