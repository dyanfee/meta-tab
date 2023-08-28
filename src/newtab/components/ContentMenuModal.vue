<!--
 * @Author: yanfee
 * @Date: 2023-08-12 09:12:05
 * @LastEditTime: 2023-08-16 16:28:17
 * @Description: 右键菜单
-->
<template>
  <Transition name="fade">
    <section class="meta-content-menu" ref="menuRef" v-show="commonStore.contentMenuInfo.show" :style="menuStyle">
      <div class="menu-item" v-for="item in commonStore.contentMenuInfo.content" :key="item.label"
        @click.stop="onClickMenu(item)">
        <span class="label">{{ item.label }}</span>
        <span class="desc" v-if="item.desc">{{ item?.desc }}</span>
      </div>
    </section>
  </Transition>
</template>
<script setup lang="ts">
import { useCommon } from '../store'
import MyEvent from '@/lib/event'
import { IContentEvent } from '@/constants'
import { watch, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const commonStore = useCommon()
const menuStyle = reactive({ top: '0px', left: '0px' })
const menuRef = ref<HTMLElement>()
const windowContextMenuInfo = [
  {
    label: '随机壁纸',
    event: 'randomPaper',
  },
  {
    label: '必应每日壁纸',
    event: 'bingPaper',
  },
  {
    label: '下载壁纸',
    event: 'downloadPaper',
  }
]


function coustomContentMenu(e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  setTimeout(() => {
    // 计算显示位置
    const maxWidth = document.body.clientWidth - (menuRef.value?.offsetWidth || 0)
    const maxHeight = document.body.clientHeight - (menuRef.value?.offsetWidth || 0)
    menuStyle.left = Math.min(maxWidth, e.clientX) + 'px'
    menuStyle.top = Math.min(maxHeight, e.clientY) + 'px'
  }, 0)
  menuStyle.left = '9999px'
  menuStyle.top = '9999px'
  commonStore.contentMenuInfo.show = true
}

function onClickMenu(item: IContentEvent) {
  commonStore.contentMenuInfo.show = false
  if (item.event) {
    MyEvent.$emit(item.event)
  }
  if (item.callback) {
    item.callback(...(item?.data || []))
  }
}
function hide() {
  commonStore.contentMenuInfo.show = false
}
// watch(() => commonStore.contentMenuInfo.show, (val) => {
//   if (val) {
//     coustomContentMenu()
//   }
// })
function windowMenu(e: MouseEvent) {
  commonStore.contentMenuInfo.content = [...windowContextMenuInfo]
  coustomContentMenu(e)
}

onMounted(() => {
  MyEvent.$on('showContextMenu', coustomContentMenu)
  document.body.addEventListener('contextmenu', windowMenu)
  document.body.addEventListener('click', hide)
  window.onresize = () => {
    hide()
  }
})
onBeforeUnmount(() => {
  MyEvent.$remove('showContextMenu', coustomContentMenu)
  document.body.removeEventListener('contextmenu', coustomContentMenu)
  document.body.removeEventListener('click', hide)
})
</script>
<style lang="less" scoped>
.meta-content-menu {
  padding: 8px;
  background-color: #fff;
  display: inline-block;
  width: fit-content;
  border-radius: 10px;
  position: fixed;
  z-index: 9;

  .menu-item {
    display: flex;
    padding: 0 12px;
    line-height: 32px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .label {
      font-size: 12px;
      color: #333;
      font-weight: bold;
      flex-shrink: 0;
    }

    .desc {
      margin-left: 40px;
      font-size: 10px;
      color: #777;
      flex-shrink: 0;
    }

    &+.menu-item {
      margin-top: 4px;
    }
  }
}
</style>
