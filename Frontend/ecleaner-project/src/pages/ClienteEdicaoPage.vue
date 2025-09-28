<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="text-h5 text-secondary">{{ $t('pages.clientEdit.title') }}</div>
      <q-space />
      <q-btn
        flat
        :label="$t('pages.clientEdit.buttons.back')"
        icon="arrow_back"
        color="primary"
        @click="voltarParaListagem"
      />
    </div>

    <div v-if="loading" class="row justify-center q-pa-lg">
      <q-spinner color="primary" size="3em" />
    </div>

    <template v-else-if="cliente">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- Dados Pessoais -->
              <div class="col-12">
                <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.cliente.sections.personalData') }}</div>
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.nome"
                  :label="$t('forms.cliente.fields.nome') + ' *'"
                  filled
                  :rules="[val => !!val || $t('forms.validation.required')]"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.sobrenome"
                  :label="$t('forms.cliente.fields.sobrenome') + ' *'"
                  filled
                  :rules="[val => !!val || $t('forms.validation.required')]"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  v-model="form.email"
                  :label="$t('forms.cliente.fields.email') + ' *'"
                  filled
                  type="email"
                  :rules="[
                    val => !!val || $t('forms.validation.required'),
                    val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
                  ]"
                />
              </div>

              <div class="col-12 col-md-3">
                <q-input
                  v-model="form.telefone"
                  :label="$t('forms.cliente.fields.telefone')"
                  filled
                  mask="(##) ####-####"
                />
              </div>

              <div class="col-12 col-md-3">
                <q-input
                  v-model="form.celular"
                  :label="$t('forms.cliente.fields.celular') + ' *'"
                  filled
                  mask="(##) #####-####"
                  :rules="[val => !!val || $t('forms.validation.required')]"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Endereços -->
        <div class="col-12 q-mt-md">
          <div class="row items-center">
            <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.cliente.sections.addresses') }}</div>
            <q-space />
            <q-btn
              color="primary"
              icon="add"
              :label="$t('forms.cliente.address.addButton')"
              flat
              @click="adicionarNovoEndereco"
            />
          </div>
        </div>

        <div v-for="(endereco, index) in form.enderecos" :key="index">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <div class="text-subtitle2">{{ $t('forms.cliente.address.title', [index + 1]) }}</div>
                <q-space />
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  round
                  dense
                  @click="removerEndereco(index)"
                  v-if="form.enderecos.length > 1"
                />
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-2">
                  <q-input
                    v-model="endereco.cep"
                    :label="$t('forms.cliente.address.fields.cep') + ' *'"
                    filled
                    mask="#####-###"
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>

                <div class="col-12 col-md-8">
                  <q-input
                    v-model="endereco.rua"
                    :label="$t('forms.cliente.address.fields.rua') + ' *'"
                    filled
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>

                <div class="col-12 col-md-2">
                  <q-input
                    v-model="endereco.numero"
                    :label="$t('forms.cliente.address.fields.numero') + ' *'"
                    filled
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>

                <div class="col-12 col-md-4">
                  <q-input
                    v-model="endereco.complemento"
                    :label="$t('forms.cliente.address.fields.complemento')"
                    filled
                  />
                </div>

                <div class="col-12 col-md-4">
                  <q-input
                    v-model="endereco.bairro"
                    :label="$t('forms.cliente.address.fields.bairro') + ' *'"
                    filled
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>

                <div class="col-12 col-md-4">
                  <q-input
                    v-model="endereco.cidade"
                    :label="$t('forms.cliente.address.fields.cidade') + ' *'"
                    filled
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>

                <div class="col-12 col-md-4">
                  <q-input
                    v-model="endereco.estado"
                    :label="$t('forms.cliente.address.fields.estado') + ' *'"
                    filled
                    :rules="[val => !!val || $t('forms.validation.required')]"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Observações -->
        <q-card>
          <q-card-section>
            <div class="col-12">
              <q-input
                v-model="form.observacoes"
                :label="$t('forms.cliente.fields.observacoes')"
                filled
                type="textarea"
                rows="4"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Botões -->
        <div class="row q-mt-lg">
          <q-space />
          <q-btn
            :label="$t('pages.clientEdit.buttons.cancel')"
            color="negative"
            flat
            class="q-mr-sm"
            @click="voltarParaListagem"
          />
          <q-btn
            :label="$t('pages.clientEdit.buttons.save')"
            color="primary"
            type="submit"
          />
        </div>
      </q-form>
    </template>

    <div v-else class="text-center q-pa-md">
      <p class="text-negative">{{ $t('pages.clientEdit.notFound') }}</p>
      <q-btn
        :label="$t('pages.clientEdit.buttons.backToList')"
        color="primary"
        @click="$router.push('/clientes')"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { Cliente } from 'src/core/domain/entities/cliente'
import { Endereco } from 'src/core/domain/entities/endereco'

export default {
  name: 'ClienteEdicaoPage',

  setup () {
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    const { t } = useI18n()

    const loading = ref(true)
    const cliente = ref(null)

    function enderecoVazio() {
      return {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    }

    const form = ref({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      celular: '',
      observacoes: '',
      enderecos: [enderecoVazio()]
    })

    function adicionarNovoEndereco() {
      form.value.enderecos.push(enderecoVazio())
    }

    function removerEndereco(index) {
      form.value.enderecos.splice(index, 1)
    }

    async function carregarCliente() {
      loading.value = true
      try {
        // TODO: Implementar chamada à API
        // Simulando dados para exemplo
        const clienteData = {
          id: route.params.id,
          nome: 'João',
          sobrenome: 'Silva',
          email: 'joao.silva@email.com',
          telefone: '(11) 3333-4444',
          celular: '(11) 99999-8888',
          observacoes: 'Cliente VIP',
          enderecos: [
            {
              cep: '12345-678',
              rua: 'Rua Exemplo',
              numero: '123',
              complemento: 'Apto 45',
              bairro: 'Centro',
              cidade: 'São Paulo',
              estado: 'SP'
            }
          ]
        }

        cliente.value = clienteData
        form.value = { ...clienteData }
      } catch (error) {
        console.error('Erro ao carregar cliente:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.clientEdit.errors.loadFailed')
        })
        cliente.value = null
      } finally {
        loading.value = false
      }
    }

    async function onSubmit() {
      try {
        const clienteAtualizado = new Cliente(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.telefone,
          form.value.celular
        )

        form.value.enderecos.forEach(enderecoForm => {
          const endereco = new Endereco(
            enderecoForm.rua,
            enderecoForm.numero,
            enderecoForm.complemento,
            enderecoForm.bairro,
            enderecoForm.cidade,
            enderecoForm.estado,
            enderecoForm.cep
          )
          clienteAtualizado.adicionarEndereco(endereco)
        })

        clienteAtualizado.Observacoes = form.value.observacoes

        // TODO: Implementar chamada à API para atualização
        console.log('Cliente atualizado:', clienteAtualizado)

        $q.notify({
          type: 'positive',
          message: t('pages.clientEdit.success.updated')
        })

        // Redireciona para a listagem
        router.push('/clientes')
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.clientEdit.errors.updateFailed')
        })
      }
    }

    onMounted(() => {
      carregarCliente()
    })

    // Função para navegação
    const voltarParaListagem = () => {
      router.push('/clientes')
    }

    return {
      loading,
      cliente,
      form,
      adicionarNovoEndereco,
      removerEndereco,
      onSubmit,
      voltarParaListagem
    }
  }
}
</script>
