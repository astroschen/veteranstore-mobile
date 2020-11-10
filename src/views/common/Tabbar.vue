<template>
    <div>
        <!-- 标签栏 -->
        <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
            <van-tabbar-item icon="shop-o">首页</van-tabbar-item>
            <van-tabbar-item icon="logistics">入库</van-tabbar-item>
            <van-tabbar-item icon="balance-o">收银</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Tabbar',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted(){

    }
}
</script>

<style lang="less" scope>
    
</style>