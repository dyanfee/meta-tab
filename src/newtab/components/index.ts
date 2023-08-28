import type { Component, App } from 'vue'
import SearchComponent from './modules/SearchComponent/SearchComponent.vue'
import SearchComponentEdit from './modules/SearchComponent/SearchComponentEdit.vue'
import SimpleComponent from './modules/SimpleComponent/index.vue'

import Icon from './common/BaseIcon.vue'
import Button from './common/BaseButton.vue'
import Tab from './common/BaseTab.vue'
import Input from './common/BaseInput.vue'

const components: {
    [propName: string]: Component
} = {
    // modules
    SearchComponent,
    SearchComponentEdit,
    SimpleComponent,
    
    // common
    Button,
    Icon,
    Tab,
    Input
}


const registerComponets = (app: App<Element>) => {
    for (let item in components) {
        app.component(item, components[item])
    }
}

export default registerComponets