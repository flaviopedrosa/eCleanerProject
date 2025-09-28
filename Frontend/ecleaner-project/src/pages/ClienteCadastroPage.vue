<template>
  <q-page padding>
    <div class="text-h5 text-secondary q-mb-md">{{ $t('forms.cliente.title') }}</div>

    <q-form @submit="onSubmit" class="q-gutter-md">
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

        <div v-for="(endereco, index) in form.enderecos" :key="index" class="col-12">
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
        <div class="col-12">
          <q-input
            v-model="form.observacoes"
            :label="$t('forms.cliente.fields.observacoes')"
            filled
            type="textarea"
            rows="4"
          />
        </div>
      </div>

      <!-- Botões -->
      <div class="row q-mt-lg">
        <q-space />
        <q-btn :label="$t('forms.buttons.cancel')" color="negative" flat class="q-mr-sm" @click="$router.back()" />
        <q-btn :label="$t('forms.buttons.save')" color="primary" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { Cliente } from '../core/domain/entities/cliente'
import { Endereco } from '../core/domain/entities/endereco'

export default {
  name: 'ClienteCadastroPage',

  setup () {
    // Função auxiliar para criar um novo endereço vazio
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

    // Estado do formulário
    const form = ref({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      celular: '',
      observacoes: '',
      enderecos: [enderecoVazio()]
    })

    // Métodos para manipulação de endereços
    function adicionarNovoEndereco() {
      form.value.enderecos.push(enderecoVazio())
    }

    function removerEndereco(index) {
      form.value.enderecos.splice(index, 1)
    }

    const onSubmit = async () => {
      try {
        const cliente = new Cliente(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.telefone,
          form.value.celular
        )

        // Adiciona todos os endereços ao cliente
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
          cliente.adicionarEndereco(endereco)
        })

        cliente.Observacoes = form.value.observacoes

        // TODO: Implementar lógica de salvamento
        console.log('Cliente criado:', cliente)
      } catch (error) {
        console.error('Erro ao criar cliente:', error)
      }
    }

    return {
      form,
      onSubmit,
      adicionarNovoEndereco,
      removerEndereco
    }
  }
}
</script>
