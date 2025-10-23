<template>
    <q-page class="q-pa-lg">
        <!-- Cabeçalho da Página -->
        <div class="row items-center q-mb-xl">
            <div class="col">
                <div class="row items-center q-mb-sm">
                    <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
                    <q-icon name="home" size="2rem" class="text-secondary q-mr-md" />
                    <h4 class="text-h5 q-ma-none text-secondary">
                        {{ $t('forms.imovel.title') }}
                    </h4>
                </div>
                <div class="accent-divider q-mb-md"></div>
                <div class="row justify-end">
                    <p class="text-subtitle1 text-grey-7 q-ma-none">
                        {{ $t('forms.imovel.subtitle') }}
                    </p>
                </div>
            </div>
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
            <!-- Dados do Imóvel -->
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary q-mb-md">
                        <q-icon name="home" class="q-mr-sm" />
                        {{ $t('forms.imovel.sections.propertyData') }}
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-3">
                            <q-input v-model.number="form.totalComodos"
                                :label="$t('forms.imovel.fields.totalComodos') + ' *'" filled type="number" min="1"
                                lazy-rules :rules="[
                                    val => !!val || $t('forms.validation.required'),
                                    val => val > 0 || $t('forms.validation.positiveNumber')
                                ]" />
                        </div>

                        <div class="col-12 col-md-3">
                            <q-input v-model.number="form.numeroQuartos"
                                :label="$t('forms.imovel.fields.numeroQuartos') + ' *'" filled type="number" min="0"
                                lazy-rules :rules="[
                                    val => val >= 0 || $t('forms.validation.nonNegativeNumber')
                                ]" />
                        </div>

                        <div class="col-12 col-md-3">
                            <q-input v-model.number="form.numeroBanheiros"
                                :label="$t('forms.imovel.fields.numeroBanheiros') + ' *'" filled type="number" min="0"
                                lazy-rules :rules="[
                                    val => val >= 0 || $t('forms.validation.nonNegativeNumber')
                                ]" />
                        </div>

                        <div class="col-12 col-md-3">
                            <q-input v-model.number="form.areaTotal" :label="$t('forms.imovel.fields.areaTotal') + ' *'"
                                filled type="number" min="1" step="0.01" suffix="m²" lazy-rules :rules="[
                                    val => !!val || $t('forms.validation.required'),
                                    val => val > 0 || $t('forms.validation.positiveNumber')
                                ]" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Proprietário -->
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary q-mb-md">
                        <q-icon name="person" class="q-mr-sm" />
                        {{ $t('forms.imovel.sections.owner') }}
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-select v-model="form.dono" :options="clientesOptions"
                                :label="$t('forms.imovel.fields.dono') + ' *'" filled emit-value map-options
                                option-value="value" option-label="label" lazy-rules
                                :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Endereço -->
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary q-mb-md">
                        <q-icon name="location_on" class="q-mr-sm" />
                        {{ $t('forms.imovel.sections.address') }}
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-8">
                            <q-input v-model="form.endereco.logradouro"
                                :label="$t('forms.endereco.fields.logradouro') + ' *'" filled lazy-rules
                                :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>

                        <div class="col-12 col-md-4">
                            <q-input v-model="form.endereco.numero" :label="$t('forms.endereco.fields.numero') + ' *'"
                                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>

                        <div class="col-12 col-md-4">
                            <q-input v-model="form.endereco.complemento"
                                :label="$t('forms.endereco.fields.complemento')" filled />
                        </div>

                        <div class="col-12 col-md-4">
                            <q-input v-model="form.endereco.bairro" :label="$t('forms.endereco.fields.bairro') + ' *'"
                                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>

                        <div class="col-12 col-md-4">
                            <q-input v-model="form.endereco.cidade" :label="$t('forms.endereco.fields.cidade') + ' *'"
                                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>

                        <div class="col-12 col-md-3">
                            <q-input v-model="form.endereco.estado" :label="$t('forms.endereco.fields.estado') + ' *'"
                                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>

                        <div class="col-12 col-md-3">
                            <q-input v-model="form.endereco.cep" :label="$t('forms.endereco.fields.cep') + ' *'" filled
                                mask="#####-###" lazy-rules :rules="[
                                    val => !!val || $t('forms.validation.required'),
                                    val => val.length === 9 || $t('forms.validation.cep')
                                ]" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="form.endereco.pais" :label="$t('forms.endereco.fields.pais') + ' *'"
                                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Observações -->
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary q-mb-md">
                        <q-icon name="notes" class="q-mr-sm" />
                        {{ $t('forms.imovel.sections.observations') }}
                    </div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12">
                            <q-input v-model="form.observacao" :label="$t('forms.imovel.fields.observacao')"
                                :placeholder="$t('forms.imovel.placeholders.observacao')" filled type="textarea"
                                rows="4" counter maxlength="500" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Botões de Ação -->
            <div class="row q-gutter-md justify-end">
                <q-btn flat :label="$t('forms.buttons.cancel')" @click="$router.go(-1)" />
                <q-btn color="primary" :label="$t('forms.buttons.save')" type="submit" :loading="loading" />
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { Imovel } from '../core/domain/entities/imovel'
import { Endereco } from '../core/domain/entities/endereco'
import { Cliente } from '../core/domain/entities/cliente'

export default defineComponent({
    name: 'ImovelCadastroPage',
    setup() {
        const router = useRouter()
        const $q = useQuasar()
        const { t } = useI18n()

        const loading = ref(false)
        const clientes = ref([])
        const clientesOptions = ref([])

        const form = ref({
            totalComodos: null,
            numeroQuartos: null,
            numeroBanheiros: null,
            areaTotal: null,
            dono: null,
            observacao: '',
            endereco: {
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                pais: 'Brasil'
            }
        })

        const carregarClientes = () => {
            // Simular carregamento de clientes - substituir por chamada real à API
            const clientesMock = [
                new Cliente('João', 'Silva', 'joao@email.com', '(11) 99999-9999', '(11) 99999-9999'),
                new Cliente('Maria', 'Santos', 'maria@email.com', '(11) 88888-8888', '(11) 88888-8888'),
                new Cliente('Pedro', 'Oliveira', 'pedro@email.com', '(11) 77777-7777', '(11) 77777-7777')
            ]

            clientes.value = clientesMock
            clientesOptions.value = clientesMock.map(cliente => ({
                label: `${cliente.Nome} ${cliente.Sobrenome}`,
                value: cliente
            }))
        }

        const onSubmit = async () => {
            try {
                loading.value = true

                // Validar se o total de cômodos é coerente
                const totalCalculado = form.value.numeroQuartos + form.value.numeroBanheiros
                if (form.value.totalComodos < totalCalculado) {
                    $q.notify({
                        type: 'negative',
                        message: t('forms.imovel.validation.totalComodosInvalid'),
                        position: 'top'
                    })
                    return
                }

                // Criar instância do endereço
                const endereco = new Endereco(
                    form.value.endereco.logradouro,
                    form.value.endereco.numero,
                    form.value.endereco.complemento,
                    form.value.endereco.bairro,
                    form.value.endereco.cidade,
                    form.value.endereco.estado,
                    form.value.endereco.cep,
                    form.value.endereco.pais
                )

                // Criar instância do imóvel
                const novoImovel = new Imovel(
                    form.value.totalComodos,
                    form.value.numeroQuartos,
                    form.value.numeroBanheiros,
                    form.value.areaTotal,
                    endereco,
                    form.value.dono,
                    form.value.observacao
                )

                console.log('Novo imóvel criado:', novoImovel)

                // Aqui seria feita a chamada para salvar no backend
                // await imovelService.criar(novoImovel)

                $q.notify({
                    type: 'positive',
                    message: t('messages.saveSuccess'),
                    timeout: 3000,
                    position: 'top-right'
                })

                // Aguardar um pouco antes de navegar para mostrar a mensagem
                setTimeout(() => {
                    router.push('/imoveis')
                }, 1500)

            } catch (error) {
                console.error('Erro ao criar imóvel:', error)
                $q.notify({
                    type: 'negative',
                    message: t('messages.saveError'),
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value = false
            }
        }

        const onCancel = () => {
            router.back()
        }

        onMounted(() => {
            carregarClientes()
        })

        return {
            form,
            loading,
            clientesOptions,
            onSubmit,
            onCancel
        }
    }
})
</script>

<style lang="sass" scoped>
.q-form
  max-width: 1200px
</style>
