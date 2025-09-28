<template>
    <q-page padding>
        <!-- Cabeçalho -->
        <div class="row items-center q-mb-md">
            <div class="col-12">
                <div class="text-h6">{{ isEdit ? $t('pages.equipeForm.titleEdit') : $t('pages.equipeForm.titleNew') }}
                </div>
            </div>
        </div>

        <!-- Formulário -->
        <q-form @submit="onSubmit" class="q-gutter-md">
            <!-- Descrição da Equipe -->
            <q-input v-model="form.descricao" :label="$t('pages.equipeForm.fields.descricao')"
                :rules="[val => !!val || $t('validations.required')]" outlined />

            <!-- Seleção de Líder -->
            <q-select v-model="form.lider" :options="colaboradoresDisponiveis"
                :label="$t('pages.equipeForm.fields.lider')" :rules="[val => !!val || $t('validations.required')]"
                option-label="nome" emit-value map-options outlined>
                <template v-slot:option="{ opt }">
                    <q-item v-bind="opt.props">
                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white">
                                {{ opt.nome[0] }}{{ opt.sobrenome[0] }}
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ opt.nome }} {{ opt.sobrenome }}</q-item-label>
                            <q-item-label caption>{{ opt.email }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>

                <template v-slot:selected>
                    <template v-if="form.lider">
                        <q-avatar color="primary" text-color="white" class="q-mr-sm">
                            {{ form.lider.nome[0] }}{{ form.lider.sobrenome[0] }}
                        </q-avatar>
                        {{ form.lider.nome }} {{ form.lider.sobrenome }}
                    </template>
                </template>
            </q-select>

            <!-- Seleção de Membros -->
            <q-select v-model="form.membros" :options="colaboradoresDisponiveis"
                :label="$t('pages.equipeForm.fields.membros')"
                :rules="[val => val.length > 0 || $t('validations.required')]" option-label="nome" multiple emit-value
                map-options use-chips outlined>
                <template v-slot:option="{ opt }">
                    <q-item v-bind="opt.props">
                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white">
                                {{ opt.nome[0] }}{{ opt.sobrenome[0] }}
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ opt.nome }} {{ opt.sobrenome }}</q-item-label>
                            <q-item-label caption>{{ opt.email }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>

                <template v-slot:selected-item="{ opt }">
                    <q-chip dense square class="q-ma-xs" color="primary" text-color="white" removable
                        @remove="removeColaborador(opt)">
                        <q-avatar color="white" text-color="primary">
                            {{ opt.nome[0] }}{{ opt.sobrenome[0] }}
                        </q-avatar>
                        {{ opt.nome }} {{ opt.sobrenome }}
                    </q-chip>
                </template>
            </q-select>

            <!-- Botões -->
            <div class="row justify-end q-gutter-sm">
                <q-btn :label="$t('pages.equipeForm.buttons.cancel')" color="negative" flat :to="'/equipes'" />
                <q-btn :label="$t('pages.equipeForm.buttons.save')" color="primary" type="submit" />
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import equipeRepository from '@/core/infrastructure/repositories/equipeRepository'
import colaboradorRepository from '@/core/infrastructure/repositories/colaboradorRepository'
import { Equipe } from '@/core/domain/entities/equipe'
import { ColaboradorEquipe } from '@/core/domain/value-objects/colaboradorEquipe'
import { FuncaoColaborador } from '@/core/domain/enums/funcaoColaborador'

export default defineComponent({
    name: 'EquipeCadastroPage',

    setup() {
        const router = useRouter()
        const route = useRoute()
        const { t } = useI18n()
        const $q = useQuasar()

        // Estado
        const form = ref({
            descricao: '',
            lider: null,
            membros: []
        })

        const colaboradores = ref([])
        const isEdit = computed(() => !!route.params.id)

        // Lista de colaboradores disponíveis para seleção
        const colaboradoresDisponiveis = computed(() => {
            return colaboradores.value.map(c => ({
                id: c.Id,
                nome: c.Nome,
                sobrenome: c.Sobrenome,
                email: c.Email
            }))
        })

        // Carrega os colaboradores
        const loadColaboradores = async () => {
            try {
                colaboradores.value = await colaboradorRepository.getAll()
            } catch (error) {
                console.error('Erro ao carregar colaboradores:', error)
                $q.notify({
                    type: 'negative',
                    message: t('pages.equipeForm.messages.loadColaboradoresError')
                })
            }
        }

        // Carrega os dados da equipe para edição
        const loadEquipe = async (id) => {
            try {
                const equipe = await equipeRepository.getById(id)
                if (equipe) {
                    const lider = equipe.Colaboradores.find(c => c.Funcao === FuncaoColaborador.LIDER)
                    const membros = equipe.Colaboradores.filter(c => c.Funcao !== FuncaoColaborador.LIDER)

                    form.value = {
                        descricao: equipe.Descricao,
                        lider: lider ? {
                            id: lider.Colaborador.Id,
                            nome: lider.Colaborador.Nome,
                            sobrenome: lider.Colaborador.Sobrenome,
                            email: lider.Colaborador.Email
                        } : null,
                        membros: membros.map(m => ({
                            id: m.Colaborador.Id,
                            nome: m.Colaborador.Nome,
                            sobrenome: m.Colaborador.Sobrenome,
                            email: m.Colaborador.Email
                        }))
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar equipe:', error)
                $q.notify({
                    type: 'negative',
                    message: t('pages.equipeForm.messages.loadError')
                })
                router.push('/equipes')
            }
        }

        // Remove um colaborador da lista de membros
        const removeColaborador = (colaborador) => {
            form.value.membros = form.value.membros.filter(m => m.id !== colaborador.id)
        }

        // Salva a equipe
        const onSubmit = async () => {
            try {
                const equipe = new Equipe()
                if (isEdit.value) {
                    equipe.Id = route.params.id
                }
                equipe.Descricao = form.value.descricao

                // Adiciona o líder
                if (form.value.lider) {
                    const liderOriginal = colaboradores.value.find(c => c.Id === form.value.lider.id)
                    equipe.adicionarColaborador(new ColaboradorEquipe(liderOriginal, FuncaoColaborador.LIDER))
                }

                // Adiciona os membros
                form.value.membros.forEach(membro => {
                    const colaborador = colaboradores.value.find(c => c.Id === membro.id)
                    equipe.adicionarColaborador(new ColaboradorEquipe(colaborador, FuncaoColaborador.EXECUTOR))
                })

                await equipeRepository.save(equipe)

                $q.notify({
                    type: 'positive',
                    message: t('pages.equipeForm.messages.saveSuccess')
                })

                router.push('/equipes')
            } catch (error) {
                console.error('Erro ao salvar equipe:', error)
                $q.notify({
                    type: 'negative',
                    message: t('pages.equipeForm.messages.saveError')
                })
            }
        }

        onMounted(async () => {
            await loadColaboradores()
            if (isEdit.value) {
                await loadEquipe(route.params.id)
            }
        })

        return {
            form,
            colaboradoresDisponiveis,
            removeColaborador,
            onSubmit,
            isEdit
        }
    }
})
</script>
