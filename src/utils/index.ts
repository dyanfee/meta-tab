/*
 * @Author: yanfee
 * @Date: 2023-07-19 22:05:27
 * @LastEditTime: 2023-08-10 15:32:06
 * @Description: 工具
 */
export const debounce = (callback: Function, delay: number) => {
  let timeId: any
  return function (...args: any[]) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
export const throttle = (func: Function, delay: number) => {
  let timeout: any
  return function (...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = 0
        func(...args)
      }, delay)
    }
  }
}
export function uuid(len = 16, radix = 16) {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}
export function ArrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
export function deepClone(data: any) {
  if (typeof data === 'object') {
    return JSON.parse(JSON.stringify(data))
  }
  return data
}

export function fixZero(num: string | number, offset = 2) {
  if (!offset) return num
  var len = offset - (num + '').length
  while (len) {
    num = '0' + num
    len -= 1
  }
  return num
}

export function fixWeekDay(day: number) {
  var weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return '星期' + weekdays[day]
}
