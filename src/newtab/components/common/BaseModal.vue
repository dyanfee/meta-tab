<!--
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-07-25 16:00:12
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-08-16 11:11:48
 * @Description: 基础弹窗
-->
<template>
  <Teleport to="body">
    <div class="mask" v-if="mask && value" @click="onSetShow(false)"></div>
    <div class="meta-modal" v-if="value" :style="modalStyle">
      <div class="meta-content">
        <div class="header" :onmousedown="onMouseDown" :onmouseup="onMouseUp">
          <div class="title">
            <slot name="title">
              <span class="title-text">{{ title }}</span>
            </slot>
          </div>
          <div class="action">
            <i class="iconfont icon-closeround" :onmousedown="onPrevent" @click.stop="onSetShow(false)"></i>
          </div>
        </div>
        <div class="body" :style="`height: ${height};`">
          <slot> </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, toRef, watch } from 'vue'

const modalStyle = ref<Record<string, string | number>>({})
const moveData = reactive({
  isMove: false,
  x: 0,
  y: 0,
})

const emit = defineEmits(['update:value'])

const props = defineProps<{
  value: boolean
  mask?: boolean
  // 是否可移动位置
  moveAble?: boolean
  title?: string
  height?: string
}>()

const show = toRef(props, 'value')

onMounted(() => {
  if (props.moveAble) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
})

watch(show, () => {
  if (show) {
    resetPosition()
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})

function onPrevent(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}

function onMouseDown(e: MouseEvent) {
  moveData.isMove = true
  moveData.x = e.offsetX
  moveData.y = e.offsetY
}
function onMouseMove(e: MouseEvent) {
  if (moveData.isMove) {
    modalStyle.value = {
      top: `${e.y - moveData.y}px`,
      left: `${e.x - moveData.x}px`,
      transform: 'none',
    }
  }
}

function onMouseUp() {
  moveData.isMove = false
}

function onSetShow(show: boolean) {
  emit('update:value', show)
}

function resetPosition() {
  modalStyle.value = {
    top: '15vh',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}
</script>

<style lang="less" scoped>
.meta-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);

  .meta-content {
    background-color: #fff;
    width: 768px;
    max-width: 80vw;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #f8f8f8;

    .header {
      width: 100%;
      height: 56px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      background-color: #fff;

      .title {
        max-width: calc(100% - 100px);
        user-select: none;
        pointer-events: none;
      }

      .action {
        position: absolute;
        left: 20px;

        .iconfont {
          font-size: 12px;
          line-height: 12px;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          position: relative;
          display: inline-block;
          color: #fff;

          &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s;
            opacity: 0;
          }

          &:hover {
            &::before {
              opacity: 1;
            }
          }
        }

        .icon-closeround {
          background-color: #ff5930;
        }
      }
    }

    .body {
      padding: 20px;
    }
  }

}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
