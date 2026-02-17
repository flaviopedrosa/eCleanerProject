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
              <q-input v-model.number="form.totalComodos" :label="$t('forms.imovel.fields.totalComodos') + ' *'" filled
                type="number" min="1" lazy-rules :rules="[
                  val => !!val || $t('forms.validation.required'),
                  val => val > 0 || $t('forms.validation.positiveNumber')
                ]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model.number="form.numeroQuartos" :label="$t('forms.imovel.fields.numeroQuartos') + ' *'"
                filled type="number" min="0" lazy-rules :rules="[
                  val => val >= 0 || $t('forms.validation.nonNegativeNumber')
                ]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model.number="form.numeroBanheiros" :label="$t('forms.imovel.fields.numeroBanheiros') + ' *'"
                filled type="number" min="0" lazy-rules :rules="[
                  val => val >= 0 || $t('forms.validation.nonNegativeNumber')
                ]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model.number="form.areaTotal" :label="$t('forms.imovel.fields.areaTotal') + ' *'" filled
                type="number" min="1" step="0.01" suffix="m²" lazy-rules :rules="[
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
              <q-select v-model="form.dono" :options="clientesOptions" :label="$t('forms.imovel.fields.dono') + ' *'"
                filled emit-value map-options option-value="value" option-label="label" lazy-rules
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
              <q-input v-model="form.endereco.logradouro" :label="$t('forms.endereco.fields.logradouro') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.numero" :label="$t('forms.endereco.fields.numero') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.complemento" :label="$t('forms.endereco.fields.complemento')" filled />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.bairro" :label="$t('forms.endereco.fields.bairro') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="form.endereco.cidade" :label="$t('forms.endereco.fields.cidade') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.endereco.estado" :label="$t('forms.endereco.fields.estado') + ' *'" filled
                lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-3">
              <q-input v-model="form.endereco.cep" :label="$t('forms.endereco.fields.cep') + ' *'" filled
                mask="#####-###" lazy-rules :rules="[
                  val => !!val || $t('forms.validation.required'),
                  val => val.length === 9 || $t('forms.validation.cep')
                ]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.endereco.pais" :label="$t('forms.endereco.fields.pais') + ' *'" filled lazy-rules
                :rules="[val => !!val || $t('forms.validation.required')]" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Imagens do Imóvel -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="photo_camera" class="q-mr-sm" />
            {{ $t('forms.imovel.images.title') }}
          </div>

          <div class="row q-gutter-sm q-mb-md">
            <q-btn color="primary" icon="photo_library" :label="$t('forms.imovel.images.chooseFile')" size="sm" outline
              @click="abrirSeletorImagem" />
            <q-btn color="primary" icon="photo_camera" :label="$t('forms.imovel.images.takePhoto')" size="sm" outline
              @click="abrirCamera" />
          </div>

          <q-file ref="imagemInput" v-model="form.imagemTemp" accept="image/*" multiple max-file-size="5242880"
            @update:model-value="onImagensSelecionadas" style="display: none" />
          <q-file ref="cameraInput" v-model="form.cameraTemp" accept="image/*" capture="environment"
            max-file-size="5242880" @update:model-value="onImagemCamera" style="display: none" />

          <div v-if="!form.imagens || form.imagens.length === 0" class="text-grey-6 text-caption">
            {{ $t('forms.imovel.images.noImages') }}
          </div>

          <div v-else class="row q-gutter-sm">
            <div v-for="(imagem, imgIndex) in form.imagens" :key="imagem.id || imgIndex"
              class="col-6 col-sm-4 col-md-3">
              <q-card flat bordered class="imagem-preview">
                <q-img :src="imagem.preview || imagem.url" :alt="imagem.nome || `Imagem ${imgIndex + 1}`" ratio="1"
                  class="rounded-borders" style="height: 120px">
                  <div class="absolute-top-right q-pa-xs">
                    <q-btn round dense color="negative" icon="close" size="xs" @click="removerImagem(imgIndex)" />
                  </div>
                </q-img>

                <q-card-section class="q-pa-xs">
                  <q-input v-model="imagem.descricao" :placeholder="$t('forms.imovel.images.description')" dense filled
                    class="text-caption" />
                  <div class="text-caption text-grey-7 q-mt-xs">
                    {{ $t('forms.imovel.images.uploadDate', [formatarData(imagem.dataUpload)]) }}
                  </div>
                </q-card-section>
              </q-card>
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
                :placeholder="$t('forms.imovel.placeholders.observacao')" filled type="textarea" rows="4" counter
                maxlength="500" />
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
import { ImovelRepository } from '../core/infrastructure/repositories/imovelRepository'

export default defineComponent({
  name: 'ImovelCadastroPage',
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const { t } = useI18n()

    const loading = ref(false)
    const clientes = ref([])
    const clientesOptions = ref([])
    const imovelRepository = new ImovelRepository()

    const form = ref({
      totalComodos: null,
      numeroQuartos: null,
      numeroBanheiros: null,
      areaTotal: null,
      dono: null,
      observacao: '',
      imagens: [],
      imagemTemp: null,
      cameraTemp: null,
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

    const imagemInput = ref(null)
    const cameraInput = ref(null)

    const abrirSeletorImagem = () => {
      if (imagemInput.value) {
        imagemInput.value.pickFiles()
      }
    }

    const abrirCamera = () => {
      if (cameraInput.value) {
        cameraInput.value.pickFiles()
      }
    }

    const comprimirImagem = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            let width = img.width
            let height = img.height

            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height)
              width = width * ratio
              height = height * ratio
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
            resolve(compressedDataUrl)
          }
          img.onerror = reject
          img.src = e.target.result
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    const onImagensSelecionadas = async (files) => {
      if (!files || files.length === 0) return

      const lista = Array.isArray(files) ? files : [files]

      try {
        for (const file of lista) {
          if (file.size > 5242880) {
            $q.notify({
              type: 'negative',
              message: t('forms.validation.fileTooLarge', [file.name]),
              timeout: 3000,
              position: 'top-right'
            })
            continue
          }

          const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8)

          form.value.imagens.push({
            id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            nome: file.name,
            preview: imagemComprimida,
            descricao: '',
            tipo: file.type,
            tamanho: file.size,
            dataUpload: new Date().toISOString()
          })
        }

        $q.notify({
          type: 'positive',
          message: t('forms.imovel.images.imagesAdded', [lista.length]),
          timeout: 2000,
          position: 'top-right'
        })

        form.value.imagemTemp = null
      } catch (error) {
        console.error('Erro ao processar imagens:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.imageProcessError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    const onImagemCamera = async (file) => {
      if (!file) return

      try {
        if (file.size > 5242880) {
          $q.notify({
            type: 'negative',
            message: t('forms.validation.fileTooLarge', [file.name || 'imagem']),
            timeout: 3000,
            position: 'top-right'
          })
          return
        }

        const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8)

        form.value.imagens.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          nome: file.name || `camera_${Date.now()}.jpg`,
          preview: imagemComprimida,
          descricao: '',
          tipo: file.type || 'image/jpeg',
          tamanho: file.size,
          dataUpload: new Date().toISOString()
        })

        $q.notify({
          type: 'positive',
          message: t('forms.imovel.images.photoTaken'),
          timeout: 2000,
          position: 'top-right'
        })

        form.value.cameraTemp = null
      } catch (error) {
        console.error('Erro ao processar imagem da câmera:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.validation.imageProcessError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    const removerImagem = (imgIndex) => {
      form.value.imagens.splice(imgIndex, 1)
      $q.notify({
        type: 'info',
        message: t('forms.imovel.images.imageRemoved'),
        timeout: 1500,
        position: 'top-right'
      })
    }

    const formatarData = (data) => {
      if (!data) return '-'
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date(data))
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
          form.value.observacao,
          form.value.imagens
        )

        console.log('Novo imóvel criado:', novoImovel)

        // Aqui seria feita a chamada para salvar no backend
        await imovelRepository.save(novoImovel)

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
      imagemInput,
      cameraInput,
      abrirSeletorImagem,
      abrirCamera,
      onImagensSelecionadas,
      onImagemCamera,
      removerImagem,
      formatarData,
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
