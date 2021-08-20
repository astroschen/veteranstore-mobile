import Vue from 'vue'
// import './kt-title-box'

const vueFiles = require.context('./', true, /component\.vue$/)
vueFiles.keys().forEach(key => {
  const component = vueFiles(key).default
  Vue.component(component.name, component)
})

const jsFiles = require.context('./', true, /component\.js$/)
jsFiles.keys().forEach(key => {
  const component = jsFiles(key).default
  Vue.component(component.name, component)
})
