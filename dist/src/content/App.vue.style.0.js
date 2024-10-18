import { createHotContext, updateStyle, removeStyle } from '../../node_modules/vite/dist/client/client.mjs.js';

import.meta.hot = createHotContext("/src/content/App.vue.style.0.js");const __vite__id = "D:/CaWorkSpace/my/code/script/chromePlugins/meta-tab/src/content/App.vue?vue&type=style&index=0&scoped=true&lang.css";
const __vite__css = "\nmain[data-v-36447aa2] {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background: red;\r\n  z-index: 999999;\n}\r\n";
updateStyle(__vite__id, __vite__css);
import.meta.hot.accept();
import.meta.hot.prune(() => removeStyle(__vite__id));

export { __vite__css as default };
