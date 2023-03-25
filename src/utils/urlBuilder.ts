import config from '../config'

export const shortUrlBuilder = (route: string): string => `${config.shortUrlPrefix}/${route}`

export const urlBuilder = (url: string): string => /^http|^https/.test(url) ? url : `http://${url}`
