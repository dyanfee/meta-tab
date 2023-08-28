<template>
    <section :class="['meta-icon', focus ? 'meta-icon-hover' : '']"
        :style="{ borderRadius: (radius ? `${radius}px` : ''), padding: iconPadding, backgroundColor: icon.background ?? '' }">
        <div class="img-icon" v-if="icon.type === META_ICON_TYPE.IMAGE || icon.url" :style="imageStyle"></div>
        <div class="char-icon" v-else-if="icon.type === META_ICON_TYPE.CHAR || icon.char" :style="fontIconStyle">
            {{ icon.char }}
        </div>
        <div :class="['svg-icon', 'iconfont', icon.iconfont]" :style="{ fontSize: iconSize }"
            v-else-if="icon.type === META_ICON_TYPE.ICONFONT || icon.iconfont"></div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, toRef, watch, ref } from 'vue';
import { META_ICON_TYPE, IMetaIcon, ACTION_TYPE } from '@/constants'
const ICON_SIZE: Record<string, string> = {
    small: '24px',
    middle: '48px',
    large: '72px'
}

const props = defineProps<{
    data: IMetaIcon
    size?: string
    radius?: string
    focus?: boolean
    actionType?: ACTION_TYPE
    padding?: string
}>()
const icon = toRef(props, "data")


const imageStyle = computed(() => {
    let tmp: Record<string, string> = {
        width: iconSize.value,
        height: iconSize.value,
    }
    if (icon.value.url) {
        tmp.backgroundImage = `url('${icon.value.url}')`
        tmp.backgroundSize = "cover"
    }
    return { ...tmp }
})



const iconSize = computed(() => {
    if (props.size) {
        if (props.size in ICON_SIZE) {
            return ICON_SIZE[props.size]
        }
        return ~props.size.indexOf('px') ? props.size : `${props.size}px`
    }
    return ICON_SIZE.small
})
const iconPadding = computed(() => {
    if (props.padding) {
        return ~props.padding.indexOf('px') ? props.padding : `${props.padding}px`
    }
    const size = Number(iconSize.value.replace('px', ''))
    let val = Math.floor(size / 12) + 2
    if (size <= 24) val = 2
    return `${val}px`
})

const fontIconStyle = computed(() => {
    const size = iconSize.value
    const len = props.data.char?.length ?? 0
    const sn = Number(size.replace('px', ''))
    const fontsize = Math.max(Math.floor(sn / 2), 12)
    const offset = Math.floor(sn / 4) + 2
    const tmp = {
        width: size,
        height: size,
        fontSize: `${fontsize + (len == 1 ? offset : 0)}px`
    }
    return tmp
})





</script>
<style lang="less" scoped>
.meta-icon {
    display: inline-block;
    overflow: hidden;
    border-radius: 8px;
    flex-shrink: 0;

    &-hover,
    &:hover {
        background-color: rgba(var(--color-white) / var(--bg-opacity));
    }

    .char-icon {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }
}
</style>

