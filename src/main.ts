import { createApp } from 'vue'

import App from './App.vue'

// reset style sheet
import '@/styles/reset.scss'

// CSS common style sheet
import '@/styles/common.scss'

// iconfont
import '@/styles/iconfont.scss'

// el-message el-message-box css
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/tree/style/css'

import router from '@/routers'

import pinia from '@/stores'

createApp(App).use(router).use(pinia).mount('#app')
