import type { App, Directive } from 'vue'
import clickOutside from './clickOutside'
const directives: {
    [propName: string]: Directive
} = {
    "clickOutside": clickOutside
}


const registerDirectives = (app: App<Element>) => {
    for (let item in directives) {
        app.directive(item, directives[item])
    }
}

export default registerDirectives