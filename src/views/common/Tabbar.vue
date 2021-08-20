<template>
    <div>
        <!-- 标签栏 -->
        <van-tabbar route v-model="active" active-color="#07c160" inactive-color="#000">
            <van-tabbar-item replace to="/home" icon="shop-o" >首页</van-tabbar-item>
            <van-tabbar-item replace to="/goods" icon="logistics">库存</van-tabbar-item>
            <van-tabbar-item replace to="/shop" icon="balance-o">收银</van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Tabbar',
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
    
</style>