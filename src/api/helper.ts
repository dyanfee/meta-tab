
/** 外部api */

const API_MAP: Record<string, any> = {
    BING_RUN: {
        url: 'https://bing.img.run',
        local: '/bing_run'
    },
    SUGGESTION_BAIDU: {
        url: 'https://suggestion.baidu.com',
        local: ''
    },
    HITOKOTO: {
        url: 'https://v1.hitokoto.cn',
        local: '/sentence'
    },
    BING: {
        url: 'https://cn.bing.com',
        local: '/bing'
    },
    TAB: {
        url: 'https://api.wetab.link',
        local: '/tab'
    }
}


export function getApi(key: string) {
    const api = API_MAP[key] ?? {}
    return import.meta.env.PROD ? api?.url : api?.local
}