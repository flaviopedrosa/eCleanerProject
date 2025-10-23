<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon name="person_add" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEdit ? editTitle : $t('forms.colaborador.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ isEdit ? $t('forms.colaborador.editSubtitle') : $t('forms.colaborador.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Dados Pessoais -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="person" class="q-mr-sm" />
            {{ $t('forms.colaborador.sections.personalData') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="form.nome" :label="$t('forms.colaborador.fields.nome') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.sobrenome" :label="$t('forms.colaborador.fields.sobrenome') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.email" type="email" :label="$t('forms.colaborador.fields.email') + ' *'" filled
                lazy-rules :rules="[
                  val => !!val || $t('forms.validation.required'),
                  val => isValidEmail(val) || $t('forms.validation.email')
                ]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.telefone" :label="$t('forms.colaborador.fields.telefone')" mask="(##) ####-####"
                filled />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.celular" :label="$t('forms.colaborador.fields.celular') + ' *'"
                mask="(##) #####-####" filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.documentoIdentidade"
                :label="$t('forms.colaborador.fields.documentoIdentidade') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.dataNascimento" type="date"
                :label="$t('forms.colaborador.fields.dataNascimento') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.nacionalidade" :label="$t('forms.colaborador.fields.nacionalidade') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Documentos -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="description" class="q-mr-sm" />
            {{ $t('forms.colaborador.sections.documents') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-file v-model="form.fotoPerfil" :label="$t('forms.colaborador.fields.fotoPerfil')" accept="image/*"
                filled>
                <template v-slot:prepend>
                  <q-icon name="photo" />
                </template>
              </q-file>
            </div>

            <div class="col-12 col-md-6">
              <q-file v-model="form.curriculo" :label="$t('forms.colaborador.fields.curriculo')"
                accept=".pdf,.doc,.docx" filled>
                <template v-slot:prepend>
                  <q-icon name="description" />
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <!-- Informações Profissionais -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="work" class="q-mr-sm" />
            {{ $t('forms.colaborador.sections.professionalInfo') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="form.salarioEsperado" type="number"
                :label="$t('forms.colaborador.fields.salarioEsperado') + ' *'" prefix="R$" filled lazy-rules :rules="[
                  val => !!val || $t('forms.validation.required'),
                  val => val > 0 || 'Valor deve ser maior que zero'
                ]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.disponibilidade" :label="$t('forms.colaborador.fields.disponibilidade') + ' *'"
                filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12">
              <q-select v-model="form.regioesAtuacao" :label="$t('forms.colaborador.fields.regioesAtuacao') + ' *'"
                multiple use-chips filled lazy-rules
                :rules="[val => val.length > 0 || $t('forms.validation.required')]">
                <!-- TODO: Adicionar opções de regiões -->
              </q-select>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Experiências -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="text-h6 text-primary">
              <q-icon name="work_history" class="q-mr-sm" />
              {{ $t('forms.colaborador.sections.experience') }}
            </div>
            <q-space />
            <q-btn color="primary" :label="$t('forms.colaborador.experience.addButton')" icon="add" size="sm"
              @click="addExperience" />
          </div>

          <!-- Estado vazio -->
          <div v-if="form.experiencias.length === 0" class="text-center text-grey-6 q-py-lg">
            <q-icon name="work_history" size="48px" class="q-mb-md" />
            <div class="text-body1">{{ $t('forms.colaborador.experience.noExperience') }}</div>
            <div class="text-caption">{{ $t('forms.colaborador.experience.addFirstExperience') }}</div>
          </div>

          <!-- Lista de experiências -->
          <div v-for="(exp, index) in form.experiencias" :key="index" class="q-mb-md">
            <q-card flat bordered class="bg-grey-1">
              <q-card-section class="q-pb-none">
                <div class="row items-center q-mb-sm">
                  <div class="text-subtitle2">
                    {{ $t('forms.colaborador.experience.title', [index + 1]) }}
                  </div>
                  <q-space />
                  <q-btn flat round color="negative" icon="delete" size="sm" @click="removeExperience(index)" />
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input v-model="exp.empresa" :label="$t('forms.colaborador.experience.fields.empresa') + ' *'"
                      filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="exp.cargo" :label="$t('forms.colaborador.experience.fields.cargo') + ' *'" filled
                      lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="exp.dataInicio" type="date"
                      :label="$t('forms.colaborador.experience.fields.dataInicio') + ' *'" filled lazy-rules
                      :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="exp.dataFim" type="date"
                      :label="$t('forms.colaborador.experience.fields.dataFim')" filled />
                  </div>

                  <div class="col-12">
                    <q-input v-model="exp.atividades" type="textarea"
                      :label="$t('forms.colaborador.experience.fields.atividades') + ' *'" filled lazy-rules
                      :rules="[val => !!val || $t('forms.validation.required')]" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>

      <!-- Referências -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="text-h6 text-primary">
              <q-icon name="contacts" class="q-mr-sm" />
              {{ $t('forms.colaborador.sections.references') }}
            </div>
            <q-space />
            <q-btn color="primary" :label="$t('forms.colaborador.reference.addButton')" icon="add" size="sm"
              @click="addReference" />
          </div>

          <!-- Estado vazio -->
          <div v-if="form.referencias.length === 0" class="text-center text-grey-6 q-py-lg">
            <q-icon name="contacts" size="48px" class="q-mb-md" />
            <div class="text-body1">{{ $t('forms.colaborador.reference.noReferences') }}</div>
            <div class="text-caption">{{ $t('forms.colaborador.reference.addFirstReference') }}</div>
          </div>

          <div v-for="(ref, index) in form.referencias" :key="index" class="q-mb-lg">
            <div class="row items-center q-mb-sm">
              <div class="text-subtitle2">
                {{ $t('forms.colaborador.reference.title', [index + 1]) }}
              </div>
              <q-space />
              <q-btn icon="delete" color="negative" flat round dense @click="removeReference(index)" />
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="ref.nome" :label="$t('forms.colaborador.reference.fields.nome') + ' *'"
                  :rules="[val => !!val || $t('forms.validation.required')]" outlined />
              </div>

              <div class="col-12 col-md-6">
                <q-input v-model="ref.empresa" :label="$t('forms.colaborador.reference.fields.empresa') + ' *'"
                  :rules="[val => !!val || $t('forms.validation.required')]" outlined />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="ref.cargo" :label="$t('forms.colaborador.reference.fields.cargo') + ' *'"
                  :rules="[val => !!val || $t('forms.validation.required')]" outlined />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="ref.telefone" :label="$t('forms.colaborador.reference.fields.telefone') + ' *'"
                  mask="(##) #####-####" :rules="[val => !!val || $t('forms.validation.required')]" outlined />
              </div>

              <div class="col-12 col-md-4">
                <q-input v-model="ref.email" type="email" :label="$t('forms.colaborador.reference.fields.email') + ' *'"
                  :rules="[
                    val => !!val || $t('forms.validation.required'),
                    val => isValidEmail(val) || $t('forms.validation.email')
                  ]" outlined />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Endereço -->
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">{{ $t('forms.colaborador.sections.address') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'"
                mask="#####-###" :rules="[val => !!val || $t('forms.validation.required')]" @blur="buscarCep"
                outlined />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'"
                :rules="[val => !!val || $t('forms.validation.required')]" outlined />
            </div>

            <div class="col-12 col-md-2">
              <q-input v-model="form.endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'"
                :rules="[val => !!val || $t('forms.validation.required')]" outlined />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                outlined />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'"
                :rules="[val => !!val || $t('forms.validation.required')]" outlined />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'"
                :rules="[val => !!val || $t('forms.validation.required')]" outlined />
            </div>

            <div class="col-12 col-md-1">
              <q-input v-model="form.endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'"
                :rules="[val => !!val || $t('forms.validation.required')]" maxlength="2" outlined />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Observações -->
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">{{ $t('forms.colaborador.sections.observations') }}</div>
          <q-input v-model="form.observacoes" type="textarea" :label="$t('forms.colaborador.fields.observacoes')"
            outlined />
        </q-card-section>

        <!-- Ações -->
        <q-card-actions align="right" class="q-pa-md">
          <q-btn :label="$t('forms.buttons.cancel')" color="negative" flat class="q-mr-sm" :to="'/colaboradores'" />
          <q-btn :label="$t('forms.buttons.save')" color="primary" type="submit" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { Colaborador } from '../core/domain/entities/colaborador.js'
import { Endereco } from '../core/domain/entities/endereco.js'
import { ExperienciaProfissional, Referencia } from '../core/domain/entities/documentosColaborador.js'

export default defineComponent({
  name: 'ColaboradorCadastroPage',

  setup() {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)

    // Form data
    const form = ref({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      celular: '',
      documentoIdentidade: '',
      dataNascimento: '',
      nacionalidade: '',
      fotoPerfil: null,
      curriculo: null,
      salarioEsperado: null,
      disponibilidade: '',
      regioesAtuacao: [],
      experiencias: [],
      referencias: [],
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      observacoes: ''
    })

    const isEdit = computed(() => !!route.params.id)
    const editTitle = computed(() => `Editar Colaborador: ${form.value.nome} ${form.value.sobrenome}`)

    // Validação de email
    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return emailPattern.test(email)
    }

    // Funções para experiências
    const addExperience = () => {
      form.value.experiencias.push({
        empresa: '',
        cargo: '',
        dataInicio: '',
        dataFim: '',
        atividades: ''
      })
    }

    const removeExperience = (index) => {
      form.value.experiencias.splice(index, 1)
    }

    // Funções para referências
    const addReference = () => {
      form.value.referencias.push({
        nome: '',
        empresa: '',
        cargo: '',
        telefone: '',
        email: ''
      })
    }

    const removeReference = (index) => {
      form.value.referencias.splice(index, 1)
    }

    // Busca de CEP
    const buscarCep = async () => {
      if (!form.value.endereco.cep) return

      const cep = form.value.endereco.cep.replace(/\D/g, '')
      if (cep.length !== 8) return

      try {
        loading.value = true
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          form.value.endereco.rua = data.logradouro
          form.value.endereco.bairro = data.bairro
          form.value.endereco.cidade = data.localidade
          form.value.endereco.estado = data.uf
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        $q.notify({
          type: 'negative',
          message: `Erro ao buscar CEP: ${error.message}`
        })
      } finally {
        loading.value = false
      }
    }

    // Carregar dados para edição
    const loadColaborador = async (id) => {
      try {
        loading.value = true
        // TODO: Implementar carregamento do colaborador
        console.log('Carregando colaborador:', id)
      } catch (error) {
        console.error('Erro ao carregar colaborador:', error)
        $q.notify({
          type: 'negative',
          message: `Erro ao carregar dados do colaborador: ${error.message}`
        })
      } finally {
        loading.value = false
      }
    }

    // Submit do formulário
    const onSubmit = async () => {
      try {
        loading.value = true

        // Criar instância de Endereco
        const endereco = new Endereco(
          'Residencial',
          form.value.endereco.rua,
          form.value.endereco.numero,
          form.value.endereco.bairro,
          form.value.endereco.cidade,
          form.value.endereco.estado,
          form.value.endereco.cep,
          form.value.endereco.complemento
        )

        // Criar instância de Colaborador
        const colaborador = new Colaborador(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.telefone,
          form.value.celular,
          form.value.documentoIdentidade,
          new Date(form.value.dataNascimento),
          form.value.nacionalidade,
          Number(form.value.salarioEsperado),
          form.value.disponibilidade,
          form.value.regioesAtuacao,
          form.value.observacoes
        )

        // Definir endereço
        colaborador.definirEnderecoResidencial(endereco)

        // Adicionar experiências
        form.value.experiencias.forEach(exp => {
          const experiencia = new ExperienciaProfissional(
            exp.empresa,
            exp.cargo,
            new Date(exp.dataInicio),
            exp.dataFim ? new Date(exp.dataFim) : null,
            exp.atividades
          )
          colaborador.adicionarExperienciaProfissional(experiencia)
        })

        // Adicionar referências
        form.value.referencias.forEach(ref => {
          const referencia = new Referencia(
            ref.nome,
            ref.empresa,
            ref.cargo,
            ref.telefone,
            ref.email
          )
          colaborador.adicionarReferencia(referencia)
        })

        // TODO: Implementar salvamento do colaborador

        $q.notify({
          type: 'positive',
          message: isEdit.value
            ? 'Colaborador atualizado com sucesso'
            : 'Colaborador cadastrado com sucesso'
        })

        router.push('/colaboradores')
      } catch (error) {
        console.error('Erro ao salvar colaborador:', error)
        $q.notify({
          type: 'negative',
          message: `Erro ao salvar colaborador: ${error.message}`
        })
      } finally {
        loading.value = false
      }
    }

    // Carregar dados se for edição
    if (isEdit.value) {
      loadColaborador(route.params.id)
    }

    return {
      form,
      loading,
      isEdit,
      editTitle,
      isValidEmail,
      addExperience,
      removeExperience,
      addReference,
      removeReference,
      buscarCep,
      onSubmit
    }
  }
})
</script>
