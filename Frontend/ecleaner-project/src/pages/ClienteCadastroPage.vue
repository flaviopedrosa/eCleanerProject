<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon :name="isEditMode ? 'edit' : 'person_add'" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditMode ? $t('pages.clientEdit.title') : $t('forms.cliente.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ isEditMode ? $t('forms.cliente.editSubtitle') : $t('forms.cliente.subtitle') }}
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
            {{ $t('forms.cliente.sections.personalData') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="form.nome" :label="$t('forms.cliente.fields.nome') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.sobrenome" :label="$t('forms.cliente.fields.sobrenome') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.email" :label="$t('forms.cliente.fields.email') + ' *'" filled type="email"
                lazy-rules :rules="[
                  val => !!val || $t('forms.validation.required'),
                  val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || $t('forms.validation.email')
                ]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.telefone" :label="$t('forms.cliente.fields.telefone')" filled
                mask="(##) ####-####" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.celular" :label="$t('forms.cliente.fields.celular') + ' *'" filled
                mask="(##) #####-####" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Endereços -->
      <q-card flat bordered>
        <q-expansion-item v-model="enderecosExpanded" expand-separator>
          <template v-slot:header>
            <q-item-section>
              <q-item-label class="text-h6 text-primary">
                <q-icon name="location_on" class="q-mr-sm" />
                {{ $t('forms.cliente.sections.addresses') }}
              </q-item-label>
              <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <q-item-label v-if="!enderecosExpanded" caption>
                  {{ form.enderecos.length }} endereço(s)
                </q-item-label>
              </transition>
            </q-item-section>
            <q-item-section side>
              <q-btn color="primary" icon="add" :label="$t('forms.cliente.address.addButton')" flat size="sm"
                @click.stop="adicionarNovoEndereco" />
            </q-item-section>
          </template>
          <q-card-section>
            <!-- Estado vazio -->
            <div v-if="form.enderecos.length === 0" class="text-center text-grey-6 q-py-lg">
              <q-icon name="location_off" size="48px" class="q-mb-md" />
              <div class="text-body1">{{ $t('forms.cliente.address.noAddresses') }}</div>
              <div class="text-caption">{{ $t('forms.cliente.address.clickToAdd') }}</div>
            </div>

            <!-- Lista de endereços -->
            <div v-for="(endereco, index) in form.enderecos" :key="index" class="q-mb-md">
              <q-card flat bordered class="bg-grey-1">
                <q-card-section class="q-pb-none">
                  <div class="row items-center q-mb-sm">
                    <div class="text-subtitle2">{{ $t('forms.cliente.address.title', [index + 1]) }}</div>
                    <q-space />
                    <q-btn flat round color="negative" icon="delete" size="sm" @click="removerEndereco(index)" />
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-2">
                      <q-input v-model="endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'" filled
                        mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                        @blur="buscarEnderecoPorCep(endereco.cep, 'cliente', index)" />
                    </div>

                    <div class="col-12 col-md-8">
                      <q-input v-model="endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'" filled
                        lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-2">
                      <q-input v-model="endereco.numero" :label="$t('forms.cliente.address.fields.numero') + ' *'"
                        filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="endereco.complemento" :label="$t('forms.cliente.address.fields.complemento')"
                        filled />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="endereco.bairro" :label="$t('forms.cliente.address.fields.bairro') + ' *'"
                        filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="endereco.cidade" :label="$t('forms.cliente.address.fields.cidade') + ' *'"
                        filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="endereco.estado" :label="$t('forms.cliente.address.fields.estado') + ' *'"
                        filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>

      <!-- Imóveis -->
      <q-card flat bordered>
        <q-expansion-item v-model="imoveisExpanded" expand-separator>
          <template v-slot:header>
            <q-item-section>
              <q-item-label class="text-h6 text-primary">
                <q-icon name="home" class="q-mr-sm" />
                {{ $t('forms.cliente.sections.properties') }}
              </q-item-label>
              <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <q-item-label v-if="!imoveisExpanded" caption>
                  {{ form.imoveis.length }} imóvel(s)
                </q-item-label>
              </transition>
            </q-item-section>
            <q-item-section side>
              <q-btn color="primary" icon="add_home" :label="$t('forms.cliente.property.addButton')" flat size="sm"
                @click.stop="adicionarNovoImovel" />
            </q-item-section>
          </template>
          <q-card-section>
            <!-- Estado vazio -->
            <div v-if="form.imoveis.length === 0" class="text-center text-grey-6 q-py-lg">
              <q-icon name="home_work" size="48px" class="q-mb-md" />
              <div class="text-body1">{{ $t('forms.cliente.property.noProperties') }}</div>
              <div class="text-caption">{{ $t('forms.cliente.property.clickToAdd') }}</div>
            </div>

            <!-- Lista de imóveis -->
            <div v-for="(imovel, index) in form.imoveis" :key="imovel.id" class="q-mb-md">
              <q-card flat bordered class="bg-grey-1">
                <q-card-section class="q-pb-none">
                  <div class="row items-center q-mb-sm">
                    <div class="text-subtitle2">{{ $t('forms.cliente.property.title', [index + 1]) }}</div>
                    <q-space />
                    <q-btn flat round color="negative" icon="delete" size="sm" @click="removerImovel(index)" />
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-3">
                      <q-input v-model="imovel.totalComodos"
                        :label="$t('forms.cliente.property.fields.totalComodos') + ' *'" filled type="number" min="1"
                        lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-3">
                      <q-input v-model="imovel.numeroQuartos"
                        :label="$t('forms.cliente.property.fields.numeroQuartos') + ' *'" filled type="number" min="0"
                        lazy-rules :rules="[val => val >= 0 || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-3">
                      <q-input v-model="imovel.numeroBanheiros"
                        :label="$t('forms.cliente.property.fields.numeroBanheiros') + ' *'" filled type="number" min="1"
                        lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-3">
                      <q-input v-model="imovel.areaTotal" :label="$t('forms.cliente.property.fields.areaTotal') + ' *'"
                        filled type="number" min="1" suffix="m²" lazy-rules
                        :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12">
                      <q-input v-model="imovel.observacao" :label="$t('forms.cliente.property.fields.observacao')"
                        filled type="textarea" rows="2" />
                    </div>

                    <!-- Endereço do Imóvel -->
                    <div class="col-12">
                      <div class="text-subtitle2 text-primary q-mb-sm q-mt-md">
                        <q-icon name="location_on" class="q-mr-xs" />
                        {{ $t('forms.cliente.property.address.title') }}
                      </div>
                    </div>

                    <!-- Checkbox para usar mesmo endereço do cliente -->
                    <div class="col-12 q-mb-md">
                      <q-checkbox v-model="imovel.mesmoEnderecoCliente"
                        :label="$t('forms.cliente.property.address.sameAsClient')" color="primary"
                        @update:model-value="(value) => copiarEnderecoCliente(index, value)" />
                    </div>

                    <div class="col-12 col-md-2">
                      <q-input v-model="imovel.endereco.cep" :label="$t('forms.cliente.address.fields.cep') + ' *'"
                        filled mask="#####-###" lazy-rules :rules="[val => !!val || $t('forms.validation.required')]"
                        @blur="buscarEnderecoPorCep(imovel.endereco.cep, 'imovel', index)" />
                    </div>

                    <div class="col-12 col-md-6">
                      <q-input v-model="imovel.endereco.rua" :label="$t('forms.cliente.address.fields.rua') + ' *'"
                        filled lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-2">
                      <q-input v-model="imovel.endereco.numero"
                        :label="$t('forms.cliente.address.fields.numero') + ' *'" filled lazy-rules
                        :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-2">
                      <q-input v-model="imovel.endereco.complemento"
                        :label="$t('forms.cliente.address.fields.complemento')" filled />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="imovel.endereco.bairro"
                        :label="$t('forms.cliente.address.fields.bairro') + ' *'" filled lazy-rules
                        :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="imovel.endereco.cidade"
                        :label="$t('forms.cliente.address.fields.cidade') + ' *'" filled lazy-rules
                        :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>

                    <div class="col-12 col-md-4">
                      <q-input v-model="imovel.endereco.estado"
                        :label="$t('forms.cliente.address.fields.estado') + ' *'" filled lazy-rules
                        :rules="[val => !!val || $t('forms.validation.required')]" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>

      <!-- Observações -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="notes" class="q-mr-sm" />
            {{ $t('forms.cliente.sections.observacoes') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="form.observacoes" :label="$t('forms.cliente.fields.observacoes')" filled type="textarea"
                rows="4" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end">
        <q-btn flat :label="$t('forms.buttons.cancel')" @click="voltarParaListagem" />
        <q-btn color="primary" :label="isEditMode ? $t('pages.clientEdit.buttons.save') : $t('forms.buttons.save')"
          type="submit" :loading="loading" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { Cliente } from '../core/domain/entities/cliente'
import { Endereco } from '../core/domain/entities/endereco'
import { Imovel } from '../core/domain/entities/imovel'
import { ClienteRepository } from 'src/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from 'src/core/infrastructure/repositories/imovelRepository'

export default {
  name: 'ClienteCadastroPage',

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const clienteRepository = new ClienteRepository()
    const imovelRepository = new ImovelRepository()

    // Verifica se está em modo de edição
    const isEditMode = computed(() => !!route.params.id)
    const loading = ref(false)
    const cliente = ref(null)

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
        id: Date.now() + Math.random(), // ID único para reatividade
        totalComodos: '',
        numeroQuartos: '',
        numeroBanheiros: '',
        areaTotal: '',
        observacao: '',
        mesmoEnderecoCliente: false,
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

    // Estado das seções colapsáveis
    const enderecosExpanded = ref(true)
    const imoveisExpanded = ref(true)

    // Métodos para manipulação de endereços
    function adicionarNovoEndereco() {
      form.value.enderecos.push(enderecoVazio())
    }

    function removerEndereco(index) {
      form.value.enderecos.splice(index, 1)
    }

    // Métodos para manipulação de imóveis
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio())
    }

    function removerImovel(index) {
      form.value.imoveis.splice(index, 1)
    }

    // Função para copiar endereço do cliente para o imóvel
    function copiarEnderecoCliente(imovelIndex, usarEnderecoCliente) {
      if (usarEnderecoCliente && form.value.enderecos.length > 0) {
        // Copia o primeiro endereço do cliente
        const enderecoCliente = form.value.enderecos[0]
        form.value.imoveis[imovelIndex].endereco = {
          cep: enderecoCliente.cep,
          rua: enderecoCliente.rua,
          numero: enderecoCliente.numero,
          complemento: enderecoCliente.complemento,
          bairro: enderecoCliente.bairro,
          cidade: enderecoCliente.cidade,
          estado: enderecoCliente.estado
        }
      } else if (!usarEnderecoCliente) {
        // Limpa o endereço do imóvel quando desmarca
        form.value.imoveis[imovelIndex].endereco = enderecoVazio()
      }
    }

    // Função para buscar endereço pelo CEP usando a API ViaCEP
    async function buscarEnderecoPorCep(cep, tipo, indice = null) {
      if (!cep || cep.length < 8) return

      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, '')

      if (cepLimpo.length !== 8) return

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()

        if (data.erro) {
          $q.notify({
            type: 'negative',
            message: t('forms.validation.invalidCep'),
            timeout: 3000,
            position: 'top-right'
          })
          return
        }

        // Preenche os campos conforme o tipo de endereço
        if (tipo === 'cliente' && indice !== null) {
          form.value.enderecos[indice].rua = data.logradouro || ''
          form.value.enderecos[indice].bairro = data.bairro || ''
          form.value.enderecos[indice].cidade = data.localidade || ''
          form.value.enderecos[indice].estado = data.uf || ''
        } else if (tipo === 'imovel' && indice !== null) {
          form.value.imoveis[indice].endereco.rua = data.logradouro || ''
          form.value.imoveis[indice].endereco.bairro = data.bairro || ''
          form.value.imoveis[indice].endereco.cidade = data.localidade || ''
          form.value.imoveis[indice].endereco.estado = data.uf || ''
        }

        $q.notify({
          type: 'positive',
          message: t('forms.validation.cepFound'),
          timeout: 2000,
          position: 'top-right'
        })

      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.cepError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    // Função para carregar dados do cliente em modo de edição
    async function carregarCliente() {
      if (!isEditMode.value) return

      loading.value = true
      try {
        // Carrega dados reais do repositório
        const clienteData = await clienteRepository.getById(route.params.id)

        if (!clienteData) {
          throw new Error('Cliente não encontrado')
        }

        cliente.value = clienteData

        // Preenche o formulário com os dados do cliente
        form.value.nome = clienteData.Nome
        form.value.sobrenome = clienteData.Sobrenome
        form.value.email = clienteData.Email
        form.value.telefone = clienteData.Telefone || ''
        form.value.celular = clienteData.Celular
        form.value.observacoes = clienteData.Observacoes || ''

        // Preenche endereços ou adiciona um vazio se não houver
        if (clienteData.Enderecos && clienteData.Enderecos.length > 0) {
          form.value.enderecos = clienteData.Enderecos.map(endereco => ({
            cep: endereco.Cep,
            rua: endereco.Logradouro,
            numero: endereco.Numero,
            complemento: endereco.Complemento || '',
            bairro: endereco.Bairro,
            cidade: endereco.Cidade,
            estado: endereco.Estado
          }))
        } else {
          form.value.enderecos = [enderecoVazio()]
        }

        // Preenche imóveis com dados completos
        if (clienteData.Imoveis && clienteData.Imoveis.length > 0) {
          form.value.imoveis = clienteData.Imoveis.map(imovel => ({
            id: Date.now() + Math.random(), // ID único para reatividade
            totalComodos: imovel.TotalComodos?.toString() || '',
            numeroQuartos: imovel.NumeroQuartos?.toString() || '',
            numeroBanheiros: imovel.NumeroBanheiros?.toString() || '',
            areaTotal: imovel.AreaTotal?.toString() || '',
            observacao: imovel.Observacao || '',
            mesmoEnderecoCliente: false, // Sempre inicia desmarcado na edição
            endereco: {
              cep: imovel.Endereco?.Cep || '',
              rua: imovel.Endereco?.Logradouro || '',
              numero: imovel.Endereco?.Numero || '',
              complemento: imovel.Endereco?.Complemento || '',
              bairro: imovel.Endereco?.Bairro || '',
              cidade: imovel.Endereco?.Cidade || '',
              estado: imovel.Endereco?.Estado || ''
            }
          }))
        } else {
          form.value.imoveis = []
        }

      } catch (error) {
        console.error('Erro ao carregar cliente:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.clientEdit.messages.loadError'),
          timeout: 5000,
          position: 'top-right'
        })
        cliente.value = null
      } finally {
        loading.value = false
      }
    }

    // Função para voltar à listagem
    const voltarParaListagem = () => {
      router.push('/clientes')
    }

    // Inicialização
    onMounted(() => {
      if (isEditMode.value) {
        carregarCliente()
      } else {
        // Modo de criação - adiciona um endereço vazio por padrão
        form.value.enderecos = [enderecoVazio()]
      }
    })

    const onSubmit = async () => {
      try {
        const clienteInstance = new Cliente(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.celular,
          form.value.telefone
        )

        // Se estiver editando, preserva o ID
        if (isEditMode.value && cliente.value) {
          clienteInstance.Id = cliente.value.Id
        }

        // Adiciona todos os endereços ao cliente (se houver)
        form.value.enderecos.forEach(enderecoForm => {
          // Só adiciona endereços que tenham pelo menos CEP preenchido
          if (enderecoForm.cep.trim()) {
            const endereco = new Endereco(
              'Principal', // descricao
              enderecoForm.rua, // logradouro
              enderecoForm.numero,
              enderecoForm.cep,
              enderecoForm.bairro,
              enderecoForm.cidade,
              enderecoForm.estado,
              'Brasil' // pais
            )
            clienteInstance.adicionarEndereco(endereco)
          }
        })

        clienteInstance.Observacoes = form.value.observacoes

        // PRIMEIRO: Salva o cliente no repositório para garantir que ele tenha um ID
        console.log('Salvando cliente primeiro...', clienteInstance)
        const clienteSalvo = await clienteRepository.save(clienteInstance)
        console.log('Cliente salvo com ID:', clienteSalvo.Id)

        // SEGUNDO: Adiciona todos os imóveis ao cliente (se houver)
        const imoveisCriados = []
        for (const imovelForm of form.value.imoveis) {
          // Só adiciona imóveis que tenham dados básicos preenchidos
          if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
            const enderecoImovel = new Endereco(
              'Imóvel', // descricao
              imovelForm.endereco.rua, // logradouro
              imovelForm.endereco.numero,
              imovelForm.endereco.cep,
              imovelForm.endereco.bairro,
              imovelForm.endereco.cidade,
              imovelForm.endereco.estado,
              'Brasil' // pais
            )

            // Agora usa o cliente já salvo (com ID definido)
            const imovel = new Imovel(
              parseInt(imovelForm.totalComodos),
              parseInt(imovelForm.numeroQuartos) || 0,
              parseInt(imovelForm.numeroBanheiros),
              parseFloat(imovelForm.areaTotal) || 0,
              enderecoImovel,
              clienteSalvo, // Usa o cliente salvo com ID
              imovelForm.observacao
            )

            // Salva o imóvel no repositório
            const imovelSalvo = await imovelRepository.save(imovel)
            console.log('Imóvel criado e salvo:', imovelSalvo)
            console.log('ID do cliente no imóvel:', imovelSalvo.Dono.Id)

            // Adiciona o imóvel ao cliente
            clienteSalvo.adicionarImovel(imovelSalvo)
            imoveisCriados.push(imovelSalvo)
          }
        }

        // TERCEIRO: Se foram criados imóveis, atualiza o cliente com a lista de imóveis
        if (imoveisCriados.length > 0) {
          console.log('Atualizando cliente com', imoveisCriados.length, 'imóveis...')
          await clienteRepository.save(clienteSalvo)
        }

        // Simular sucesso
        $q.notify({
          type: 'positive',
          message: isEditMode.value ? t('messages.updateSuccess') : t('messages.saveSuccess'),
          timeout: 3000,
          position: 'top-right'
        })

        // Voltar para a listagem após sucesso
        setTimeout(() => {
          router.push('/clientes')
        }, 1500)

      } catch (error) {
        console.error(isEditMode.value ? 'Erro ao atualizar cliente:' : 'Erro ao criar cliente:', error)

        $q.notify({
          type: 'negative',
          message: isEditMode.value ? t('messages.updateError') : t('messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      }
    }

    return {
      form,
      enderecosExpanded,
      imoveisExpanded,
      isEditMode,
      loading,
      cliente,
      onSubmit,
      adicionarNovoEndereco,
      removerEndereco,
      adicionarNovoImovel,
      removerImovel,
      copiarEnderecoCliente,
      buscarEnderecoPorCep,
      voltarParaListagem
    }
  }
}
</script>
