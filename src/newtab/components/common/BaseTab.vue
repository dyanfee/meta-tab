<template>
    <div class='tab-content' :style="tabStyle">
        <div :class="`tab-item ${activeItem === item.value ? 'active' : ''}`" :style="itemStyle" v-for="item in tabList"
            :key="item.value" @click="onClickTab(item)">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const props = defineProps({
    tabList: {
        type: Array<{ name: string, value: string }>,
        default: () => []
    },
    width: String,
    activeIndex: String
})
const emit = defineEmits(['onChange'])

const activeItem = ref(props.tabList[0]?.value)
watch(() => props.activeIndex, (val) => {
    if (val && val != activeItem.value) {
        activeItem.value = val
    }
})
const tabStyle = computed(() => {
    return {
        width: props.width || ''
    }
})
const itemStyle = computed(() => {
    let width = '100px'
    if (props.width && props.tabList.length) {
        width = `calc(100% / ${props.tabList.length})`
    }
    return {
        width
    }
})


function onClickTab(item: Record<string, string>) {
    activeItem.value = item.value
    emit('onChange', item)
}


</script>

<style lang="less" scoped>
.tab-content {
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    border-radius: 8px;
    background-color: #00000030;
    padding: 2px;

    .tab-item {
        line-height: 28px;
        padding: 0 12px;
        max-width: 18vw;
        text-align: center;
        color: #fff;
        letter-spacing: 2px;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;

        &.active {
            background-color: #fff;
            color: #000;
        }
    }
}
</style>