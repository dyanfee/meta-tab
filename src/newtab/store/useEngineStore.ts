/*
 * @Author: yanfee duyf@changan.com.cn
 * @Date: 2023-07-18 14:40:34
 * @LastEditors: yanfee duyf@changan.com.cn
 * @LastEditTime: 2023-08-15 15:51:35
 * @Description: useEngineStore
 */
import { IEngineData, SHOW_MODEL } from '@/constants'
import { uuid } from '@/utils'
import { defineStore } from 'pinia'

export const useEngineStore = defineStore('engineStore', {
  state: () => ({
    extEngine: <IEngineData[]>[
      {
        name: 'yandex',
        icon: {},
        link: 'yanfee.com?q=%s',
        id: 'a474eb6a236f1b452bfda18a52641f65',
      },
    ],
    currentEngineId: 'f474eb65236f1b450bfda18a12641f63',
    list: <IEngineData[]>[
      {
        name: '百度',
        icon: {
          url: 'https://infinity-permanent.infinitynewtab.com/infinity/search-add/baidu.png?imageMogr2/thumbnail/48x/format/webp/blur/1x0/quality/100|imageslim',
          background: '#ffffffcc',
          type: 'image',
        },
        link: `https://www.baidu.com/s?ie=utf-8&wd=%s`,
        id: 'f474eb65236f1b450bfda18a12641f63',
        use: true,
      },
      {
        name: 'yandex',
        icon: {
          url: 'https://avatars.mds.yandex.net/get-direct-picture/150544/V9FOQldV5ZJbuwymfFV_4w/orig',
          background: '#ffffffcc',
          type: 'image',
        },
        link: `https://yandex.com/search/?text=%s`,
        id: '307dc1689c23843e4737d904bc36bbfd',
      },
      {
        name: '360搜索',
        icon: {
          url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0813%2F2ab5c574j00qxrgvk000cc000dx00dxg.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
          background: '#ffffffcc',
        },
        link: `https://image.so.com/i?q=%s`,
        id: 'f944c1f32eec064e333684bdf6be62f2',
      },
      {
        name: '必应',
        icon: {
          url: 'https://ts3.cn.mm.bing.net/th?id=ODLS.87518fab-8fc1-4893-a7f1-c7d88283a35a&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2',
          background: '#ffffffcc',
        },
        link: `https://cn.bing.com/search?q=%s`,
        id: '4780625d479e17d0977be388eff903ea',
      },
      {
        name: 'google',
        icon: {
          url: 'https://infinity-permanent.infinitynewtab.com/infinity/search-add/google.png?imageMogr2/thumbnail/48x/format/webp/blur/1x0/quality/100|imageslim',
          background: '#ffffffcc',
        },
        link: `https://www.google.com/search?q=%s`,
        id: '41eee9c9cf5495c4cf9eafbe344baf16',
      },
    ],
    model: SHOW_MODEL.SIMPLE,
    pageInfo: {
      common: {
        background: '',
        useBingDailyBackground: true,
      },
      simple: {
        showLunar: true,
        showWeek: true,
        showCalendar: true,
        show24Model: true,
        showDate: true,
        showSentence: true,
        dailyWords: {
          timestamp: '',
          data: {
            sentence: '',
            source: "",
            author: ''
          }
        }
      }
    },
  }),
  getters: {
    searchEngine: (state): IEngineData => state.list.find((e) => e.id === state.currentEngineId) || state.list[0],
  },
  actions: {
    changeEngine(id: string) {
      this.currentEngineId = id
    },
    linkChange(path: any, data: IEngineData) {
      if (!path) return
      let curList: any = this
      const pathArr = path.split('.')
      for (let i in pathArr) {
        if (Object.hasOwn(curList, pathArr[i])) {
          // @ts-ignore
          curList = curList[pathArr[i]]
        } else {
          new Error('路径查找失败')
        }
      }
      if (!data.id) {
        data.id = uuid(32)
        curList.push(data)
      } else {
        const idx = curList.findIndex((e: IEngineData) => e.id === data.id)
        if (~idx) {
          curList[idx] = data
        }
      }
    },
  },
})
