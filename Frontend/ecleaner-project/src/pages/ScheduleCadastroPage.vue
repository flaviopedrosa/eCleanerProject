<template>
  <q-page padding>
    <div class="text-h5 text-secondary q-mb-md">{{ $t('forms.schedule.title') }}</div>

    <q-form @submit="handleSubmit" @reset="handleReset" class="q-gutter-md">
      <div class="row q-col-gutter-md">
        <!-- Dados da Empresa -->
        <div class="col-12">
          <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.schedule.sections.empresa') }}</div>
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.nomeEmpresa"
            :label="$t('forms.schedule.fields.nomeEmpresa') + ' *'"
            :hint="$t('forms.schedule.hints.nomeEmpresa')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.documentoEmpresa"
            :label="$t('forms.schedule.fields.documentoEmpresa') + ' *'"
            :hint="$t('forms.schedule.hints.documentoEmpresa')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            mask="#############"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.emailComercial"
            :label="$t('forms.schedule.fields.emailComercial') + ' *'"
            :hint="$t('forms.schedule.hints.emailComercial')"
            :rules="[
              val => !!val || $t('forms.validation.required'),
              val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
            ]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.telefoneComercial"
            :label="$t('forms.schedule.fields.telefoneComercial') + ' *'"
            :hint="$t('forms.schedule.hints.telefoneComercial')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            mask="(##) ####-####"
          />
        </div>

        <div class="col-12 col-md-3">
          <q-select
            v-model="form.tipoEmpresa"
            :options="Object.values(TipoEmpresa)"
            :label="$t('forms.schedule.fields.tipoEmpresa') + ' *'"
            :hint="$t('forms.schedule.hints.tipoEmpresa')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            emit-value
            map-options
          />
        </div>

        <div class="col-12 col-md-6">
          <q-file
            v-model="form.logomarca"
            :label="$t('forms.schedule.fields.logomarca')"
            :hint="$t('forms.schedule.hints.logomarca')"
            accept=".jpg,.png,.jpeg"
            filled
            lazy-rules
            @update:model-value="handleImageUpload"
            :rules="[
              val => !val || val.size <= 5242880 || $t('forms.validation.maxFileSize', { size: '5MB' }),
              val => !val || ['image/jpeg', 'image/png'].includes(val.type) || $t('forms.validation.invalidFileType')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
            <template v-slot:after v-if="previewUrl">
              <q-avatar>
                <img :src="previewUrl">
              </q-avatar>
            </template>
          </q-file>
        </div>

        <!-- Dados do Responsável -->
        <div class="col-12">
          <div class="text-subtitle1 text-primary q-mb-sm q-mt-lg">{{ $t('forms.schedule.sections.responsavel') }}</div>
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.responsavel.nome"
            :label="$t('forms.schedule.fields.responsavel.nome') + ' *'"
            :hint="$t('forms.schedule.hints.responsavel.nome')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.responsavel.sobrenome"
            :label="$t('forms.schedule.fields.responsavel.sobrenome') + ' *'"
            :hint="$t('forms.schedule.hints.responsavel.sobrenome')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.responsavel.email"
            :label="$t('forms.schedule.fields.responsavel.email') + ' *'"
            :hint="$t('forms.schedule.hints.responsavel.email')"
            :rules="[
              val => !!val || $t('forms.validation.required'),
              val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
            ]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.responsavel.telefone"
            :label="$t('forms.schedule.fields.responsavel.telefone')"
            :hint="$t('forms.schedule.hints.responsavel.telefone')"
            filled
            lazy-rules
            mask="(##) ####-####"
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.responsavel.celular"
            :label="$t('forms.schedule.fields.responsavel.celular') + ' *'"
            :hint="$t('forms.schedule.hints.responsavel.celular')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            mask="(##) #####-####"
          />
        </div>

        <!-- Endereço Comercial -->
        <div class="col-12">
          <div class="text-subtitle1 text-primary q-mb-sm q-mt-lg">{{ $t('forms.schedule.sections.enderecoComercial') }}</div>
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.enderecoComercial.cep"
            :label="$t('forms.schedule.fields.endereco.cep') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.cep')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            mask="#####-###"
          />
        </div>

        <div class="col-12 col-md-7">
          <q-input
            v-model="form.enderecoComercial.logradouro"
            :label="$t('forms.schedule.fields.endereco.logradouro') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.logradouro')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-2">
          <q-input
            v-model="form.enderecoComercial.numero"
            :label="$t('forms.schedule.fields.endereco.numero') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.numero')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-4">
          <q-input
            v-model="form.enderecoComercial.complemento"
            :label="$t('forms.schedule.fields.endereco.complemento')"
            :hint="$t('forms.schedule.hints.endereco.complemento')"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-4">
          <q-input
            v-model="form.enderecoComercial.bairro"
            :label="$t('forms.schedule.fields.endereco.bairro') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.bairro')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.enderecoComercial.cidade"
            :label="$t('forms.schedule.fields.endereco.cidade') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.cidade')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-1">
          <q-input
            v-model="form.enderecoComercial.estado"
            :label="$t('forms.schedule.fields.endereco.estado') + ' *'"
            :hint="$t('forms.schedule.hints.endereco.estado')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
            mask="AA"
          />
        </div>

        <!-- Dados Bancários -->
        <div class="col-12">
          <div class="text-subtitle1 text-primary q-mb-sm q-mt-lg">{{ $t('forms.schedule.sections.dadosBancarios') }}</div>
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.dadosBancarios.banco"
            :label="$t('forms.schedule.fields.dadosBancarios.banco') + ' *'"
            :hint="$t('forms.schedule.hints.dadosBancarios.banco')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.dadosBancarios.agencia"
            :label="$t('forms.schedule.fields.dadosBancarios.agencia') + ' *'"
            :hint="$t('forms.schedule.hints.dadosBancarios.agencia')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-3">
          <q-input
            v-model="form.dadosBancarios.tipoConta"
            :label="$t('forms.schedule.fields.dadosBancarios.tipoConta') + ' *'"
            :hint="$t('forms.schedule.hints.dadosBancarios.tipoConta')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.dadosBancarios.conta"
            :label="$t('forms.schedule.fields.dadosBancarios.conta') + ' *'"
            :hint="$t('forms.schedule.hints.dadosBancarios.conta')"
            :rules="[val => !!val || $t('forms.validation.required')]"
            filled
            lazy-rules
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.dadosBancarios.pix"
            :label="$t('forms.schedule.fields.dadosBancarios.pix')"
            :hint="$t('forms.schedule.hints.dadosBancarios.pix')"
            filled
            lazy-rules
          />
        </div>

        <!-- Botões -->
        <div class="col-12">
          <div class="row justify-end q-mt-md">
            <q-btn
              :label="$t('forms.buttons.cancel')"
              type="reset"
              color="negative"
              flat
              class="q-ml-sm"
            />
            <q-btn
              :label="$t('forms.buttons.save')"
              type="submit"
              color="primary"
              class="q-ml-sm"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { TipoEmpresa } from 'src/core/domain/enums/tipoEmpresa'
import { Schedule } from 'src/core/domain/entities/schedule'
import { Pessoa } from 'src/core/domain/entities/pessoa'
import { Endereco } from 'src/core/domain/entities/endereco'
import { DadosBancarios } from 'src/core/domain/value-objects/dadosBancarios'
import { ScheduleRepository } from 'src/core/infrastructure/repositories/scheduleRepository'

const router = useRouter()
const $q = useQuasar()
const { t } = useI18n()

const form = ref({
  nomeEmpresa: '',
  documentoEmpresa: '',
  telefoneComercial: '',
  emailComercial: '',
  tipoEmpresa: null,
  logomarca: null,
  responsavel: {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    celular: ''
  },
  enderecoComercial: {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  },
  dadosBancarios: {
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: '',
    pix: ''
  }
})

const previewUrl = ref(null)

async function handleSubmit () {
  try {
    const scheduleRepository = new ScheduleRepository()

    const pessoa = new Pessoa(
      form.value.responsavel.nome,
      form.value.responsavel.sobrenome,
      form.value.responsavel.email,
      form.value.responsavel.telefone,
      form.value.responsavel.celular
    )

    const endereco = new Endereco(
      form.value.enderecoComercial.cep,
      form.value.enderecoComercial.logradouro,
      form.value.enderecoComercial.numero,
      form.value.enderecoComercial.complemento,
      form.value.enderecoComercial.bairro,
      form.value.enderecoComercial.cidade,
      form.value.enderecoComercial.estado
    )

    const dadosBancarios = new DadosBancarios(
      form.value.dadosBancarios.banco,
      form.value.dadosBancarios.agencia,
      form.value.dadosBancarios.conta,
      form.value.dadosBancarios.tipoConta,
      form.value.dadosBancarios.pix
    )

    const schedule = new Schedule(
      pessoa,
      form.value.nomeEmpresa,
      form.value.documentoEmpresa,
      form.value.telefoneComercial,
      form.value.emailComercial,
      endereco,
      form.value.tipoEmpresa,
      dadosBancarios,
      form.value.logomarca
    )

    await scheduleRepository.save(schedule)

    $q.notify({
      type: 'positive',
      message: t('pages.scheduleList.messages.saveSuccess')
    })

    router.push('/schedules')
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: t('pages.scheduleList.messages.saveError')
    })
  }
}

function handleReset () {
  form.value = {
    nomeEmpresa: '',
    documentoEmpresa: '',
    telefoneComercial: '',
    emailComercial: '',
    tipoEmpresa: null,
    logomarca: null,
    responsavel: {
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      celular: ''
    },
    enderecoComercial: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    dadosBancarios: {
      banco: '',
      agencia: '',
      conta: '',
      tipoConta: '',
      pix: ''
    }
  }
  previewUrl.value = null
}

function handleImageUpload (file) {
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
