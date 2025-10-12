<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="person_add" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('forms.cliente.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('forms.cliente.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row q-col-gutter-md">
        <!-- Dados Pessoais -->
        <div class="col-12">
          <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.cliente.sections.personalData') }}</div>
        </div>

        <div class="col-12 col-md-6">
          <q-input v-model="form.nome" :label="$t('forms.cliente.fields.nome') + ' *'" filled
            :rules="[val => !!val || $t('forms.validation.required')]" />
        </div>

        <div class="col-12 col-md-6">
          <q-input v-model="form.sobrenome" :label="$t('forms.cliente.fields.sobrenome') + ' *'" filled
            :rules="[val => !!val || $t('forms.validation.required')]" />
        </div>

        <div class="col-12 col-md-6">
          <q-input v-model="form.email" :label="$t('forms.cliente.fields.email') + ' *'" filled type="email" :rules="[
            val => !!val || $t('forms.validation.required'),
            val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
          ]" />
        </div>

        <div class="col-12 col-md-3">
          <q-input v-model="form.telefone" :label="$t('forms.cliente.fields.telefone')" filled mask="(##) ####-####" />
        </div>

        <div class="col-12 col-md-3">
          <q-input v-model="form.celular" :label="$t('forms.cliente.fields.celular') + ' *'" filled
            mask="(##) #####-####" :rules="[val => !!val || $t('forms.validation.required')]" />
        </div>

        <!-- Endereços -->
        <div class="col-12 q-mt-md">
          <div class="row items-center">
            <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.cliente.sections.addresses') }}</div>
            <q-space />
            <q-btn color="primary" icon="add" :label="$t('forms.cliente.address.addButton')" flat
              @click="adicionarNovoEndereco" />
          </div>
        </div>

        <!-- Mensagem quando não há endereços -->
        <div v-if="form.enderecos.length === 0" class="col-12">
          <q-card flat bordered class="q-pa-md text-center">
            <q-icon name="location_off" size="48px" color="grey-5" class="q-mb-md" />
            <div class="text-grey-6">{{ $t('forms.cliente.address.noAddresses') }}</div>
            <div class="text-caption text-grey-5">{{ $t('forms.cliente.address.clickToAdd') }}</div>
          </q-card>
        </div>

        <div v-for="(endereco, index) in form.enderecos" :key="index" class="col-12">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <div class="text-subtitle2">{{ $t('forms.cliente.address.title', [index + 1]) }}</div>
                <q-space />
                <q-btn icon="delete" color="negative" flat round dense @click="removerEndereco(index)"
                  v-if="form.enderecos.length > 0" />
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-2">
                  <q-input v-model="endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'" filled
                    mask="#####-###" :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-8">
                  <q-input v-model="endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                    filled />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Imóveis -->
        <div class="col-12 q-mt-md">
          <div class="row items-center">
            <div class="text-subtitle1 text-primary q-mb-sm">{{ $t('forms.cliente.sections.properties') }}</div>
            <q-space />
            <q-btn color="secondary" icon="add_home" :label="$t('forms.cliente.property.addButton')" flat
              @click="adicionarNovoImovel" />
          </div>
        </div>

        <!-- Mensagem quando não há imóveis -->
        <div v-if="form.imoveis.length === 0" class="col-12">
          <q-card flat bordered class="q-pa-md text-center">
            <q-icon name="home_work" size="48px" color="grey-5" class="q-mb-md" />
            <div class="text-grey-6">{{ $t('forms.cliente.property.noProperties') }}</div>
            <div class="text-caption text-grey-5">{{ $t('forms.cliente.property.clickToAdd') }}</div>
          </q-card>
        </div>

        <div v-for="(imovel, index) in form.imoveis" :key="index" class="col-12">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <div class="text-subtitle2">{{ $t('forms.cliente.property.title', [index + 1]) }}</div>
                <q-space />
                <q-btn icon="delete" color="negative" flat round dense @click="removerImovel(index)"
                  v-if="form.imoveis.length > 0" />
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-3">
                  <q-input v-model="imovel.totalComodos"
                    :label="$t('forms.cliente.property.fields.totalComodos') + ' *'" filled type="number" min="1"
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-3">
                  <q-input v-model="imovel.numeroQuartos"
                    :label="$t('forms.cliente.property.fields.numeroQuartos') + ' *'" filled type="number" min="0"
                    :rules="[val => val >= 0 || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-3">
                  <q-input v-model="imovel.numeroBanheiros"
                    :label="$t('forms.cliente.property.fields.numeroBanheiros') + ' *'" filled type="number" min="1"
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-3">
                  <q-input v-model="imovel.areaTotal" :label="$t('forms.cliente.property.fields.areaTotal') + ' *'"
                    filled type="number" min="1" suffix="m²"
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12">
                  <q-input v-model="imovel.observacao" :label="$t('forms.cliente.property.fields.observacao')" filled
                    type="textarea" rows="2" />
                </div>

                <!-- Endereço do Imóvel -->
                <div class="col-12">
                  <div class="text-subtitle2 text-primary q-mb-sm">{{ $t('forms.cliente.property.address.title') }}
                  </div>
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="imovel.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'" filled
                    mask="#####-###" :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-6">
                  <q-input v-model="imovel.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'" filled
                    :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="imovel.endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'"
                    filled :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="imovel.endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                    filled />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="imovel.endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'"
                    filled :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="imovel.endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'"
                    filled :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-4">
                  <q-input v-model="imovel.endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'"
                    filled :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Observações -->
        <div class="col-12">
          <q-input v-model="form.observacoes" :label="$t('forms.cliente.fields.observacoes')" filled type="textarea"
            rows="4" />
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
import { Imovel } from '../core/domain/entities/imovel'

export default {
  name: 'ClienteCadastroPage',

  setup() {
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

    // Função auxiliar para criar um novo imóvel vazio
    function imovelVazio() {
      return {
        totalComodos: '',
        numeroQuartos: '',
        numeroBanheiros: '',
        areaTotal: '',
        observacao: '',
        endereco: enderecoVazio()
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
      enderecos: [],
      imoveis: []
    })

    // Métodos para manipulação de endereços
    function adicionarNovoEndereco() {
      form.value.enderecos.push(enderecoVazio())
    }

    function removerEndereco(index) {
      form.value.enderecos.splice(index, 1)
    }

    // Métodos para manipulação de imóveis
    function adicionarNovoImovel() {
      form.value.imoveis.push(imovelVazio())
    }

    function removerImovel(index) {
      form.value.imoveis.splice(index, 1)
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

        // Adiciona todos os endereços ao cliente (se houver)
        form.value.enderecos.forEach(enderecoForm => {
          // Só adiciona endereços que tenham pelo menos CEP preenchido
          if (enderecoForm.cep.trim()) {
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
          }
        })

        // Adiciona todos os imóveis ao cliente (se houver)
        form.value.imoveis.forEach(imovelForm => {
          // Só adiciona imóveis que tenham dados básicos preenchidos
          if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
            const enderecoImovel = new Endereco(
              imovelForm.endereco.rua,
              imovelForm.endereco.numero,
              imovelForm.endereco.complemento,
              imovelForm.endereco.bairro,
              imovelForm.endereco.cidade,
              imovelForm.endereco.estado,
              imovelForm.endereco.cep
            )

            const imovel = new Imovel(
              parseInt(imovelForm.totalComodos),
              parseInt(imovelForm.numeroQuartos) || 0,
              parseInt(imovelForm.numeroBanheiros),
              parseFloat(imovelForm.areaTotal) || 0,
              enderecoImovel,
              cliente,
              imovelForm.observacao
            )

            // TODO: Adicionar método para vincular imóvel ao cliente
            console.log('Imóvel criado:', imovel)
          }
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
      removerEndereco,
      adicionarNovoImovel,
      removerImovel
    }
  }
}
</script>
