<template>
    <div class="user-wrap">
      <van-cell-group>
        <van-cell title="用户名" :value="$store.state.user.user.S_USER" />
      </van-cell-group>
      <van-button round block type="primary" @click="logout" class="btn-logout">退出登录</van-button>
    </div>
</template>

<script>
export default {
  computed: {
    
  },
  methods: {
    logout(){
      this.$store.dispatch('Logout')
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>
.user-wrap{
  .btn-logout{
    position: absolute;
  }
}
</style>