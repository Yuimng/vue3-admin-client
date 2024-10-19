import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// pinia persist
pinia.use(piniaPluginPersistedstate)

export default pinia
