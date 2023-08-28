<!--
 * @Author: yanfee duyf@changan.com.cn
 * @Date: 2023-07-27 15:54:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-09 20:03:52
 * @Description: 链接属性编辑器
-->
<template>
  <Drawer :modelValue="modelValue" @update:modelValue="setCloseDrawer" v-bind="$attrs">
    <div class="header">
      <div class="left">
        <i class="iconfont icon-iosarrowback" @click="setCloseDrawer(false)"></i>
        <span class="title">{{ title }}</span>
      </div>
      <div class="action">
        <Button @click="onSubmit">完成</Button>
      </div>
    </div>
    <div class="content">
      <Input
        class="link-input"
        placeholder="请输入搜索引擎地址，并以%s替代搜索关键字"
        v-model="editData.link"
        type="textarea"
        icon="icon-link"
        clear
        rows="4"
      ></Input>
      <Input class="link-input" maxlength="32" v-model="editData.name" placeholder="请输入名称" icon="icon-creditcard" clear></Input>
      <div class="icon-area">
        <Tab :tabList="tabList" :activeIndex="curIndex" @onChange="onChangeTab" width="100%"></Tab>
        <div class="icon-attr">
          <template v-if="curIndex == tabTypes.ONLINE">
            <img :src="searchIcon" alt="" />
          </template>
          <template v-else-if="curIndex == tabTypes.TEXT">
            <div class="icon-pre">
              <Icon :data="charIcon" size="middle" />
            </div>
            <div class="show-colors">
              <i class="color-btn" @click="onCheckColor(item)" v-for="item in colorList" :key="item" :style="`background-color: ${item};`">
              </i>
              <!-- 自定义颜色 -->
              <i class="color-btn" style="background: conic-gradient(red, yellow, lime, aqua, blue, fuchsia, red)">
                <input type="color" @input="onPickColorChange" />
              </i>
            </div>
            <Input class="color-input" v-model="charIcon.char" maxlength="2" placeholder="请输入图标文字" icon="icon-text" clear></Input>
          </template>
          <template v-else-if="curIndex == tabTypes.LINK">
            <Input class="img-input" v-model="imgIcon.url" placeholder="请输入图标链接" icon="icon-link" clear></Input>
          </template>
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Drawer from './common/BaseDrawer.vue'
import { IEngineData, IMetaIcon, META_ICON_TYPE } from '@/constants'
import { ArrayBufferToBase64, deepClone } from '@/utils'
import { useEngineStore } from '../store'
const props = defineProps({
  modelValue: Boolean,
  path: String,
  data: Object,
  title: String,
})
const emit = defineEmits(['update:modelValue'])
enum tabTypes {
  ONLINE = 'online',
  TEXT = 'text',
  LINK = 'link',
}
const tabList = [
  // {
  //   name: '在线',
  //   value: tabTypes.ONLINE
  // },
  {
    name: '文字',
    value: tabTypes.TEXT,
  },
  {
    name: '链接',
    value: tabTypes.LINK,
  },
]
const colorList = [
  '#845EC2',
  '#D65DB1',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
  '#0081CF',
  '#008E9B',
  '#008F7A',
  '#FBEAFF',
  '#C34A36',
  '#B0A8B9',
  '#926C00',
  '#47593C',
  '#0059A8',
  '#848CE8',
  '#354A6F',
  '#56423E',
  '#170000',
]
const engineStore = useEngineStore()
const curIndex = ref(tabList[0]?.value)

const searchIcon = ref('')
const charIcon = ref<IMetaIcon>({
  type: META_ICON_TYPE.CHAR,
})
const imgIcon = ref<IMetaIcon>({
  type: META_ICON_TYPE.IMAGE,
})

const editData = ref<IEngineData>({})
onMounted(() => {
  editData.value = deepClone(props.data) ?? {}
  initTextIcon()
})
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const iconType = props?.data?.icon?.type
      if (iconType == META_ICON_TYPE.IMAGE || props?.data?.icon?.url) {
        imgIcon.value = deepClone(props?.data?.icon)
        curIndex.value = tabTypes.LINK
      } else {
        charIcon.value = deepClone(props?.data?.icon || { type: META_ICON_TYPE.CHAR })
        curIndex.value = tabTypes.TEXT
      }
      if (!editData.value?.id || editData.value?.id != props?.data?.id) {
        editData.value = deepClone(props.data) ?? {}
        initTextIcon()
      }
    }
  }
)

function setCloseDrawer(ev = false) {
  emit('update:modelValue', ev)
}
function onChangeTab(val: Record<string, any>) {
  curIndex.value = val.value
}
function initTextIcon() {
  const idx = Math.floor(Math.random() * 19)
  charIcon.value.background = colorList[idx]
}
function onCheckColor(color: string) {
  charIcon.value.background = color
}
function onPickColorChange(event: any) {
  charIcon.value.background = event?.target?.value
}
function onSubmit() {
  if (!props.path) return
  if (curIndex.value == tabTypes.TEXT) {
    editData.value.icon = charIcon.value
  } else {
    editData.value.icon = imgIcon.value
  }
  engineStore.linkChange(props.path, deepClone(editData.value))
  setCloseDrawer(false)
}
function getIcon(site: string) {
  fetch(`/getico/api.php?url=${site}`)
    .then((res) => res.arrayBuffer())
    .then((data) => {
      searchIcon.value = 'data:image/jpg;base64,' + ArrayBufferToBase64(data)
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;

  .left {
    width: calc(100% - 80px);
    display: flex;
    align-items: center;

    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }

    .title {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 24px;
      font-size: 16px;
      margin-left: 12px;
      color: #333;
    }
  }

  .action {
    flex-shrink: 0;
    margin-left: 20px;
  }
}

.content {
  .link-input {
    margin-top: 18px;
  }

  .icon-area {
    margin-top: 32px;
    text-align: center;

    .icon-attr {
      margin-top: 20px;

      .icon-pre {
        padding-top: 10px;
      }

      .show-colors {
        width: 100%;
        padding-top: 20px;
        display: grid;
        grid-template-columns: repeat(10, 24px);
        row-gap: 16px;
        justify-content: space-between;

        .color-btn {
          width: 24px;
          height: 24px;
          display: inline-block;
          border-radius: 50%;
          cursor: pointer;

          & > input[type='color'] {
            opacity: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }

      .color-input {
        margin-top: 30px;
      }

      .img-input {
        margin-top: 40px;
      }
    }
  }
}
</style>
