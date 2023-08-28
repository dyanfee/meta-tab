<!--
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-07-27 15:49:25
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-08-08 13:44:33
 * @Description: 
-->
<template>
  <Teleport to="body">
    <Transition name="drawer" :duration="300">
      <section class="meta-drawer" v-show="modelValue">
        <div class="mask" @click="onClose"></div>
        <section class="meta-drawer-content" :style="`width: ${width}`" @click.stop>
          <slot></slot>
        </section>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  width: {
    type: String,
    default: '400px'
  }
})
const emit = defineEmits(['update:modelValue'])


function onClose() {
  emit('update:modelValue', false)
}

</script>

<style lang="less" scoped>
.meta-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .meta-drawer-content {
    width: 25%;
    max-width: 100vw;
    height: 100%;
    background-color: #ffffffaa;
    padding: 20px;
    backdrop-filter: blur(40px);
  }

}
</style>