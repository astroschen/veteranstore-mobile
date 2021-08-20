<!-- 搜索 -->
<template>
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
</template>
<script>
export default {
  name: 'header-search',
  components: {},
  props: ['data', 'config'],
  data () {
    return {
      keyword: '',
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
    }
  },
  created () { },
  mounted () { },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { }
}
</script>

<style lang="less" scoped>
</style>