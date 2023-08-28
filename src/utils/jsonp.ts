/*
 * @Author: yanfee
 * @Date: 2023-07-19 22:29:23
 * @LastEditTime: 2023-08-08 14:47:10
 * @Description: jsonp调用封装
 */

import { uuid } from './index'

function importScript(src: string) {
  var spt = document.createElement('script')
  spt.src = src
  document.body.appendChild(spt)
}

export function useJsonp(url: string, params: Record<string, any>, cb: Function, callbackKey = 'cb') {
  const callbackName: string = `metaJsonp_${Date.now()}${uuid()}`;
  // @ts-ignore
  window[callbackName] = cb
  // window.__metaJsonp__ = cb
  params = { ...params, [callbackKey]: callbackName }
  const arr = []
  for (let key in params) {
    arr.push(`${key}=${params[key]}`)
  }
  const spUrl = `${url}${url.includes('?') ? '&' : '?'}${arr.join('&')}`
  importScript(spUrl)
  //   fetch(spUrl)
  //     .then((res) => res.text())
  //     .then((text) => importScript(text))
}
