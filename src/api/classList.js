import request from '@/utils/request'
export const getClassList = () => {
  return request.get('/category/list')
}
