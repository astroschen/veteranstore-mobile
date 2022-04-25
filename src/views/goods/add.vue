<template>
  <div class="addgoods">
    <div class="head" v-show="isShow">
      <van-icon name="arrow-left" color="#fff" @click="back" />
      <span class="title">添加商品</span>
      <van-icon name="replay" color="#fff" @click="replay" />
    </div>
    <div style="height: calc(100% - 160px); overflow-y: auto">
      <header-search
        ref="search"
        :fn="onSeach"
        :config="{ show: false }"
      ></header-search>
      <van-cell-group inset>
        <van-field
          required
          v-model="goods.S_CODE"
          type="digit"
          label="条形码"
          placeholder="请输入条形码"
        >
          <template #button>
            <van-button size="small" type="primary" @click="scanFn"
              >扫描</van-button
            >
          </template>
        </van-field>
        <van-field
          required
          v-model="goods.S_NAME"
          label="商品名称"
          placeholder="请输入商品名称"
        />
        <van-field
          required
          readonly
          v-model="this.typeJson[goods.S_TYPE]"
          label="分类"
          placeholder="请选择已有分类"
          @click="selType"
        >
          <template #button>
            <van-icon name="arrow" @click="selType" />
          </template>
        </van-field>
        <!-- 分类弹窗 -->
        <van-popup v-model="typeShow" round position="bottom">
          <van-picker
            title="选择分类"
            show-toolbar
            value-key="S_VALUE"
            :columns="typeColumns"
            @confirm="typeConfirm"
            @cancel="typeShow = false"
          />
        </van-popup>
        <van-field
          required
          v-model="goods.F_BUYING_PRICE"
          type="number"
          label="进货价"
          placeholder="请输入进货价"
        />
        <van-field
          required
          v-model="goods.F_RETAIL_PRICE"
          type="number"
          label="零售价"
          placeholder="请输入零售价"
        />
        <van-field
          readonly
          v-if="goods.F_BUYING_PRICE && goods.F_RETAIL_PRICE"
          :value="$np.minus(goods.F_RETAIL_PRICE, goods.F_BUYING_PRICE)"
          type="number"
          label="利润"
        />
        <van-field
          v-model="goods.S_CAPACITY"
          label="规格"
          placeholder="请输入规格，例如250ml"
        />
        <van-field
          required
          v-model="goods.I_COUNT"
          type="digit"
          label="库存量"
          placeholder="请输入库存量"
        />
        <van-field
          required
          v-model="goods.S_UNIT"
          label="单位"
          placeholder="请输入单位，例如支、个、袋"
        />
        <van-field
          v-model="goods.S_BRAND"
          label="品牌"
          placeholder="请输入品牌"
        />
        <van-field
          v-model="goods.S_SUPPLIER"
          label="供货商"
          placeholder="请输入供货商"
        />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader
              v-model="goods.url"
              multiple
              :max-count="1"
              :before-read="beforeRead"
              :after-read="afterRead"
            />
          </template>
        </van-field>
      </van-cell-group>
      <van-submit-bar button-text="">
        <template #button>
          <van-button
            round
            type="primary"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="onSubmit"
            >确认提交</van-button
          >
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs'
import { Dialog } from 'vant'
import { getEnum, requestProduct, addProductData } from '@/api/index'
export default {
  name: 'addgoods',
  components: {},
  data () {
    return {
      isShow: true,
      goods: {},
      typeColumns: [],
      typeJson: {},
      typeShow: false,
      requiredArr: ['S_CODE', 'S_NAME', 'S_TYPE', 'F_BUYING_PRICE', 'F_RETAIL_PRICE', 'I_COUNT', 'S_UNIT']
    }
  },
  computed: {},
  watch: {},
  methods: {
    //返回上一层
    back () {
      this.$router.go(-1)
    },
    // 重置
    replay () {
      Dialog.confirm({
        title: '重置提示',
        message:
          '确定要重置填写吗？确定后将填入的信息全部清除！',
      }).then(() => {
        console.log('确定重置')
        this.goods = {}
      }).catch(() => {
        console.log('取消了')
      })
    },
    // 扫描
    scanFn () {
      this.$refs.search.onScan()
    },
    // 搜索返回
    onSeach (param) {
      // 先判断数据库是否存在该商品 无则用在线数据填充
      requestProduct({ code: param?.quagga?.codeResult?.code }).then(val => {
        console.log('-----', val?.data)
        if (Array.isArray(val?.data) && val?.data.length) {
          this.goods = val?.data[0]
          this.$toast({ message: '商品已存在', duration: 3000 })
        } else {
          this.setRefData(param)
        }
      }).catch(() => {
      })
    },
    // 使用参考数据
    setRefData (param) {
      if (this.isObjEnpty(param?.referenc)) {
        const data = param.referenc
        this.goods = {
          S_CODE: data.barcode,
          S_NAME: data.goodsName,
          S_BRAND: data.brand,
          F_RETAIL_PRICE: data.price,
          S_CAPACITY: data.standard,
          S_SUPPLIER: data.supplier
        }
        this.$toast({ message: '已填入参考数据', duration: 3000 })
      } else {
        this.$toast({ message: '暂无参考数据，请核查条形码是否争取或手动填入商品信息', duration: 3000 })
        this.goods = { S_CODE: param?.quagga?.codeResult?.code }
      }
    },
    // 选择分类
    selType () {
      this.getType()
      this.typeShow = true
    },
    getType () {
      getEnum({ type: 'product_type' }).then(res => {
        this.typeColumns = res?.data || []
        this.typeColumns.forEach(val => {
          this.typeJson[val.S_NAME] = val.S_VALUE
        })
      })
    },
    // 确认分类
    typeConfirm (e) {
      this.goods.S_TYPE = e.S_NAME
      this.typeShow = false
    },
    isNull () {
      let flag = false
      this.requiredArr.forEach(val => {
        if (!this.goods[val]) {
          flag = true
        }
      })
      return flag
    },
    // 添加提交
    onSubmit () {
      if (this.isNull()) {
        this.$toast({ message: '带星号为必填项', duration: 3000 })
      } else {
        addProductData(this.goods).then(res => {
          console.log(res)
          if (res?.data?.data == 1) {
            Dialog.confirm({
              title: '添加成功提示',
              message:
                '商品添加成功！取消继续添加，确定返回列表',
            }).then(() => {
              this.$router.push('/goods')
            }).catch(() => {
              this.goods = {}
            })
          }
        })
      }
    },
    // 判断对象是不是为空
    isObjEnpty (obj) {
      return (Object.keys(obj).length === 0 ? false : true)
    },
    // 上传前压缩处理
    beforeRead (file) {
      return new Promise((resolve) => {
        // compressorjs 默认开启 checkOrientation 选项
        // 会将图片修正为正确方向
        new Compressor(file, {
          quality: 0,
          success: resolve,
          error (err) {
            console.log(err.message)
          },
        })
      })
    },
    afterRead (file) {
      console.log('上传的文件-->', file)
      this.goods.S_IMGURL = file.content
    }
  },
  created () {

  },
  mounted () {
    this.getType()
  }
}
</script>

<style lang='less' scoped>
.addgoods {
  height: 100%;
  width: 100%;
  position: fixed;
  .head {
    height: 54px;
    background: #4fc08d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .title {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }

  .van-submit-bar {
    bottom: 3.3rem;
    box-shadow: 0 0 10px #e6e6e6;
  }
}
</style>