// import "./imgTool"

import { createApp } from 'vue'
import App from './Index.vue'

const root = document.createElement('div')
root.id = 'meta-content-root'
document.body.append(root)

const app = createApp(App)
app.mount(root)