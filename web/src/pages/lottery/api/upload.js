import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/upload/file',
    method: 'post',
    data
  })
}

export function clearImage() {
  return request({
    url: '/clear/images',
    method: 'delete'
  })
}
