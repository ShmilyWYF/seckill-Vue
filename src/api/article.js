import request from '@/utils/request'

export function goodsList() {
  return request({
    url: '/goods/toList',
    method: 'get'
  })
}

export function fetchSeckillGoods(id) {
  return request({
    url: '/goods/toList/' + id,
    method: 'get',
    params: { id }
  })
}

export function getPath(id) {
  return request({
    url: '/seckill/path/' + id,
    method: 'get'
  })
}

export function doseckill(data, id) {
  return request({
    url: '/seckill/' + data + '/doSeckill',
    method: 'post',
    params: {
      goodsId: id
    }
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
