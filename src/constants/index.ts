//--------------------------constants--------------------------//
// 图标类型
export enum META_ICON_TYPE {
  CHAR = 'char', // 文字图标
  IMAGE = 'image', // 图片图标
  ICONFONT = 'font', // svg图标
}
// 图标行为
export enum ACTION_TYPE {
  ACTION_UP,
  ACTION_BG,
}
// 页面内容类型 简单  常规
export enum SHOW_MODEL {
  SIMPLE,
  NORMAL,
}
//--------------------------interfaces--------------------------//
// 图标定义
export interface IMetaIcon {
  type?: META_ICON_TYPE
  url?: string
  char?: string
  color?: string
  background?: string
  iconfont?: string
}

export interface IEngineData {
  name?: string
  icon?: IMetaIcon
  id?: string
  link?: string
  use?: boolean
}

export interface IContentEvent {
  label: string
  desc?: string
  event?: string
  callback?: Function
  data?: any[]
}
