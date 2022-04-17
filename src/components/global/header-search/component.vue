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
window.Quagga = Quagga
export default {
  name: 'header-search',
  components: {},
  props: ['data', 'config', 'fn'],
  data () {
    return {
      keyword: '',
      scanShow: false,
      sucAudio: null,
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
      this.fn && this.fn(e)
    },
    // 扫码 
    onScan () {
      console.log("触发相机扫码");
      this.scanShow = true
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
        // numOfWorkers: 4,
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
          const back = { referenc: {}, quagga: data }
          // 获取在线参考数据
          if (data?.codeResult?.code) {
            this.http.get(`https://www.mxnzp.com/api/barcode/goods/details?barcode=${data.codeResult.code}&app_id=puqsalfpnnsruwml&app_secret=ajZ0TEhFRnhIMmNGL0libTJaRTc4UT09`).then(res => {
              back.referenc = (res?.data?.code == 1 ? res?.data?.data : {})
              this.sucAudio.play()
              this.cencleScan()
              this.fn && this.fn(back)
            }).catch(() => {
              this.sucAudio.play()
              this.cencleScan()
              this.fn && this.fn(back)
            })
          }
        })
      })
    },
    initSucScanAudio () {
      this.sucAudio = new Audio()
      this.sucAudio.src = require('@/assets/audio/successful_scan.mp3')
    },
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