import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken()
  }
  return config
},
error => {
  return Promise.reject(error)
}
)

service.interceptors.response.use(response => {
  const res = response.data
  if (res.code === 600) {
    return res
  }
  if (res.code !== 200) {
    Message({ message: res.message || '错误', type: 'error', duration: 5 * 1000 })
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('您已注销，您可以取消以停留在此页面，或重新登录', '确认注销', { confirmButtonText: 'Re-Login', cancelButtonText: 'Cancel', type: 'warning' }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.msg || '错误'))
  } else {
    return res
  }
},
error => {
  console.log('打印err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
