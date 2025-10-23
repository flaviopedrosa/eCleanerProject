<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon name="groups" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEdit ? $t('pages.equipeForm.titleEdit') : $t('pages.equipeForm.titleNew') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ isEdit ? $t('pages.equipeForm.editSubtitle') : $t('pages.equipeForm.createSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Dados Básicos da Equipe -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="info" class="q-mr-sm" />
            {{ $t('pages.equipeForm.sections.basicInfo') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="form.descricao" :label="$t('pages.equipeForm.fields.descricao')" lazy-rules
                :rules="[val => !!val || $t('validations.required')]" filled />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Seção de Membros da Equipe -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="text-h6 text-primary">
              <q-icon name="group" class="q-mr-sm" />
              {{ $t('pages.equipeForm.sections.membros') }}
            </div>
            <q-space />
            <q-btn color="primary" icon="add" :label="$t('pages.equipeForm.buttons.addMembro')" @click="adicionarMembro"
              size="sm" />
          </div>

          <!-- Estado vazio -->
          <div v-if="form.colaboradoresEquipe.length === 0" class="text-center text-grey-6 q-py-lg">
            <q-icon name="group" size="48px" class="q-mb-md" />
            <div class="text-body1">{{ $t('pages.equipeForm.messages.noMembers') }}</div>
            <div class="text-caption">{{ $t('pages.equipeForm.messages.addFirstMember') }}</div>
          </div>

          <!-- Cards de Colaboradores -->
          <div v-for="(colaboradorEquipe, index) in form.colaboradoresEquipe" :key="`colaborador-${index}`"
            class="q-mb-md">
            <ColaboradorEquipeCard v-model="form.colaboradoresEquipe[index]" :index="index"
              :colaboradores="colaboradores" :colaboradores-ja-selecionados="colaboradoresJaSelecionados"
              @remove="removerMembro(index)" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Campo de Observações -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="notes" class="q-mr-sm" />
            {{ $t('pages.equipeForm.sections.observacoes') }}
          </div>

          <q-editor v-model="form.observacoes" :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'underline', 'strike'],
            ['undo', 'redo'],
            [
              {
                label: 'Formato',
                icon: 'format_size',
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
              }
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['link', 'removeFormat'],
            ['fullscreen']
          ]" :fonts="{
            montserrat: 'Montserrat',
            open_sans: 'Open Sans',
            roboto: 'Roboto',
            source_code_pro: 'Source Code Pro',
            playfair_display: 'Playfair Display'
          }" min-height="200px" :placeholder="$t('pages.equipeForm.placeholders.observacoes')" />
        </q-card-section>
      </q-card>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end">
        <q-btn flat :label="$t('pages.equipeForm.buttons.cancel')" @click="$router.push('/equipes')" />
        <q-btn color="primary" :label="isEdit ? $t('buttons.update') : $t('pages.equipeForm.buttons.save')"
          type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { EquipeRepository } from '@/core/infrastructure/repositories/equipeRepository'
import { ColaboradorRepository } from '@/core/infrastructure/repositories/colaboradorRepository'
import { Equipe } from '@/core/domain/entities/equipe'
import ColaboradorEquipeCard from '@/components/ColaboradorEquipeCard.vue'

export default defineComponent({
  name: 'EquipeCadastroPage',

  components: {
    ColaboradorEquipeCard
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const { t } = useI18n()
    const $q = useQuasar()

    // Repositórios
    const equipeRepository = new EquipeRepository()
    const colaboradorRepository = new ColaboradorRepository()

    // Estado
    const form = ref({
      descricao: '',
      observacoes: '',
      colaboradoresEquipe: []
    })

    const colaboradores = ref([])
    const isEdit = computed(() => !!route.params.id)

    // Lista de colaboradores já selecionados (para evitar duplicatas)
    const colaboradoresJaSelecionados = computed(() => {
      return form.value.colaboradoresEquipe
        .filter(ce => ce && ce.Colaborador)
        .map(ce => ce.Colaborador.Id)
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
          form.value = {
            descricao: equipe.Descricao,
            observacoes: equipe.Observacoes || '',
            colaboradoresEquipe: [...equipe.Colaboradores]
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

    // Adiciona um novo membro à equipe
    const adicionarMembro = () => {
      form.value.colaboradoresEquipe.push(null)
    }

    // Remove um membro da equipe
    const removerMembro = (index) => {
      if (index > 0) { // Não permite remover o primeiro membro
        form.value.colaboradoresEquipe.splice(index, 1)
      }
    }

    // Salva a equipe
    const onSubmit = async () => {
      try {
        // Valida se há pelo menos um membro válido
        const membrosValidos = form.value.colaboradoresEquipe.filter(ce => ce && ce.Colaborador && ce.Funcoes && ce.Funcoes.length > 0)

        if (membrosValidos.length === 0) {
          $q.notify({
            type: 'negative',
            message: t('pages.equipeForm.messages.noValidMembers')
          })
          return
        }

        const equipe = new Equipe()
        if (isEdit.value) {
          equipe.Id = route.params.id
        }
        equipe.Descricao = form.value.descricao
        equipe.Observacoes = form.value.observacoes

        // Adiciona os membros válidos
        membrosValidos.forEach(colaboradorEquipe => {
          equipe.adicionarColaborador(colaboradorEquipe)
        })

        await equipeRepository.save(equipe)

        $q.notify({
          type: 'positive',
          message: isEdit.value ? t('messages.updateSuccess') : t('messages.saveSuccess'),
          timeout: 3000,
          position: 'top-right'
        })

        // Aguardar um pouco antes de navegar para mostrar a mensagem
        setTimeout(() => {
          router.push('/equipes')
        }, 1500)

      } catch (error) {
        console.error('Erro ao salvar equipe:', error)
        $q.notify({
          type: 'negative',
          message: t('messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      }
    }

    // Inicialização
    onMounted(async () => {
      await loadColaboradores()
      if (isEdit.value) {
        await loadEquipe(route.params.id)
      } else {
        // Adiciona o primeiro membro automaticamente
        adicionarMembro()
      }
    })

    return {
      form,
      colaboradores,
      colaboradoresJaSelecionados,
      adicionarMembro,
      removerMembro,
      onSubmit,
      isEdit
    }
  }
})
</script>
