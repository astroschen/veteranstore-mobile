<template>
  <div class="login-warp">
    <img
      class="logo"
      :src="
        require('@/assets/images/login' + Math.ceil(Math.random() * 5) + '.gif')
      "
      alt=""
    />
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :error-message="userMsg"
        @input="inputFn"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :error-message="passMsg"
        @input="inputFn"
      />
      <van-button round block type="primary" native-type="submit" @click="loginFn">
        登录
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      userMsg: '',
      passMsg: ''
    }
  },
  methods: {
    inputFn(val){
      this.userMsg = (this.username ? '' : '用户名不能为空')
      this.passMsg = (this.password ? '' : '密码不能为空')
    },
    loginFn () {
      this.userMsg = (this.username ? '' : '用户名不能为空')
      this.passMsg = (this.password ? '' : '密码不能为空')
      this.$store.dispatch('RequestUserInfo', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res && res?.data.length) {
            this.$toast({ message: '登录成功', duration: 3000 })
            let path = this.$route.query['redirect']
            this.$router
              .replace({
                path: path === '/login' || path === undefined ? '/' : path
              })
          } else {
            this.$toast({ message: '登录名或密码错误', duration: 3000 })
          }
      })
    }
  },
  mounted () {

  }
}
</script>

<style lang='less' scoped>
.login-warp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    width: 100%;
  }
}
</style>