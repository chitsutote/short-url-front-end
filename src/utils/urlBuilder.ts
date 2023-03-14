import config from '../config'

export const shortUrlBuilder = (route: string) => `${config.shortUrlPrefix}/${route}`

export const urlBuilder = (url: string) => url.indexOf('http://') >= 0 ? url : `http://${url}`
