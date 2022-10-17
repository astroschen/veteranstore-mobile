<!--  -->
<template>
  <div class="home">
    <!-- 搜索 -->
    <!-- <header-search></header-search> -->
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
    </van-pull-refresh>
    <h1>Veteran平台</h1>
    <div class="block-card">
      <van-icon class="card" color="#4fc08d" size="100" name="todo-list-o" badge="9" />
      <span class="card">待办</span>
    </div>
    <div class="block-card">
      <van-icon class="card" color="#4fc08d" size="100" name="chart-trending-o" />
      <span class="card">报表</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      isLoading: false,
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 重新获取数据
    onRefresh () {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.home {
  padding: 10px;
}
.block-card {
  width: calc(50% - 2 * 10px);
  height: 150px;
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #d4d4d4;
  float: left;
  margin: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .card {
  }
}
.block-card:active {
  border-radius: 8px;
  background: #fff;
  box-shadow: inset 0 0 10px #d4d4d4;
}
</style>