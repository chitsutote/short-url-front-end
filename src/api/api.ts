import axios from 'axios'
import config from '../config'

const api = axios.create({
  baseURL: config.apiServerHost,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  }
)

api.interceptors.response.use((response) => {
  const { authorization }  = response.headers

  if (authorization) {
    localStorage.setItem('authToken', authorization)
  }

  return response
})

export default api
