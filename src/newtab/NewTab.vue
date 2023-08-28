<!--
 * @Author: yanfee
 * @Date: 2023-07-18 20:53:11
 * @LastEditTime: 2023-08-22 09:27:19
 * @Description: 起始页入口
-->
<template>
  <main :style="mainStyle">
    <section class="pre-background" :style="preBackImageStyle"></section>
    <SimpleComponent />
    <SearchComponent />
    <ComponentAttrModal />
    <ContentMenuModal />
  </main>
</template>

<script setup lang="ts">
import { VueElement, onMounted, reactive, ref, watch } from 'vue';
import ComponentAttrModal from './components/ComponentAttrModal.vue'
import ContentMenuModal from './components/ContentMenuModal.vue'
import { useEngineStore } from './store';
import "./style/index.less"
import { getApi } from '@/api/helper';
import MyEvent from '@/lib/event';
const engineStore = useEngineStore()
const mainStyle = reactive<Record<string, any>>({})
// const db = window.indexedDB.open('meta_tab')
const preBackImageStyle = reactive<Record<string, any>>({})
// 监听pinia中整个state
engineStore.$subscribe((mutation, state) => {
  // console.log(state);
  console.log('data change: save')
  const jsonData = JSON.stringify(state)
  localStorage.setItem('meta_tab', jsonData)
})

function initStoreData() {
  try {
    const jsonData = localStorage.getItem('meta_tab')
    if (jsonData) {
      engineStore.$state = JSON.parse(jsonData)
    }
  } catch (error) {
    console.error(error)
  }
}
initStoreData()

function setBingDailyImage() {
  if (!engineStore.pageInfo.common.useBingDailyBackground && engineStore.pageInfo.common.background) return
  // https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10&mkt=zh-CN
  const url = getApi('BING')
  fetch(`${url}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`)
    .then(res => res.json())
    .then((res: any) => {
      if (res.images?.length) {
        const background = `https://cn.bing.com${res.images[0]?.url}`
        if (engineStore.pageInfo.common.background != background) {
          engineStore.pageInfo.common.background = background
        }
      }
    })
}
watch(() => engineStore.pageInfo.common.background, val => {
  if (!mainStyle.backgroundImage) {
    showBg(val)
  }
  backgroundFade(val)
})
function showBg(val?: string) {
  const v = val ?? engineStore.pageInfo.common.background ?? 'https://cn.bing.com/th?id=OHR.HammockDay_EN-US1639653297_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'
  mainStyle.backgroundImage = `url(${v})`
}

function randomPaper() {
  engineStore.pageInfo.common.useBingDailyBackground = false
  fetch(getApi('TAB') + '/api/wallpaper/next?type=random')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res?.data?.rawSrc) {
        engineStore.pageInfo.common.background = res?.data?.rawSrc
      }
    })
}
function backgroundFade(targetUrl: string) {
  const preImg = new Image()
  preImg.src = targetUrl

  preImg.onload = () => {
    preBackImageStyle.opacity = 1
    preBackImageStyle.backgroundImage = `url(${targetUrl})`
    setTimeout(() => {
      showBg(targetUrl)
      preBackImageStyle.backgroundImage = 'none'
      preBackImageStyle.opacity = 0
    }, 400)
  }
}
function useBingDailyBackground() {
  engineStore.pageInfo.common.useBingDailyBackground = true
  setBingDailyImage()
}

function downloadPaper() {
  const url = engineStore.pageInfo.common.background
  fetch(url + '?' + new Date().getTime()).then(res =>
    res.blob()).then(blob => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      console.log(blob)
      a.href = url;
      a.download = `paper${Date.now()}.jpg`;
      a.click();
    });
}
function initPaper() {
  MyEvent.$on('randomPaper', randomPaper)
  MyEvent.$on('bingPaper', useBingDailyBackground)
  MyEvent.$on('downloadPaper', downloadPaper)
  showBg()
  setBingDailyImage()

}

onMounted(() => {
  initPaper()
})




</script>
<style scoped lang="less">
main {
  height: 100vh;
  /* background-image: url('https://cn.bing.com/th?id=OHR.HammockDay_EN-US1639653297_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'); */
  background-position: center center;
  background-size: cover;
  width: 100%;

  .pre-background {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-position: center center;
    background-size: cover;
    transition: opacity 0.4s;
  }
}
</style>