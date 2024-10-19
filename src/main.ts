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
// el-tree css
import 'element-plus/es/components/tree/style/css'
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark css
import '@/styles/element-dark.scss'

import router from '@/router'

import pinia from '@/store'

createApp(App).use(router).use(pinia).mount('#app')
