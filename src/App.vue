<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    beforeunloadHandler (e) {
      // todo   在页面刷新或关闭之前需要处理得操作，例如清除或保存数据
      this.$store.dispatch('Logout')
    }
  },
  mounted () {
    //添加监听事件  
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  beforeDestory () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  }
}
</script>

<style lang="less">
</style>
