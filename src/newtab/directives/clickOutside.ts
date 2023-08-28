/*
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-07-21 12:20:35
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-07-21 14:06:51
 * @Description: 点击元素区域外 指令
 */

import { DirectiveBinding, ObjectDirective } from 'vue'
const vClickOutside: ObjectDirective = {
    mounted: (el: any, binding: DirectiveBinding) => {
        function handler(e: any) {

            var elements = e.path || (e.composedPath && e.composedPath())
            elements && elements.length > 0 && elements.unshift(e.target)

            if (el.contains(e.target)) return

            el.__vueClickOutside__.callback(e)
        }

        el.__vueClickOutside__ = {
            handler: handler,
            callback: binding.value
        }
        const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        document.addEventListener(clickHandler, handler)
    },

    updated: function (el: any, binding: DirectiveBinding) {
        el.__vueClickOutside__.callback = binding.value
    },

    unmounted: function (el: any) {
        const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        el.__vueClickOutside__ && document.removeEventListener(clickHandler, el.__vueClickOutside__.handler)
        delete el.__vueClickOutside__
    }
}

export default vClickOutside