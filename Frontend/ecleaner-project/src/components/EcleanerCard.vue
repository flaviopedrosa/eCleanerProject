<template>
  <div class="ecleaner-card-wrapper">
    <div class="ecleaner-card-container">
      <q-card :class="`ecleaner-card cursor-pointer ${backgroundClass}`" @click="handleClick" flat>
        <q-card-section>
          <q-item>
            <q-icon :name="icon" class="card-icon text-white" />
          </q-item>

          <q-item-label class="card-label text-white text-center">
            {{ label }}
          </q-item-label>

        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'EcleanerCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  setup(props) {
    const router = useRouter()

    const handleClick = () => {
      router.push(props.url)
    }

    const iconColor = `text-${props.color}`
    const backgroundClass = `bg-${props.color}`

    return {
      handleClick,
      iconColor,
      backgroundClass
    }
  }
})
</script>

<style lang="sass" scoped>
.ecleaner-card-wrapper
  .ecleaner-card-container
    margin: 2px
    padding: 0


  .ecleaner-card.q-card
    border-radius: 12px !important
    transition: all 0.3s ease
    aspect-ratio: 1 / 1
    display: flex !important
    flex-direction: column !important
    width: 140px !important
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important
    padding: 0 !important

    // Garantir que tenha background roxo sempre
    &.bg-purple
      background: #9c27b0 !important

    // Sobrescrever especificamente o CSS global problemático


    &:hover
      transform: translateY(-8px)
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2) !important

  .ecleaner-card.q-card .q-card-section
    display: flex !important
    flex-direction: column !important
    justify-content: center !important
    align-items: center !important
    flex: 1
    padding: 8px !important



  .ecleaner-card.q-card .card-icon
    font-size: 4.5rem !important


  .ecleaner-card.q-card .card-label
    font-size: 0.95rem !important
    font-weight: 500
    margin-top: 6px



</style>
