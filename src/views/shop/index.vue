<template>
    <div class="shop">
        <!-- 搜索 -->
        <van-search v-model="keyword" shape="round" background="#4fc08d" placeholder="请输入商品名或编号" @search="onSearch" show-action action-text="点我扫码" @cancel="onCancel" />

        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">

            <van-swipe-cell v-for="(item, index) in data" :key="index">
                <div class="van-doc-demo-block__card">
                    <van-card :num="item.num" :price="item.price" :desc="item.info" :title="item.name+'_'+index" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                        <template #tags>
                            <van-tag plain type="danger">标签</van-tag>
                            <van-tag plain type="danger">标签</van-tag>
                        </template>
                        <template #footer>
                            <div style="display: flex; flex-wrap: wrap;">
                                <van-checkbox v-model="item.state" checked-color="#07c160"></van-checkbox>
                                <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
                            </div>
                        </template>
                    </van-card>
                </div>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>

        </van-pull-refresh>

        <!-- 提交 -->
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked" checked-color="#07c160" @change="checkAll">全选</van-checkbox>
        </van-submit-bar>

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
    name: "shop",
    data() {
        return {
            checked: true,
            data: [
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: true },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: true },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
                { name: '商品名称', info: '商品信息', price: parseInt(Math.random() * 100), num: 1, state: false },
            ],
            keyword: null,
            isLoading: false,
        };
    },
    methods: {
        onSearch(e) {
            console.log(e);
        },
        onCancel() {
            // TODO
            console.log("触发相机扫码");
        },
        onRefresh() {
            setTimeout(() => {
                this.$toast("刷新成功");
                this.isLoading = false;
            }, 1000);
        },
        checkAll(e){
            console.log(e)
            this.data.map(val=>{
                val.state = e 
            })
        },
    },
    mounted() { },
};
</script>

<style lang="less" scope>
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
        padding-right: 12px;
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
            background: radial-gradient(black, transparent);
        }
    }

    .van-stepper{
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
        box-shadow: 0 0 10px #e6e6e6;
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
    .van-submit-bar{
        bottom: 3.3rem;
        box-shadow: 0 0 10px #e6e6e6;
    }
}
</style>