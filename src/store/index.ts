import { createPinia } from "pinia"
/** 数据持久化存储 */
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPersist)

export default store
