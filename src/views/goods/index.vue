<!--  -->
<template>
  <div class="goods">
    <!-- 添加 -->
    <div class="tools-btn">
      <van-button icon="replay" type="primary" @click="replayFn" />
      <van-button icon="plus" type="primary" />
    </div>
    <!-- 搜索 -->
    <header-search></header-search>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="refreshDis"
    >
      <!-- 侧边导航 -->
      <div class="sidebar-content">
        <van-sidebar v-model="listindex" @change="sidebarChange">
          <van-sidebar-item title="洗漱用品洗漱用品" badge="1500" />
          <van-sidebar-item title="饮料" badge="15" />
          <van-sidebar-item title="洗漱用品" badge="25" />
          <van-sidebar-item title="五金" badge="25" />
          <van-sidebar-item title="零食" badge="25" />
        </van-sidebar>
      </div>
      <!-- 商品卡片 -->
      <div class="card-content">
        <van-swipe-cell v-for="(item, index) in goodsData" :key="index">
          <div class="van-doc-demo-block__card">
            <van-card
              :num="item.num"
              :price="item.price"
              :desc="item.info"
              :title="item.name + '_' + index"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            >
              <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
              </template>
              <template #footer> </template>
            </van-card>
          </div>
          <template #right>
            <van-button
              style="
                height: 100%;
                background-color: #156e40;
                border-color: #156e40;
              "
              square
              text="编辑"
              type="primary"
              class="delete-button"
              @click="removeGoods(item)"
            />
            <van-button
              style="height: 100%"
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="removeGoods(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </van-pull-refresh>
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
      refreshDis: true,
      listindex: 0,
      goodsData: [
        { id: 'g01', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g02', name: '商品名称', info: '商品信息', price: 2.2, num: 1, state: true },
        { id: 'g03', name: '商品名称', info: '商品信息', price: 3, num: 1, state: true },
        { id: 'g04', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g05', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g06', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g07', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g08', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
        { id: 'g09', name: '商品名称', info: '商品信息', price: 1, num: 1, state: true },
      ],
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
      this.$toast("刷新成功");
      this.isLoading = false;
    },
    // 类型切换
    sidebarChange (e) {
      this.listindex = e
    },
    // 刷新
    replayFn () {
      this.refreshDis = false
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.refreshDis = true
      }, 1000)
    }
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
<style lang='less'>
.goods {
  // dot
  .van-info {
    background-color: #156e40 !important;
    padding: 1px 4px !important;
  }
  .van-sidebar-item{
    padding: 20px 20px;
  }
  .van-sidebar-item--select::before {
    height: 100%;
  }
}
</style>
<style lang='less' scoped>
.goods {
  width: 100%;
  height: 100%;
  position: fixed;
  .van-pull-refresh {
    height: calc(100% - 104px);
    overflow-y: auto;
  }
  .tools-btn {
    position: absolute;
    bottom: 3.7rem;
    z-index: 99;
    right: 0.7rem;
    button {
      background-color: #4fc08d;
      border: none;
      margin: 0 0 0 1rem;
    }
    button:last-child {
      background: linear-gradient(45deg, #fe5d33, #ee0c24);
    }
  }
  // 侧标签
  .sidebar-content {
    position: static;
    overflow: hidden;
    overflow-y: auto;
    float: left;
    height: 100%;
  }
  .van-sidebar {
    width: 100px;
  }
  .van-sidebar-item {
    text-align: center;
  }

  // 商品卡片
  .card-content {
    position: static;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  .van-doc-demo-block__card {
    margin: 8px 12px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 0 10px #d4d4d4;
  }
  .van-swipe-cell:last-child .van-doc-demo-block__card {
    // margin: 8px 12px 14px 12px;
    margin: 8px 12px 64px 12px;
  }

  /* .van-doc-demo-block__title + .van-doc-demo-block__card {
        margin-top: 0;
    } */
  .van-doc-demo-block:first-of-type .van-doc-demo-block__title {
    padding-top: 20px;
  }

  .van-tag--danger {
    margin: 0 4px 0 0;
  }
}
</style>