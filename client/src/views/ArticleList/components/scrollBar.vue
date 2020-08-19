<template>
  <div class="top" :style="{width: bar + '%'}"></div>
</template>

<script>
import { throttle } from '@/utils'
export default {
    name: 'scrollBar',
    data () {
        return {
            bar: 0,
            throttleScrollHandle: ''
        }
    },
    created () {
        this.throttleScrollHandle = throttle(this.scrollHandle, 100)
        window.addEventListener('scroll', this.throttleScrollHandle)
    },
    methods: {
        scrollHandle () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            let bar = Math.ceil(scrollTop) / Math.ceil(scrollHeight - windowHeight) * 100
            this.bar = bar
        }
    }
}
</script>

<style scoped lang="less">
    .top {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 999999;
        background: #409eff;
        height: 2px;
        transition: all .3s linear;
    }
</style>