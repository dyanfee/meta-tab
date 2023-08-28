<template>
    <div class="meta-input">
        <div v-if="icon" class="meta-input-icon">
            <i :class="`iconfont ${icon}`"></i>
        </div>
        <textarea :class="['meta-textarea-inner', icon ? 'show-icon' : '', clear ? 'show-close' : '']" v-if="isTextArea"
            :placeholder="placeholder" v-model="value" @focus="onFocus" @blur="isFocus = false" v-bind="$attrs"></textarea>
        <input v-else :class="['meta-input-inner', icon ? 'show-icon' : '', clear ? 'show-close' : '']" :type="type"
            :placeholder="placeholder" v-model="value" @focus="onFocus" @blur="isFocus = false" v-bind="$attrs">
        <Transition name="scale">
            <div v-show="clear && isFocus" class="meta-input-close" @click="clearInput">
                <i class="iconfont icon-roundclosefill"></i>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps({
    type: String,
    placeholder: String,
    icon: String,
    clear: Boolean,
    modelValue: String,


})
const emit = defineEmits(['update:modelValue'])
const isFocus = ref(false)

const isTextArea = computed(() => props.type === 'textarea')
const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
function onFocus() {
    isFocus.value = true
}
function clearInput() {
    value.value = ''
}
</script>
<style lang="less" scoped>
.meta-input {
    display: flex;
    background-color: #00000010;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    color: #666;

    .meta-textarea-inner {
        resize: none;
        height: 100%;
    }

    .meta-input-inner {}

    .meta-textarea-inner,
    .meta-input-inner {
        border: none;
        background-color: #fff;
        outline: none;
        background-color: transparent;
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        padding: 12px;
        color: #323232;
    }

    .show-icon {
        padding-left: 40px;
    }

    .meta-input-icon {
        position: absolute;
        top: 12px;
        left: 10px;
    }

    .show-close {
        padding-right: 40px;
    }

    .meta-input-close {
        position: absolute;
        bottom: 12px;
        right: 10px;
        color: #333;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }
    }
}
</style>


