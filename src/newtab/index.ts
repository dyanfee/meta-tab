/*
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-07-17 15:14:56
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-08-28 09:34:47
 * @Description: 
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './NewTab.vue'
import registerComponets from './components'
import registerDirectives from './directives'
const pinia = createPinia()
const app = createApp(App)

// 注册全局基础组件
registerComponets(app)
// 注册全局指令
registerDirectives(app)


app.use(pinia)
app.mount('#app')
