import { Notify, Dialog } from 'quasar'

// Adiciona os plugins do Quasar
export default ({ app }) => {
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$dialog = Dialog.create
}
