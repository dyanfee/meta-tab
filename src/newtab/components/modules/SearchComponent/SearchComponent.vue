<template>
  <section class="search-component" @click="isFocus = true" v-clickOutside="onBlur">
    <!-- 搜索栏 -->
    <div class="search-content" :style="{ opacity: isFocus ? '1' : '0.8' }">
      <div class="icon-area">
        <div class="search-icon" @click="isChangeEngine = true">
          <Icon :data="engineStore.searchEngine.icon" :focus="isChangeEngine" />
        </div>
      </div>
      <input type="search" class="search-input" @focus="isChangeEngine = false" v-model="searchValue"
        placeholder="请输入搜索内容" />
      <div class="icon-area">
        <div class="click-area" v-if="searchValue" @click="searchValue = ''">
          <i class="iconfont icon-roundclosefill"></i>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <section class="search-suggest" v-if="isFocus && (isChangeEngine || (sugList && sugList.length))">
        <div class="wrapper">
          <ul class="engines-list" v-if="isChangeEngine">
            <template v-for="item in engineList" :key="item.id">
              <Transition name="scale-inout">
                <li class="engines-item" v-if="item.use || item.id === 'add'">
                  <div class="engine">
                    <div class="close-icon" v-show="item.id !== engineStore.currentEngineId && item.id !== 'add'"
                      @click.stop="onClickDeleteEngine(item)">
                      <i class="iconfont icon-closeround"> </i>
                    </div>
                    <Icon class="engine-icon" :data="item.icon" padding="12" radius="12" @click="changeEngine(item)" />
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </li>
              </Transition>
            </template>
          </ul>
          <ul class="search-list" v-else-if="sugList && sugList.length">
            <li class="suggest-item" v-for="item in sugList" :key="item" @click="onSearch(item)">
              <i class="iconfont icon-search"> </i>
              <div class="item-text">{{ item }}</div>
            </li>
          </ul>
          <div></div>
        </div>
      </section>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { debounce } from '@/utils'
import { IEngineData } from '@/constants'
import { useCommon, useEngineStore } from '@/newtab/store'
import { getApi } from '@/api/helper'

const searchValue = ref('')
const isFocus = ref(false)
const sugList = ref([])
const isChangeEngine = ref(false)

const engineStore = useEngineStore()
const commonStore = useCommon()
const addItemData: IEngineData = {
  name: '添加',
  icon: { background: '#ffffffcc', iconfont: 'icon-androidadd' },
  id: 'add',
}
// 增加新增图标
const engineList = computed(() => [...engineStore.list, addItemData])

function changeEngine(item: IEngineData) {
  if (item.id === 'add') {
    onBlur()
    // 弹出搜索栏属性编辑器
    commonStore.showAttrMaskModal('SearchComponentEdit')
  } else {
    engineStore.changeEngine(item.id || '')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEnter)
})

watch(searchValue, () => {
  getSearchSuggest()
})
const getSearchSuggest = debounce(() => {
  const baseUrl = getApi('SUGGESTION_BAIDU')
  fetch(`${baseUrl}/su?p=3&ie=UTF-8&cb=&wd=${searchValue.value}`)
    .then((res) => res.text())
    .then((data) => {
      const r = /s:(\[[\w\W]*\])/.exec(data)
      const list = JSON.parse((r && r[1]) || '[]')
      sugList.value = list
    })
    .catch((err) => {
      console.error(err)
    })
}, 300)

function onClickDeleteEngine(item: any) {
  item.use = !item.use
}

function onSearch(val: string) {
  const url = engineStore.searchEngine.link?.replace('%s', val)
  chrome.tabs.create({
    url,
  })
}

function onBlur() {
  isFocus.value = false
  isChangeEngine.value = false
}

function onEnter(event: KeyboardEvent) {
  if (isFocus.value && event.code === 'Enter') {
    onSearch(searchValue.value)
  }
}
</script>

<style lang="less" scoped>
.search-component {
  position: fixed;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  max-width: 86vw;
  width: 576px;
  user-select: none;
}

.search-content {
  background-color: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: #ffffffcc;
  backdrop-filter: blur(40px);
  box-shadow: 0 4px 16px -4px #0000000d;
  transition: opacity 0.2s;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  line-height: 26px;
  height: 26px;
  padding: 12px;
  background-color: unset;
}

.icon-area {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 100%;
  cursor: pointer;
}

.search-icon {
  width: 28px;
  height: 28px;
}

.click-area {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.click-area:hover {
  opacity: 0.75;
}

.search-suggest {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(40px);
  margin-top: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 #00000026;
  cursor: pointer;
}

.wrapper {
  max-height: calc(88vh - 200px);
  overflow: auto;
}

.wrapper::-webkit-scrollbar {
  width: 0;
}

.engines-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 48px);
  padding: 20px 20px 24px;
  gap: 20px;

  .engines-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #999;

    .engine {
      position: relative;

      .close-icon {
        position: absolute;
        top: -6px;
        left: -6px;

        background: #fff;
        width: 24px;
        height: 24px;
        border-radius: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;

        transition: all 0.2s;

        &:hover {
          .icon-closeround {
            transform: rotateZ(180deg);
          }
        }

        .icon-closeround {
          font-size: 12px;
          transition: all 0.3s;
        }
      }

      &:hover {
        .engine-icon {
          box-shadow: 0 4px 8px -4px #00000026;
        }

        .close-icon {
          opacity: 1;
          box-shadow: 0 4px 16px 0 #00000026;
        }
      }
    }

    .name {
      margin-top: 4px;
    }
  }
}

.search-list {
  padding: 4px 0;
}

.suggest-item {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 8px;
  margin: 8px 8px 4px;
  color: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.suggest-item:hover {
  background-color: #00000010;
}

.icon-search {
  font-size: 20px;
  margin-right: 16px;
}

.item-text {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
