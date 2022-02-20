<!-- 搜索 -->
<template>
  <div class="header-search-warp">
    <van-search
      v-model="keyword"
      shape="round"
      background="#4fc08d"
      :placeholder="$util.getValue(data, 'placeholder', '请输入商品名或编号')"
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
  props: ['data', 'config'],
  data () {
    return {
      keyword: '',
      scanShow: false,
      sucAudio: null,
    }
  },
  computed: {},
  watch: {
    data (newdata, olddata) {
      // url请求模式/data数据过滤模式
      if (Object.prototype.hasOwnProperty.call(newdata, 'url')) {
      } else if (Object.prototype.hasOwnProperty.call(newdata, 'data')) {
      }
    }
  },
  methods: {
    // 搜索
    onSearch (e) {
      console.log(e);
      this.$parent.onSearchBack('返回的数据')
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
            width: 300,
            height: 300,
            facingMode: 'environment'
          }
        },
        locator: {
          // 码在摄像头视口的距离，移动端设置large,x-large会跟容易识别
          patchSize: 'x-large',
          halfSample: true
        },
        // numOfWorkers: 4,
        // frequency: 10,
        decoder: {
          /* readers: [{
            format: "code_128_reader",
            config: {}
          }] */
          readers: ['ean_reader']
        },
        // locate: true
      }, (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.log("Initialization finished. Ready to start");
        window.Quagga.start()
        window.Quagga.onDetected(data => {
          console.log(data.codeResult.code)
          this.sucAudio.play()
          this.cencleScan()
        })
      })
    },
    initSucScanAudio () {
      this.sucAudio = new Audio()
      this.sucAudio.src = require('@/assets/audio/successful_scan.mp3')
    },
    cencleScan () {
      window.Quagga && window.Quagga.stop()
      this.scanShow = false
    }
  },
  created () {
    this.initSucScanAudio()
  },
  mounted () { },
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
    width: 300px;
    height: 300px;
    background-color: #fff;
  }
}
</style>