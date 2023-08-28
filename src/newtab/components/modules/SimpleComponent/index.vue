<!--
 * @Author: yanfee dyanfee@gmail.com
 * @Date: 2023-08-10 10:26:36
 * @LastEditors: yanfee dyanfee@gmail.com
 * @LastEditTime: 2023-08-17 11:24:24
 * @Description: 简单显示页
-->
<template>
  <Transition name="fade">
    <div class="simple-component" v-if="engineStore.model === SHOW_MODEL.SIMPLE">
      <section class="calendar time-area" @contextmenu.stop.prevent="onContextMenu">
        <span v-show="simple.showDate">{{ dateRef.time }}</span>
      </section>
      <section class="calendar ldate-area" @contextmenu.stop.prevent="onContextMenu">
        <span v-show="simple.showCalendar">{{ dateRef.date }}</span>
        <span v-show="simple.showWeek">{{ dateRef.week }}</span>
        <span v-show="simple.showLunar">{{ dateRef.lunarDate }}</span>
      </section>
      <Transition name="fade">
        <section class="tips-area" v-if="dailyWords.data.sentence" v-show="simple.showSentence">
          <div class="scentence">
            <div class="word">{{ dailyWords.data.sentence }}</div>
          </div>
          <div class="author">
            —— {{ dailyWords.data.author ?? '' }}{{ dailyWords.data.source ? `「${dailyWords.data.source}」` : ''
            }} ——
          </div>
          <div class="icon-area">
            <i class="iconfont icon-androidrefresh" @click="fetchSentence"></i>
            <i class="iconfont icon-ioscopy" @click="copySentence"></i>
          </div>
        </section>
      </Transition>
      <section class="usual-link-area">
        <!-- <Button @click="onTest">测试壁纸</Button> -->
      </section>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { SHOW_MODEL } from '@/constants';
import { useCommon, useEngineStore } from '@tab/store'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { fixZero, fixWeekDay } from '@/utils'
import { solar2lunar } from '@/utils/calendar'
import MyEvent from '@/lib/event';
import { getApi } from '@/api/helper';
const engineStore = useEngineStore()
const commonStore = useCommon()

const dailyWords = engineStore.pageInfo.simple.dailyWords
const simple = engineStore.pageInfo.simple
const dateRef = reactive({
  time: '',
  date: '',
  lunarDate: '',
  week: '',
})

let timer: NodeJS.Timeout;


// 重写右键菜单
function onContextMenu(e: Event) {
  const { show24Model, showCalendar, showLunar, showWeek, showDate, showSentence } = engineStore.pageInfo.simple
  commonStore.contentMenuInfo.content = [
    {
      label: `${showDate ? '隐藏' : '显示'}时钟`,
      callback: () => engineStore.pageInfo.simple.showDate = !showDate
    },
    {
      label: show24Model ? '12小时制' : '24小时制',
      callback: () => engineStore.pageInfo.simple.show24Model = !show24Model

    },
    {
      label: `${showCalendar ? '隐藏' : '显示'}日历`,
      callback: () => engineStore.pageInfo.simple.showCalendar = !showCalendar

    },
    {
      label: `${showLunar ? '隐藏' : '显示'}农历`,
      callback: () => engineStore.pageInfo.simple.showLunar = !showLunar

    },
    {
      label: `${showWeek ? '隐藏' : '显示'}星期`,
      callback: () => engineStore.pageInfo.simple.showWeek = !showWeek

    },
    {
      label: `${showSentence ? '隐藏' : '显示'}每日一句`,
      callback: () => engineStore.pageInfo.simple.showSentence = !showSentence

    }
  ]
  MyEvent.$emit('showContextMenu', e)
}

function createDailyWords() {
  if (dateRef.date !== engineStore.pageInfo.simple.dailyWords.timestamp) {
    fetchSentence()
  }
}

function copySentence() {
  const textArr = [dailyWords.data.sentence]
  if (dailyWords.data.source) textArr.push(dailyWords.data.source)
  if (dailyWords.data.author) textArr.push(dailyWords.data.author)
  copyText(textArr.join('\n'))
}
function copyText(text: string) {
  navigator.clipboard.writeText(text).then(function () {
    console.log('复制成功')
  }, function () {
    console.log('复制失败')
  })
}

function fetchSentence() {
  const url = getApi('HITOKOTO')
  fetch(url).then(res => res.json()).then(res => {
    const { hitokoto, from, from_who } = res
    dailyWords.timestamp = dateRef.date
    dailyWords.data = {
      sentence: hitokoto,
      source: from,
      author: from_who
    }
  }).catch(err => {
    console.error(err)
  })
}

function startTicker() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = fixZero(date.getMinutes())
  const second = fixZero(date.getSeconds())
  dateRef.week = fixWeekDay(date.getDay())

  const formatHour = engineStore.pageInfo.simple.show24Model ? hour : hour > 12 ? hour - 12 : hour

  dateRef.time = `${fixZero(formatHour)}:${minute}:${second}`
  dateRef.date = `${year}年${month}月${day}日`
  const lunar = solar2lunar()

  dateRef.lunarDate = `${lunar?.IYearCn}年${lunar?.IMonthCn}${lunar?.IDayCn}`

  timer = setTimeout(() => {
    startTicker()
  }, 1000);
}


function endTicker() {
  clearTimeout(timer)
}
onMounted(() => {
  startTicker()
  createDailyWords()
})
onBeforeUnmount(() => {
  endTicker()
})

</script>
<style lang="less" scoped>
.simple-component {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .calendar {
    color: #f5f5f5cc;
    font-size: 32px;
    display: flex;
    user-select: none;
    cursor: default;
  }

  .time-area {
    margin-top: 25vh;
    font-size: 132px;
    font-weight: bold;
    line-height: 130px;
    min-height: 130px;
    min-width: 520px;
  }

  .ldate-area {
    position: absolute;
    top: calc(25vh + 175px);

    span+span {
      margin-left: 20px;
    }
  }

  .tips-area {
    position: absolute;
    bottom: 120px;
    color: #ffffffcc;
    user-select: none;
    cursor: default;

    .scentence {
      position: relative;
      min-width: 26vw;
      max-width: 50vw;

      .word {
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        word-break: normal;
        margin: 0;
        padding: 15px 50px;
        width: 100%;
      }

    }

    .author {
      font-size: 16px;
      text-align: center;
    }

    .icon-area {
      position: absolute;
      top: 27px;
      right: -4px;
      background-color: #ffffff50;
      backdrop-filter: blur(2px);
      padding: 4px;
      border-radius: 6px;
      display: none;

      .iconfont {
        border-radius: 6px;
        font-size: 22px;

        &:hover {
          background: #ffffff64;
        }

        &+.iconfont {
          margin-left: 4px;
        }
      }

    }

    &:hover {
      .icon-area {
        display: block;
      }
    }
  }
}
</style>