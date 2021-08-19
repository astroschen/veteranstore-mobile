import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 *
 * 不再需要利用 `import app from './modules/app'` 进行按需导入
 * 只需要将对应路由信息放到modules文件夹下就行，进行统一导出
 * 所以需要注意当前目录modules文件夹下不要放任何无关文件或者不符合路由导出标准的文件，否则会报错！
 *
 */
 const modulesFiles = require.context('./modules', true, /\.js$/)

 const modules = modulesFiles.keys().reduce((modules, modulePath) => {
   // set './app.js' => 'app'
   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
   const value = modulesFiles(modulePath)
   modules[moduleName] = value.default
   return modules
 }, {})
export default new Vuex.Store({
  modules
})
