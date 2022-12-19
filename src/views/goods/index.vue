<!--  -->
<template>
  <div class="goods-list">
    <div class="tools-btn">
      <van-button icon="replay" type="primary" @click="replayFn" />
      <van-button icon="plus" type="primary" @click="addFn" />
    </div>
    <!-- 搜索 -->
    <header-search :fn="onSeach"></header-search>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="refreshDis"
    >
      <!-- 侧边导航 -->
      <div class="sidebar-content">
        <van-sidebar v-model="listindex" @change="sidebarChange">
          <template v-for="item in tabData">
            <van-sidebar-item :title="item.S_VALUE" :badge="item.I_COUNT" />
          </template>
        </van-sidebar>
      </div>
      <!-- 商品卡片 -->
      <div class="card-content">
        <van-list
          v-if="tabData.length"
          v-model="listlLoading"
          offset="10"
          :finished="listFinished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-swipe-cell v-for="(item, index) in goodsData" :key="index">
            <!-- <lazy-component> -->
            <div class="van-doc-demo-block__card">
              <van-card
                :title="item.S_NAME"
                :desc="item.S_BRAND"
                :price="item.F_RETAIL_PRICE"
                :num="(item.I_COUNT || 0) + (item.S_UNIT || '')"
                :thumb="item.S_IMGURL || require('@/assets/images/goods.gif')"
                :lazy-load="true"
              >
                <template #tags>
                  <!-- <van-tag v-if="item.I_COUNT" plain type="danger">{{
                    "库存：" +
                    item.I_COUNT +
                    (item.S_UNIT || '个') +
                    (item.S_CAPACITY ? "/" + item.S_CAPACITY : "")
                  }}</van-tag> -->
                  <van-tag v-if="item.S_CAPACITY" plain type="danger">{{
                    "规格：" + item.S_CAPACITY
                  }}</van-tag>
                  <van-tag v-if="item.F_BUYING_PRICE" plain type="danger">{{
                    "进货：" + parseFloat(item.F_BUYING_PRICE)
                  }}</van-tag>
                  <!-- <van-tag v-if="item.F_RETAIL_PRICE" plain type="danger">{{
                  "零售：" + item.F_RETAIL_PRICE
                }}</van-tag> -->
                  <van-tag
                    v-if="item.F_BUYING_PRICE && item.F_RETAIL_PRICE"
                    plain
                    type="danger"
                    >{{
                      "利润：" +
                      $np.minus(item.F_RETAIL_PRICE, item.F_BUYING_PRICE)
                    }}</van-tag
                  >
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
                @click="updateGoods(item)"
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
            <!-- </lazy-component> -->
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { requestProductType, requestProductPage, delProductByCode } from '@/api/common/product'
import { Dialog } from 'vant'

export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      isLoading: false,
      refreshDis: true,
      // 当前分类索引
      listindex: 0,
      // 商品列表数据
      goodsData: [],
      // 分类列表数据
      tabData: [],
      // tab节流
      tabflag: true,
      // 当前列表数据加载
      listlLoading: false,
      listFinished: false,
      // 分页
      pageNo: 1,
      pageSize: 10,
      // 关键词
      keyword: ''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取类型
    getProductType () {
      requestProductType({ name: this.keyword }).then(val => {
        console.log(val)
        this.$set(this, 'tabData', val?.data || [])
      })
    },
    // 获取数据
    onRefresh () {
      requestProductPage({ name: this.keyword, type: this.tabData[this.listindex].S_TYPE, pageNo: this.pageNo, pageSize: this.pageSize }).then(val => {
        console.log('当前tab类型的商品数据--->', val)
        this.$set(this, 'goodsData', [...this.goodsData, ...val?.data])
        this.isLoading = false
        this.refreshDis = true
        this.tabflag = true

        this.listlLoading = false
        if (val?.data.length == 0 || this.goodsData.length >= val?.data[0].totalCount) {
          this.listFinished = true
        } else {
          this.pageNo += 1
          this.listFinished = false
        }
      }).catch(() => {
        this.tabflag = true
      })
    },
    // 类型切换
    sidebarChange (e) {
      if (this.tabflag) {
        this.$set(this, 'goodsData', [])
        this.pageNo = 1
        this.listlLoading = false
        this.listFinished = false
        this.tabflag = false
        this.listindex = e
        this.onRefresh()
      }
    },
    // 刷新
    replayFn () {
      this.refreshDis = false
      this.isLoading = true
      this.getProductType()
      this.sidebarChange(0)
    },
    onLoad () {
      console.log('onLoad触发')
      if (this.tabflag) {
        setTimeout(this.onRefresh, 0)
      }
    },
    onSeach (val) {
      console.log('搜索后的回调方法：', val)
      // 回参会返回搜索条件  0 清除状态 1 条形码查询或扫码状态 2 搜索关键词状态
      switch (val.code) {
        case 0:
          this.keyword = ''
          this.replayFn()
          break
        case 1:
          if (val.data.length) {
            // 数据库中存在直接弹该商品详情窗
            this.$toast('查出' + val.keyword + '相关' + val.data.length + '条数据')
            this.keyword = val.keyword
          } else {
            this.$toast.success('暂无数据')
          }
          break
        case 2:
          if (val.data.length) {
            this.$toast('查出' + val.keyword + '相关' + val.data.length + '条数据')
            this.keyword = val.keyword
            // this.$set(this, 'tabData', val?.data || [])
            this.replayFn()
          } else {
            this.$toast.fail('暂无数据')
          }
          break
        default:
          break
      }
    },
    addFn () {
      this.$router.push('/addgoods')
    },
    // 删除商品
    removeGoods (val) {
      console.log('删除的商品数据--->', val)
      Dialog.confirm({
        title: '删除提示',
        message:
          '确定删除选择商品？',
      }).then(() => {
        delProductByCode({ code: val.S_CODE }).then(res => {
          if (res?.data?.data == 1) {
            this.$toast({ message: '删除成功', duration: 3000 })
          } else {
            this.$toast({ message: '删除失败', duration: 3000 })
          }
          this.replayFn()
        })
      }).catch(() => {
        console.log('取消删除')
      })
    },
    // 编辑商品
    updateGoods (val) {
      this.$router.push({ path: `/addgoods/${val?.S_CODE}` })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getProductType()
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
.goods-list {
  // dot
  .van-info {
    background-color: #156e40 !important;
    padding: 1px 4px !important;
  }
  .van-sidebar-item {
    padding: 20px 20px;
  }
  .van-sidebar-item--select::before {
    height: 100%;
  }
}
</style>
<style lang='less' scoped>
.goods-list {
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
    margin: 2px 4px 2px 0;
    padding: 2px 4px;
  }
}
</style>