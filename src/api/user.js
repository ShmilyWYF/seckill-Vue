import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysuser/tologin',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/sysuser/touserinfo',
    method: 'get'
  })
}

export function getuserToken() {
  return request({
    url: '/sysuser/istoken',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/sysuser/tologout',
    method: 'get'
  })
}
