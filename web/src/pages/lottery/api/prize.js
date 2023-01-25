import request from '@/utils/request'

export function fetchPrizeList(params) {
  return request({
    url: '/prize/list',
    method: 'get',
    params
  })
}

export function fetchPrize(id) {
  return request({
    url: '/prize/' + id,
    method: 'get',
    params: { id }
  })
}

export function checkPrize(data) {
  return request({
    url: '/prize/check',
    method: 'post',
    data
  })
}

export function createPrize(data) {
  return request({
    url: '/prize',
    method: 'post',
    data
  })
}

export function updatePrize(data) {
  return request({
    url: '/prize/' + data.id,
    method: 'post',
    data
  })
}

export function deletePrize(ids) {
  return request({
    url: '/prize/del/' + ids,
    method: 'post',
    params: { ids }
  })
}

export function batchCreatePrize(prizeList) {
  return request({
    url: '/prize/batch',
    method: 'post',
    data: prizeList
  })
}

export function fetchPrizeAll() {
  return request({
    url: '/prize/all',
    method: 'get'
  })
}
