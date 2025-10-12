<template>
  <div class="ecleaner-card-container">
    <q-card class="ecleaner-card cursor-pointer bg-primary" @click="handleClick" flat>
      <q-card-section>
        <q-item>
          <q-icon :name="icon" size="9rem" class="text-white" />
        </q-item>

        <q-item-label class="text-h6 text-white text-center">
          {{ label }}
        </q-item-label>

      </q-card-section>
    </q-card>
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
.ecleaner-card-container
  margin: 1px

.ecleaner-card
  border-radius: 12px
  transition: all 0.3s ease
  aspect-ratio: 1 / 1
  display: flex
  flex-direction: column
  width: 200px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)

  &:hover
    transform: translateY(-8px)
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)

  .q-card-section
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1

</style>
