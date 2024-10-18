import { createHotContext } from '../../node_modules/vite/dist/client/client.mjs.js';
import '../../node_modules/.vite/deps/vue.js';
import './Index.vue.style.0.js';
import _export_sfc from '../../plugin-vue-export-helper.js';
import { defineComponent, openBlock, createElementBlock } from '../../node_modules/.vite/deps/chunk-ZDGEXHLC.js';

import.meta.hot = createHotContext("/src/content/Index.vue.js");const _sfc_main = defineComponent({
  __name: "Index",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("main", null, " content Page ");
}
_sfc_main.__hmrId = "6c7d7293";
typeof __VUE_HMR_RUNTIME__ !== "undefined" && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main);
import.meta.hot.accept(({ default: updated, _rerender_only }) => {
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render);
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated);
  }
});
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6c7d7293"], ["__file", "D:/CaWorkSpace/my/code/script/chromePlugins/meta-tab/src/content/Index.vue"]]);

export { App as default };
