<template>
  <div class="shop">
    <!-- 搜索 -->
    <header-search ref="search" :fn="onSeach"></header-search>
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
            :price="item.F_RETAIL_PRICE"
            :desc="item.S_BRAND"
            :title="item.S_NAME"
            :thumb="item.S_IMGURL || require('@/assets/images/goods.gif')"
          >
            <template #tags>
              <van-tag v-if="item.I_COUNT" plain type="danger">{{
                "库存：" + item.I_COUNT + (item.S_UNIT || "个")
              }}</van-tag>
              <van-tag v-if="item.S_CAPACITY" plain type="danger">{{
                "规格：" + item.S_CAPACITY
              }}</van-tag>
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
    <van-submit-bar :disabled="!goodsData.length" :price="getCount" button-text="开始买单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#07c160" @click="checkAll">
        全选
      </van-checkbox>
    </van-submit-bar>

    <!-- 买单弹窗 -->
    <van-dialog v-model="submitPopup" title="账单" confirmButtonText="确认结账" show-cancel-button @confirm="onSubmitPopup">
      <van-cell-group>
        <van-cell title="需要支付金额" :value="count" />
        <van-field v-model="paycount" type="number" label="实际支付金额" placeholder="（未填写表示不用找零）" input-align="right" />
        <van-cell v-if="backCount>0" title="找零金额" :value="backCount" label="使用现金支付找零的金额" />
      </van-cell-group>
    </van-dialog>

    <!-- 加载弹窗 -->
    <!-- <van-popup v-model="isLoadingPopup" get-container="shop">
      <van-loading type="spinner" />
    </van-popup> -->
  </div>
</template>

<script>
import { requestProduct, addDealData } from '@/api/common/product'
import { accAdd, accSub, accMul } from '@/plugins/util/calculate'
export default {
  name: "shop",
  data () {
    return {
      // 总价
      count: 0,
      checked: true,
      goodsData: [],
      keyword: '',
      isLoading: false,
      submitPopup: false,
      // 已支付金额
      paycount: '',
    }
  },
  computed: {
    getCount () {
      // 计算属性无法修改直接修改变量
      this.initCount()
      this.goodsData.map(val => {
        if (val.state) {
          this.count = accAdd(this.count, accMul(val.F_RETAIL_PRICE, val.num))
        }
      })
      return accMul(this.count, 100)
    },
    // 找零金额
    backCount () {
      return accSub(this.paycount, this.count)
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
    requestSearchData () {

    },
    // 搜索完成的回调
    onSeach (val) {
      console.log('搜索后的回调方法：', val)
      // 回参会返回搜索条件  0 清除状态 1 条形码查询或扫码状态 2 搜索关键词状态
      switch (val.code) {
        case 0:
          this.keyword = ''
          break
        case 1:
          requestProduct({ code: val?.keyword }).then(val => {
            console.log('-----', val?.data)
            if (Array.isArray(val?.data) && val?.data.length) {
              // 扫码结果 默认选中 默认数量
              val.data[0].state = true
              val.data[0].num = 1
              this.goodsData.push(val?.data[0])
              this.$toast.success('添加成功')
            } else {
            }
          }).catch(() => {
          })
          /* if (val.data.length) {
            // 数据库中存在直接弹该商品详情窗
            this.$toast('查出' + val.keyword + '相关' + val.data.length + '条数据')
            this.keyword = val.keyword
          } else {
            this.$toast.fail('暂无数据')
          } */
          break
        case 2:
          if (val.data.length) {
            this.$toast('查出' + val.keyword + '相关' + val.data.length + '条数据')
            this.keyword = val.keyword
            // this.$set(this, 'tabData', val?.data || [])
          } else {
            this.$toast.fail('暂无数据')
          }
          break
        default:
          break
      }
    },
    // 确认结账
    onSubmitPopup () {
      // 结账完后返回当前哪些商品库存小于10的提醒
      console.log({
        s_product_code: this.fomatData(this.goodsData, 'S_CODE'),
        s_count: this.fomatData(this.goodsData, 'num'),
        s_retail_price: this.fomatData(this.goodsData, 'F_RETAIL_PRICE'),
        i_count_price: this.count,
        i_profit_price: this.getProfit()
      })
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,  // 背景不可点击
        duration: 0, // 持续展示 toast
      })
      addDealData({
        s_product_code: this.fomatData(this.goodsData, 'S_CODE'),
        s_count: this.fomatData(this.goodsData, 'num'),
        s_retail_price: this.fomatData(this.goodsData, 'F_RETAIL_PRICE'),
        i_count_price: this.count,
        i_profit_price: this.getProfit(),
        s_user: ''
      }).then(res => {
        console.log(res)
        toast.clear()
        if(res?.data?.data == 1){
          this.$toast.success('结账成功')
        }else{
          this.$toast.fail('结账失败，请联系管理员')
        }
      })
    },
    // 1,24,234 格式
    fomatData(data, key){
      let html = ''
      data.forEach((val, i) => {
        html += val[key] + (i < data.length - 1 ? ',' : '')
      })
      return html
    },
    // 计算利润
    getProfit(){
      let count = 0
      this.goodsData.forEach(val => {
        count = accAdd(accMul(accSub(val.F_RETAIL_PRICE, val.F_BUYING_PRICE), val.num), count)
      })
      return count
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
      this.submitPopup = true
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
    height: calc(100% - 104px);
    overflow-y: auto;
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