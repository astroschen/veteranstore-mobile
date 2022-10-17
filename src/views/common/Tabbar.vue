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
      console.log('当前路由--->', this.$route.path)
      const arr = this.$route.path.split('/')
      const fil = arr.filter(item => { return item })
      val = this.filterTabName(fil[0])
      this.$store.commit('common/CHANGE', { key: 'tabbar', value: val })
      this.$forceUpdate()
    }
  },
  methods: {
    // tab切换触发
    onChange (val) {
      const arr = val.split('/')
      const fil = arr.filter(item => { return item })
      this.$store.commit('common/CHANGE', { key: 'tabbar', value: fil[0].toString() })
      this.$router.push(fil[0] === '/' ? val : '/' + val)
    },
    // 过滤
    filterTabName (val) {
      switch (val) {
        case 'home':
          val = 'home'
          break
        case 'addgoods':
        case 'goods':
          val = 'goods'
          break
        case 'shop':
          val = 'shop'
          break
        case 'user':
          val = 'user'
          break
        default:
          break
      }
      return val.toString()
    }
  },
  created () {
    const val = this.$route.path
    const arr = val.split('/')
    const fil = arr.filter(item => { return item })
    this.$store.commit('common/CHANGE', { key: 'tabbar', value: this.filterTabName(fil[0]) })
    console.log(this.filterTabName(fil))
  },
  mounted () {
    // this.onChange(this.$route.path)
  }
}
</script>

<style lang="less" scoped>
</style>