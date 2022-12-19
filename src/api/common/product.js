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
 * 获取商品列表分页
 */
 export const requestProductPage = (param) => {
  return axiosUtil.post('/server/product/getProductDataPage', param)
}

/**
 * 新增商品
 */
export const addProductData = (param) => {
  return axiosUtil.postJson('/server/product/addProductData', param)
}

/**
 * 删除
 */
export const delProductByCode = (param) => {
  return axiosUtil.post('/server/product/delProductByCode', param)
}

/**
 * 修改
 */
 export const updateProductData = (param) => {
  return axiosUtil.postJson('/server/product/updateProductData', param)
}

/**
 * 入账
 */
export const addDealData = (param) => {
  return axiosUtil.postJson('/server/product/addDealData', param)
}