import { axiosUtil } from '@/plugins/axios'

export const getEnum = (param) => {
  return axiosUtil.post('/server/common/getEnum', param)
}

/**
 * 获取商品类型
 */
 export const requestProductType = (param) => {
  return axiosUtil.post('/server/product/getProductType', param)
}

/**
 * 获取商品列表
 */
 export const requestProduct = (param) => {
  return axiosUtil.post('/server/product/getProductData', param)
}

/**
 * 新增商品
 */
export const addProductData = (param) => {
  return axiosUtil.postJson('/server/product/addProductData', param)
}