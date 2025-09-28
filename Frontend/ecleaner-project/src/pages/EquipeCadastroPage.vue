<template>
  <q-page padding>
    <!-- Cabeçalho -->
    <div class="row items-center q-mb-md">
      <div class="col-12">
        <div class="text-h5 text-secondary q-mb-md">{{ isEdit ? $t('pages.equipeForm.titleEdit') :
          $t('pages.equipeForm.titleNew') }}
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Descrição da Equipe -->
      <q-input v-model="form.descricao" :label="$t('pages.equipeForm.fields.descricao')"
        :rules="[val => !!val || $t('validations.required')]" outlined />

      <!-- Seção de Membros da Equipe -->
      <div class="q-mt-lg">
        <div class="row items-center q-mb-md">
          <div class="col">
            <div class="text-h6 text-primary">{{ $t('pages.equipeForm.sections.membros') }}</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="add" :label="$t('pages.equipeForm.buttons.addMembro')" @click="adicionarMembro"
              outline />
          </div>
        </div>

        <!-- Cards de Colaboradores -->
        <div v-for="(colaboradorEquipe, index) in form.colaboradoresEquipe" :key="`colaborador-${index}`">
          <ColaboradorEquipeCard v-model="form.colaboradoresEquipe[index]" :index="index" :colaboradores="colaboradores"
            :colaboradores-ja-selecionados="colaboradoresJaSelecionados" @remove="removerMembro(index)" />
        </div>

        <!-- Mensagem quando não há membros -->
        <div v-if="form.colaboradoresEquipe.length === 0" class="text-center q-pa-md text-grey-6">
          <q-icon name="group" size="3rem" class="q-mb-md" />
          <div class="text-body1">{{ $t('pages.equipeForm.messages.noMembers') }}</div>
          <div class="text-caption">{{ $t('pages.equipeForm.messages.addFirstMember') }}</div>
        </div>
      </div>

      <!-- Botões -->
      <div class="row justify-end q-gutter-sm">
        <q-btn :label="$t('pages.equipeForm.buttons.cancel')" color="negative" flat :to="'/equipes'" />
        <q-btn :label="$t('pages.equipeForm.buttons.save')" color="primary" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import equipeRepository from '@/core/infrastructure/repositories/equipeRepository'
import colaboradorRepository from '@/core/infrastructure/repositories/colaboradorRepository'
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

    // Estado
    const form = ref({
      descricao: '',
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
        const membrosValidos = form.value.colaboradoresEquipe.filter(ce => ce && ce.Colaborador && ce.Funcao)

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

        // Adiciona os membros válidos
        membrosValidos.forEach(colaboradorEquipe => {
          equipe.adicionarColaborador(colaboradorEquipe)
        })

        await equipeRepository.save(equipe)

        $q.notify({
          type: 'positive',
          message: t('pages.equipeForm.messages.saveSuccess')
        })

        router.push('/equipes')
      } catch (error) {
        console.error('Erro ao salvar equipe:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.equipeForm.messages.saveError')
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
