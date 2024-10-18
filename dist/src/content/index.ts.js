import '../../node_modules/.vite/deps/vue.js';
import App from './Index.vue.js';
import { createApp } from '../../node_modules/.vite/deps/chunk-ZDGEXHLC.js';

const root = document.createElement("div");
root.id = "meta-content-root";
document.body.append(root);
const app = createApp(App);
app.mount(root);
