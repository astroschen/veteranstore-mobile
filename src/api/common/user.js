import { axiosUtil } from '@/plugins/axios'

export const requestUserInfo = (param) => {
  return axiosUtil.post('/server/user/login', param)
}

// 验证当前用户token是否过期
export const isExpires = (param) => {
  return axiosUtil.post('/server/user/isExpires', param)
}