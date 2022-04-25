<template>
  <component
    :is="dilogboxtype"
    v-if="show"
    :visible="true"
    :width="width"
    :close-on-click-modal="false"
    :beforeClose="commclose"
    :show-close="false"
    :show-max="false"
    custom-class="dialogtitlebox-warp"
    append-to-body
  >
    <component :is="dialogthem">
      <template slot="title">
        <div class="dialog-title-content">
          <div class="dialog-titke-left-content">
            <span class="dialog-title__text">{{ title }}</span>
            <el-tabs v-if="curcomponentuuid && componentlistuuid.length > 1" class="dialog-title-tabs" v-model="curcomponentuuid" @tab-click="handleClick">
              <el-tab-pane :key="item.uuid" v-for="(item) in componentlistuuid" :label="item.label" :name="item.uuid"></el-tab-pane>
            </el-tabs>
          </div>
          <div
            @click="commclose"
            class="pointer dialog-right-close">
          </div>
        </div>
      </template>
      <template>
        <div ref="dialogslot" :style="{ height: height }" class="dialog-slot">
          <component
            v-if="curcomponentuuid && loadcomponent"
            :mainthis="this.mainthis"
            :savedata="commsavedate"
            :close="commclose"
            :data="dialogdata"
            v-bind="getcomponentdata(curcomponentuuid)"
            :is="`dialog-${getCurComponentName(curcomponentuuid)}`"></component>
        </div>
      </template>
    </component>
  </component>
</template>
<script>
import common from '@/components/dialogs'
import titleboxThemDefault from '@/components/common/titlebox-thems/titlebox-them-default'
import titleboxThemBlue from '@/components/common/titlebox-thems/titlebox-them-blue'
import { createGuid } from '@/utils/common.js'

export default {
  name: 'title-dialogbox',
  components: {
    ...common,
    titleboxThemBlue,
    titleboxThemDefault
  },
  watch: {
    // 组件名称变化是调用方法
    curcomponentuuid (val) {
      this.getdialogdata(val)
    }
  },
  props: {
    reSetComponent: {
      type: Boolean,
      default: false
    },
    dialogthem: {
      type: String,
      default: 'titlebox-them-blue'
    },
    dilogboxtype: {
      type: String,
      default: 'kt-dialog'
    },
    mainthis: {
      type: Object,
      default () {
        return this
      }
    },
    componentlist: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '75%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  computed: {
    componentlistuuid () {
      // 给componentlist添加上唯一id
      return this.componentlist.map(item => {
        return { ...item, uuid: createGuid() }
      })
    }
  },
  data () {
    return {
      loadcomponent: true,
      dialogdata: {},
      show: true,
      componentlistname: null,
      curcomponentname: '',
      curcomponentuuid: ''
    }
  },
  created () {
    this.getCurComponentUuid()
  },
  mounted () {
  },
  methods: {
    // 根据指标key获取数据
    getdialogdata (curcomponentuuid) {
      // 通过uuid只找到key
      const item = this.getIndexItemByCuaName(curcomponentuuid)
      this.dialogdata = {}
      if (item && item.indexKey) {
        if (item.indexKey !== '') {
          this.$http.postJson('/service-digit-zb-screen-monitor/app/monitor/screenMonitor/getIndexData', { domainType: '6', indexKey: item.indexKey }).then(res => {
            res = res?.data?.data
            try {
              res.indexData = JSON.parse(res.indexData)
            } catch (e) {
            }
            this.dialogdata = res
          })
        }
      } else {
        return null
      }
    },
    // 因为indexjs添加的方法不会在组件初始化的时候马上接收到，所以传递给组件内的方法需要在组件内先套一层
    commsavedate (data, state) {
      this.savedatefun(data, state)
    },
    commclose () {
      this.closefun()
    },
    handleClick (val) {
      if (!this.reSetComponent) {
        return
      }
      // 为了相同组件key能从新触发create方法
      this.loadcomponent = false
      setTimeout(() => {
        this.loadcomponent = true
      }, 10)
    },
    // 根据指标名称获取当前指标信息
    getIndexItemByCuaName (curcomponentuuid) {
      for (let i = 0; i < this.componentlistuuid.length; i++) {
        if (this.componentlistuuid[i].uuid === curcomponentuuid) {
          return this.componentlistuuid[i]
        }
      }
      return null
    },
    getcomponentdata (curcomponentuuid) {
      const item = this.getIndexItemByCuaName(curcomponentuuid)
      if (item) {
        return item.props
      }
    },
    getCurComponentUuid () {
      if (Array.isArray(this.componentlistuuid) && this.componentlistuuid.length > 0) {
        this.curcomponentuuid = this.componentlistuuid[0].uuid
      }
    },
    getCurComponentName (uuid) {
      if (Array.isArray(this.componentlistuuid) && this.componentlistuuid.length > 0) {
        for (let i = 0; i < this.componentlistuuid.length; i++) {
          const item = this.componentlistuuid[i]
          if (item.uuid === uuid) {
            return item.name
          }
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
  .dialog-title-tabs {
    position: absolute;
    top: -8px;
    left: 10px;
    .el-tabs__item{
      color: #fff;
      &:hover{
        color: #5fffec;
      }
      &.is-active{
        color: #5fffec;
      }
    }
    .el-tabs__active-bar{
      background-color: #5fffec;
    }
  }
</style>
<style lang="less" scoped>
  .dialogtitlebox-warp {
    .dialog-title-content{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .dialog-titke-left-content{
        height: 100%;
        position: relative;
        flex: 1;
      }
      .dialog-right-close{
        position: relative;
        z-index: 2;
        width: 18px;
        height: 18px;
        background-image: url("~@/assets/images/dialog-close.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .dialog-title__text {
      font-size: 16px;
      height: 26px;
      line-height: 26px;
      text-indent: 10px;
    }
    .dialog-slot {
    }
  }
</style>
