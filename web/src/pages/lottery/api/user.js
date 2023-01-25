import request from '@/utils/request'

export function fetchUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function fetchUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get',
    params: { id }
  })
}

export function checkUser(data) {
  return request({
    url: '/user/check',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/' + data.id,
    method: 'post',
    data
  })
}

export function deleteUser(ids) {
  return request({
    url: '/user/del/' + ids,
    method: 'post',
    params: { ids }
  })
}

export function batchCreateUser(userList) {
  return request({
    url: '/user/batch',
    method: 'post',
    data: userList
  })
}

export function fetchUserAll() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}
