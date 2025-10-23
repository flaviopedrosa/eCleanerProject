<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon :name="isEditMode ? 'edit' : 'category'" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditMode ? $t('forms.material.editTitle') : $t('forms.material.newTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('forms.material.formSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário de cadastro/edição -->
    <q-form @submit.prevent="salvarMaterial" class="q-gutter-md">
      <div class="row q-col-gutter-md">
        <!-- Campos do Formulário - Esquerda -->
        <div class="col-12 col-md-8">
          <!-- Dados do Material -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-primary q-mb-md">
                <q-icon name="category" class="q-mr-sm" />
                {{ $t('forms.material.sections.materialData') }}
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input v-model="form.Descricao" :label="$t('forms.material.fields.descricao') + ' *'" filled
                    lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" />
                </div>

                <div class="col-12 col-md-6">
                  <q-input v-model="valorFormatado" :label="$t('forms.material.fields.precoUnitario') + ' *'" filled
                    lazy-rules :rules="[val => !!val || $t('forms.validation.required')]" @input="onValorInput"
                    :placeholder="currencyConfig.placeholder">
                    <template v-slot:prepend>
                      <q-icon name="attach_money" />
                    </template>
                  </q-input>
                </div>

                <div class="col-12 col-md-6">
                  <q-input v-model="form.Unidade" :label="$t('forms.material.fields.unidade') + ' *'" filled lazy-rules
                    :rules="[val => !!val || $t('forms.validation.required')]" placeholder="kg, L, un, m²...">
                    <template v-slot:prepend>
                      <q-icon name="straighten" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Informações Adicionais -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-h6 text-primary q-mb-md">
                <q-icon name="info" class="q-mr-sm" />
                {{ $t('forms.material.sections.additionalInfo') }}
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input v-model="form.Url" :label="$t('forms.material.fields.url')" filled type="url"
                    placeholder="https://exemplo.com/produto">
                    <template v-slot:prepend>
                      <q-icon name="link" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Visualização da Imagem - Direita -->
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-primary q-mb-md">
                <q-icon name="image" class="q-mr-sm" />
                {{ $t('forms.material.sections.imagePreview') }}
              </div>

              <q-card flat bordered class="cursor-pointer" @click="abrirSeletorImagem">
                <!-- Imagem selecionada -->
                <div v-if="imagemPreview">
                  <q-img :src="imagemPreview" fit="contain" style="height: 340px;" class="rounded-borders">
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center bg-negative text-white">
                        <q-icon name="broken_image" size="64px" />
                      </div>
                    </template>
                    <template v-slot:loading>
                      <div class="absolute-full flex flex-center">
                        <q-spinner color="primary" size="64px" />
                      </div>
                    </template>
                  </q-img>
                  <q-card-actions align="right">
                    <q-btn flat color="negative" icon="delete" label="Remover" @click.stop="removerImagem" />
                  </q-card-actions>
                </div>
                <!-- Placeholder quando não há imagem -->
                <div v-else class="flex flex-center q-pa-lg" style="height: 340px; background-color: #f5f5f5;">
                  <div class="text-center">
                    <q-icon name="add_a_photo" size="64px" color="grey-5" />
                    <div class="text-grey-6 q-mt-sm">{{ $t('forms.material.messages.clickToSelectImage') }}</div>
                  </div>
                </div>
              </q-card>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end">
        <q-btn flat :label="$t('forms.buttons.cancel')" @click="cancelar" />
        <q-btn color="primary" :label="isEditMode ? $t('buttons.update') : $t('forms.buttons.save')" type="submit"
          :loading="loading" />
      </div>

      <!-- Input de arquivo invisível -->
      <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="onFileSelected" />
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useMaterialStore } from '@/stores/material-store.js'
import { currencyMask, parseCurrency, getCurrencyConfig, formatCurrency } from '@/core/domain/utils/currencyUtils'

export default defineComponent({
  name: 'MaterialCadastroPage',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const store = useMaterialStore()

    // Estado do formulário
    const form = ref({
      Id: null,
      Descricao: '',
      Unidade: '',
      PrecoUnitario: 0,
      Url: '',
      ImagemFile: null,
      Imagem: ''
    })

    const loading = ref(false)
    const valorFormatado = ref('')
    const fileInput = ref(null)

    // Computed properties
    const isEditMode = computed(() => !!route.params.id)
    const currencyConfig = computed(() => getCurrencyConfig(locale.value))

    // Computed para preview da imagem
    const imagemPreview = computed(() => {
      if (form.value.ImagemFile) {
        return URL.createObjectURL(form.value.ImagemFile)
      }
      return form.value.Imagem || null
    })

    // Métodos
    async function carregarMaterial() {
      const materialId = route.params.id
      if (materialId) {
        try {
          const material = await store.getMaterialById(materialId)
          if (material) {
            form.value = { ...material, ImagemFile: null }
            valorFormatado.value = formatCurrency(material.PrecoUnitario, locale.value, currencyConfig.value.currency)
          }
        } catch (error) {
          console.error('Erro ao carregar material:', error)
          $q.notify({
            type: 'negative',
            message: t('forms.material.messages.loadError')
          })
        }
      }
    }

    // Função para lidar com a entrada do valor
    function onValorInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency)
      valorFormatado.value = masked
      form.value.PrecoUnitario = parseCurrency(masked)
    }

    function onImageRejected() {
      $q.notify({
        type: 'negative',
        message: t('forms.material.messages.imageTooBig')
      })
    }

    function removerImagem() {
      form.value.ImagemFile = null
      form.value.Imagem = ''
    }

    function abrirSeletorImagem() {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    function onFileSelected(event) {
      const file = event.target.files[0]
      if (file) {
        // Validar tamanho do arquivo (5MB)
        if (file.size > 5242880) {
          onImageRejected()
          return
        }
        form.value.ImagemFile = file
      }
    }

    async function processarImagem() {
      if (form.value.ImagemFile) {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            form.value.Imagem = e.target.result
            resolve()
          }
          reader.readAsDataURL(form.value.ImagemFile)
        })
      }
    }

    async function salvarMaterial() {
      loading.value = true
      try {
        // Processar imagem se houver
        await processarImagem()

        // Criar ou atualizar material
        const materialData = {
          Id: form.value.Id,
          Descricao: form.value.Descricao,
          Unidade: form.value.Unidade,
          PrecoUnitario: form.value.PrecoUnitario,
          Url: form.value.Url,
          Imagem: form.value.Imagem
        }

        if (isEditMode.value) {
          await store.updateMaterial(materialData)
          $q.notify({
            type: 'positive',
            message: t('forms.material.messages.updateSuccess')
          })
        } else {
          await store.addMaterial(materialData)
          $q.notify({
            type: 'positive',
            message: t('forms.material.messages.saveSuccess')
          })
        }

        router.push('/materiais')
      } catch (error) {
        console.error('Erro ao salvar material:', error)
        $q.notify({
          type: 'negative',
          message: isEditMode.value
            ? t('forms.material.messages.updateError')
            : t('forms.material.messages.saveError')
        })
      } finally {
        loading.value = false
      }
    }

    function cancelar() {
      router.push('/materiais')
    }

    onMounted(async () => {
      await carregarMaterial()
    })

    return {
      // Estado
      form,
      loading,
      valorFormatado,

      // Computed
      isEditMode,
      currencyConfig,
      imagemPreview,

      // Métodos
      onValorInput,
      onImageRejected,
      onFileSelected,
      removerImagem,
      abrirSeletorImagem,
      salvarMaterial,
      cancelar,

      // Refs
      fileInput
    }
  }
})
</script>

<style lang="sass">
.accent-divider
  height: 2px
  background: $accent
  width: 100%
</style>
