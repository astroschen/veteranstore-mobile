<!-- 搜索 -->
<template>
  <div class="header-search-warp">
    <van-search
      v-show="isShow()"
      v-model="keyword"
      shape="round"
      background="#4fc08d"
      :placeholder="
        $util.getValue(data, 'placeholder', '请输入商品名 或扫描条形码')
      "
      @search="onSearch"
      @clear="onClear"
      show-action
    >
      <template #action>
        <van-icon
          name="scan"
          color="#fff"
          size="2rem"
          @click="onScan"
          style="display: flex"
        ></van-icon>
      </template>
    </van-search>

    <!-- 扫码 -->
    <van-overlay :show="scanShow" @click="cencleScan">
      <div class="wrapper">
        <div ref="scan" class="block" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Quagga from 'quagga'
import { requestProduct } from '@/api/common/product'
window.Quagga = Quagga
export default {
  name: 'header-search',
  components: {},
  props: ['data', 'config', 'fn' ],
  data () {
    return {
      keyword: '',
      scanShow: false,
      sucAudio: null,
      backData: {
        // 状态
        code: 0,
        // 关键词
        keyword: '',
        // 联网参考数据
        referenc: {},
        // 扫描数据
        quagga: {},
        // 数据库中的数据
        data: [],
        backflag: false
      }
    }
  },
  computed: {},
  watch: {
    data (newdata) {
      // url请求模式/data数据过滤模式
      if (Object.prototype.hasOwnProperty.call(newdata, 'url')) {
      } else if (Object.prototype.hasOwnProperty.call(newdata, 'data')) {
      }
    }
  },
  methods: {
    // 是否显示
    isShow () {
      const val = this?.config?.show
      if (typeof val === 'undefined') {
        return true
      } else if (val) {
        return true
      } else {
        return false
      }
    },
    // 搜索
    onSearch (e) {
      // this.$parent.onSearchBack(e)
      // 回参会返回搜索条件  0 清除状态 1 条形码查询或扫码状态 2 搜索关键词状态
      e = e.toString()
      const param = {}
      const cn = new RegExp('[\u4E00-\u9FA5]+')
      const en = new RegExp('A-Za-z]+')
      const num = new RegExp("[0-9]+")
      this.backData.keyword = e

      if (cn.test(e) || en.test(e)) {
        console.log('是中英字符')
        param.name = e
        this.backData.code = 2
      } else if (num.test(e)) {
        console.log('是数字')
        param.code = e
        this.backData.code = 1
      }
      requestProduct(param).then(res => {
        console.log('搜索后的回调数据：', res)
        this.backData.data = res?.data
        this.fn && this.fn(this.backData)
      })
    },
    onClear () {
      this.backData.code = 0
      this.fn && this.fn(this.backData)
    },
    // 扫码 
    onScan () {
      console.log("触发相机扫码");
      this.backflag = true
      this.scanShow = true
      this.backData.code = 1
      this.initQuagga()
    },
    // 初始化quagga
    initQuagga () {
      window.Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: this.$refs.scan,
          constraints: {
            width: 600,
            height: 800,
            facingMode: 'environment'
          }
        },
        locator: {
          // 码在摄像头视口的距离，移动端设置large,x-large会跟容易识别
          patchSize: 'medium',
          // halfSample: true,
        },
        // 线程数
        numOfWorkers: 1,
        // frequency: 10,
        decoder: {
          /* readers: [{
            format: "code_128_reader",
            config: {}
          }] */
          readers: ['ean_reader'],
          // multiple: true,
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        },
        locate: true
      }, (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.log("Initialization finished. Ready to start")
        window.Quagga.start()
        window.Quagga.onProcessed(result => {
          var drawingCtx = window.Quagga.canvas.ctx.overlay,
            drawingCanvas = window.Quagga.canvas.dom.overlay;
          if (result) {
            if (result.boxes) {
              drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
              result.boxes.filter(function (box) {
                return box !== result.box;
              }).forEach(function (box) {
                window.Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
              });
            }

            if (result.box) {
              window.Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
              window.Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
          }
        })
        window.Quagga.onDetected(data => {
          if(!this.backflag){
            return
          }
          this.backflag = false
          this.backData.referenc = {}
          this.backData.quagga = data
          this.keyword = data?.codeResult?.code
          this.backData.keyword = data?.codeResult?.code
          // 是否搜索
          /* if(this?.config?.isSearch && data?.codeResult?.code){
            this.onSearch(data?.codeResult?.code)
          } */
          // 获取在线参考数据
          console.log('-------------scan code:', this.backData.keyword)
          if (data?.codeResult?.code) {
            this.$http.get(`https://www.mxnzp.com/api/barcode/goods/details?barcode=${data.codeResult.code}&app_id=puqsalfpnnsruwml&app_secret=ajZ0TEhFRnhIMmNGL0libTJaRTc4UT09`).then(res => {
              this.backData.referenc = (res?.data?.code == 1 ? res?.data?.data : {})
              this.sucAudio.play()
              this.cencleScan()
              this.fn && this.fn(this.backData)
            }).catch(() => {
              this.sucAudio.play()
              this.cencleScan()
              this.fn && this.fn(this.backData)
            })
          }
        })
      })
    },
    // 扫码成功音效
    initSucScanAudio () {
      this.sucAudio = new Audio()
      this.sucAudio.src = require('@/assets/audio/successful_scan.mp3')
    },
    // 取消扫码销毁资源
    cencleScan () {
      window.Quagga.offDetected()
      window.Quagga && window.Quagga.stop()
      this.scanShow = false
    },
    getScanData (data) {

    }
  },
  created () {
    this.initSucScanAudio()
  },
  mounted () {
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { }
}
</script>

<style lang="less">
// quagga debug
.drawingBuffer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
<style lang="less" scoped>
.header-search-warp {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>