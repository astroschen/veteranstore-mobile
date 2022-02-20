<template>
  <div class="shop">
    <!-- 搜索 -->
    <header-search ref="search" :data="searchData"></header-search>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
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
            </template>
            <template #footer>
              <div style="display: flex; flex-wrap: wrap">
                <van-checkbox
                  v-model="item.state"
                  checked-color="#07c160"
                  @change="checkOne"
                ></van-checkbox>
                <van-stepper
                  v-model="item.num"
                  theme="round"
                  button-size="22"
                  disable-input
                />
              </div>
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="removeGoods(item)"
          />
        </template>
      </van-swipe-cell>
    </van-pull-refresh>

    <!-- 提交 -->
    <van-submit-bar :price="getCount" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#07c160" @click="checkAll">
        全选
      </van-checkbox>
    </van-submit-bar>

    <!-- 加载弹窗 -->
    <!-- <van-popup v-model="isLoadingPopup" get-container="shop">
      <van-loading type="spinner" />
    </van-popup> -->
  </div>
</template>

<script>
export default {
  name: "shop",
  data () {
    return {
      // 总数
      count: 0,
      checked: true,
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
      keyword: '',
      isLoading: false,
      searchData: {
        placeholder: '请输入商品名 或扫描条形码',
        data: {},
        filter: {}
      }
    };
  },
  computed: {
    getCount () {
      // 计算属性无法修改直接修改变量
      this.initCount()
      this.goodsData.map(val => {
        if (val.state) {
          this.count += val.price * val.num
        }
      })
      return this.count * 100
    }
  },
  watch: {
    getCount: {
      deep: true,
      handler () {

      }
    }
  },
  methods: {
    requestSearchData(){

    },
    // 搜索完成的回调
    onSearchBack (data) {
      console.log(data)
    },
    // 初始化合计
    initCount () {
      this.count = 0
    },
    // 重新获取数据
    onRefresh () {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    // 单选
    checkOne () {
      this.checked = true
      this.goodsData.map(val => {
        if (!val.state) {
          this.checked = false
        }
      })
    },
    // 全选
    checkAll () {
      this.goodsData.map(val => {
        val.state = this.checked
      })
    },
    // 提交
    onSubmit () {

    },
    // 删除
    removeGoods (item) {
      let toast
      this.$dialog.confirm({
        message: '是否要删除此商品'
      }).then(() => {
        toast = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,  // 背景不可点击
          duration: 0, // 持续展示 toast
        })
        this.goodsData.remove(item)
        // this.$notify({ type: 'success', message: '删除成功！', duration: 1000 })
        toast.clear()
        this.$toast.success({ message: '删除成功！', duration: 1000 })
      }).catch(() => {
      })
    }
  },
  mounted () { 
  }
}
</script>

<style lang="less">
.shop {
  height: 100%;
  width: 100%;
  position: fixed;
  .van-pull-refresh {
    height: calc(100% - 108px);
    overflow-y: auto;
    padding: 4px 0 0 0;
  }
  .van-search {
    /* padding-right: 12px;
        .van-search__content--round {
            border-radius: 999px 0 0 999px;
        }
        .van-search__action {
            color: #fff;
            border-radius: 0 999px 999px 0;
            background: #00756a;
            padding: 0 14px 0 10px;
        }
        .van-search__action:active {
            background: #004c0d;
        } */
    .van-search__action:active {
      background: transparent;
    }
  }

  .van-stepper {
    margin-left: auto;
  }

  .delete-button {
    height: 100%;
  }

  .van-doc-demo-block__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
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
  .van-submit-bar {
    bottom: 3.3rem;
    box-shadow: 0 0 10px #e6e6e6;
  }

  // vant popup
  .van-popup {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>