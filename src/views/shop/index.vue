<template>
    <div class="shop">
        <van-search v-model="keyword" shape="round" background="#4fc08d" placeholder="请输入商品名或编号" @search="onSearch"
            show-action action-text="点我扫码" @cancel="onCancel" />
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
            <div class="van-hairline--surround">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-button size="mini">-</van-button>
                        <van-button size="mini">+</van-button>
                    </template>
                </van-card>
            </div>
            <div class="van-doc-demo-block__card"></div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { Search, PullRefresh, Toast, Card, Button } from "vant";

export default {
    components: {
        [Search.name]: Search,
        [PullRefresh.name]: PullRefresh,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    name: "shop",
    data() {
        return {
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
                Toast("刷新成功");
                this.isLoading = false;
            }, 1000);
        },
    },
    mounted() {},
};
</script>

<style lang="less" scope>
.shop {
    height: 100%;
    width: 100%;
    position: fixed;
    .van-pull-refresh {
        height: calc(100% - 54px);
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
}
</style>