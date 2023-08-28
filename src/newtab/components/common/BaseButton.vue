<template>
    <div :class="classList">
        <button class="meta-button-innner">
            <slot></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({ type: String, plain: Boolean })

const classList = computed(() => {
    return ['meta-button', props.plain ? 'meta-button-plain' : '']
})

</script>

<style lang="less" scoped>
.meta-button-innner {
    border: none;
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 100%;
    background-color: unset;
    color: inherit;
    padding: unset;

}

.meta-button {
    height: 28px;
    padding: 0px 16px;
    background-color: var(--primary);
    color: #fff;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
        opacity: 0.8;
    }
}

.meta-button-plain {
    background-color: unset;
    border: 1px solid var(--primary);
    color: var(--primary);

    &:hover {
        opacity: 1;
        background-color: var(--primary);
        border-color: var(--primary);
        color: #fff;
    }
}
</style>