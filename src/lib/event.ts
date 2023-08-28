/*
 * @Author: yanfee
 * @Date: 2023-08-12 10:02:10
 * @LastEditTime: 2023-08-12 10:13:22
 * @Description: 自定义事件
 */

interface IEvent {
  callback: Function
  target?: any
}

export default class MyEvent {
  //全局存储
  private static eventMap: Record<string, IEvent[]> = {}

  //接收消息 传入 eventName:"string 监听事件名",callback:"function 监听事件回调",target:作用域}
  static $on(eventName: string, callback: Function, target = null) {
    if (!eventName || !callback) {
      console.error(`事件监听错误eventName：${eventName},callback:${callback}`)
      return false
    }
    if (MyEvent.eventMap[eventName]) {
      MyEvent.eventMap[eventName].push({ callback, target })
    } else {
      MyEvent.eventMap[eventName] = [{ callback, target }]
    }
  }
  //消息发送 传入eventName:"string 发送消息事件名",data:"可选  可以是任意数据类型"
  static $emit(eventName: string, ...data: any[]) {
    if (!eventName) {
      console.error(`事件触发错误eventName：${eventName},data:${data}`)
      return false
    }
    if (MyEvent.eventMap[eventName]) {
      MyEvent.eventMap[eventName].forEach((item: any) => {
        item.callback.call(item?.target, ...data)
      })
    }
  }

  static $remove(eventName: string, callback: Function) {
    if (!eventName) {
      console.error(`事件移除错误eventName：${eventName}`)
      return false
    }
    if (!callback) {
      const ret = MyEvent.eventMap[eventName]
      MyEvent.eventMap[eventName] = []
      return ret
    } else if (MyEvent.eventMap[eventName]) {
      MyEvent.eventMap[eventName] = MyEvent.eventMap[eventName].filter((a) => {
        return a.callback != callback
      })
    } else {
      for (let key in MyEvent.eventMap) {
        MyEvent.eventMap[key] = MyEvent.eventMap[key].filter((a) => {
          return a.callback != callback
        })
      }
    }
  }
}
