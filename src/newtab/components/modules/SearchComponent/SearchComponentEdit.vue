<template>
  <div class="search-edit">
    <!-- <Tab :tabList="tabsList" @onChange="onClickTab"></Tab> -->
    <div class="wrapper">
      <div class="item" v-for="item in engineStore.list" :key="item.id" @click.stop="onCheckItem(item)">
        <Icon :data="item.icon" />
        <span class="name">{{ item.name }}</span>
        <div class="edit">
          <i class="iconfont icon-edit" @click.stop="onEditItem(item, 'list')"></i>
          <i v-if="item.id !== engineStore.currentEngineId" class="iconfont icon-androiddelete"
            @click.stop="onDeleteItem(item)"></i>
        </div>
        <input type="checkbox" :disabled="item.id === engineStore.currentEngineId"
          :checked="item.use || item.id === engineStore.currentEngineId" @click="onCheckItem(item)"
          @change="onCheckItem(item)">
      </div>
      <div class="btn-area">
        <Button plain class="add-btn" @click="onEditItem({}, 'list')">新增</Button>
        <Button plain class="add-btn" @click="onCloseModal">确定</Button>
      </div>
    </div>

    <LinkAttrDrawer v-model="showDrawer.show" :data="showDrawer.data" :title="showDrawer.title" :path="showDrawer.path" />
  </div>
</template>

<script setup lang="ts">
import { useCommon, useEngineStore } from '@/newtab/store'
import { reactive } from 'vue'
import LinkAttrDrawer from '@/newtab/components/LinkAttrDrawer.vue'
import { IEngineData } from '@/constants'

const engineStore = useEngineStore()
const commonStore = useCommon()

const showDrawer = reactive({
  show: false,
  data: <IEngineData>{},
  path: '',
  title: '搜索',
})

const tabsList = [
  {
    name: '搜索',
    value: 'default',
  },
  {
    name: '外链',
    value: 'extlink',
  },
]
function onClickTab(item: Record<string, string>) {
  showDrawer.title = item.name
}

function onCloseModal() {
  commonStore.attrModalInfo.show = false
}

function onEditItem(item: IEngineData, path: string) {
  showDrawer.show = true
  showDrawer.data = item
  showDrawer.path = path
}
function onDeleteItem(item: IEngineData) {
  let idx = engineStore.list.findIndex((e) => e.id === item.id)
  if (~idx) {
    engineStore.list.splice(idx, 1)
  }
}



function onCheckItem(item: IEngineData) {
  if (item.id !== engineStore.currentEngineId) {
    item.use = !item.use
  }
}
</script>

<style lang="less" scoped>
.search-edit {
  display: flex;
  flex-direction: column;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 678px;
    max-width: 80%;
    margin-top: 20px;
    color: #333;
    align-items: center;
    height: 520px;
    overflow-y: auto;

    .item {
      display: flex;
      border-radius: 6px;
      align-items: center;
      padding: 8px 10px;
      margin-bottom: 10px;
      width: 100%;

      &:hover {
        background: rgba(0, 0, 0, 0.06);

        & .edit {
          opacity: 1;
        }
      }

      .name {
        width: 100%;
        margin-left: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
      }

      .edit {
        margin-left: 20px;
        padding-right: 20px;
        color: #666;
        opacity: 0;
        transition: opacity 0.15s;

        .iconfont {
          margin-left: 6px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .btn-area {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .add-btn {
    margin-top: 40px;
    width: calc(50% - 30px);
    height: 36px;
    flex-shrink: 0;
  }
}
</style>
