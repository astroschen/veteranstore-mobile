<template>
    <div class="home">
        <router-view replace to="/home"></router-view>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/views/common/Tabbar'
export default {
    name: 'index',
    components: {
        Tabbar,
    }
}
</script>
