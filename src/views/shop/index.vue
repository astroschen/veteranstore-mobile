<template>
    <div class="shop">
        <van-search v-model="keyword" shape="round" background="#4fc08d" placeholder="请输入商品名或编号" @search="onSearch"
            show-action action-text="点我扫码" @cancel="onCancel" />
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>

            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题1" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>

            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题2" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>

            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题3" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>

            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题4" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>

            <div class="van-doc-demo-block__card">
                <van-card num="2" price="2.00" desc="描述信息" title="商品标题5" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-stepper v-model="value" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
export default {
    name: "shop",
    data() {
        return {
            value: 4,
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

    .van-doc-demo-block__title {
        margin: 0;
        padding: 32px 16px 16px;
        color: rgba(69, 90, 100, 0.6);
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
    }
    .van-doc-demo-block__card {
        margin: 12px 12px 0;
        overflow: hidden;
        border-radius: 8px;
    }
    .van-doc-demo-block__title + .van-doc-demo-block__card {
        margin-top: 0;
    }
    .van-doc-demo-block:first-of-type .van-doc-demo-block__title {
        padding-top: 20px;
    }
}
</style>