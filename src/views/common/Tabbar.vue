<template>
  <div>
    <!-- 标签栏 -->
    <van-tabbar
      v-model="tabbar"
      active-color="#07c160"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item name="home" icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item name="goods" icon="logistics">库存</van-tabbar-item>
      <van-tabbar-item name="shop" icon="balance-o">收银</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
    }
  },
  computed: {
    tabbar: {
      get () {
        return this.$store.state.common.tabbar
      },
      set (val) {
        this.$store.commit('common/CHANGE', { key: 'tabbar', value: val.toString() })
      }
    }
  },
  watch: {
    $route () {
      let val = 'home'
      switch (this.$route.path) {
        case "/home": val = 'home'
          break
        case "/addgoods":
        case "/goods": val = 'goods'
          break
        case "/shop": val = 'shop'
          break
        case "/user": val = 'user'
          break
        default:
          break
      }
      console.log(val)
      this.$store.commit('common/CHANGE', { key: 'tabbar', value: val.toString() })
    }
  },
  methods: {
    onChange (val) {
      this.$store.commit('common/CHANGE', { key: 'tabbar', value: val.toString() })
      this.$router.push('/' + val)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
</style>