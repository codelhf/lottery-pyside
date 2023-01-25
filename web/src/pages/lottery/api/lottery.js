import request from '@/utils/request'

export function selectPrize() {
  return request({
    url: '/lottery/prize',
    method: 'get'
  })
}

export function selectUser() {
  return request({
    url: '/lottery/user',
    method: 'get'
  })
}

export function startCheck(prizeId) {
  return request({
    url: '/lottery/startCheck',
    method: 'get',
    params: { prizeId }
  })
}

export function startOne(prizeId) {
  return request({
    url: '/lottery/startOne',
    method: 'get',
    params: { prizeId }
  })
}

export function startAll(prizeId) {
  return request({
    url: '/lottery/startAll',
    method: 'get',
    params: { prizeId }
  })
}

export function resetStock(prizeId) {
  return request({
    url: '/lottery/resetStock',
    method: 'post',
    params: { prizeId }
  })
}
