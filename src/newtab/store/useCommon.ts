import { defineStore } from 'pinia'
import { IContentEvent } from '@/constants'
export const useCommon = defineStore('commonStore', {
  state: () => ({
    attrModalInfo: {
      show: false,
      component: '',
      mask: false
    },
    contentMenuInfo: {
      show: false,
      content: <IContentEvent[]>[],
    },
  }),
  getters: {},
  actions: {
    showAttrModal(component: string) {
      this.attrModalInfo.show = true
      this.attrModalInfo.mask = false
      this.attrModalInfo.component = component
    },
    showAttrMaskModal(component: string) {
      this.attrModalInfo.show = true
      this.attrModalInfo.mask = true
      this.attrModalInfo.component = component
    },
  },
})
