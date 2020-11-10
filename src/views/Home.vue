<template>
    <div class="home">
        <router-view></router-view>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/views/common/Tabbar'
export default {
    name: 'Home',
    components: {
        Tabbar,
    }
}
</script>
