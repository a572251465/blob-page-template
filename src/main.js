import { createApp } from 'vue'
import elementPlus from 'element-plus'
import App from './App.vue'

// 引用共同的样式
import "./assets/css/common.css"
import "./assets/css/markdown/markdown.css"
import "./assets/css/markdown/markdown-dark.css"
import "element-plus/dist/index.css"

createApp(App).use(elementPlus).mount('#app')
