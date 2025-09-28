import { Notify } from 'quasar'

// Adiciona o plugin de notificações ao Quasar
export default ({ app }) => {
  app.config.globalProperties.$notify = Notify.create
}
