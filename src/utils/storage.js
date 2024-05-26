// 通用存储模块，本地持久化

// 1.用户信息和权证
const INFO_KEY = 'shopping_info'
// 获取用户信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  // 判断是否存在这个值
  return result ? JSON.parse(result) : { token: '', userID: '' }
}
// 设置用户信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除用户信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 2.搜索历史
const HISTORY_KEY = 'search_history'
// 获取历史信息
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置历史信息
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
