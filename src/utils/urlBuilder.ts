import config from '../config'

export const shortUrlBuilder = (route: string): string => `${config.shortUrlPrefix}/${route}`

export const urlBuilder = (url: string): string => url.indexOf('http://') >= 0 ? url : `http://${url}`
